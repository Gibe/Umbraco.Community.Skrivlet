using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Community.Skrivlet.TestSite18.Converters;
using Umbraco.Community.SkrivLet.Converters;

namespace Umbraco.Community.Skrivlet.TestSite18.Composers
{
    /// <summary>
    /// Registers the demo "Callout" IBlockDataConverter - the server-side half of SkrivLet's
    /// "bring your own Editor.js tool" extension point (see README's "Extending" section).
    /// </summary>
    public class SkrivLetDemoComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddTransient<IBlockDataConverter, CalloutBlockDataConverter>();
        }
    }
}
