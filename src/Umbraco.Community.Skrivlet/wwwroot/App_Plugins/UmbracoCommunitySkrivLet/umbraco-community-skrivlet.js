const t = [
  {
    name: "Umbraco Community Skrivlet",
    alias: "Umbraco.Community.Skrivlet.PropertyEditor",
    type: "propertyEditorUi",
    js: () => import("./skrivlet-property-editor-ui.element-3asFxw8y.js"),
    meta: {
      label: "SkrivLet",
      icon: "icon-autofill",
      group: "richContent",
      propertyEditorSchemaAlias: "Umbraco.Plain.String"
    }
  }
], o = [
  {
    type: "modal",
    alias: "Umbraco.Community.Skrivlet.BlockEditModal",
    name: "SkrivLet Block Edit Modal",
    js: () => import("./umbraco-block-edit-modal.element-C0yhMdyI.js")
  }
], i = [
  ...t,
  ...o
];
export {
  i as manifests
};
//# sourceMappingURL=umbraco-community-skrivlet.js.map
