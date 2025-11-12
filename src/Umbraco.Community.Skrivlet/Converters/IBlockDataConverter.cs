using System.Text.Json;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Converters
{
    public interface IBlockDataConverter
    {
        public bool CanConvert(string type);
        public SkrivLetBlockBase Convert(ref Utf8JsonReader reader, string id, string type);
    }
}
