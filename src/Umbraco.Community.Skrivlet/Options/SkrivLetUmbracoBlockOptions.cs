namespace Umbraco.Community.SkrivLet.Options
{
    /// <summary>
    /// Maps an Umbraco content type alias to an explicit view path, so hosts can point an "umbracoBlock"
    /// at a Block List partial they already have instead of the generic property dump in
    /// Views/Partials/SkrivLet/Default/UmbracoBlock.cshtml.
    /// </summary>
    public class SkrivLetUmbracoBlockOptions
    {
        public Dictionary<string, string> Views { get; } = new(StringComparer.OrdinalIgnoreCase);
    }
}
