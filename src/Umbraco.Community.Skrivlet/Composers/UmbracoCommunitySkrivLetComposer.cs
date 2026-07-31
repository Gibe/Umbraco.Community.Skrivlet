using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Community.SkrivLet.Converters;
using Umbraco.Community.SkrivLet.JsonConverters;
using Umbraco.Community.SkrivLet.ValueConverters;

namespace Umbraco.Community.SkrivLet.Composers
{
    public class UmbracoCommunitySkrivLetComposer : IComposer
	{
		public void Compose(IUmbracoBuilder builder)
		{
			builder.PropertyValueConverters().Append<SkrivLetValueConverter>();

			builder.Services.AddTransient<SkrivLetBlockJsonConverter>();
			builder.Services.AddTransient<IUmbracoUrlConverter, UmbracoUrlConverter>();
			builder.Services.AddTransient<IBlockDataConverter, ParagraphBlockDataConverter>();
			builder.Services.AddTransient<IBlockDataConverter, HeaderBlockDataConverter>();
			builder.Services.AddTransient<IBlockDataConverter, CodeBlockDataConverter>();
			builder.Services.AddTransient<IBlockDataConverter, ImageBlockDataConverter>();
			builder.Services.AddTransient<IBlockDataConverter, ListBlockDataConverter>();
			builder.Services.AddTransient<IBlockDataConverter, QuoteBlockDataConverter>();
			builder.Services.AddTransient<IBlockDataConverter, RawHtmlBlockDataConverter>();
			builder.Services.AddTransient<IBlockDataConverter, CheckListBlockDataConverter>();
            builder.Services.AddTransient<IBlockDataConverter, EmbedBlockDataConverter>();
		}
	}
}
