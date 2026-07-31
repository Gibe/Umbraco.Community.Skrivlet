using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Community.SkrivLet.Models;

namespace Umbraco.Community.SkrivLet.Extensions
{
    public static class SkrivLetExtensions
    {
        private const string PartialsPath = "~/Views/Partials/SkrivLet/";
        private const string DefaultPartialsPath = "~/Views/Partials/SkrivLet/Default/";

        public static async Task<IHtmlContent> RenderSkrivLet(this IHtmlHelper html, SkrivLetModel model)
        {
            return await html.PartialAsync(ResolvePartialPath(html, "Blocks"), model);
        }

        public static async Task<IHtmlContent> RenderSkrivLetBlock(this IHtmlHelper html, SkrivLetBlockBase block)
        {
            if (!string.IsNullOrEmpty(block.ViewOverride))
            {
                return await html.PartialAsync(block.ViewOverride, block.ViewModel ?? block);
            }

            return await html.PartialAsync(ResolvePartialPath(html, block.Type ?? string.Empty), block);
        }

        /// <summary>
        /// Prefers a matching partial in the host site's own Views/Partials/SkrivLet/ folder,
        /// falling back to the view bundled with this library. Precompiled library views always
        /// win over same-path host files, so the library's defaults live under a distinct
        /// Default/ path and are only used when no host override is present.
        /// </summary>
        private static string ResolvePartialPath(IHtmlHelper html, string name)
        {
            var env = html.ViewContext.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
            var relativePath = $"Views/Partials/SkrivLet/{name}.cshtml";

            return env.ContentRootFileProvider.GetFileInfo(relativePath).Exists
                ? $"{PartialsPath}{name}.cshtml"
                : $"{DefaultPartialsPath}{name}.cshtml";
        }
    }
}
