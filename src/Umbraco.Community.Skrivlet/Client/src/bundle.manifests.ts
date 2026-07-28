import { manifests as propertyeditors } from "./propertyeditors/manifest.js";
import { manifests as blockEditModal } from "./propertyeditors/skrivlet-block-edit-modal.manifest.js";

// Job of the bundle is to collate all the manifests from different parts of the extension and load other manifests
// We load this bundle from umbraco-package.json
export const manifests: Array<UmbExtensionManifest> = [
  ...propertyeditors,
  ...blockEditModal,
];
