import { html, css, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import { umbOpenModal } from '@umbraco-cms/backoffice/modal';
import { UMB_LINK_PICKER_MODAL } from '@umbraco-cms/backoffice/multi-url-picker';
import type { UmbLinkPickerLink } from '@umbraco-cms/backoffice/multi-url-picker';
import { UMB_MEDIA_PICKER_MODAL, UmbMediaItemRepository, UmbMediaUrlRepository } from '@umbraco-cms/backoffice/media';
import { getGuidFromUdi, imageSize } from '@umbraco-cms/backoffice/utils';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';
import { loadManifestPlainCss } from '@umbraco-cms/backoffice/extension-api';
import type { ManifestSkrivletTool, UmbSkrivletToolLoaderProperty } from './skrivlet-tool.model.js';
import { UMB_DOCUMENT_TYPE_PICKER_MODAL, UmbDocumentTypeDetailRepository } from '@umbraco-cms/backoffice/document-type';
import type { UmbDocumentTypeTreeItemModel } from '@umbraco-cms/backoffice/document-type';
import { UMB_SKRIVLET_BLOCK_EDIT_MODAL } from './skrivlet-block-edit-modal.token.js';

import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
//@ts-ignore
import RawTool from '@editorjs/raw';
import EditorjsList from '@editorjs/list';
//@ts-ignore
import Checklist from '@editorjs/checklist';
//@ts-ignore
import Embed from '@editorjs/embed';
//@ts-ignore
import DragDrop from "editorjs-drag-drop";

const BUILT_IN_TOOL_KEYS = new Set(['header', 'image', 'quote', 'embed', 'code', 'raw', 'list', 'checklist', 'link', 'umbracoBlock']);

/**
 * Resolves a `skrivletTool` manifest's `js` loader to the actual Editor.js Tool class - a bare class
 * reference, or a loader function/module whose resolved value has a `default` or `api` export. See the
 * `UmbSkrivletToolLoaderProperty` doc comment for why this isn't just Umbraco's own `loadManifestApi`.
 */
async function loadSkrivletToolClass(property: UmbSkrivletToolLoaderProperty): Promise<any> {
  if (typeof property === 'function') {
    if (property.prototype) {
      // Bare class constructor.
      return property;
    }
    const result = await (property as () => Promise<Record<string, unknown>>)();
    return (result?.default ?? result?.api) as any;
  }
  if (typeof property === 'string') {
    const result = await import(/* @vite-ignore */ property);
    return result?.default ?? result?.api;
  }
  return undefined;
}

@customElement('skrivlet-property-editor-ui')
export class SkrivLetPropertyEditorUIElement extends UmbLitElement implements UmbPropertyEditorUiElement {
  @property({ type: String })
  public value = '';

  @property({ type: Boolean, attribute: 'readonly' })
  public readonly = false;

  @state()
  private _editorId = '';

  @state()
  private _editor: any = null;

  constructor() {
    super();
    this._editorId = 'skrivlet-editor-' + this._randomUUID();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    if (this._editor) {
      this._editor.destroy();
    }
  }

  override firstUpdated() {
    this._initializeEditor();
  }

  private _randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private _getInitialData() {
    let initialData = {};
    if (!this.value) {
      initialData = {};
    } else if (typeof this.value === 'string') {
      try {
        initialData = JSON.parse(this.value);
      } catch (e) {
        console.error('Error parsing SkrivLet initial data JSON:', e);
      }
    } else {
      initialData = this.value ? this.value as OutputData : {} as OutputData;
    }
    return initialData;
  }

  private async _initializeEditor() {
    const editorContainer = this.shadowRoot?.getElementById(this._editorId);
    if (!editorContainer) {
      console.error('EditorJS or container not available');
      return;
    }

    const thirdPartyTools = await this._getThirdPartyTools();

    this._editor = new EditorJS({
      holder: editorContainer,
      placeholder: "Type '/' to insert a block or just start typing something super...",
      data: this._getInitialData() as OutputData,
      inlineToolbar: true,
      readOnly: this.readonly,
      shadowRoot: this.shadowRoot || undefined,
      tools: {
        ...thirdPartyTools,
        header: Header,
        image: this._createUmbracoImageTool(),
        quote: Quote,
        embed: {
          class: this._createEmbedWithUI(),
          config: {
            services: {
              youtube: true,
              vimeo: true
            }
          }
        },
        code: CodeTool,
        raw: RawTool,
        list: {
          class: EditorjsList,
          inlineToolbar: true
        },
        //checklist: Checklist,
        link: this._createUmbracoLinkTool(),
        umbracoBlock: this._createUmbracoBlockTool()
      },
      onChange: () => {
        this._stopUmbracosInterferingHotKeys();
        this._editor.save().then((outputData: any) => {
          this.value = JSON.stringify(outputData);
          this._dispatchChangeEvent();
        }).catch((error: any) => {
          console.log('Saving failed: ', error);
        });
      },
      onReady: () => {
        if (DragDrop) {
          new DragDrop(this._editor);
        }
        this._stopUmbracosInterferingHotKeys();


      }
    });
  }

  /**
   * Merges any third-party tools registered via a `skrivletTool` extension manifest into the
   * Editor.js `tools: {}` config. A tool that reuses a built-in key (or is otherwise invalid)
   * is skipped with a console warning rather than breaking the whole editor.
   */
  private async _getThirdPartyTools(): Promise<Record<string, unknown>> {
    const manifests = umbExtensionsRegistry.getByType('skrivletTool') as Array<ManifestSkrivletTool>;
    const tools: Record<string, unknown> = {};

    await Promise.all(
      manifests.map(async (manifest) => {
        const toolKey = manifest.meta?.toolKey;
        if (!toolKey) {
          console.warn(`[SkrivLet] Ignoring tool manifest "${manifest.alias}": meta.toolKey is required.`);
          return;
        }
        if (BUILT_IN_TOOL_KEYS.has(toolKey)) {
          console.warn(`[SkrivLet] Ignoring tool manifest "${manifest.alias}": "${toolKey}" is a reserved built-in tool key.`);
          return;
        }

        const toolClass = await loadSkrivletToolClass(manifest.js);
        if (!toolClass) {
          console.warn(`[SkrivLet] Ignoring tool manifest "${manifest.alias}": failed to load its tool class.`);
          return;
        }

        if (manifest.css) {
          const css = await loadManifestPlainCss(manifest.css);
          if (css) this._adoptThirdPartyStylesheet(css);
        }

        tools[toolKey] = { class: toolClass, config: manifest.meta.config, inlineToolbar: manifest.meta.inlineToolbar };
      }),
    );

    return tools;
  }

  private _adoptThirdPartyStylesheet(css: string) {
    if (!this.shadowRoot) return;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, sheet];
  }

  private async _openUmbracoLinkPicker(currentLink?: UmbLinkPickerLink): Promise<UmbLinkPickerLink | undefined> {
    const result = await umbOpenModal(this, UMB_LINK_PICKER_MODAL, {
      data: {
        config: {},
        index: null,
        isNew: !currentLink?.url,
      },
      value: {
        link: currentLink ?? {},
      },
    }).catch(() => undefined);

    return result?.link;
  }

  private async _openUmbracoMediaPicker(currentMediaUdi?: string): Promise<{ url: string; alt: string; udi: string; width: number; height: number } | undefined> {
    const currentUnique = currentMediaUdi ? getGuidFromUdi(currentMediaUdi) : undefined;

    const result = await umbOpenModal(this, UMB_MEDIA_PICKER_MODAL, {
      data: { multiple: false },
      value: { selection: currentUnique ? [currentUnique] : [] },
    }).catch(() => undefined);

    const unique = result?.selection?.[0];
    if (!unique) return undefined;

    const mediaItemRepository = new UmbMediaItemRepository(this);
    const mediaUrlRepository = new UmbMediaUrlRepository(this);

    const [{ data: items }, { data: urls }] = await Promise.all([
      mediaItemRepository.requestItems([unique]),
      mediaUrlRepository.requestItems([unique]),
    ]);

    const url = urls?.[0]?.url;
    if (!url) return undefined;

    const { width, height } = await imageSize(url);

    return {
      url,
      alt: items?.[0]?.variants?.[0]?.name ?? items?.[0]?.name ?? '',
      udi: `umb://media/${unique.replace(/-/g, '')}`,
      width,
      height,
    };
  }

  /** Lets the editor choose which element type (a Document Type with isElement === true) to insert. */
  private async _openUmbracoElementTypePicker(): Promise<{ unique: string; alias: string; name: string } | undefined> {
    const result = await umbOpenModal(this, UMB_DOCUMENT_TYPE_PICKER_MODAL, {
      data: {
        filter: (item: UmbDocumentTypeTreeItemModel) => item.isElement,
      },
    }).catch(() => undefined);

    const unique = result?.selection?.[0];
    if (!unique) return undefined;

    const detailRepository = new UmbDocumentTypeDetailRepository(this);
    const { data: contentType } = await detailRepository.requestByUnique(unique);
    if (!contentType) return undefined;

    return { unique, alias: contentType.alias, name: contentType.name };
  }

  /** Opens the bespoke property-editing modal (skrivlet-block-edit-modal.element.ts) for a block instance. */
  private async _openUmbracoBlockEditModal(contentTypeKey: string, values: Record<string, unknown>) {
    return umbOpenModal(this, UMB_SKRIVLET_BLOCK_EDIT_MODAL, {
      data: { contentTypeKey, values },
    }).catch(() => undefined);
  }

  private _createUmbracoLinkTool() {
    const host = this;
    return class UmbracoLinkTool {
      api: any;
      button: HTMLButtonElement | null;
      element: HTMLElement | null;
      tag: string;
      class: string;
      private _state: boolean;
      static get isInline() { return true; }

      constructor({ api }: any) {
        this.api = api;
        this.button = null;
        this._state = false;
        this.element = null;
        this.tag = 'A';
        this.class = 'cdx-link';
      }

      render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"></path></svg>';
        this.button.classList.add(this.api.styles.inlineToolButton);
        return this.button;
      }

      surround(range: any) {
        if (this.state) {
          this.unwrap(range);
          return;
        }
        this.openLinkPicker(range);
      }

      openLinkPicker(range: any) {
        host._openUmbracoLinkPicker().then((link) => {
          if (link?.url) {
            this.wrap(range, link.url);
          }
        });
      }

      wrap(range: any, url: string) {
        const selectedText = range.extractContents();
        const link = document.createElement(this.tag);
        link.classList.add(this.class);
        link.setAttribute('href', url);
        link.appendChild(selectedText);
        range.insertNode(link);
        this.api.selection.expandToTag(link);
        this.element = link;
      }

      unwrap(range: any) {
        const link = this.api.selection.findParentTag(this.tag, this.class);
        const text = range.extractContents();
        link.remove();
        range.insertNode(text);
      }

      checkState() {
        const link = this.api.selection.findParentTag(this.tag);
        this.state = !!link;
        this.button?.classList.toggle(this.api.styles.inlineToolButtonActive, this.state);
      }

      get state() { return this._state; }
      set state(state: boolean) {
        this._state = state;
        if (this.button) {
          this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
        }
      }

      static get sanitize() {
        return { a: { href: true } };
      }
    };
  }

  private _createUmbracoImageTool() {
    const host = this;
    return class UmbracoImageTool {
      api: any;
      config: any;
      data: { url: any; alt: any; udi: any; width?: number; height?: number; };
      private wrapper: HTMLElement | null;
      private image: HTMLImageElement | null;
      private button: any;

      static get toolbox() {
        return {
          title: 'Image',
          icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
      }

      constructor({ data, api, config }: any) {
        this.api = api;
        this.config = config || {};
        this.wrapper = null;
        this.image = null;
        this.button = null;
        this.data = {
          url: data.url || '',
          alt: data.alt || '',
          udi: data.udi || ''
        };
      }

      render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('simple-image');

        this.image = document.createElement('img');
        this.image.src = this.data.url;
        this.image.alt = this.data.alt;
        this.image.hidden = !this.data.url;

        this.image.addEventListener('click', () => {
          this._openMediaPicker();
        });

        this.button = document.createElement('uui-button');
        this.button.type = 'button';
        this.button.classList.add('skriv-let__add-image-button');

        this.button.addEventListener('click', () => {
          this._openMediaPicker();
        });

        this._updateButton();

        this.wrapper.appendChild(this.image);
        this.wrapper.appendChild(this.button);
        return this.wrapper;
      }

      rendered() {
        // Once a freshly inserted (still empty) block is actually in the DOM, focus the picker button.
        if (!this.data.url) {
          this.button?.focus();
        }
      }

      _updateButton() {
        if (!this.button) return;

        const hasImage = !!this.data.url;
        const label = hasImage ? 'Change image' : 'Select an image';

        this.button.look = hasImage ? 'secondary' : 'placeholder';
        this.button.label = label;

        this.button.innerHTML = '';
        const icon = document.createElement('uui-icon');
        icon.name = hasImage ? 'icon-edit' : 'icon-picture';
        icon.setAttribute('aria-hidden', 'true');

        const labelSpan = document.createElement('span');
        labelSpan.textContent = label;

        this.button.append(icon, labelSpan);
      }

      _openMediaPicker() {
        host._openUmbracoMediaPicker(this.data.udi).then((media) => {
          if (!media) return;

          this.data.url = media.url;
          this.data.alt = media.alt;
          this.data.udi = media.udi;
          this.data.width = media.width;
          this.data.height = media.height;

          if (this.image) {
            this.image.src = media.url;
            this.image.alt = media.alt;
            this.image.hidden = false;
          }

          this._updateButton();
        });
      }

      save() {
        return {
          url: this.data.url,
          alt: this.data.alt,
          udi: this.data.udi,
          width: this.data.width,
          height: this.data.height
        };
      }

      validate(savedData: any) {
        return !!(savedData.url?.trim() && savedData.udi?.trim());
      }
    };
  }

  private _createUmbracoBlockTool() {
    const host = this;
    return class UmbracoBlockTool {
      api: any;
      data: { contentTypeKey: string; contentTypeAlias: string; contentTypeName: string; udi: string; values: Record<string, unknown> };
      private wrapper: HTMLElement | null;
      private preview: HTMLElement | null;
      private button: any;

      static get toolbox() {
        return {
          title: 'Umbraco Block',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
        };
      }

      constructor({ data }: any) {
        this.wrapper = null;
        this.preview = null;
        this.button = null;
        this.data = {
          contentTypeKey: data.contentTypeKey || '',
          contentTypeAlias: data.contentTypeAlias || '',
          contentTypeName: data.contentTypeName || '',
          udi: data.udi || '',
          values: data.values || {},
        };
      }

      render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('skriv-let__umbraco-block');

        this.preview = document.createElement('div');
        this.preview.classList.add('skriv-let__umbraco-block-preview');
        this.preview.addEventListener('click', () => this._openEditModal());

        this.button = document.createElement('uui-button');
        this.button.type = 'button';
        this.button.classList.add('skriv-let__add-image-button');
        this.button.addEventListener('click', () => this._openEditModal());

        this._updatePreview();
        this._updateButton();

        this.wrapper.appendChild(this.preview);
        this.wrapper.appendChild(this.button);
        return this.wrapper;
      }

      rendered() {
        if (!this.data.contentTypeAlias) {
          this.button?.focus();
        }
      }

      _updatePreview() {
        if (!this.preview) return;
        const propertyCount = Object.keys(this.data.values).length;
        const displayName = this.data.contentTypeName || this.data.contentTypeAlias;
        this.preview.hidden = !this.data.contentTypeAlias;
        this.preview.textContent = displayName
          ? `${displayName} (${propertyCount} propert${propertyCount === 1 ? 'y' : 'ies'})`
          : '';
      }

      _updateButton() {
        if (!this.button) return;

        const hasBlock = !!this.data.contentTypeAlias;
        const label = hasBlock ? 'Edit block' : 'Insert block';

        this.button.look = hasBlock ? 'secondary' : 'placeholder';
        this.button.label = label;

        this.button.innerHTML = '';
        const icon = document.createElement('uui-icon');
        icon.name = hasBlock ? 'icon-edit' : 'icon-add';
        icon.setAttribute('aria-hidden', 'true');

        const labelSpan = document.createElement('span');
        labelSpan.textContent = label;

        this.button.append(icon, labelSpan);
      }

      async _openEditModal() {
        let contentTypeKey = this.data.contentTypeKey;
        let contentTypeAlias = this.data.contentTypeAlias;

        if (!contentTypeKey) {
          const picked = await host._openUmbracoElementTypePicker();
          if (!picked) return;
          contentTypeKey = picked.unique;
          contentTypeAlias = picked.alias;
        }

        const result = await host._openUmbracoBlockEditModal(contentTypeKey, this.data.values);
        if (!result) return;

        this.data.contentTypeKey = contentTypeKey;
        this.data.contentTypeAlias = result.contentTypeAlias || contentTypeAlias;
        this.data.contentTypeName = result.contentTypeName || this.data.contentTypeName;
        this.data.values = result.values;
        if (!this.data.udi) {
          this.data.udi = `umb://element/${host._randomUUID().replace(/-/g, '')}`;
        }

        this._updatePreview();
        this._updateButton();
      }

      save() {
        return {
          contentTypeKey: this.data.contentTypeKey,
          contentTypeAlias: this.data.contentTypeAlias,
          contentTypeName: this.data.contentTypeName,
          udi: this.data.udi,
          values: this.data.values,
        };
      }

      validate(savedData: any) {
        return !!(savedData.contentTypeKey?.trim() && savedData.udi?.trim());
      }
    };
  }

  private _createEmbedWithUI() {
    return class EmbedWithUI extends Embed {
      static get toolbox() {
        return {
          title: 'Video',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube w-6 h-6 mx-1"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>'
        };
      }

      render() {
        //@ts-ignore
        if (!this.data.service) {
          const container = document.createElement('div');
          const label = document.createElement('label');
          label.innerHTML = 'Enter a URL to embed a video from YouTube or Vimeo';
          label.classList.add('cdx-label');

          const input = document.createElement('input');
          input.setAttribute('type', 'url');
          input.classList.add('cdx-input');

          input.addEventListener('paste', (event: any) => {
            const url = event.clipboardData.getData('text');
            const service = Object.keys(Embed.services).find((key) => Embed.services[key].regex.test(url));
            if (service) {
              //@ts-ignore
              this.onPaste({detail: {key: service, data: url}});
            }
          });

          container.appendChild(label);
          container.appendChild(input);
          return container;
        }
        return super.render();
      }

      validate(savedData: any) {
        return !!(savedData.service && savedData.source);
      }
    };
  }

  private _openFullscreen() {
    const editorContainer = this.shadowRoot?.getElementById(this._editorId);
    if (!editorContainer) return;

    if (!document.fullscreenElement) {
      editorContainer.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  private _stopUmbracosInterferingHotKeys() {
    const editableElements = this.shadowRoot?.querySelectorAll('.cdx-block:not([disable-hotkeys="true"]),.ce-header:not([disable-hotkeys="true"]),.cdx-input:not([disable-hotkeys="true"]),.cdx-checklist__item-text:not([disable-hotkeys="true"])');
    editableElements?.forEach((element) => {
      element.setAttribute('disable-hotkeys', 'true');
    });
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    // Prevent certain keyboard shortcuts from interfering with editor
    if (event.ctrlKey || event.metaKey) {
      event.stopPropagation();
    }
    // Prevent Enter from being intercepted by Umbraco's backoffice block handlers,
    // which causes the selected block to shift down instead of EditorJS creating a new block.
    // EditorJS has already handled Enter inside the shadow DOM before it crosses the boundary.
    if (event.key === 'Enter') {
      event.stopPropagation();
    }
  };

  private _dispatchChangeEvent() {
    this.dispatchEvent(new UmbChangeEvent());
  }

  override render() {
    return html`
      <div class="skriv-let">
        <div id="${this._editorId}" class="skriv-let__container"></div>
        <input type="hidden" .value=${this.value} />
        <uui-button
          class="skriv-let__fullscreen-button"
          @click=${this._openFullscreen}
          type="button"
          look="outline"
          label="Open editor in fullscreen"
        >
          <uui-icon name="icon-fullscreen" aria-hidden="true"></uui-icon>
          <span class="sr-only">Open editor in fullscreen</span>
        </uui-button>
      </div>
    `;
  }

  static override readonly styles = [
    UmbTextStyles,
    css`
      .skriv-let {
          position: relative;
          background-color: white;
          max-width: 920px;
          margin: 0 auto;
      }

      .skriv-let.cdx-search-field__input {
          width: auto;
      }

      .ce-popover__container {
          width: 250px;
      }

      @media (min-width: 651px) {
          .ce-block__content {
              max-width: calc(100% - 120px) !important;
              margin: 0 60px;
          }
      }

      @media (min-width: 651px) {
          .ce-toolbar__content {
              width: 0px !important;
              margin: 0 50px;
          }
      }

      .cdx-block {
          max-width: 100% !important;
      }

      @media (min-width: 651px) {
          .codex-editor--narrow .ce-toolbox .ce-popover {
              left: 0;
              right: 0;
          }
      }

      @media (min-width: 651px) {
          .codex-editor--narrow .ce-settings .ce-popover {
              right: 0;
              left: 0;
          }
      }

      .ce-popover {
          width: auto !important;
      }

      .ce-popover--inline .ce-popover--nested .ce-popover__container {
          width: 250px;
      }

          .skriv-let-data {
              margin: 0 auto;
              max-width: 800px;
          }

      .cdx-label {
          font-weight: 700;
      }

      .ce-paragraph,
      .cdx-list__item,
      .cdx-quote__text,
      .cdx-checklist__item-text,
      .embed-tool__caption {
          font-size: 1.0675rem;
          line-height: 1.5;
      }

      /* Image */
      .simple-image {
          padding: 20px 0;
      }

      .simple-image img {
          scroll-margin-top: 20px;
          cursor: pointer;
      }

      .simple-image input,
      .simple-image [contenteditable] {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e4e4e4;
          background: #fff;
          box-sizing: border-box;
          border-radius: 3px;
          outline: none;
          font-size: 1.125rem;
          height: auto;
      }

      .simple-image input {
          margin-bottom: 7px;
      }

      .simple-image img {
          max-width: 100%;
          margin-bottom: 15px;
          border-radius: var(--uui-border-radius, 6px);
          border: 1px solid var(--uui-color-border, #e8e8eb);
      }

      .simple-image img[hidden] {
          display: none;
      }

      .simple-image.withBorder img {
          border: 1px solid #e8e8eb;
      }

      .skriv-let__add-image-button {
          --uui-button-padding-top-factor: 3;
          --uui-button-padding-bottom-factor: 3;
          width: 100%;
          font-size: 0.9rem;
          cursor: pointer;
      }

      .skriv-let__add-image-button uui-icon {
          font-size: 1.2em;
          margin-right: 5px;
      }

      .simple-image img:not([hidden]) + .skriv-let__add-image-button {
          width: auto;
          --uui-button-padding-top-factor: 1;
          --uui-button-padding-bottom-factor: 1;
      }

      .simple-image.withBackground {
          background: #eff2f5;
          padding: 10px;
      }

      .simple-image.withBackground img {
          display: block;
          max-width: 60%;
          margin: 0 auto 15px;
      }

      /* Umbraco Block */
      .skriv-let__umbraco-block {
          padding: 20px 0;
      }

      .skriv-let__umbraco-block-preview {
          padding: 10px 12px;
          margin-bottom: 7px;
          border: 1px solid var(--uui-color-border, #e8e8eb);
          border-radius: var(--uui-border-radius, 6px);
          cursor: pointer;
      }

      .skriv-let__umbraco-block-preview[hidden] {
          display: none;
      }

      /* Fullscreen */

      .skriv-let__fullscreen-button {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0;
          padding: 0;
          height: 50px;
          width: 50px;
          background-color: transparent;
          color: #1d202b;
          border: none;
          appearance: none;
          cursor: pointer;
          z-index: 100;
          border-radius: 7px;
      }

      @media (max-width: 650px) {
          .skriv-let__fullscreen-button {
              background-color: #fff;
              border: 1px solid #E8E8EB;
          }
      }

      .skriv-let__fullscreen-button:hover {
          background-color: #eff2f5;
      }

      .skriv-let__container:fullscreen {
          background-color: white;
          color: #242424;
          line-height: 1.5;
          padding: 20px;
          height: 100dvh;
          overflow-y: scroll;
      }

      .skriv-let__container:fullscreen .codex-editor {
          max-width: 1080px;
          margin: 0 auto;
      }

      /* Hide elements that won't work in fullscreen */
      .skriv-let__container:fullscreen .skriv-let__add-image-button,
      .skriv-let__container:fullscreen .ce-popover-item[data-item-name="image"],
      .skriv-let__container:fullscreen .ce-popover-item-html[data-item-name="link"] {
          display: none;
      }

      .skriv-let__container:fullscreen .ce-paragraph,
      .skriv-let__container:fullscreen .cdx-list__item,
      .skriv-let__container:fullscreen .cdx-quote__text,
      .skriv-let__container:fullscreen .cdx-checklist__item-text,
      .skriv-let__container:fullscreen .embed-tool__caption {
          font-size: 1.25rem;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }
    `
  ];
}

export default SkrivLetPropertyEditorUIElement;

declare global {
  interface HTMLElementTagNameMap {
    'skrivlet-property-editor-ui': SkrivLetPropertyEditorUIElement;
  }
}
