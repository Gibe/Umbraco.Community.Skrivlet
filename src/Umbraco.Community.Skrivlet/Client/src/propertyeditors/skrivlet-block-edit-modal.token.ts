import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

/**
 * Data passed into the Skrivlet block edit modal when opening it.
 * `values` is a flat alias -> value record (mirrors the shape editors already use elsewhere in this
 * package for property editor values). Pass `{}` for a brand-new block instance.
 */
export interface UmbSkrivletBlockEditModalData {
  /** The unique (key) of the element type (a Document Type with isElement === true) to render properties for. */
  contentTypeKey: string;
  /** Existing property values, keyed by property alias. Empty/undefined for a new block. */
  values?: Record<string, unknown>;
}

/** Value resolved by the modal on Save. */
export interface UmbSkrivletBlockEditModalValue {
  /** The (possibly edited) property values, keyed by property alias. */
  values: Record<string, unknown>;
  /** The alias of the element type, resolved from the loaded content type - handy for serializing. */
  contentTypeAlias: string;
}

export const SKRIVLET_BLOCK_EDIT_MODAL_ALIAS = 'Umbraco.Community.Skrivlet.BlockEditModal';

/**
 * Modal token for the Skrivlet Block Edit modal (implemented in umbraco-block-edit-modal.element.ts,
 * registered lazily via skrivlet-block-edit-modal.manifest.ts). Kept in its own file, separate from the
 * (heavier) modal element implementation, so importing the token to call `umbOpenModal` doesn't drag the
 * whole property-editing pipeline into the main SkrivLet property editor bundle.
 *
 * Uses `type: 'sidebar'` rather than `'dialog'` because Umbraco's modal host only reads `size` for
 * sidebar modals (see modal.element.js `#createDialogElement()` vs `#createSidebarElement()`) - a
 * dialog modal ignores `size` entirely and falls back to `uui-dialog`'s narrow default width. This
 * also matches Umbraco's own block-editing modal (UMB_BLOCK_WORKSPACE_MODAL), which uses the same
 * `sidebar` + `large` combination.
 */
export const UMB_SKRIVLET_BLOCK_EDIT_MODAL = new UmbModalToken<
  UmbSkrivletBlockEditModalData,
  UmbSkrivletBlockEditModalValue
>(SKRIVLET_BLOCK_EDIT_MODAL_ALIAS, {
  modal: {
    type: 'sidebar',
    size: 'large',
  },
});
