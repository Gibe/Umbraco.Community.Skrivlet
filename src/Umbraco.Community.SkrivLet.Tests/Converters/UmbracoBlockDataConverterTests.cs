using System.Text;
using System.Text.Json;
using Moq;
using NUnit.Framework;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Tests.Converters
{
    [TestFixture]
    public class UmbracoBlockDataConverterTests
    {
        private Mock<IPublishedContentTypeCache> _contentTypeCache;

        public UmbracoBlockDataConverter Converter()
        {
            return new UmbracoBlockDataConverter(_contentTypeCache.Object);
        }

        [SetUp]
        public void Setup()
        {
            _contentTypeCache = new Mock<IPublishedContentTypeCache>();
        }

        [Test]
        public void ParsesFieldsAndPreservesRawValuesWhenContentTypeUnresolved()
        {
            _contentTypeCache
                .Setup(x => x.Get(PublishedItemType.Content, "myElement"))
                .Returns((IPublishedContentType?)null);

            var json = "{\"contentTypeKey\":\"11111111-1111-1111-1111-111111111111\"," +
                        "\"contentTypeAlias\":\"myElement\"," +
                        "\"udi\":\"umb://element/1234567890abcdef1234567890abcdef\"," +
                        "\"values\":{\"title\":\"Hello\",\"count\":2,\"nested\":{\"a\":1}}}";
            var reader = new Utf8JsonReader(Encoding.UTF8.GetBytes(json));
            reader.Read();

            var result = Converter().Convert(ref reader, "test-id", "umbracoBlock") as SkrivLetBlock<UmbracoBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Id, Is.EqualTo("test-id"));
            Assert.That(result.Data.ContentTypeKey, Is.EqualTo(Guid.Parse("11111111-1111-1111-1111-111111111111")));
            Assert.That(result.Data.ContentTypeAlias, Is.EqualTo("myElement"));
            Assert.That(result.Data.Udi, Is.Not.Null);
            Assert.That(result.Data.Values["title"], Is.EqualTo("Hello"));
            Assert.That(result.Data.Values["count"], Is.EqualTo("2"));
            Assert.That(result.Data.Values["nested"], Is.EqualTo("{\"a\":1}"));

            // No matching element type in the cache - Element stays null rather than throwing.
            Assert.That(result.Data.Element, Is.Null);
        }

        [Test]
        public void ResolvesElementUsingContentPublishedItemType()
        {
            // Element types are content types with IsElement=true, not a separate repository -
            // PublishedContentTypeCache.Get(PublishedItemType, string) only supports Content/Media/Member
            // internally and throws ArgumentOutOfRangeException for PublishedItemType.Element, so this
            // must be looked up as PublishedItemType.Content. Regression test for that bug.
            var contentTypeMock = new Mock<IPublishedContentType>();
            _contentTypeCache
                .Setup(x => x.Get(PublishedItemType.Content, "myElement"))
                .Returns(contentTypeMock.Object);

            var json = "{\"contentTypeKey\":\"11111111-1111-1111-1111-111111111111\"," +
                        "\"contentTypeAlias\":\"myElement\"," +
                        "\"udi\":\"umb://element/1234567890abcdef1234567890abcdef\"," +
                        "\"values\":{}}";
            var reader = new Utf8JsonReader(Encoding.UTF8.GetBytes(json));
            reader.Read();

            var result = Converter().Convert(ref reader, "test-id", "umbracoBlock") as SkrivLetBlock<UmbracoBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Data.Element, Is.Not.Null);
            _contentTypeCache.Verify(x => x.Get(PublishedItemType.Content, "myElement"), Times.Once);
            _contentTypeCache.Verify(x => x.Get(PublishedItemType.Element, It.IsAny<string>()), Times.Never);
        }

        [Test]
        public void CanConvertMatchesUmbracoBlockTypeOnly()
        {
            var converter = Converter();

            Assert.That(converter.CanConvert("umbracoBlock"), Is.True);
            Assert.That(converter.CanConvert("image"), Is.False);
        }
    }
}
