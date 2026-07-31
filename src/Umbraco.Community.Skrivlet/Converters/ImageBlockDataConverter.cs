using System.Text.Json;
using Umbraco.Cms.Core;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Converters
{
    public class ImageBlockDataConverter : IBlockDataConverter
    {
        public bool CanConvert(string type)
        {
            return type.Equals("image");
        }

        public SkrivLetBlockBase Convert(ref Utf8JsonReader reader, string id, string type)
        {
            if (reader.TokenType != JsonTokenType.StartObject)
            {
                throw new JsonException();
            }

            var block = new SkrivLetBlock<ImageBlockData>(id, type);
            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndObject)
                {
                    return block;
                }

                if (reader.TokenType != JsonTokenType.PropertyName)
                {
                    throw new JsonException();
                }

                var propertyName = reader.GetString() ?? "";
                switch (propertyName.ToLower())
                {
                    case "url":
                        reader.Read();
                        block.Data.Url = reader.GetString() ?? "";
                        break;
                    case "alt":
                        reader.Read();
                        block.Data.Alt = reader.GetString() ?? "";
                        break;
                    case "udi":
                        reader.Read();
                        var udiString = reader.GetString();
                        if (udiString != null)
                        {
                            block.Data.Udi = UdiParser.Parse(udiString);
                        }
                        break;
                    case "width":
                        reader.Read();
                        block.Data.Width = reader.GetInt32();
                        break;
                    case "height":
                        reader.Read();
                        block.Data.Height = reader.GetInt32();
                        break;
                }
            }
            return block;
        }
    }

    public class ImageBlockData
    {
        public string? Url { get; set; }
        public string? Alt { get; set; }
        public Udi? Udi { get; set; }
        public int? Height { get; set; }
        public int? Width { get; set; }
    }
}
