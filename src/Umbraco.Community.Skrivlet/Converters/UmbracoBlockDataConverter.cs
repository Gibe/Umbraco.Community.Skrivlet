using System.Text.Json;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Community.SkrivLet.Models;
using Umbraco.Community.SkrivLet.Options;

namespace Umbraco.Community.SkrivLet.Converters
{
    public class UmbracoBlockDataConverter : IBlockDataConverter
    {
        private readonly IPublishedContentTypeCache _contentTypeCache;
        private readonly IPublishedModelFactory _publishedModelFactory;
        private readonly IOptions<SkrivLetUmbracoBlockOptions> _blockViewOptions;

        public UmbracoBlockDataConverter(
            IPublishedContentTypeCache contentTypeCache,
            IPublishedModelFactory publishedModelFactory,
            IOptions<SkrivLetUmbracoBlockOptions> blockViewOptions)
        {
            _contentTypeCache = contentTypeCache;
            _publishedModelFactory = publishedModelFactory;
            _blockViewOptions = blockViewOptions;
        }

        public bool CanConvert(string type)
        {
            return type.Equals("umbracoBlock");
        }

        public SkrivLetBlockBase Convert(ref Utf8JsonReader reader, string id, string type)
        {
            if (reader.TokenType != JsonTokenType.StartObject)
            {
                throw new JsonException();
            }

            var block = new SkrivLetBlock<UmbracoBlockData>(id, type);
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndObject)
                {
                    break;
                }

                if (reader.TokenType != JsonTokenType.PropertyName)
                {
                    throw new JsonException();
                }

                var propertyName = reader.GetString() ?? "";
                switch (propertyName.ToLower())
                {
                    case "contenttypekey":
                        reader.Read();
                        if (Guid.TryParse(reader.GetString(), out var contentTypeKey))
                        {
                            block.Data.ContentTypeKey = contentTypeKey;
                        }
                        break;
                    case "contenttypealias":
                        reader.Read();
                        block.Data.ContentTypeAlias = reader.GetString();
                        break;
                    case "udi":
                        reader.Read();
                        var udiString = reader.GetString();
                        if (udiString != null)
                        {
                            block.Data.Udi = UdiParser.Parse(udiString);
                        }
                        break;
                    case "values":
                        reader.Read();
                        if (reader.TokenType == JsonTokenType.StartObject)
                        {
                            while (reader.Read() && reader.TokenType != JsonTokenType.EndObject)
                            {
                                if (reader.TokenType != JsonTokenType.PropertyName)
                                {
                                    throw new JsonException();
                                }

                                var propertyAlias = reader.GetString() ?? "";
                                reader.Read();
                                using var valueDocument = JsonDocument.ParseValue(ref reader);
                                block.Data.Values[propertyAlias] = ToRawPropertyValue(valueDocument.RootElement);
                            }
                        }
                        break;
                    default:
                        // Unrecognised properties (e.g. "contentTypeName", which is editor-UI-only - see
                        // README's Umbraco Blocks section) still need their value consumed here, or the
                        // reader desyncs and the next loop iteration finds a value token where it expects
                        // the next PropertyName, throwing. Skip() advances past the name and its value
                        // (recursing through objects/arrays) since we're still positioned on the name.
                        reader.Skip();
                        break;
                }
            }

            block.Data.Element = ResolveElement(block.Data);

            // Only wired up when Element actually resolved - a registered view expects a real
            // IPublishedElement model, so leaving ViewOverride set with a null Element (e.g. the
            // content type hasn't been imported/published yet) would hand the view the wrong model
            // type via RenderSkrivLetBlock's `block.ViewModel ?? block` fallback and blow up at render time.
            if (block.Data.Element != null &&
                block.Data.ContentTypeAlias != null &&
                _blockViewOptions.Value.Views.TryGetValue(block.Data.ContentTypeAlias, out var viewPath))
            {
                block.ViewOverride = viewPath;
                block.ViewModel = block.Data.Element;
            }

            return block;
        }

        /// <summary>
        /// Property raw values are stored by Umbraco as either a plain string or a JSON string
        /// (e.g. media pickers, block lists), so preserve that shape rather than the parsed JSON type.
        /// </summary>
        private static object? ToRawPropertyValue(JsonElement element)
        {
            return element.ValueKind switch
            {
                JsonValueKind.String => element.GetString(),
                JsonValueKind.Null or JsonValueKind.Undefined => null,
                _ => element.GetRawText(),
            };
        }

        private IPublishedElement? ResolveElement(UmbracoBlockData data)
        {
            if (string.IsNullOrEmpty(data.ContentTypeAlias))
            {
                return null;
            }

            // Element types aren't a separate repository - they're regular content types with
            // IsElement=true, resolved through IContentTypeService. PublishedContentTypeCache's
            // Get(PublishedItemType, string) only branches on Content/Media/Member internally, so
            // PublishedItemType.Element throws ArgumentOutOfRangeException; Content is correct here.
            var contentType = _contentTypeCache.Get(PublishedItemType.Content, data.ContentTypeAlias);
            if (contentType == null)
            {
                return null;
            }

            var key = data.Udi is GuidUdi guidUdi ? guidUdi.Guid : Guid.NewGuid();
            var element = new PublishedElement(contentType, key, data.Values, false, new VariationContext());

            // Wraps the raw element in its ModelsBuilder-generated type when the host has one for this
            // alias, so a host-registered ViewOverride can use a strongly-typed @model just like it
            // would for a native Block List item, instead of only ever getting the untyped IPublishedElement.
            return _publishedModelFactory.CreateModel(element);
        }
    }

    public class UmbracoBlockData
    {
        public Guid ContentTypeKey { get; set; }
        public string? ContentTypeAlias { get; set; }
        public Udi? Udi { get; set; }
        public Dictionary<string, object?> Values { get; set; } = new();

        /// <summary>
        /// Resolved at parse-time so Razor views can call <c>@Model.Data.Element.Value("propAlias")</c>
        /// the same way they would for any other <see cref="IPublishedElement"/>. Null if the stored
        /// <see cref="ContentTypeAlias"/> no longer matches a known element type.
        /// </summary>
        public IPublishedElement? Element { get; set; }
    }
}
