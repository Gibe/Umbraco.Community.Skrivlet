// Example third-party Editor.js tool, registered with SkrivLet's `skrivletTool` extension point.
// See the README's "Extending > Adding your own Editor.js tools" section. This file is deliberately
// plain, hand-written JS (no build step) - a real package would normally ship this from its own
// bundled Client project instead, but the manifest/registration shape is identical either way.
const CONFETTI_COLORS = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#f8961e'];
const CONFETTI_PIECE_COUNT = 24;

class ConfettiTool {
  static get toolbox() {
    return {
      title: 'Confetti',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 16 8"></path><path d="m17 2 1.6 1.6"></path><path d="m19 4 3 3"></path><path d="M10.5 5.5 12 4"></path><path d="M15 3.5 16.5 2"></path><path d="M18.5 8 20 6.5"></path><path d="m2.5 19.5 2 2"></path><path d="m4 15.5 5 5"></path></svg>',
    };
  }

  constructor({ data }) {
    this.data = { text: data.text || '' };
    this.wrapper = null;
    this.editable = null;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('skrivlet-demo-confetti');
    this.wrapper.appendChild(this.buildConfettiLayer());

    this.editable = document.createElement('div');
    this.editable.classList.add('skrivlet-demo-confetti__text');
    this.editable.contentEditable = 'true';
    this.editable.dataset.placeholder = 'Type something worth celebrating…';
    this.editable.innerHTML = this.data.text;
    this.wrapper.appendChild(this.editable);

    return this.wrapper;
  }

  buildConfettiLayer() {
    const layer = document.createElement('div');
    layer.classList.add('skrivlet-demo-confetti__pieces');
    layer.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < CONFETTI_PIECE_COUNT; i++) {
      const piece = document.createElement('span');
      piece.classList.add('skrivlet-demo-confetti__piece');
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDelay = `${Math.random() * 3}s`;
      piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      layer.appendChild(piece);
    }

    return layer;
  }

  save(blockContent) {
    const editable = blockContent.querySelector('.skrivlet-demo-confetti__text');
    return { text: editable ? editable.innerHTML : '' };
  }

  validate(savedData) {
    return !!savedData.text?.trim();
  }

  static get sanitize() {
    return { text: { b: true, i: true, a: { href: true } } };
  }
}

const CONFETTI_CSS = `
  .skrivlet-demo-confetti {
    position: relative;
    padding: 12px 16px;
    border-radius: 4px;
    background: linear-gradient(180deg, #fdf6ff 0%, #f3f0ff 100%);
    overflow: hidden;
    isolation: isolate;
  }
  .skrivlet-demo-confetti__pieces {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .skrivlet-demo-confetti__piece {
    position: absolute;
    top: -10%;
    width: 8px;
    height: 8px;
    opacity: 0.85;
    animation: skrivlet-demo-confetti-fall linear infinite;
  }
  .skrivlet-demo-confetti__piece:nth-child(3n) {
    border-radius: 50%;
  }
  @keyframes skrivlet-demo-confetti-fall {
    0% {
      transform: translateY(-10%) rotate(0deg);
      opacity: 0.9;
    }
    100% {
      transform: translateY(220%) rotate(360deg);
      opacity: 0.6;
    }
  }
  .skrivlet-demo-confetti__text {
    position: relative;
    z-index: 1;
  }
  .skrivlet-demo-confetti__text:empty::before {
    content: attr(data-placeholder);
    color: #9c9c9c;
  }
`;

export const manifests = [
  {
    type: 'skrivletTool',
    alias: 'SkrivLet.Demo.ConfettiTool',
    name: 'SkrivLet Demo Confetti Tool',
    js: () => Promise.resolve({ default: ConfettiTool }),
    css: () => Promise.resolve({ default: CONFETTI_CSS }),
    meta: {
      toolKey: 'confetti',
      inlineToolbar: false,
    },
  },
];
