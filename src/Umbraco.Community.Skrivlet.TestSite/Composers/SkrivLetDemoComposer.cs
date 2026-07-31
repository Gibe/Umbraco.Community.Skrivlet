using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Community.Skrivlet.TestSite.Converters;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.Options;

namespace Umbraco.Community.Skrivlet.TestSite.Composers
{
    /// <summary>
    /// Registers the demo "Callout" IBlockDataConverter - the server-side half of SkrivLet's
    /// "bring your own Editor.js tool" extension point (see README's "Extending" section) - plus the
    /// "card" alias -> custom partial mapping demonstrating SkrivLetUmbracoBlockOptions (see
    /// uSync/v17/ContentTypes/card.config and Views/Partials/SkrivLet/Card.cshtml). Unlike Alert Box,
    /// which renders through the library's generic property-dump view, "card" gets its own bespoke,
    /// styled markup without needing a matching Views/Partials/SkrivLet/umbracoBlock.cshtml override.
    /// </summary>
    public class SkrivLetDemoComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddTransient<IBlockDataConverter, CalloutBlockDataConverter>();

            builder.Services.Configure<SkrivLetUmbracoBlockOptions>(options =>
            {
                options.Views["card"] = "~/Views/Partials/SkrivLet/Card.cshtml";
            });
        }
    }
}
