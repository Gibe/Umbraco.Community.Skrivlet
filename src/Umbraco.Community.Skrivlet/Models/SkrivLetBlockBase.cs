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
	}
}
