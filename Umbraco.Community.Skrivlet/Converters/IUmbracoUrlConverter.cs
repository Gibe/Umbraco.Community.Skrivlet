namespace Umbraco.Community.SkrivLet.Converters
{
    public interface IUmbracoUrlConverter
    {
        public string ConvertUrls(string text);
    }

    public class FakeUmbracoUrlConverter : IUmbracoUrlConverter
    {
        private readonly Dictionary<string, string> _swaps;

        public FakeUmbracoUrlConverter(Dictionary<string, string>? swaps = null)
        {
            _swaps = swaps ?? new Dictionary<string, string>();
        }

        public string ConvertUrls(string text)
        {
            foreach (var key in _swaps.Keys)
            {
                if (text.Contains(key))
                {
                    text = text.Replace(key, _swaps[key]);
                }
            }
            return text;
        }
    }
}
