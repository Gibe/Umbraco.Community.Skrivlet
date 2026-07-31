/**
 * A standalone "edit a Block" modal, assembled from lower-level Umbraco backoffice primitives.
 *
 * Context: Umbraco does not expose a drop-in "open this element-type's property editors in a modal"
 * API. The real block editing UI (UMB_BLOCK_WORKSPACE_MODAL, see
 * node_modules/@umbraco-cms/backoffice/dist-cms/packages/block/block/workspace/) only works inside a
 * full Block List/Grid/RTE workspace context stack (entity workspace, variant context, block-manager
 * context, etc). For inserting a Block directly inside an Editor.js flow we have none of that, so this
 * file re-assembles the same *rendering* pipeline Umbraco itself uses (see
 * UmbBlockElementManager, referenced below) directly on top of:
 *
 *  - UmbContentTypeStructureManager  - loads an element type's property/container structure.
 *  - UmbPropertyDatasetContextBase   - the generic (non-block-specific) in-memory property dataset
 *                                      context. We provide one of these on this modal element so that
 *                                      any <umb-property-type-based-property>/<umb-property> rendered
 *                                      underneath it can read/write property values ambiently.
 *  - <umb-property-type-based-property> - given a UmbPropertyTypeModel, resolves the right
 *                                      Property Editor UI (via the DataType) and renders it.
 *
 * Real, verified references (all under
 * src/Umbraco.Community.Skrivlet/Client/node_modules/@umbraco-cms/backoffice/dist-cms):
 *  - packages/content/content-type/structure/content-type-structure-manager.class.d.ts
 *  - packages/core/property/property-dataset/property-dataset-base-context.d.ts (+ .js)
 *  - packages/content/content/components/property-type-based-property/property-type-based-property.element.d.ts (+ .js)
 *  - packages/block/block/workspace/block-element-manager.js (the real end-to-end "glue" template)
 *  - packages/documents/document-types/repository/detail/document-type-detail.repository.d.ts
 *
 * Opened via `umbOpenModal(host, UMB_SKRIVLET_BLOCK_EDIT_MODAL, { data: { contentTypeKey, values } })`
 * (see skrivlet-block-edit-modal.token.ts) from the Editor.js "Umbraco Block" tool in
 * skrivlet-property-editor-ui.element.ts; registered as a `modal` extension in
 * skrivlet-block-edit-modal.manifest.ts.
 */
import { css, customElement, html, nothing, repeat, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbModalBaseElement } from '@umbraco-cms/backoffice/modal';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbContentTypeStructureManager } from '@umbraco-cms/backoffice/content-type';
import type { UmbPropertyTypeModel } from '@umbraco-cms/backoffice/content-type';
import { UmbDocumentTypeDetailRepository } from '@umbraco-cms/backoffice/document-type';
import { UmbPropertyDatasetContextBase } from '@umbraco-cms/backoffice/property';
import type { UmbPropertyValueData } from '@umbraco-cms/backoffice/property';
// Value (non-type-only) import: this executes the module graph that registers the
// `umb-property-type-based-property` custom element (see property-type-based-property.element.js,
// which calls `@customElement('umb-property-type-based-property')` at module-evaluation time).
// We don't reference the class directly, but we need the side effect.
import '@umbraco-cms/backoffice/content';
import type { UmbSkrivletBlockEditModalData, UmbSkrivletBlockEditModalValue } from './skrivlet-block-edit-modal.token.js';

export type { UmbSkrivletBlockEditModalData, UmbSkrivletBlockEditModalValue } from './skrivlet-block-edit-modal.token.js';

