using System.Text.Json;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Converters
{
    public class ListBlockDataConverter : IBlockDataConverter
    {
        private readonly IUmbracoUrlConverter _umbracoUrlConverter;

        public ListBlockDataConverter(IUmbracoUrlConverter umbracoUrlConverter)
        {
            _umbracoUrlConverter = umbracoUrlConverter;
        }

        public bool CanConvert(string type)
        {
            return type.Equals("list");
        }

        public SkrivLetBlockBase Convert(ref Utf8JsonReader reader, string id, string type)
        {
            if (reader.TokenType != JsonTokenType.StartObject)
            {
                throw new JsonException();
            }

            var block = new SkrivLetBlock<ListBlockData>(id, type);
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndObject)
                {
                    return block;
                }

                // Get the key.
                if (reader.TokenType != JsonTokenType.PropertyName)
                {
                    throw new JsonException();
                }

                var propertyName = reader.GetString() ?? "";
                switch (propertyName.ToLower())
                {
                    case "style":
                        reader.Read();
                        block.Data.Style = reader.GetString() ?? "";
                        break;
                    case "items":
                        reader.Read();
                        if (reader.TokenType == JsonTokenType.StartArray)
                        {
                            reader.Read();
                            while (reader.TokenType != JsonTokenType.EndArray)
                            {
                                block.Data.Items.Add(_umbracoUrlConverter.ConvertUrls(reader.GetString() ?? ""));
                                reader.Read();
                            }
                        }


                        break;
                }
            }
            return block;
        }

    }

    public class ListBlockData
    {
        public string? Style { get; set; }
        public List<string> Items { get; set; } = [];
    }
}
