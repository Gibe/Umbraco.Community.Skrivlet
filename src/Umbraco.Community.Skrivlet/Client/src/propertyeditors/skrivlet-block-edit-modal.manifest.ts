export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "modal",
    alias: "Umbraco.Community.Skrivlet.BlockEditModal",
    name: "SkrivLet Block Edit Modal",
    js: () => import("./umbraco-block-edit-modal.element.js"),
  },
];
