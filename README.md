# SkrivLet

> SkrivLet /skriːˀv let/ - Danish for Write Easily 

![SkrivLet Logo](https://raw.githubusercontent.com/mattbegent/Umbraco.Community.SkrivLet/main/images/skriv-let-logo.png)

A clean WYSIWYG property editor for distraction free writing in Umbraco. Built for Umbraco 17 and 18.

## Demo

![SkrivLet Demo](https://raw.githubusercontent.com/mattbegent/Umbraco.Community.SkrivLet/main/images/skrivlet-demo.gif)

## Installation 

You can install SkrivLet using 

    dotnet install Umbraco.Community.SkrivLet
    
or

    install-package Umbraco.Community.SkrivLet

This will add the SkrivLet property editor to your site. You should be then able to add a new data type and add it to your documents types.

## Usage

To use SkrivLet in your views you can use the RenderSkrivLet extension, for example if you have a SkrivLet property on your document with the alias `textContent` you could do:

    @await Html.RenderSkrivLet(Model.TextContent)

You'll need to add 

    @using Umbraco.Community.SkrivLet.Extensions

For the view to be able to use the extensions

SkrivLet comes with some basic views. If you want to override one, put a replacement with the same filename in your project at `Views/Partials/SkrivLet/` (not in a `Default` subfolder) and it will take priority over the built-in one - for example `Views/Partials/SkrivLet/Paragraph.cshtml` overrides the paragraph block, and `Views/Partials/SkrivLet/Blocks.cshtml` overrides the overall wrapper. Refer to the [basic built in views](https://github.com/mattbegent/Umbraco.Community.SkrivLet/tree/main/Umbraco.Community.Skrivlet/Views/Partials/SkrivLet/Default) to get an example of the code required. If your own `Blocks.cshtml` needs to render individual blocks, use `@await Html.RenderSkrivLetBlock(block)` so per-block overrides keep working.

## Styling

SkrivLet is designed to integrate within your existing website styles.

Each SkrivLet element has classes applied to them with a prefix of `sl`, which you can use to style how you wish.

If you need some styles while developing you can add a basic theme using:

    <link rel="stylesheet" href="~/App_Plugins/SkrivLet/basic-theme.css">

For that basic theme, the following are the CSS variables used and their defaults:

    --sl-article-max-width: 800px;
    --sl-base-font-family: Georgia, 'Times New Roman', Times, serif;
    --sl-base-color: #242424;
    --sl-link-color: #006fc6;
    --sl-link-color-hover: #5c5367;
    --sl-heading-font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    --sl-heading-font-weight: bold;
    --sl-quote-border-color: #242424;
    --sl-quote-font-family: Georgia, 'Times New Roman', Times, serif;
    --sl-quote-font-style: italic;
    --sl-code-background-color: #f1f1f1;
    --sl-code-border-color: #242424;
    --sl-code-font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
    --sl-check-border-color: #C9C9C9;

## Extending

### Adding your own Editor.js tools

You can register your own Editor.js tool from a separate Umbraco package without forking SkrivLet, by registering a `skrivletTool` extension manifest, for example:

    export const manifests: Array<UmbExtensionManifest> = [
      {
        type: "skrivletTool",
        alias: "MyCompany.MyTool",
        name: "My Tool",
        js: () => import("./my-tool.js"), // default export must be the Editor.js Tool class
        css: () => import("./my-tool.css?inline"), // optional - injected into SkrivLet's editor shadow root
        meta: {
          toolKey: "myTool", // the key the tool is registered under in Editor.js's `tools: {}` config
          inlineToolbar: false,
          config: {},
        },
      },
    ];

`toolKey` can't reuse a built-in key (`header`, `image`, `quote`, `embed`, `code`, `raw`, `list`, `checklist`, `link`) - a manifest that does will be ignored with a console warning.

Registering a client-side tool only affects editing. For a saved block to actually parse and render, also register a matching `IBlockDataConverter` (see the `Converters/` folder for examples such as `ImageBlockDataConverter`) via your own `IComposer`, plus an optional partial view override using the same host-override convention described in [Usage](#usage) above. If no converter is registered for a block type, its data is preserved (not lost) so it can still be recovered once a converter is added.

### Umbraco Blocks

SkrivLet has an "Umbraco Block" tool that lets editors insert a single element-type content item (the same kind of content used by Block List) directly into the flow, with its own properties edited inline via a modal. Block Grid style nested layout areas aren't supported - each SkrivLet block holds exactly one element.

To insert a block, editors pick an element type (only content types marked "is an Element type" are offered), then fill in its properties in a modal backed by that element type's own configured property editors.

The stored data is self-contained - it doesn't reference a separate Block List/Grid property elsewhere on the page:

    {
      "type": "umbracoBlock",
      "data": {
        "contentTypeKey": "...",
        "contentTypeAlias": "myElement",
        "udi": "umb://element/...",
        "values": { "propAlias1": "...", "propAlias2": "..." }
      }
    }

On render, SkrivLet resolves the stored values into an `IPublishedElement` (`Model.Data.Element`) so a partial can call `@Model.Data.Element.Value("propAlias")` like any other element. The default partial just dumps each property's raw value - for real projects, override `Views/Partials/SkrivLet/UmbracoBlock.cshtml` (or provide one per element type's own view once you introduce custom logic) using the same host-override convention described in [Usage](#usage).
