using System.Text.Json;
using System.Text.Json.Serialization;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.JsonConverters
{
    public class SkrivLetBlockJsonConverter : JsonConverter<SkrivLetBlockBase>
	{
		private readonly IEnumerable<IBlockDataConverter> _converters;

		public SkrivLetBlockJsonConverter(IEnumerable<IBlockDataConverter> converters)
		{
			_converters = converters;
		}

        public override SkrivLetBlockBase Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			if (reader.TokenType != JsonTokenType.StartObject)
			{
				throw new JsonException();
			}

			SkrivLetBlockBase baseObj = new();
			while (reader.Read())
			{
				if (reader.TokenType == JsonTokenType.EndObject)
				{
					return baseObj;
				}

                if (reader.TokenType != JsonTokenType.PropertyName)
				{
					throw new JsonException();
				}

				var propertyName = reader.GetString() ?? "";
				switch (propertyName.ToLower())
				{
					case "id":
						reader.Read();
						baseObj.Id = reader.GetString();
						break;
					case "type":
						reader.Read();
						baseObj.Type = reader.GetString();
						break;
					case "data":
						// Advance to the start of the data value (object/array/etc.)
						reader.Read();

						var type = baseObj.Type ?? string.Empty;
						var id = baseObj.Id ?? string.Empty;

						var converter = _converters.FirstOrDefault(x => x.CanConvert(type));
						if (converter is not null)
						{
							baseObj = converter.Convert(ref reader, id, type);
						}
						else
						{
							// Consume the data payload so the reader is positioned correctly for the rest of the block.
							using var _ = JsonDocument.ParseValue(ref reader);
						}

						break;
				}
			}

			return baseObj;
		}

		public override void Write(Utf8JsonWriter writer, SkrivLetBlockBase value, JsonSerializerOptions options)
		{
			throw new NotImplementedException();
		}
	}
}
