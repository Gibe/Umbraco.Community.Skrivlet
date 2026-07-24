using System.Text.Json;
using NUnit.Framework;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Tests.Converters
{
    [TestFixture]
	public class CodeBlockDataConverterTests
	{
        public CodeBlockDataConverter Converter()
        {
            return new CodeBlockDataConverter();
        }

        [Test]
        public void CodeBlockSuccessfullyConvertsWhenValidData()
        {
            var converter = Converter();
            var json = "{\"code\":\"Console.WriteLine(\\\"Hello, World!\\\");\"}";
            var reader = new Utf8JsonReader(System.Text.Encoding.UTF8.GetBytes(json));
            reader.Read();
            var id = "test-id";
            var type = "code";

            var result = converter.Convert(ref reader, id, type) as SkrivLetBlock<CodeBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Type, Is.EqualTo(type));
            Assert.That(result.Data, Is.Not.Null);
            Assert.That(result.Data.Code, Is.EqualTo("Console.WriteLine(\"Hello, World!\");"));
        }
	}
}
