export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Umbraco Community Skrivlet",
    alias: "Umbraco.Community.Skrivlet.PropertyEditor",
    type: "propertyEditorUi",
    js: () => import("./skrivlet-property-editor-ui.element.js"),
    meta: {
      label: "SkrivLet",
      icon: "icon-autofill",
      group: "common",
      "propertyEditorSchemaAlias": "Umbraco.Plain.String"
    }
  },
];
