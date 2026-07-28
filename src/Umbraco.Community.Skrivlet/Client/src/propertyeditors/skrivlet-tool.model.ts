import type { ManifestBase, CssLoaderProperty, ClassConstructor } from '@umbraco-cms/backoffice/extension-api';

/**
 * A loader for an Editor.js Tool class - not `JsLoaderProperty`/`ApiLoaderProperty` (Umbraco's own
 * loader property types), because those are unwrapped by `loadManifestPlainJs`/`loadManifestApi`
 * respectively, and neither matches what we need here: `loadManifestPlainJs` doesn't unwrap a
 * `default`/`api` export (it's meant for plain data, not classes), while `loadManifestApi` unwraps
 * correctly but requires the class to implement Umbraco's `UmbApi` (a `destroy()` method) - which
 * Editor.js Tool classes don't. `skrivlet-property-editor-ui.element.ts` resolves this loader itself.
 */
export type UmbSkrivletToolLoaderProperty =
  | string
  | (() => Promise<{ default: ClassConstructor } | { api: ClassConstructor }>)
  | ClassConstructor;

/**
 * Registers an additional Editor.js tool with the SkrivLet property editor.
 * The default export resolved from `js` must be an Editor.js Tool class
 * (a block tool or inline tool, per the Editor.js Tools API).
 *
 * A tool registered this way only affects the client-side editing experience.
 * To have the saved block actually render, also register a matching
 * `IBlockDataConverter` (and optionally a partial view override) on the
 * server - see the README's "Extending" section.
 */
export interface ManifestSkrivletTool extends ManifestBase {
  type: 'skrivletTool';
  js: UmbSkrivletToolLoaderProperty;
  /** Optional plain CSS injected into SkrivLet's editor shadow root alongside this tool. */
  css?: CssLoaderProperty;
  meta: MetaSkrivletTool;
}

export interface MetaSkrivletTool {
  /** The key this tool is registered under in Editor.js's `tools: {}` config. Must not collide with a built-in key. */
  toolKey: string;
  inlineToolbar?: boolean;
  config?: Record<string, unknown>;
}

declare global {
  interface UmbExtensionManifestMap {
    UmbSkrivletToolExtension: ManifestSkrivletTool;
  }
}
