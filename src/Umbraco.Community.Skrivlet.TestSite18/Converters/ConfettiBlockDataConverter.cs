using System.Text.Json;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.Skrivlet.TestSite18.Converters
{
    /// <summary>
    /// Server-side half of the "Confetti" example tool demonstrating SkrivLet's extension point - see
    /// wwwroot/App_Plugins/SkrivLetDemoTools/confetti-tool-bundle.js for the matching client-side tool,
    /// and Composers/SkrivLetDemoComposer.cs for where this gets registered.
    /// </summary>
    public class ConfettiBlockDataConverter : IBlockDataConverter
    {
        public bool CanConvert(string type)
        {
            return type.Equals("confetti");
        }

        public SkrivLetBlockBase Convert(ref Utf8JsonReader reader, string id, string type)
        {
            if (reader.TokenType != JsonTokenType.StartObject)
            {
                throw new JsonException();
            }

            var block = new SkrivLetBlock<ConfettiBlockData>(id, type);
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
                    case "text":
                        reader.Read();
                        block.Data.Text = reader.GetString() ?? "";
                        break;
                }
            }
            return block;
        }
    }

    public class ConfettiBlockData
    {
        public string? Text { get; set; }
    }
}
