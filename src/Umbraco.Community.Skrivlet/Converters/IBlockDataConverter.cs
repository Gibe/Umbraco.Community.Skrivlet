using System.Text.Json;
using Umbraco.Community.Skrivlet.Models;

namespace Umbraco.Community.SkrivLet.Converters
{
    public interface IBlockDataConverter
    {
        bool CanConvert(string type);
        SkrivLetBlockBase Convert(ref Utf8JsonReader reader, string id, string type);
    }
}
