using System.Text.Json;

namespace Umbraco.Community.SkrivLet.Models
{
	public class SkrivLetBlockBase
	{
		public string? Id { get; set; }
		public string? Type { get; set; }

		/// <summary>
		/// The raw "data" payload for this block, populated only when no <see cref="Converters.IBlockDataConverter"/>
		/// is registered for <see cref="Type"/>. Preserves the content so it isn't silently lost - e.g. if a
		/// consumer registers a client-side tool before writing its matching server converter.
		/// </summary>
		public JsonElement? RawData { get; set; }

		/// <summary>
		/// An explicit view path a converter resolved for this specific block (e.g. from a host-configured
		/// alias-to-view registry), checked before the Views/Partials/SkrivLet/{Type}.cshtml convention in
		/// <see cref="Extensions.SkrivLetExtensions.RenderSkrivLetBlock"/>. Lets hosts point straight at a view
		/// they already have rather than adding one under the SkrivLet folder convention.
		/// </summary>
		public string? ViewOverride { get; set; }

		/// <summary>
		/// Model to pass when rendering <see cref="ViewOverride"/>, since that view was written against its own
		/// model type rather than a <see cref="SkrivLetBlockBase"/>. Defaults to the block itself when null.
		/// </summary>
		public object? ViewModel { get; set; }
	}
}
