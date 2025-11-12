const a = [
  {
    name: "Umbraco Community Skrivlet Entrypoint",
    alias: "Umbraco.Community.Skrivlet.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-CkOuTyHN.js")
  }
], t = [
  {
    name: "Umbraco Community Skrivlet Dashboard",
    alias: "Umbraco.Community.Skrivlet.Dashboard",
    type: "dashboard",
    js: () => import("./dashboard.element-4RSO66YL.js"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], o = [
  ...a,
  ...t
];
export {
  o as manifests
};
//# sourceMappingURL=umbraco-community-skrivlet.js.map
