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
						reader.Read();
						var validConverters = _converters.Where(x => x.CanConvert(baseObj.Type)).ToList();
                        // TODO: This relies on type and id always being before data
                        
						if (validConverters.Any())
						{
							baseObj = validConverters.First().Convert(ref reader, baseObj.Id, baseObj.Type);
						}
						else
						{
							return baseObj;
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
