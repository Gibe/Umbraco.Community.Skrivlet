export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Skrivlet Entrypoint",
    alias: "Umbraco.Community.Skrivlet.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
