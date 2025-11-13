using System.Text.Json;
using NUnit.Framework;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Tests.Converters
{
    [TestFixture]
    public class ParagraphBlockDataConverterTests
    {
        public ParagraphBlockDataConverter Converter(Dictionary<string, string>? swaps = null)
        {
            return new ParagraphBlockDataConverter(new FakeUmbracoUrlConverter(swaps));
        }
        
        [Test]
        public void ParagraphBlockSuccessfullyConvertsWhenValidData()
        {
            var converter = Converter();
            var json = "{\"text\":\"This is some example text\"}";
            var reader = new Utf8JsonReader(System.Text.Encoding.UTF8.GetBytes(json));
            reader.Read();
            var id = "test-id";
            var type = "code";


            var result = converter.Convert(ref reader, id, type) as SkrivLetBlock<ParagraphBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Type, Is.EqualTo(type));
            Assert.That(result.Data, Is.Not.Null);
            Assert.That(result.Data.Text, Is.EqualTo("This is some example text"));
        }

        [Test]
        public void ParagraphBlockSuccessfullyConvertsUmbracoLinksWhenValid()
        {
            var converter = Converter(new Dictionary<string, string>() {
            {
                "umb://document/4fed18d8c5e34d5e88cfff3a5b457bf2", "https://www.google.com"
                
            }});
            var json = "{\"text\":\"This is some <a href=\\\"umb://document/4fed18d8c5e34d5e88cfff3a5b457bf2\\\">example</a> text\"}";
            var reader = new Utf8JsonReader(System.Text.Encoding.UTF8.GetBytes(json));
            reader.Read();
            var id = "test-id";
            var type = "code";
            
            var result = converter.Convert(ref reader, id, type) as SkrivLetBlock<ParagraphBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Type, Is.EqualTo(type));
            Assert.That(result.Data, Is.Not.Null);
            Assert.That(result.Data.Text, Is.EqualTo("This is some <a href=\"https://www.google.com\">example</a> text"));
        }

        [Test]
        public void ParagraphBlockSupportsIncludesMailtoLinksWhenValid()
        {
            var converter = Converter();
            var json = "{\"text\":\"This is some <a href=\\\"mailto:test@test.com\\\">example</a> text\"}";
            var reader = new Utf8JsonReader(System.Text.Encoding.UTF8.GetBytes(json));
            reader.Read();
            var id = "test-id";
            var type = "code";


            var result = converter.Convert(ref reader, id, type) as SkrivLetBlock<ParagraphBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(id));
            Assert.That(result.Type, Is.EqualTo(type));
            Assert.That(result.Data, Is.Not.Null);
            Assert.That(result.Data.Text, Is.EqualTo("This is some <a href=\"mailto:test@test.com\">example</a> text"));
        }
    }
}
