import { html as p, repeat as g, nothing as E, css as $, state as y, customElement as M } from "@umbraco-cms/backoffice/external/lit";
import { UmbTextStyles as S } from "@umbraco-cms/backoffice/style";
import { UmbModalBaseElement as x } from "@umbraco-cms/backoffice/modal";
import { UmbContentTypeStructureManager as P } from "@umbraco-cms/backoffice/content-type";
import { UmbDocumentTypeDetailRepository as U } from "@umbraco-cms/backoffice/document-type";
import { UmbPropertyDatasetContextBase as B } from "@umbraco-cms/backoffice/property";
import "@umbraco-cms/backoffice/content";
var L = Object.defineProperty, O = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, u = (e, t, o, r) => {
  for (var i = r > 1 ? void 0 : r ? O(t, o) : t, s = e.length - 1, c; s >= 0; s--)
    (c = e[s]) && (i = (r ? c(t, o, i) : c(i)) || i);
  return r && i && L(t, o, i), i;
}, f = (e, t, o) => t.has(e) || b("Cannot " + o), a = (e, t, o) => (f(e, t, "read from private field"), o ? o.call(e) : t.get(e)), h = (e, t, o) => t.has(e) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), D = (e, t, o, r) => (f(e, t, "write to private field"), t.set(e, o), o), _ = (e, t, o) => (f(e, t, "access private method"), o), n, m, d, k, w, v, T, C;
class N extends B {
  constructor(t, o) {
    super(t);
    const r = Object.entries(o).map(([i, s]) => ({
      alias: i,
      value: s
    }));
    this.setProperties(r);
  }
  /** Flattens the current alias/value pairs back into a plain record, for resolving the modal. */
  getValuesRecord() {
    const t = {};
    for (const o of this.getValues())
      t[o.alias] = o.value;
    return t;
  }
}
let l = class extends x {
  constructor() {
    super(...arguments), h(this, d), h(this, n, new P(this, new U(this))), h(this, m), this._isLoading = !0, this._loadError = !1, this._groups = [], h(this, v, () => {
      const e = a(this, m)?.getValuesRecord() ?? {}, t = a(this, n).getOwnerContentType()?.alias ?? "", o = this._contentTypeName ?? "";
      this.value = { values: e, contentTypeAlias: t, contentTypeName: o }, this._submitModal();
    });
  }
  firstUpdated() {
    _(this, d, k).call(this);
  }
  render() {
    return p`
      <umb-body-layout headline=${this._contentTypeName ?? "Edit block"}>
        ${this._isLoading ? _(this, d, T).call(this) : _(this, d, C).call(this)}
        <div slot="actions">
          <uui-button label="Cancel" @click=${this._rejectModal}></uui-button>
          <uui-button
            label="Save"
            look="primary"
            color="positive"
            ?disabled=${this._loadError}
            @click=${a(this, v)}
          ></uui-button>
        </div>
      </umb-body-layout>
    `;
  }
};
n = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
k = async function() {
  const e = this.data?.contentTypeKey;
  if (!e) {
    console.error("[skrivlet-block-edit-modal] No `contentTypeKey` was provided in modal data."), this._loadError = !0, this._isLoading = !1;
    return;
  }
  D(this, m, new N(this, this.data?.values ?? {}));
  const { data: t } = await a(this, n).loadType(e);
  if (await a(this, n).whenLoaded(), !t) {
    console.error(`[skrivlet-block-edit-modal] Could not load element type with key "${e}".`), this._loadError = !0, this._isLoading = !1;
    return;
  }
  this._contentTypeName = a(this, n).getOwnerContentType()?.name;
  const o = await a(this, n).getContentTypeProperties();
  this._groups = _(this, d, w).call(this, o), this._isLoading = !1;
};
w = function(e) {
  const t = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = o.container?.id ?? null, i = r ?? "__root__";
    let s = t.get(i);
    if (!s) {
      const c = r ? a(this, n).getMergedContainerById(r) : void 0;
      s = {
        id: r,
        name: c?.name ?? "Content",
        properties: []
      }, t.set(i, s);
    }
    s.properties.push(o);
  }
  return [...t.values()];
};
v = /* @__PURE__ */ new WeakMap();
T = function() {
  return p`<div id="loading"><uui-loader></uui-loader></div>`;
};
C = function() {
  return this._loadError ? p`<p>Something went wrong loading this block's properties. See the browser console for details.</p>` : this._groups.length ? g(
    this._groups,
    (e) => e.id ?? "__root__",
    (e) => p`
        <div class="skrivlet-block-edit-modal__group">
          ${e.name ? p`<h4>${e.name}</h4>` : E}
          ${g(
      e.properties,
      (t) => t.unique,
      (t) => p`
              <umb-property-type-based-property
                .property=${t}
                .dataPath=${`$.values[?(@.alias == '${t.alias}')].value`}
                .ownerEntityType=${"element"}
              ></umb-property-type-based-property>
            `
    )}
        </div>
      `
  ) : p`<p>This element type has no properties to edit.</p>`;
};
l.styles = [
  S,
  $`
      #loading {
        display: flex;
        justify-content: center;
        padding: var(--uui-size-space-6, 24px) 0;
      }

      .skrivlet-block-edit-modal__group {
        margin-bottom: var(--uui-size-space-6, 24px);
      }

      .skrivlet-block-edit-modal__group h4 {
        margin: 0 0 var(--uui-size-space-3, 12px);
      }
    `
];
u([
  y()
], l.prototype, "_isLoading", 2);
u([
  y()
], l.prototype, "_loadError", 2);
u([
  y()
], l.prototype, "_contentTypeName", 2);
u([
  y()
], l.prototype, "_groups", 2);
l = u([
  M("skrivlet-block-edit-modal")
], l);
const q = l;
export {
  l as UmbSkrivletBlockEditModalElement,
  q as default
};
//# sourceMappingURL=umbraco-block-edit-modal.element-C0yhMdyI.js.map
