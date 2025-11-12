import { LitElement, html, css, customElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import type { UmbPropertyEditorUiElement } from '@umbraco-cms/backoffice/property-editor';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';

// EditorJS imports (these will need to be available globally or imported differently)
declare global {
  const EditorJS: any;
  const Header: any;
  const Quote: any;
  const CodeTool: any;
  const RawTool: any;
  const List: any;
  const Checklist: any;
  const Embed: any;
  const DragDrop: any;

  interface Window {
    editorService: any;
  }
}

@customElement('skrivlet-property-editor-ui')
export class SkrivLetPropertyEditorUIElement extends LitElement implements UmbPropertyEditorUiElement {
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
      initialData = this.value ? this.value : {};
    }
    return initialData;
  }

  private async _initializeEditor() {
    const editorContainer = this.shadowRoot?.getElementById(this._editorId);
    if (!editorContainer || !window.EditorJS) {
      console.error('EditorJS or container not available');
      return;
    }

    // Wait for EditorJS and tools to be available
    await this._waitForEditorJS();

    this._editor = new EditorJS({
      holder: editorContainer,
      placeholder: "Type '/' to insert a block or just start typing something super...",
      data: this._getInitialData(),
      inlineToolbar: true,
      readOnly: this.readonly,
      tools: {
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
          class: List,
          inlineToolbar: true
        },
        checklist: Checklist,
        link: this._createUmbracoLinkTool()
      },
      onChange: (api: any, event: any) => {
        this._stopUmbracosInterferingHotKeys();
        this._editor.save().then((outputData: any) => {
          this.value = JSON.stringify(outputData);
          this._dispatchChangeEvent();
        }).catch((error: any) => {
          console.log('Saving failed: ', error);
        });
      },
      onReady: () => {
        if (window.DragDrop) {
          new DragDrop(this._editor);
        }
        this._stopUmbracosInterferingHotKeys();
      }
    });
  }

  private async _waitForEditorJS(): Promise<void> {
    let attempts = 0;
    const maxAttempts = 50;

    while (!window.EditorJS && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }

    if (!window.EditorJS) {
      throw new Error('EditorJS failed to load');
    }
  }

  private _createUmbracoLinkTool() {
    const self = this;

    return class UmbracoLinkTool {
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
        if (this._state) {
          this.unwrap(range);
          return;
        }
        this.openLinkPicker(range);
      }

      openLinkPicker(range: any) {
        // For now, we'll need to integrate with Umbraco's modern link picker
        // This will need to be updated when we have access to the new service APIs
        if (window.editorService && window.editorService.linkPicker) {
          window.editorService.linkPicker({
            multiPicker: false,
            submit: (result: any) => {
              window.editorService.close();
              if (result.target.udi) {
                this.wrap(range, result.target.udi);
              } else {
                this.wrap(range, result.target.url);
              }
            },
            close: () => {
              window.editorService.close();
            }
          });
        }
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
        this._state = !!link;
        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this._state);
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
    const self = this;

    return class UmbracoImageTool {
      static get toolbox() {
        return {
          title: 'Image',
          icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
      }

      constructor({ data, api, config }: any) {
        this.api = api;
        this.config = config || {};
        this.data = {
          url: data.url || '',
          alt: data.alt || '',
          udi: data.udi || ''
        };
      }

      render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('simple-image');

        const image = document.createElement('img');
        image.src = this.data.url;
        image.alt = this.data.alt;

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('umb-group-builder__group-add-property', 'skriv-let__add-image-button');
        button.textContent = this.data.url ? "Change image" : "Select an image";

        button.addEventListener('click', () => {
          this._openMediaPicker();
        });

        wrapper.appendChild(image);
        wrapper.appendChild(button);
        return wrapper;
      }

      _openMediaPicker() {
        if (window.editorService && window.editorService.mediaPicker) {
          window.editorService.mediaPicker({
            onlyImages: true,
            multiPicker: false,
            submit: (item: any) => {
              const imageUrl = item.selection[0].image;
              const imageAlt = item.selection[0].name;
              this.data.url = imageUrl;
              this.data.alt = imageAlt;
              this.data.udi = item.selection[0].udi;
              this.data.width = parseInt(item.selection[0].width);
              this.data.height = parseInt(item.selection[0].height);
              window.editorService.close();
            },
            close: () => {
              window.editorService.close();
            }
          });
        }
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

  private _createEmbedWithUI() {
    return class EmbedWithUI extends Embed {
      static get toolbox() {
        return {
          title: 'Video',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube w-6 h-6 mx-1"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>'
        };
      }

      render() {
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
          <uui-icon name="icon-expand"></uui-icon>
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
      }

      .skriv-let__container {
        min-height: 200px;
        border: 1px solid var(--uui-color-border);
        border-radius: var(--uui-border-radius);
        padding: var(--uui-size-space-4);
      }

      .skriv-let__fullscreen-button {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
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
        border: 0;
      }

      /* EditorJS styling integration */
      .skriv-let__container :global(.cdx-block) {
        padding: 0.4em 0;
      }

      .skriv-let__container :global(.ce-block__content) {
        max-width: none;
      }

      .skriv-let__container :global(.ce-toolbar__content) {
        max-width: none;
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
