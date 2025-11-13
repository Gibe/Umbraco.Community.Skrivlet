using Moq;
using NUnit.Framework;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Web;
using Umbraco.Community.SkrivLet.Converters;

namespace Umbraco.Community.SkrivLet.Tests.Converters
{
    [TestFixture]
    public class UmbracoUrlConverterTests
    {
        private Mock<IUmbracoContextAccessor> _umbracoContextAccessor;
        private Mock<IPublishedUrlProvider> _publishedUrlProvider;
        
        public UmbracoUrlConverter Converter()
        {
            return new UmbracoUrlConverter(_umbracoContextAccessor.Object, _publishedUrlProvider.Object);
        }

        [SetUp]
        public void Setup()
        {
            _umbracoContextAccessor = new Mock<IUmbracoContextAccessor>();
            _publishedUrlProvider = new Mock<IPublishedUrlProvider>();

            Mock<IPublishedContent> publishedContentMock = new Mock<IPublishedContent>(MockBehavior.Strict);
            publishedContentMock.Setup(x => x.Key).Returns(Guid.NewGuid());
            publishedContentMock.Setup(x => x.ContentType).Returns(new PublishedContentType(Guid.NewGuid(), 1, "context", PublishedItemType.Content, [], x => [], ContentVariation.Nothing, false));
            var publishedContent = publishedContentMock.Object;


            Mock<IPublishedContentCache> contentCacheMock = new Mock<IPublishedContentCache>();
            contentCacheMock.Setup(x => x.GetById(It.IsAny<Guid>()))
                .Returns(publishedContent);
            
            Mock<IUmbracoContext> umbracoContextMock = new Mock<IUmbracoContext>();
            umbracoContextMock.Setup(x => x.Content).Returns(contentCacheMock.Object);
            
            var umbracoContext = umbracoContextMock.Object;

            _publishedUrlProvider.SetupSequence(x => x.GetUrl(It.IsAny<IPublishedContent>(), UrlMode.Default, null, null))
                .Returns("https://www.google.com")
                .Returns("https://www.google2.com");

            _umbracoContextAccessor.Setup(x => x.TryGetUmbracoContext(out umbracoContext)).Returns(true);
        }

        [Test]
        public void ConvertsSingleUmbracoUrl()
        {
            var converted = Converter().ConvertUrls(
                "This is some <a href=\"umb://document/4fed18d8c5e34d5e88cfff3a5b457bf2\">example</a> text");

            Assert.That(converted, Is.EqualTo("This is some <a href=\"https://www.google.com\">example</a> text"));
        }

        [Test]
        public void ConvertsMulipleUmbracoUrl()
        {
            var converted = Converter().ConvertUrls(
                "This <a href=\"umb://document/4fed18d8c5e34d5e88cfff3a5b457bf3\">is</a> some <a href=\"umb://document/4fed18d8c5e34d5e88cfff3a5b457bf2\">example</a> text");

            Assert.That(converted, Is.EqualTo("This <a href=\"https://www.google.com\">is</a> some <a href=\"https://www.google2.com\">example</a> text"));
        }
    }
}
