using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Extensions
{
    public static class SkrivLetExtensions
    {
        public static async Task<IHtmlContent> RenderSkrivLet(this IHtmlHelper html, SkrivLetModel model)
        {
            return await html.PartialAsync("~/Views/Partials/SkrivLet/Blocks.cshtml", model);
        }
    }
}
