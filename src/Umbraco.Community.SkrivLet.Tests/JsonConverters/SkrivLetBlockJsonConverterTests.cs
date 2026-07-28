using System.Text.Json;
using NUnit.Framework;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.JsonConverters;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Tests.JsonConverters
{
    [TestFixture]
    public class SkrivLetBlockJsonConverterTests
    {
        private static SkrivLetBlockBase? Deserialize(string json, IEnumerable<IBlockDataConverter> converters)
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new SkrivLetBlockJsonConverter(converters));
            return JsonSerializer.Deserialize<SkrivLetBlockBase>(json, options);
        }

        [Test]
        public void PreservesRawDataWhenNoConverterRegisteredForType()
        {
            var json = "{\"id\":\"abc123\",\"type\":\"unknownType\",\"data\":{\"foo\":\"bar\",\"count\":2}}";

            var result = Deserialize(json, Array.Empty<IBlockDataConverter>());

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Id, Is.EqualTo("abc123"));
            Assert.That(result.Type, Is.EqualTo("unknownType"));
            Assert.That(result.RawData, Is.Not.Null);
            Assert.That(result.RawData!.Value.GetProperty("foo").GetString(), Is.EqualTo("bar"));
            Assert.That(result.RawData!.Value.GetProperty("count").GetInt32(), Is.EqualTo(2));
        }

        [Test]
        public void DelegatesToMatchingConverterWhenRegistered()
        {
            var json = "{\"id\":\"abc123\",\"type\":\"code\",\"data\":{\"code\":\"var x = 1;\"}}";

            var result = Deserialize(json, new IBlockDataConverter[] { new CodeBlockDataConverter() }) as SkrivLetBlock<CodeBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Data.Code, Is.EqualTo("var x = 1;"));
            Assert.That(result.RawData, Is.Null);
        }
    }
}