/**
 * A minimal, in-memory `UmbPropertyDatasetContext` (see property-dataset-context.interface.d.ts) that
 * backs a plain `Record<alias, value>` object instead of real persisted content/block data.
 *
 * We extend `UmbPropertyDatasetContextBase` (packages/core/property/property-dataset/
 * property-dataset-base-context.d.ts) rather than `UmbElementPropertyDatasetContext` (packages/content/
 * content/property-dataset-context/element-property-dataset.context.js, used by the real
 * UmbBlockElementManager) because the latter requires a full "data owner" object (an entity type,
 * a `structure` manager, a `readOnlyGuard`, `isLoaded()`, etc.) designed to sit inside a whole
 * workspace context stack - overkill (and largely unusable standalone) for editing one in-memory
 * object. `UmbPropertyDatasetContextBase` already implements everything `<umb-property>` actually reads
 * from the context (see property.context.js -> `consumeContext(UMB_PROPERTY_DATASET_CONTEXT, ...)`):
 * `properties`, `getProperties()`, `propertyValueByAlias()`, `setPropertyValue()`, `readOnly`, `name`,
 * `getVariantId()` (hardcoded to invariant - see UmbVariantId.CreateInvariant() inside the base class
 * constructor, property-dataset-base-context.js line ~45-47).
 *
 * Constructing this class auto-provides itself as UMB_PROPERTY_DATASET_CONTEXT on `host` (see
 * `UmbContextBase` constructor, libs/class-api/context-base.class.js: `this.provideContext(contextToken,
 * this)`), so any `<umb-property-type-based-property>`/`<umb-property>` rendered underneath `host` in
 * the DOM (even across shadow-root boundaries - that's how Umbraco's context-api is designed to work)
 * will pick it up ambiently. No manual `this.provideContext(...)` call is needed here.
 */
class UmbSkrivletBlockValuesPropertyDatasetContext extends UmbPropertyDatasetContextBase {
  constructor(host: UmbControllerHost, initialValues: Record<string, unknown>) {
    super(host);
    const properties: Array<UmbPropertyValueData> = Object.entries(initialValues).map(([alias, value]) => ({
      alias,
      value,
    }));
    this.setProperties(properties);
  }

  /** Flattens the current alias/value pairs back into a plain record, for resolving the modal. */
  getValuesRecord(): Record<string, unknown> {
    const record: Record<string, unknown> = {};
    for (const entry of this.getValues()) {
      record[entry.alias] = entry.value;
    }
    return record;
  }
}

interface UmbSkrivletPropertyGroup {
  /** Container id, or null for properties with no group/tab (rendered under the root). */
  id: string | null;
  name: string;
  properties: Array<UmbPropertyTypeModel>;
}

/**
 * The modal element itself.
 *
 * Rendering pipeline, end to end (mirrors the real UmbBlockElementManager/UmbBlockWorkspaceContext glue
 * in block-element-manager.js, minus everything that's specific to living inside a block workspace -
 * variant handling, validation-to-hints wiring, read-only guards driven by a parent workspace, etc):
 *
 *  1. `UmbContentTypeStructureManager` loads the element type (by key) and all of its composed/inherited
 *     structure - see `loadType()` in content-type-structure-manager.class.d.ts.
 *  2. We read the flattened property list via `getContentTypeProperties()` and group it by container
 *     (tab/group) id, resolving each group's display name via the synchronous
 *     `getMergedContainerById()` accessor (containers.d.ts / content-type-structure-manager.class.d.ts).
 *  3. We create our in-memory dataset context (above), which provides itself on `this`.
 *  4. Each `UmbPropertyTypeModel` is handed to a `<umb-property-type-based-property>` element, which
 *     resolves the Data Type's Property Editor UI itself (it does its own
 *     `UmbDataTypeDetailRepository` lookup - see property-type-based-property.element.js) and renders
 *     the actual property editor, wired up to our ambient dataset context via `<umb-property>`
 *     underneath it.
 */
@customElement('skrivlet-block-edit-modal')
export class UmbSkrivletBlockEditModalElement extends UmbModalBaseElement<
  UmbSkrivletBlockEditModalData,
  UmbSkrivletBlockEditModalValue
