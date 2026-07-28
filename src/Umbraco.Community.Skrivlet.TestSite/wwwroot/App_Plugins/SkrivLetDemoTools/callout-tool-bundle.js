// Example third-party Editor.js tool, registered with SkrivLet's `skrivletTool` extension point.
// See the README's "Extending > Adding your own Editor.js tools" section. This file is deliberately
// plain, hand-written JS (no build step) - a real package would normally ship this from its own
// bundled Client project instead, but the manifest/registration shape is identical either way.
class CalloutTool {
  static get toolbox() {
    return {
      title: 'Callout',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"></path><path d="M12 17h.01"></path><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>',
    };
  }

  constructor({ data }) {
    this.data = { text: data.text || '' };
    this.wrapper = null;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('skrivlet-demo-callout');
    this.wrapper.contentEditable = 'true';
    this.wrapper.dataset.placeholder = 'Type a callout message…';
    this.wrapper.innerHTML = this.data.text;
    return this.wrapper;
  }

  save(blockContent) {
    return { text: blockContent.innerHTML };
  }

  validate(savedData) {
    return !!savedData.text?.trim();
  }

  static get sanitize() {
    return { text: { b: true, i: true, a: { href: true } } };
  }
}

const CALLOUT_CSS = `
  .skrivlet-demo-callout {
    padding: 12px 16px;
    border-left: 4px solid #f7c948;
    background: #fff8e1;
    border-radius: 4px;
  }
  .skrivlet-demo-callout:empty::before {
    content: attr(data-placeholder);
    color: #9c9c9c;
  }
`;

export const manifests = [
  {
    type: 'skrivletTool',
    alias: 'SkrivLet.Demo.CalloutTool',
    name: 'SkrivLet Demo Callout Tool',
    js: () => Promise.resolve({ default: CalloutTool }),
    css: () => Promise.resolve({ default: CALLOUT_CSS }),
    meta: {
      toolKey: 'callout',
      inlineToolbar: false,
    },
  },
];
