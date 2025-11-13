using System.Text.RegularExpressions;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Web;
using Umbraco.Extensions;

namespace Umbraco.Community.SkrivLet.Converters
{
    public class UmbracoUrlConverter : IUmbracoUrlConverter
    {
        private const string UmbLinkPattern = "(<a\\s+(?:[^>]*?\\s+)?href=\")(umb:\\/\\/[^\"]*)\"";

        private readonly IUmbracoContextAccessor _umbracoContextAccessor;
        private readonly IPublishedUrlProvider _publishedUrlProvider;
        
        public UmbracoUrlConverter(
            IUmbracoContextAccessor umbracoContextAccessor,
            IPublishedUrlProvider publishedUrlProvider)
        {
            _umbracoContextAccessor = umbracoContextAccessor;
            _publishedUrlProvider = publishedUrlProvider;
        }

        public string ConvertUrls(string text)
        {
            if (Regex.IsMatch(text, UmbLinkPattern))
            {
                return Regex.Replace(text, UmbLinkPattern, ConvertUdiUrl);
            }

            return text;
        }
        
        private string ConvertUdiUrl(Match match)
        {
            var udiText = match.Groups[2].Value;

            var udi = UdiParser.Parse(udiText);

            if (!_umbracoContextAccessor.TryGetUmbracoContext(out var context))
            {
                return string.Empty;
            }
            var content = context.Content.GetById(udi.AsGuid());
            if (content == null)
            {
                return string.Empty;
            }
            return $"{match.Groups[1].Value}{content.Url(_publishedUrlProvider)}\"";
        }

       
    }
}