> {
  #structure = new UmbContentTypeStructureManager(this, new UmbDocumentTypeDetailRepository(this));
  #datasetContext?: UmbSkrivletBlockValuesPropertyDatasetContext;

  @state()
  private _isLoading = true;

  @state()
  private _loadError = false;

  @state()
  private _contentTypeName?: string;

  @state()
  private _groups: Array<UmbSkrivletPropertyGroup> = [];

  override firstUpdated() {
    this.#initialize();
  }

  async #initialize() {
    const contentTypeKey = this.data?.contentTypeKey;
    if (!contentTypeKey) {
      console.error('[skrivlet-block-edit-modal] No `contentTypeKey` was provided in modal data.');
      this._loadError = true;
      this._isLoading = false;
      return;
    }

    // Provide the in-memory dataset context before the structure/properties are loaded, so it's ready
    // by the time we first render <umb-property-type-based-property> elements.
    this.#datasetContext = new UmbSkrivletBlockValuesPropertyDatasetContext(this, this.data?.values ?? {});

    const { data: contentType } = await this.#structure.loadType(contentTypeKey);
    await this.#structure.whenLoaded();

    if (!contentType) {
      console.error(`[skrivlet-block-edit-modal] Could not load element type with key "${contentTypeKey}".`);
      this._loadError = true;
      this._isLoading = false;
      return;
    }

    this._contentTypeName = this.#structure.getOwnerContentType()?.name;

    const properties = await this.#structure.getContentTypeProperties();
    this._groups = this.#groupPropertiesByContainer(properties);
    this._isLoading = false;
  }

  #groupPropertiesByContainer(properties: Array<UmbPropertyTypeModel>): Array<UmbSkrivletPropertyGroup> {
    const groupsById = new Map<string, UmbSkrivletPropertyGroup>();

    for (const property of properties) {
      const containerId = property.container?.id ?? null;
      const key = containerId ?? '__root__';

      let group = groupsById.get(key);
      if (!group) {
        // getMergedContainerById merges the container across the content type's composed/inherited
        // content types - see content-type-structure-manager.class.d.ts `getMergedContainerById`.
        const mergedContainer = containerId ? this.#structure.getMergedContainerById(containerId) : undefined;
        group = {
          id: containerId,
          name: mergedContainer?.name ?? 'Content',
          properties: [],
        };
        groupsById.set(key, group);
      }

      group.properties.push(property);
    }

    return [...groupsById.values()];
  }

  #handleSave = () => {
    const values = this.#datasetContext?.getValuesRecord() ?? {};
    const contentTypeAlias = this.#structure.getOwnerContentType()?.alias ?? '';
    const contentTypeName = this._contentTypeName ?? '';

    this.value = { values, contentTypeAlias, contentTypeName };
    this._submitModal();
  };

  override render() {
    return html`
      <umb-body-layout headline=${this._contentTypeName ?? 'Edit block'}>
        ${this._isLoading ? this.#renderLoading() : this.#renderContent()}
        <div slot="actions">
          <uui-button label="Cancel" @click=${this._rejectModal}></uui-button>
          <uui-button
            label="Save"
            look="primary"
            color="positive"
            ?disabled=${this._loadError}
            @click=${this.#handleSave}
          ></uui-button>
        </div>
      </umb-body-layout>
    `;
  }

  #renderLoading() {
    return html`<div id="loading"><uui-loader></uui-loader></div>`;
  }

  #renderContent() {
    if (this._loadError) {
      return html`<p>Something went wrong loading this block's properties. See the browser console for details.</p>`;
    }

    if (!this._groups.length) {
      return html`<p>This element type has no properties to edit.</p>`;
    }

    return repeat(
      this._groups,
      (group) => group.id ?? '__root__',
      (group) => html`
        <div class="skrivlet-block-edit-modal__group">
          ${group.name ? html`<h4>${group.name}</h4>` : nothing}
          ${repeat(
            group.properties,
            (property) => property.unique,
            (property) => html`
              <umb-property-type-based-property
                .property=${property}
                .dataPath=${`$.values[?(@.alias == '${property.alias}')].value`}
                .ownerEntityType=${'element'}
              ></umb-property-type-based-property>
            `,
          )}
        </div>
      `,
    );
  }

  static override readonly styles = [
    UmbTextStyles,
    css`
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
    `,
  ];
}

export default UmbSkrivletBlockEditModalElement;

declare global {
  interface HTMLElementTagNameMap {
    'skrivlet-block-edit-modal': UmbSkrivletBlockEditModalElement;
  }
}
