using System.Text;
using System.Text.Json;
using Moq;
using NUnit.Framework;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.Models;
using Umbraco.Community.SkrivLet.Options;

namespace Umbraco.Community.SkrivLet.Tests.Converters
{
    [TestFixture]
    public class UmbracoBlockDataConverterTests
    {
        private Mock<IPublishedContentTypeCache> _contentTypeCache;

        public UmbracoBlockDataConverter Converter()
        {
            return new UmbracoBlockDataConverter(
                _contentTypeCache.Object,
                new NoopPublishedModelFactory(),
                Microsoft.Extensions.Options.Options.Create(new SkrivLetUmbracoBlockOptions()));
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
        public void SetsViewOverrideAndViewModelWhenAliasIsRegistered()
        {
            var contentTypeMock = new Mock<IPublishedContentType>();
            _contentTypeCache
                .Setup(x => x.Get(PublishedItemType.Content, "myElement"))
                .Returns(contentTypeMock.Object);

            var options = new SkrivLetUmbracoBlockOptions();
            options.Views["myElement"] = "~/Views/Partials/blocklist/MyElement.cshtml";
            var converter = new UmbracoBlockDataConverter(
                _contentTypeCache.Object,
                new NoopPublishedModelFactory(),
                Microsoft.Extensions.Options.Options.Create(options));

            var json = "{\"contentTypeKey\":\"11111111-1111-1111-1111-111111111111\"," +
                        "\"contentTypeAlias\":\"myElement\"," +
                        "\"udi\":\"umb://element/1234567890abcdef1234567890abcdef\"," +
                        "\"values\":{}}";
            var reader = new Utf8JsonReader(Encoding.UTF8.GetBytes(json));
            reader.Read();

            var result = converter.Convert(ref reader, "test-id", "umbracoBlock") as SkrivLetBlock<UmbracoBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.ViewOverride, Is.EqualTo("~/Views/Partials/blocklist/MyElement.cshtml"));
            Assert.That(result.ViewModel, Is.SameAs(result.Data.Element));
        }

        [Test]
        public void LeavesViewOverrideNullWhenAliasIsNotRegistered()
        {
            _contentTypeCache
                .Setup(x => x.Get(PublishedItemType.Content, "myElement"))
                .Returns((IPublishedContentType?)null);

            var json = "{\"contentTypeAlias\":\"myElement\",\"values\":{}}";
            var reader = new Utf8JsonReader(Encoding.UTF8.GetBytes(json));
            reader.Read();

            var result = Converter().Convert(ref reader, "test-id", "umbracoBlock") as SkrivLetBlock<UmbracoBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.ViewOverride, Is.Null);
            Assert.That(result.ViewModel, Is.Null);
        }

        [Test]
        public void LeavesViewOverrideNullWhenAliasRegisteredButElementFailsToResolve()
        {
            // Content type not yet imported/published - ResolveElement returns null. ViewOverride must
            // stay null too, otherwise RenderSkrivLetBlock would hand the registered view (which expects
            // a real IPublishedElement) the wrong model type via its `ViewModel ?? block` fallback.
            _contentTypeCache
                .Setup(x => x.Get(PublishedItemType.Content, "myElement"))
                .Returns((IPublishedContentType?)null);

            var options = new SkrivLetUmbracoBlockOptions();
            options.Views["myElement"] = "~/Views/Partials/blocklist/MyElement.cshtml";
            var converter = new UmbracoBlockDataConverter(
                _contentTypeCache.Object,
                new NoopPublishedModelFactory(),
                Microsoft.Extensions.Options.Options.Create(options));

            var json = "{\"contentTypeAlias\":\"myElement\",\"values\":{}}";
            var reader = new Utf8JsonReader(Encoding.UTF8.GetBytes(json));
            reader.Read();

            var result = converter.Convert(ref reader, "test-id", "umbracoBlock") as SkrivLetBlock<UmbracoBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Data.Element, Is.Null);
            Assert.That(result.ViewOverride, Is.Null);
            Assert.That(result.ViewModel, Is.Null);
        }

        [Test]
        public void SkipsUnrecognisedPropertiesInsteadOfThrowing()
        {
            // Regression test: "contentTypeName" (editor-UI-only, see README) and an arbitrary nested
            // property both sit between recognised properties here, to prove Skip() consumes each one's
            // value (scalar or object) without desyncing the reader for what follows.
            _contentTypeCache
                .Setup(x => x.Get(PublishedItemType.Content, "myElement"))
                .Returns((IPublishedContentType?)null);

            var json = "{\"contentTypeAlias\":\"myElement\"," +
                        "\"contentTypeName\":\"My Element\"," +
                        "\"somethingUnexpected\":{\"nested\":[1,2,3]}," +
                        "\"udi\":\"umb://element/1234567890abcdef1234567890abcdef\"," +
                        "\"values\":{\"title\":\"Hello\"}}";
            var reader = new Utf8JsonReader(Encoding.UTF8.GetBytes(json));
            reader.Read();

            var result = Converter().Convert(ref reader, "test-id", "umbracoBlock") as SkrivLetBlock<UmbracoBlockData>;

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Data.ContentTypeAlias, Is.EqualTo("myElement"));
            Assert.That(result.Data.Udi, Is.Not.Null);
            Assert.That(result.Data.Values["title"], Is.EqualTo("Hello"));
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
