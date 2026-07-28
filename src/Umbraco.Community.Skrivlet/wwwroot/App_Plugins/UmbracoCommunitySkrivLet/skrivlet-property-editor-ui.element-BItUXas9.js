import { html as xa, css as Ea, property as vi, state as yi, customElement as Ca } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as Ta } from "@umbraco-cms/backoffice/lit-element";
import { UmbTextStyles as Sa } from "@umbraco-cms/backoffice/style";
import { UmbChangeEvent as _a } from "@umbraco-cms/backoffice/event";
import { UmbModalToken as Ba, umbOpenModal as nt } from "@umbraco-cms/backoffice/modal";
import { UMB_LINK_PICKER_MODAL as Oa } from "@umbraco-cms/backoffice/multi-url-picker";
import { UMB_MEDIA_PICKER_MODAL as Ia, UmbMediaItemRepository as Ma, UmbMediaUrlRepository as La } from "@umbraco-cms/backoffice/media";
import { getGuidFromUdi as Pa, imageSize as Aa } from "@umbraco-cms/backoffice/utils";
import { umbExtensionsRegistry as Na } from "@umbraco-cms/backoffice/extension-registry";
import { loadManifestPlainCss as ja } from "@umbraco-cms/backoffice/extension-api";
import { UMB_DOCUMENT_TYPE_PICKER_MODAL as Da, UmbDocumentTypeDetailRepository as Ra } from "@umbraco-cms/backoffice/document-type";
const $a = "Umbraco.Community.Skrivlet.BlockEditModal", Ha = new Ba($a, {
  modal: {
    type: "sidebar",
    size: "large"
  }
});
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Mt(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
function Fa(o) {
  if (o.__esModule)
    return o;
  var e = o.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(o).forEach(function(n) {
    var r = Object.getOwnPropertyDescriptor(o, n);
    Object.defineProperty(t, n, r.get ? r : {
      enumerable: !0,
      get: function() {
        return o[n];
      }
    });
  }), t;
}
function Qt() {
}
Object.assign(Qt, {
  default: Qt,
  register: Qt,
  revert: function() {
  },
  __esModule: !0
});
Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(o) {
  const e = (this.document || this.ownerDocument).querySelectorAll(o);
  let t = e.length;
  for (; --t >= 0 && e.item(t) !== this; )
    ;
  return t > -1;
});
Element.prototype.closest || (Element.prototype.closest = function(o) {
  let e = this;
  if (!document.documentElement.contains(e))
    return null;
  do {
    if (e.matches(o))
      return e;
    e = e.parentElement || e.parentNode;
  } while (e !== null);
  return null;
});
Element.prototype.prepend || (Element.prototype.prepend = function(o) {
  const e = document.createDocumentFragment();
  Array.isArray(o) || (o = [o]), o.forEach((t) => {
    const n = t instanceof Node;
    e.appendChild(n ? t : document.createTextNode(t));
  }), this.insertBefore(e, this.firstChild);
});
Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(o) {
  o = arguments.length === 0 ? !0 : !!o;
  const e = this.parentNode, t = window.getComputedStyle(e, null), n = parseInt(t.getPropertyValue("border-top-width")), r = parseInt(t.getPropertyValue("border-left-width")), i = this.offsetTop - e.offsetTop < e.scrollTop, s = this.offsetTop - e.offsetTop + this.clientHeight - n > e.scrollTop + e.clientHeight, a = this.offsetLeft - e.offsetLeft < e.scrollLeft, l = this.offsetLeft - e.offsetLeft + this.clientWidth - r > e.scrollLeft + e.clientWidth, c = i && !s;
  (i || s) && o && (e.scrollTop = this.offsetTop - e.offsetTop - e.clientHeight / 2 - n + this.clientHeight / 2), (a || l) && o && (e.scrollLeft = this.offsetLeft - e.offsetLeft - e.clientWidth / 2 - r + this.clientWidth / 2), (i || s || a || l) && !o && this.scrollIntoView(c);
});
window.requestIdleCallback = window.requestIdleCallback || function(o) {
  const e = Date.now();
  return setTimeout(function() {
    o({
      didTimeout: !1,
      timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - e));
      }
    });
  }, 1);
};
window.cancelIdleCallback = window.cancelIdleCallback || function(o) {
  clearTimeout(o);
};
let Ua = (o = 21) => crypto.getRandomValues(new Uint8Array(o)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), ""), le = null;
function za(o) {
  le = o;
}
function Wa() {
  return le;
}
function Vr(o) {
  return le ? le.getElementById(o) : document.getElementById(o);
}
function uo(o, e) {
  return le ? le.elementFromPoint(o, e) : document.elementFromPoint(o, e);
}
function Y() {
  if (le) {
    const o = Ka();
    return o && typeof o.getSelection == "function" ? o.getSelection() : document.getSelection();
  }
  return window.getSelection();
}
function Ka() {
  let o = document.activeElement;
  for (; o && o.shadowRoot; ) {
    if (o.shadowRoot.activeElement)
      return o.shadowRoot;
    break;
  }
  return le;
}
function pe() {
  return le || document;
}
function qa(o) {
  return le && o ? o : document.body;
}
var ki = /* @__PURE__ */ ((o) => (o.VERBOSE = "VERBOSE", o.INFO = "INFO", o.WARN = "WARN", o.ERROR = "ERROR", o))(ki || {});
const S = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46
}, Ya = {
  LEFT: 0
};
function Je(o, e, t = "log", n, r = "color: inherit") {
  if (!("console" in window) || !window.console[t])
    return;
  const i = ["info", "log", "warn", "error"].includes(t), s = [];
  switch (Je.logLevel) {
    case "ERROR":
      if (t !== "error")
        return;
      break;
    case "WARN":
      if (!["error", "warn"].includes(t))
        return;
      break;
    case "INFO":
      if (!i || o)
        return;
      break;
  }
  n && s.push(n);
  const a = "Editor.js 2.31.6";
  o && (i ? (s.unshift(`line-height: 1em;
            color: #006FEA;
            display: inline-block;
            font-size: 11px;
            line-height: 1em;
            background-color: #fff;
            padding: 4px 9px;
            border-radius: 30px;
            border: 1px solid rgba(56, 138, 229, 0.16);
            margin: 4px 5px 4px 0;`, r), e = `%c${a}%c ${e}`) : e = `( ${a} )${e}`);
  try {
    i ? n ? console[t](`${e} %o`, ...s) : console[t](e, ...s) : console[t](e);
  } catch {
  }
}
Je.logLevel = "VERBOSE";
function Va(o) {
  Je.logLevel = o;
}
const L = Je.bind(window, !1), ee = Je.bind(window, !0);
function Be(o) {
  return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function D(o) {
  return Be(o) === "function" || Be(o) === "asyncfunction";
}
function z(o) {
  return Be(o) === "object";
}
function ge(o) {
  return Be(o) === "string";
}
function Xa(o) {
  return Be(o) === "boolean";
}
function Xr(o) {
  return Be(o) === "number";
}
function Gr(o) {
  return Be(o) === "undefined";
}
function J(o) {
  return o ? Object.keys(o).length === 0 && o.constructor === Object : !0;
}
function wi(o) {
  return o > 47 && o < 58 || // number keys
  o === 32 || o === 13 || // Space bar & return key(s)
  o === 229 || // processing key input for certain languages — Chinese, Japanese, etc.
  o > 64 && o < 91 || // letter keys
  o > 95 && o < 112 || // Numpad keys
  o > 185 && o < 193 || // ;=,-./` (in order)
  o > 218 && o < 223;
}
async function Ga(o, e = () => {
}, t = () => {
}) {
  async function n(r, i, s) {
    try {
      await r.function(r.data), await i(Gr(r.data) ? {} : r.data);
    } catch {
      s(Gr(r.data) ? {} : r.data);
    }
  }
  return o.reduce(async (r, i) => (await r, n(i, e, t)), Promise.resolve());
}
function xi(o) {
  return Array.prototype.slice.call(o);
}
function kt(o, e) {
  return function() {
    const t = this, n = arguments;
    window.setTimeout(() => o.apply(t, n), e);
  };
}
function Za(o) {
  return o.name.split(".").pop();
}
function Qa(o) {
  return /^[-\w]+\/([-+\w]+|\*)$/.test(o);
}
function Zr(o, e, t) {
  let n;
  return (...r) => {
    const i = this, s = () => {
      n = null, o.apply(i, r);
    };
    window.clearTimeout(n), n = window.setTimeout(s, e);
  };
}
function ho(o, e, t = void 0) {
  let n, r, i, s = null, a = 0;
  t || (t = {});
  const l = function() {
    a = t.leading === !1 ? 0 : Date.now(), s = null, i = o.apply(n, r), s || (n = r = null);
  };
  return function() {
    const c = Date.now();
    !a && t.leading === !1 && (a = c);
    const d = e - (c - a);
    return n = this, r = arguments, d <= 0 || d > e ? (s && (clearTimeout(s), s = null), a = c, i = o.apply(n, r), s || (n = r = null)) : !s && t.trailing !== !1 && (s = setTimeout(l, d)), i;
  };
}
function Ja() {
  const o = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e && (o[e] = !0), o;
}
function wt(o) {
  return o[0].toUpperCase() + o.slice(1);
}
function po(o, ...e) {
  if (!e.length)
    return o;
  const t = e.shift();
  if (z(o) && z(t))
    for (const n in t)
      z(t[n]) ? (o[n] || Object.assign(o, { [n]: {} }), po(o[n], t[n])) : Object.assign(o, { [n]: t[n] });
  return po(o, ...e);
}
function To(o) {
  const e = Ja();
  return o = o.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, " + "), e.mac ? o = o.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
}
function el(o) {
  try {
    return new URL(o).href;
  } catch {
  }
  return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
}
function tl() {
  return Ua(10);
}
function ol(o) {
  window.open(o, "_blank");
}
function nl(o = "") {
  return `${o}${Math.floor(Math.random() * 1e8).toString(16)}`;
}
function fo(o, e, t) {
  const n = `«${e}» is deprecated and will be removed in the next major release. Please use the «${t}» instead.`;
  o && ee(n, "warn");
}
function He(o, e, t) {
  const n = t.value ? "value" : "get", r = t[n], i = `#${e}Cache`;
  if (t[n] = function(...s) {
    return this[i] === void 0 && (this[i] = r.apply(this, ...s)), this[i];
  }, n === "get" && t.set) {
    const s = t.set;
    t.set = function(a) {
      delete o[i], s.apply(this, a);
    };
  }
  return t;
}
const Ei = 650;
function Fe() {
  return window.matchMedia(`(max-width: ${Ei}px)`).matches;
}
const go = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function rl(o, e) {
  const t = Array.isArray(o) || z(o), n = Array.isArray(e) || z(e);
  return t || n ? JSON.stringify(o) === JSON.stringify(e) : o === e;
}
let f = class q {
  /**
   * Check if passed tag has no closed tag
   *
   * @param {HTMLElement} tag - element to check
   * @returns {boolean}
   */
  static isSingleTag(e) {
    return e.tagName && [
      "AREA",
      "BASE",
      "BR",
      "COL",
      "COMMAND",
      "EMBED",
      "HR",
      "IMG",
      "INPUT",
      "KEYGEN",
      "LINK",
      "META",
      "PARAM",
      "SOURCE",
      "TRACK",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Check if element is BR or WBR
   *
   * @param {HTMLElement} element - element to check
   * @returns {boolean}
   */
  static isLineBreakTag(e) {
    return e && e.tagName && [
      "BR",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Helper for making Elements with class name and attributes
   *
   * @param  {string} tagName - new Element tag name
   * @param  {string[]|string} [classNames] - list or name of CSS class name(s)
   * @param  {object} [attributes] - any attributes
   * @returns {HTMLElement}
   */
  static make(e, t = null, n = {}) {
    const r = document.createElement(e);
    if (Array.isArray(t)) {
      const i = t.filter((s) => s !== void 0);
      r.classList.add(...i);
    } else
      t && r.classList.add(t);
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
    return r;
  }
  /**
   * Creates Text Node with the passed content
   *
   * @param {string} content - text content
   * @returns {Text}
   */
  static text(e) {
    return document.createTextNode(e);
  }
  /**
   * Append one or several elements to the parent
   *
   * @param  {Element|DocumentFragment} parent - where to append
   * @param  {Element|Element[]|DocumentFragment|Text|Text[]} elements - element or elements list
   */
  static append(e, t) {
    Array.isArray(t) ? t.forEach((n) => e.appendChild(n)) : e.appendChild(t);
  }
  /**
   * Append element or a couple to the beginning of the parent elements
   *
   * @param {Element} parent - where to append
   * @param {Element|Element[]} elements - element or elements list
   */
  static prepend(e, t) {
    Array.isArray(t) ? (t = t.reverse(), t.forEach((n) => e.prepend(n))) : e.prepend(t);
  }
  /**
   * Swap two elements in parent
   *
   * @param {HTMLElement} el1 - from
   * @param {HTMLElement} el2 - to
   * @deprecated
   */
  static swap(e, t) {
    const n = document.createElement("div"), r = e.parentNode;
    r.insertBefore(n, e), r.insertBefore(e, t), r.insertBefore(t, n), r.removeChild(n);
  }
  /**
   * Selector Decorator
   *
   * Returns first match
   *
   * @param {Element} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {Element}
   */
  static find(e = document, t) {
    return e.querySelector(t);
  }
  /**
   * Get Element by Id
   *
   * @param {string} id - id to find
   * @returns {HTMLElement | null}
   */
  static get(e) {
    return Vr(e);
  }
  /**
   * Selector Decorator.
   *
   * Returns all matches
   *
   * @param {Element|Document} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {NodeList}
   */
  static findAll(e = document, t) {
    return e.querySelectorAll(t);
  }
  /**
   * Returns CSS selector for all text inputs
   */
  static get allInputsSelector() {
    return "[contenteditable=true], textarea, input:not([type]), " + ["text", "password", "email", "number", "search", "tel", "url"].map((e) => `input[type="${e}"]`).join(", ");
  }
  /**
   * Find all contenteditable, textarea and editable input elements passed holder contains
   *
   * @param holder - element where to find inputs
   */
  static findAllInputs(e) {
    return xi(e.querySelectorAll(q.allInputsSelector)).reduce((t, n) => q.isNativeInput(n) || q.containsOnlyInlineElements(n) ? [...t, n] : [...t, ...q.getDeepestBlockElements(n)], []);
  }
  /**
   * Search for deepest node which is Leaf.
   * Leaf is the vertex that doesn't have any child nodes
   *
   * @description Method recursively goes throw the all Node until it finds the Leaf
   * @param {Node} node - root Node. From this vertex we start Deep-first search
   *                      {@link https://en.wikipedia.org/wiki/Depth-first_search}
   * @param {boolean} [atLast] - find last text node
   * @returns - it can be text Node or Element Node, so that caret will able to work with it
   *            Can return null if node is Document or DocumentFragment, or node is not attached to the DOM
   */
  static getDeepestNode(e, t = !1) {
    const n = t ? "lastChild" : "firstChild", r = t ? "previousSibling" : "nextSibling";
    if (e && e.nodeType === Node.ELEMENT_NODE && e[n]) {
      let i = e[n];
      if (q.isSingleTag(i) && !q.isNativeInput(i) && !q.isLineBreakTag(i))
        if (i[r])
          i = i[r];
        else if (i.parentNode[r])
          i = i.parentNode[r];
        else
          return i.parentNode;
      return this.getDeepestNode(i, t);
    }
    return e;
  }
  /**
   * Check if object is DOM node
   *
   * @param {*} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isElement(e) {
    return Xr(e) ? !1 : e && e.nodeType && e.nodeType === Node.ELEMENT_NODE;
  }
  /**
   * Check if object is DocumentFragment node
   *
   * @param {object} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isFragment(e) {
    return Xr(e) ? !1 : e && e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  /**
   * Check if passed element is contenteditable
   *
   * @param {HTMLElement} element - html element to check
   * @returns {boolean}
   */
  static isContentEditable(e) {
    return e.contentEditable === "true";
  }
  /**
   * Checks target if it is native input
   *
   * @param {*} target - HTML element or string
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isNativeInput(e) {
    const t = [
      "INPUT",
      "TEXTAREA"
    ];
    return e && e.tagName ? t.includes(e.tagName) : !1;
  }
  /**
   * Checks if we can set caret
   *
   * @param {HTMLElement} target - target to check
   * @returns {boolean}
   */
  static canSetCaret(e) {
    let t = !0;
    if (q.isNativeInput(e))
      switch (e.type) {
        case "file":
        case "checkbox":
        case "radio":
        case "hidden":
        case "submit":
        case "button":
        case "image":
        case "reset":
          t = !1;
          break;
      }
    else
      t = q.isContentEditable(e);
    return t;
  }
  /**
   * Checks node if it is empty
   *
   * @description Method checks simple Node without any childs for emptiness
   * If you have Node with 2 or more children id depth, you better use {@link Dom#isEmpty} method
   * @param {Node} node - node to check
   * @param {string} [ignoreChars] - char or substring to treat as empty
   * @returns {boolean} true if it is empty
   */
  static isNodeEmpty(e, t) {
    let n;
    return this.isSingleTag(e) && !this.isLineBreakTag(e) ? !1 : (this.isElement(e) && this.isNativeInput(e) ? n = e.value : n = e.textContent.replace("​", ""), t && (n = n.replace(new RegExp(t, "g"), "")), n.length === 0);
  }
  /**
   * checks node if it is doesn't have any child nodes
   *
   * @param {Node} node - node to check
   * @returns {boolean}
   */
  static isLeaf(e) {
    return e ? e.childNodes.length === 0 : !1;
  }
  /**
   * breadth-first search (BFS)
   * {@link https://en.wikipedia.org/wiki/Breadth-first_search}
   *
   * @description Pushes to stack all DOM leafs and checks for emptiness
   * @param {Node} node - node to check
   * @param {string} [ignoreChars] - char or substring to treat as empty
   * @returns {boolean}
   */
  static isEmpty(e, t) {
    const n = [e];
    for (; n.length > 0; )
      if (e = n.shift(), !!e) {
        if (this.isLeaf(e) && !this.isNodeEmpty(e, t))
          return !1;
        e.childNodes && n.push(...Array.from(e.childNodes));
      }
    return !0;
  }
  /**
   * Check if string contains html elements
   *
   * @param {string} str - string to check
   * @returns {boolean}
   */
  static isHTMLString(e) {
    const t = q.make("div");
    return t.innerHTML = e, t.childElementCount > 0;
  }
  /**
   * Return length of node`s text content
   *
   * @param {Node} node - node with content
   * @returns {number}
   */
  static getContentLength(e) {
    return q.isNativeInput(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : e.textContent.length;
  }
  /**
   * Return array of names of block html elements
   *
   * @returns {string[]}
   */
  static get blockElements() {
    return [
      "address",
      "article",
      "aside",
      "blockquote",
      "canvas",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "li",
      "main",
      "nav",
      "noscript",
      "ol",
      "output",
      "p",
      "pre",
      "ruby",
      "section",
      "table",
      "tbody",
      "thead",
      "tr",
      "tfoot",
      "ul",
      "video"
    ];
  }
  /**
   * Check if passed content includes only inline elements
   *
   * @param {string|HTMLElement} data - element or html string
   * @returns {boolean}
   */
  static containsOnlyInlineElements(e) {
    let t;
    ge(e) ? (t = document.createElement("div"), t.innerHTML = e) : t = e;
    const n = (r) => !q.blockElements.includes(r.tagName.toLowerCase()) && Array.from(r.children).every(n);
    return Array.from(t.children).every(n);
  }
  /**
   * Find and return all block elements in the passed parent (including subtree)
   *
   * @param {HTMLElement} parent - root element
   * @returns {HTMLElement[]}
   */
  static getDeepestBlockElements(e) {
    return q.containsOnlyInlineElements(e) ? [e] : Array.from(e.children).reduce((t, n) => [...t, ...q.getDeepestBlockElements(n)], []);
  }
  /**
   * Helper for get holder from {string} or return HTMLElement
   *
   * @param {string | HTMLElement} element - holder's id or holder's HTML Element
   * @returns {HTMLElement}
   */
  static getHolder(e) {
    return ge(e) ? Vr(e) : e;
  }
  /**
   * Returns true if element is anchor (is A tag)
   *
   * @param {Element} element - element to check
   * @returns {boolean}
   */
  static isAnchor(e) {
    return e.tagName.toLowerCase() === "a";
  }
  /**
   * Returns the closest ancestor anchor (A tag) of the given element (including itself)
   * 
   * @param element - element to check
   * @returns {HTMLAnchorElement | null}
   */
  static getClosestAnchor(e) {
    return e.closest("a");
  }
  /**
   * Return element's offset related to the document
   *
   * @todo handle case when editor initialized in scrollable popup
   * @param el - element to compute offset
   */
  static offset(e) {
    const t = e.getBoundingClientRect(), n = window.pageXOffset || document.documentElement.scrollLeft, r = window.pageYOffset || document.documentElement.scrollTop, i = t.top + r, s = t.left + n;
    return {
      top: i,
      left: s,
      bottom: i + t.height,
      right: s + t.width
    };
  }
  /**
   * Find text node and offset by total content offset
   *
   * @param {Node} root - root node to start search from
   * @param {number} totalOffset - offset relative to the root node content
   * @returns {{node: Node | null, offset: number}} - node and offset inside node
   */
  static getNodeByOffset(e, t) {
    let n = 0, r = null;
    const i = document.createTreeWalker(
      e,
      NodeFilter.SHOW_TEXT,
      null
    );
    let s = i.nextNode();
    for (; s; ) {
      const c = s.textContent, d = c === null ? 0 : c.length;
      if (r = s, n + d >= t)
        break;
      n += d, s = i.nextNode();
    }
    if (!r)
      return {
        node: null,
        offset: 0
      };
    const a = r.textContent;
    if (a === null || a.length === 0)
      return {
        node: null,
        offset: 0
      };
    const l = Math.min(t - n, a.length);
    return {
      node: r,
      offset: l
    };
  }
};
function il(o) {
  return !/[^\t\n\r ]/.test(o);
}
function sl(o) {
  const e = window.getComputedStyle(o), t = parseFloat(e.fontSize), n = parseFloat(e.lineHeight) || t * 1.2, r = parseFloat(e.paddingTop), i = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, l = (n - t) / 2;
  return s + i + r + l + a;
}
function Ci(o) {
  o.dataset.empty = f.isEmpty(o) ? "true" : "false";
}
const al = {
  blockTunes: {
    toggler: {
      "Click to tune": "",
      "or drag to move": ""
    }
  },
  inlineToolbar: {
    converter: {
      "Convert to": ""
    }
  },
  toolbar: {
    toolbox: {
      Add: ""
    }
  },
  popover: {
    Filter: "",
    "Nothing found": "",
    "Convert to": ""
  }
}, ll = {
  Text: "",
  Link: "",
  Bold: "",
  Italic: ""
}, cl = {
  link: {
    "Add a link": ""
  },
  stub: {
    "The block can not be displayed correctly.": ""
  }
}, dl = {
  delete: {
    Delete: "",
    "Click to delete": ""
  },
  moveUp: {
    "Move up": ""
  },
  moveDown: {
    "Move down": ""
  }
}, Ti = {
  ui: al,
  toolNames: ll,
  tools: cl,
  blockTunes: dl
}, Si = class Ne {
  /**
   * Type-safe translation for internal UI texts:
   * Perform translation of the string by namespace and a key
   *
   * @example I18n.ui(I18nInternalNS.ui.blockTunes.toggler, 'Click to tune')
   * @param internalNamespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static ui(e, t) {
    return Ne._t(e, t);
  }
  /**
   * Translate for external strings that is not presented in default dictionary.
   * For example, for user-specified tool names
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static t(e, t) {
    return Ne._t(e, t);
  }
  /**
   * Adjust module for using external dictionary
   *
   * @param dictionary - new messages list to override default
   */
  static setDictionary(e) {
    Ne.currentDictionary = e;
  }
  /**
   * Perform translation both for internal and external namespaces
   * If there is no translation found, returns passed key as a translated message
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static _t(e, t) {
    const n = Ne.getNamespace(e);
    return !n || !n[t] ? t : n[t];
  }
  /**
   * Find messages section by namespace path
   *
   * @param namespace - path to section
   */
  static getNamespace(e) {
    return e.split(".").reduce((t, n) => !t || !Object.keys(t).length ? {} : t[n], Ne.currentDictionary);
  }
};
Si.currentDictionary = Ti;
let V = Si;
class _i extends Error {
}
let et = class {
  constructor() {
    this.subscribers = {};
  }
  /**
   * Subscribe any event on callback
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  on(e, t) {
    e in this.subscribers || (this.subscribers[e] = []), this.subscribers[e].push(t);
  }
  /**
   * Subscribe any event on callback. Callback will be called once and be removed from subscribers array after call.
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  once(e, t) {
    e in this.subscribers || (this.subscribers[e] = []);
    const n = (r) => {
      const i = t(r), s = this.subscribers[e].indexOf(n);
      return s !== -1 && this.subscribers[e].splice(s, 1), i;
    };
    this.subscribers[e].push(n);
  }
  /**
   * Emit callbacks with passed data
   *
   * @param eventName - event name
   * @param data - subscribers get this data when they were fired
   */
  emit(e, t) {
    J(this.subscribers) || !this.subscribers[e] || this.subscribers[e].reduce((n, r) => {
      const i = r(n);
      return i !== void 0 ? i : n;
    }, t);
  }
  /**
   * Unsubscribe callback from event
   *
   * @param eventName - event name
   * @param callback - event handler
   */
  off(e, t) {
    if (this.subscribers[e] === void 0) {
      console.warn(`EventDispatcher .off(): there is no subscribers for event "${e.toString()}". Probably, .off() called before .on()`);
      return;
    }
    for (let n = 0; n < this.subscribers[e].length; n++)
      if (this.subscribers[e][n] === t) {
        delete this.subscribers[e][n];
        break;
      }
  }
  /**
   * Destroyer
   * clears subscribers list
   */
  destroy() {
    this.subscribers = {};
  }
};
function ue(o) {
  Object.setPrototypeOf(this, {
    /**
     * Block id
     *
     * @returns {string}
     */
    get id() {
      return o.id;
    },
    /**
     * Tool name
     *
     * @returns {string}
     */
    get name() {
      return o.name;
    },
    /**
     * Tool config passed on Editor's initialization
     *
     * @returns {ToolConfig}
     */
    get config() {
      return o.config;
    },
    /**
     * .ce-block element, that wraps plugin contents
     *
     * @returns {HTMLElement}
     */
    get holder() {
      return o.holder;
    },
    /**
     * True if Block content is empty
     *
     * @returns {boolean}
     */
    get isEmpty() {
      return o.isEmpty;
    },
    /**
     * True if Block is selected with Cross-Block selection
     *
     * @returns {boolean}
     */
    get selected() {
      return o.selected;
    },
    /**
     * Set Block's stretch state
     *
     * @param {boolean} state — state to set
     */
    set stretched(e) {
      o.stretched = e;
    },
    /**
     * True if Block is stretched
     *
     * @returns {boolean}
     */
    get stretched() {
      return o.stretched;
    },
    /**
     * True if Block has inputs to be focused
     */
    get focusable() {
      return o.focusable;
    },
    /**
     * Call Tool method with errors handler under-the-hood
     *
     * @param {string} methodName - method to call
     * @param {object} param - object with parameters
     * @returns {unknown}
     */
    call(e, t) {
      return o.call(e, t);
    },
    /**
     * Save Block content
     *
     * @returns {Promise<void|SavedData>}
     */
    save() {
      return o.save();
    },
    /**
     * Validate Block data
     *
     * @param {BlockToolData} data - data to validate
     * @returns {Promise<boolean>}
     */
    validate(e) {
      return o.validate(e);
    },
    /**
     * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
     * Can be useful for block changes invisible for editor core.
     */
    dispatchChange() {
      o.dispatchChange();
    },
    /**
     * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
     * This method returns the entry that is related to the Block (depended on the Block data)
     */
    getActiveToolboxEntry() {
      return o.getActiveToolboxEntry();
    }
  });
}
let tt = class {
  constructor() {
    this.allListeners = [];
  }
  /**
   * Assigns event listener on element and returns unique identifier
   *
   * @param {EventTarget} element - DOM element that needs to be listened
   * @param {string} eventType - event type
   * @param {Function} handler - method that will be fired on event
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  on(e, t, n, r = !1) {
    const i = nl("l"), s = {
      id: i,
      element: e,
      eventType: t,
      handler: n,
      options: r
    };
    if (!this.findOne(e, t, n))
      return this.allListeners.push(s), e.addEventListener(t, n, r), i;
  }
  /**
   * Removes event listener from element
   *
   * @param {EventTarget} element - DOM element that we removing listener
   * @param {string} eventType - event type
   * @param {Function} handler - remove handler, if element listens several handlers on the same event type
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  off(e, t, n, r) {
    const i = this.findAll(e, t, n);
    i.forEach((s, a) => {
      const l = this.allListeners.indexOf(i[a]);
      l > -1 && (this.allListeners.splice(l, 1), s.element.removeEventListener(s.eventType, s.handler, s.options));
    });
  }
  /**
   * Removes listener by id
   *
   * @param {string} id - listener identifier
   */
  offById(e) {
    const t = this.findById(e);
    t && t.element.removeEventListener(t.eventType, t.handler, t.options);
  }
  /**
   * Finds and returns first listener by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} [eventType] - event type
   * @param {Function} [handler] - event handler
   * @returns {ListenerData|null}
   */
  findOne(e, t, n) {
    const r = this.findAll(e, t, n);
    return r.length > 0 ? r[0] : null;
  }
  /**
   * Return all stored listeners by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} eventType - event type
   * @param {Function} handler - event handler
   * @returns {ListenerData[]}
   */
  findAll(e, t, n) {
    let r;
    const i = e ? this.findByEventTarget(e) : [];
    return e && t && n ? r = i.filter((s) => s.eventType === t && s.handler === n) : e && t ? r = i.filter((s) => s.eventType === t) : r = i, r;
  }
  /**
   * Removes all listeners
   */
  removeAll() {
    this.allListeners.map((e) => {
      e.element.removeEventListener(e.eventType, e.handler, e.options);
    }), this.allListeners = [];
  }
  /**
   * Module cleanup on destruction
   */
  destroy() {
    this.removeAll();
  }
  /**
   * Search method: looks for listener by passed element
   *
   * @param {EventTarget} element - searching element
   * @returns {Array} listeners that found on element
   */
  findByEventTarget(e) {
    return this.allListeners.filter((t) => {
      if (t.element === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed event type
   *
   * @param {string} eventType - event type
   * @returns {ListenerData[]} listeners that found on element
   */
  findByType(e) {
    return this.allListeners.filter((t) => {
      if (t.eventType === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed handler
   *
   * @param {Function} handler - event handler
   * @returns {ListenerData[]} listeners that found on element
   */
  findByHandler(e) {
    return this.allListeners.filter((t) => {
      if (t.handler === e)
        return t;
    });
  }
  /**
   * Returns listener data found by id
   *
   * @param {string} id - listener identifier
   * @returns {ListenerData}
   */
  findById(e) {
    return this.allListeners.find((t) => t.id === e);
  }
}, O = class Bi {
  /**
   * @class
   * @param options - Module options
   * @param options.config - Module config
   * @param options.eventsDispatcher - Common event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    if (this.nodes = {}, this.listeners = new tt(), this.readOnlyMutableListeners = {
      /**
       * Assigns event listener on DOM element and pushes into special array that might be removed
       *
       * @param {EventTarget} element - DOM Element
       * @param {string} eventType - Event name
       * @param {Function} handler - Event handler
       * @param {boolean|AddEventListenerOptions} options - Listening options
       */
      on: (n, r, i, s = !1) => {
        this.mutableListenerIds.push(
          this.listeners.on(n, r, i, s)
        );
      },
      /**
       * Clears all mutable listeners
       */
      clearAll: () => {
        for (const n of this.mutableListenerIds)
          this.listeners.offById(n);
        this.mutableListenerIds = [];
      }
    }, this.mutableListenerIds = [], new.target === Bi)
      throw new TypeError("Constructors for abstract class Module are not allowed.");
    this.config = e, this.eventsDispatcher = t;
  }
  /**
   * Editor modules setter
   *
   * @param {EditorModules} Editor - Editor's Modules
   */
  set state(e) {
    this.Editor = e;
  }
  /**
   * Remove memorized nodes
   */
  removeAllNodes() {
    for (const e in this.nodes) {
      const t = this.nodes[e];
      t instanceof HTMLElement && t.remove();
    }
  }
  /**
   * Returns true if current direction is RTL (Right-To-Left)
   */
  get isRtl() {
    return this.config.i18n.direction === "rtl";
  }
}, C = class me {
  constructor() {
    this.instance = null, this.selection = null, this.savedSelectionRange = null, this.isFakeBackgroundEnabled = !1, this.commandBackground = "backColor";
  }
  /**
   * Editor styles
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  static get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorZone: "codex-editor__redactor"
    };
  }
  /**
   * Returns selected anchor
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorNode}
   *
   * @returns {Node|null}
   */
  static get anchorNode() {
    const e = Y();
    return e ? e.anchorNode : null;
  }
  /**
   * Returns selected anchor element
   *
   * @returns {Element|null}
   */
  static get anchorElement() {
    const e = Y();
    if (!e)
      return null;
    const t = e.anchorNode;
    return t ? f.isElement(t) ? t : t.parentElement : null;
  }
  /**
   * Returns selection offset according to the anchor node
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorOffset}
   *
   * @returns {number|null}
   */
  static get anchorOffset() {
    const e = Y();
    return e ? e.anchorOffset : null;
  }
  /**
   * Is current selection range collapsed
   *
   * @returns {boolean|null}
   */
  static get isCollapsed() {
    const e = Y();
    return e ? e.isCollapsed : null;
  }
  /**
   * Check current selection if it is at Editor's zone
   *
   * @returns {boolean}
   */
  static get isAtEditor() {
    return this.isSelectionAtEditor(me.get());
  }
  /**
   * Check if passed selection is at Editor's zone
   *
   * @param selection - Selection object to check
   */
  static isSelectionAtEditor(e) {
    if (!e)
      return !1;
    let t = e.anchorNode || e.focusNode;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let n = null;
    return t && t instanceof Element && (n = t.closest(`.${me.CSS.editorZone}`)), n ? n.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Check if passed range at Editor zone
   *
   * @param range - range to check
   */
  static isRangeAtEditor(e) {
    if (!e)
      return;
    let t = e.startContainer;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let n = null;
    return t && t instanceof Element && (n = t.closest(`.${me.CSS.editorZone}`)), n ? n.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Methods return boolean that true if selection exists on the page
   */
  static get isSelectionExists() {
    return !!me.get().anchorNode;
  }
  /**
   * Return first range
   *
   * @returns {Range|null}
   */
  static get range() {
    return this.getRangeFromSelection(this.get());
  }
  /**
   * Returns range from passed Selection object
   *
   * @param selection - Selection object to get Range from
   */
  static getRangeFromSelection(e) {
    return e && e.rangeCount ? e.getRangeAt(0) : null;
  }
  /**
   * Calculates position and size of selected text
   *
   * @returns {DOMRect | ClientRect}
   */
  static get rect() {
    let e = document.selection, t, n = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    if (e && e.type !== "Control")
      return e = e, t = e.createRange(), n.x = t.boundingLeft, n.y = t.boundingTop, n.width = t.boundingWidth, n.height = t.boundingHeight, n;
    if (!Y)
      return L("Method window.getSelection is not supported", "warn"), n;
    if (e = Y(), e.rangeCount === null || isNaN(e.rangeCount))
      return L("Method SelectionUtils.rangeCount is not supported", "warn"), n;
    if (e.rangeCount === 0)
      return n;
    if (t = e.getRangeAt(0).cloneRange(), t.getBoundingClientRect && (n = t.getBoundingClientRect()), n.x === 0 && n.y === 0) {
      const r = document.createElement("span");
      if (r.getBoundingClientRect) {
        r.appendChild(document.createTextNode("​")), t.insertNode(r), n = r.getBoundingClientRect();
        const i = r.parentNode;
        i.removeChild(r), i.normalize();
      }
    }
    return n;
  }
  /**
   * Returns selected text as String
   *
   * @returns {string}
   */
  static get text() {
    const e = Y();
    return e ? e.toString() : "";
  }
  /**
   * Returns window SelectionUtils
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Window/getSelection}
   *
   * @returns {Selection}
   */
  static get() {
    return Y();
  }
  /**
   * Set focus to contenteditable or native input element
   *
   * @param element - element where to set focus
   * @param offset - offset of cursor
   */
  static setCursor(e, t = 0) {
    const n = document.createRange(), r = Y();
    return f.isNativeInput(e) ? f.canSetCaret(e) ? (e.focus(), e.selectionStart = e.selectionEnd = t, e.getBoundingClientRect()) : void 0 : (n.setStart(e, t), n.setEnd(e, t), r.removeAllRanges(), r.addRange(n), n.getBoundingClientRect());
  }
  /**
   * Check if current range exists and belongs to container
   *
   * @param container - where range should be
   */
  static isRangeInsideContainer(e) {
    const t = me.range;
    return t === null ? !1 : e.contains(t.startContainer);
  }
  /**
   * Adds fake cursor to the current range
   */
  static addFakeCursor() {
    const e = me.range;
    if (e === null)
      return;
    const t = f.make("span", "codex-editor__fake-cursor");
    t.dataset.mutationFree = "true", e.collapse(), e.insertNode(t);
  }
  /**
   * Check if passed element contains a fake cursor
   *
   * @param el - where to check
   */
  static isFakeCursorInsideContainer(e) {
    return f.find(e, ".codex-editor__fake-cursor") !== null;
  }
  /**
   * Removes fake cursor from a container
   *
   * @param container - container to look for
   */
  static removeFakeCursor(e = document.body) {
    const t = f.find(e, ".codex-editor__fake-cursor");
    t && t.remove();
  }
  /**
   * Removes fake background
   */
  removeFakeBackground() {
    this.isFakeBackgroundEnabled && (document.execCommand(this.commandBackground, !1, "transparent"), this.isFakeBackgroundEnabled = !1);
  }
  /**
   * Sets fake background
   */
  setFakeBackground() {
    document.execCommand(this.commandBackground, !1, "#a8d6ff"), this.isFakeBackgroundEnabled = !0;
  }
  /**
   * Save SelectionUtils's range
   */
  save() {
    this.savedSelectionRange = me.range;
  }
  /**
   * Restore saved SelectionUtils's range
   */
  restore() {
    if (!this.savedSelectionRange)
      return;
    const e = Y();
    e.removeAllRanges(), e.addRange(this.savedSelectionRange);
  }
  /**
   * Clears saved selection
   */
  clearSaved() {
    this.savedSelectionRange = null;
  }
  /**
   * Collapse current selection
   */
  collapseToEnd() {
    const e = Y(), t = document.createRange();
    t.selectNodeContents(e.focusNode), t.collapse(!1), e.removeAllRanges(), e.addRange(t);
  }
  /**
   * Looks ahead to find passed tag from current selection
   *
   * @param  {string} tagName       - tag to found
   * @param  {string} [className]   - tag's class name
   * @param  {number} [searchDepth] - count of tags that can be included. For better performance.
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t, n = 10) {
    const r = Y();
    let i = null;
    return !r || !r.anchorNode || !r.focusNode ? null : ([
      /** the Node in which the selection begins */
      r.anchorNode,
      /** the Node in which the selection ends */
      r.focusNode
    ].forEach((s) => {
      let a = n;
      for (; a > 0 && s.parentNode && !(s.tagName === e && (i = s, t && s.classList && !s.classList.contains(t) && (i = null), i)); )
        s = s.parentNode, a--;
    }), i);
  }
  /**
   * Expands selection range to the passed parent node
   *
   * @param {HTMLElement} element - element which contents should be selected
   */
  expandToTag(e) {
    const t = Y();
    t.removeAllRanges();
    const n = document.createRange();
    n.selectNodeContents(e), t.addRange(n);
  }
};
function ul(o, e) {
  const { type: t, target: n, addedNodes: r, removedNodes: i } = o;
  return o.type === "attributes" && o.attributeName === "data-empty" ? !1 : !!(e.contains(n) || t === "childList" && (Array.from(r).some((s) => s === e) || Array.from(i).some((s) => s === e)));
}
const mo = "redactor dom changed", Oi = "block changed", Ii = "fake cursor is about to be toggled", Mi = "fake cursor have been set", Ze = "editor mobile layout toggled";
function bo(o, e) {
  if (!o.conversionConfig)
    return !1;
  const t = o.conversionConfig[e];
  return D(t) || ge(t);
}
function xt(o, e) {
  return bo(o.tool, e);
}
function Li(o, e) {
  return Object.entries(o).some(([t, n]) => e[t] && rl(e[t], n));
}
async function Pi(o, e) {
  const t = (await o.save()).data, n = e.find((r) => r.name === o.name);
  return n !== void 0 && !bo(n, "export") ? [] : e.reduce((r, i) => {
    if (!bo(i, "import") || i.toolbox === void 0)
      return r;
    const s = i.toolbox.filter((a) => {
      if (J(a) || a.icon === void 0)
        return !1;
      if (a.data !== void 0) {
        if (Li(a.data, t))
          return !1;
      } else if (i.name === o.name)
        return !1;
      return !0;
    });
    return r.push({
      ...i,
      toolbox: s
    }), r;
  }, []);
}
function Qr(o, e) {
  return o.mergeable ? o.name === e.name ? !0 : xt(e, "export") && xt(o, "import") : !1;
}
function hl(o, e) {
  const t = e?.export;
  return D(t) ? t(o) : ge(t) ? o[t] : (t !== void 0 && L("Conversion «export» property must be a string or function. String means key of saved data object to export. Function should export processed string to export."), "");
}
function Jr(o, e, t) {
  const n = e?.import;
  return D(n) ? n(o, t) : ge(n) ? {
    [n]: o
  } : (n !== void 0 && L("Conversion «import» property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data."), {});
}
var j = /* @__PURE__ */ ((o) => (o.Default = "default", o.Separator = "separator", o.Html = "html", o))(j || {}), he = /* @__PURE__ */ ((o) => (o.APPEND_CALLBACK = "appendCallback", o.RENDERED = "rendered", o.MOVED = "moved", o.UPDATED = "updated", o.REMOVED = "removed", o.ON_PASTE = "onPaste", o))(he || {});
let fe = class be extends et {
  /**
   * @param options - block constructor options
   * @param [options.id] - block's id. Will be generated if omitted.
   * @param options.data - Tool's initial data
   * @param options.tool — block's tool
   * @param options.api - Editor API module for pass it to the Block Tunes
   * @param options.readOnly - Read-Only flag
   * @param [eventBus] - Editor common event bus. Allows to subscribe on some Editor events. Could be omitted when "virtual" Block is created. See BlocksAPI@composeBlockData.
   */
  constructor({
    id: e = tl(),
    data: t,
    tool: n,
    readOnly: r,
    tunesData: i
  }, s) {
    super(), this.cachedInputs = [], this.toolRenderedElement = null, this.tunesInstances = /* @__PURE__ */ new Map(), this.defaultTunesInstances = /* @__PURE__ */ new Map(), this.unavailableTunesData = {}, this.inputIndex = 0, this.editorEventBus = null, this.handleFocus = () => {
      this.dropInputsCache(), this.updateCurrentInput();
    }, this.didMutated = (a = void 0) => {
      const l = a === void 0, c = a instanceof InputEvent;
      !l && !c && this.detectToolRootChange(a);
      let d;
      l || c ? d = !0 : d = !(a.length > 0 && a.every((u) => {
        const { addedNodes: h, removedNodes: g, target: p } = u;
        return [
          ...Array.from(h),
          ...Array.from(g),
          p
        ].some((v) => (f.isElement(v) || (v = v.parentElement), v && v.closest('[data-mutation-free="true"]') !== null));
      })), d && (this.dropInputsCache(), this.updateCurrentInput(), this.toggleInputsEmptyMark(), this.call(
        "updated"
        /* UPDATED */
      ), this.emit("didMutated", this));
    }, this.name = n.name, this.id = e, this.settings = n.settings, this.config = n.settings.config || {}, this.editorEventBus = s || null, this.blockAPI = new ue(this), this.tool = n, this.toolInstance = n.create(t, this.blockAPI, r), this.tunes = n.tunes, this.composeTunes(i), this.holder = this.compose(), window.requestIdleCallback(() => {
      this.watchBlockMutations(), this.addInputEvents(), this.toggleInputsEmptyMark();
    });
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      wrapper: "ce-block",
      wrapperStretched: "ce-block--stretched",
      content: "ce-block__content",
      selected: "ce-block--selected",
      dropTarget: "ce-block--drop-target"
    };
  }
  /**
   * Find and return all editable elements (contenteditable and native inputs) in the Tool HTML
   */
  get inputs() {
    if (this.cachedInputs.length !== 0)
      return this.cachedInputs;
    const e = f.findAllInputs(this.holder);
    return this.inputIndex > e.length - 1 && (this.inputIndex = e.length - 1), this.cachedInputs = e, e;
  }
  /**
   * Return current Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get currentInput() {
    return this.inputs[this.inputIndex];
  }
  /**
   * Set input index to the passed element
   *
   * @param element - HTML Element to set as current input
   */
  set currentInput(e) {
    const t = this.inputs.findIndex((n) => n === e || n.contains(e));
    t !== -1 && (this.inputIndex = t);
  }
  /**
   * Return first Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get firstInput() {
    return this.inputs[0];
  }
  /**
   * Return first Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get lastInput() {
    const e = this.inputs;
    return e[e.length - 1];
  }
  /**
   * Return next Tool`s input or undefined if it doesn't exist
   * If Block doesn't contain inputs, return undefined
   */
  get nextInput() {
    return this.inputs[this.inputIndex + 1];
  }
  /**
   * Return previous Tool`s input or undefined if it doesn't exist
   * If Block doesn't contain inputs, return undefined
   */
  get previousInput() {
    return this.inputs[this.inputIndex - 1];
  }
  /**
   * Get Block's JSON data
   *
   * @returns {object}
   */
  get data() {
    return this.save().then((e) => e && !J(e.data) ? e.data : {});
  }
  /**
   * Returns tool's sanitizer config
   *
   * @returns {object}
   */
  get sanitize() {
    return this.tool.sanitizeConfig;
  }
  /**
   * is block mergeable
   * We plugin have merge function then we call it mergeable
   *
   * @returns {boolean}
   */
  get mergeable() {
    return D(this.toolInstance.merge);
  }
  /**
   * If Block contains inputs, it is focusable
   */
  get focusable() {
    return this.inputs.length !== 0;
  }
  /**
   * Check block for emptiness
   *
   * @returns {boolean}
   */
  get isEmpty() {
    const e = f.isEmpty(this.pluginsContent, "/"), t = !this.hasMedia;
    return e && t;
  }
  /**
   * Check if block has a media content such as images, iframe and other
   *
   * @returns {boolean}
   */
  get hasMedia() {
    const e = [
      "img",
      "iframe",
      "video",
      "audio",
      "source",
      "input",
      "textarea",
      "twitterwidget"
    ];
    return !!this.holder.querySelector(e.join(","));
  }
  /**
   * Set selected state
   * We don't need to mark Block as Selected when it is empty
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */
  set selected(e) {
    var t, n;
    this.holder.classList.toggle(be.CSS.selected, e);
    const r = e === !0 && C.isRangeInsideContainer(this.holder), i = e === !1 && C.isFakeCursorInsideContainer(this.holder);
    (r || i) && ((t = this.editorEventBus) == null || t.emit(Ii, { state: e }), r ? C.addFakeCursor() : C.removeFakeCursor(this.holder), (n = this.editorEventBus) == null || n.emit(Mi, { state: e }));
  }
  /**
   * Returns True if it is Selected
   *
   * @returns {boolean}
   */
  get selected() {
    return this.holder.classList.contains(be.CSS.selected);
  }
  /**
   * Set stretched state
   *
   * @param {boolean} state - 'true' to enable, 'false' to disable stretched state
   */
  set stretched(e) {
    this.holder.classList.toggle(be.CSS.wrapperStretched, e);
  }
  /**
   * Return Block's stretched state
   *
   * @returns {boolean}
   */
  get stretched() {
    return this.holder.classList.contains(be.CSS.wrapperStretched);
  }
  /**
   * Toggle drop target state
   *
   * @param {boolean} state - 'true' if block is drop target, false otherwise
   */
  set dropTarget(e) {
    this.holder.classList.toggle(be.CSS.dropTarget, e);
  }
  /**
   * Returns Plugins content
   *
   * @returns {HTMLElement}
   */
  get pluginsContent() {
    return this.toolRenderedElement;
  }
  /**
   * Calls Tool's method
   *
   * Method checks tool property {MethodName}. Fires method with passes params If it is instance of Function
   *
   * @param {string} methodName - method to call
   * @param {object} params - method argument
   */
  call(e, t) {
    if (D(this.toolInstance[e])) {
      e === "appendCallback" && L(
        "`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead",
        "warn"
      );
      try {
        this.toolInstance[e].call(this.toolInstance, t);
      } catch (n) {
        L(`Error during '${e}' call: ${n.message}`, "error");
      }
    }
  }
  /**
   * Call plugins merge method
   *
   * @param {BlockToolData} data - data to merge
   */
  async mergeWith(e) {
    await this.toolInstance.merge(e);
  }
  /**
   * Extracts data from Block
   * Groups Tool's save processing time
   *
   * @returns {object}
   */
  async save() {
    const e = await this.toolInstance.save(this.pluginsContent), t = this.unavailableTunesData;
    [
      ...this.tunesInstances.entries(),
      ...this.defaultTunesInstances.entries()
    ].forEach(([i, s]) => {
      if (D(s.save))
        try {
          t[i] = s.save();
        } catch (a) {
          L(`Tune ${s.constructor.name} save method throws an Error %o`, "warn", a);
        }
    });
    const n = window.performance.now();
    let r;
    return Promise.resolve(e).then((i) => (r = window.performance.now(), {
      id: this.id,
      tool: this.name,
      data: i,
      tunes: t,
      time: r - n
    })).catch((i) => {
      L(`Saving process for ${this.name} tool failed due to the ${i}`, "log", "red");
    });
  }
  /**
   * Uses Tool's validation method to check the correctness of output data
   * Tool's validation method is optional
   *
   * @description Method returns true|false whether data passed the validation or not
   * @param {BlockToolData} data - data to validate
   * @returns {Promise<boolean>} valid
   */
  async validate(e) {
    let t = !0;
    return this.toolInstance.validate instanceof Function && (t = await this.toolInstance.validate(e)), t;
  }
  /**
   * Returns data to render in Block Tunes menu.
   * Splits block tunes into 2 groups: block specific tunes and common tunes
   */
  getTunes() {
    const e = [], t = [], n = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [];
    return f.isElement(n) ? e.push({
      type: j.Html,
      element: n
    }) : Array.isArray(n) ? e.push(...n) : e.push(n), [
      ...this.tunesInstances.values(),
      ...this.defaultTunesInstances.values()
    ].map((r) => r.render()).forEach((r) => {
      f.isElement(r) ? t.push({
        type: j.Html,
        element: r
      }) : Array.isArray(r) ? t.push(...r) : t.push(r);
    }), {
      toolTunes: e,
      commonTunes: t
    };
  }
  /**
   * Update current input index with selection anchor node
   */
  updateCurrentInput() {
    this.currentInput = f.isNativeInput(document.activeElement) || !C.anchorNode ? document.activeElement : C.anchorNode;
  }
  /**
   * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
   * Can be useful for block changes invisible for editor core.
   */
  dispatchChange() {
    this.didMutated();
  }
  /**
   * Call Tool instance destroy method
   */
  destroy() {
    this.unwatchBlockMutations(), this.removeInputEvents(), super.destroy(), D(this.toolInstance.destroy) && this.toolInstance.destroy();
  }
  /**
   * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
   * This method returns the entry that is related to the Block (depended on the Block data)
   */
  async getActiveToolboxEntry() {
    const e = this.tool.toolbox;
    if (e.length === 1)
      return Promise.resolve(this.tool.toolbox[0]);
    const t = await this.data, n = e;
    return n?.find((r) => Li(r.data, t));
  }
  /**
   * Exports Block data as string using conversion config
   */
  async exportDataAsString() {
    const e = await this.data;
    return hl(e, this.tool.conversionConfig);
  }
  /**
   * Make default Block wrappers and put Tool`s content there
   *
   * @returns {HTMLDivElement}
   */
  compose() {
    const e = f.make("div", be.CSS.wrapper), t = f.make("div", be.CSS.content), n = this.toolInstance.render();
    e.dataset.id = this.id, this.toolRenderedElement = n, t.appendChild(this.toolRenderedElement);
    let r = t;
    return [...this.tunesInstances.values(), ...this.defaultTunesInstances.values()].forEach((i) => {
      if (D(i.wrap))
        try {
          r = i.wrap(r);
        } catch (s) {
          L(`Tune ${i.constructor.name} wrap method throws an Error %o`, "warn", s);
        }
    }), e.appendChild(r), e;
  }
  /**
   * Instantiate Block Tunes
   *
   * @param tunesData - current Block tunes data
   * @private
   */
  composeTunes(e) {
    Array.from(this.tunes.values()).forEach((t) => {
      (t.isInternal ? this.defaultTunesInstances : this.tunesInstances).set(t.name, t.create(e[t.name], this.blockAPI));
    }), Object.entries(e).forEach(([t, n]) => {
      this.tunesInstances.has(t) || (this.unavailableTunesData[t] = n);
    });
  }
  /**
   * Adds focus event listeners to all inputs and contenteditable
   */
  addInputEvents() {
    this.inputs.forEach((e) => {
      e.addEventListener("focus", this.handleFocus), f.isNativeInput(e) && e.addEventListener("input", this.didMutated);
    });
  }
  /**
   * removes focus event listeners from all inputs and contenteditable
   */
  removeInputEvents() {
    this.inputs.forEach((e) => {
      e.removeEventListener("focus", this.handleFocus), f.isNativeInput(e) && e.removeEventListener("input", this.didMutated);
    });
  }
  /**
   * Listen common editor Dom Changed event and detect mutations related to the  Block
   */
  watchBlockMutations() {
    var e;
    this.redactorDomChangedCallback = (t) => {
      const { mutations: n } = t;
      n.some((r) => ul(r, this.toolRenderedElement)) && this.didMutated(n);
    }, (e = this.editorEventBus) == null || e.on(mo, this.redactorDomChangedCallback);
  }
  /**
   * Remove redactor dom change event listener
   */
  unwatchBlockMutations() {
    var e;
    (e = this.editorEventBus) == null || e.off(mo, this.redactorDomChangedCallback);
  }
  /**
   * Sometimes Tool can replace own main element, for example H2 -> H4 or UL -> OL
   * We need to detect such changes and update a link to tools main element with the new one
   *
   * @param mutations - records of block content mutations
   */
  detectToolRootChange(e) {
    e.forEach((t) => {
      if (Array.from(t.removedNodes).includes(this.toolRenderedElement)) {
        const n = t.addedNodes[t.addedNodes.length - 1];
        this.toolRenderedElement = n;
      }
    });
  }
  /**
   * Clears inputs cached value
   */
  dropInputsCache() {
    this.cachedInputs = [];
  }
  /**
   * Mark inputs with 'data-empty' attribute with the empty state
   */
  toggleInputsEmptyMark() {
    this.inputs.forEach(Ci);
  }
};
class pl extends O {
  constructor() {
    super(...arguments), this.insert = (e = this.config.defaultBlock, t = {}, n = {}, r, i, s, a) => {
      const l = this.Editor.BlockManager.insert({
        id: a,
        tool: e,
        data: t,
        index: r,
        needToFocus: i,
        replace: s
      });
      return new ue(l);
    }, this.composeBlockData = async (e) => {
      const t = this.Editor.Tools.blockTools.get(e);
      return new fe({
        tool: t,
        api: this.Editor.API,
        readOnly: !0,
        data: {},
        tunesData: {}
      }).data;
    }, this.update = async (e, t, n) => {
      const { BlockManager: r } = this.Editor, i = r.getBlockById(e);
      if (i === void 0)
        throw new Error(`Block with id "${e}" not found`);
      const s = await r.update(i, t, n);
      return new ue(s);
    }, this.convert = async (e, t, n) => {
      var r, i;
      const { BlockManager: s, Tools: a } = this.Editor, l = s.getBlockById(e);
      if (!l)
        throw new Error(`Block with id "${e}" not found`);
      const c = a.blockTools.get(l.name), d = a.blockTools.get(t);
      if (!d)
        throw new Error(`Block Tool with type "${t}" not found`);
      const u = ((r = c?.conversionConfig) == null ? void 0 : r.export) !== void 0, h = ((i = d.conversionConfig) == null ? void 0 : i.import) !== void 0;
      if (u && h) {
        const g = await s.convert(l, t, n);
        return new ue(g);
      } else {
        const g = [
          u ? !1 : wt(l.name),
          h ? !1 : wt(t)
        ].filter(Boolean).join(" and ");
        throw new Error(`Conversion from "${l.name}" to "${t}" is not possible. ${g} tool(s) should provide a "conversionConfig"`);
      }
    }, this.insertMany = (e, t = this.Editor.BlockManager.blocks.length - 1) => {
      this.validateIndex(t);
      const n = e.map(({ id: r, type: i, data: s }) => this.Editor.BlockManager.composeBlock({
        id: r,
        tool: i || this.config.defaultBlock,
        data: s
      }));
      return this.Editor.BlockManager.insertMany(n, t), n.map((r) => new ue(r));
    };
  }
  /**
   * Available methods
   *
   * @returns {Blocks}
   */
  get methods() {
    return {
      clear: () => this.clear(),
      render: (e) => this.render(e),
      renderFromHTML: (e) => this.renderFromHTML(e),
      delete: (e) => this.delete(e),
      swap: (e, t) => this.swap(e, t),
      move: (e, t) => this.move(e, t),
      getBlockByIndex: (e) => this.getBlockByIndex(e),
      getById: (e) => this.getById(e),
      getCurrentBlockIndex: () => this.getCurrentBlockIndex(),
      getBlockIndex: (e) => this.getBlockIndex(e),
      getBlocksCount: () => this.getBlocksCount(),
      getBlockByElement: (e) => this.getBlockByElement(e),
      stretchBlock: (e, t = !0) => this.stretchBlock(e, t),
      insertNewBlock: () => this.insertNewBlock(),
      insert: this.insert,
      insertMany: this.insertMany,
      update: this.update,
      composeBlockData: this.composeBlockData,
      convert: this.convert
    };
  }
  /**
   * Returns Blocks count
   *
   * @returns {number}
   */
  getBlocksCount() {
    return this.Editor.BlockManager.blocks.length;
  }
  /**
   * Returns current block index
   *
   * @returns {number}
   */
  getCurrentBlockIndex() {
    return this.Editor.BlockManager.currentBlockIndex;
  }
  /**
   * Returns the index of Block by id;
   *
   * @param id - block id
   */
  getBlockIndex(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    if (!t) {
      ee("There is no block with id `" + e + "`", "warn");
      return;
    }
    return this.Editor.BlockManager.getBlockIndex(t);
  }
  /**
   * Returns BlockAPI object by Block index
   *
   * @param {number} index - index to get
   */
  getBlockByIndex(e) {
    const t = this.Editor.BlockManager.getBlockByIndex(e);
    if (t === void 0) {
      ee("There is no block at index `" + e + "`", "warn");
      return;
    }
    return new ue(t);
  }
  /**
   * Returns BlockAPI object by Block id
   *
   * @param id - id of block to get
   */
  getById(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    return t === void 0 ? (ee("There is no block with id `" + e + "`", "warn"), null) : new ue(t);
  }
  /**
   * Get Block API object by any child html element
   *
   * @param element - html element to get Block by
   */
  getBlockByElement(e) {
    const t = this.Editor.BlockManager.getBlock(e);
    if (t === void 0) {
      ee("There is no block corresponding to element `" + e + "`", "warn");
      return;
    }
    return new ue(t);
  }
  /**
   * Call Block Manager method that swap Blocks
   *
   * @param {number} fromIndex - position of first Block
   * @param {number} toIndex - position of second Block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    L(
      "`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead",
      "info"
    ), this.Editor.BlockManager.swap(e, t);
  }
  /**
   * Move block from one index to another
   *
   * @param {number} toIndex - index to move to
   * @param {number} fromIndex - index to move from
   */
  move(e, t) {
    this.Editor.BlockManager.move(e, t);
  }
  /**
   * Deletes Block
   *
   * @param {number} blockIndex - index of Block to delete
   */
  delete(e = this.Editor.BlockManager.currentBlockIndex) {
    try {
      const t = this.Editor.BlockManager.getBlockByIndex(e);
      this.Editor.BlockManager.removeBlock(t);
    } catch (t) {
      ee(t, "warn");
      return;
    }
    this.Editor.BlockManager.blocks.length === 0 && this.Editor.BlockManager.insert(), this.Editor.BlockManager.currentBlock && this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END), this.Editor.Toolbar.close();
  }
  /**
   * Clear Editor's area
   */
  async clear() {
    await this.Editor.BlockManager.clear(!0), this.Editor.InlineToolbar.close();
  }
  /**
   * Fills Editor with Blocks data
   *
   * @param {OutputData} data — Saved Editor data
   */
  async render(e) {
    if (e === void 0 || e.blocks === void 0)
      throw new Error("Incorrect data passed to the render() method");
    this.Editor.ModificationsObserver.disable(), await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(e.blocks), this.Editor.ModificationsObserver.enable();
  }
  /**
   * Render passed HTML string
   *
   * @param {string} data - HTML string to render
   * @returns {Promise<void>}
   */
  async renderFromHTML(e) {
    return await this.Editor.BlockManager.clear(), this.Editor.Paste.processText(e, !0);
  }
  /**
   * Stretch Block's content
   *
   * @param {number} index - index of Block to stretch
   * @param {boolean} status - true to enable, false to disable
   * @deprecated Use BlockAPI interface to stretch Blocks
   */
  stretchBlock(e, t = !0) {
    fo(
      !0,
      "blocks.stretchBlock()",
      "BlockAPI"
    );
    const n = this.Editor.BlockManager.getBlockByIndex(e);
    n && (n.stretched = t);
  }
  /**
   * Insert new Block
   * After set caret to this Block
   *
   * @todo remove in 3.0.0
   * @deprecated with insert() method
   */
  insertNewBlock() {
    L("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
  }
  /**
   * Validated block index and throws an error if it's invalid
   *
   * @param index - index to validate
   */
  validateIndex(e) {
    if (typeof e != "number")
      throw new Error("Index should be a number");
    if (e < 0)
      throw new Error("Index should be greater than or equal to 0");
    if (e === null)
      throw new Error("Index should be greater than or equal to 0");
  }
}
function fl(o, e) {
  return typeof o == "number" ? e.BlockManager.getBlockByIndex(o) : typeof o == "string" ? e.BlockManager.getBlockById(o) : e.BlockManager.getBlockById(o.id);
}
class gl extends O {
  constructor() {
    super(...arguments), this.setToFirstBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.firstBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock, e, t), !0) : !1, this.setToLastBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.lastBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock, e, t), !0) : !1, this.setToPreviousBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.previousBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock, e, t), !0) : !1, this.setToNextBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.nextBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock, e, t), !0) : !1, this.setToBlock = (e, t = this.Editor.Caret.positions.DEFAULT, n = 0) => {
      const r = fl(e, this.Editor);
      return r === void 0 ? !1 : (this.Editor.Caret.setToBlock(r, t, n), !0);
    }, this.focus = (e = !1) => e ? this.setToLastBlock(this.Editor.Caret.positions.END) : this.setToFirstBlock(this.Editor.Caret.positions.START);
  }
  /**
   * Available methods
   *
   * @returns {Caret}
   */
  get methods() {
    return {
      setToFirstBlock: this.setToFirstBlock,
      setToLastBlock: this.setToLastBlock,
      setToPreviousBlock: this.setToPreviousBlock,
      setToNextBlock: this.setToNextBlock,
      setToBlock: this.setToBlock,
      focus: this.focus
    };
  }
}
class ml extends O {
  /**
   * Available methods
   *
   * @returns {Events}
   */
  get methods() {
    return {
      emit: (e, t) => this.emit(e, t),
      off: (e, t) => this.off(e, t),
      on: (e, t) => this.on(e, t)
    };
  }
  /**
   * Subscribe on Events
   *
   * @param {string} eventName - event name to subscribe
   * @param {Function} callback - event handler
   */
  on(e, t) {
    this.eventsDispatcher.on(e, t);
  }
  /**
   * Emit event with data
   *
   * @param {string} eventName - event to emit
   * @param {object} data - event's data
   */
  emit(e, t) {
    this.eventsDispatcher.emit(e, t);
  }
  /**
   * Unsubscribe from Event
   *
   * @param {string} eventName - event to unsubscribe
   * @param {Function} callback - event handler
   */
  off(e, t) {
    this.eventsDispatcher.off(e, t);
  }
}
let bl = class Ai extends O {
  /**
   * Return namespace section for tool or block tune
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  static getNamespace(e, t) {
    return t ? `blockTunes.${e}` : `tools.${e}`;
  }
  /**
   * Return I18n API methods with global dictionary access
   */
  get methods() {
    return {
      t: () => {
        ee("I18n.t() method can be accessed only from Tools", "warn");
      }
    };
  }
  /**
   * Return I18n API methods with tool namespaced dictionary
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  getMethodsForTool(e, t) {
    return Object.assign(
      this.methods,
      {
        t: (n) => V.t(Ai.getNamespace(e, t), n)
      }
    );
  }
};
class vl extends O {
  /**
   * Editor.js Core API modules
   */
  get methods() {
    return {
      blocks: this.Editor.BlocksAPI.methods,
      caret: this.Editor.CaretAPI.methods,
      tools: this.Editor.ToolsAPI.methods,
      events: this.Editor.EventsAPI.methods,
      listeners: this.Editor.ListenersAPI.methods,
      notifier: this.Editor.NotifierAPI.methods,
      sanitizer: this.Editor.SanitizerAPI.methods,
      saver: this.Editor.SaverAPI.methods,
      selection: this.Editor.SelectionAPI.methods,
      styles: this.Editor.StylesAPI.classes,
      toolbar: this.Editor.ToolbarAPI.methods,
      inlineToolbar: this.Editor.InlineToolbarAPI.methods,
      tooltip: this.Editor.TooltipAPI.methods,
      i18n: this.Editor.I18nAPI.methods,
      readOnly: this.Editor.ReadOnlyAPI.methods,
      ui: this.Editor.UiAPI.methods
    };
  }
  /**
   * Returns Editor.js Core API methods for passed tool
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  getMethodsForTool(e, t) {
    return Object.assign(
      this.methods,
      {
        i18n: this.Editor.I18nAPI.getMethodsForTool(e, t)
      }
    );
  }
}
class yl extends O {
  /**
   * Available methods
   *
   * @returns {InlineToolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open()
    };
  }
  /**
   * Open Inline Toolbar
   */
  open() {
    this.Editor.InlineToolbar.tryToShow();
  }
  /**
   * Close Inline Toolbar
   */
  close() {
    this.Editor.InlineToolbar.close();
  }
}
class kl extends O {
  /**
   * Available methods
   *
   * @returns {Listeners}
   */
  get methods() {
    return {
      on: (e, t, n, r) => this.on(e, t, n, r),
      off: (e, t, n, r) => this.off(e, t, n, r),
      offById: (e) => this.offById(e)
    };
  }
  /**
   * Ads a DOM event listener. Return it's id.
   *
   * @param {HTMLElement} element - Element to set handler to
   * @param {string} eventType - event type
   * @param {() => void} handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  on(e, t, n, r) {
    return this.listeners.on(e, t, n, r);
  }
  /**
   * Removes DOM listener from element
   *
   * @param {Element} element - Element to remove handler from
   * @param eventType - event type
   * @param handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  off(e, t, n, r) {
    this.listeners.off(e, t, n, r);
  }
  /**
   * Removes DOM listener by the listener id
   *
   * @param id - id of the listener to remove
   */
  offById(e) {
    this.listeners.offById(e);
  }
}
var Ni = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return (function(t) {
      var n = {};
      function r(i) {
        if (n[i])
          return n[i].exports;
        var s = n[i] = { i, l: !1, exports: {} };
        return t[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
      }
      return r.m = t, r.c = n, r.d = function(i, s, a) {
        r.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: a });
      }, r.r = function(i) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
      }, r.t = function(i, s) {
        if (1 & s && (i = r(i)), 8 & s || 4 & s && typeof i == "object" && i && i.__esModule)
          return i;
        var a = /* @__PURE__ */ Object.create(null);
        if (r.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: i }), 2 & s && typeof i != "string")
          for (var l in i)
            r.d(a, l, (function(c) {
              return i[c];
            }).bind(null, l));
        return a;
      }, r.n = function(i) {
        var s = i && i.__esModule ? function() {
          return i.default;
        } : function() {
          return i;
        };
        return r.d(s, "a", s), s;
      }, r.o = function(i, s) {
        return Object.prototype.hasOwnProperty.call(i, s);
      }, r.p = "/", r(r.s = 0);
    })([function(t, n, r) {
      r(1), /*!
      * Codex JavaScript Notification module
      * https://github.com/codex-team/js-notifier
      */
      t.exports = (function() {
        var i = r(6), s = "cdx-notify--bounce-in", a = null;
        return { show: function(l) {
          if (l.message) {
            (function() {
              if (a)
                return !0;
              a = i.getWrapper(), document.body.appendChild(a);
            })();
            var c = null, d = l.time || 8e3;
            switch (l.type) {
              case "confirm":
                c = i.confirm(l);
                break;
              case "prompt":
                c = i.prompt(l);
                break;
              default:
                c = i.alert(l), window.setTimeout(function() {
                  c.remove();
                }, d);
            }
            a.appendChild(c), c.classList.add(s);
          }
        } };
      })();
    }, function(t, n, r) {
      var i = r(2);
      typeof i == "string" && (i = [[t.i, i, ""]]);
      var s = { hmr: !0, transform: void 0, insertInto: void 0 };
      r(4)(i, s), i.locals && (t.exports = i.locals);
    }, function(t, n, r) {
      (t.exports = r(3)(!1)).push([t.i, `.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}`, ""]);
    }, function(t, n) {
      t.exports = function(r) {
        var i = [];
        return i.toString = function() {
          return this.map(function(s) {
            var a = (function(l, c) {
              var d = l[1] || "", u = l[3];
              if (!u)
                return d;
              if (c && typeof btoa == "function") {
                var h = (p = u, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(p)))) + " */"), g = u.sources.map(function(v) {
                  return "/*# sourceURL=" + u.sourceRoot + v + " */";
                });
                return [d].concat(g).concat([h]).join(`
`);
              }
              var p;
              return [d].join(`
`);
            })(s, r);
            return s[2] ? "@media " + s[2] + "{" + a + "}" : a;
          }).join("");
        }, i.i = function(s, a) {
          typeof s == "string" && (s = [[null, s, ""]]);
          for (var l = {}, c = 0; c < this.length; c++) {
            var d = this[c][0];
            typeof d == "number" && (l[d] = !0);
          }
          for (c = 0; c < s.length; c++) {
            var u = s[c];
            typeof u[0] == "number" && l[u[0]] || (a && !u[2] ? u[2] = a : a && (u[2] = "(" + u[2] + ") and (" + a + ")"), i.push(u));
          }
        }, i;
      };
    }, function(t, n, r) {
      var i, s, a = {}, l = (i = function() {
        return window && document && document.all && !window.atob;
      }, function() {
        return s === void 0 && (s = i.apply(this, arguments)), s;
      }), c = /* @__PURE__ */ (function(y) {
        var m = {};
        return function(w) {
          if (typeof w == "function")
            return w();
          if (m[w] === void 0) {
            var b = (function(x) {
              return document.querySelector(x);
            }).call(this, w);
            if (window.HTMLIFrameElement && b instanceof window.HTMLIFrameElement)
              try {
                b = b.contentDocument.head;
              } catch {
                b = null;
              }
            m[w] = b;
          }
          return m[w];
        };
      })(), d = null, u = 0, h = [], g = r(5);
      function p(y, m) {
        for (var w = 0; w < y.length; w++) {
          var b = y[w], x = a[b.id];
          if (x) {
            x.refs++;
            for (var E = 0; E < x.parts.length; E++)
              x.parts[E](b.parts[E]);
            for (; E < b.parts.length; E++)
              x.parts.push(M(b.parts[E], m));
          } else {
            var I = [];
            for (E = 0; E < b.parts.length; E++)
              I.push(M(b.parts[E], m));
            a[b.id] = { id: b.id, refs: 1, parts: I };
          }
        }
      }
      function v(y, m) {
        for (var w = [], b = {}, x = 0; x < y.length; x++) {
          var E = y[x], I = m.base ? E[0] + m.base : E[0], T = { css: E[1], media: E[2], sourceMap: E[3] };
          b[I] ? b[I].parts.push(T) : w.push(b[I] = { id: I, parts: [T] });
        }
        return w;
      }
      function _(y, m) {
        var w = c(y.insertInto);
        if (!w)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var b = h[h.length - 1];
        if (y.insertAt === "top")
          b ? b.nextSibling ? w.insertBefore(m, b.nextSibling) : w.appendChild(m) : w.insertBefore(m, w.firstChild), h.push(m);
        else if (y.insertAt === "bottom")
          w.appendChild(m);
        else {
          if (typeof y.insertAt != "object" || !y.insertAt.before)
            throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
          var x = c(y.insertInto + " " + y.insertAt.before);
          w.insertBefore(m, x);
        }
      }
      function B(y) {
        if (y.parentNode === null)
          return !1;
        y.parentNode.removeChild(y);
        var m = h.indexOf(y);
        m >= 0 && h.splice(m, 1);
      }
      function k(y) {
        var m = document.createElement("style");
        return y.attrs.type === void 0 && (y.attrs.type = "text/css"), P(m, y.attrs), _(y, m), m;
      }
      function P(y, m) {
        Object.keys(m).forEach(function(w) {
          y.setAttribute(w, m[w]);
        });
      }
      function M(y, m) {
        var w, b, x, E;
        if (m.transform && y.css) {
          if (!(E = m.transform(y.css)))
            return function() {
            };
          y.css = E;
        }
        if (m.singleton) {
          var I = u++;
          w = d || (d = k(m)), b = G.bind(null, w, I, !1), x = G.bind(null, w, I, !0);
        } else
          y.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (w = (function(T) {
            var H = document.createElement("link");
            return T.attrs.type === void 0 && (T.attrs.type = "text/css"), T.attrs.rel = "stylesheet", P(H, T.attrs), _(T, H), H;
          })(m), b = (function(T, H, Ce) {
            var ce = Ce.css, Ue = Ce.sourceMap, ka = H.convertToAbsoluteUrls === void 0 && Ue;
            (H.convertToAbsoluteUrls || ka) && (ce = g(ce)), Ue && (ce += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(Ue)))) + " */");
            var wa = new Blob([ce], { type: "text/css" }), Yr = T.href;
            T.href = URL.createObjectURL(wa), Yr && URL.revokeObjectURL(Yr);
          }).bind(null, w, m), x = function() {
            B(w), w.href && URL.revokeObjectURL(w.href);
          }) : (w = k(m), b = (function(T, H) {
            var Ce = H.css, ce = H.media;
            if (ce && T.setAttribute("media", ce), T.styleSheet)
              T.styleSheet.cssText = Ce;
            else {
              for (; T.firstChild; )
                T.removeChild(T.firstChild);
              T.appendChild(document.createTextNode(Ce));
            }
          }).bind(null, w), x = function() {
            B(w);
          });
        return b(y), function(T) {
          if (T) {
            if (T.css === y.css && T.media === y.media && T.sourceMap === y.sourceMap)
              return;
            b(y = T);
          } else
            x();
        };
      }
      t.exports = function(y, m) {
        if (typeof DEBUG < "u" && DEBUG && typeof document != "object")
          throw new Error("The style-loader cannot be used in a non-browser environment");
        (m = m || {}).attrs = typeof m.attrs == "object" ? m.attrs : {}, m.singleton || typeof m.singleton == "boolean" || (m.singleton = l()), m.insertInto || (m.insertInto = "head"), m.insertAt || (m.insertAt = "bottom");
        var w = v(y, m);
        return p(w, m), function(b) {
          for (var x = [], E = 0; E < w.length; E++) {
            var I = w[E];
            (T = a[I.id]).refs--, x.push(T);
          }
          for (b && p(v(b, m), m), E = 0; E < x.length; E++) {
            var T;
            if ((T = x[E]).refs === 0) {
              for (var H = 0; H < T.parts.length; H++)
                T.parts[H]();
              delete a[T.id];
            }
          }
        };
      };
      var N, U = (N = [], function(y, m) {
        return N[y] = m, N.filter(Boolean).join(`
`);
      });
      function G(y, m, w, b) {
        var x = w ? "" : b.css;
        if (y.styleSheet)
          y.styleSheet.cssText = U(m, x);
        else {
          var E = document.createTextNode(x), I = y.childNodes;
          I[m] && y.removeChild(I[m]), I.length ? y.insertBefore(E, I[m]) : y.appendChild(E);
        }
      }
    }, function(t, n) {
      t.exports = function(r) {
        var i = typeof window < "u" && window.location;
        if (!i)
          throw new Error("fixUrls requires window.location");
        if (!r || typeof r != "string")
          return r;
        var s = i.protocol + "//" + i.host, a = s + i.pathname.replace(/\/[^\/]*$/, "/");
        return r.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(l, c) {
          var d, u = c.trim().replace(/^"(.*)"$/, function(h, g) {
            return g;
          }).replace(/^'(.*)'$/, function(h, g) {
            return g;
          });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(u) ? l : (d = u.indexOf("//") === 0 ? u : u.indexOf("/") === 0 ? s + u : a + u.replace(/^\.\//, ""), "url(" + JSON.stringify(d) + ")");
        });
      };
    }, function(t, n, r) {
      var i, s, a, l, c, d, u, h, g;
      t.exports = (i = "cdx-notifies", s = "cdx-notify", a = "cdx-notify__cross", l = "cdx-notify__button--confirm", c = "cdx-notify__button--cancel", d = "cdx-notify__input", u = "cdx-notify__button", h = "cdx-notify__btns-wrapper", { alert: g = function(p) {
        var v = document.createElement("DIV"), _ = document.createElement("DIV"), B = p.message, k = p.style;
        return v.classList.add(s), k && v.classList.add(s + "--" + k), v.innerHTML = B, _.classList.add(a), _.addEventListener("click", v.remove.bind(v)), v.appendChild(_), v;
      }, confirm: function(p) {
        var v = g(p), _ = document.createElement("div"), B = document.createElement("button"), k = document.createElement("button"), P = v.querySelector("." + a), M = p.cancelHandler, N = p.okHandler;
        return _.classList.add(h), B.innerHTML = p.okText || "Confirm", k.innerHTML = p.cancelText || "Cancel", B.classList.add(u), k.classList.add(u), B.classList.add(l), k.classList.add(c), M && typeof M == "function" && (k.addEventListener("click", M), P.addEventListener("click", M)), N && typeof N == "function" && B.addEventListener("click", N), B.addEventListener("click", v.remove.bind(v)), k.addEventListener("click", v.remove.bind(v)), _.appendChild(B), _.appendChild(k), v.appendChild(_), v;
      }, prompt: function(p) {
        var v = g(p), _ = document.createElement("div"), B = document.createElement("button"), k = document.createElement("input"), P = v.querySelector("." + a), M = p.cancelHandler, N = p.okHandler;
        return _.classList.add(h), B.innerHTML = p.okText || "Ok", B.classList.add(u), B.classList.add(l), k.classList.add(d), p.placeholder && k.setAttribute("placeholder", p.placeholder), p.default && (k.value = p.default), p.inputType && (k.type = p.inputType), M && typeof M == "function" && P.addEventListener("click", M), N && typeof N == "function" && B.addEventListener("click", function() {
          N(k.value);
        }), B.addEventListener("click", v.remove.bind(v)), _.appendChild(k), _.appendChild(B), v.appendChild(_), v;
      }, getWrapper: function() {
        var p = document.createElement("DIV");
        return p.classList.add(i), p;
      } });
    }]);
  });
})(Ni);
var wl = Ni.exports;
const xl = /* @__PURE__ */ Mt(wl);
class El {
  /**
   * Show web notification
   *
   * @param {NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions} options - notification options
   */
  show(e) {
    xl.show(e);
  }
}
class Cl extends O {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.notifier = new El();
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e) => this.show(e)
    };
  }
  /**
   * Show notification
   *
   * @param {NotifierOptions} options - message option
   */
  show(e) {
    return this.notifier.show(e);
  }
}
class Tl extends O {
  /**
   * Available methods
   */
  get methods() {
    const e = () => this.isEnabled;
    return {
      toggle: (t) => this.toggle(t),
      get isEnabled() {
        return e();
      }
    };
  }
  /**
   * Set or toggle read-only state
   *
   * @param {boolean|undefined} state - set or toggle state
   * @returns {boolean} current value
   */
  toggle(e) {
    return this.Editor.ReadOnly.toggle(e);
  }
  /**
   * Returns current read-only state
   */
  get isEnabled() {
    return this.Editor.ReadOnly.isEnabled;
  }
}
var ji = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(Ge, function() {
    function t(u) {
      var h = u.tags, g = Object.keys(h), p = g.map(function(v) {
        return typeof h[v];
      }).every(function(v) {
        return v === "object" || v === "boolean" || v === "function";
      });
      if (!p)
        throw new Error("The configuration was invalid");
      this.config = u;
    }
    var n = ["P", "LI", "TD", "TH", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"];
    function r(u) {
      return n.indexOf(u.nodeName) !== -1;
    }
    var i = ["A", "B", "STRONG", "I", "EM", "SUB", "SUP", "U", "STRIKE"];
    function s(u) {
      return i.indexOf(u.nodeName) !== -1;
    }
    t.prototype.clean = function(u) {
      const h = document.implementation.createHTMLDocument(), g = h.createElement("div");
      return g.innerHTML = u, this._sanitize(h, g), g.innerHTML;
    }, t.prototype._sanitize = function(u, h) {
      var g = a(u, h), p = g.firstChild();
      if (p)
        do {
          if (p.nodeType === Node.TEXT_NODE)
            if (p.data.trim() === "" && (p.previousElementSibling && r(p.previousElementSibling) || p.nextElementSibling && r(p.nextElementSibling))) {
              h.removeChild(p), this._sanitize(u, h);
              break;
            } else
              continue;
          if (p.nodeType === Node.COMMENT_NODE) {
            h.removeChild(p), this._sanitize(u, h);
            break;
          }
          var v = s(p), _;
          v && (_ = Array.prototype.some.call(p.childNodes, r));
          var B = !!h.parentNode, k = r(h) && r(p) && B, P = p.nodeName.toLowerCase(), M = l(this.config, P, p), N = v && _;
          if (N || c(p, M) || !this.config.keepNestedBlockElements && k) {
            if (!(p.nodeName === "SCRIPT" || p.nodeName === "STYLE"))
              for (; p.childNodes.length > 0; )
                h.insertBefore(p.childNodes[0], p);
            h.removeChild(p), this._sanitize(u, h);
            break;
          }
          for (var U = 0; U < p.attributes.length; U += 1) {
            var G = p.attributes[U];
            d(G, M, p) && (p.removeAttribute(G.name), U = U - 1);
          }
          this._sanitize(u, p);
        } while (p = g.nextSibling());
    };
    function a(u, h) {
      return u.createTreeWalker(
        h,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
        null,
        !1
      );
    }
    function l(u, h, g) {
      return typeof u.tags[h] == "function" ? u.tags[h](g) : u.tags[h];
    }
    function c(u, h) {
      return typeof h > "u" ? !0 : typeof h == "boolean" ? !h : !1;
    }
    function d(u, h, g) {
      var p = u.name.toLowerCase();
      return h === !0 ? !1 : typeof h[p] == "function" ? !h[p](u.value, g) : typeof h[p] > "u" || h[p] === !1 ? !0 : typeof h[p] == "string" ? h[p] !== u.value : !1;
    }
    return t;
  });
})(ji);
var Sl = ji.exports;
const _l = /* @__PURE__ */ Mt(Sl);
function So(o, e) {
  return o.map((t) => {
    const n = D(e) ? e(t.tool) : e;
    return J(n) || (t.data = _o(t.data, n)), t;
  });
}
function se(o, e = {}) {
  const t = {
    tags: e
  };
  return new _l(t).clean(o);
}
function _o(o, e) {
  return Array.isArray(o) ? Bl(o, e) : z(o) ? Ol(o, e) : ge(o) ? Il(o, e) : o;
}
function Bl(o, e) {
  return o.map((t) => _o(t, e));
}
function Ol(o, e) {
  const t = {};
  for (const n in o) {
    if (!Object.prototype.hasOwnProperty.call(o, n))
      continue;
    const r = o[n], i = Ml(e[n]) ? e[n] : e;
    t[n] = _o(r, i);
  }
  return t;
}
function Il(o, e) {
  return z(e) ? se(o, e) : e === !1 ? se(o, {}) : o;
}
function Ml(o) {
  return z(o) || Xa(o) || D(o);
}
class Ll extends O {
  /**
   * Available methods
   *
   * @returns {SanitizerConfig}
   */
  get methods() {
    return {
      clean: (e, t) => this.clean(e, t)
    };
  }
  /**
   * Perform sanitizing of a string
   *
   * @param {string} taintString - what to sanitize
   * @param {SanitizerConfig} config - sanitizer config
   * @returns {string}
   */
  clean(e, t) {
    return se(e, t);
  }
}
class Pl extends O {
  /**
   * Available methods
   *
   * @returns {Saver}
   */
  get methods() {
    return {
      save: () => this.save()
    };
  }
  /**
   * Return Editor's data
   *
   * @returns {OutputData}
   */
  save() {
    const e = "Editor's content can not be saved in read-only mode";
    return this.Editor.ReadOnly.isEnabled ? (ee(e, "warn"), Promise.reject(new Error(e))) : this.Editor.Saver.save();
  }
}
class Al extends O {
  constructor() {
    super(...arguments), this.selectionUtils = new C();
  }
  /**
   * Available methods
   *
   * @returns {SelectionAPIInterface}
   */
  get methods() {
    return {
      findParentTag: (e, t) => this.findParentTag(e, t),
      expandToTag: (e) => this.expandToTag(e),
      save: () => this.selectionUtils.save(),
      restore: () => this.selectionUtils.restore(),
      setFakeBackground: () => this.selectionUtils.setFakeBackground(),
      removeFakeBackground: () => this.selectionUtils.removeFakeBackground()
    };
  }
  /**
   * Looks ahead from selection and find passed tag with class name
   *
   * @param {string} tagName - tag to find
   * @param {string} className - tag's class name
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t) {
    return this.selectionUtils.findParentTag(e, t);
  }
  /**
   * Expand selection to passed tag
   *
   * @param {HTMLElement} node - tag that should contain selection
   */
  expandToTag(e) {
    this.selectionUtils.expandToTag(e);
  }
}
class Nl extends O {
  /**
   * Available methods
   */
  get methods() {
    return {
      getBlockTools: () => Array.from(this.Editor.Tools.blockTools.values())
    };
  }
}
class jl extends O {
  /**
   * Exported classes
   */
  get classes() {
    return {
      /**
       * Base Block styles
       */
      block: "cdx-block",
      /**
       * Inline Tools styles
       */
      inlineToolButton: "ce-inline-tool",
      inlineToolButtonActive: "ce-inline-tool--active",
      /**
       * UI elements
       */
      input: "cdx-input",
      loader: "cdx-loader",
      button: "cdx-button",
      /**
       * Settings styles
       */
      settingsButton: "cdx-settings-button",
      settingsButtonActive: "cdx-settings-button--active"
    };
  }
}
class Dl extends O {
  /**
   * Available methods
   *
   * @returns {Toolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open(),
      toggleBlockSettings: (e) => this.toggleBlockSettings(e),
      toggleToolbox: (e) => this.toggleToolbox(e)
    };
  }
  /**
   * Open toolbar
   */
  open() {
    this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * Close toolbar and all included elements
   */
  close() {
    this.Editor.Toolbar.close();
  }
  /**
   * Toggles Block Setting of the current block
   *
   * @param {boolean} openingState —  opening state of Block Setting
   */
  toggleBlockSettings(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      ee("Could't toggle the Toolbar because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.BlockSettings.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
  }
  /**
   * Open toolbox
   *
   * @param {boolean} openingState - Opening state of toolbox
   */
  toggleToolbox(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      ee("Could't toggle the Toolbox because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
  }
}
var Di = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return (function(t) {
      var n = {};
      function r(i) {
        if (n[i])
          return n[i].exports;
        var s = n[i] = { i, l: !1, exports: {} };
        return t[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
      }
      return r.m = t, r.c = n, r.d = function(i, s, a) {
        r.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: a });
      }, r.r = function(i) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
      }, r.t = function(i, s) {
        if (1 & s && (i = r(i)), 8 & s || 4 & s && typeof i == "object" && i && i.__esModule)
          return i;
        var a = /* @__PURE__ */ Object.create(null);
        if (r.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: i }), 2 & s && typeof i != "string")
          for (var l in i)
            r.d(a, l, (function(c) {
              return i[c];
            }).bind(null, l));
        return a;
      }, r.n = function(i) {
        var s = i && i.__esModule ? function() {
          return i.default;
        } : function() {
          return i;
        };
        return r.d(s, "a", s), s;
      }, r.o = function(i, s) {
        return Object.prototype.hasOwnProperty.call(i, s);
      }, r.p = "", r(r.s = 0);
    })([function(t, n, r) {
      t.exports = r(1);
    }, function(t, n, r) {
      r.r(n), r.d(n, "default", function() {
        return i;
      });
      class i {
        constructor() {
          this.nodes = { wrapper: null, content: null }, this.showed = !1, this.offsetTop = 10, this.offsetLeft = 10, this.offsetRight = 10, this.hidingDelay = 0, this.handleWindowScroll = () => {
            this.showed && this.hide(!0);
          }, this.loadStyles(), this.prepare(), window.addEventListener("scroll", this.handleWindowScroll, { passive: !0 });
        }
        get CSS() {
          return { tooltip: "ct", tooltipContent: "ct__content", tooltipShown: "ct--shown", placement: { left: "ct--left", bottom: "ct--bottom", right: "ct--right", top: "ct--top" } };
        }
        show(a, l, c) {
          this.nodes.wrapper || this.prepare(), this.hidingTimeout && clearTimeout(this.hidingTimeout);
          const d = Object.assign({ placement: "bottom", marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, delay: 70, hidingDelay: 0 }, c);
          if (d.hidingDelay && (this.hidingDelay = d.hidingDelay), this.nodes.content.innerHTML = "", typeof l == "string")
            this.nodes.content.appendChild(document.createTextNode(l));
          else {
            if (!(l instanceof Node))
              throw Error("[CodeX Tooltip] Wrong type of «content» passed. It should be an instance of Node or String. But " + typeof l + " given.");
            this.nodes.content.appendChild(l);
          }
          switch (this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)), d.placement) {
            case "top":
              this.placeTop(a, d);
              break;
            case "left":
              this.placeLeft(a, d);
              break;
            case "right":
              this.placeRight(a, d);
              break;
            case "bottom":
            default:
              this.placeBottom(a, d);
          }
          d && d.delay ? this.showingTimeout = setTimeout(() => {
            this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0;
          }, d.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0);
        }
        hide(a = !1) {
          if (this.hidingDelay && !a)
            return this.hidingTimeout && clearTimeout(this.hidingTimeout), void (this.hidingTimeout = setTimeout(() => {
              this.hide(!0);
            }, this.hidingDelay));
          this.nodes.wrapper.classList.remove(this.CSS.tooltipShown), this.showed = !1, this.showingTimeout && clearTimeout(this.showingTimeout);
        }
        onHover(a, l, c) {
          a.addEventListener("mouseenter", () => {
            this.show(a, l, c);
          }), a.addEventListener("mouseleave", () => {
            this.hide();
          });
        }
        destroy() {
          this.nodes.wrapper.remove(), window.removeEventListener("scroll", this.handleWindowScroll);
        }
        prepare() {
          this.nodes.wrapper = this.make("div", this.CSS.tooltip), this.nodes.content = this.make("div", this.CSS.tooltipContent), this.append(this.nodes.wrapper, this.nodes.content), this.append(document.body, this.nodes.wrapper);
        }
        loadStyles() {
          const a = "codex-tooltips-style";
          if (document.getElementById(a))
            return;
          const l = r(2), c = this.make("style", null, { textContent: l.toString(), id: a });
          this.prepend(document.head, c);
        }
        placeBottom(a, l) {
          const c = a.getBoundingClientRect(), d = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, u = c.bottom + window.pageYOffset + this.offsetTop + l.marginTop;
          this.applyPlacement("bottom", d, u);
        }
        placeTop(a, l) {
          const c = a.getBoundingClientRect(), d = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, u = c.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
          this.applyPlacement("top", d, u);
        }
        placeLeft(a, l) {
          const c = a.getBoundingClientRect(), d = c.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - l.marginLeft, u = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("left", d, u);
        }
        placeRight(a, l) {
          const c = a.getBoundingClientRect(), d = c.right + this.offsetRight + l.marginRight, u = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("right", d, u);
        }
        applyPlacement(a, l, c) {
          this.nodes.wrapper.classList.add(this.CSS.placement[a]), this.nodes.wrapper.style.left = l + "px", this.nodes.wrapper.style.top = c + "px";
        }
        make(a, l = null, c = {}) {
          const d = document.createElement(a);
          Array.isArray(l) ? d.classList.add(...l) : l && d.classList.add(l);
          for (const u in c)
            c.hasOwnProperty(u) && (d[u] = c[u]);
          return d;
        }
        append(a, l) {
          Array.isArray(l) ? l.forEach((c) => a.appendChild(c)) : a.appendChild(l);
        }
        prepend(a, l) {
          Array.isArray(l) ? (l = l.reverse()).forEach((c) => a.prepend(c)) : a.prepend(l);
        }
      }
    }, function(t, n) {
      t.exports = `.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}`;
    }]).default;
  });
})(Di);
var Rl = Di.exports;
const $l = /* @__PURE__ */ Mt(Rl);
let te = null;
function Bo() {
  te || (te = new $l());
}
function Hl(o, e, t) {
  Bo(), te?.show(o, e, t);
}
function Et(o = !1) {
  Bo(), te?.hide(o);
}
function Ct(o, e, t) {
  Bo(), te?.onHover(o, e, t);
}
function Fl() {
  te?.destroy(), te = null;
}
class Ul extends O {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    });
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e, t, n) => this.show(e, t, n),
      hide: () => this.hide(),
      onHover: (e, t, n) => this.onHover(e, t, n)
    };
  }
  /**
   * Method show tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  show(e, t, n) {
    Hl(e, t, n);
  }
  /**
   * Method hides tooltip on HTML page
   */
  hide() {
    Et();
  }
  /**
   * Decorator for showing Tooltip by mouseenter/mouseleave
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  onHover(e, t, n) {
    Ct(e, t, n);
  }
}
class zl extends O {
  /**
   * Available methods / getters
   */
  get methods() {
    return {
      nodes: this.editorNodes
      /**
       * There can be added some UI methods, like toggleThinMode() etc
       */
    };
  }
  /**
   * Exported classes
   */
  get editorNodes() {
    return {
      /**
       * Top-level editor instance wrapper
       */
      wrapper: this.Editor.UI.nodes.wrapper,
      /**
       * Element that holds all the Blocks
       */
      redactor: this.Editor.UI.nodes.redactor
    };
  }
}
function Ri(o, e) {
  const t = {};
  return Object.entries(o).forEach(([n, r]) => {
    if (z(r)) {
      const i = e ? `${e}.${n}` : n;
      Object.values(r).every((s) => ge(s)) ? t[n] = i : t[n] = Ri(r, i);
      return;
    }
    t[n] = r;
  }), t;
}
const Q = Ri(Ti);
function Wl(o, e) {
  const t = {};
  return Object.keys(o).forEach((n) => {
    const r = e[n];
    r !== void 0 ? t[r] = o[n] : t[n] = o[n];
  }), t;
}
const $i = class Ye {
  /**
   * @param {HTMLElement[]} nodeList — the list of iterable HTML-items
   * @param {string} focusedCssClass - user-provided CSS-class that will be set in flipping process
   */
  constructor(e, t) {
    this.cursor = -1, this.items = [], this.items = e || [], this.focusedCssClass = t;
  }
  /**
   * Returns Focused button Node
   *
   * @returns {HTMLElement}
   */
  get currentItem() {
    return this.cursor === -1 ? null : this.items[this.cursor];
  }
  /**
   * Sets cursor to specified position
   *
   * @param cursorPosition - new cursor position
   */
  setCursor(e) {
    e < this.items.length && e >= -1 && (this.dropCursor(), this.cursor = e, this.items[this.cursor].classList.add(this.focusedCssClass));
  }
  /**
   * Sets items. Can be used when iterable items changed dynamically
   *
   * @param {HTMLElement[]} nodeList - nodes to iterate
   */
  setItems(e) {
    this.items = e;
  }
  /**
   * Sets cursor next to the current
   */
  next() {
    this.cursor = this.leafNodesAndReturnIndex(Ye.directions.RIGHT);
  }
  /**
   * Sets cursor before current
   */
  previous() {
    this.cursor = this.leafNodesAndReturnIndex(Ye.directions.LEFT);
  }
  /**
   * Sets cursor to the default position and removes CSS-class from previously focused item
   */
  dropCursor() {
    this.cursor !== -1 && (this.items[this.cursor].classList.remove(this.focusedCssClass), this.cursor = -1);
  }
  /**
   * Leafs nodes inside the target list from active element
   *
   * @param {string} direction - leaf direction. Can be 'left' or 'right'
   * @returns {number} index of focused node
   */
  leafNodesAndReturnIndex(e) {
    if (this.items.length === 0)
      return this.cursor;
    let t = this.cursor;
    return t === -1 ? t = e === Ye.directions.RIGHT ? -1 : 0 : this.items[t].classList.remove(this.focusedCssClass), e === Ye.directions.RIGHT ? t = (t + 1) % this.items.length : t = (this.items.length + t - 1) % this.items.length, f.canSetCaret(this.items[t]) && kt(() => C.setCursor(this.items[t]), 50)(), this.items[t].classList.add(this.focusedCssClass), t;
  }
};
$i.directions = {
  RIGHT: "right",
  LEFT: "left"
};
let ze = $i, Tt = class vo {
  /**
   * @param options - different constructing settings
   */
  constructor(e) {
    this.iterator = null, this.activated = !1, this.flipCallbacks = [], this.onKeyDown = (t) => {
      if (!(!this.isEventReadyForHandling(t) || t.shiftKey === !0))
        switch (vo.usedKeys.includes(t.keyCode) && t.preventDefault(), t.keyCode) {
          case S.TAB:
            this.handleTabPress(t);
            break;
          case S.LEFT:
          case S.UP:
            this.flipLeft();
            break;
          case S.RIGHT:
          case S.DOWN:
            this.flipRight();
            break;
          case S.ENTER:
            this.handleEnterPress(t);
            break;
        }
    }, this.iterator = new ze(e.items, e.focusedItemClass), this.activateCallback = e.activateCallback, this.allowedKeys = e.allowedKeys || vo.usedKeys;
  }
  /**
   * True if flipper is currently activated
   */
  get isActivated() {
    return this.activated;
  }
  /**
   * Array of keys (codes) that is handled by Flipper
   * Used to:
   *  - preventDefault only for this keys, not all keydowns (@see constructor)
   *  - to skip external behaviours only for these keys, when filler is activated (@see BlockEvents@arrowRightAndDown)
   */
  static get usedKeys() {
    return [
      S.TAB,
      S.LEFT,
      S.RIGHT,
      S.ENTER,
      S.UP,
      S.DOWN
    ];
  }
  /**
   * Active tab/arrows handling by flipper
   *
   * @param items - Some modules (like, InlineToolbar, BlockSettings) might refresh buttons dynamically
   * @param cursorPosition - index of the item that should be focused once flipper is activated
   */
  activate(e, t) {
    this.activated = !0, e && this.iterator.setItems(e), t !== void 0 && this.iterator.setCursor(t), pe().addEventListener("keydown", this.onKeyDown, !0);
  }
  /**
   * Disable tab/arrows handling by flipper
   */
  deactivate() {
    this.activated = !1, this.dropCursor(), pe().removeEventListener("keydown", this.onKeyDown);
  }
  /**
   * Focus first item
   */
  focusFirst() {
    this.dropCursor(), this.flipRight();
  }
  /**
   * Focuses previous flipper iterator item
   */
  flipLeft() {
    this.iterator.previous(), this.flipCallback();
  }
  /**
   * Focuses next flipper iterator item
   */
  flipRight() {
    this.iterator.next(), this.flipCallback();
  }
  /**
   * Return true if some button is focused
   */
  hasFocus() {
    return !!this.iterator.currentItem;
  }
  /**
   * Registeres function that should be executed on each navigation action
   *
   * @param cb - function to execute
   */
  onFlip(e) {
    this.flipCallbacks.push(e);
  }
  /**
   * Unregisteres function that is executed on each navigation action
   *
   * @param cb - function to stop executing
   */
  removeOnFlip(e) {
    this.flipCallbacks = this.flipCallbacks.filter((t) => t !== e);
  }
  /**
   * Drops flipper's iterator cursor
   *
   * @see DomIterator#dropCursor
   */
  dropCursor() {
    this.iterator.dropCursor();
  }
  /**
   * This function is fired before handling flipper keycodes
   * The result of this function defines if it is need to be handled or not
   *
   * @param {KeyboardEvent} event - keydown keyboard event
   * @returns {boolean}
   */
  isEventReadyForHandling(e) {
    return this.activated && this.allowedKeys.includes(e.keyCode);
  }
  /**
   * When flipper is activated tab press will leaf the items
   *
   * @param {KeyboardEvent} event - tab keydown event
   */
  handleTabPress(e) {
    switch (e.shiftKey ? ze.directions.LEFT : ze.directions.RIGHT) {
      case ze.directions.RIGHT:
        this.flipRight();
        break;
      case ze.directions.LEFT:
        this.flipLeft();
        break;
    }
  }
  /**
   * Enter press will click current item if flipper is activated
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  handleEnterPress(e) {
    this.activated && (this.iterator.currentItem && (e.stopPropagation(), e.preventDefault(), this.iterator.currentItem.click()), D(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
  }
  /**
   * Fired after flipping in any direction
   */
  flipCallback() {
    this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach((e) => e());
  }
};
const Kl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>', ql = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>', Yl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.5 17.5L9.64142 12.6414C9.56331 12.5633 9.56331 12.4367 9.64142 12.3586L14.5 7.5"/></svg>', Vl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9.58284 17.5L14.4414 12.6414C14.5195 12.5633 14.5195 12.4367 14.4414 12.3586L9.58284 7.5"/></svg>', Xl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>', Gl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>', Zl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>', Ql = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>', ei = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>', Jl = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>', ec = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>', Hi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M11.5 17.5L5 11M5 11V15.5M5 11H9.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12.5 6.5L19 13M19 13V8.5M19 13H14.5"/></svg>', tc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', oc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', nc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><line x1="12" x2="12" y1="9" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 15.02V15.01"/></svg>', rc = "__", ic = "--";
function Ee(o) {
  return (e, t) => [[o, e].filter((n) => !!n).join(rc), t].filter((n) => !!n).join(ic);
}
const We = Ee("ce-hint"), Ke = {
  root: We(),
  alignedStart: We(null, "align-left"),
  alignedCenter: We(null, "align-center"),
  title: We("title"),
  description: We("description")
};
class sc {
  /**
   * Constructs the hint content instance
   *
   * @param params - hint content parameters
   */
  constructor(e) {
    this.nodes = {
      root: f.make("div", [Ke.root, e.alignment === "center" ? Ke.alignedCenter : Ke.alignedStart]),
      title: f.make("div", Ke.title, { textContent: e.title })
    }, this.nodes.root.appendChild(this.nodes.title), e.description !== void 0 && (this.nodes.description = f.make("div", Ke.description, { textContent: e.description }), this.nodes.root.appendChild(this.nodes.description));
  }
  /**
   * Returns the root element of the hint content
   */
  getElement() {
    return this.nodes.root;
  }
}
let Oo = class {
  /**
   * Constructs the instance
   *
   * @param params - instance parameters
   */
  constructor(e) {
    this.params = e;
  }
  /**
   * Item name if exists
   */
  get name() {
    if (this.params !== void 0 && "name" in this.params)
      return this.params.name;
  }
  /**
   * Destroys the instance
   */
  destroy() {
    Et();
  }
  /**
   * Called when children popover is opened (if exists)
   */
  onChildrenOpen() {
    var e;
    this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onOpen) == "function" && this.params.children.onOpen();
  }
  /**
   * Called when children popover is closed (if exists)
   */
  onChildrenClose() {
    var e;
    this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onClose) == "function" && this.params.children.onClose();
  }
  /**
   * Called on popover item click
   */
  handleClick() {
    var e, t;
    this.params !== void 0 && "onActivate" in this.params && ((t = (e = this.params).onActivate) == null || t.call(e, this.params));
  }
  /**
   * Adds hint to the item element if hint data is provided
   *
   * @param itemElement - popover item root element to add hint to
   * @param hintData - hint data
   */
  addHint(e, t) {
    const n = new sc(t);
    Ct(e, n.getElement(), {
      placement: t.position,
      hidingDelay: 100
    });
  }
  /**
   * Returns item children that are represented as popover items
   */
  get children() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.items) !== void 0 ? this.params.children.items : [];
  }
  /**
   * Returns true if item has any type of children
   */
  get hasChildren() {
    return this.children.length > 0;
  }
  /**
   * Returns true if item children should be open instantly after popover is opened and not on item click/hover
   */
  get isChildrenOpen() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.isOpen) === !0;
  }
  /**
   * True if item children items should be navigatable via keyboard
   */
  get isChildrenFlippable() {
    var e;
    return !(this.params === void 0 || !("children" in this.params) || ((e = this.params.children) == null ? void 0 : e.isFlippable) === !1);
  }
  /**
   * Returns true if item has children that should be searchable
   */
  get isChildrenSearchable() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.searchable) === !0;
  }
  /**
   * True if popover should close once item is activated
   */
  get closeOnActivate() {
    return this.params !== void 0 && "closeOnActivate" in this.params && this.params.closeOnActivate;
  }
  /**
   * True if item is active
   */
  get isActive() {
    return this.params === void 0 || !("isActive" in this.params) ? !1 : typeof this.params.isActive == "function" ? this.params.isActive() : this.params.isActive === !0;
  }
};
const Z = Ee("ce-popover-item"), R = {
  container: Z(),
  active: Z(null, "active"),
  disabled: Z(null, "disabled"),
  focused: Z(null, "focused"),
  hidden: Z(null, "hidden"),
  confirmationState: Z(null, "confirmation"),
  noHover: Z(null, "no-hover"),
  noFocus: Z(null, "no-focus"),
  title: Z("title"),
  secondaryTitle: Z("secondary-title"),
  icon: Z("icon"),
  iconTool: Z("icon", "tool"),
  iconChevronRight: Z("icon", "chevron-right"),
  wobbleAnimation: Ee("wobble")()
};
let Se = class extends Oo {
  /**
   * Constructs popover item instance
   *
   * @param params - popover item construction params
   * @param renderParams - popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    super(e), this.params = e, this.nodes = {
      root: null,
      icon: null
    }, this.confirmationState = null, this.removeSpecialFocusBehavior = () => {
      var n;
      (n = this.nodes.root) == null || n.classList.remove(R.noFocus);
    }, this.removeSpecialHoverBehavior = () => {
      var n;
      (n = this.nodes.root) == null || n.classList.remove(R.noHover);
    }, this.onErrorAnimationEnd = () => {
      var n, r;
      (n = this.nodes.icon) == null || n.classList.remove(R.wobbleAnimation), (r = this.nodes.icon) == null || r.removeEventListener("animationend", this.onErrorAnimationEnd);
    }, this.nodes.root = this.make(e, t);
  }
  /**
   * True if item is disabled and hence not clickable
   */
  get isDisabled() {
    return this.params.isDisabled === !0;
  }
  /**
   * Exposes popover item toggle parameter
   */
  get toggle() {
    return this.params.toggle;
  }
  /**
   * Item title
   */
  get title() {
    return this.params.title;
  }
  /**
   * True if confirmation state is enabled for popover item
   */
  get isConfirmationStateEnabled() {
    return this.confirmationState !== null;
  }
  /**
   * True if item is focused in keyboard navigation process
   */
  get isFocused() {
    return this.nodes.root === null ? !1 : this.nodes.root.classList.contains(R.focused);
  }
  /**
   * Returns popover item root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Called on popover item click
   */
  handleClick() {
    if (this.isConfirmationStateEnabled && this.confirmationState !== null) {
      this.activateOrEnableConfirmationMode(this.confirmationState);
      return;
    }
    this.activateOrEnableConfirmationMode(this.params);
  }
  /**
   * Toggles item active state
   *
   * @param isActive - true if item should strictly should become active
   */
  toggleActive(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(R.active, e);
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(R.hidden, e);
  }
  /**
   * Resets popover item to its original state
   */
  reset() {
    this.isConfirmationStateEnabled && this.disableConfirmationMode();
  }
  /**
   * Method called once item becomes focused during keyboard navigation
   */
  onFocus() {
    this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Constructs HTML element corresponding to popover item params
   *
   * @param params - item construction params
   * @param renderParams - popover item render params
   */
  make(e, t) {
    var n, r;
    const i = t?.wrapperTag || "div", s = f.make(i, R.container, {
      type: i === "button" ? "button" : void 0
    });
    return e.name && (s.dataset.itemName = e.name), this.nodes.icon = f.make("div", [R.icon, R.iconTool], {
      innerHTML: e.icon || Zl
    }), s.appendChild(this.nodes.icon), e.title !== void 0 && s.appendChild(f.make("div", R.title, {
      innerHTML: e.title || ""
    })), e.secondaryLabel && s.appendChild(f.make("div", R.secondaryTitle, {
      textContent: e.secondaryLabel
    })), this.hasChildren && s.appendChild(f.make("div", [R.icon, R.iconChevronRight], {
      innerHTML: Vl
    })), this.isActive && s.classList.add(R.active), e.isDisabled && s.classList.add(R.disabled), e.hint !== void 0 && ((n = t?.hint) == null ? void 0 : n.enabled) !== !1 && this.addHint(s, {
      ...e.hint,
      position: ((r = t?.hint) == null ? void 0 : r.position) || "right"
    }), s;
  }
  /**
   * Activates confirmation mode for the item.
   *
   * @param newState - new popover item params that should be applied
   */
  enableConfirmationMode(e) {
    if (this.nodes.root === null)
      return;
    const t = {
      ...this.params,
      ...e,
      confirmation: "confirmation" in e ? e.confirmation : void 0
    }, n = this.make(t);
    this.nodes.root.innerHTML = n.innerHTML, this.nodes.root.classList.add(R.confirmationState), this.confirmationState = e, this.enableSpecialHoverAndFocusBehavior();
  }
  /**
   * Returns item to its original state
   */
  disableConfirmationMode() {
    if (this.nodes.root === null)
      return;
    const e = this.make(this.params);
    this.nodes.root.innerHTML = e.innerHTML, this.nodes.root.classList.remove(R.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Enables special focus and hover behavior for item in confirmation state.
   * This is needed to prevent item from being highlighted as hovered/focused just after click.
   */
  enableSpecialHoverAndFocusBehavior() {
    var e, t, n;
    (e = this.nodes.root) == null || e.classList.add(R.noHover), (t = this.nodes.root) == null || t.classList.add(R.noFocus), (n = this.nodes.root) == null || n.addEventListener("mouseleave", this.removeSpecialHoverBehavior, { once: !0 });
  }
  /**
   * Disables special focus and hover behavior
   */
  disableSpecialHoverAndFocusBehavior() {
    var e;
    this.removeSpecialFocusBehavior(), this.removeSpecialHoverBehavior(), (e = this.nodes.root) == null || e.removeEventListener("mouseleave", this.removeSpecialHoverBehavior);
  }
  /**
   * Executes item's onActivate callback if the item has no confirmation configured
   *
   * @param item - item to activate or bring to confirmation mode
   */
  activateOrEnableConfirmationMode(e) {
    var t;
    if (!("confirmation" in e) || e.confirmation === void 0)
      try {
        (t = e.onActivate) == null || t.call(e, e), this.disableConfirmationMode();
      } catch {
        this.animateError();
      }
    else
      this.enableConfirmationMode(e.confirmation);
  }
  /**
   * Animates item which symbolizes that error occured while executing 'onActivate()' callback
   */
  animateError() {
    var e, t, n;
    (e = this.nodes.icon) != null && e.classList.contains(R.wobbleAnimation) || ((t = this.nodes.icon) == null || t.classList.add(R.wobbleAnimation), (n = this.nodes.icon) == null || n.addEventListener("animationend", this.onErrorAnimationEnd));
  }
};
const Jt = Ee("ce-popover-item-separator"), eo = {
  container: Jt(),
  line: Jt("line"),
  hidden: Jt(null, "hidden")
};
let Fi = class extends Oo {
  /**
   * Constructs the instance
   */
  constructor() {
    super(), this.nodes = {
      root: f.make("div", eo.container),
      line: f.make("div", eo.line)
    }, this.nodes.root.appendChild(this.nodes.line);
  }
  /**
   * Returns popover separator root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(eo.hidden, e);
  }
};
var ae = /* @__PURE__ */ ((o) => (o.Closed = "closed", o.ClosedOnActivate = "closed-on-activate", o))(ae || {});
const K = Ee("ce-popover"), $ = {
  popover: K(),
  popoverContainer: K("container"),
  popoverOpenTop: K(null, "open-top"),
  popoverOpenLeft: K(null, "open-left"),
  popoverOpened: K(null, "opened"),
  search: K("search"),
  nothingFoundMessage: K("nothing-found-message"),
  nothingFoundMessageDisplayed: K("nothing-found-message", "displayed"),
  items: K("items"),
  overlay: K("overlay"),
  overlayHidden: K("overlay", "hidden"),
  popoverNested: K(null, "nested"),
  getPopoverNestedClass: (o) => K(null, `nested-level-${o.toString()}`),
  popoverInline: K(null, "inline"),
  popoverHeader: K("header")
};
var Re = /* @__PURE__ */ ((o) => (o.NestingLevel = "--nesting-level", o.PopoverHeight = "--popover-height", o.InlinePopoverWidth = "--inline-popover-width", o.TriggerItemLeft = "--trigger-item-left", o.TriggerItemTop = "--trigger-item-top", o))(Re || {});
const ti = Ee("ce-popover-item-html"), oi = {
  root: ti(),
  hidden: ti(null, "hidden")
};
let Qe = class extends Oo {
  /**
   * Constructs the instance
   *
   * @param params – instance parameters
   * @param renderParams – popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    var n, r;
    super(e), this.nodes = {
      root: f.make("div", oi.root)
    }, this.nodes.root.appendChild(e.element), e.name && (this.nodes.root.dataset.itemName = e.name), e.hint !== void 0 && ((n = t?.hint) == null ? void 0 : n.enabled) !== !1 && this.addHint(this.nodes.root, {
      ...e.hint,
      position: ((r = t?.hint) == null ? void 0 : r.position) || "right"
    });
  }
  /**
   * Returns popover item root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(oi.hidden, e);
  }
  /**
   * Returns list of buttons and inputs inside custom content
   */
  getControls() {
    const e = this.nodes.root.querySelectorAll(
      `button, ${f.allInputsSelector}`
    );
    return Array.from(e);
  }
}, Ui = class extends et {
  /**
   * Constructs the instance
   *
   * @param params - popover construction params
   * @param itemsRenderParams - popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t = {}) {
    super(), this.params = e, this.itemsRenderParams = t, this.listeners = new tt(), this.messages = {
      nothingFound: "Nothing found",
      search: "Search"
    }, this.items = this.buildItems(e.items), e.messages && (this.messages = {
      ...this.messages,
      ...e.messages
    }), this.nodes = {}, this.nodes.popoverContainer = f.make("div", [$.popoverContainer]), this.nodes.nothingFoundMessage = f.make("div", [$.nothingFoundMessage], {
      textContent: this.messages.nothingFound
    }), this.nodes.popoverContainer.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = f.make("div", [$.items]), this.items.forEach((n) => {
      const r = n.getElement();
      r !== null && this.nodes.items.appendChild(r);
    }), this.nodes.popoverContainer.appendChild(this.nodes.items), this.listeners.on(this.nodes.popoverContainer, "click", (n) => this.handleClick(n)), this.nodes.popover = f.make("div", [
      $.popover,
      this.params.class
    ]), this.nodes.popover.appendChild(this.nodes.popoverContainer);
  }
  /**
   * List of default popover items that are searchable and may have confirmation state
   */
  get itemsDefault() {
    return this.items.filter((e) => e instanceof Se);
  }
  /**
   * Returns HTML element corresponding to the popover
   */
  getElement() {
    return this.nodes.popover;
  }
  /**
   * Open popover
   */
  show() {
    this.nodes.popover.classList.add($.popoverOpened), this.search !== void 0 && this.search.focus();
  }
  /**
   * Closes popover
   */
  hide() {
    this.nodes.popover.classList.remove($.popoverOpened), this.nodes.popover.classList.remove($.popoverOpenTop), this.itemsDefault.forEach((e) => e.reset()), this.search !== void 0 && this.search.clear(), this.emit(ae.Closed);
  }
  /**
   * Clears memory
   */
  destroy() {
    var e;
    this.items.forEach((t) => t.destroy()), this.nodes.popover.remove(), this.listeners.removeAll(), (e = this.search) == null || e.destroy();
  }
  /**
   * Looks for the item by name and imitates click on it
   *
   * @param name - name of the item to activate
   */
  activateItemByName(e) {
    const t = this.items.find((n) => n.name === e);
    this.handleItemClick(t);
  }
  /**
   * Factory method for creating popover items
   *
   * @param items - list of items params
   */
  buildItems(e) {
    return e.map((t) => {
      switch (t.type) {
        case j.Separator:
          return new Fi();
        case j.Html:
          return new Qe(t, this.itemsRenderParams[j.Html]);
        default:
          return new Se(t, this.itemsRenderParams[j.Default]);
      }
    });
  }
  /**
   * Retrieves popover item that is the target of the specified event
   *
   * @param event - event to retrieve popover item from
   */
  getTargetItem(e) {
    return this.items.filter((t) => t instanceof Se || t instanceof Qe).find((t) => {
      const n = t.getElement();
      return n === null ? !1 : e.composedPath().includes(n);
    });
  }
  /**
   * Handles popover item click
   *
   * @param item - item to handle click of
   */
  handleItemClick(e) {
    if (!("isDisabled" in e && e.isDisabled)) {
      if (e.hasChildren) {
        this.showNestedItems(e), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick();
        return;
      }
      this.itemsDefault.filter((t) => t !== e).forEach((t) => t.reset()), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick(), this.toggleItemActivenessIfNeeded(e), e.closeOnActivate && (this.hide(), this.emit(ae.ClosedOnActivate));
    }
  }
  /**
   * Handles clicks inside popover
   *
   * @param event - item to handle click of
   */
  handleClick(e) {
    const t = this.getTargetItem(e);
    t !== void 0 && this.handleItemClick(t);
  }
  /**
   * - Toggles item active state, if clicked popover item has property 'toggle' set to true.
   *
   * - Performs radiobutton-like behavior if the item has property 'toggle' set to string key.
   * (All the other items with the same key get inactive, and the item gets active)
   *
   * @param clickedItem - popover item that was clicked
   */
  toggleItemActivenessIfNeeded(e) {
    if (e instanceof Se && (e.toggle === !0 && e.toggleActive(), typeof e.toggle == "string")) {
      const t = this.itemsDefault.filter((n) => n.toggle === e.toggle);
      if (t.length === 1) {
        e.toggleActive();
        return;
      }
      t.forEach((n) => {
        n.toggleActive(n === e);
      });
    }
  }
};
var St = /* @__PURE__ */ ((o) => (o.Search = "search", o))(St || {});
const to = Ee("cdx-search-field"), oo = {
  wrapper: to(),
  icon: to("icon"),
  input: to("input")
};
class ac extends et {
  /**
   * @param options - available config
   * @param options.items - searchable items list
   * @param options.placeholder - input placeholder
   */
  constructor({ items: e, placeholder: t }) {
    super(), this.listeners = new tt(), this.items = e, this.wrapper = f.make("div", oo.wrapper);
    const n = f.make("div", oo.icon, {
      innerHTML: tc
    });
    this.input = f.make("input", oo.input, {
      placeholder: t,
      /**
       * Used to prevent focusing on the input by Tab key
       * (Popover in the Toolbar lays below the blocks,
       * so Tab in the last block will focus this hidden input if this property is not set)
       */
      tabIndex: -1
    }), this.wrapper.appendChild(n), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", () => {
      this.searchQuery = this.input.value, this.emit(St.Search, {
        query: this.searchQuery,
        items: this.foundItems
      });
    });
  }
  /**
   * Returns search field element
   */
  getElement() {
    return this.wrapper;
  }
  /**
   * Sets focus to the input
   */
  focus() {
    this.input.focus();
  }
  /**
   * Clears search query and results
   */
  clear() {
    this.input.value = "", this.searchQuery = "", this.emit(St.Search, {
      query: "",
      items: this.foundItems
    });
  }
  /**
   * Clears memory
   */
  destroy() {
    this.listeners.removeAll();
  }
  /**
   * Returns list of found items for the current search query
   */
  get foundItems() {
    return this.items.filter((e) => this.checkItem(e));
  }
  /**
   * Contains logic for checking whether passed item conforms the search query
   *
   * @param item - item to be checked
   */
  checkItem(e) {
    var t, n;
    const r = ((t = e.title) == null ? void 0 : t.toLowerCase()) || "", i = (n = this.searchQuery) == null ? void 0 : n.toLowerCase();
    return i !== void 0 ? r.includes(i) : !1;
  }
}
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, dc = (o, e, t, n) => {
  for (var r = cc(e, t), i = o.length - 1, s; i >= 0; i--)
    (s = o[i]) && (r = s(e, t, r) || r);
  return r && lc(e, t, r), r;
};
const zi = class Wi extends Ui {
  /**
   * Construct the instance
   *
   * @param params - popover params
   * @param itemsRenderParams – popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    super(e, t), this.nestingLevel = 0, this.nestedPopoverTriggerItem = null, this.previouslyHoveredItem = null, this.scopeElement = document.body, this.hide = () => {
      var n;
      super.hide(), this.destroyNestedPopoverIfExists(), (n = this.flipper) == null || n.deactivate(), this.previouslyHoveredItem = null;
    }, this.onFlip = () => {
      const n = this.itemsDefault.find((r) => r.isFocused);
      n?.onFocus();
    }, this.onSearch = (n) => {
      var r;
      const i = n.query === "", s = n.items.length === 0;
      this.items.forEach((l) => {
        let c = !1;
        l instanceof Se ? c = !n.items.includes(l) : (l instanceof Fi || l instanceof Qe) && (c = s || !i), l.toggleHidden(c);
      }), this.toggleNothingFoundMessage(s);
      const a = n.query === "" ? this.flippableElements : n.items.map((l) => l.getElement());
      (r = this.flipper) != null && r.isActivated && (this.flipper.deactivate(), this.flipper.activate(a));
    }, e.nestingLevel !== void 0 && (this.nestingLevel = e.nestingLevel), this.nestingLevel > 0 && this.nodes.popover.classList.add($.popoverNested), e.scopeElement !== void 0 && (this.scopeElement = e.scopeElement), this.nodes.popoverContainer !== null && this.listeners.on(this.nodes.popoverContainer, "mouseover", (n) => this.handleHover(n)), e.searchable && this.addSearch(), e.flippable !== !1 && (this.flipper = new Tt({
      items: this.flippableElements,
      focusedItemClass: R.focused,
      allowedKeys: [
        S.TAB,
        S.UP,
        S.DOWN,
        S.ENTER
      ]
    }), this.flipper.onFlip(this.onFlip));
  }
  /**
   * Returns true if some item inside popover is focused
   */
  hasFocus() {
    return this.flipper === void 0 ? !1 : this.flipper.hasFocus();
  }
  /**
   * Scroll position inside items container of the popover
   */
  get scrollTop() {
    return this.nodes.items === null ? 0 : this.nodes.items.scrollTop;
  }
  /**
   * Returns visible element offset top
   */
  get offsetTop() {
    return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetTop;
  }
  /**
   * Open popover
   */
  show() {
    var e;
    this.nodes.popover.style.setProperty(Re.PopoverHeight, this.size.height + "px"), this.shouldOpenBottom || this.nodes.popover.classList.add($.popoverOpenTop), this.shouldOpenRight || this.nodes.popover.classList.add($.popoverOpenLeft), super.show(), (e = this.flipper) == null || e.activate(this.flippableElements);
  }
  /**
   * Clears memory
   */
  destroy() {
    this.hide(), super.destroy();
  }
  /**
   * Handles displaying nested items for the item.
   *
   * @param item – item to show nested popover for
   */
  showNestedItems(e) {
    this.nestedPopover !== null && this.nestedPopover !== void 0 || (this.nestedPopoverTriggerItem = e, this.showNestedPopoverForItem(e));
  }
  /**
   * Handles hover events inside popover items container
   *
   * @param event - hover event data
   */
  handleHover(e) {
    const t = this.getTargetItem(e);
    t !== void 0 && this.previouslyHoveredItem !== t && (this.destroyNestedPopoverIfExists(), this.previouslyHoveredItem = t, t.hasChildren && this.showNestedPopoverForItem(t));
  }
  /**
   * Sets CSS variable with position of item near which nested popover should be displayed.
   * Is used for correct positioning of the nested popover
   *
   * @param nestedPopoverEl - nested popover element
   * @param item – item near which nested popover should be displayed
   */
  setTriggerItemPosition(e, t) {
    const n = t.getElement(), r = (n ? n.offsetTop : 0) - this.scrollTop, i = this.offsetTop + r;
    e.style.setProperty(Re.TriggerItemTop, i + "px");
  }
  /**
   * Destroys existing nested popover
   */
  destroyNestedPopoverIfExists() {
    var e, t;
    this.nestedPopover === void 0 || this.nestedPopover === null || (this.nestedPopover.off(ae.ClosedOnActivate, this.hide), this.nestedPopover.hide(), this.nestedPopover.destroy(), this.nestedPopover.getElement().remove(), this.nestedPopover = null, (e = this.flipper) == null || e.activate(this.flippableElements), (t = this.nestedPopoverTriggerItem) == null || t.onChildrenClose());
  }
  /**
   * Creates and displays nested popover for specified item.
   * Is used only on desktop
   *
   * @param item - item to display nested popover by
   */
  showNestedPopoverForItem(e) {
    var t;
    this.nestedPopover = new Wi({
      searchable: e.isChildrenSearchable,
      items: e.children,
      nestingLevel: this.nestingLevel + 1,
      flippable: e.isChildrenFlippable,
      messages: this.messages
    }), e.onChildrenOpen(), this.nestedPopover.on(ae.ClosedOnActivate, this.hide);
    const n = this.nestedPopover.getElement();
    return this.nodes.popover.appendChild(n), this.setTriggerItemPosition(n, e), n.style.setProperty(Re.NestingLevel, this.nestedPopover.nestingLevel.toString()), this.nestedPopover.show(), (t = this.flipper) == null || t.deactivate(), this.nestedPopover;
  }
  /**
   * Checks if popover should be opened bottom.
   * It should happen when there is enough space below or not enough space above
   */
  get shouldOpenBottom() {
    if (this.nodes.popover === void 0 || this.nodes.popover === null)
      return !1;
    const e = this.nodes.popoverContainer.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), n = this.size.height, r = e.top + n, i = e.top - n, s = Math.min(window.innerHeight, t.bottom);
    return i < t.top || r <= s;
  }
  /**
   * Checks if popover should be opened left.
   * It should happen when there is enough space in the right or not enough space in the left
   */
  get shouldOpenRight() {
    if (this.nodes.popover === void 0 || this.nodes.popover === null)
      return !1;
    const e = this.nodes.popover.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), n = this.size.width, r = e.right + n, i = e.left - n, s = Math.min(window.innerWidth, t.right);
    return i < t.left || r <= s;
  }
  get size() {
    var e;
    const t = {
      height: 0,
      width: 0
    };
    if (this.nodes.popover === null)
      return t;
    const n = this.nodes.popover.cloneNode(!0);
    n.style.visibility = "hidden", n.style.position = "absolute", n.style.top = "-1000px", n.classList.add($.popoverOpened), (e = n.querySelector("." + $.popoverNested)) == null || e.remove(), (Wa() || document.body).appendChild(n);
    const r = n.querySelector("." + $.popoverContainer);
    return t.height = r.offsetHeight, t.width = r.offsetWidth, n.remove(), t;
  }
  /**
   * Returns list of elements available for keyboard navigation.
   */
  get flippableElements() {
    return this.items.map((e) => {
      if (e instanceof Se)
        return e.getElement();
      if (e instanceof Qe)
        return e.getControls();
    }).flat().filter((e) => e != null);
  }
  /**
   * Adds search to the popover
   */
  addSearch() {
    this.search = new ac({
      items: this.itemsDefault,
      placeholder: this.messages.search
    }), this.search.on(St.Search, this.onSearch);
    const e = this.search.getElement();
    e.classList.add($.search), this.nodes.popoverContainer.insertBefore(e, this.nodes.popoverContainer.firstChild);
  }
  /**
   * Toggles nothing found message visibility
   *
   * @param isDisplayed - true if the message should be displayed
   */
  toggleNothingFoundMessage(e) {
    this.nodes.nothingFoundMessage.classList.toggle($.nothingFoundMessageDisplayed, e);
  }
};
dc([
  He
], zi.prototype, "size");
let Io = zi;
class uc extends Io {
  /**
   * Constructs the instance
   *
   * @param params - instance parameters
   */
  constructor(e) {
    const t = !Fe();
    super(
      {
        ...e,
        class: $.popoverInline
      },
      {
        [j.Default]: {
          /**
           * We use button instead of div here to fix bug associated with focus loss (which leads to selection change) on click in safari
           *
           * @todo figure out better way to solve the issue
           */
          wrapperTag: "button",
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        },
        [j.Html]: {
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        }
      }
    ), this.items.forEach((n) => {
      !(n instanceof Se) && !(n instanceof Qe) || n.hasChildren && n.isChildrenOpen && this.showNestedItems(n);
    });
  }
  /**
   * Returns visible element offset top
   */
  get offsetLeft() {
    return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetLeft;
  }
  /**
   * Open popover
   */
  show() {
    this.nestingLevel === 0 && this.nodes.popover.style.setProperty(
      Re.InlinePopoverWidth,
      this.size.width + "px"
    ), super.show();
  }
  /**
   * Disable hover event handling.
   * Overrides parent's class behavior
   */
  handleHover() {
  }
  /**
   * Sets CSS variable with position of item near which nested popover should be displayed.
   * Is used to position nested popover right below clicked item
   *
   * @param nestedPopoverEl - nested popover element
   * @param item – item near which nested popover should be displayed
   */
  setTriggerItemPosition(e, t) {
    const n = t.getElement(), r = n ? n.offsetLeft : 0, i = this.offsetLeft + r;
    e.style.setProperty(
      Re.TriggerItemLeft,
      i + "px"
    );
  }
  /**
   * Handles displaying nested items for the item.
   * Overriding in order to add toggling behaviour
   *
   * @param item – item to toggle nested popover for
   */
  showNestedItems(e) {
    if (this.nestedPopoverTriggerItem === e) {
      this.destroyNestedPopoverIfExists(), this.nestedPopoverTriggerItem = null;
      return;
    }
    super.showNestedItems(e);
  }
  /**
   * Creates and displays nested popover for specified item.
   * Is used only on desktop
   *
   * @param item - item to display nested popover by
   */
  showNestedPopoverForItem(e) {
    const t = super.showNestedPopoverForItem(e);
    return t.getElement().classList.add($.getPopoverNestedClass(t.nestingLevel)), t;
  }
  /**
   * Overrides default item click handling.
   * Helps to close nested popover once other item is clicked.
   *
   * @param item - clicked item
   */
  handleItemClick(e) {
    var t;
    e !== this.nestedPopoverTriggerItem && ((t = this.nestedPopoverTriggerItem) == null || t.handleClick(), super.destroyNestedPopoverIfExists()), super.handleItemClick(e);
  }
}
const Ki = class Ve {
  constructor() {
    this.scrollPosition = null;
  }
  /**
   * Locks body element scroll
   */
  lock() {
    go ? this.lockHard() : document.body.classList.add(Ve.CSS.scrollLocked);
  }
  /**
   * Unlocks body element scroll
   */
  unlock() {
    go ? this.unlockHard() : document.body.classList.remove(Ve.CSS.scrollLocked);
  }
  /**
   * Locks scroll in a hard way (via setting fixed position to body element)
   */
  lockHard() {
    this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty(
      "--window-scroll-offset",
      `${this.scrollPosition}px`
    ), document.body.classList.add(Ve.CSS.scrollLockedHard);
  }
  /**
   * Unlocks hard scroll lock
   */
  unlockHard() {
    document.body.classList.remove(Ve.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
  }
};
Ki.CSS = {
  scrollLocked: "ce-scroll-locked",
  scrollLockedHard: "ce-scroll-locked--hard"
};
let hc = Ki;
const no = Ee("ce-popover-header"), ro = {
  root: no(),
  text: no("text"),
  backButton: no("back-button")
};
class pc {
  /**
   * Constructs the instance
   *
   * @param params - popover header params
   */
  constructor({ text: e, onBackButtonClick: t }) {
    this.listeners = new tt(), this.text = e, this.onBackButtonClick = t, this.nodes = {
      root: f.make("div", [ro.root]),
      backButton: f.make("button", [ro.backButton]),
      text: f.make("div", [ro.text])
    }, this.nodes.backButton.innerHTML = Yl, this.nodes.root.appendChild(this.nodes.backButton), this.listeners.on(this.nodes.backButton, "click", this.onBackButtonClick), this.nodes.text.innerText = this.text, this.nodes.root.appendChild(this.nodes.text);
  }
  /**
   * Returns popover header root html element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Destroys the instance
   */
  destroy() {
    this.nodes.root.remove(), this.listeners.destroy();
  }
}
class fc {
  constructor() {
    this.history = [];
  }
  /**
   * Push new popover state
   *
   * @param state - new state
   */
  push(e) {
    this.history.push(e);
  }
  /**
   * Pop last popover state
   */
  pop() {
    return this.history.pop();
  }
  /**
   * Title retrieved from the current state
   */
  get currentTitle() {
    return this.history.length === 0 ? "" : this.history[this.history.length - 1].title;
  }
  /**
   * Items list retrieved from the current state
   */
  get currentItems() {
    return this.history.length === 0 ? [] : this.history[this.history.length - 1].items;
  }
  /**
   * Returns history to initial popover state
   */
  reset() {
    for (; this.history.length > 1; )
      this.pop();
  }
}
let qi = class extends Ui {
  /**
   * Construct the instance
   *
   * @param params - popover params
   */
  constructor(e) {
    super(e, {
      [j.Default]: {
        hint: {
          enabled: !1
        }
      },
      [j.Html]: {
        hint: {
          enabled: !1
        }
      }
    }), this.scrollLocker = new hc(), this.history = new fc(), this.isHidden = !0, this.nodes.overlay = f.make("div", [$.overlay, $.overlayHidden]), this.nodes.popover.insertBefore(this.nodes.overlay, this.nodes.popover.firstChild), this.listeners.on(this.nodes.overlay, "click", () => {
      this.hide();
    }), this.history.push({ items: e.items });
  }
  /**
   * Open popover
   */
  show() {
    this.nodes.overlay.classList.remove($.overlayHidden), super.show(), this.scrollLocker.lock(), this.isHidden = !1;
  }
  /**
   * Closes popover
   */
  hide() {
    this.isHidden || (super.hide(), this.nodes.overlay.classList.add($.overlayHidden), this.scrollLocker.unlock(), this.history.reset(), this.isHidden = !0);
  }
  /**
   * Clears memory
   */
  destroy() {
    super.destroy(), this.scrollLocker.unlock();
  }
  /**
   * Handles displaying nested items for the item
   *
   * @param item – item to show nested popover for
   */
  showNestedItems(e) {
    this.updateItemsAndHeader(e.children, e.title), this.history.push({
      title: e.title,
      items: e.children
    });
  }
  /**
   * Removes rendered popover items and header and displays new ones
   *
   * @param items - new popover items
   * @param title - new popover header text
   */
  updateItemsAndHeader(e, t) {
    if (this.header !== null && this.header !== void 0 && (this.header.destroy(), this.header = null), t !== void 0) {
      this.header = new pc({
        text: t,
        onBackButtonClick: () => {
          this.history.pop(), this.updateItemsAndHeader(this.history.currentItems, this.history.currentTitle);
        }
      });
      const n = this.header.getElement();
      n !== null && this.nodes.popoverContainer.insertBefore(n, this.nodes.popoverContainer.firstChild);
    }
    this.items.forEach((n) => {
      var r;
      return (r = n.getElement()) == null ? void 0 : r.remove();
    }), this.items = this.buildItems(e), this.items.forEach((n) => {
      var r;
      const i = n.getElement();
      i !== null && ((r = this.nodes.items) == null || r.appendChild(i));
    });
  }
};
class gc extends O {
  constructor() {
    super(...arguments), this.opened = !1, this.hasMobileLayoutToggleListener = !1, this.selection = new C(), this.popover = null, this.close = () => {
      this.opened && (this.opened = !1, C.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && this.Editor.BlockSelection.unselectBlock(this.Editor.BlockManager.currentBlock), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(ae.Closed, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null));
    }, this.onPopoverClose = () => {
      this.close();
    };
  }
  /**
   * Module Events
   */
  get events() {
    return {
      opened: "block-settings-opened",
      closed: "block-settings-closed"
    };
  }
  /**
   * Block Settings CSS
   */
  get CSS() {
    return {
      settings: "ce-settings"
    };
  }
  /**
   * Getter for inner popover's flipper instance
   *
   * @todo remove once BlockSettings becomes standalone non-module class
   */
  get flipper() {
    var e;
    if (this.popover !== null)
      return "flipper" in this.popover ? (e = this.popover) == null ? void 0 : e.flipper : void 0;
  }
  /**
   * Panel with block settings with 2 sections:
   *  - Tool's Settings
   *  - Default Settings [Move, Remove, etc]
   */
  make() {
    this.nodes.wrapper = f.make("div", [this.CSS.settings]), this.eventsDispatcher.on(Ze, this.close), this.hasMobileLayoutToggleListener = !0;
  }
  /**
   * Destroys module
   */
  destroy() {
    this.removeAllNodes(), this.listeners.destroy(), this.hasMobileLayoutToggleListener && (this.eventsDispatcher.off(Ze, this.close), this.hasMobileLayoutToggleListener = !1);
  }
  /**
   * Open Block Settings pane
   *
   * @param targetBlock - near which Block we should open BlockSettings
   */
  async open(e = this.Editor.BlockManager.currentBlock) {
    var t;
    this.opened = !0, this.selection.save(), this.Editor.BlockSelection.selectBlock(e), this.Editor.BlockSelection.clearCache();
    const { toolTunes: n, commonTunes: r } = e.getTunes();
    this.eventsDispatcher.emit(this.events.opened);
    const i = Fe() ? qi : Io;
    this.popover = new i({
      searchable: !0,
      items: await this.getTunesItems(e, r, n),
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: V.ui(Q.ui.popover, "Nothing found"),
        search: V.ui(Q.ui.popover, "Filter")
      }
    }), this.popover.on(ae.Closed, this.onPopoverClose), (t = this.nodes.wrapper) == null || t.append(this.popover.getElement()), this.popover.show();
  }
  /**
   * Returns root block settings element
   */
  getElement() {
    return this.nodes.wrapper;
  }
  /**
   * Returns list of items to be displayed in block tunes menu.
   * Merges tool specific tunes, conversion menu and common tunes in one list in predefined order
   *
   * @param currentBlock –  block we are about to open block tunes for
   * @param commonTunes – common tunes
   * @param toolTunes - tool specific tunes
   */
  async getTunesItems(e, t, n) {
    const r = [];
    n !== void 0 && n.length > 0 && (r.push(...n), r.push({
      type: j.Separator
    }));
    const i = Array.from(this.Editor.Tools.blockTools.values()), s = (await Pi(e, i)).reduce((a, l) => (l.toolbox.forEach((c) => {
      a.push({
        icon: c.icon,
        title: V.t(Q.toolNames, c.title),
        name: l.name,
        closeOnActivate: !0,
        onActivate: async () => {
          const { BlockManager: d, Caret: u, Toolbar: h } = this.Editor, g = await d.convert(e, l.name, c.data);
          h.close(), u.setToBlock(g, u.positions.END);
        }
      });
    }), a), []);
    return s.length > 0 && (r.push({
      icon: Hi,
      name: "convert-to",
      title: V.ui(Q.ui.popover, "Convert to"),
      children: {
        searchable: !0,
        items: s
      }
    }), r.push({
      type: j.Separator
    })), r.push(...t), r.map((a) => this.resolveTuneAliases(a));
  }
  /**
   * Resolves aliases in tunes menu items
   *
   * @param item - item with resolved aliases
   */
  resolveTuneAliases(e) {
    if (e.type === j.Separator || e.type === j.Html)
      return e;
    const t = Wl(e, { label: "title" });
    return e.confirmation && (t.confirmation = this.resolveTuneAliases(e.confirmation)), t;
  }
}
var Yi = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return (function(t) {
      var n = {};
      function r(i) {
        if (n[i])
          return n[i].exports;
        var s = n[i] = { i, l: !1, exports: {} };
        return t[i].call(s.exports, s, s.exports, r), s.l = !0, s.exports;
      }
      return r.m = t, r.c = n, r.d = function(i, s, a) {
        r.o(i, s) || Object.defineProperty(i, s, { enumerable: !0, get: a });
      }, r.r = function(i) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
      }, r.t = function(i, s) {
        if (1 & s && (i = r(i)), 8 & s || 4 & s && typeof i == "object" && i && i.__esModule)
          return i;
        var a = /* @__PURE__ */ Object.create(null);
        if (r.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: i }), 2 & s && typeof i != "string")
          for (var l in i)
            r.d(a, l, (function(c) {
              return i[c];
            }).bind(null, l));
        return a;
      }, r.n = function(i) {
        var s = i && i.__esModule ? function() {
          return i.default;
        } : function() {
          return i;
        };
        return r.d(s, "a", s), s;
      }, r.o = function(i, s) {
        return Object.prototype.hasOwnProperty.call(i, s);
      }, r.p = "", r(r.s = 0);
    })([function(t, n, r) {
      function i(l, c) {
        for (var d = 0; d < c.length; d++) {
          var u = c[d];
          u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(l, u.key, u);
        }
      }
      function s(l, c, d) {
        return c && i(l.prototype, c), d && i(l, d), l;
      }
      r.r(n);
      var a = (function() {
        function l(c) {
          var d = this;
          (function(u, h) {
            if (!(u instanceof h))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.commands = {}, this.keys = {}, this.name = c.name, this.parseShortcutName(c.name), this.element = c.on, this.callback = c.callback, this.executeShortcut = function(u) {
            d.execute(u);
          }, this.element.addEventListener("keydown", this.executeShortcut, !1);
        }
        return s(l, null, [{ key: "supportedCommands", get: function() {
          return { SHIFT: ["SHIFT"], CMD: ["CMD", "CONTROL", "COMMAND", "WINDOWS", "CTRL"], ALT: ["ALT", "OPTION"] };
        } }, { key: "keyCodes", get: function() {
          return { 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, BACKSPACE: 8, ENTER: 13, ESCAPE: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INSERT: 45, DELETE: 46, ".": 190 };
        } }]), s(l, [{ key: "parseShortcutName", value: function(c) {
          c = c.split("+");
          for (var d = 0; d < c.length; d++) {
            c[d] = c[d].toUpperCase();
            var u = !1;
            for (var h in l.supportedCommands)
              if (l.supportedCommands[h].includes(c[d])) {
                u = this.commands[h] = !0;
                break;
              }
            u || (this.keys[c[d]] = !0);
          }
          for (var g in l.supportedCommands)
            this.commands[g] || (this.commands[g] = !1);
        } }, { key: "execute", value: function(c) {
          var d, u = { CMD: c.ctrlKey || c.metaKey, SHIFT: c.shiftKey, ALT: c.altKey }, h = !0;
          for (d in this.commands)
            this.commands[d] !== u[d] && (h = !1);
          var g, p = !0;
          for (g in this.keys)
            p = p && c.keyCode === l.keyCodes[g];
          h && p && this.callback(c);
        } }, { key: "remove", value: function() {
          this.element.removeEventListener("keydown", this.executeShortcut);
        } }]), l;
      })();
      n.default = a;
    }]).default;
  });
})(Yi);
var mc = Yi.exports;
const bc = /* @__PURE__ */ Mt(mc);
class vc {
  constructor() {
    this.registeredShortcuts = /* @__PURE__ */ new Map();
  }
  /**
   * Register shortcut
   *
   * @param shortcut - shortcut options
   */
  add(e) {
    if (this.findShortcut(e.on, e.name))
      throw Error(
        `Shortcut ${e.name} is already registered for ${e.on}. Please remove it before add a new handler.`
      );
    const t = new bc({
      name: e.name,
      on: e.on,
      callback: e.handler
    }), n = this.registeredShortcuts.get(e.on) || [];
    this.registeredShortcuts.set(e.on, [...n, t]);
  }
  /**
   * Remove shortcut
   *
   * @param element - Element shortcut is set for
   * @param name - shortcut name
   */
  remove(e, t) {
    const n = this.findShortcut(e, t);
    if (!n)
      return;
    n.remove();
    const r = this.registeredShortcuts.get(e).filter((i) => i !== n);
    if (r.length === 0) {
      this.registeredShortcuts.delete(e);
      return;
    }
    this.registeredShortcuts.set(e, r);
  }
  /**
   * Get Shortcut instance if exist
   *
   * @param element - Element shorcut is set for
   * @param shortcut - shortcut name
   * @returns {number} index - shortcut index if exist
   */
  findShortcut(e, t) {
    return (this.registeredShortcuts.get(e) || []).find(({ name: n }) => n === t);
  }
}
const $e = new vc();
var yc = Object.defineProperty, kc = Object.getOwnPropertyDescriptor, Vi = (o, e, t, n) => {
  for (var r = kc(e, t), i = o.length - 1, s; i >= 0; i--)
    (s = o[i]) && (r = s(e, t, r) || r);
  return r && yc(e, t, r), r;
}, ct = /* @__PURE__ */ ((o) => (o.Opened = "toolbox-opened", o.Closed = "toolbox-closed", o.BlockAdded = "toolbox-block-added", o))(ct || {});
const Mo = class Xi extends et {
  /**
   * Toolbox constructor
   *
   * @param options - available parameters
   * @param options.api - Editor API methods
   * @param options.tools - Tools available to check whether some of them should be displayed at the Toolbox or not
   */
  constructor({ api: e, tools: t, i18nLabels: n }) {
    super(), this.opened = !1, this.listeners = new tt(), this.popover = null, this.handleMobileLayoutToggle = () => {
      this.destroyPopover(), this.initPopover();
    }, this.onPopoverClose = () => {
      this.opened = !1, this.emit(
        "toolbox-closed"
        /* Closed */
      );
    }, this.api = e, this.tools = t, this.i18nLabels = n, this.enableShortcuts(), this.nodes = {
      toolbox: f.make("div", Xi.CSS.toolbox)
    }, this.initPopover(), this.api.events.on(Ze, this.handleMobileLayoutToggle);
  }
  /**
   * Returns True if Toolbox is Empty and nothing to show
   *
   * @returns {boolean}
   */
  get isEmpty() {
    return this.toolsToBeDisplayed.length === 0;
  }
  /**
   * CSS styles
   */
  static get CSS() {
    return {
      toolbox: "ce-toolbox"
    };
  }
  /**
   * Returns root block settings element
   */
  getElement() {
    return this.nodes.toolbox;
  }
  /**
   * Returns true if the Toolbox has the Flipper activated and the Flipper has selected button
   */
  hasFocus() {
    if (this.popover !== null)
      return "hasFocus" in this.popover ? this.popover.hasFocus() : void 0;
  }
  /**
   * Destroy Module
   */
  destroy() {
    var e;
    super.destroy(), this.nodes && this.nodes.toolbox && this.nodes.toolbox.remove(), this.removeAllShortcuts(), (e = this.popover) == null || e.off(ae.Closed, this.onPopoverClose), this.listeners.destroy(), this.api.events.off(Ze, this.handleMobileLayoutToggle);
  }
  /**
   * Toolbox Tool's button click handler
   *
   * @param toolName - tool type to be activated
   * @param blockDataOverrides - Block data predefined by the activated Toolbox item
   */
  toolButtonActivated(e, t) {
    this.insertNewBlock(e, t);
  }
  /**
   * Open Toolbox with Tools
   */
  open() {
    var e;
    this.isEmpty || ((e = this.popover) == null || e.show(), this.opened = !0, this.emit(
      "toolbox-opened"
      /* Opened */
    ));
  }
  /**
   * Close Toolbox
   */
  close() {
    var e;
    (e = this.popover) == null || e.hide(), this.opened = !1, this.emit(
      "toolbox-closed"
      /* Closed */
    );
  }
  /**
   * Close Toolbox
   */
  toggle() {
    this.opened ? this.close() : this.open();
  }
  /**
   * Creates toolbox popover and appends it inside wrapper element
   */
  initPopover() {
    var e;
    const t = Fe() ? qi : Io;
    this.popover = new t({
      scopeElement: this.api.ui.nodes.redactor,
      searchable: !0,
      messages: {
        nothingFound: this.i18nLabels.nothingFound,
        search: this.i18nLabels.filter
      },
      items: this.toolboxItemsToBeDisplayed
    }), this.popover.on(ae.Closed, this.onPopoverClose), (e = this.nodes.toolbox) == null || e.append(this.popover.getElement());
  }
  /**
   * Destroys popover instance and removes it from DOM
   */
  destroyPopover() {
    this.popover !== null && (this.popover.hide(), this.popover.off(ae.Closed, this.onPopoverClose), this.popover.destroy(), this.popover = null), this.nodes.toolbox !== null && (this.nodes.toolbox.innerHTML = "");
  }
  get toolsToBeDisplayed() {
    const e = [];
    return this.tools.forEach((t) => {
      t.toolbox && e.push(t);
    }), e;
  }
  get toolboxItemsToBeDisplayed() {
    const e = (t, n, r = !0) => ({
      icon: t.icon,
      title: V.t(Q.toolNames, t.title || wt(n.name)),
      name: n.name,
      onActivate: () => {
        this.toolButtonActivated(n.name, t.data);
      },
      secondaryLabel: n.shortcut && r ? To(n.shortcut) : ""
    });
    return this.toolsToBeDisplayed.reduce((t, n) => (Array.isArray(n.toolbox) ? n.toolbox.forEach((r, i) => {
      t.push(e(r, n, i === 0));
    }) : n.toolbox !== void 0 && t.push(e(n.toolbox, n)), t), []);
  }
  /**
   * Iterate all tools and enable theirs shortcuts if specified
   */
  enableShortcuts() {
    this.toolsToBeDisplayed.forEach((e) => {
      const t = e.shortcut;
      t && this.enableShortcutForTool(e.name, t);
    });
  }
  /**
   * Enable shortcut Block Tool implemented shortcut
   *
   * @param {string} toolName - Tool name
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcutForTool(e, t) {
    $e.add({
      name: t,
      on: this.api.ui.nodes.redactor,
      handler: async (n) => {
        n.preventDefault();
        const r = this.api.blocks.getCurrentBlockIndex(), i = this.api.blocks.getBlockByIndex(r);
        if (i)
          try {
            const s = await this.api.blocks.convert(i.id, e);
            this.api.caret.setToBlock(s, "end");
            return;
          } catch {
          }
        this.insertNewBlock(e);
      }
    });
  }
  /**
   * Removes all added shortcuts
   * Fired when the Read-Only mode is activated
   */
  removeAllShortcuts() {
    this.toolsToBeDisplayed.forEach((e) => {
      const t = e.shortcut;
      t && $e.remove(this.api.ui.nodes.redactor, t);
    });
  }
  /**
   * Inserts new block
   * Can be called when button clicked on Toolbox or by ShortcutData
   *
   * @param {string} toolName - Tool name
   * @param blockDataOverrides - predefined Block data
   */
  async insertNewBlock(e, t) {
    const n = this.api.blocks.getCurrentBlockIndex(), r = this.api.blocks.getBlockByIndex(n);
    if (!r)
      return;
    const i = r.isEmpty ? n : n + 1;
    let s;
    if (t) {
      const l = await this.api.blocks.composeBlockData(e);
      s = Object.assign(l, t);
    }
    const a = this.api.blocks.insert(
      e,
      s,
      void 0,
      i,
      void 0,
      r.isEmpty
    );
    a.call(he.APPEND_CALLBACK), this.api.caret.setToBlock(i), this.emit("toolbox-block-added", {
      block: a
    }), this.api.toolbar.close();
  }
};
Vi([
  He
], Mo.prototype, "toolsToBeDisplayed");
Vi([
  He
], Mo.prototype, "toolboxItemsToBeDisplayed");
let wc = Mo;
const Gi = "block hovered";
async function xc(o, e) {
  const t = navigator.keyboard;
  if (!t)
    return e;
  try {
    return (await t.getLayoutMap()).get(o) || e;
  } catch (n) {
    return console.error(n), e;
  }
}
class Ec extends O {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.toolboxInstance = null;
  }
  /**
   * CSS styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      toolbar: "ce-toolbar",
      content: "ce-toolbar__content",
      actions: "ce-toolbar__actions",
      actionsOpened: "ce-toolbar__actions--opened",
      toolbarOpened: "ce-toolbar--opened",
      openedToolboxHolderModifier: "codex-editor--toolbox-opened",
      plusButton: "ce-toolbar__plus",
      plusButtonShortcut: "ce-toolbar__plus-shortcut",
      settingsToggler: "ce-toolbar__settings-btn",
      settingsTogglerHidden: "ce-toolbar__settings-btn--hidden"
    };
  }
  /**
   * Returns the Toolbar opening state
   *
   * @returns {boolean}
   */
  get opened() {
    return this.nodes.wrapper.classList.contains(this.CSS.toolbarOpened);
  }
  /**
   * Public interface for accessing the Toolbox
   */
  get toolbox() {
    var e;
    return {
      opened: (e = this.toolboxInstance) == null ? void 0 : e.opened,
      close: () => {
        var t;
        (t = this.toolboxInstance) == null || t.close();
      },
      open: () => {
        if (this.toolboxInstance === null) {
          L("toolbox.open() called before initialization is finished", "warn");
          return;
        }
        this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.toolboxInstance.open();
      },
      toggle: () => {
        if (this.toolboxInstance === null) {
          L("toolbox.toggle() called before initialization is finished", "warn");
          return;
        }
        this.toolboxInstance.toggle();
      },
      hasFocus: () => {
        var t;
        return (t = this.toolboxInstance) == null ? void 0 : t.hasFocus();
      }
    };
  }
  /**
   * Block actions appearance manipulations
   */
  get blockActions() {
    return {
      hide: () => {
        this.nodes.actions.classList.remove(this.CSS.actionsOpened);
      },
      show: () => {
        this.nodes.actions.classList.add(this.CSS.actionsOpened);
      }
    };
  }
  /**
   * Methods for working with Block Tunes toggler
   */
  get blockTunesToggler() {
    return {
      hide: () => this.nodes.settingsToggler.classList.add(this.CSS.settingsTogglerHidden),
      show: () => this.nodes.settingsToggler.classList.remove(this.CSS.settingsTogglerHidden)
    };
  }
  /**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */
  toggleReadOnly(e) {
    e ? (this.destroy(), this.Editor.BlockSettings.destroy(), this.disableModuleBindings()) : window.requestIdleCallback(() => {
      this.drawUI(), this.enableModuleBindings();
    }, { timeout: 2e3 });
  }
  /**
   * Move Toolbar to the passed (or current) Block
   *
   * @param block - block to move Toolbar near it
   */
  moveAndOpen(e = this.Editor.BlockManager.currentBlock) {
    if (this.toolboxInstance === null) {
      L("Can't open Toolbar since Editor initialization is not finished yet", "warn");
      return;
    }
    if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !e)
      return;
    this.hoveredBlock = e;
    const t = e.holder, { isMobile: n } = this.Editor.UI;
    let r;
    const i = 20, s = e.firstInput, a = t.getBoundingClientRect(), l = s !== void 0 ? s.getBoundingClientRect() : null, c = l !== null ? l.top - a.top : null, d = c !== null ? c > i : void 0;
    if (n)
      r = t.offsetTop + t.offsetHeight;
    else if (s === void 0 || d) {
      const u = parseInt(window.getComputedStyle(e.pluginsContent).paddingTop);
      r = t.offsetTop + u;
    } else {
      const u = sl(s), h = parseInt(window.getComputedStyle(this.nodes.plusButton).height, 10);
      r = t.offsetTop + u - h + 8 + c;
    }
    this.nodes.wrapper.style.top = `${Math.floor(r)}px`, this.Editor.BlockManager.blocks.length === 1 && e.isEmpty ? this.blockTunesToggler.hide() : this.blockTunesToggler.show(), this.open();
  }
  /**
   * Close the Toolbar
   */
  close() {
    var e, t;
    this.Editor.ReadOnly.isEnabled || ((e = this.nodes.wrapper) == null || e.classList.remove(this.CSS.toolbarOpened), this.blockActions.hide(), (t = this.toolboxInstance) == null || t.close(), this.Editor.BlockSettings.close(), this.reset());
  }
  /**
   * Reset the Toolbar position to prevent DOM height growth, for example after blocks deletion
   */
  reset() {
    this.nodes.wrapper.style.top = "unset";
  }
  /**
   * Open Toolbar with Plus Button and Actions
   *
   * @param {boolean} withBlockActions - by default, Toolbar opens with Block Actions.
   *                                     This flag allows to open Toolbar without Actions.
   */
  open(e = !0) {
    this.nodes.wrapper.classList.add(this.CSS.toolbarOpened), e ? this.blockActions.show() : this.blockActions.hide();
  }
  /**
   * Draws Toolbar elements
   */
  async make() {
    this.nodes.wrapper = f.make("div", this.CSS.toolbar), ["content", "actions"].forEach((i) => {
      this.nodes[i] = f.make("div", this.CSS[i]);
    }), f.append(this.nodes.wrapper, this.nodes.content), f.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = f.make("div", this.CSS.plusButton, {
      innerHTML: ec
    }), f.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", () => {
      Et(!0), this.plusButtonClicked();
    }, !1);
    const e = f.make("div");
    e.appendChild(document.createTextNode(V.ui(Q.ui.toolbar.toolbox, "Add"))), e.appendChild(f.make("div", this.CSS.plusButtonShortcut, {
      textContent: "/"
    })), Ct(this.nodes.plusButton, e, {
      hidingDelay: 400
    }), this.nodes.settingsToggler = f.make("span", this.CSS.settingsToggler, {
      innerHTML: Jl
    }), f.append(this.nodes.actions, this.nodes.settingsToggler);
    const t = f.make("div"), n = f.text(V.ui(Q.ui.blockTunes.toggler, "Click to tune")), r = await xc("Slash", "/");
    t.appendChild(n), t.appendChild(f.make("div", this.CSS.plusButtonShortcut, {
      textContent: To(`CMD + ${r}`)
    })), Ct(this.nodes.settingsToggler, t, {
      hidingDelay: 400
    }), f.append(this.nodes.actions, this.makeToolbox()), f.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), f.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Creates the Toolbox instance and return it's rendered element
   */
  makeToolbox() {
    return this.toolboxInstance = new wc({
      api: this.Editor.API.methods,
      tools: this.Editor.Tools.blockTools,
      i18nLabels: {
        filter: V.ui(Q.ui.popover, "Filter"),
        nothingFound: V.ui(Q.ui.popover, "Nothing found")
      }
    }), this.toolboxInstance.on(ct.Opened, () => {
      this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(ct.Closed, () => {
      this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(ct.BlockAdded, ({ block: e }) => {
      const { BlockManager: t, Caret: n } = this.Editor, r = t.getBlockById(e.id);
      r.inputs.length === 0 && (r === t.lastBlock ? (t.insertAtEnd(), n.setToBlock(t.lastBlock)) : n.setToBlock(t.nextBlock));
    }), this.toolboxInstance.getElement();
  }
  /**
   * Handler for Plus Button
   */
  plusButtonClicked() {
    var e;
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, (e = this.toolboxInstance) == null || e.toggle();
  }
  /**
   * Enable bindings
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", (e) => {
      var t;
      e.stopPropagation(), this.settingsTogglerClicked(), (t = this.toolboxInstance) != null && t.opened && this.toolboxInstance.close(), Et(!0);
    }, !0), Fe() || this.eventsDispatcher.on(Gi, (e) => {
      var t;
      this.Editor.BlockSettings.opened || (t = this.toolboxInstance) != null && t.opened || this.moveAndOpen(e.block);
    });
  }
  /**
   * Disable bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Clicks on the Block Settings toggler
   */
  settingsTogglerClicked() {
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.BlockSettings.open(this.hoveredBlock);
  }
  /**
   * Draws Toolbar UI
   *
   * Toolbar contains BlockSettings and Toolbox.
   * That's why at first we draw its components and then Toolbar itself
   *
   * Steps:
   *  - Make Toolbar dependent components like BlockSettings, Toolbox and so on
   *  - Make itself and append dependent nodes to itself
   *
   */
  drawUI() {
    this.Editor.BlockSettings.make(), this.make();
  }
  /**
   * Removes all created and saved HTMLElements
   * It is used in Read-Only mode
   */
  destroy() {
    this.removeAllNodes(), this.toolboxInstance && this.toolboxInstance.destroy();
  }
}
var _e = /* @__PURE__ */ ((o) => (o[o.Block = 0] = "Block", o[o.Inline = 1] = "Inline", o[o.Tune = 2] = "Tune", o))(_e || {}), dt = /* @__PURE__ */ ((o) => (o.Shortcut = "shortcut", o.Toolbox = "toolbox", o.EnabledInlineTools = "inlineToolbar", o.EnabledBlockTunes = "tunes", o.Config = "config", o))(dt || {}), Zi = /* @__PURE__ */ ((o) => (o.Shortcut = "shortcut", o.SanitizeConfig = "sanitize", o))(Zi || {}), je = /* @__PURE__ */ ((o) => (o.IsEnabledLineBreaks = "enableLineBreaks", o.Toolbox = "toolbox", o.ConversionConfig = "conversionConfig", o.IsReadOnlySupported = "isReadOnlySupported", o.PasteConfig = "pasteConfig", o))(je || {}), _t = /* @__PURE__ */ ((o) => (o.IsInline = "isInline", o.Title = "title", o.IsReadOnlySupported = "isReadOnlySupported", o))(_t || {}), yo = /* @__PURE__ */ ((o) => (o.IsTune = "isTune", o))(yo || {});
let Lo = class {
  /**
   * @class
   * @param {ConstructorOptions} options - Constructor options
   */
  constructor({
    name: e,
    constructable: t,
    config: n,
    api: r,
    isDefault: i,
    isInternal: s = !1,
    defaultPlaceholder: a
  }) {
    this.api = r, this.name = e, this.constructable = t, this.config = n, this.isDefault = i, this.isInternal = s, this.defaultPlaceholder = a;
  }
  /**
   * Returns Tool user configuration
   */
  get settings() {
    const e = this.config.config || {};
    return this.isDefault && !("placeholder" in e) && this.defaultPlaceholder && (e.placeholder = this.defaultPlaceholder), e;
  }
  /**
   * Calls Tool's reset method
   */
  reset() {
    if (D(this.constructable.reset))
      return this.constructable.reset();
  }
  /**
   * Calls Tool's prepare method
   */
  prepare() {
    if (D(this.constructable.prepare))
      return this.constructable.prepare({
        toolName: this.name,
        config: this.settings
      });
  }
  /**
   * Returns shortcut for Tool (internal or specified by user)
   */
  get shortcut() {
    const e = this.constructable.shortcut;
    return this.config.shortcut || e;
  }
  /**
   * Returns Tool's sanitizer configuration
   */
  get sanitizeConfig() {
    return this.constructable.sanitize || {};
  }
  /**
   * Returns true if Tools is inline
   */
  isInline() {
    return this.type === _e.Inline;
  }
  /**
   * Returns true if Tools is block
   */
  isBlock() {
    return this.type === _e.Block;
  }
  /**
   * Returns true if Tools is tune
   */
  isTune() {
    return this.type === _e.Tune;
  }
};
class Cc extends O {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.CSS = {
      inlineToolbar: "ce-inline-toolbar"
    }, this.opened = !1, this.popover = null, this.toolbarVerticalMargin = Fe() ? 20 : 6, this.tools = /* @__PURE__ */ new Map(), window.requestIdleCallback(() => {
      this.make();
    }, { timeout: 2e3 });
  }
  /**
   *  Moving / appearance
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Shows Inline Toolbar if something is selected
   *
   * @param [needToClose] - pass true to close toolbar if it is not allowed.
   *                                  Avoid to use it just for closing IT, better call .close() clearly.
   */
  async tryToShow(e = !1) {
    e && this.close(), this.allowedToShow() && (await this.open(), this.Editor.Toolbar.close());
  }
  /**
   * Hides Inline Toolbar
   */
  close() {
    var e, t;
    if (this.opened) {
      for (const [n, r] of this.tools) {
        const i = this.getToolShortcut(n.name);
        i !== void 0 && $e.remove(this.Editor.UI.nodes.redactor, i), D(r.clear) && r.clear();
      }
      this.tools = /* @__PURE__ */ new Map(), this.reset(), this.opened = !1, (e = this.popover) == null || e.hide(), (t = this.popover) == null || t.destroy(), this.popover = null;
    }
  }
  /**
   * Check if node is contained by Inline Toolbar
   *
   * @param {Node} node — node to check
   */
  containsNode(e) {
    return this.nodes.wrapper === void 0 ? !1 : this.nodes.wrapper.contains(e);
  }
  /**
   * Removes UI and its components
   */
  destroy() {
    var e;
    this.removeAllNodes(), (e = this.popover) == null || e.destroy(), this.popover = null;
  }
  /**
   * Making DOM
   */
  make() {
    this.nodes.wrapper = f.make("div", [
      this.CSS.inlineToolbar,
      ...this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []
    ]), f.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Shows Inline Toolbar
   */
  async open() {
    var e;
    if (this.opened)
      return;
    this.opened = !0, this.popover !== null && this.popover.destroy(), this.createToolsInstances();
    const t = await this.getPopoverItems();
    this.popover = new uc({
      items: t,
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: V.ui(Q.ui.popover, "Nothing found"),
        search: V.ui(Q.ui.popover, "Filter")
      }
    }), this.move(this.popover.size.width), (e = this.nodes.wrapper) == null || e.append(this.popover.getElement()), this.popover.show();
  }
  /**
   * Move Toolbar to the selected text
   *
   * @param popoverWidth - width of the toolbar popover
   */
  move(e) {
    const t = C.rect, n = this.Editor.UI.nodes.wrapper.getBoundingClientRect(), r = {
      x: t.x - n.x,
      y: t.y + t.height - // + window.scrollY
      n.top + this.toolbarVerticalMargin
    };
    r.x + e + n.x > this.Editor.UI.contentRect.right && (r.x = this.Editor.UI.contentRect.right - e - n.x), this.nodes.wrapper.style.left = Math.floor(r.x) + "px", this.nodes.wrapper.style.top = Math.floor(r.y) + "px";
  }
  /**
   * Clear orientation classes and reset position
   */
  reset() {
    this.nodes.wrapper.style.left = "0", this.nodes.wrapper.style.top = "0";
  }
  /**
   * Need to show Inline Toolbar or not
   */
  allowedToShow() {
    const e = ["IMG", "INPUT"], t = C.get(), n = C.text;
    if (!t || !t.anchorNode || t.isCollapsed || n.length < 1)
      return !1;
    const r = f.isElement(t.anchorNode) ? t.anchorNode : t.anchorNode.parentElement;
    if (r === null || t !== null && e.includes(r.tagName))
      return !1;
    const i = this.Editor.BlockManager.getBlock(t.anchorNode);
    return !i || this.getTools().some((s) => i.tool.inlineTools.has(s.name)) === !1 ? !1 : r.closest("[contenteditable]") !== null;
  }
  /**
   *  Working with Tools
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Returns tools that are available for current block
   *
   * Used to check if Inline Toolbar could be shown
   * and to render tools in the Inline Toolbar
   */
  getTools() {
    const e = this.Editor.BlockManager.currentBlock;
    return e ? Array.from(e.tool.inlineTools.values()).filter((t) => !(this.Editor.ReadOnly.isEnabled && t.isReadOnlySupported !== !0)) : [];
  }
  /**
   * Constructs tools instances and saves them to this.tools
   */
  createToolsInstances() {
    this.tools = /* @__PURE__ */ new Map(), this.getTools().forEach((e) => {
      const t = e.create();
      this.tools.set(e, t);
    });
  }
  /**
   * Returns Popover Items for tools segregated by their appearance type: regular items and custom html elements.
   */
  async getPopoverItems() {
    const e = [];
    let t = 0;
    for (const [n, r] of this.tools) {
      const i = await r.render(), s = this.getToolShortcut(n.name);
      if (s !== void 0)
        try {
          this.enableShortcuts(n.name, s);
        } catch {
        }
      const a = s !== void 0 ? To(s) : void 0, l = V.t(
        Q.toolNames,
        n.title || wt(n.name)
      );
      [i].flat().forEach((c) => {
        var d, u;
        const h = {
          name: n.name,
          onActivate: () => {
            this.toolClicked(r);
          },
          hint: {
            title: l,
            description: a
          }
        };
        if (f.isElement(c)) {
          const g = {
            ...h,
            element: c,
            type: j.Html
          };
          if (D(r.renderActions)) {
            const p = r.renderActions();
            g.children = {
              isOpen: (d = r.checkState) == null ? void 0 : d.call(r, C.get()),
              /** Disable keyboard navigation in actions, as it might conflict with enter press handling */
              isFlippable: !1,
              items: [
                {
                  type: j.Html,
                  element: p
                }
              ]
            };
          } else
            (u = r.checkState) == null || u.call(r, C.get());
          e.push(g);
        } else if (c.type === j.Html)
          e.push({
            ...h,
            ...c,
            type: j.Html
          });
        else if (c.type === j.Separator)
          e.push({
            type: j.Separator
          });
        else {
          const g = {
            ...h,
            ...c,
            type: j.Default
          };
          "children" in g && t !== 0 && e.push({
            type: j.Separator
          }), e.push(g), "children" in g && t < this.tools.size - 1 && e.push({
            type: j.Separator
          });
        }
      }), t++;
    }
    return e;
  }
  /**
   * Get shortcut name for tool
   *
   * @param toolName — Tool name
   */
  getToolShortcut(e) {
    const { Tools: t } = this.Editor, n = t.inlineTools.get(e), r = t.internal.inlineTools;
    return Array.from(r.keys()).includes(e) ? this.inlineTools[e][Zi.Shortcut] : n?.shortcut;
  }
  /**
   * Enable Tool shortcut with Editor Shortcuts Module
   *
   * @param toolName - tool name
   * @param shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcuts(e, t) {
    $e.add({
      name: t,
      handler: (n) => {
        var r;
        const { currentBlock: i } = this.Editor.BlockManager;
        i && i.tool.enabledInlineTools && (n.preventDefault(), (r = this.popover) == null || r.activateItemByName(e));
      },
      /**
       * We need to bind shortcut to the document to make it work in read-only mode
       */
      on: document
    });
  }
  /**
   * Inline Tool button clicks
   *
   * @param tool - Tool's instance
   */
  toolClicked(e) {
    var t;
    const n = C.range;
    (t = e.surround) == null || t.call(e, n), this.checkToolsState();
  }
  /**
   * Check Tools` state by selection
   */
  checkToolsState() {
    var e;
    (e = this.tools) == null || e.forEach((t) => {
      var n;
      (n = t.checkState) == null || n.call(t, C.get());
    });
  }
  /**
   * Get inline tools tools
   * Tools that has isInline is true
   */
  get inlineTools() {
    const e = {};
    return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(([t, n]) => {
      e[t] = n.create();
    }), e;
  }
}
function Qi() {
  const o = Y();
  if (o === null)
    return [null, 0];
  let e = o.focusNode, t = o.focusOffset;
  return e === null ? [null, 0] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], t = e.textContent.length)), [e, t]);
}
function Ji(o, e, t, n) {
  const r = document.createRange();
  n === "left" ? (r.setStart(o, 0), r.setEnd(e, t)) : (r.setStart(e, t), r.setEnd(o, o.childNodes.length));
  const i = r.cloneContents(), s = document.createElement("div");
  s.appendChild(i);
  const a = s.textContent || "";
  return il(a);
}
function ut(o) {
  const e = f.getDeepestNode(o);
  if (e === null || f.isEmpty(o))
    return !0;
  if (f.isNativeInput(e))
    return e.selectionEnd === 0;
  if (f.isEmpty(o))
    return !0;
  const [t, n] = Qi();
  return t === null ? !1 : Ji(o, t, n, "left");
}
function ht(o) {
  const e = f.getDeepestNode(o, !0);
  if (e === null)
    return !0;
  if (f.isNativeInput(e))
    return e.selectionEnd === e.value.length;
  const [t, n] = Qi();
  return t === null ? !1 : Ji(o, t, n, "right");
}
var es = {}, Po = {}, Lt = {}, Oe = {}, Ao = {}, No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
No.allInputsSelector = Tc;
function Tc() {
  var o = ["text", "password", "email", "number", "search", "tel", "url"];
  return "[contenteditable=true], textarea, input:not([type]), " + o.map(function(e) {
    return 'input[type="'.concat(e, '"]');
  }).join(", ");
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.allInputsSelector = void 0;
  var e = No;
  Object.defineProperty(o, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
})(Ao);
var Ie = {}, jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
jo.isNativeInput = Sc;
function Sc(o) {
  var e = [
    "INPUT",
    "TEXTAREA"
  ];
  return o && o.tagName ? e.includes(o.tagName) : !1;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isNativeInput = void 0;
  var e = jo;
  Object.defineProperty(o, "isNativeInput", { enumerable: !0, get: function() {
    return e.isNativeInput;
  } });
})(Ie);
var ts = {}, Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
Do.append = _c;
function _c(o, e) {
  Array.isArray(e) ? e.forEach(function(t) {
    o.appendChild(t);
  }) : o.appendChild(e);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.append = void 0;
  var e = Do;
  Object.defineProperty(o, "append", { enumerable: !0, get: function() {
    return e.append;
  } });
})(ts);
var Ro = {}, $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
$o.blockElements = Bc;
function Bc() {
  return [
    "address",
    "article",
    "aside",
    "blockquote",
    "canvas",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "noscript",
    "ol",
    "output",
    "p",
    "pre",
    "ruby",
    "section",
    "table",
    "tbody",
    "thead",
    "tr",
    "tfoot",
    "ul",
    "video"
  ];
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.blockElements = void 0;
  var e = $o;
  Object.defineProperty(o, "blockElements", { enumerable: !0, get: function() {
    return e.blockElements;
  } });
})(Ro);
var os = {}, Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
Ho.calculateBaseline = Oc;
function Oc(o) {
  var e = window.getComputedStyle(o), t = parseFloat(e.fontSize), n = parseFloat(e.lineHeight) || t * 1.2, r = parseFloat(e.paddingTop), i = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, l = (n - t) / 2, c = s + i + r + l + a;
  return c;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.calculateBaseline = void 0;
  var e = Ho;
  Object.defineProperty(o, "calculateBaseline", { enumerable: !0, get: function() {
    return e.calculateBaseline;
  } });
})(os);
var ns = {}, Fo = {}, Uo = {}, zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
zo.isContentEditable = Ic;
function Ic(o) {
  return o.contentEditable === "true";
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isContentEditable = void 0;
  var e = zo;
  Object.defineProperty(o, "isContentEditable", { enumerable: !0, get: function() {
    return e.isContentEditable;
  } });
})(Uo);
Object.defineProperty(Fo, "__esModule", { value: !0 });
Fo.canSetCaret = Pc;
var Mc = Ie, Lc = Uo;
function Pc(o) {
  var e = !0;
  if ((0, Mc.isNativeInput)(o))
    switch (o.type) {
      case "file":
      case "checkbox":
      case "radio":
      case "hidden":
      case "submit":
      case "button":
      case "image":
      case "reset":
        e = !1;
        break;
    }
  else
    e = (0, Lc.isContentEditable)(o);
  return e;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.canSetCaret = void 0;
  var e = Fo;
  Object.defineProperty(o, "canSetCaret", { enumerable: !0, get: function() {
    return e.canSetCaret;
  } });
})(ns);
var Pt = {}, Wo = {};
function Ac(o, e, t) {
  const n = t.value !== void 0 ? "value" : "get", r = t[n], i = `#${e}Cache`;
  if (t[n] = function(...s) {
    return this[i] === void 0 && (this[i] = r.apply(this, s)), this[i];
  }, n === "get" && t.set) {
    const s = t.set;
    t.set = function(a) {
      delete o[i], s.apply(this, a);
    };
  }
  return t;
}
function rs() {
  const o = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e !== void 0 && (o[e] = !0), o;
}
function Ko(o) {
  return o != null && o !== "" && (typeof o != "object" || Object.keys(o).length > 0);
}
function Nc(o) {
  return !Ko(o);
}
const jc = () => typeof window < "u" && window.navigator !== null && Ko(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function Dc(o) {
  const e = rs();
  return o = o.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, "+"), e.mac ? o = o.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
}
function Rc(o) {
  return o[0].toUpperCase() + o.slice(1);
}
function $c(o) {
  const e = document.createElement("div");
  e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = o, document.body.appendChild(e);
  const t = window.getSelection(), n = document.createRange();
  if (n.selectNode(e), t === null)
    throw new Error("Cannot copy text to clipboard");
  t.removeAllRanges(), t.addRange(n), document.execCommand("copy"), document.body.removeChild(e);
}
function Hc(o, e, t) {
  let n;
  return (...r) => {
    const i = this, s = () => {
      n = void 0, t !== !0 && o.apply(i, r);
    }, a = t === !0 && n !== void 0;
    window.clearTimeout(n), n = window.setTimeout(s, e), a && o.apply(i, r);
  };
}
function ye(o) {
  return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function Fc(o) {
  return ye(o) === "boolean";
}
function is(o) {
  return ye(o) === "function" || ye(o) === "asyncfunction";
}
function Uc(o) {
  return is(o) && /^\s*class\s+/.test(o.toString());
}
function zc(o) {
  return ye(o) === "number";
}
function pt(o) {
  return ye(o) === "object";
}
function Wc(o) {
  return Promise.resolve(o) === o;
}
function Kc(o) {
  return ye(o) === "string";
}
function qc(o) {
  return ye(o) === "undefined";
}
function ko(o, ...e) {
  if (!e.length)
    return o;
  const t = e.shift();
  if (pt(o) && pt(t))
    for (const n in t)
      pt(t[n]) ? (o[n] === void 0 && Object.assign(o, { [n]: {} }), ko(o[n], t[n])) : Object.assign(o, { [n]: t[n] });
  return ko(o, ...e);
}
function Yc(o, e, t) {
  const n = `«${e}» is deprecated and will be removed in the next major release. Please use the «${t}» instead.`;
  o && console.warn(n);
}
function Vc(o) {
  try {
    return new URL(o).href;
  } catch {
  }
  return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
}
function Xc(o) {
  return o > 47 && o < 58 || o === 32 || o === 13 || o === 229 || o > 64 && o < 91 || o > 95 && o < 112 || o > 185 && o < 193 || o > 218 && o < 223;
}
const Gc = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
}, Zc = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
let Qc = class {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   * @param operation - promise should be added to queue
   */
  add(e) {
    return new Promise((t, n) => {
      this.completed = this.completed.then(e).then(t).catch(n);
    });
  }
};
function Jc(o, e, t = void 0) {
  let n, r, i, s = null, a = 0;
  t || (t = {});
  const l = function() {
    a = t.leading === !1 ? 0 : Date.now(), s = null, i = o.apply(n, r), s === null && (n = r = null);
  };
  return function() {
    const c = Date.now();
    !a && t.leading === !1 && (a = c);
    const d = e - (c - a);
    return n = this, r = arguments, d <= 0 || d > e ? (s && (clearTimeout(s), s = null), a = c, i = o.apply(n, r), s === null && (n = r = null)) : !s && t.trailing !== !1 && (s = setTimeout(l, d)), i;
  };
}
const ed = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PromiseQueue: Qc,
  beautifyShortcut: Dc,
  cacheable: Ac,
  capitalize: Rc,
  copyTextToClipboard: $c,
  debounce: Hc,
  deepMerge: ko,
  deprecationAssert: Yc,
  getUserOS: rs,
  getValidUrl: Vc,
  isBoolean: Fc,
  isClass: Uc,
  isEmpty: Nc,
  isFunction: is,
  isIosDevice: jc,
  isNumber: zc,
  isObject: pt,
  isPrintableKey: Xc,
  isPromise: Wc,
  isString: Kc,
  isUndefined: qc,
  keyCodes: Gc,
  mouseButtons: Zc,
  notEmpty: Ko,
  throttle: Jc,
  typeOf: ye
}, Symbol.toStringTag, { value: "Module" })), qo = /* @__PURE__ */ Fa(ed);
Object.defineProperty(Wo, "__esModule", { value: !0 });
Wo.containsOnlyInlineElements = nd;
var td = qo, od = Ro;
function nd(o) {
  var e;
  (0, td.isString)(o) ? (e = document.createElement("div"), e.innerHTML = o) : e = o;
  var t = function(n) {
    return !(0, od.blockElements)().includes(n.tagName.toLowerCase()) && Array.from(n.children).every(t);
  };
  return Array.from(e.children).every(t);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.containsOnlyInlineElements = void 0;
  var e = Wo;
  Object.defineProperty(o, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return e.containsOnlyInlineElements;
  } });
})(Pt);
var ss = {}, Yo = {}, At = {}, Vo = {};
Object.defineProperty(Vo, "__esModule", { value: !0 });
Vo.make = rd;
function rd(o, e, t) {
  var n;
  e === void 0 && (e = null), t === void 0 && (t = {});
  var r = document.createElement(o);
  if (Array.isArray(e)) {
    var i = e.filter(function(a) {
      return a !== void 0;
    });
    (n = r.classList).add.apply(n, i);
  } else
    e !== null && r.classList.add(e);
  for (var s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
  return r;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.make = void 0;
  var e = Vo;
  Object.defineProperty(o, "make", { enumerable: !0, get: function() {
    return e.make;
  } });
})(At);
Object.defineProperty(Yo, "__esModule", { value: !0 });
Yo.fragmentToString = sd;
var id = At;
function sd(o) {
  var e = (0, id.make)("div");
  return e.appendChild(o), e.innerHTML;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.fragmentToString = void 0;
  var e = Yo;
  Object.defineProperty(o, "fragmentToString", { enumerable: !0, get: function() {
    return e.fragmentToString;
  } });
})(ss);
var as = {}, Xo = {};
Object.defineProperty(Xo, "__esModule", { value: !0 });
Xo.getContentLength = ld;
var ad = Ie;
function ld(o) {
  var e, t;
  return (0, ad.isNativeInput)(o) ? o.value.length : o.nodeType === Node.TEXT_NODE ? o.length : (t = (e = o.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getContentLength = void 0;
  var e = Xo;
  Object.defineProperty(o, "getContentLength", { enumerable: !0, get: function() {
    return e.getContentLength;
  } });
})(as);
var Go = {}, Zo = {}, ni = Ge && Ge.__spreadArray || function(o, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, r = e.length, i; n < r; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return o.concat(i || Array.prototype.slice.call(e));
};
Object.defineProperty(Zo, "__esModule", { value: !0 });
Zo.getDeepestBlockElements = ls;
var cd = Pt;
function ls(o) {
  return (0, cd.containsOnlyInlineElements)(o) ? [o] : Array.from(o.children).reduce(function(e, t) {
    return ni(ni([], e, !0), ls(t), !0);
  }, []);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getDeepestBlockElements = void 0;
  var e = Zo;
  Object.defineProperty(o, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return e.getDeepestBlockElements;
  } });
})(Go);
var cs = {}, Qo = {}, Nt = {}, Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
Jo.isLineBreakTag = dd;
function dd(o) {
  return [
    "BR",
    "WBR"
  ].includes(o.tagName);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isLineBreakTag = void 0;
  var e = Jo;
  Object.defineProperty(o, "isLineBreakTag", { enumerable: !0, get: function() {
    return e.isLineBreakTag;
  } });
})(Nt);
var jt = {}, en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
en.isSingleTag = ud;
function ud(o) {
  return [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ].includes(o.tagName);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isSingleTag = void 0;
  var e = en;
  Object.defineProperty(o, "isSingleTag", { enumerable: !0, get: function() {
    return e.isSingleTag;
  } });
})(jt);
Object.defineProperty(Qo, "__esModule", { value: !0 });
Qo.getDeepestNode = ds;
var hd = Ie, pd = Nt, fd = jt;
function ds(o, e) {
  e === void 0 && (e = !1);
  var t = e ? "lastChild" : "firstChild", n = e ? "previousSibling" : "nextSibling";
  if (o.nodeType === Node.ELEMENT_NODE && o[t]) {
    var r = o[t];
    if ((0, fd.isSingleTag)(r) && !(0, hd.isNativeInput)(r) && !(0, pd.isLineBreakTag)(r))
      if (r[n])
        r = r[n];
      else if (r.parentNode !== null && r.parentNode[n])
        r = r.parentNode[n];
      else
        return r.parentNode;
    return ds(r, e);
  }
  return o;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getDeepestNode = void 0;
  var e = Qo;
  Object.defineProperty(o, "getDeepestNode", { enumerable: !0, get: function() {
    return e.getDeepestNode;
  } });
})(cs);
var us = {}, tn = {}, rt = Ge && Ge.__spreadArray || function(o, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, r = e.length, i; n < r; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return o.concat(i || Array.prototype.slice.call(e));
};
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.findAllInputs = yd;
var gd = Pt, md = Go, bd = Ao, vd = Ie;
function yd(o) {
  return Array.from(o.querySelectorAll((0, bd.allInputsSelector)())).reduce(function(e, t) {
    return (0, vd.isNativeInput)(t) || (0, gd.containsOnlyInlineElements)(t) ? rt(rt([], e, !0), [t], !1) : rt(rt([], e, !0), (0, md.getDeepestBlockElements)(t), !0);
  }, []);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.findAllInputs = void 0;
  var e = tn;
  Object.defineProperty(o, "findAllInputs", { enumerable: !0, get: function() {
    return e.findAllInputs;
  } });
})(us);
var hs = {}, on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.isCollapsedWhitespaces = kd;
function kd(o) {
  return !/[^\t\n\r ]/.test(o);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isCollapsedWhitespaces = void 0;
  var e = on;
  Object.defineProperty(o, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return e.isCollapsedWhitespaces;
  } });
})(hs);
var nn = {}, rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
rn.isElement = xd;
var wd = qo;
function xd(o) {
  return (0, wd.isNumber)(o) ? !1 : !!o && !!o.nodeType && o.nodeType === Node.ELEMENT_NODE;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isElement = void 0;
  var e = rn;
  Object.defineProperty(o, "isElement", { enumerable: !0, get: function() {
    return e.isElement;
  } });
})(nn);
var ps = {}, sn = {}, an = {}, ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.isLeaf = Ed;
function Ed(o) {
  return o === null ? !1 : o.childNodes.length === 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isLeaf = void 0;
  var e = ln;
  Object.defineProperty(o, "isLeaf", { enumerable: !0, get: function() {
    return e.isLeaf;
  } });
})(an);
var cn = {}, dn = {};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.isNodeEmpty = Bd;
var Cd = Nt, Td = nn, Sd = Ie, _d = jt;
function Bd(o, e) {
  var t = "";
  return (0, _d.isSingleTag)(o) && !(0, Cd.isLineBreakTag)(o) ? !1 : ((0, Td.isElement)(o) && (0, Sd.isNativeInput)(o) ? t = o.value : o.textContent !== null && (t = o.textContent.replace("​", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isNodeEmpty = void 0;
  var e = dn;
  Object.defineProperty(o, "isNodeEmpty", { enumerable: !0, get: function() {
    return e.isNodeEmpty;
  } });
})(cn);
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.isEmpty = Md;
var Od = an, Id = cn;
function Md(o, e) {
  o.normalize();
  for (var t = [o]; t.length > 0; ) {
    var n = t.shift();
    if (n) {
      if (o = n, (0, Od.isLeaf)(o) && !(0, Id.isNodeEmpty)(o, e))
        return !1;
      t.push.apply(t, Array.from(o.childNodes));
    }
  }
  return !0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isEmpty = void 0;
  var e = sn;
  Object.defineProperty(o, "isEmpty", { enumerable: !0, get: function() {
    return e.isEmpty;
  } });
})(ps);
var fs = {}, un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
un.isFragment = Pd;
var Ld = qo;
function Pd(o) {
  return (0, Ld.isNumber)(o) ? !1 : !!o && !!o.nodeType && o.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isFragment = void 0;
  var e = un;
  Object.defineProperty(o, "isFragment", { enumerable: !0, get: function() {
    return e.isFragment;
  } });
})(fs);
var gs = {}, hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.isHTMLString = Nd;
var Ad = At;
function Nd(o) {
  var e = (0, Ad.make)("div");
  return e.innerHTML = o, e.childElementCount > 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isHTMLString = void 0;
  var e = hn;
  Object.defineProperty(o, "isHTMLString", { enumerable: !0, get: function() {
    return e.isHTMLString;
  } });
})(gs);
var ms = {}, pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.offset = jd;
function jd(o) {
  var e = o.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, n = window.pageYOffset || document.documentElement.scrollTop, r = e.top + n, i = e.left + t;
  return {
    top: r,
    left: i,
    bottom: r + e.height,
    right: i + e.width
  };
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.offset = void 0;
  var e = pn;
  Object.defineProperty(o, "offset", { enumerable: !0, get: function() {
    return e.offset;
  } });
})(ms);
var bs = {}, fn = {};
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.prepend = Dd;
function Dd(o, e) {
  Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
    return o.prepend(t);
  })) : o.prepend(e);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.prepend = void 0;
  var e = fn;
  Object.defineProperty(o, "prepend", { enumerable: !0, get: function() {
    return e.prepend;
  } });
})(bs);
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.prepend = o.offset = o.make = o.isLineBreakTag = o.isSingleTag = o.isNodeEmpty = o.isLeaf = o.isHTMLString = o.isFragment = o.isEmpty = o.isElement = o.isContentEditable = o.isCollapsedWhitespaces = o.findAllInputs = o.isNativeInput = o.allInputsSelector = o.getDeepestNode = o.getDeepestBlockElements = o.getContentLength = o.fragmentToString = o.containsOnlyInlineElements = o.canSetCaret = o.calculateBaseline = o.blockElements = o.append = void 0;
  var e = Ao;
  Object.defineProperty(o, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
  var t = Ie;
  Object.defineProperty(o, "isNativeInput", { enumerable: !0, get: function() {
    return t.isNativeInput;
  } });
  var n = ts;
  Object.defineProperty(o, "append", { enumerable: !0, get: function() {
    return n.append;
  } });
  var r = Ro;
  Object.defineProperty(o, "blockElements", { enumerable: !0, get: function() {
    return r.blockElements;
  } });
  var i = os;
  Object.defineProperty(o, "calculateBaseline", { enumerable: !0, get: function() {
    return i.calculateBaseline;
  } });
  var s = ns;
  Object.defineProperty(o, "canSetCaret", { enumerable: !0, get: function() {
    return s.canSetCaret;
  } });
  var a = Pt;
  Object.defineProperty(o, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return a.containsOnlyInlineElements;
  } });
  var l = ss;
  Object.defineProperty(o, "fragmentToString", { enumerable: !0, get: function() {
    return l.fragmentToString;
  } });
  var c = as;
  Object.defineProperty(o, "getContentLength", { enumerable: !0, get: function() {
    return c.getContentLength;
  } });
  var d = Go;
  Object.defineProperty(o, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return d.getDeepestBlockElements;
  } });
  var u = cs;
  Object.defineProperty(o, "getDeepestNode", { enumerable: !0, get: function() {
    return u.getDeepestNode;
  } });
  var h = us;
  Object.defineProperty(o, "findAllInputs", { enumerable: !0, get: function() {
    return h.findAllInputs;
  } });
  var g = hs;
  Object.defineProperty(o, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return g.isCollapsedWhitespaces;
  } });
  var p = Uo;
  Object.defineProperty(o, "isContentEditable", { enumerable: !0, get: function() {
    return p.isContentEditable;
  } });
  var v = nn;
  Object.defineProperty(o, "isElement", { enumerable: !0, get: function() {
    return v.isElement;
  } });
  var _ = ps;
  Object.defineProperty(o, "isEmpty", { enumerable: !0, get: function() {
    return _.isEmpty;
  } });
  var B = fs;
  Object.defineProperty(o, "isFragment", { enumerable: !0, get: function() {
    return B.isFragment;
  } });
  var k = gs;
  Object.defineProperty(o, "isHTMLString", { enumerable: !0, get: function() {
    return k.isHTMLString;
  } });
  var P = an;
  Object.defineProperty(o, "isLeaf", { enumerable: !0, get: function() {
    return P.isLeaf;
  } });
  var M = cn;
  Object.defineProperty(o, "isNodeEmpty", { enumerable: !0, get: function() {
    return M.isNodeEmpty;
  } });
  var N = Nt;
  Object.defineProperty(o, "isLineBreakTag", { enumerable: !0, get: function() {
    return N.isLineBreakTag;
  } });
  var U = jt;
  Object.defineProperty(o, "isSingleTag", { enumerable: !0, get: function() {
    return U.isSingleTag;
  } });
  var G = At;
  Object.defineProperty(o, "make", { enumerable: !0, get: function() {
    return G.make;
  } });
  var y = ms;
  Object.defineProperty(o, "offset", { enumerable: !0, get: function() {
    return y.offset;
  } });
  var m = bs;
  Object.defineProperty(o, "prepend", { enumerable: !0, get: function() {
    return m.prepend;
  } });
})(Oe);
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.getContenteditableSlice = $d;
var Rd = Oe;
function $d(o, e, t, n, r) {
  var i;
  r === void 0 && (r = !1);
  var s = document.createRange();
  if (n === "left" ? (s.setStart(o, 0), s.setEnd(e, t)) : (s.setStart(e, t), s.setEnd(o, o.childNodes.length)), r === !0) {
    var a = s.extractContents();
    return (0, Rd.fragmentToString)(a);
  }
  var l = s.cloneContents(), c = document.createElement("div");
  c.appendChild(l);
  var d = (i = c.textContent) !== null && i !== void 0 ? i : "";
  return d;
}
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.checkContenteditableSliceForEmptiness = Ud;
var Hd = Oe, Fd = Dt;
function Ud(o, e, t, n) {
  var r = (0, Fd.getContenteditableSlice)(o, e, t, n);
  return (0, Hd.isCollapsedWhitespaces)(r);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.checkContenteditableSliceForEmptiness = void 0;
  var e = Lt;
  Object.defineProperty(o, "checkContenteditableSliceForEmptiness", { enumerable: !0, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
})(Po);
var vs = {};
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getContenteditableSlice = void 0;
  var e = Dt;
  Object.defineProperty(o, "getContenteditableSlice", { enumerable: !0, get: function() {
    return e.getContenteditableSlice;
  } });
})(vs);
var ys = {}, gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.focus = Wd;
var zd = Oe;
function Wd(o, e) {
  var t, n;
  if (e === void 0 && (e = !0), (0, zd.isNativeInput)(o)) {
    o.focus();
    var r = e ? 0 : o.value.length;
    o.setSelectionRange(r, r);
  } else {
    var i = document.createRange(), s = window.getSelection();
    if (!s)
      return;
    var a = function(h) {
      var g = document.createTextNode("");
      h.appendChild(g), i.setStart(g, 0), i.setEnd(g, 0);
    }, l = function(h) {
      return h != null;
    }, c = o.childNodes, d = e ? c[0] : c[c.length - 1];
    if (l(d)) {
      for (; l(d) && d.nodeType !== Node.TEXT_NODE; )
        d = e ? d.firstChild : d.lastChild;
      if (l(d) && d.nodeType === Node.TEXT_NODE) {
        var u = (n = (t = d.textContent) === null || t === void 0 ? void 0 : t.length) !== null && n !== void 0 ? n : 0, r = e ? 0 : u;
        i.setStart(d, r), i.setEnd(d, r);
      } else
        a(o);
    } else
      a(o);
    s.removeAllRanges(), s.addRange(i);
  }
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.focus = void 0;
  var e = gn;
  Object.defineProperty(o, "focus", { enumerable: !0, get: function() {
    return e.focus;
  } });
})(ys);
var mn = {}, Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
Rt.getCaretNodeAndOffset = Kd;
function Kd() {
  var o = window.getSelection();
  if (o === null)
    return [null, 0];
  var e = o.focusNode, t = o.focusOffset;
  return e === null ? [null, 0] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] !== void 0 ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], e.textContent !== null && (t = e.textContent.length))), [e, t]);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getCaretNodeAndOffset = void 0;
  var e = Rt;
  Object.defineProperty(o, "getCaretNodeAndOffset", { enumerable: !0, get: function() {
    return e.getCaretNodeAndOffset;
  } });
})(mn);
var ks = {}, $t = {};
Object.defineProperty($t, "__esModule", { value: !0 });
$t.getRange = qd;
function qd() {
  var o = window.getSelection();
  return o && o.rangeCount ? o.getRangeAt(0) : null;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getRange = void 0;
  var e = $t;
  Object.defineProperty(o, "getRange", { enumerable: !0, get: function() {
    return e.getRange;
  } });
})(ks);
var ws = {}, bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.isCaretAtEndOfInput = Xd;
var ri = Oe, Yd = mn, Vd = Po;
function Xd(o) {
  var e = (0, ri.getDeepestNode)(o, !0);
  if (e === null)
    return !0;
  if ((0, ri.isNativeInput)(e))
    return e.selectionEnd === e.value.length;
  var t = (0, Yd.getCaretNodeAndOffset)(), n = t[0], r = t[1];
  return n === null ? !1 : (0, Vd.checkContenteditableSliceForEmptiness)(o, n, r, "right");
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isCaretAtEndOfInput = void 0;
  var e = bn;
  Object.defineProperty(o, "isCaretAtEndOfInput", { enumerable: !0, get: function() {
    return e.isCaretAtEndOfInput;
  } });
})(ws);
var xs = {}, vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.isCaretAtStartOfInput = Qd;
var it = Oe, Gd = Rt, Zd = Lt;
function Qd(o) {
  var e = (0, it.getDeepestNode)(o);
  if (e === null || (0, it.isEmpty)(o))
    return !0;
  if ((0, it.isNativeInput)(e))
    return e.selectionEnd === 0;
  if ((0, it.isEmpty)(o))
    return !0;
  var t = (0, Gd.getCaretNodeAndOffset)(), n = t[0], r = t[1];
  return n === null ? !1 : (0, Zd.checkContenteditableSliceForEmptiness)(o, n, r, "left");
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isCaretAtStartOfInput = void 0;
  var e = vn;
  Object.defineProperty(o, "isCaretAtStartOfInput", { enumerable: !0, get: function() {
    return e.isCaretAtStartOfInput;
  } });
})(xs);
var Es = {}, yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
yn.save = tu;
var Jd = Oe, eu = $t;
function tu() {
  var o = (0, eu.getRange)(), e = (0, Jd.make)("span");
  if (e.id = "cursor", e.hidden = !0, !!o)
    return o.insertNode(e), function() {
      var t = window.getSelection();
      t && (o.setStartAfter(e), o.setEndAfter(e), t.removeAllRanges(), t.addRange(o), setTimeout(function() {
        e.remove();
      }, 150));
    };
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.save = void 0;
  var e = yn;
  Object.defineProperty(o, "save", { enumerable: !0, get: function() {
    return e.save;
  } });
})(Es);
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.save = o.isCaretAtStartOfInput = o.isCaretAtEndOfInput = o.getRange = o.getCaretNodeAndOffset = o.focus = o.getContenteditableSlice = o.checkContenteditableSliceForEmptiness = void 0;
  var e = Po;
  Object.defineProperty(o, "checkContenteditableSliceForEmptiness", { enumerable: !0, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
  var t = vs;
  Object.defineProperty(o, "getContenteditableSlice", { enumerable: !0, get: function() {
    return t.getContenteditableSlice;
  } });
  var n = ys;
  Object.defineProperty(o, "focus", { enumerable: !0, get: function() {
    return n.focus;
  } });
  var r = mn;
  Object.defineProperty(o, "getCaretNodeAndOffset", { enumerable: !0, get: function() {
    return r.getCaretNodeAndOffset;
  } });
  var i = ks;
  Object.defineProperty(o, "getRange", { enumerable: !0, get: function() {
    return i.getRange;
  } });
  var s = ws;
  Object.defineProperty(o, "isCaretAtEndOfInput", { enumerable: !0, get: function() {
    return s.isCaretAtEndOfInput;
  } });
  var a = xs;
  Object.defineProperty(o, "isCaretAtStartOfInput", { enumerable: !0, get: function() {
    return a.isCaretAtStartOfInput;
  } });
  var l = Es;
  Object.defineProperty(o, "save", { enumerable: !0, get: function() {
    return l.save;
  } });
})(es);
class ou extends O {
  /**
   * All keydowns on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  keydown(e) {
    switch (this.beforeKeydownProcessing(e), e.keyCode) {
      case S.BACKSPACE:
        this.backspace(e);
        break;
      case S.DELETE:
        this.delete(e);
        break;
      case S.ENTER:
        this.enter(e);
        break;
      case S.DOWN:
      case S.RIGHT:
        this.arrowRightAndDown(e);
        break;
      case S.UP:
      case S.LEFT:
        this.arrowLeftAndUp(e);
        break;
      case S.TAB:
        this.tabPressed(e);
        break;
    }
    e.key === "/" && !e.ctrlKey && !e.metaKey && this.slashPressed(e), e.code === "Slash" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.commandSlashPressed());
  }
  /**
   * Fires on keydown before event processing
   *
   * @param {KeyboardEvent} event - keydown
   */
  beforeKeydownProcessing(e) {
    this.needToolbarClosing(e) && wi(e.keyCode) && (this.Editor.Toolbar.close(), e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || this.Editor.BlockSelection.clearSelection(e));
  }
  /**
   * Key up on Block:
   * - shows Inline Toolbar if something selected
   * - shows conversion toolbar with 85% of block selection
   *
   * @param {KeyboardEvent} event - keyup event
   */
  keyup(e) {
    e.shiftKey || this.Editor.UI.checkEmptiness();
  }
  /**
   * Add drop target styles
   *
   * @param {DragEvent} event - drag over event
   */
  dragOver(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = !0;
  }
  /**
   * Remove drop target style
   *
   * @param {DragEvent} event - drag leave event
   */
  dragLeave(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = !1;
  }
  /**
   * Copying selected blocks
   * Before putting to the clipboard we sanitize all blocks and then copy to the clipboard
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandC(e) {
    const { BlockSelection: t } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e);
  }
  /**
   * Copy and Delete selected Blocks
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandX(e) {
    const { BlockSelection: t, BlockManager: n, Caret: r } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e).then(() => {
      const i = n.removeSelectedBlocks(), s = n.insertDefaultBlockAtIndex(i, !0);
      r.setToBlock(s, r.positions.START), t.clearSelection(e);
    });
  }
  /**
   * Tab pressed inside a Block.
   *
   * @param {KeyboardEvent} event - keydown
   */
  tabPressed(e) {
    const { InlineToolbar: t, Caret: n } = this.Editor;
    t.opened || (e.shiftKey ? n.navigatePrevious(!0) : n.navigateNext(!0)) && e.preventDefault();
  }
  /**
   * '/' + 'command' keydown inside a Block
   */
  commandSlashPressed() {
    this.Editor.BlockSelection.selectedBlocks.length > 1 || this.activateBlockSettings();
  }
  /**
   * '/' keydown inside a Block
   *
   * @param event - keydown
   */
  slashPressed(e) {
    !this.Editor.UI.nodes.wrapper.contains(e.target) || !this.Editor.BlockManager.currentBlock.isEmpty || (e.preventDefault(), this.Editor.Caret.insertContentAtCaretPosition("/"), this.activateToolbox());
  }
  /**
   * ENTER pressed on block
   *
   * @param {KeyboardEvent} event - keydown
   */
  enter(e) {
    const { BlockManager: t, UI: n } = this.Editor, r = t.currentBlock;
    if (r === void 0 || r.tool.isLineBreaksEnabled || n.someToolbarOpened && n.someFlipperButtonFocused || e.shiftKey && !go)
      return;
    let i = r;
    r.currentInput !== void 0 && ut(r.currentInput) && !r.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : r.currentInput && ht(r.currentInput) ? i = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : i = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(i), this.Editor.Toolbar.moveAndOpen(i), e.preventDefault();
  }
  /**
   * Handle backspace keydown on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  backspace(e) {
    const { BlockManager: t, Caret: n } = this.Editor, { currentBlock: r, previousBlock: i } = t;
    if (!(r === void 0 || !C.isCollapsed || !r.currentInput || !ut(r.currentInput))) {
      if (e.preventDefault(), this.Editor.Toolbar.close(), r.currentInput !== r.firstInput) {
        n.navigatePrevious();
        return;
      }
      if (i !== null) {
        if (i.isEmpty) {
          t.removeBlock(i);
          return;
        }
        if (r.isEmpty) {
          t.removeBlock(r);
          const s = t.currentBlock;
          n.setToBlock(s, n.positions.END);
          return;
        }
        Qr(i, r) ? this.mergeBlocks(i, r) : n.setToBlock(i, n.positions.END);
      }
    }
  }
  /**
   * Handles delete keydown on Block
   * Removes char after the caret.
   * If caret is at the end of the block, merge next block with current
   *
   * @param {KeyboardEvent} event - keydown
   */
  delete(e) {
    const { BlockManager: t, Caret: n } = this.Editor, { currentBlock: r, nextBlock: i } = t;
    if (!(!C.isCollapsed || !ht(r.currentInput))) {
      if (e.preventDefault(), this.Editor.Toolbar.close(), r.currentInput !== r.lastInput) {
        n.navigateNext();
        return;
      }
      if (i !== null) {
        if (i.isEmpty) {
          t.removeBlock(i);
          return;
        }
        if (r.isEmpty) {
          t.removeBlock(r), n.setToBlock(i, n.positions.START);
          return;
        }
        Qr(r, i) ? this.mergeBlocks(r, i) : n.setToBlock(i, n.positions.START);
      }
    }
  }
  /**
   * Merge passed Blocks
   *
   * @param targetBlock - to which Block we want to merge
   * @param blockToMerge - what Block we want to merge
   */
  mergeBlocks(e, t) {
    const { BlockManager: n, Toolbar: r } = this.Editor;
    e.lastInput !== void 0 && (es.focus(e.lastInput, !1), n.mergeBlocks(e, t).then(() => {
      r.close();
    }));
  }
  /**
   * Handle right and down keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowRightAndDown(e) {
    const t = Tt.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === S.TAB);
    if (this.Editor.UI.someToolbarOpened && t)
      return;
    this.Editor.Toolbar.close();
    const { currentBlock: n } = this.Editor.BlockManager, r = (n?.currentInput !== void 0 ? ht(n.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === S.DOWN && r) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState();
      return;
    }
    if (e.keyCode === S.DOWN || e.keyCode === S.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) {
      e.preventDefault();
      return;
    }
    kt(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Handle left and up keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowLeftAndUp(e) {
    if (this.Editor.UI.someToolbarOpened) {
      if (Tt.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === S.TAB))
        return;
      this.Editor.UI.closeAllToolbars();
    }
    this.Editor.Toolbar.close();
    const { currentBlock: t } = this.Editor.BlockManager, n = (t?.currentInput !== void 0 ? ut(t.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === S.UP && n) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState(!1);
      return;
    }
    if (e.keyCode === S.UP || e.keyCode === S.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) {
      e.preventDefault();
      return;
    }
    kt(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Cases when we need to close Toolbar
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  needToolbarClosing(e) {
    const t = e.keyCode === S.ENTER && this.Editor.Toolbar.toolbox.opened, n = e.keyCode === S.ENTER && this.Editor.BlockSettings.opened, r = e.keyCode === S.ENTER && this.Editor.InlineToolbar.opened, i = e.keyCode === S.TAB;
    return !(e.shiftKey || i || t || n || r);
  }
  /**
   * If Toolbox is not open, then just open it and show plus button
   */
  activateToolbox() {
    this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open();
  }
  /**
   * Open Toolbar and show BlockSettings before flipping Tools
   */
  activateBlockSettings() {
    this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.opened || this.Editor.BlockSettings.open();
  }
}
let io = class {
  /**
   * @class
   * @param {HTMLElement} workingArea — editor`s working node
   */
  constructor(e) {
    this.blocks = [], this.workingArea = e;
  }
  /**
   * Get length of Block instances array
   *
   * @returns {number}
   */
  get length() {
    return this.blocks.length;
  }
  /**
   * Get Block instances array
   *
   * @returns {Block[]}
   */
  get array() {
    return this.blocks;
  }
  /**
   * Get blocks html elements array
   *
   * @returns {HTMLElement[]}
   */
  get nodes() {
    return xi(this.workingArea.children);
  }
  /**
   * Proxy trap to implement array-like setter
   *
   * @example
   * blocks[0] = new Block(...)
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — block index or any Blocks class property key to set
   * @param {Block} value — value to set
   * @returns {boolean}
   */
  static set(e, t, n) {
    return isNaN(Number(t)) ? (Reflect.set(e, t, n), !0) : (e.insert(+t, n), !0);
  }
  /**
   * Proxy trap to implement array-like getter
   *
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — Blocks class property key
   * @returns {Block|*}
   */
  static get(e, t) {
    return isNaN(Number(t)) ? Reflect.get(e, t) : e.get(+t);
  }
  /**
   * Push new Block to the blocks array and append it to working area
   *
   * @param {Block} block - Block to add
   */
  push(e) {
    this.blocks.push(e), this.insertToDOM(e);
  }
  /**
   * Swaps blocks with indexes first and second
   *
   * @param {number} first - first block index
   * @param {number} second - second block index
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    const n = this.blocks[t];
    f.swap(this.blocks[e].holder, n.holder), this.blocks[t] = this.blocks[e], this.blocks[e] = n;
  }
  /**
   * Move a block from one to another index
   *
   * @param {number} toIndex - new index of the block
   * @param {number} fromIndex - block to move
   */
  move(e, t) {
    const n = this.blocks.splice(t, 1)[0], r = e - 1, i = Math.max(0, r), s = this.blocks[i];
    e > 0 ? this.insertToDOM(n, "afterend", s) : this.insertToDOM(n, "beforebegin", s), this.blocks.splice(e, 0, n);
    const a = this.composeBlockEvent("move", {
      fromIndex: t,
      toIndex: e
    });
    n.call(he.MOVED, a);
  }
  /**
   * Insert new Block at passed index
   *
   * @param {number} index — index to insert Block
   * @param {Block} block — Block to insert
   * @param {boolean} replace — it true, replace block on given index
   */
  insert(e, t, n = !1) {
    if (!this.length) {
      this.push(t);
      return;
    }
    e > this.length && (e = this.length), n && (this.blocks[e].holder.remove(), this.blocks[e].call(he.REMOVED));
    const r = n ? 1 : 0;
    if (this.blocks.splice(e, r, t), e > 0) {
      const i = this.blocks[e - 1];
      this.insertToDOM(t, "afterend", i);
    } else {
      const i = this.blocks[e + 1];
      i ? this.insertToDOM(t, "beforebegin", i) : this.insertToDOM(t);
    }
  }
  /**
   * Replaces block under passed index with passed block
   *
   * @param index - index of existed block
   * @param block - new block
   */
  replace(e, t) {
    if (this.blocks[e] === void 0)
      throw Error("Incorrect index");
    this.blocks[e].holder.replaceWith(t.holder), this.blocks[e] = t;
  }
  /**
   * Inserts several blocks at once
   *
   * @param blocks - blocks to insert
   * @param index - index to insert blocks at
   */
  insertMany(e, t) {
    const n = new DocumentFragment();
    for (const r of e)
      n.appendChild(r.holder);
    if (this.length > 0) {
      if (t > 0) {
        const r = Math.min(t - 1, this.length - 1);
        this.blocks[r].holder.after(n);
      } else
        t === 0 && this.workingArea.prepend(n);
      this.blocks.splice(t, 0, ...e);
    } else
      this.blocks.push(...e), this.workingArea.appendChild(n);
    e.forEach((r) => r.call(he.RENDERED));
  }
  /**
   * Remove block
   *
   * @param {number} index - index of Block to remove
   */
  remove(e) {
    isNaN(e) && (e = this.length - 1), this.blocks[e].holder.remove(), this.blocks[e].call(he.REMOVED), this.blocks.splice(e, 1);
  }
  /**
   * Remove all blocks
   */
  removeAll() {
    this.workingArea.innerHTML = "", this.blocks.forEach((e) => e.call(he.REMOVED)), this.blocks.length = 0;
  }
  /**
   * Insert Block after passed target
   *
   * @todo decide if this method is necessary
   * @param {Block} targetBlock — target after which Block should be inserted
   * @param {Block} newBlock — Block to insert
   */
  insertAfter(e, t) {
    const n = this.blocks.indexOf(e);
    this.insert(n + 1, t);
  }
  /**
   * Get Block by index
   *
   * @param {number} index — Block index
   * @returns {Block}
   */
  get(e) {
    return this.blocks[e];
  }
  /**
   * Return index of passed Block
   *
   * @param {Block} block - Block to find
   * @returns {number}
   */
  indexOf(e) {
    return this.blocks.indexOf(e);
  }
  /**
   * Insert new Block into DOM
   *
   * @param {Block} block - Block to insert
   * @param {InsertPosition} position — insert position (if set, will use insertAdjacentElement)
   * @param {Block} target — Block related to position
   */
  insertToDOM(e, t, n) {
    t ? n.holder.insertAdjacentElement(t, e.holder) : this.workingArea.appendChild(e.holder), e.call(he.RENDERED);
  }
  /**
   * Composes Block event with passed type and details
   *
   * @param {string} type - event type
   * @param {object} detail - event detail
   */
  composeBlockEvent(e, t) {
    return new CustomEvent(e, {
      detail: t
    });
  }
};
const ii = "block-removed", si = "block-added", nu = "block-moved", ai = "block-changed";
class ru {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   *
   * @param operation - promise should be added to queue
   */
  add(e) {
    return new Promise((t, n) => {
      this.completed = this.completed.then(e).then(t).catch(n);
    });
  }
}
class iu extends O {
  constructor() {
    super(...arguments), this._currentBlockIndex = -1, this._blocks = null;
  }
  /**
   * Returns current Block index
   *
   * @returns {number}
   */
  get currentBlockIndex() {
    return this._currentBlockIndex;
  }
  /**
   * Set current Block index and fire Block lifecycle callbacks
   *
   * @param {number} newIndex - index of Block to set as current
   */
  set currentBlockIndex(e) {
    this._currentBlockIndex = e;
  }
  /**
   * returns first Block
   *
   * @returns {Block}
   */
  get firstBlock() {
    return this._blocks[0];
  }
  /**
   * returns last Block
   *
   * @returns {Block}
   */
  get lastBlock() {
    return this._blocks[this._blocks.length - 1];
  }
  /**
   * Get current Block instance
   *
   * @returns {Block}
   */
  get currentBlock() {
    return this._blocks[this.currentBlockIndex];
  }
  /**
   * Set passed Block as a current
   *
   * @param block - block to set as a current
   */
  set currentBlock(e) {
    this.currentBlockIndex = this.getBlockIndex(e);
  }
  /**
   * Returns next Block instance
   *
   * @returns {Block|null}
   */
  get nextBlock() {
    return this.currentBlockIndex === this._blocks.length - 1 ? null : this._blocks[this.currentBlockIndex + 1];
  }
  /**
   * Return first Block with inputs after current Block
   *
   * @returns {Block | undefined}
   */
  get nextContentfulBlock() {
    return this.blocks.slice(this.currentBlockIndex + 1).find((e) => !!e.inputs.length);
  }
  /**
   * Return first Block with inputs before current Block
   *
   * @returns {Block | undefined}
   */
  get previousContentfulBlock() {
    return this.blocks.slice(0, this.currentBlockIndex).reverse().find((e) => !!e.inputs.length);
  }
  /**
   * Returns previous Block instance
   *
   * @returns {Block|null}
   */
  get previousBlock() {
    return this.currentBlockIndex === 0 ? null : this._blocks[this.currentBlockIndex - 1];
  }
  /**
   * Get array of Block instances
   *
   * @returns {Block[]} {@link Blocks#array}
   */
  get blocks() {
    return this._blocks.array;
  }
  /**
   * Check if each Block is empty
   *
   * @returns {boolean}
   */
  get isEditorEmpty() {
    return this.blocks.every((e) => e.isEmpty);
  }
  /**
   * Should be called after Editor.UI preparation
   * Define this._blocks property
   */
  prepare() {
    const e = new io(this.Editor.UI.nodes.redactor);
    this._blocks = new Proxy(e, {
      set: io.set,
      get: io.get
    }), this.listeners.on(
      document,
      "copy",
      (t) => this.Editor.BlockEvents.handleCommandC(t)
    );
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - Unbind event handlers from created Blocks
   *
   * if readOnly is false:
   *  - Bind event handlers to all existing Blocks
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Creates Block instance by tool name
   *
   * @param {object} options - block creation options
   * @param {string} options.tool - tools passed in editor config {@link EditorConfig#tools}
   * @param {string} [options.id] - unique id for this block
   * @param {BlockToolData} [options.data] - constructor params
   * @returns {Block}
   */
  composeBlock({
    tool: e,
    data: t = {},
    id: n = void 0,
    tunes: r = {}
  }) {
    const i = this.Editor.ReadOnly.isEnabled, s = this.Editor.Tools.blockTools.get(e), a = new fe({
      id: n,
      data: t,
      tool: s,
      api: this.Editor.API,
      readOnly: i,
      tunesData: r
    }, this.eventsDispatcher);
    return i || window.requestIdleCallback(() => {
      this.bindBlockEvents(a);
    }, { timeout: 2e3 }), a;
  }
  /**
   * Insert new block into _blocks
   *
   * @param {object} options - insert options
   * @param {string} [options.id] - block's unique id
   * @param {string} [options.tool] - plugin name, by default method inserts the default block type
   * @param {object} [options.data] - plugin data
   * @param {number} [options.index] - index where to insert new Block
   * @param {boolean} [options.needToFocus] - flag shows if needed to update current Block index
   * @param {boolean} [options.replace] - flag shows if block by passed index should be replaced with inserted one
   * @returns {Block}
   */
  insert({
    id: e = void 0,
    tool: t = this.config.defaultBlock,
    data: n = {},
    index: r,
    needToFocus: i = !0,
    replace: s = !1,
    tunes: a = {}
  } = {}) {
    let l = r;
    l === void 0 && (l = this.currentBlockIndex + (s ? 0 : 1));
    const c = this.composeBlock({
      id: e,
      tool: t,
      data: n,
      tunes: a
    });
    return s && this.blockDidMutated(ii, this.getBlockByIndex(l), {
      index: l
    }), this._blocks.insert(l, c, s), this.blockDidMutated(si, c, {
      index: l
    }), i ? this.currentBlockIndex = l : l <= this.currentBlockIndex && this.currentBlockIndex++, c;
  }
  /**
   * Inserts several blocks at once
   *
   * @param blocks - blocks to insert
   * @param index - index where to insert
   */
  insertMany(e, t = 0) {
    this._blocks.insertMany(e, t);
  }
  /**
   * Update Block data.
   *
   * Currently we don't have an 'update' method in the Tools API, so we just create a new block with the same id and type
   * Should not trigger 'block-removed' or 'block-added' events.
   *
   * If neither data nor tunes is provided, return the provided block instead.
   *
   * @param block - block to update
   * @param data - (optional) new data
   * @param tunes - (optional) tune data
   */
  async update(e, t, n) {
    if (!t && !n)
      return e;
    const r = await e.data, i = this.composeBlock({
      id: e.id,
      tool: e.name,
      data: Object.assign({}, r, t ?? {}),
      tunes: n ?? e.tunes
    }), s = this.getBlockIndex(e);
    return this._blocks.replace(s, i), this.blockDidMutated(ai, i, {
      index: s
    }), i;
  }
  /**
   * Replace passed Block with the new one with specified Tool and data
   *
   * @param block - block to replace
   * @param newTool - new Tool name
   * @param data - new Tool data
   */
  replace(e, t, n) {
    const r = this.getBlockIndex(e);
    return this.insert({
      tool: t,
      data: n,
      index: r,
      replace: !0
    });
  }
  /**
   * Insert pasted content. Call onPaste callback after insert.
   *
   * @param {string} toolName - name of Tool to insert
   * @param {PasteEvent} pasteEvent - pasted data
   * @param {boolean} replace - should replace current block
   */
  paste(e, t, n = !1) {
    const r = this.insert({
      tool: e,
      replace: n
    });
    try {
      window.requestIdleCallback(() => {
        r.call(he.ON_PASTE, t);
      });
    } catch (i) {
      L(`${e}: onPaste callback call is failed`, "error", i);
    }
    return r;
  }
  /**
   * Insert new default block at passed index
   *
   * @param {number} index - index where Block should be inserted
   * @param {boolean} needToFocus - if true, updates current Block index
   *
   * TODO: Remove method and use insert() with index instead (?)
   * @returns {Block} inserted Block
   */
  insertDefaultBlockAtIndex(e, t = !1) {
    const n = this.composeBlock({ tool: this.config.defaultBlock });
    return this._blocks[e] = n, this.blockDidMutated(si, n, {
      index: e
    }), t ? this.currentBlockIndex = e : e <= this.currentBlockIndex && this.currentBlockIndex++, n;
  }
  /**
   * Always inserts at the end
   *
   * @returns {Block}
   */
  insertAtEnd() {
    return this.currentBlockIndex = this.blocks.length - 1, this.insert();
  }
  /**
   * Merge two blocks
   *
   * @param {Block} targetBlock - previous block will be append to this block
   * @param {Block} blockToMerge - block that will be merged with target block
   * @returns {Promise} - the sequence that can be continued
   */
  async mergeBlocks(e, t) {
    let n;
    if (e.name === t.name && e.mergeable) {
      const r = await t.data;
      if (J(r)) {
        console.error("Could not merge Block. Failed to extract original Block data.");
        return;
      }
      const [i] = So([r], e.tool.sanitizeConfig);
      n = i;
    } else if (e.mergeable && xt(t, "export") && xt(e, "import")) {
      const r = await t.exportDataAsString(), i = se(r, e.tool.sanitizeConfig);
      n = Jr(i, e.tool.conversionConfig);
    }
    n !== void 0 && (await e.mergeWith(n), this.removeBlock(t), this.currentBlockIndex = this._blocks.indexOf(e));
  }
  /**
   * Remove passed Block
   *
   * @param block - Block to remove
   * @param addLastBlock - if true, adds new default block at the end. @todo remove this logic and use event-bus instead
   */
  removeBlock(e, t = !0) {
    return new Promise((n) => {
      const r = this._blocks.indexOf(e);
      if (!this.validateIndex(r))
        throw new Error("Can't find a Block to remove");
      this._blocks.remove(r), e.destroy(), this.blockDidMutated(ii, e, {
        index: r
      }), this.currentBlockIndex >= r && this.currentBlockIndex--, this.blocks.length ? r === 0 && (this.currentBlockIndex = 0) : (this.unsetCurrentBlock(), t && this.insert()), n();
    });
  }
  /**
   * Remove only selected Blocks
   * and returns first Block index where started removing...
   *
   * @returns {number|undefined}
   */
  removeSelectedBlocks() {
    let e;
    for (let t = this.blocks.length - 1; t >= 0; t--)
      this.blocks[t].selected && (this.removeBlock(this.blocks[t]), e = t);
    return e;
  }
  /**
   * Attention!
   * After removing insert the new default typed Block and focus on it
   * Removes all blocks
   */
  removeAllBlocks() {
    for (let e = this.blocks.length - 1; e >= 0; e--)
      this._blocks.remove(e);
    this.unsetCurrentBlock(), this.insert(), this.currentBlock.firstInput.focus();
  }
  /**
   * Split current Block
   * 1. Extract content from Caret position to the Block`s end
   * 2. Insert a new Block below current one with extracted content
   *
   * @returns {Block}
   */
  split() {
    const e = this.Editor.Caret.extractFragmentFromCaretPosition(), t = f.make("div");
    e && t.appendChild(e);
    const n = {
      text: f.isEmpty(t) ? "" : t.innerHTML
    };
    return this.insert({ data: n });
  }
  /**
   * Returns Block by passed index
   *
   * @param {number} index - index to get. -1 to get last
   * @returns {Block}
   */
  getBlockByIndex(e) {
    return e === -1 && (e = this._blocks.length - 1), this._blocks[e];
  }
  /**
   * Returns an index for passed Block
   *
   * @param block - block to find index
   */
  getBlockIndex(e) {
    return this._blocks.indexOf(e);
  }
  /**
   * Returns the Block by passed id
   *
   * @param id - id of block to get
   * @returns {Block}
   */
  getBlockById(e) {
    return this._blocks.array.find((t) => t.id === e);
  }
  /**
   * Get Block instance by html element
   *
   * @param {Node} element - html element to get Block by
   */
  getBlock(e) {
    f.isElement(e) || (e = e.parentNode);
    const t = this._blocks.nodes, n = e.closest(`.${fe.CSS.wrapper}`), r = t.indexOf(n);
    if (r >= 0)
      return this._blocks[r];
  }
  /**
   * 1) Find first-level Block from passed child Node
   * 2) Mark it as current
   *
   * @param {Node} childNode - look ahead from this node.
   * @returns {Block | undefined} can return undefined in case when the passed child note is not a part of the current editor instance
   */
  setCurrentBlockByChildNode(e) {
    f.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${fe.CSS.wrapper}`);
    if (!t)
      return;
    const n = t.closest(`.${this.Editor.UI.CSS.editorWrapper}`);
    if (n != null && n.isEqualNode(this.Editor.UI.nodes.wrapper))
      return this.currentBlockIndex = this._blocks.nodes.indexOf(t), this.currentBlock.updateCurrentInput(), this.currentBlock;
  }
  /**
   * Return block which contents passed node
   *
   * @param {Node} childNode - node to get Block by
   * @returns {Block}
   */
  getBlockByChildNode(e) {
    if (!e || !(e instanceof Node))
      return;
    f.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${fe.CSS.wrapper}`);
    return this.blocks.find((n) => n.holder === t);
  }
  /**
   * Swap Blocks Position
   *
   * @param {number} fromIndex - index of first block
   * @param {number} toIndex - index of second block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    this._blocks.swap(e, t), this.currentBlockIndex = t;
  }
  /**
   * Move a block to a new index
   *
   * @param {number} toIndex - index where to move Block
   * @param {number} fromIndex - index of Block to move
   */
  move(e, t = this.currentBlockIndex) {
    if (isNaN(e) || isNaN(t)) {
      L("Warning during 'move' call: incorrect indices provided.", "warn");
      return;
    }
    if (!this.validateIndex(e) || !this.validateIndex(t)) {
      L("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
      return;
    }
    this._blocks.move(e, t), this.currentBlockIndex = e, this.blockDidMutated(nu, this.currentBlock, {
      fromIndex: t,
      toIndex: e
    });
  }
  /**
   * Converts passed Block to the new Tool
   * Uses Conversion Config
   *
   * @param blockToConvert - Block that should be converted
   * @param targetToolName - name of the Tool to convert to
   * @param blockDataOverrides - optional new Block data overrides
   */
  async convert(e, t, n) {
    if (!await e.save())
      throw new Error("Could not convert Block. Failed to extract original Block data.");
    const r = this.Editor.Tools.blockTools.get(t);
    if (!r)
      throw new Error(`Could not convert Block. Tool «${t}» not found.`);
    const i = await e.exportDataAsString(), s = se(
      i,
      r.sanitizeConfig
    );
    let a = Jr(s, r.conversionConfig, r.settings);
    return n && (a = Object.assign(a, n)), this.replace(e, r.name, a);
  }
  /**
   * Sets current Block Index -1 which means unknown
   * and clear highlights
   */
  unsetCurrentBlock() {
    this.currentBlockIndex = -1;
  }
  /**
   * Clears Editor
   *
   * @param {boolean} needToAddDefaultBlock - 1) in internal calls (for example, in api.blocks.render)
   *                                             we don't need to add an empty default block
   *                                        2) in api.blocks.clear we should add empty block
   */
  async clear(e = !1) {
    const t = new ru();
    [...this.blocks].forEach((n) => {
      t.add(async () => {
        await this.removeBlock(n, !1);
      });
    }), await t.completed, this.unsetCurrentBlock(), e && this.insert(), this.Editor.UI.checkEmptiness();
  }
  /**
   * Cleans up all the block tools' resources
   * This is called when editor is destroyed
   */
  async destroy() {
    await Promise.all(this.blocks.map((e) => e.destroy()));
  }
  /**
   * Bind Block events
   *
   * @param {Block} block - Block to which event should be bound
   */
  bindBlockEvents(e) {
    const { BlockEvents: t } = this.Editor;
    this.readOnlyMutableListeners.on(e.holder, "keydown", (n) => {
      t.keydown(n);
    }), this.readOnlyMutableListeners.on(e.holder, "keyup", (n) => {
      t.keyup(n);
    }), this.readOnlyMutableListeners.on(e.holder, "dragover", (n) => {
      t.dragOver(n);
    }), this.readOnlyMutableListeners.on(e.holder, "dragleave", (n) => {
      t.dragLeave(n);
    }), e.on("didMutated", (n) => this.blockDidMutated(ai, n, {
      index: this.getBlockIndex(n)
    }));
  }
  /**
   * Disable mutable handlers and bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Enables all module handlers and bindings for all Blocks
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(
      document,
      "cut",
      (e) => this.Editor.BlockEvents.handleCommandX(e)
    ), this.blocks.forEach((e) => {
      this.bindBlockEvents(e);
    });
  }
  /**
   * Validates that the given index is not lower than 0 or higher than the amount of blocks
   *
   * @param {number} index - index of blocks array to validate
   * @returns {boolean}
   */
  validateIndex(e) {
    return !(e < 0 || e >= this._blocks.length);
  }
  /**
   * Block mutation callback
   *
   * @param mutationType - what happened with block
   * @param block - mutated block
   * @param detailData - additional data to pass with change event
   */
  blockDidMutated(e, t, n) {
    const r = new CustomEvent(e, {
      detail: {
        target: new ue(t),
        ...n
      }
    });
    return this.eventsDispatcher.emit(Oi, {
      event: r
    }), t;
  }
}
class su extends O {
  constructor() {
    super(...arguments), this.anyBlockSelectedCache = null, this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
  }
  /**
   * Sanitizer Config
   *
   * @returns {SanitizerConfig}
   */
  get sanitizerConfig() {
    return {
      p: {},
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      ol: {},
      ul: {},
      li: {},
      br: !0,
      img: {
        src: !0,
        width: !0,
        height: !0
      },
      a: {
        href: !0
      },
      b: {},
      i: {},
      u: {}
    };
  }
  /**
   * Flag that identifies all Blocks selection
   *
   * @returns {boolean}
   */
  get allBlocksSelected() {
    const { BlockManager: e } = this.Editor;
    return e.blocks.every((t) => t.selected === !0);
  }
  /**
   * Set selected all blocks
   *
   * @param {boolean} state - state to set
   */
  set allBlocksSelected(e) {
    const { BlockManager: t } = this.Editor;
    t.blocks.forEach((n) => {
      n.selected = e;
    }), this.clearCache();
  }
  /**
   * Flag that identifies any Block selection
   *
   * @returns {boolean}
   */
  get anyBlockSelected() {
    const { BlockManager: e } = this.Editor;
    return this.anyBlockSelectedCache === null && (this.anyBlockSelectedCache = e.blocks.some((t) => t.selected === !0)), this.anyBlockSelectedCache;
  }
  /**
   * Return selected Blocks array
   *
   * @returns {Block[]}
   */
  get selectedBlocks() {
    return this.Editor.BlockManager.blocks.filter((e) => e.selected);
  }
  /**
   * Module Preparation
   * Registers Shortcuts CMD+A and CMD+C
   * to select all and copy them
   */
  prepare() {
    this.selection = new C(), $e.add({
      name: "CMD+A",
      handler: (e) => {
        const { BlockManager: t, ReadOnly: n } = this.Editor;
        if (n.isEnabled) {
          e.preventDefault(), this.selectAllBlocks();
          return;
        }
        t.currentBlock && this.handleCommandA(e);
      },
      on: this.Editor.UI.nodes.redactor
    });
  }
  /**
   * Toggle read-only state
   *
   *  - Remove all ranges
   *  - Unselect all Blocks
   */
  toggleReadOnly() {
    C.get().removeAllRanges(), this.allBlocksSelected = !1;
  }
  /**
   * Remove selection of Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  unSelectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor;
    let n;
    isNaN(e) ? n = t.currentBlock : n = t.getBlockByIndex(e), n.selected = !1, this.clearCache();
  }
  /**
   * Clear selection from Blocks
   *
   * @param {Event} reason - event caused clear of selection
   * @param {boolean} restoreSelection - if true, restore saved selection
   */
  clearSelection(e, t = !1) {
    const { BlockManager: n, Caret: r, RectangleSelection: i } = this.Editor;
    this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
    const s = e && e instanceof KeyboardEvent, a = s && wi(e.keyCode);
    if (this.anyBlockSelected && s && a && !C.isSelectionExists) {
      const l = n.removeSelectedBlocks();
      n.insertDefaultBlockAtIndex(l, !0), r.setToBlock(n.currentBlock), kt(() => {
        const c = e.key;
        r.insertContentAtCaretPosition(c.length > 1 ? "" : c);
      }, 20)();
    }
    if (this.Editor.CrossBlockSelection.clear(e), !this.anyBlockSelected || i.isRectActivated()) {
      this.Editor.RectangleSelection.clearSelection();
      return;
    }
    t && this.selection.restore(), this.allBlocksSelected = !1;
  }
  /**
   * Reduce each Block and copy its content
   *
   * @param {ClipboardEvent} e - copy/cut event
   * @returns {Promise<void>}
   */
  copySelectedBlocks(e) {
    e.preventDefault();
    const t = f.make("div");
    this.selectedBlocks.forEach((i) => {
      const s = se(i.holder.innerHTML, this.sanitizerConfig), a = f.make("p");
      a.innerHTML = s, t.appendChild(a);
    });
    const n = Array.from(t.childNodes).map((i) => i.textContent).join(`

`), r = t.innerHTML;
    return e.clipboardData.setData("text/plain", n), e.clipboardData.setData("text/html", r), Promise.all(this.selectedBlocks.map((i) => i.save())).then((i) => {
      try {
        e.clipboardData.setData(this.Editor.Paste.MIME_TYPE, JSON.stringify(i));
      } catch {
      }
    });
  }
  /**
   * Select Block by its index
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  selectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor, n = t.getBlockByIndex(e);
    n !== void 0 && this.selectBlock(n);
  }
  /**
   * Select passed Block
   *
   * @param {Block} block - Block to select
   */
  selectBlock(e) {
    this.selection.save(), C.get().removeAllRanges(), e.selected = !0, this.clearCache(), this.Editor.InlineToolbar.close();
  }
  /**
   * Remove selection from passed Block
   *
   * @param {Block} block - Block to unselect
   */
  unselectBlock(e) {
    e.selected = !1, this.clearCache();
  }
  /**
   * Clear anyBlockSelected cache
   */
  clearCache() {
    this.anyBlockSelectedCache = null;
  }
  /**
   * Module destruction
   * De-registers Shortcut CMD+A
   */
  destroy() {
    $e.remove(this.Editor.UI.nodes.redactor, "CMD+A");
  }
  /**
   * First CMD+A selects all input content by native behaviour,
   * next CMD+A keypress selects all blocks
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  handleCommandA(e) {
    if (this.Editor.RectangleSelection.clearSelection(), f.isNativeInput(e.target) && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    const t = this.Editor.BlockManager.getBlock(e.target), n = t.inputs;
    if (n.length > 1 && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    if (n.length === 1 && !this.needToSelectAll) {
      this.needToSelectAll = !0;
      return;
    }
    this.needToSelectAll ? (e.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = !1, this.readyToBlockSelection = !1) : this.readyToBlockSelection && (e.preventDefault(), this.selectBlock(t), this.needToSelectAll = !0);
  }
  /**
   * Select All Blocks
   * Each Block has selected setter that makes Block copyable
   */
  selectAllBlocks() {
    this.selection.save(), C.get().removeAllRanges(), this.allBlocksSelected = !0, this.Editor.InlineToolbar.close();
  }
}
let au = class wo extends O {
  /**
   * Allowed caret positions in input
   *
   * @static
   * @returns {{START: string, END: string, DEFAULT: string}}
   */
  get positions() {
    return {
      START: "start",
      END: "end",
      DEFAULT: "default"
    };
  }
  /**
   * Elements styles that can be useful for Caret Module
   */
  static get CSS() {
    return {
      shadowCaret: "cdx-shadow-caret"
    };
  }
  /**
   * Method gets Block instance and puts caret to the text node with offset
   * There two ways that method applies caret position:
   *   - first found text node: sets at the beginning, but you can pass an offset
   *   - last found text node: sets at the end of the node. Also, you can customize the behaviour
   *
   * @param {Block} block - Block class
   * @param {string} position - position where to set caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the block content
   */
  setToBlock(e, t = this.positions.DEFAULT, n = 0) {
    var r;
    const { BlockManager: i, BlockSelection: s } = this.Editor;
    if (s.clearSelection(), !e.focusable) {
      (r = Y()) == null || r.removeAllRanges(), s.selectBlock(e), i.currentBlock = e;
      return;
    }
    let a;
    switch (t) {
      case this.positions.START:
        a = e.firstInput;
        break;
      case this.positions.END:
        a = e.lastInput;
        break;
      default:
        a = e.currentInput;
    }
    if (!a)
      return;
    let l, c = n;
    if (t === this.positions.START)
      l = f.getDeepestNode(a, !1), c = 0;
    else if (t === this.positions.END)
      l = f.getDeepestNode(a, !0), c = f.getContentLength(l);
    else {
      const { node: d, offset: u } = f.getNodeByOffset(a, n);
      d ? (l = d, c = u) : (l = f.getDeepestNode(a, !1), c = 0);
    }
    this.set(l, c), i.setCurrentBlockByChildNode(e.holder), i.currentBlock.currentInput = a;
  }
  /**
   * Set caret to the current input of current Block.
   *
   * @param {HTMLElement} input - input where caret should be set
   * @param {string} position - position of the caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */
  setToInput(e, t = this.positions.DEFAULT, n = 0) {
    const { currentBlock: r } = this.Editor.BlockManager, i = f.getDeepestNode(e);
    switch (t) {
      case this.positions.START:
        this.set(i, 0);
        break;
      case this.positions.END:
        this.set(i, f.getContentLength(i));
        break;
      default:
        n && this.set(i, n);
    }
    r.currentInput = e;
  }
  /**
   * Creates Document Range and sets caret to the element with offset
   *
   * @param {HTMLElement} element - target node.
   * @param {number} offset - offset
   */
  set(e, t = 0) {
    const { top: n, bottom: r } = C.setCursor(e, t), { innerHeight: i } = window;
    n < 0 ? window.scrollBy(0, n - 30) : r > i && window.scrollBy(0, r - i + 30);
  }
  /**
   * Set Caret to the last Block
   * If last block is not empty, append another empty block
   */
  setToTheLastBlock() {
    const e = this.Editor.BlockManager.lastBlock;
    if (e)
      if (e.tool.isDefault && e.isEmpty)
        this.setToBlock(e);
      else {
        const t = this.Editor.BlockManager.insertAtEnd();
        this.setToBlock(t);
      }
  }
  /**
   * Extract content fragment of current Block from Caret position to the end of the Block
   */
  extractFragmentFromCaretPosition() {
    const e = C.get();
    if (e.rangeCount) {
      const t = e.getRangeAt(0), n = this.Editor.BlockManager.currentBlock.currentInput;
      if (t.deleteContents(), n)
        if (f.isNativeInput(n)) {
          const r = n, i = document.createDocumentFragment(), s = r.value.substring(0, r.selectionStart), a = r.value.substring(r.selectionStart);
          return i.textContent = a, r.value = s, i;
        } else {
          const r = t.cloneRange();
          return r.selectNodeContents(n), r.setStart(t.endContainer, t.endOffset), r.extractContents();
        }
    }
  }
  /**
   * Set's caret to the next Block or Tool`s input
   * Before moving caret, we should check if caret position is at the end of Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @param {boolean} force - pass true to skip check for caret position
   */
  navigateNext(e = !1) {
    const { BlockManager: t } = this.Editor, { currentBlock: n, nextBlock: r } = t;
    if (n === void 0)
      return !1;
    const { nextInput: i, currentInput: s } = n, a = s !== void 0 ? ht(s) : void 0;
    let l = r;
    const c = e || a || !n.focusable;
    if (i && c)
      return this.setToInput(i, this.positions.START), !0;
    if (l === null) {
      if (n.tool.isDefault || !c)
        return !1;
      l = t.insertAtEnd();
    }
    return c ? (this.setToBlock(l, this.positions.START), !0) : !1;
  }
  /**
   * Set's caret to the previous Tool`s input or Block
   * Before moving caret, we should check if caret position is start of the Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @param {boolean} force - pass true to skip check for caret position
   */
  navigatePrevious(e = !1) {
    const { currentBlock: t, previousBlock: n } = this.Editor.BlockManager;
    if (!t)
      return !1;
    const { previousInput: r, currentInput: i } = t, s = i !== void 0 ? ut(i) : void 0, a = e || s || !t.focusable;
    return r && a ? (this.setToInput(r, this.positions.END), !0) : n !== null && a ? (this.setToBlock(n, this.positions.END), !0) : !1;
  }
  /**
   * Inserts shadow element after passed element where caret can be placed
   *
   * @param {Element} element - element after which shadow caret should be inserted
   */
  createShadow(e) {
    const t = document.createElement("span");
    t.classList.add(wo.CSS.shadowCaret), e.insertAdjacentElement("beforeend", t);
  }
  /**
   * Restores caret position
   *
   * @param {HTMLElement} element - element where caret should be restored
   */
  restoreCaret(e) {
    const t = e.querySelector(`.${wo.CSS.shadowCaret}`);
    if (!t)
      return;
    new C().expandToTag(t);
    const n = document.createRange();
    n.selectNode(t), n.extractContents();
  }
  /**
   * Inserts passed content at caret position
   *
   * @param {string} content - content to insert
   */
  insertContentAtCaretPosition(e) {
    const t = document.createDocumentFragment(), n = document.createElement("div"), r = C.get(), i = C.range;
    n.innerHTML = e, Array.from(n.childNodes).forEach((c) => t.appendChild(c)), t.childNodes.length === 0 && t.appendChild(new Text());
    const s = t.lastChild;
    i.deleteContents(), i.insertNode(t);
    const a = document.createRange(), l = s.nodeType === Node.TEXT_NODE ? s : s.firstChild;
    l !== null && l.textContent !== null && a.setStart(l, l.textContent.length), r.removeAllRanges(), r.addRange(a);
  }
};
class lu extends O {
  constructor() {
    super(...arguments), this.onMouseUp = () => {
      this.listeners.off(pe(), "mouseover", this.onMouseOver), this.listeners.off(pe(), "mouseup", this.onMouseUp);
    }, this.onMouseOver = (e) => {
      const { BlockManager: t, BlockSelection: n } = this.Editor;
      if (e.relatedTarget === null && e.target === null)
        return;
      const r = t.getBlockByChildNode(e.relatedTarget) || this.lastSelectedBlock, i = t.getBlockByChildNode(e.target);
      if (!(!r || !i) && i !== r) {
        if (r === this.firstSelectedBlock) {
          C.get().removeAllRanges(), r.selected = !0, i.selected = !0, n.clearCache();
          return;
        }
        if (i === this.firstSelectedBlock) {
          r.selected = !1, i.selected = !1, n.clearCache();
          return;
        }
        this.Editor.InlineToolbar.close(), this.toggleBlocksSelectedState(r, i), this.lastSelectedBlock = i;
      }
    };
  }
  /**
   * Module preparation
   *
   * @returns {Promise}
   */
  async prepare() {
    this.listeners.on(pe(), "mousedown", (e) => {
      this.enableCrossBlockSelection(e);
    });
  }
  /**
   * Sets up listeners
   *
   * @param {MouseEvent} event - mouse down event
   */
  watchSelection(e) {
    if (e.button !== Ya.LEFT)
      return;
    const { BlockManager: t } = this.Editor;
    this.firstSelectedBlock = t.getBlock(e.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(pe(), "mouseover", this.onMouseOver), this.listeners.on(pe(), "mouseup", this.onMouseUp);
  }
  /**
   * Return boolean is cross block selection started:
   * there should be at least 2 selected blocks
   */
  get isCrossBlockSelectionStarted() {
    return !!this.firstSelectedBlock && !!this.lastSelectedBlock && this.firstSelectedBlock !== this.lastSelectedBlock;
  }
  /**
   * Change selection state of the next Block
   * Used for CBS via Shift + arrow keys
   *
   * @param {boolean} next - if true, toggle next block. Previous otherwise
   */
  toggleBlockSelectedState(e = !0) {
    const { BlockManager: t, BlockSelection: n } = this.Editor;
    this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = t.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = !0, n.clearCache(), C.get().removeAllRanges());
    const r = t.blocks.indexOf(this.lastSelectedBlock) + (e ? 1 : -1), i = t.blocks[r];
    i && (this.lastSelectedBlock.selected !== i.selected ? (i.selected = !0, n.clearCache()) : (this.lastSelectedBlock.selected = !1, n.clearCache()), this.lastSelectedBlock = i, this.Editor.InlineToolbar.close(), i.holder.scrollIntoView({
      block: "nearest"
    }));
  }
  /**
   * Clear saved state
   *
   * @param {Event} reason - event caused clear of selection
   */
  clear(e) {
    const { BlockManager: t, BlockSelection: n, Caret: r } = this.Editor, i = t.blocks.indexOf(this.firstSelectedBlock), s = t.blocks.indexOf(this.lastSelectedBlock);
    if (n.anyBlockSelected && i > -1 && s > -1 && e && e instanceof KeyboardEvent)
      switch (e.keyCode) {
        case S.DOWN:
        case S.RIGHT:
          r.setToBlock(t.blocks[Math.max(i, s)], r.positions.END);
          break;
        case S.UP:
        case S.LEFT:
          r.setToBlock(t.blocks[Math.min(i, s)], r.positions.START);
          break;
        default:
          r.setToBlock(t.blocks[Math.max(i, s)], r.positions.END);
      }
    this.firstSelectedBlock = this.lastSelectedBlock = null;
  }
  /**
   * Enables Cross Block Selection
   *
   * @param {MouseEvent} event - mouse down event
   */
  enableCrossBlockSelection(e) {
    const { UI: t } = this.Editor;
    C.isCollapsed || this.Editor.BlockSelection.clearSelection(e), t.nodes.redactor.contains(e.target) ? this.watchSelection(e) : this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Change blocks selection state between passed two blocks.
   *
   * @param {Block} firstBlock - first block in range
   * @param {Block} lastBlock - last block in range
   */
  toggleBlocksSelectedState(e, t) {
    const { BlockManager: n, BlockSelection: r } = this.Editor, i = n.blocks.indexOf(e), s = n.blocks.indexOf(t), a = e.selected !== t.selected;
    for (let l = Math.min(i, s); l <= Math.max(i, s); l++) {
      const c = n.blocks[l];
      c !== this.firstSelectedBlock && c !== (a ? e : t) && (n.blocks[l].selected = !n.blocks[l].selected, r.clearCache());
    }
  }
}
class cu extends O {
  constructor() {
    super(...arguments), this.isStartedAtEditor = !1;
  }
  /**
   * Toggle read-only state
   *
   * if state is true:
   *  - disable all drag-n-drop event handlers
   *
   * if state is false:
   *  - restore drag-n-drop event handlers
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Add drag events listeners to editor zone
   */
  enableModuleBindings() {
    const { UI: e } = this.Editor;
    this.readOnlyMutableListeners.on(e.nodes.holder, "drop", async (t) => {
      await this.processDrop(t);
    }, !0), this.readOnlyMutableListeners.on(e.nodes.holder, "dragstart", () => {
      this.processDragStart();
    }), this.readOnlyMutableListeners.on(e.nodes.holder, "dragover", (t) => {
      this.processDragOver(t);
    }, !0);
  }
  /**
   * Unbind drag-n-drop event handlers
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Handle drop event
   *
   * @param {DragEvent} dropEvent - drop event
   */
  async processDrop(e) {
    const {
      BlockManager: t,
      Paste: n,
      Caret: r
    } = this.Editor;
    e.preventDefault(), t.blocks.forEach((s) => {
      s.dropTarget = !1;
    }), C.isAtEditor && !C.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = !1;
    const i = t.setCurrentBlockByChildNode(e.target);
    if (i)
      this.Editor.Caret.setToBlock(i, r.positions.END);
    else {
      const s = t.setCurrentBlockByChildNode(t.lastBlock.holder);
      this.Editor.Caret.setToBlock(s, r.positions.END);
    }
    await n.processDataTransfer(e.dataTransfer, !0);
  }
  /**
   * Handle drag start event
   */
  processDragStart() {
    C.isAtEditor && !C.isCollapsed && (this.isStartedAtEditor = !0), this.Editor.InlineToolbar.close();
  }
  /**
   * @param {DragEvent} dragEvent - drag event
   */
  processDragOver(e) {
    e.preventDefault();
  }
}
const du = 180, uu = 400;
class hu extends O {
  /**
   * Prepare the module
   *
   * @param options - options used by the modification observer module
   * @param options.config - Editor configuration object
   * @param options.eventsDispatcher - common Editor event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.disabled = !1, this.batchingTimeout = null, this.batchingOnChangeQueue = /* @__PURE__ */ new Map(), this.batchTime = uu, this.mutationObserver = new MutationObserver((n) => {
      this.redactorChanged(n);
    }), this.eventsDispatcher.on(Oi, (n) => {
      this.particularBlockChanged(n.event);
    }), this.eventsDispatcher.on(Ii, () => {
      this.disable();
    }), this.eventsDispatcher.on(Mi, () => {
      this.enable();
    });
  }
  /**
   * Enables onChange event
   */
  enable() {
    this.mutationObserver.observe(
      this.Editor.UI.nodes.redactor,
      {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0
      }
    ), this.disabled = !1;
  }
  /**
   * Disables onChange event
   */
  disable() {
    this.mutationObserver.disconnect(), this.disabled = !0;
  }
  /**
   * Call onChange event passed to Editor.js configuration
   *
   * @param event - some of our custom change events
   */
  particularBlockChanged(e) {
    this.disabled || !D(this.config.onChange) || (this.batchingOnChangeQueue.set(`block:${e.detail.target.id}:event:${e.type}`, e), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(() => {
      let t;
      this.batchingOnChangeQueue.size === 1 ? t = this.batchingOnChangeQueue.values().next().value : t = Array.from(this.batchingOnChangeQueue.values()), this.config.onChange && this.config.onChange(this.Editor.API.methods, t), this.batchingOnChangeQueue.clear();
    }, this.batchTime));
  }
  /**
   * Fired on every blocks wrapper dom change
   *
   * @param mutations - mutations happened
   */
  redactorChanged(e) {
    this.eventsDispatcher.emit(mo, {
      mutations: e
    });
  }
}
const Cs = class Ts extends O {
  constructor() {
    super(...arguments), this.MIME_TYPE = "application/x-editor-js", this.toolsTags = {}, this.tagsByTool = {}, this.toolsPatterns = [], this.toolsFiles = {}, this.exceptionList = [], this.processTool = (e) => {
      try {
        const t = e.create({}, {}, !1);
        if (e.pasteConfig === !1) {
          this.exceptionList.push(e.name);
          return;
        }
        if (!D(t.onPaste))
          return;
        this.getTagsConfig(e), this.getFilesConfig(e), this.getPatternsConfig(e);
      } catch (t) {
        L(
          `Paste handling for «${e.name}» Tool hasn't been set up because of the error`,
          "warn",
          t
        );
      }
    }, this.handlePasteEvent = async (e) => {
      const { BlockManager: t, Toolbar: n } = this.Editor, r = t.setCurrentBlockByChildNode(e.target);
      !r || this.isNativeBehaviour(e.target) && !e.clipboardData.types.includes("Files") || r && this.exceptionList.includes(r.name) || (e.preventDefault(), this.processDataTransfer(e.clipboardData), n.close());
    };
  }
  /**
   * Set onPaste callback and collect tools` paste configurations
   */
  async prepare() {
    this.processTools();
  }
  /**
   * Set read-only state
   *
   * @param {boolean} readOnlyEnabled - read only flag value
   */
  toggleReadOnly(e) {
    e ? this.unsetCallback() : this.setCallback();
  }
  /**
   * Handle pasted or dropped data transfer object
   *
   * @param {DataTransfer} dataTransfer - pasted or dropped data transfer object
   * @param {boolean} isDragNDrop - true if data transfer comes from drag'n'drop events
   */
  async processDataTransfer(e, t = !1) {
    const { Tools: n } = this.Editor, r = e.types;
    if ((r.includes ? r.includes("Files") : r.contains("Files")) && !J(this.toolsFiles)) {
      await this.processFiles(e.files);
      return;
    }
    const i = e.getData(this.MIME_TYPE), s = e.getData("text/plain");
    let a = e.getData("text/html");
    if (i)
      try {
        this.insertEditorJSData(JSON.parse(i));
        return;
      } catch {
      }
    t && s.trim() && a.trim() && (a = "<p>" + (a.trim() ? a : s) + "</p>");
    const l = Object.keys(this.toolsTags).reduce((u, h) => (u[h.toLowerCase()] = this.toolsTags[h].sanitizationConfig ?? {}, u), {}), c = Object.assign({}, l, n.getAllInlineToolsSanitizeConfig(), { br: {} }), d = se(a, c);
    !d.trim() || d.trim() === s || !f.isHTMLString(d) ? await this.processText(s) : await this.processText(d, !0);
  }
  /**
   * Process pasted text and divide them into Blocks
   *
   * @param {string} data - text to process. Can be HTML or plain.
   * @param {boolean} isHTML - if passed string is HTML, this parameter should be true
   */
  async processText(e, t = !1) {
    const { Caret: n, BlockManager: r } = this.Editor, i = t ? this.processHTML(e) : this.processPlain(e);
    if (!i.length)
      return;
    if (i.length === 1) {
      i[0].isBlock ? this.processSingleBlock(i.pop()) : this.processInlinePaste(i.pop());
      return;
    }
    const s = r.currentBlock && r.currentBlock.tool.isDefault && r.currentBlock.isEmpty;
    i.map(
      async (a, l) => this.insertBlock(a, l === 0 && s)
    ), r.currentBlock && n.setToBlock(r.currentBlock, n.positions.END);
  }
  /**
   * Set onPaste callback handler
   */
  setCallback() {
    this.listeners.on(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Unset onPaste callback handler
   */
  unsetCallback() {
    this.listeners.off(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Get and process tool`s paste configs
   */
  processTools() {
    const e = this.Editor.Tools.blockTools;
    Array.from(e.values()).forEach(this.processTool);
  }
  /**
   * Get tags name list from either tag name or sanitization config.
   *
   * @param {string | object} tagOrSanitizeConfig - tag name or sanitize config object.
   * @returns {string[]} array of tags.
   */
  collectTagNames(e) {
    return ge(e) ? [e] : z(e) ? Object.keys(e) : [];
  }
  /**
   * Get tags to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getTagsConfig(e) {
    if (e.pasteConfig === !1)
      return;
    const t = e.pasteConfig.tags || [], n = [];
    t.forEach((r) => {
      const i = this.collectTagNames(r);
      n.push(...i), i.forEach((s) => {
        if (Object.prototype.hasOwnProperty.call(this.toolsTags, s)) {
          L(
            `Paste handler for «${e.name}» Tool on «${s}» tag is skipped because it is already used by «${this.toolsTags[s].tool.name}» Tool.`,
            "warn"
          );
          return;
        }
        const a = z(r) ? r[s] : null;
        this.toolsTags[s.toUpperCase()] = {
          tool: e,
          sanitizationConfig: a
        };
      });
    }), this.tagsByTool[e.name] = n.map((r) => r.toUpperCase());
  }
  /**
   * Get files` types and extensions to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getFilesConfig(e) {
    if (e.pasteConfig === !1)
      return;
    const { files: t = {} } = e.pasteConfig;
    let { extensions: n, mimeTypes: r } = t;
    !n && !r || (n && !Array.isArray(n) && (L(`«extensions» property of the onDrop config for «${e.name}» Tool should be an array`), n = []), r && !Array.isArray(r) && (L(`«mimeTypes» property of the onDrop config for «${e.name}» Tool should be an array`), r = []), r && (r = r.filter((i) => Qa(i) ? !0 : (L(`MIME type value «${i}» for the «${e.name}» Tool is not a valid MIME type`, "warn"), !1))), this.toolsFiles[e.name] = {
      extensions: n || [],
      mimeTypes: r || []
    });
  }
  /**
   * Get RegExp patterns to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getPatternsConfig(e) {
    e.pasteConfig === !1 || !e.pasteConfig.patterns || J(e.pasteConfig.patterns) || Object.entries(e.pasteConfig.patterns).forEach(([t, n]) => {
      n instanceof RegExp || L(
        `Pattern ${n} for «${e.name}» Tool is skipped because it should be a Regexp instance.`,
        "warn"
      ), this.toolsPatterns.push({
        key: t,
        pattern: n,
        tool: e
      });
    });
  }
  /**
   * Check if browser behavior suits better
   *
   * @param {EventTarget} element - element where content has been pasted
   * @returns {boolean}
   */
  isNativeBehaviour(e) {
    return f.isNativeInput(e);
  }
  /**
   * Get files from data transfer object and insert related Tools
   *
   * @param {FileList} items - pasted or dropped items
   */
  async processFiles(e) {
    const { BlockManager: t } = this.Editor;
    let n;
    n = await Promise.all(
      Array.from(e).map((i) => this.processFile(i))
    ), n = n.filter((i) => !!i);
    const r = t.currentBlock.tool.isDefault && t.currentBlock.isEmpty;
    n.forEach(
      (i, s) => {
        t.paste(i.type, i.event, s === 0 && r);
      }
    );
  }
  /**
   * Get information about file and find Tool to handle it
   *
   * @param {File} file - file to process
   */
  async processFile(e) {
    const t = Za(e), n = Object.entries(this.toolsFiles).find(([i, { mimeTypes: s, extensions: a }]) => {
      const [l, c] = e.type.split("/"), d = a.find((h) => h.toLowerCase() === t.toLowerCase()), u = s.find((h) => {
        const [g, p] = h.split("/");
        return g === l && (p === c || p === "*");
      });
      return !!d || !!u;
    });
    if (!n)
      return;
    const [r] = n;
    return {
      event: this.composePasteEvent("file", {
        file: e
      }),
      type: r
    };
  }
  /**
   * Split HTML string to blocks and return it as array of Block data
   *
   * @param {string} innerHTML - html string to process
   * @returns {PasteData[]}
   */
  processHTML(e) {
    const { Tools: t } = this.Editor, n = f.make("DIV");
    return n.innerHTML = e, this.getNodes(n).map((r) => {
      let i, s = t.defaultTool, a = !1;
      switch (r.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE:
          i = f.make("div"), i.appendChild(r);
          break;
        case Node.ELEMENT_NODE:
          i = r, a = !0, this.toolsTags[i.tagName] && (s = this.toolsTags[i.tagName].tool);
          break;
      }
      const { tags: l } = s.pasteConfig || { tags: [] }, c = l.reduce((h, g) => (this.collectTagNames(g).forEach((p) => {
        const v = z(g) ? g[p] : null;
        h[p.toLowerCase()] = v || {};
      }), h), {}), d = Object.assign({}, c, s.baseSanitizeConfig);
      if (i.tagName.toLowerCase() === "table") {
        const h = se(i.outerHTML, d);
        i = f.make("div", void 0, {
          innerHTML: h
        }).firstChild;
      } else
        i.innerHTML = se(i.innerHTML, d);
      const u = this.composePasteEvent("tag", {
        data: i
      });
      return {
        content: i,
        isBlock: a,
        tool: s.name,
        event: u
      };
    }).filter((r) => {
      const i = f.isEmpty(r.content), s = f.isSingleTag(r.content);
      return !i || s;
    });
  }
  /**
   * Split plain text by new line symbols and return it as array of Block data
   *
   * @param {string} plain - string to process
   * @returns {PasteData[]}
   */
  processPlain(e) {
    const { defaultBlock: t } = this.config;
    if (!e)
      return [];
    const n = t;
    return e.split(/\r?\n/).filter((r) => r.trim()).map((r) => {
      const i = f.make("div");
      i.textContent = r;
      const s = this.composePasteEvent("tag", {
        data: i
      });
      return {
        content: i,
        tool: n,
        isBlock: !1,
        event: s
      };
    });
  }
  /**
   * Process paste of single Block tool content
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processSingleBlock(e) {
    const { Caret: t, BlockManager: n } = this.Editor, { currentBlock: r } = n;
    if (!r || e.tool !== r.name || !f.containsOnlyInlineElements(e.content.innerHTML)) {
      this.insertBlock(e, r?.tool.isDefault && r.isEmpty);
      return;
    }
    t.insertContentAtCaretPosition(e.content.innerHTML);
  }
  /**
   * Process paste to single Block:
   * 1. Find patterns` matches
   * 2. Insert new block if it is not the same type as current one
   * 3. Just insert text if there is no substitutions
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processInlinePaste(e) {
    const { BlockManager: t, Caret: n } = this.Editor, { content: r } = e;
    if (t.currentBlock && t.currentBlock.tool.isDefault && r.textContent.length < Ts.PATTERN_PROCESSING_MAX_LENGTH) {
      const i = await this.processPattern(r.textContent);
      if (i) {
        const s = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty, a = t.paste(i.tool, i.event, s);
        n.setToBlock(a, n.positions.END);
        return;
      }
    }
    if (t.currentBlock && t.currentBlock.currentInput) {
      const i = t.currentBlock.tool.baseSanitizeConfig;
      document.execCommand(
        "insertHTML",
        !1,
        se(r.innerHTML, i)
      );
    } else
      this.insertBlock(e);
  }
  /**
   * Get patterns` matches
   *
   * @param {string} text - text to process
   * @returns {Promise<{event: PasteEvent, tool: string}>}
   */
  async processPattern(e) {
    const t = this.toolsPatterns.find((n) => {
      const r = n.pattern.exec(e);
      return r ? e === r.shift() : !1;
    });
    return t ? {
      event: this.composePasteEvent("pattern", {
        key: t.key,
        data: e
      }),
      tool: t.tool.name
    } : void 0;
  }
  /**
   * Insert pasted Block content to Editor
   *
   * @param {PasteData} data - data to insert
   * @param {boolean} canReplaceCurrentBlock - if true and is current Block is empty, will replace current Block
   * @returns {void}
   */
  insertBlock(e, t = !1) {
    const { BlockManager: n, Caret: r } = this.Editor, { currentBlock: i } = n;
    let s;
    if (t && i && i.isEmpty) {
      s = n.paste(e.tool, e.event, !0), r.setToBlock(s, r.positions.END);
      return;
    }
    s = n.paste(e.tool, e.event), r.setToBlock(s, r.positions.END);
  }
  /**
   * Insert data passed as application/x-editor-js JSON
   *
   * @param {Array} blocks — Blocks' data to insert
   * @returns {void}
   */
  insertEditorJSData(e) {
    const { BlockManager: t, Caret: n, Tools: r } = this.Editor;
    So(
      e,
      (i) => r.blockTools.get(i).sanitizeConfig
    ).forEach(({ tool: i, data: s }, a) => {
      let l = !1;
      a === 0 && (l = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty);
      const c = t.insert({
        tool: i,
        data: s,
        replace: l
      });
      n.setToBlock(c, n.positions.END);
    });
  }
  /**
   * Fetch nodes from Element node
   *
   * @param {Node} node - current node
   * @param {Node[]} nodes - processed nodes
   * @param {Node} destNode - destination node
   */
  processElementNode(e, t, n) {
    const r = Object.keys(this.toolsTags), i = e, { tool: s } = this.toolsTags[i.tagName] || {}, a = this.tagsByTool[s?.name] || [], l = r.includes(i.tagName), c = f.blockElements.includes(i.tagName.toLowerCase()), d = Array.from(i.children).some(
      ({ tagName: h }) => r.includes(h) && !a.includes(h)
    ), u = Array.from(i.children).some(
      ({ tagName: h }) => f.blockElements.includes(h.toLowerCase())
    );
    if (!c && !l && !d)
      return n.appendChild(i), [...t, n];
    if (l && !d || c && !u && !d)
      return [...t, n, i];
  }
  /**
   * Recursively divide HTML string to two types of nodes:
   * 1. Block element
   * 2. Document Fragments contained text and markup tags like a, b, i etc.
   *
   * @param {Node} wrapper - wrapper of paster HTML content
   * @returns {Node[]}
   */
  getNodes(e) {
    const t = Array.from(e.childNodes);
    let n;
    const r = (i, s) => {
      if (f.isEmpty(s) && !f.isSingleTag(s))
        return i;
      const a = i[i.length - 1];
      let l = new DocumentFragment();
      switch (a && f.isFragment(a) && (l = i.pop()), s.nodeType) {
        case Node.ELEMENT_NODE:
          if (n = this.processElementNode(s, i, l), n)
            return n;
          break;
        case Node.TEXT_NODE:
          return l.appendChild(s), [...i, l];
        default:
          return [...i, l];
      }
      return [...i, ...Array.from(s.childNodes).reduce(r, [])];
    };
    return t.reduce(r, []);
  }
  /**
   * Compose paste event with passed type and detail
   *
   * @param {string} type - event type
   * @param {PasteEventDetail} detail - event detail
   */
  composePasteEvent(e, t) {
    return new CustomEvent(e, {
      detail: t
    });
  }
};
Cs.PATTERN_PROCESSING_MAX_LENGTH = 450;
let pu = Cs;
class fu extends O {
  constructor() {
    super(...arguments), this.toolsDontSupportReadOnly = [], this.readOnlyEnabled = !1;
  }
  /**
   * Returns state of read only mode
   */
  get isEnabled() {
    return this.readOnlyEnabled;
  }
  /**
   * Set initial state
   */
  async prepare() {
    const { Tools: e } = this.Editor, { blockTools: t } = e, n = [];
    Array.from(t.entries()).forEach(([r, i]) => {
      i.isReadOnlySupported || n.push(r);
    }), this.toolsDontSupportReadOnly = n, this.config.readOnly && n.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly, !0);
  }
  /**
   * Set read-only mode or toggle current state
   * Call all Modules `toggleReadOnly` method and re-render Editor
   *
   * @param state - (optional) read-only state or toggle
   * @param isInitial - (optional) true when editor is initializing
   */
  async toggle(e = !this.readOnlyEnabled, t = !1) {
    e && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
    const n = this.readOnlyEnabled;
    this.readOnlyEnabled = e;
    for (const i in this.Editor)
      this.Editor[i].toggleReadOnly && this.Editor[i].toggleReadOnly(e);
    if (n === e)
      return this.readOnlyEnabled;
    if (t)
      return this.readOnlyEnabled;
    this.Editor.ModificationsObserver.disable();
    const r = await this.Editor.Saver.save();
    return await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(r.blocks), this.Editor.ModificationsObserver.enable(), this.readOnlyEnabled;
  }
  /**
   * Throws an error about tools which don't support read-only mode
   */
  throwCriticalError() {
    throw new _i(
      `To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`
    );
  }
}
let gu = class ft extends O {
  constructor() {
    super(...arguments), this.isRectSelectionActivated = !1, this.SCROLL_SPEED = 3, this.HEIGHT_OF_SCROLL_ZONE = 40, this.BOTTOM_SCROLL_ZONE = 1, this.TOP_SCROLL_ZONE = 2, this.MAIN_MOUSE_BUTTON = 0, this.mousedown = !1, this.isScrolling = !1, this.inScrollZone = null, this.startX = 0, this.startY = 0, this.mouseX = 0, this.mouseY = 0, this.stackOfSelected = [], this.listenerIds = [];
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      overlay: "codex-editor-overlay",
      overlayContainer: "codex-editor-overlay__container",
      rect: "codex-editor-overlay__rectangle",
      topScrollZone: "codex-editor-overlay__scroll-zone--top",
      bottomScrollZone: "codex-editor-overlay__scroll-zone--bottom"
    };
  }
  /**
   * Module Preparation
   * Creating rect and hang handlers
   */
  prepare() {
    this.enableModuleBindings();
  }
  /**
   * Init rect params
   *
   * @param {number} pageX - X coord of mouse
   * @param {number} pageY - Y coord of mouse
   */
  startSelection(e, t) {
    const n = uo(e - window.pageXOffset, t - window.pageYOffset);
    n.closest(`.${this.Editor.Toolbar.CSS.toolbar}`) || (this.Editor.BlockSelection.allBlocksSelected = !1, this.clearSelection(), this.stackOfSelected = []);
    const r = [
      `.${fe.CSS.content}`,
      `.${this.Editor.Toolbar.CSS.toolbar}`,
      `.${this.Editor.InlineToolbar.CSS.inlineToolbar}`
    ], i = n.closest("." + this.Editor.UI.CSS.editorWrapper), s = r.some((a) => !!n.closest(a));
    !i || s || (this.mousedown = !0, this.startX = e, this.startY = t);
  }
  /**
   * Clear all params to end selection
   */
  endSelection() {
    this.mousedown = !1, this.startX = 0, this.startY = 0, this.overlayRectangle.style.display = "none";
  }
  /**
   * is RectSelection Activated
   */
  isRectActivated() {
    return this.isRectSelectionActivated;
  }
  /**
   * Mark that selection is end
   */
  clearSelection() {
    this.isRectSelectionActivated = !1;
  }
  /**
   * Sets Module necessary event handlers
   */
  enableModuleBindings() {
    const { container: e } = this.genHTML();
    this.listeners.on(e, "mousedown", (n) => {
      this.processMouseDown(n);
    }, !1);
    const t = qa(this.Editor.UI.nodes.wrapper) || document.body;
    this.listeners.on(t, "mousemove", ho((n) => {
      this.processMouseMove(n);
    }, 10), {
      passive: !0
    }), this.listeners.on(t, "mouseleave", () => {
      this.processMouseLeave();
    }), this.listeners.on(window, "scroll", ho((n) => {
      this.processScroll(n);
    }, 10), {
      passive: !0
    }), this.listeners.on(t, "mouseup", () => {
      this.processMouseUp();
    }, !1);
  }
  /**
   * Handle mouse down events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseDown(e) {
    e.button === this.MAIN_MOUSE_BUTTON && (e.target.closest(f.allInputsSelector) !== null || this.startSelection(e.pageX, e.pageY));
  }
  /**
   * Handle mouse move events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseMove(e) {
    this.changingRectangle(e), this.scrollByZones(e.clientY);
  }
  /**
   * Handle mouse leave
   */
  processMouseLeave() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processScroll(e) {
    this.changingRectangle(e);
  }
  /**
   * Handle mouse up
   */
  processMouseUp() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * Scroll If mouse in scroll zone
   *
   * @param {number} clientY - Y coord of mouse
   */
  scrollByZones(e) {
    if (this.inScrollZone = null, e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.TOP_SCROLL_ZONE), document.documentElement.clientHeight - e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.BOTTOM_SCROLL_ZONE), !this.inScrollZone) {
      this.isScrolling = !1;
      return;
    }
    this.isScrolling || (this.scrollVertical(this.inScrollZone === this.TOP_SCROLL_ZONE ? -this.SCROLL_SPEED : this.SCROLL_SPEED), this.isScrolling = !0);
  }
  /**
   * Generates required HTML elements
   *
   * @returns {Object<string, Element>}
   */
  genHTML() {
    const { UI: e } = this.Editor, t = e.nodes.holder.querySelector("." + e.CSS.editorWrapper), n = f.make("div", ft.CSS.overlay, {}), r = f.make("div", ft.CSS.overlayContainer, {}), i = f.make("div", ft.CSS.rect, {});
    return r.appendChild(i), n.appendChild(r), t.appendChild(n), this.overlayRectangle = i, {
      container: t,
      overlay: n
    };
  }
  /**
   * Activates scrolling if blockSelection is active and mouse is in scroll zone
   *
   * @param {number} speed - speed of scrolling
   */
  scrollVertical(e) {
    if (!(this.inScrollZone && this.mousedown))
      return;
    const t = window.pageYOffset;
    window.scrollBy(0, e), this.mouseY += window.pageYOffset - t, setTimeout(() => {
      this.scrollVertical(e);
    }, 0);
  }
  /**
   * Handles the change in the rectangle and its effect
   *
   * @param {MouseEvent} event - mouse event
   */
  changingRectangle(e) {
    if (!this.mousedown)
      return;
    e.pageY !== void 0 && (this.mouseX = e.pageX, this.mouseY = e.pageY);
    const { rightPos: t, leftPos: n, index: r } = this.genInfoForMouseSelection(), i = this.startX > t && this.mouseX > t, s = this.startX < n && this.mouseX < n;
    this.rectCrossesBlocks = !(i || s), this.isRectSelectionActivated || (this.rectCrossesBlocks = !1, this.isRectSelectionActivated = !0, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), r !== void 0 && (this.trySelectNextBlock(r), this.inverseSelection(), C.get().removeAllRanges());
  }
  /**
   * Shrink rect to singular point
   */
  shrinkRectangleToPoint() {
    this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`;
  }
  /**
   * Select or unselect all of blocks in array if rect is out or in selectable area
   */
  inverseSelection() {
    const e = this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;
    if (this.rectCrossesBlocks && !e)
      for (const t of this.stackOfSelected)
        this.Editor.BlockSelection.selectBlockByIndex(t);
    if (!this.rectCrossesBlocks && e)
      for (const t of this.stackOfSelected)
        this.Editor.BlockSelection.unSelectBlockByIndex(t);
  }
  /**
   * Updates size of rectangle
   */
  updateRectangleSize() {
    this.mouseY >= this.startY ? (this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.mouseY - window.pageYOffset}px`) : (this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.top = `${this.mouseY - window.pageYOffset}px`), this.mouseX >= this.startX ? (this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.mouseX - window.pageXOffset}px`) : (this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.left = `${this.mouseX - window.pageXOffset}px`);
  }
  /**
   * Collects information needed to determine the behavior of the rectangle
   *
   * @returns {object} index - index next Block, leftPos - start of left border of Block, rightPos - right border
   */
  genInfoForMouseSelection() {
    const e = (this.Editor.UI.nodes.wrapper.offsetWidth || document.body.offsetWidth) / 2, t = this.mouseY - window.pageYOffset, n = uo(e, t), r = this.Editor.BlockManager.getBlockByChildNode(n);
    let i;
    r !== void 0 && (i = this.Editor.BlockManager.blocks.findIndex((d) => d.holder === r.holder));
    const s = this.Editor.BlockManager.lastBlock.holder.querySelector("." + fe.CSS.content), a = Number.parseInt(window.getComputedStyle(s).width, 10) / 2, l = e - a, c = e + a;
    return {
      index: i,
      leftPos: l,
      rightPos: c
    };
  }
  /**
   * Select block with index index
   *
   * @param index - index of block in redactor
   */
  addBlockInSelection(e) {
    this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(e), this.stackOfSelected.push(e);
  }
  /**
   * Adds a block to the selection and determines which blocks should be selected
   *
   * @param {object} index - index of new block in the reactor
   */
  trySelectNextBlock(e) {
    const t = this.stackOfSelected[this.stackOfSelected.length - 1] === e, n = this.stackOfSelected.length, r = 1, i = -1, s = 0;
    if (t)
      return;
    const a = this.stackOfSelected[n - 1] - this.stackOfSelected[n - 2] > 0;
    let l = s;
    n > 1 && (l = a ? r : i);
    const c = e > this.stackOfSelected[n - 1] && l === r, d = e < this.stackOfSelected[n - 1] && l === i, u = !(c || d || l === s);
    if (!u && (e > this.stackOfSelected[n - 1] || this.stackOfSelected[n - 1] === void 0)) {
      let p = this.stackOfSelected[n - 1] + 1 || e;
      for (p; p <= e; p++)
        this.addBlockInSelection(p);
      return;
    }
    if (!u && e < this.stackOfSelected[n - 1]) {
      for (let p = this.stackOfSelected[n - 1] - 1; p >= e; p--)
        this.addBlockInSelection(p);
      return;
    }
    if (!u)
      return;
    let h = n - 1, g;
    for (e > this.stackOfSelected[n - 1] ? g = () => e > this.stackOfSelected[h] : g = () => e < this.stackOfSelected[h]; g(); )
      this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[h]), this.stackOfSelected.pop(), h--;
  }
};
class mu extends O {
  /**
   * Renders passed blocks as one batch
   *
   * @param blocksData - blocks to render
   */
  async render(e) {
    return new Promise((t) => {
      const { Tools: n, BlockManager: r } = this.Editor;
      if (e.length === 0)
        r.insert();
      else {
        const i = e.map(({ type: s, data: a, tunes: l, id: c }) => {
          n.available.has(s) === !1 && (ee(`Tool «${s}» is not found. Check 'tools' property at the Editor.js config.`, "warn"), a = this.composeStubDataForTool(s, a, c), s = n.stubTool);
          let d;
          try {
            d = r.composeBlock({
              id: c,
              tool: s,
              data: a,
              tunes: l
            });
          } catch (u) {
            L(`Block «${s}» skipped because of plugins error`, "error", {
              data: a,
              error: u
            }), a = this.composeStubDataForTool(s, a, c), s = n.stubTool, d = r.composeBlock({
              id: c,
              tool: s,
              data: a,
              tunes: l
            });
          }
          return d;
        });
        r.insertMany(i);
      }
      window.requestIdleCallback(() => {
        t();
      }, { timeout: 2e3 });
    });
  }
  /**
   * Create data for the Stub Tool that will be used instead of unavailable tool
   *
   * @param tool - unavailable tool name to stub
   * @param data - data of unavailable block
   * @param [id] - id of unavailable block
   */
  composeStubDataForTool(e, t, n) {
    const { Tools: r } = this.Editor;
    let i = e;
    if (r.unavailable.has(e)) {
      const s = r.unavailable.get(e).toolbox;
      s !== void 0 && s[0].title !== void 0 && (i = s[0].title);
    }
    return {
      savedData: {
        id: n,
        type: e,
        data: t
      },
      title: i
    };
  }
}
class bu extends O {
  /**
   * Composes new chain of Promises to fire them alternatelly
   *
   * @returns {OutputData}
   */
  async save() {
    const { BlockManager: e, Tools: t } = this.Editor, n = e.blocks, r = [];
    try {
      n.forEach((a) => {
        r.push(this.getSavedData(a));
      });
      const i = await Promise.all(r), s = await So(i, (a) => t.blockTools.get(a).sanitizeConfig);
      return this.makeOutput(s);
    } catch (i) {
      ee("Saving failed due to the Error %o", "error", i);
    }
  }
  /**
   * Saves and validates
   *
   * @param {Block} block - Editor's Tool
   * @returns {ValidatedData} - Tool's validated data
   */
  async getSavedData(e) {
    const t = await e.save(), n = t && await e.validate(t.data);
    return {
      ...t,
      isValid: n
    };
  }
  /**
   * Creates output object with saved data, time and version of editor
   *
   * @param {ValidatedData} allExtractedData - data extracted from Blocks
   * @returns {OutputData}
   */
  makeOutput(e) {
    const t = [];
    return e.forEach(({ id: n, tool: r, data: i, tunes: s, isValid: a }) => {
      if (!a) {
        L(`Block «${r}» skipped because saved data is invalid`);
        return;
      }
      if (r === this.Editor.Tools.stubTool) {
        t.push(i);
        return;
      }
      const l = {
        id: n,
        type: r,
        data: i,
        ...!J(s) && {
          tunes: s
        }
      };
      t.push(l);
    }), {
      time: +/* @__PURE__ */ new Date(),
      blocks: t,
      version: "2.31.6"
    };
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      o.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-block:only-of-type .ce-paragraph[data-placeholder-active]:empty:before,.ce-block:only-of-type .ce-paragraph[data-placeholder-active][data-empty=true]:before{content:attr(data-placeholder-active)}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")), document.head.appendChild(o);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const vu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
function yu(o) {
  const e = document.createElement("div");
  e.innerHTML = o.trim();
  const t = document.createDocumentFragment();
  return t.append(...Array.from(e.childNodes)), t;
}
class kn {
  /**
   * Default placeholder for Paragraph Tool
   *
   * @returns {string}
   * @class
   */
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {ParagraphData} params.data - previously saved data
   * @param {ParagraphConfig} params.config - user config for Tool
   * @param {object} params.api - editor.js api
   * @param {boolean} readOnly - read only mode flag
   */
  constructor({ data: e, config: t, api: n, readOnly: r }) {
    this.api = n, this.readOnly = r, this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph"
    }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : kn.DEFAULT_PLACEHOLDER, this._data = e ?? {}, this._element = null, this._preserveBlank = t.preserveBlank ?? !1;
  }
  /**
   * Check if text content is empty and set empty string to inner html.
   * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
   *
   * @param {KeyboardEvent} e - key up event
   */
  onKeyUp(e) {
    if (e.code !== "Backspace" && e.code !== "Delete" || !this._element)
      return;
    const { textContent: t } = this._element;
    t === "" && (this._element.innerHTML = "");
  }
  /**
   * Create Tool's view
   *
   * @returns {HTMLDivElement}
   * @private
   */
  drawView() {
    const e = document.createElement("DIV");
    return e.classList.add(this._CSS.wrapper, this._CSS.block), e.contentEditable = "false", e.dataset.placeholderActive = this.api.i18n.t(this._placeholder), this._data.text && (e.innerHTML = this._data.text), this.readOnly || (e.contentEditable = "true", e.addEventListener("keyup", this.onKeyUp)), e;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this._element = this.drawView(), this._element;
  }
  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {ParagraphData} data
   * @public
   */
  merge(e) {
    if (!this._element)
      return;
    this._data.text += e.text;
    const t = yu(e.text);
    this._element.appendChild(t), this._element.normalize();
  }
  /**
   * Validate Paragraph block data:
   * - check for emptiness
   *
   * @param {ParagraphData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(e) {
    return !(e.text.trim() === "" && !this._preserveBlank);
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {ParagraphData} - saved data
   * @public
   */
  save(e) {
    return {
      text: e.innerHTML
    };
  }
  /**
   * On paste callback fired from Editor.
   *
   * @param {HTMLPasteEvent} event - event with pasted data
   */
  onPaste(e) {
    const t = {
      text: e.detail.data.innerHTML
    };
    this._data = t, window.requestAnimationFrame(() => {
      this._element && (this._element.innerHTML = this._data.text || "");
    });
  }
  /**
   * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
   * @returns {ConversionConfig}
   */
  static get conversionConfig() {
    return {
      export: "text",
      // to convert Paragraph to other block, use 'text' property of saved data
      import: "text"
      // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    };
  }
  /**
   * Sanitizer rules
   * @returns {SanitizerConfig} - Edtior.js sanitizer config
   */
  static get sanitize() {
    return {
      text: {
        br: !0
      }
    };
  }
  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {PasteConfig} - Paragraph Paste Setting
   */
  static get pasteConfig() {
    return {
      tags: ["P"]
    };
  }
  /**
   * Icon and title for displaying at the Toolbox
   *
   * @returns {ToolboxConfig} - Paragraph Toolbox Setting
   */
  static get toolbox() {
    return {
      icon: vu,
      title: "Text"
    };
  }
}
class wn {
  constructor() {
    this.commandName = "bold";
  }
  /**
   * Sanitizer Rule
   * Leave <b> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      b: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return {
      icon: Kl,
      name: "bold",
      onActivate: () => {
        document.execCommand(this.commandName);
      },
      isActive: () => document.queryCommandState(this.commandName)
    };
  }
  /**
   * Set a shortcut
   *
   * @returns {boolean}
   */
  get shortcut() {
    return "CMD+B";
  }
}
wn.isInline = !0;
wn.title = "Bold";
class xn {
  constructor() {
    this.commandName = "italic", this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--italic"
    }, this.nodes = {
      button: null
    };
  }
  /**
   * Sanitizer Rule
   * Leave <i> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      i: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Ql, this.nodes.button;
  }
  /**
   * Wrap range with <i> tag
   */
  surround() {
    document.execCommand(this.commandName);
  }
  /**
   * Check selection and set activated state to button if there are <i> tag
   */
  checkState() {
    const e = document.queryCommandState(this.commandName);
    return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+I";
  }
}
xn.isInline = !0;
xn.title = "Italic";
class En {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: e }) {
    this.commandLink = "createLink", this.commandUnlink = "unlink", this.ENTER_KEY = 13, this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--link",
      buttonUnlink: "ce-inline-tool--unlink",
      input: "ce-inline-tool-input",
      inputShowed: "ce-inline-tool-input--showed"
    }, this.nodes = {
      button: null,
      input: null
    }, this.inputOpened = !1, this.toolbar = e.toolbar, this.inlineToolbar = e.inlineToolbar, this.notifier = e.notifier, this.i18n = e.i18n, this.selection = new C();
  }
  /**
   * Sanitizer Rule
   * Leave <a> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      a: {
        href: !0,
        target: "_blank",
        rel: "nofollow"
      }
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = ei, this.nodes.button;
  }
  /**
   * Input for the link
   */
  renderActions() {
    return this.nodes.input = document.createElement("input"), this.nodes.input.placeholder = this.i18n.t("Add a link"), this.nodes.input.enterKeyHint = "done", this.nodes.input.classList.add(this.CSS.input), this.nodes.input.addEventListener("keydown", (e) => {
      e.keyCode === this.ENTER_KEY && this.enterPressed(e);
    }), this.nodes.input;
  }
  /**
   * Handle clicks on the Inline Toolbar icon
   *
   * @param {Range} range - range to wrap with link
   */
  surround(e) {
    if (e) {
      this.inputOpened ? (this.selection.restore(), this.selection.removeFakeBackground()) : (this.selection.setFakeBackground(), this.selection.save());
      const t = this.selection.findParentTag("A");
      if (t) {
        this.inputOpened ? (this.closeActions(!1), this.checkState()) : (this.selection.expandToTag(t), this.unlink(), this.closeActions(), this.checkState(), this.toolbar.close());
        return;
      }
    }
    this.toggleActions();
  }
  /**
   * Check selection and set activated state to button if there are <a> tag
   */
  checkState() {
    const e = this.selection.findParentTag("A");
    if (e) {
      this.nodes.button.innerHTML = oc, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
      const t = e.getAttribute("href");
      this.nodes.input.defaultValue = t !== "null" ? t : "", this.selection.save();
    } else
      this.nodes.button.innerHTML = ei, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
    return !!e;
  }
  /**
   * Function called with Inline Toolbar closing
   */
  clear() {
    this.closeActions();
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+K";
  }
  /**
   * Show/close link input
   */
  toggleActions() {
    this.inputOpened ? this.closeActions(!1) : this.openActions(!0);
  }
  /**
   * @param {boolean} needFocus - on link creation we need to focus input. On editing - nope.
   */
  openActions(e = !1) {
    this.nodes.input.classList.add(this.CSS.inputShowed), e && this.nodes.input.focus(), this.inputOpened = !0;
  }
  /**
   * Close input
   *
   * @param {boolean} clearSavedSelection — we don't need to clear saved selection
   *                                        on toggle-clicks on the icon of opened Toolbar
   */
  closeActions(e = !0) {
    if (this.selection.isFakeBackgroundEnabled) {
      const t = new C();
      t.save(), this.selection.restore(), this.selection.removeFakeBackground(), t.restore();
    }
    this.nodes.input.classList.remove(this.CSS.inputShowed), this.nodes.input.value = "", e && this.selection.clearSaved(), this.inputOpened = !1;
  }
  /**
   * Enter pressed on input
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  enterPressed(e) {
    let t = this.nodes.input.value || "";
    if (!t.trim()) {
      this.selection.restore(), this.unlink(), e.preventDefault(), this.closeActions();
      return;
    }
    if (!this.validateURL(t)) {
      this.notifier.show({
        message: "Pasted link is not valid.",
        style: "error"
      }), L("Incorrect Link pasted", "warn", t);
      return;
    }
    t = this.prepareLink(t), this.selection.restore(), this.selection.removeFakeBackground(), this.insertLink(t), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this.selection.collapseToEnd(), this.inlineToolbar.close();
  }
  /**
   * Detects if passed string is URL
   *
   * @param {string} str - string to validate
   * @returns {boolean}
   */
  validateURL(e) {
    return !/\s/.test(e);
  }
  /**
   * Process link before injection
   * - sanitize
   * - add protocol for links like 'google.com'
   *
   * @param {string} link - raw user input
   */
  prepareLink(e) {
    return e = e.trim(), e = this.addProtocol(e), e;
  }
  /**
   * Add 'http' protocol to the links like 'vc.ru', 'google.com'
   *
   * @param {string} link - string to process
   */
  addProtocol(e) {
    if (/^(\w+):(\/\/)?/.test(e))
      return e;
    const t = /^\/[^/\s]/.test(e), n = e.substring(0, 1) === "#", r = /^\/\/[^/\s]/.test(e);
    return !t && !n && !r && (e = "http://" + e), e;
  }
  /**
   * Inserts <a> tag with "href"
   *
   * @param {string} link - "href" value
   */
  insertLink(e) {
    const t = this.selection.findParentTag("A");
    t && this.selection.expandToTag(t), document.execCommand(this.commandLink, !1, e);
  }
  /**
   * Removes <a> tag
   */
  unlink() {
    document.execCommand(this.commandUnlink);
  }
}
En.isInline = !0;
En.title = "Link";
let Ss = class {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: e }) {
    this.i18nAPI = e.i18n, this.blocksAPI = e.blocks, this.selectionAPI = e.selection, this.toolsAPI = e.tools, this.caretAPI = e.caret;
  }
  /**
   * Returns tool's UI config
   */
  async render() {
    const e = C.get(), t = this.blocksAPI.getBlockByElement(e.anchorNode);
    if (t === void 0)
      return [];
    const n = this.toolsAPI.getBlockTools(), r = await Pi(t, n);
    if (r.length === 0)
      return [];
    const i = r.reduce((c, d) => {
      var u;
      return (u = d.toolbox) == null || u.forEach((h) => {
        c.push({
          icon: h.icon,
          title: V.t(Q.toolNames, h.title),
          name: d.name,
          closeOnActivate: !0,
          onActivate: async () => {
            const g = await this.blocksAPI.convert(t.id, d.name, h.data);
            this.caretAPI.setToBlock(g, "end");
          }
        });
      }), c;
    }, []), s = await t.getActiveToolboxEntry(), a = s !== void 0 ? s.icon : Hi, l = !Fe();
    return {
      icon: a,
      name: "convert-to",
      hint: {
        title: this.i18nAPI.t("Convert to")
      },
      children: {
        searchable: l,
        items: i,
        onOpen: () => {
          l && (this.selectionAPI.setFakeBackground(), this.selectionAPI.save());
        },
        onClose: () => {
          l && (this.selectionAPI.restore(), this.selectionAPI.removeFakeBackground());
        }
      }
    };
  }
};
Ss.isInline = !0;
let _s = class {
  /**
   * @param options - constructor options
   * @param options.data - stub tool data
   * @param options.api - Editor.js API
   */
  constructor({ data: e, api: t }) {
    this.CSS = {
      wrapper: "ce-stub",
      info: "ce-stub__info",
      title: "ce-stub__title",
      subtitle: "ce-stub__subtitle"
    }, this.api = t, this.title = e.title || this.api.i18n.t("Error"), this.subtitle = this.api.i18n.t("The block can not be displayed correctly."), this.savedData = e.savedData, this.wrapper = this.make();
  }
  /**
   * Returns stub holder
   *
   * @returns {HTMLElement}
   */
  render() {
    return this.wrapper;
  }
  /**
   * Return original Tool data
   *
   * @returns {BlockToolData}
   */
  save() {
    return this.savedData;
  }
  /**
   * Create Tool html markup
   *
   * @returns {HTMLElement}
   */
  make() {
    const e = f.make("div", this.CSS.wrapper), t = nc, n = f.make("div", this.CSS.info), r = f.make("div", this.CSS.title, {
      textContent: this.title
    }), i = f.make("div", this.CSS.subtitle, {
      textContent: this.subtitle
    });
    return e.innerHTML = t, n.appendChild(r), n.appendChild(i), e.appendChild(n), e;
  }
};
_s.isReadOnlySupported = !0;
class ku extends Lo {
  constructor() {
    super(...arguments), this.type = _e.Inline;
  }
  /**
   * Returns title for Inline Tool if specified by user
   */
  get title() {
    return this.constructable[_t.Title];
  }
  /**
   * Constructs new InlineTool instance from constructable
   */
  create() {
    return new this.constructable({
      api: this.api,
      config: this.settings
    });
  }
  /**
   * Allows inline tool to be available in read-only mode
   * Can be used, for example, by comments tool
   */
  get isReadOnlySupported() {
    return this.constructable[_t.IsReadOnlySupported] ?? !1;
  }
}
class wu extends Lo {
  constructor() {
    super(...arguments), this.type = _e.Tune;
  }
  /**
   * Constructs new BlockTune instance from constructable
   *
   * @param data - Tune data
   * @param block - Block API object
   */
  create(e, t) {
    return new this.constructable({
      api: this.api,
      config: this.settings,
      block: t,
      data: e
    });
  }
}
let oe = class De extends Map {
  /**
   * Returns Block Tools collection
   */
  get blockTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isBlock());
    return new De(e);
  }
  /**
   * Returns Inline Tools collection
   */
  get inlineTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInline());
    return new De(e);
  }
  /**
   * Returns Block Tunes collection
   */
  get blockTunes() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isTune());
    return new De(e);
  }
  /**
   * Returns internal Tools collection
   */
  get internalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInternal);
    return new De(e);
  }
  /**
   * Returns Tools collection provided by user
   */
  get externalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => !t.isInternal);
    return new De(e);
  }
};
var xu = Object.defineProperty, Eu = Object.getOwnPropertyDescriptor, Bs = (o, e, t, n) => {
  for (var r = Eu(e, t), i = o.length - 1, s; i >= 0; i--)
    (s = o[i]) && (r = s(e, t, r) || r);
  return r && xu(e, t, r), r;
};
class Cn extends Lo {
  constructor() {
    super(...arguments), this.type = _e.Block, this.inlineTools = new oe(), this.tunes = new oe();
  }
  /**
   * Creates new Tool instance
   *
   * @param data - Tool data
   * @param block - BlockAPI for current Block
   * @param readOnly - True if Editor is in read-only mode
   */
  create(e, t, n) {
    return new this.constructable({
      data: e,
      block: t,
      readOnly: n,
      api: this.api,
      config: this.settings
    });
  }
  /**
   * Returns true if read-only mode is supported by Tool
   */
  get isReadOnlySupported() {
    return this.constructable[je.IsReadOnlySupported] === !0;
  }
  /**
   * Returns true if Tool supports linebreaks
   */
  get isLineBreaksEnabled() {
    return this.constructable[je.IsEnabledLineBreaks];
  }
  /**
   * Returns Tool toolbox configuration (internal or user-specified).
   *
   * Merges internal and user-defined toolbox configs based on the following rules:
   *
   * - If both internal and user-defined toolbox configs are arrays their items are merged.
   * Length of the second one is kept.
   *
   * - If both are objects their properties are merged.
   *
   * - If one is an object and another is an array than internal config is replaced with user-defined
   * config. This is made to allow user to override default tool's toolbox representation (single/multiple entries)
   */
  get toolbox() {
    const e = this.constructable[je.Toolbox], t = this.config[dt.Toolbox];
    if (!J(e) && t !== !1)
      return t ? Array.isArray(e) ? Array.isArray(t) ? t.map((n, r) => {
        const i = e[r];
        return i ? {
          ...i,
          ...n
        } : n;
      }) : [t] : Array.isArray(t) ? t : [
        {
          ...e,
          ...t
        }
      ] : Array.isArray(e) ? e : [e];
  }
  /**
   * Returns Tool conversion configuration
   */
  get conversionConfig() {
    return this.constructable[je.ConversionConfig];
  }
  /**
   * Returns enabled inline tools for Tool
   */
  get enabledInlineTools() {
    return this.config[dt.EnabledInlineTools] || !1;
  }
  /**
   * Returns enabled tunes for Tool
   */
  get enabledBlockTunes() {
    return this.config[dt.EnabledBlockTunes];
  }
  /**
   * Returns Tool paste configuration
   */
  get pasteConfig() {
    return this.constructable[je.PasteConfig] ?? {};
  }
  get sanitizeConfig() {
    const e = super.sanitizeConfig, t = this.baseSanitizeConfig;
    if (J(e))
      return t;
    const n = {};
    for (const r in e)
      if (Object.prototype.hasOwnProperty.call(e, r)) {
        const i = e[r];
        z(i) ? n[r] = Object.assign({}, t, i) : n[r] = i;
      }
    return n;
  }
  get baseSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), Array.from(this.tunes.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), e;
  }
}
Bs([
  He
], Cn.prototype, "sanitizeConfig");
Bs([
  He
], Cn.prototype, "baseSanitizeConfig");
class Cu {
  /**
   * @class
   * @param config - tools config
   * @param editorConfig - EditorJS config
   * @param api - EditorJS API module
   */
  constructor(e, t, n) {
    this.api = n, this.config = e, this.editorConfig = t;
  }
  /**
   * Returns Tool object based on it's type
   *
   * @param name - tool name
   */
  get(e) {
    const { class: t, isInternal: n = !1, ...r } = this.config[e], i = this.getConstructor(t), s = t[yo.IsTune];
    return new i({
      name: e,
      constructable: t,
      config: r,
      api: this.api.getMethodsForTool(e, s),
      isDefault: e === this.editorConfig.defaultBlock,
      defaultPlaceholder: this.editorConfig.placeholder,
      isInternal: n
    });
  }
  /**
   * Find appropriate Tool object constructor for Tool constructable
   *
   * @param constructable - Tools constructable
   */
  getConstructor(e) {
    switch (!0) {
      case e[_t.IsInline]:
        return ku;
      case e[yo.IsTune]:
        return wu;
      default:
        return Cn;
    }
  }
}
let Os = class {
  /**
   * MoveDownTune constructor
   *
   * @param {API} api — Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: ql,
      title: this.api.i18n.t("Move down"),
      onActivate: () => this.handleClick(),
      name: "move-down"
    };
  }
  /**
   * Handle clicks on 'move down' button
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e + 1);
    if (!t)
      throw new Error("Unable to move Block down since it is already the last");
    const n = t.holder, r = n.getBoundingClientRect();
    let i = Math.abs(window.innerHeight - n.offsetHeight);
    r.top < window.innerHeight && (i = window.scrollY + n.offsetHeight), window.scrollTo(0, i), this.api.blocks.move(e + 1), this.api.toolbar.toggleBlockSettings(!0);
  }
};
Os.isTune = !0;
let Is = class {
  /**
   * DeleteTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: Gl,
      title: this.api.i18n.t("Delete"),
      name: "delete",
      confirmation: {
        title: this.api.i18n.t("Click to delete"),
        onActivate: () => this.handleClick()
      }
    };
  }
  /**
   * Delete block conditions passed
   */
  handleClick() {
    this.api.blocks.delete();
  }
};
Is.isTune = !0;
let Ms = class {
  /**
   * MoveUpTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: Xl,
      title: this.api.i18n.t("Move up"),
      onActivate: () => this.handleClick(),
      name: "move-up"
    };
  }
  /**
   * Move current block up
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e), n = this.api.blocks.getBlockByIndex(e - 1);
    if (e === 0 || !t || !n)
      throw new Error("Unable to move Block up since it is already the first");
    const r = t.holder, i = n.holder, s = r.getBoundingClientRect(), a = i.getBoundingClientRect();
    let l;
    a.top > 0 ? l = Math.abs(s.top) - Math.abs(a.top) : l = Math.abs(s.top) + a.height, window.scrollBy(0, -1 * l), this.api.blocks.move(e - 1), this.api.toolbar.toggleBlockSettings(!0);
  }
};
Ms.isTune = !0;
var Tu = Object.defineProperty, Su = Object.getOwnPropertyDescriptor, _u = (o, e, t, n) => {
  for (var r = Su(e, t), i = o.length - 1, s; i >= 0; i--)
    (s = o[i]) && (r = s(e, t, r) || r);
  return r && Tu(e, t, r), r;
};
let Ls = class extends O {
  constructor() {
    super(...arguments), this.stubTool = "stub", this.toolsAvailable = new oe(), this.toolsUnavailable = new oe();
  }
  /**
   * Returns available Tools
   */
  get available() {
    return this.toolsAvailable;
  }
  /**
   * Returns unavailable Tools
   */
  get unavailable() {
    return this.toolsUnavailable;
  }
  /**
   * Return Tools for the Inline Toolbar
   */
  get inlineTools() {
    return this.available.inlineTools;
  }
  /**
   * Return editor block tools
   */
  get blockTools() {
    return this.available.blockTools;
  }
  /**
   * Return available Block Tunes
   *
   * @returns {object} - object of Inline Tool's classes
   */
  get blockTunes() {
    return this.available.blockTunes;
  }
  /**
   * Returns default Tool object
   */
  get defaultTool() {
    return this.blockTools.get(this.config.defaultBlock);
  }
  /**
   * Returns internal tools
   */
  get internal() {
    return this.available.internalTools;
  }
  /**
   * Creates instances via passed or default configuration
   *
   * @returns {Promise<void>}
   */
  async prepare() {
    if (this.validateTools(), this.config.tools = po({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0)
      throw Error("Can't start without tools");
    const e = this.prepareConfig();
    this.factory = new Cu(e, this.config, this.Editor.API);
    const t = this.getListOfPrepareFunctions(e);
    if (t.length === 0)
      return Promise.resolve();
    await Ga(t, (n) => {
      this.toolPrepareMethodSuccess(n);
    }, (n) => {
      this.toolPrepareMethodFallback(n);
    }), this.prepareBlockTools();
  }
  getAllInlineToolsSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => {
      Object.assign(e, t.sanitizeConfig);
    }), e;
  }
  /**
   * Calls each Tool reset method to clean up anything set by Tool
   */
  destroy() {
    Object.values(this.available).forEach(async (e) => {
      D(e.reset) && await e.reset();
    });
  }
  /**
   * Returns internal tools
   * Includes Bold, Italic, Link and Paragraph
   */
  get internalTools() {
    return {
      convertTo: {
        class: Ss,
        isInternal: !0
      },
      link: {
        class: En,
        isInternal: !0
      },
      bold: {
        class: wn,
        isInternal: !0
      },
      italic: {
        class: xn,
        isInternal: !0
      },
      paragraph: {
        class: kn,
        inlineToolbar: !0,
        isInternal: !0
      },
      stub: {
        class: _s,
        isInternal: !0
      },
      moveUp: {
        class: Ms,
        isInternal: !0
      },
      delete: {
        class: Is,
        isInternal: !0
      },
      moveDown: {
        class: Os,
        isInternal: !0
      }
    };
  }
  /**
   * Tool prepare method success callback
   *
   * @param {object} data - append tool to available list
   */
  toolPrepareMethodSuccess(e) {
    const t = this.factory.get(e.toolName);
    if (t.isInline()) {
      const n = ["render"].filter((r) => !t.create()[r]);
      if (n.length) {
        L(
          `Incorrect Inline Tool: ${t.name}. Some of required methods is not implemented %o`,
          "warn",
          n
        ), this.toolsUnavailable.set(t.name, t);
        return;
      }
    }
    this.toolsAvailable.set(t.name, t);
  }
  /**
   * Tool prepare method fail callback
   *
   * @param {object} data - append tool to unavailable list
   */
  toolPrepareMethodFallback(e) {
    this.toolsUnavailable.set(e.toolName, this.factory.get(e.toolName));
  }
  /**
   * Binds prepare function of plugins with user or default config
   *
   * @returns {Array} list of functions that needs to be fired sequentially
   * @param config - tools config
   */
  getListOfPrepareFunctions(e) {
    const t = [];
    return Object.entries(e).forEach(([n, r]) => {
      t.push({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function: D(r.class.prepare) ? r.class.prepare : () => {
        },
        data: {
          toolName: n,
          config: r.config
        }
      });
    }), t;
  }
  /**
   * Assign enabled Inline Tools and Block Tunes for Block Tool
   */
  prepareBlockTools() {
    Array.from(this.blockTools.values()).forEach((e) => {
      this.assignInlineToolsToBlockTool(e), this.assignBlockTunesToBlockTool(e);
    });
  }
  /**
   * Assign enabled Inline Tools for Block Tool
   *
   * @param tool - Block Tool
   */
  assignInlineToolsToBlockTool(e) {
    if (this.config.inlineToolbar !== !1) {
      if (e.enabledInlineTools === !0) {
        e.inlineTools = new oe(
          Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map((t) => [t, this.inlineTools.get(t)]) : Array.from(this.inlineTools.entries())
        );
        return;
      }
      Array.isArray(e.enabledInlineTools) && (e.inlineTools = new oe(
        /** Prepend ConvertTo Inline Tool */
        ["convertTo", ...e.enabledInlineTools].map((t) => [t, this.inlineTools.get(t)])
      ));
    }
  }
  /**
   * Assign enabled Block Tunes for Block Tool
   *
   * @param tool — Block Tool
   */
  assignBlockTunesToBlockTool(e) {
    if (e.enabledBlockTunes !== !1) {
      if (Array.isArray(e.enabledBlockTunes)) {
        const t = new oe(
          e.enabledBlockTunes.map((n) => [n, this.blockTunes.get(n)])
        );
        e.tunes = new oe([...t, ...this.blockTunes.internalTools]);
        return;
      }
      if (Array.isArray(this.config.tunes)) {
        const t = new oe(
          this.config.tunes.map((n) => [n, this.blockTunes.get(n)])
        );
        e.tunes = new oe([...t, ...this.blockTunes.internalTools]);
        return;
      }
      e.tunes = this.blockTunes.internalTools;
    }
  }
  /**
   * Validate Tools configuration objects and throw Error for user if it is invalid
   */
  validateTools() {
    for (const e in this.config.tools)
      if (Object.prototype.hasOwnProperty.call(this.config.tools, e)) {
        if (e in this.internalTools)
          return;
        const t = this.config.tools[e];
        if (!D(t) && !D(t.class))
          throw Error(
            `Tool «${e}» must be a constructor function or an object with function in the «class» property`
          );
      }
  }
  /**
   * Unify tools config
   */
  prepareConfig() {
    const e = {};
    for (const t in this.config.tools)
      z(this.config.tools[t]) ? e[t] = this.config.tools[t] : e[t] = { class: this.config.tools[t] };
    return e;
  }
};
_u([
  He
], Ls.prototype, "getAllInlineToolsSanitizeConfig");
const li = `:root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}.codex-editor ::-moz-selection{background-color:#d4ecff}.codex-editor ::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;--color-background-icon-active: rgba(56, 138, 229, .1);--color-text-icon-active: #388AE5;--color-text-primary: black;position:absolute;visibility:hidden;-webkit-transition:opacity .25s ease;transition:opacity .25s ease;will-change:opacity,left,top;top:0;left:0;z-index:3;opacity:1;visibility:visible}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{color:var(--color-text-primary);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:0;border-radius:4px;line-height:normal;height:100%;padding:0;width:28px;background-color:transparent;cursor:pointer}@media (max-width: 650px){.ce-inline-tool{width:36px;height:36px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#f8f8f8}}.ce-inline-tool svg{display:block;width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:4px 8px;font-size:14px;line-height:22px;outline:none;margin:0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-inline-tool--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:12px 18px;margin:10px 0;border-radius:10px;background:#eff2f5;border:1px solid #EFF0F1;color:#707684;font-size:14px}.ce-stub svg{width:20px;height:20px}.ce-stub__info{margin-left:14px}.ce-stub__title{font-weight:500;text-transform:capitalize}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #EFF0F1;--color-shadow: rgba(13, 20, 33, .1);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #F8F8F8;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;--popover-top: calc(100% + var(--offset-from-target));--popover-left: 0;--nested-popover-overlap: 4px;--icon-size: 20px;--item-padding: 3px;--item-height: calc(var(--icon-size) + 2 * var(--item-padding))}.ce-popover__container{min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:var(--popover-left);top:var(--popover-top);background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened>.ce-popover__container{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened>.ce-popover__container{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover--open-top .ce-popover__container{--popover-top: calc(-1 * (var(--offset-from-target) + var(--popover-height)))}.ce-popover--open-left .ce-popover__container{--popover-left: calc(-1 * var(--width) + 100%)}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}@media (max-width: 650px){.ce-popover .ce-popover__container{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}}.ce-popover__search{margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover--nested .ce-popover__container{--popover-left: calc(var(--nesting-level) * (var(--width) - var(--nested-popover-overlap)));top:calc(var(--trigger-item-top) - var(--nested-popover-overlap));position:absolute}.ce-popover--open-top.ce-popover--nested .ce-popover__container{top:calc(var(--trigger-item-top) - var(--popover-height) + var(--item-height) + var(--offset-from-target) + var(--nested-popover-overlap))}.ce-popover--open-left .ce-popover--nested .ce-popover__container{--popover-left: calc(-1 * (var(--nesting-level) + 1) * var(--width) + 100%)}.ce-popover-item-separator{padding:4px 3px}.ce-popover-item-separator--hidden{display:none}.ce-popover-item-separator__line{height:1px;background:var(--color-border);width:100%}.ce-popover-item-html--hidden{display:none}.ce-popover-item{--border-radius: 6px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:var(--item-padding);color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:none;background:transparent}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover-item__icon--tool{margin-right:4px}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:auto}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title,.ce-popover-item--confirmation .ce-popover-item__icon{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.ce-popover-header{margin-bottom:8px;margin-top:4px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover-header__text{font-size:18px;font-weight:600}.ce-popover-header__back-button{border:0;background:transparent;width:36px;height:36px;color:var(--color-text-primary)}.ce-popover-header__back-button svg{display:block;width:28px;height:28px}.ce-popover--inline{--height: 38px;--height-mobile: 46px;--container-padding: 4px;position:relative}.ce-popover--inline .ce-popover__custom-content{margin-bottom:0}.ce-popover--inline .ce-popover__items{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-popover--inline .ce-popover__container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:var(--container-padding);height:var(--height);top:0;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;width:-webkit-max-content;width:-moz-max-content;width:max-content;-webkit-animation:none;animation:none}@media (max-width: 650px){.ce-popover--inline .ce-popover__container{height:var(--height-mobile);position:absolute}}.ce-popover--inline .ce-popover-item-separator{padding:0 4px}.ce-popover--inline .ce-popover-item-separator__line{height:100%;width:1px}.ce-popover--inline .ce-popover-item{border-radius:4px;padding:4px}.ce-popover--inline .ce-popover-item__icon--tool{-webkit-box-shadow:none;box-shadow:none;background:transparent;margin-right:0}.ce-popover--inline .ce-popover-item__icon{width:auto;width:initial;height:auto;height:initial}.ce-popover--inline .ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover--inline .ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover--inline .ce-popover-item:not(:last-of-type){margin-bottom:0;margin-bottom:initial}.ce-popover--inline .ce-popover-item-html{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover--inline .ce-popover-item__icon--chevron-right{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{--offset: 3px;left:0;top:calc(var(--height) + var(--offset))}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{top:calc(var(--height-mobile) + var(--offset))}}.ce-popover--inline .ce-popover--nested .ce-popover__container{min-width:var(--width);width:var(--width);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;padding:6px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ce-popover--inline .ce-popover--nested .ce-popover__items{display:block;width:100%}.ce-popover--inline .ce-popover--nested .ce-popover-item{border-radius:6px;padding:3px}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested .ce-popover-item{padding:4px}}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon--tool{margin-right:4px}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon{width:26px;height:26px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator{padding:4px 3px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator__line{width:100%;height:1px}.codex-editor [data-placeholder]:empty:before,.codex-editor [data-placeholder][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text;content:attr(data-placeholder)}.codex-editor [data-placeholder-active]:empty:before,.codex-editor [data-placeholder-active][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text}.codex-editor [data-placeholder-active]:empty:focus:before,.codex-editor [data-placeholder-active][data-empty=true]:focus:before{content:attr(data-placeholder-active)}.ce-hint--align-start{text-align:left}.ce-hint--align-center{text-align:center}.ce-hint__description{opacity:.6;margin-top:3px}
`;
class Bu extends O {
  constructor() {
    super(...arguments), this.isMobile = !1, this.contentRectCache = null, this.resizeDebouncer = Zr(() => {
      this.windowResize();
    }, 200), this.selectionChangeDebounced = Zr(() => {
      this.selectionChanged();
    }, du), this.documentTouchedListener = (e) => {
      this.documentTouched(e);
    };
  }
  /**
   * Editor.js UI CSS class names
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorWrapperNarrow: "codex-editor--narrow",
      editorZone: "codex-editor__redactor",
      editorZoneHidden: "codex-editor__redactor--hidden",
      editorEmpty: "codex-editor--empty",
      editorRtlFix: "codex-editor--rtl"
    };
  }
  /**
   * Return Width of center column of Editor
   *
   * @returns {DOMRect}
   */
  get contentRect() {
    if (this.contentRectCache !== null)
      return this.contentRectCache;
    const e = this.nodes.wrapper.querySelector(`.${fe.CSS.content}`);
    return e ? (this.contentRectCache = e.getBoundingClientRect(), this.contentRectCache) : {
      width: 650,
      left: 0,
      right: 0
    };
  }
  /**
   * Making main interface
   */
  async prepare() {
    this.setIsMobile(), this.make(), this.loadStyles();
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - removes all listeners from main UI module elements
   *
   * if readOnly is false:
   *  - enables all listeners to UI module elements
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.unbindReadOnlySensitiveListeners() : window.requestIdleCallback(() => {
      this.bindReadOnlySensitiveListeners();
    }, {
      timeout: 2e3
    });
  }
  /**
   * Check if Editor is empty and set CSS class to wrapper
   */
  checkEmptiness() {
    const { BlockManager: e } = this.Editor;
    this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty, e.isEditorEmpty);
  }
  /**
   * Check if one of Toolbar is opened
   * Used to prevent global keydowns (for example, Enter) conflicts with Enter-on-toolbar
   *
   * @returns {boolean}
   */
  get someToolbarOpened() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: n } = this.Editor;
    return !!(t.opened || n.opened || e.toolbox.opened);
  }
  /**
   * Check for some Flipper-buttons is under focus
   */
  get someFlipperButtonFocused() {
    return this.Editor.Toolbar.toolbox.hasFocus() ? !0 : Object.entries(this.Editor).filter(([e, t]) => t.flipper instanceof Tt).some(([e, t]) => t.flipper.hasFocus());
  }
  /**
   * Clean editor`s UI
   */
  destroy() {
    this.nodes.holder.innerHTML = "", this.unbindReadOnlyInsensitiveListeners();
  }
  /**
   * Close all Editor's toolbars
   */
  closeAllToolbars() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: n } = this.Editor;
    t.close(), n.close(), e.toolbox.close();
  }
  /**
   * Check for mobile mode and save the result
   */
  setIsMobile() {
    const e = window.innerWidth < Ei;
    e !== this.isMobile && this.eventsDispatcher.emit(Ze, {
      isEnabled: this.isMobile
    }), this.isMobile = e;
  }
  /**
   * Makes Editor.js interface
   */
  make() {
    this.nodes.holder = f.getHolder(this.config.holder), this.nodes.wrapper = f.make("div", [
      this.CSS.editorWrapper,
      ...this.isRtl ? [this.CSS.editorRtlFix] : []
    ]), this.nodes.redactor = f.make("div", this.CSS.editorZone), this.nodes.holder.offsetWidth < this.contentRect.width && this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow), this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px", this.nodes.wrapper.appendChild(this.nodes.redactor), this.nodes.holder.appendChild(this.nodes.wrapper), this.bindReadOnlyInsensitiveListeners();
  }
  /**
   * Appends CSS
   */
  loadStyles() {
    const e = "editor-js-styles", t = this.config.shadowRoot;
    if (t) {
      if (t.querySelector(`#${e}`))
        return;
      const n = f.make("style", null, {
        id: e,
        textContent: li.toString()
      });
      this.config.style && !J(this.config.style) && this.config.style.nonce && n.setAttribute("nonce", this.config.style.nonce), t.prepend(n);
    } else {
      if (f.get(e))
        return;
      const n = f.make("style", null, {
        id: e,
        textContent: li.toString()
      });
      this.config.style && !J(this.config.style) && this.config.style.nonce && n.setAttribute("nonce", this.config.style.nonce), f.prepend(document.head, n);
    }
  }
  /**
   * Adds listeners that should work both in read-only and read-write modes
   */
  bindReadOnlyInsensitiveListeners() {
    this.listeners.on(document, "selectionchange", this.selectionChangeDebounced), this.listeners.on(window, "resize", this.resizeDebouncer, {
      passive: !0
    }), this.listeners.on(this.nodes.redactor, "mousedown", this.documentTouchedListener, {
      capture: !0,
      passive: !0
    }), this.listeners.on(this.nodes.redactor, "touchstart", this.documentTouchedListener, {
      capture: !0,
      passive: !0
    });
  }
  /**
   * Removes listeners that should work both in read-only and read-write modes
   */
  unbindReadOnlyInsensitiveListeners() {
    this.listeners.off(document, "selectionchange", this.selectionChangeDebounced), this.listeners.off(window, "resize", this.resizeDebouncer), this.listeners.off(this.nodes.redactor, "mousedown", this.documentTouchedListener), this.listeners.off(this.nodes.redactor, "touchstart", this.documentTouchedListener);
  }
  /**
   * Adds listeners that should work only in read-only mode
   */
  bindReadOnlySensitiveListeners() {
    this.readOnlyMutableListeners.on(this.nodes.redactor, "click", (e) => {
      this.redactorClicked(e);
    }, !1), this.readOnlyMutableListeners.on(pe(), "keydown", (e) => {
      this.documentKeydown(e);
    }, !0), this.readOnlyMutableListeners.on(pe(), "mousedown", (e) => {
      this.documentClicked(e);
    }, !0), this.watchBlockHoveredEvents(), this.enableInputsEmptyMark();
  }
  /**
   * Listen redactor mousemove to emit 'block-hovered' event
   */
  watchBlockHoveredEvents() {
    let e;
    this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", ho((t) => {
      const n = t.target.closest(".ce-block");
      this.Editor.BlockSelection.anyBlockSelected || n && e !== n && (e = n, this.eventsDispatcher.emit(Gi, {
        block: this.Editor.BlockManager.getBlockByChildNode(n)
      }));
    }, 20), {
      passive: !0
    });
  }
  /**
   * Unbind events that should work only in read-only mode
   */
  unbindReadOnlySensitiveListeners() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Resize window handler
   */
  windowResize() {
    this.contentRectCache = null, this.setIsMobile();
  }
  /**
   * All keydowns on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  documentKeydown(e) {
    switch (e.keyCode) {
      case S.ENTER:
        this.enterPressed(e);
        break;
      case S.BACKSPACE:
      case S.DELETE:
        this.backspacePressed(e);
        break;
      case S.ESC:
        this.escapePressed(e);
        break;
      default:
        this.defaultBehaviour(e);
        break;
    }
  }
  /**
   * Ignore all other document's keydown events
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  defaultBehaviour(e) {
    const { currentBlock: t } = this.Editor.BlockManager, n = e.target.closest(`.${this.CSS.editorWrapper}`), r = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    if (t !== void 0 && n === null) {
      this.Editor.BlockEvents.keydown(e);
      return;
    }
    n || t && r || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
  }
  /**
   * @param {KeyboardEvent} event - keyboard event
   */
  backspacePressed(e) {
    const { BlockManager: t, BlockSelection: n, Caret: r } = this.Editor;
    if (n.anyBlockSelected && !C.isSelectionExists) {
      const i = t.removeSelectedBlocks(), s = t.insertDefaultBlockAtIndex(i, !0);
      r.setToBlock(s, r.positions.START), n.clearSelection(e), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
    }
  }
  /**
   * Escape pressed
   * If some of Toolbar components are opened, then close it otherwise close Toolbar
   *
   * @param {Event} event - escape keydown event
   */
  escapePressed(e) {
    this.Editor.BlockSelection.clearSelection(e), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
  }
  /**
   * Enter pressed on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  enterPressed(e) {
    const { BlockManager: t, BlockSelection: n } = this.Editor;
    if (this.someToolbarOpened)
      return;
    const r = t.currentBlockIndex >= 0;
    if (n.anyBlockSelected && !C.isSelectionExists) {
      n.clearSelection(e), e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
      return;
    }
    if (!this.someToolbarOpened && r && e.target.tagName === "BODY") {
      const i = this.Editor.BlockManager.insert();
      e.preventDefault(), this.Editor.Caret.setToBlock(i), this.Editor.Toolbar.moveAndOpen(i);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * All clicks on document
   *
   * @param {MouseEvent} event - Click event
   */
  documentClicked(e) {
    var t, n;
    if (!e.isTrusted)
      return;
    const r = e.target;
    this.nodes.holder.contains(r) || C.isAtEditor || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
    const i = (t = this.Editor.BlockSettings.nodes.wrapper) == null ? void 0 : t.contains(r), s = (n = this.Editor.Toolbar.nodes.settingsToggler) == null ? void 0 : n.contains(r), a = i || s;
    if (this.Editor.BlockSettings.opened && !a) {
      this.Editor.BlockSettings.close();
      const l = this.Editor.BlockManager.getBlockByChildNode(r);
      this.Editor.Toolbar.moveAndOpen(l);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * First touch on editor
   * Fired before click
   *
   * Used to change current block — we need to do it before 'selectionChange' event.
   * Also:
   * - Move and show the Toolbar
   * - Set a Caret
   *
   * @param event - touch or mouse event
   */
  documentTouched(e) {
    let t = e.target;
    if (t === this.nodes.redactor) {
      const n = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX, r = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      t = uo(n, r);
    }
    try {
      this.Editor.BlockManager.setCurrentBlockByChildNode(t);
    } catch {
      this.Editor.RectangleSelection.isRectActivated() || this.Editor.Caret.setToTheLastBlock();
    }
    this.Editor.ReadOnly.isEnabled || this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * All clicks on the redactor zone
   *
   * @param {MouseEvent} event - click event
   * @description
   * - By clicks on the Editor's bottom zone:
   *      - if last Block is empty, set a Caret to this
   *      - otherwise, add a new empty Block and set a Caret to that
   */
  redactorClicked(e) {
    if (!C.isCollapsed)
      return;
    const t = e.target, n = e.metaKey || e.ctrlKey, r = f.getClosestAnchor(t);
    if (r && n) {
      e.stopImmediatePropagation(), e.stopPropagation();
      const i = r.getAttribute("href"), s = el(i);
      ol(s);
      return;
    }
    this.processBottomZoneClick(e);
  }
  /**
   * Check if user clicks on the Editor's bottom zone:
   *  - set caret to the last block
   *  - or add new empty block
   *
   * @param event - click event
   */
  processBottomZoneClick(e) {
    const t = this.Editor.BlockManager.getBlockByIndex(-1), n = f.offset(t.holder).bottom, r = e.pageY, { BlockSelection: i } = this.Editor;
    if (e.target instanceof Element && e.target.isEqualNode(this.nodes.redactor) && /**
    * If there is cross block selection started, target will be equal to redactor so we need additional check
    */
    !i.anyBlockSelected && /**
    * Prevent caret jumping (to last block) when clicking between blocks
    */
    n < r) {
      e.stopImmediatePropagation(), e.stopPropagation();
      const { BlockManager: s, Caret: a, Toolbar: l } = this.Editor;
      (!s.lastBlock.tool.isDefault || !s.lastBlock.isEmpty) && s.insertAtEnd(), a.setToTheLastBlock(), l.moveAndOpen(s.lastBlock);
    }
  }
  /**
   * Handle selection changes on mobile devices
   * Uses for showing the Inline Toolbar
   */
  selectionChanged() {
    const { CrossBlockSelection: e, BlockSelection: t } = this.Editor, n = C.anchorElement;
    if (e.isCrossBlockSelectionStarted && t.anyBlockSelected && C.get().removeAllRanges(), !n) {
      C.range || this.Editor.InlineToolbar.close();
      return;
    }
    const r = n.closest(`.${fe.CSS.content}`);
    (r === null || r.closest(`.${C.CSS.editorWrapper}`) !== this.nodes.wrapper) && (this.Editor.InlineToolbar.containsNode(n) || this.Editor.InlineToolbar.close(), n.dataset.inlineToolbar !== "true") || (this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(n), this.Editor.InlineToolbar.tryToShow(!0));
  }
  /**
   * Editor.js provides and ability to show placeholders for empty contenteditable elements
   *
   * This method watches for input and focus events and toggles 'data-empty' attribute
   * to workaroud the case, when inputs contains only <br>s and has no visible content
   * Then, CSS could rely on this attribute to show placeholders
   */
  enableInputsEmptyMark() {
    function e(t) {
      const n = t.target;
      Ci(n);
    }
    this.readOnlyMutableListeners.on(this.nodes.wrapper, "input", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusin", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusout", e);
  }
}
const Ou = {
  // API Modules
  BlocksAPI: pl,
  CaretAPI: gl,
  EventsAPI: ml,
  I18nAPI: bl,
  API: vl,
  InlineToolbarAPI: yl,
  ListenersAPI: kl,
  NotifierAPI: Cl,
  ReadOnlyAPI: Tl,
  SanitizerAPI: Ll,
  SaverAPI: Pl,
  SelectionAPI: Al,
  ToolsAPI: Nl,
  StylesAPI: jl,
  ToolbarAPI: Dl,
  TooltipAPI: Ul,
  UiAPI: zl,
  // Toolbar Modules
  BlockSettings: gc,
  Toolbar: Ec,
  InlineToolbar: Cc,
  // Modules
  BlockEvents: ou,
  BlockManager: iu,
  BlockSelection: su,
  Caret: au,
  CrossBlockSelection: lu,
  DragNDrop: cu,
  ModificationsObserver: hu,
  Paste: pu,
  ReadOnly: fu,
  RectangleSelection: gu,
  Renderer: mu,
  Saver: bu,
  Tools: Ls,
  UI: Bu
};
class Iu {
  /**
   * @param {EditorConfig} config - user configuration
   */
  constructor(e) {
    this.moduleInstances = {}, this.eventsDispatcher = new et();
    let t, n;
    this.isReady = new Promise((r, i) => {
      t = r, n = i;
    }), Promise.resolve().then(async () => {
      this.configuration = e, this.validate(), this.init(), await this.start(), await this.render();
      const { BlockManager: r, Caret: i, UI: s, ModificationsObserver: a } = this.moduleInstances;
      s.checkEmptiness(), a.enable(), this.configuration.autofocus === !0 && this.configuration.readOnly !== !0 && i.setToBlock(r.blocks[0], i.positions.START), t();
    }).catch((r) => {
      L(`Editor.js is not ready because of ${r}`, "error"), n(r);
    });
  }
  /**
   * Setting for configuration
   *
   * @param {EditorConfig|string} config - Editor's config to set
   */
  set configuration(e) {
    var t, n;
    z(e) ? this.config = {
      ...e
    } : this.config = {
      holder: e
    }, fo(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.shadowRoot && za(this.config.shadowRoot), this.config.logLevel || (this.config.logLevel = ki.VERBOSE), Va(this.config.logLevel), fo(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
    const r = {
      type: this.config.defaultBlock,
      data: {}
    };
    this.config.placeholder = this.config.placeholder || !1, this.config.sanitizer = this.config.sanitizer || {
      p: !0,
      b: !0,
      a: !0
    }, this.config.hideToolbar = this.config.hideToolbar ? this.config.hideToolbar : !1, this.config.tools = this.config.tools || {}, this.config.i18n = this.config.i18n || {}, this.config.data = this.config.data || { blocks: [] }, this.config.onReady = this.config.onReady || (() => {
    }), this.config.onChange = this.config.onChange || (() => {
    }), this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : !0, (J(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = { blocks: [r] }), this.config.readOnly = this.config.readOnly || !1, (t = this.config.i18n) != null && t.messages && V.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((n = this.config.i18n) == null ? void 0 : n.direction) || "ltr";
  }
  /**
   * Returns private property
   *
   * @returns {EditorConfig}
   */
  get configuration() {
    return this.config;
  }
  /**
   * Checks for required fields in Editor's config
   */
  validate() {
    const { holderId: e, holder: t } = this.config;
    if (e && t)
      throw Error("«holderId» and «holder» param can't assign at the same time.");
    if (ge(t) && !f.get(t))
      throw Error(`element with ID «${t}» is missing. Pass correct holder's ID.`);
    if (t && z(t) && !f.isElement(t))
      throw Error("«holder» value must be an Element node");
  }
  /**
   * Initializes modules:
   *  - make and save instances
   *  - configure
   */
  init() {
    this.constructModules(), this.configureModules();
  }
  /**
   * Start Editor!
   *
   * Get list of modules that needs to be prepared and return a sequence (Promise)
   *
   * @returns {Promise<void>}
   */
  async start() {
    await [
      "Tools",
      "UI",
      "BlockManager",
      "Paste",
      "BlockSelection",
      "RectangleSelection",
      "CrossBlockSelection",
      "ReadOnly"
    ].reduce(
      (e, t) => e.then(async () => {
        try {
          await this.moduleInstances[t].prepare();
        } catch (n) {
          if (n instanceof _i)
            throw new Error(n.message);
          L(`Module ${t} was skipped because of %o`, "warn", n);
        }
      }),
      Promise.resolve()
    );
  }
  /**
   * Render initial data
   */
  render() {
    return this.moduleInstances.Renderer.render(this.config.data.blocks);
  }
  /**
   * Make modules instances and save it to the @property this.moduleInstances
   */
  constructModules() {
    Object.entries(Ou).forEach(([e, t]) => {
      try {
        this.moduleInstances[e] = new t({
          config: this.configuration,
          eventsDispatcher: this.eventsDispatcher
        });
      } catch (n) {
        L("[constructModules]", `Module ${e} skipped because`, "error", n);
      }
    });
  }
  /**
   * Modules instances configuration:
   *  - pass other modules to the 'state' property
   *  - ...
   */
  configureModules() {
    for (const e in this.moduleInstances)
      Object.prototype.hasOwnProperty.call(this.moduleInstances, e) && (this.moduleInstances[e].state = this.getModulesDiff(e));
  }
  /**
   * Return modules without passed name
   *
   * @param {string} name - module for witch modules difference should be calculated
   */
  getModulesDiff(e) {
    const t = {};
    for (const n in this.moduleInstances)
      n !== e && (t[n] = this.moduleInstances[n]);
    return t;
  }
}
class Mu {
  /** Editor version */
  static get version() {
    return "2.31.6";
  }
  /**
   * @param {EditorConfig|string|undefined} [configuration] - user configuration
   */
  constructor(e) {
    let t = () => {
    };
    z(e) && D(e.onReady) && (t = e.onReady);
    const n = new Iu(e);
    this.isReady = n.isReady.then(() => {
      this.exportAPI(n), t();
    });
  }
  /**
   * Export external API methods
   *
   * @param {Core} editor — Editor's instance
   */
  exportAPI(e) {
    const t = ["configuration"], n = () => {
      Object.values(e.moduleInstances).forEach((r) => {
        D(r.destroy) && r.destroy(), r.listeners.removeAll();
      }), Fl(), e = null;
      for (const r in this)
        Object.prototype.hasOwnProperty.call(this, r) && delete this[r];
      Object.setPrototypeOf(this, null);
    };
    t.forEach((r) => {
      this[r] = e[r];
    }), this.destroy = n, Object.setPrototypeOf(this, e.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
      blocks: {
        clear: "clear",
        render: "render"
      },
      caret: {
        focus: "focus"
      },
      events: {
        on: "on",
        off: "off",
        emit: "emit"
      },
      saver: {
        save: "save"
      }
    }).forEach(([r, i]) => {
      Object.entries(i).forEach(([s, a]) => {
        this[a] = e.moduleInstances.API.methods[r][s];
      });
    });
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      o.appendChild(document.createTextNode(".ce-header{padding:.6em 0 3px;margin:0;line-height:1.25em;outline:none}.ce-header p,.ce-header div{padding:0!important;margin:0!important}")), document.head.appendChild(o);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const Lu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>', Pu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>', Au = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>', Nu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>', ju = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>', Du = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>', Ru = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7L9 12M9 17V12M9 12L15 12M15 7V12M15 17L15 12"/></svg>';
let $u = class {
  constructor({ data: e, config: t, api: n, readOnly: r }) {
    this.api = n, this.readOnly = r, this._settings = t, this._data = this.normalizeData(e), this._element = this.getTag();
  }
  /**
   * Styles
   */
  get _CSS() {
    return {
      block: this.api.styles.block,
      wrapper: "ce-header"
    };
  }
  /**
   * Check if data is valid
   * 
   * @param {any} data - data to check
   * @returns {data is HeaderData}
   * @private
   */
  isHeaderData(e) {
    return e.text !== void 0;
  }
  /**
   * Normalize input data
   *
   * @param {HeaderData} data - saved data to process
   *
   * @returns {HeaderData}
   * @private
   */
  normalizeData(e) {
    const t = { text: "", level: this.defaultLevel.number };
    return this.isHeaderData(e) && (t.text = e.text || "", e.level !== void 0 && !isNaN(parseInt(e.level.toString())) && (t.level = parseInt(e.level.toString()))), t;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLHeadingElement}
   * @public
   */
  render() {
    return this._element;
  }
  /**
   * Returns header block tunes config
   *
   * @returns {Array}
   */
  renderSettings() {
    return this.levels.map((e) => ({
      icon: e.svg,
      label: this.api.i18n.t(`Heading ${e.number}`),
      onActivate: () => this.setLevel(e.number),
      closeOnActivate: !0,
      isActive: this.currentLevel.number === e.number,
      render: () => document.createElement("div")
    }));
  }
  /**
   * Callback for Block's settings buttons
   *
   * @param {number} level - level to set
   */
  setLevel(e) {
    this.data = {
      level: e,
      text: this.data.text
    };
  }
  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {HeaderData} data - saved data to merger with current block
   * @public
   */
  merge(e) {
    this._element.insertAdjacentHTML("beforeend", e.text);
  }
  /**
   * Validate Text block data:
   * - check for emptiness
   *
   * @param {HeaderData} blockData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(e) {
    return e.text.trim() !== "";
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLHeadingElement} toolsContent - Text tools rendered view
   * @returns {HeaderData} - saved data
   * @public
   */
  save(e) {
    return {
      text: e.innerHTML,
      level: this.currentLevel.number
    };
  }
  /**
   * Allow Header to be converted to/from other blocks
   */
  static get conversionConfig() {
    return {
      export: "text",
      // use 'text' property for other blocks
      import: "text"
      // fill 'text' property from other block's export string
    };
  }
  /**
   * Sanitizer Rules
   */
  static get sanitize() {
    return {
      level: !1,
      text: {}
    };
  }
  /**
   * Returns true to notify core that read-only is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Get current Tools`s data
   *
   * @returns {HeaderData} Current data
   * @private
   */
  get data() {
    return this._data.text = this._element.innerHTML, this._data.level = this.currentLevel.number, this._data;
  }
  /**
   * Store data in plugin:
   * - at the this._data property
   * - at the HTML
   *
   * @param {HeaderData} data — data to set
   * @private
   */
  set data(e) {
    if (this._data = this.normalizeData(e), e.level !== void 0 && this._element.parentNode) {
      const t = this.getTag();
      t.innerHTML = this._element.innerHTML, this._element.parentNode.replaceChild(t, this._element), this._element = t;
    }
    e.text !== void 0 && (this._element.innerHTML = this._data.text || "");
  }
  /**
   * Get tag for target level
   * By default returns second-leveled header
   *
   * @returns {HTMLElement}
   */
  getTag() {
    const e = document.createElement(this.currentLevel.tag);
    return e.innerHTML = this._data.text || "", e.classList.add(this._CSS.wrapper), e.contentEditable = this.readOnly ? "false" : "true", e.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || ""), e;
  }
  /**
   * Get current level
   *
   * @returns {level}
   */
  get currentLevel() {
    let e = this.levels.find((t) => t.number === this._data.level);
    return e || (e = this.defaultLevel), e;
  }
  /**
   * Return default level
   *
   * @returns {level}
   */
  get defaultLevel() {
    if (this._settings.defaultLevel) {
      const e = this.levels.find((t) => t.number === this._settings.defaultLevel);
      if (e)
        return e;
      console.warn("(ง'̀-'́)ง Heading Tool: the default level specified was not found in available levels");
    }
    return this.levels[1];
  }
  /**
   * @typedef {object} level
   * @property {number} number - level number
   * @property {string} tag - tag corresponds with level number
   * @property {string} svg - icon
   */
  /**
   * Available header levels
   *
   * @returns {level[]}
   */
  get levels() {
    const e = [
      {
        number: 1,
        tag: "H1",
        svg: Lu
      },
      {
        number: 2,
        tag: "H2",
        svg: Pu
      },
      {
        number: 3,
        tag: "H3",
        svg: Au
      },
      {
        number: 4,
        tag: "H4",
        svg: Nu
      },
      {
        number: 5,
        tag: "H5",
        svg: ju
      },
      {
        number: 6,
        tag: "H6",
        svg: Du
      }
    ];
    return this._settings.levels ? e.filter(
      (t) => this._settings.levels.includes(t.number)
    ) : e;
  }
  /**
   * Handle H1-H6 tags on paste to substitute it with header Tool
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(e) {
    const t = e.detail;
    if ("data" in t) {
      const n = t.data;
      let r = this.defaultLevel.number;
      switch (n.tagName) {
        case "H1":
          r = 1;
          break;
        case "H2":
          r = 2;
          break;
        case "H3":
          r = 3;
          break;
        case "H4":
          r = 4;
          break;
        case "H5":
          r = 5;
          break;
        case "H6":
          r = 6;
          break;
      }
      this._settings.levels && (r = this._settings.levels.reduce((i, s) => Math.abs(s - r) < Math.abs(i - r) ? s : i)), this.data = {
        level: r,
        text: n.innerHTML
      };
    }
  }
  /**
   * Used by Editor.js paste handling API.
   * Provides configuration to handle H1-H6 tags.
   *
   * @returns {{handler: (function(HTMLElement): {text: string}), tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ["H1", "H2", "H3", "H4", "H5", "H6"]
    };
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: Ru,
      title: "Heading"
    };
  }
};
(function() {
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      o.appendChild(document.createTextNode(".cdx-quote-icon svg{transform:rotate(180deg)}.cdx-quote{margin:0}.cdx-quote__text{min-height:158px;margin-bottom:10px}.cdx-quote [contentEditable=true][data-placeholder]:before{position:absolute;content:attr(data-placeholder);color:#707684;font-weight:400;opacity:0}.cdx-quote [contentEditable=true][data-placeholder]:empty:before{opacity:1}.cdx-quote [contentEditable=true][data-placeholder]:empty:focus:before{opacity:0}.cdx-quote-settings{display:flex}.cdx-quote-settings .cdx-settings-button{width:50%}")), document.head.appendChild(o);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const Hu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 7L6 7"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 17H6"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 12L8 12"/></svg>', Fu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17 7L5 7"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17 17H5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13 12L5 12"/></svg>', Uu = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 10.8182L9 10.8182C8.80222 10.8182 8.60888 10.7649 8.44443 10.665C8.27998 10.5651 8.15181 10.4231 8.07612 10.257C8.00043 10.0909 7.98063 9.90808 8.01922 9.73174C8.0578 9.55539 8.15304 9.39341 8.29289 9.26627C8.43275 9.13913 8.61093 9.05255 8.80491 9.01747C8.99889 8.98239 9.19996 9.00039 9.38268 9.0692C9.56541 9.13801 9.72159 9.25453 9.83147 9.40403C9.94135 9.55353 10 9.72929 10 9.90909L10 12.1818C10 12.664 9.78929 13.1265 9.41421 13.4675C9.03914 13.8084 8.53043 14 8 14"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.8182L15 10.8182C14.8022 10.8182 14.6089 10.7649 14.4444 10.665C14.28 10.5651 14.1518 10.4231 14.0761 10.257C14.0004 10.0909 13.9806 9.90808 14.0192 9.73174C14.0578 9.55539 14.153 9.39341 14.2929 9.26627C14.4327 9.13913 14.6109 9.05255 14.8049 9.01747C14.9989 8.98239 15.2 9.00039 15.3827 9.0692C15.5654 9.13801 15.7216 9.25453 15.8315 9.40403C15.9414 9.55353 16 9.72929 16 9.90909L16 12.1818C16 12.664 15.7893 13.1265 15.4142 13.4675C15.0391 13.8084 14.5304 14 14 14"/></svg>';
var Bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function zu(o) {
  if (o.__esModule)
    return o;
  var e = o.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(o).forEach(function(n) {
    var r = Object.getOwnPropertyDescriptor(o, n);
    Object.defineProperty(t, n, r.get ? r : {
      enumerable: !0,
      get: function() {
        return o[n];
      }
    });
  }), t;
}
var gt = {}, Tn = {}, Sn = {};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.allInputsSelector = Wu;
function Wu() {
  var o = ["text", "password", "email", "number", "search", "tel", "url"];
  return "[contenteditable=true], textarea, input:not([type]), " + o.map(function(e) {
    return 'input[type="'.concat(e, '"]');
  }).join(", ");
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.allInputsSelector = void 0;
  var e = Sn;
  Object.defineProperty(o, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
})(Tn);
var Me = {}, _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.isNativeInput = Ku;
function Ku(o) {
  var e = [
    "INPUT",
    "TEXTAREA"
  ];
  return o && o.tagName ? e.includes(o.tagName) : !1;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isNativeInput = void 0;
  var e = _n;
  Object.defineProperty(o, "isNativeInput", { enumerable: !0, get: function() {
    return e.isNativeInput;
  } });
})(Me);
var Ps = {}, Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.append = qu;
function qu(o, e) {
  Array.isArray(e) ? e.forEach(function(t) {
    o.appendChild(t);
  }) : o.appendChild(e);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.append = void 0;
  var e = Bn;
  Object.defineProperty(o, "append", { enumerable: !0, get: function() {
    return e.append;
  } });
})(Ps);
var On = {}, In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
In.blockElements = Yu;
function Yu() {
  return [
    "address",
    "article",
    "aside",
    "blockquote",
    "canvas",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "noscript",
    "ol",
    "output",
    "p",
    "pre",
    "ruby",
    "section",
    "table",
    "tbody",
    "thead",
    "tr",
    "tfoot",
    "ul",
    "video"
  ];
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.blockElements = void 0;
  var e = In;
  Object.defineProperty(o, "blockElements", { enumerable: !0, get: function() {
    return e.blockElements;
  } });
})(On);
var As = {}, Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.calculateBaseline = Vu;
function Vu(o) {
  var e = window.getComputedStyle(o), t = parseFloat(e.fontSize), n = parseFloat(e.lineHeight) || t * 1.2, r = parseFloat(e.paddingTop), i = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, l = (n - t) / 2, c = s + i + r + l + a;
  return c;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.calculateBaseline = void 0;
  var e = Mn;
  Object.defineProperty(o, "calculateBaseline", { enumerable: !0, get: function() {
    return e.calculateBaseline;
  } });
})(As);
var Ns = {}, Ln = {}, Pn = {}, An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
An.isContentEditable = Xu;
function Xu(o) {
  return o.contentEditable === "true";
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isContentEditable = void 0;
  var e = An;
  Object.defineProperty(o, "isContentEditable", { enumerable: !0, get: function() {
    return e.isContentEditable;
  } });
})(Pn);
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.canSetCaret = Qu;
var Gu = Me, Zu = Pn;
function Qu(o) {
  var e = !0;
  if ((0, Gu.isNativeInput)(o))
    switch (o.type) {
      case "file":
      case "checkbox":
      case "radio":
      case "hidden":
      case "submit":
      case "button":
      case "image":
      case "reset":
        e = !1;
        break;
    }
  else
    e = (0, Zu.isContentEditable)(o);
  return e;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.canSetCaret = void 0;
  var e = Ln;
  Object.defineProperty(o, "canSetCaret", { enumerable: !0, get: function() {
    return e.canSetCaret;
  } });
})(Ns);
var Ht = {}, Nn = {};
function Ju(o, e, t) {
  const n = t.value !== void 0 ? "value" : "get", r = t[n], i = `#${e}Cache`;
  if (t[n] = function(...s) {
    return this[i] === void 0 && (this[i] = r.apply(this, s)), this[i];
  }, n === "get" && t.set) {
    const s = t.set;
    t.set = function(a) {
      delete o[i], s.apply(this, a);
    };
  }
  return t;
}
function js() {
  const o = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e !== void 0 && (o[e] = !0), o;
}
function jn(o) {
  return o != null && o !== "" && (typeof o != "object" || Object.keys(o).length > 0);
}
function eh(o) {
  return !jn(o);
}
const th = () => typeof window < "u" && window.navigator !== null && jn(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function oh(o) {
  const e = js();
  return o = o.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, "+"), e.mac ? o = o.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
}
function nh(o) {
  return o[0].toUpperCase() + o.slice(1);
}
function rh(o) {
  const e = document.createElement("div");
  e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = o, document.body.appendChild(e);
  const t = window.getSelection(), n = document.createRange();
  if (n.selectNode(e), t === null)
    throw new Error("Cannot copy text to clipboard");
  t.removeAllRanges(), t.addRange(n), document.execCommand("copy"), document.body.removeChild(e);
}
function ih(o, e, t) {
  let n;
  return (...r) => {
    const i = this, s = () => {
      n = void 0, t !== !0 && o.apply(i, r);
    }, a = t === !0 && n !== void 0;
    window.clearTimeout(n), n = window.setTimeout(s, e), a && o.apply(i, r);
  };
}
function ke(o) {
  return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function sh(o) {
  return ke(o) === "boolean";
}
function Ds(o) {
  return ke(o) === "function" || ke(o) === "asyncfunction";
}
function ah(o) {
  return Ds(o) && /^\s*class\s+/.test(o.toString());
}
function lh(o) {
  return ke(o) === "number";
}
function mt(o) {
  return ke(o) === "object";
}
function ch(o) {
  return Promise.resolve(o) === o;
}
function dh(o) {
  return ke(o) === "string";
}
function uh(o) {
  return ke(o) === "undefined";
}
function xo(o, ...e) {
  if (!e.length)
    return o;
  const t = e.shift();
  if (mt(o) && mt(t))
    for (const n in t)
      mt(t[n]) ? (o[n] === void 0 && Object.assign(o, { [n]: {} }), xo(o[n], t[n])) : Object.assign(o, { [n]: t[n] });
  return xo(o, ...e);
}
function hh(o, e, t) {
  const n = `«${e}» is deprecated and will be removed in the next major release. Please use the «${t}» instead.`;
  o && console.warn(n);
}
function ph(o) {
  try {
    return new URL(o).href;
  } catch {
  }
  return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
}
function fh(o) {
  return o > 47 && o < 58 || o === 32 || o === 13 || o === 229 || o > 64 && o < 91 || o > 95 && o < 112 || o > 185 && o < 193 || o > 218 && o < 223;
}
const gh = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
}, mh = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
class bh {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   * @param operation - promise should be added to queue
   */
  add(e) {
    return new Promise((t, n) => {
      this.completed = this.completed.then(e).then(t).catch(n);
    });
  }
}
function vh(o, e, t = void 0) {
  let n, r, i, s = null, a = 0;
  t || (t = {});
  const l = function() {
    a = t.leading === !1 ? 0 : Date.now(), s = null, i = o.apply(n, r), s === null && (n = r = null);
  };
  return function() {
    const c = Date.now();
    !a && t.leading === !1 && (a = c);
    const d = e - (c - a);
    return n = this, r = arguments, d <= 0 || d > e ? (s && (clearTimeout(s), s = null), a = c, i = o.apply(n, r), s === null && (n = r = null)) : !s && t.trailing !== !1 && (s = setTimeout(l, d)), i;
  };
}
const yh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PromiseQueue: bh,
  beautifyShortcut: oh,
  cacheable: Ju,
  capitalize: nh,
  copyTextToClipboard: rh,
  debounce: ih,
  deepMerge: xo,
  deprecationAssert: hh,
  getUserOS: js,
  getValidUrl: ph,
  isBoolean: sh,
  isClass: ah,
  isEmpty: eh,
  isFunction: Ds,
  isIosDevice: th,
  isNumber: lh,
  isObject: mt,
  isPrintableKey: fh,
  isPromise: ch,
  isString: dh,
  isUndefined: uh,
  keyCodes: gh,
  mouseButtons: mh,
  notEmpty: jn,
  throttle: vh,
  typeOf: ke
}, Symbol.toStringTag, { value: "Module" })), Dn = /* @__PURE__ */ zu(yh);
Object.defineProperty(Nn, "__esModule", { value: !0 });
Nn.containsOnlyInlineElements = xh;
var kh = Dn, wh = On;
function xh(o) {
  var e;
  (0, kh.isString)(o) ? (e = document.createElement("div"), e.innerHTML = o) : e = o;
  var t = function(n) {
    return !(0, wh.blockElements)().includes(n.tagName.toLowerCase()) && Array.from(n.children).every(t);
  };
  return Array.from(e.children).every(t);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.containsOnlyInlineElements = void 0;
  var e = Nn;
  Object.defineProperty(o, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return e.containsOnlyInlineElements;
  } });
})(Ht);
var Rs = {}, Rn = {}, Ft = {}, $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.make = Eh;
function Eh(o, e, t) {
  var n;
  e === void 0 && (e = null), t === void 0 && (t = {});
  var r = document.createElement(o);
  if (Array.isArray(e)) {
    var i = e.filter(function(a) {
      return a !== void 0;
    });
    (n = r.classList).add.apply(n, i);
  } else
    e !== null && r.classList.add(e);
  for (var s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
  return r;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.make = void 0;
  var e = $n;
  Object.defineProperty(o, "make", { enumerable: !0, get: function() {
    return e.make;
  } });
})(Ft);
Object.defineProperty(Rn, "__esModule", { value: !0 });
Rn.fragmentToString = Th;
var Ch = Ft;
function Th(o) {
  var e = (0, Ch.make)("div");
  return e.appendChild(o), e.innerHTML;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.fragmentToString = void 0;
  var e = Rn;
  Object.defineProperty(o, "fragmentToString", { enumerable: !0, get: function() {
    return e.fragmentToString;
  } });
})(Rs);
var $s = {}, Hn = {};
Object.defineProperty(Hn, "__esModule", { value: !0 });
Hn.getContentLength = _h;
var Sh = Me;
function _h(o) {
  var e, t;
  return (0, Sh.isNativeInput)(o) ? o.value.length : o.nodeType === Node.TEXT_NODE ? o.length : (t = (e = o.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getContentLength = void 0;
  var e = Hn;
  Object.defineProperty(o, "getContentLength", { enumerable: !0, get: function() {
    return e.getContentLength;
  } });
})($s);
var Fn = {}, Un = {}, ci = Bt && Bt.__spreadArray || function(o, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, r = e.length, i; n < r; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return o.concat(i || Array.prototype.slice.call(e));
};
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.getDeepestBlockElements = Hs;
var Bh = Ht;
function Hs(o) {
  return (0, Bh.containsOnlyInlineElements)(o) ? [o] : Array.from(o.children).reduce(function(e, t) {
    return ci(ci([], e, !0), Hs(t), !0);
  }, []);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getDeepestBlockElements = void 0;
  var e = Un;
  Object.defineProperty(o, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return e.getDeepestBlockElements;
  } });
})(Fn);
var Fs = {}, zn = {}, Ut = {}, Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.isLineBreakTag = Oh;
function Oh(o) {
  return [
    "BR",
    "WBR"
  ].includes(o.tagName);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isLineBreakTag = void 0;
  var e = Wn;
  Object.defineProperty(o, "isLineBreakTag", { enumerable: !0, get: function() {
    return e.isLineBreakTag;
  } });
})(Ut);
var zt = {}, Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.isSingleTag = Ih;
function Ih(o) {
  return [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ].includes(o.tagName);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isSingleTag = void 0;
  var e = Kn;
  Object.defineProperty(o, "isSingleTag", { enumerable: !0, get: function() {
    return e.isSingleTag;
  } });
})(zt);
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.getDeepestNode = Us;
var Mh = Me, Lh = Ut, Ph = zt;
function Us(o, e) {
  e === void 0 && (e = !1);
  var t = e ? "lastChild" : "firstChild", n = e ? "previousSibling" : "nextSibling";
  if (o.nodeType === Node.ELEMENT_NODE && o[t]) {
    var r = o[t];
    if ((0, Ph.isSingleTag)(r) && !(0, Mh.isNativeInput)(r) && !(0, Lh.isLineBreakTag)(r))
      if (r[n])
        r = r[n];
      else if (r.parentNode !== null && r.parentNode[n])
        r = r.parentNode[n];
      else
        return r.parentNode;
    return Us(r, e);
  }
  return o;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getDeepestNode = void 0;
  var e = zn;
  Object.defineProperty(o, "getDeepestNode", { enumerable: !0, get: function() {
    return e.getDeepestNode;
  } });
})(Fs);
var zs = {}, qn = {}, st = Bt && Bt.__spreadArray || function(o, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, r = e.length, i; n < r; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return o.concat(i || Array.prototype.slice.call(e));
};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.findAllInputs = Rh;
var Ah = Ht, Nh = Fn, jh = Tn, Dh = Me;
function Rh(o) {
  return Array.from(o.querySelectorAll((0, jh.allInputsSelector)())).reduce(function(e, t) {
    return (0, Dh.isNativeInput)(t) || (0, Ah.containsOnlyInlineElements)(t) ? st(st([], e, !0), [t], !1) : st(st([], e, !0), (0, Nh.getDeepestBlockElements)(t), !0);
  }, []);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.findAllInputs = void 0;
  var e = qn;
  Object.defineProperty(o, "findAllInputs", { enumerable: !0, get: function() {
    return e.findAllInputs;
  } });
})(zs);
var Ws = {}, Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.isCollapsedWhitespaces = $h;
function $h(o) {
  return !/[^\t\n\r ]/.test(o);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isCollapsedWhitespaces = void 0;
  var e = Yn;
  Object.defineProperty(o, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return e.isCollapsedWhitespaces;
  } });
})(Ws);
var Vn = {}, Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.isElement = Fh;
var Hh = Dn;
function Fh(o) {
  return (0, Hh.isNumber)(o) ? !1 : !!o && !!o.nodeType && o.nodeType === Node.ELEMENT_NODE;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isElement = void 0;
  var e = Xn;
  Object.defineProperty(o, "isElement", { enumerable: !0, get: function() {
    return e.isElement;
  } });
})(Vn);
var Ks = {}, Gn = {}, Zn = {}, Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.isLeaf = Uh;
function Uh(o) {
  return o === null ? !1 : o.childNodes.length === 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isLeaf = void 0;
  var e = Qn;
  Object.defineProperty(o, "isLeaf", { enumerable: !0, get: function() {
    return e.isLeaf;
  } });
})(Zn);
var Jn = {}, er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.isNodeEmpty = Yh;
var zh = Ut, Wh = Vn, Kh = Me, qh = zt;
function Yh(o, e) {
  var t = "";
  return (0, qh.isSingleTag)(o) && !(0, zh.isLineBreakTag)(o) ? !1 : ((0, Wh.isElement)(o) && (0, Kh.isNativeInput)(o) ? t = o.value : o.textContent !== null && (t = o.textContent.replace("​", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isNodeEmpty = void 0;
  var e = er;
  Object.defineProperty(o, "isNodeEmpty", { enumerable: !0, get: function() {
    return e.isNodeEmpty;
  } });
})(Jn);
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.isEmpty = Gh;
var Vh = Zn, Xh = Jn;
function Gh(o, e) {
  o.normalize();
  for (var t = [o]; t.length > 0; ) {
    var n = t.shift();
    if (n) {
      if (o = n, (0, Vh.isLeaf)(o) && !(0, Xh.isNodeEmpty)(o, e))
        return !1;
      t.push.apply(t, Array.from(o.childNodes));
    }
  }
  return !0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isEmpty = void 0;
  var e = Gn;
  Object.defineProperty(o, "isEmpty", { enumerable: !0, get: function() {
    return e.isEmpty;
  } });
})(Ks);
var qs = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.isFragment = Qh;
var Zh = Dn;
function Qh(o) {
  return (0, Zh.isNumber)(o) ? !1 : !!o && !!o.nodeType && o.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isFragment = void 0;
  var e = tr;
  Object.defineProperty(o, "isFragment", { enumerable: !0, get: function() {
    return e.isFragment;
  } });
})(qs);
var Ys = {}, or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
or.isHTMLString = ep;
var Jh = Ft;
function ep(o) {
  var e = (0, Jh.make)("div");
  return e.innerHTML = o, e.childElementCount > 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isHTMLString = void 0;
  var e = or;
  Object.defineProperty(o, "isHTMLString", { enumerable: !0, get: function() {
    return e.isHTMLString;
  } });
})(Ys);
var Vs = {}, nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.offset = tp;
function tp(o) {
  var e = o.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, n = window.pageYOffset || document.documentElement.scrollTop, r = e.top + n, i = e.left + t;
  return {
    top: r,
    left: i,
    bottom: r + e.height,
    right: i + e.width
  };
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.offset = void 0;
  var e = nr;
  Object.defineProperty(o, "offset", { enumerable: !0, get: function() {
    return e.offset;
  } });
})(Vs);
var Xs = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.prepend = op;
function op(o, e) {
  Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
    return o.prepend(t);
  })) : o.prepend(e);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.prepend = void 0;
  var e = rr;
  Object.defineProperty(o, "prepend", { enumerable: !0, get: function() {
    return e.prepend;
  } });
})(Xs);
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.prepend = o.offset = o.make = o.isLineBreakTag = o.isSingleTag = o.isNodeEmpty = o.isLeaf = o.isHTMLString = o.isFragment = o.isEmpty = o.isElement = o.isContentEditable = o.isCollapsedWhitespaces = o.findAllInputs = o.isNativeInput = o.allInputsSelector = o.getDeepestNode = o.getDeepestBlockElements = o.getContentLength = o.fragmentToString = o.containsOnlyInlineElements = o.canSetCaret = o.calculateBaseline = o.blockElements = o.append = void 0;
  var e = Tn;
  Object.defineProperty(o, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
  var t = Me;
  Object.defineProperty(o, "isNativeInput", { enumerable: !0, get: function() {
    return t.isNativeInput;
  } });
  var n = Ps;
  Object.defineProperty(o, "append", { enumerable: !0, get: function() {
    return n.append;
  } });
  var r = On;
  Object.defineProperty(o, "blockElements", { enumerable: !0, get: function() {
    return r.blockElements;
  } });
  var i = As;
  Object.defineProperty(o, "calculateBaseline", { enumerable: !0, get: function() {
    return i.calculateBaseline;
  } });
  var s = Ns;
  Object.defineProperty(o, "canSetCaret", { enumerable: !0, get: function() {
    return s.canSetCaret;
  } });
  var a = Ht;
  Object.defineProperty(o, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return a.containsOnlyInlineElements;
  } });
  var l = Rs;
  Object.defineProperty(o, "fragmentToString", { enumerable: !0, get: function() {
    return l.fragmentToString;
  } });
  var c = $s;
  Object.defineProperty(o, "getContentLength", { enumerable: !0, get: function() {
    return c.getContentLength;
  } });
  var d = Fn;
  Object.defineProperty(o, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return d.getDeepestBlockElements;
  } });
  var u = Fs;
  Object.defineProperty(o, "getDeepestNode", { enumerable: !0, get: function() {
    return u.getDeepestNode;
  } });
  var h = zs;
  Object.defineProperty(o, "findAllInputs", { enumerable: !0, get: function() {
    return h.findAllInputs;
  } });
  var g = Ws;
  Object.defineProperty(o, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return g.isCollapsedWhitespaces;
  } });
  var p = Pn;
  Object.defineProperty(o, "isContentEditable", { enumerable: !0, get: function() {
    return p.isContentEditable;
  } });
  var v = Vn;
  Object.defineProperty(o, "isElement", { enumerable: !0, get: function() {
    return v.isElement;
  } });
  var _ = Ks;
  Object.defineProperty(o, "isEmpty", { enumerable: !0, get: function() {
    return _.isEmpty;
  } });
  var B = qs;
  Object.defineProperty(o, "isFragment", { enumerable: !0, get: function() {
    return B.isFragment;
  } });
  var k = Ys;
  Object.defineProperty(o, "isHTMLString", { enumerable: !0, get: function() {
    return k.isHTMLString;
  } });
  var P = Zn;
  Object.defineProperty(o, "isLeaf", { enumerable: !0, get: function() {
    return P.isLeaf;
  } });
  var M = Jn;
  Object.defineProperty(o, "isNodeEmpty", { enumerable: !0, get: function() {
    return M.isNodeEmpty;
  } });
  var N = Ut;
  Object.defineProperty(o, "isLineBreakTag", { enumerable: !0, get: function() {
    return N.isLineBreakTag;
  } });
  var U = zt;
  Object.defineProperty(o, "isSingleTag", { enumerable: !0, get: function() {
    return U.isSingleTag;
  } });
  var G = Ft;
  Object.defineProperty(o, "make", { enumerable: !0, get: function() {
    return G.make;
  } });
  var y = Vs;
  Object.defineProperty(o, "offset", { enumerable: !0, get: function() {
    return y.offset;
  } });
  var m = Xs;
  Object.defineProperty(o, "prepend", { enumerable: !0, get: function() {
    return m.prepend;
  } });
})(gt);
var Gs = /* @__PURE__ */ ((o) => (o.Left = "left", o.Center = "center", o))(Gs || {});
let np = class bt {
  /**
   * Render plugin`s main Element and fill it with saved data
   * @param params - Quote Tool constructor params
   * @param params.data - previously saved data
   * @param params.config - user config for Tool
   * @param params.api - editor.js api
   * @param params.readOnly - read only mode flag
   */
  constructor({ data: e, config: t, api: n, readOnly: r, block: i }) {
    const { DEFAULT_ALIGNMENT: s } = bt;
    this.api = n, this.readOnly = r, this.quotePlaceholder = n.i18n.t(t?.quotePlaceholder ?? bt.DEFAULT_QUOTE_PLACEHOLDER), this.captionPlaceholder = n.i18n.t(t?.captionPlaceholder ?? bt.DEFAULT_CAPTION_PLACEHOLDER), this.data = {
      text: e.text || "",
      caption: e.caption || "",
      alignment: Object.values(Gs).includes(e.alignment) ? e.alignment : t?.defaultAlignment ?? s
    }, this.css = {
      baseClass: this.api.styles.block,
      wrapper: "cdx-quote",
      text: "cdx-quote__text",
      input: this.api.styles.input,
      caption: "cdx-quote__caption"
    }, this.block = i;
  }
  /**
   * Notify core that read-only mode is supported
   * @returns true
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   * @returns icon and title of the toolbox
   */
  static get toolbox() {
    return {
      icon: Uu,
      title: "Quote"
    };
  }
  /**
   * Empty Quote is not empty Block
   * @returns true
   */
  static get contentless() {
    return !0;
  }
  /**
   * Allow to press Enter inside the Quote
   * @returns true
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Default placeholder for quote text
   * @returns 'Enter a quote'
   */
  static get DEFAULT_QUOTE_PLACEHOLDER() {
    return "Enter a quote";
  }
  /**
   * Default placeholder for quote caption
   * @returns 'Enter a caption'
   */
  static get DEFAULT_CAPTION_PLACEHOLDER() {
    return "Enter a caption";
  }
  /**
   * Default quote alignment
   * @returns Alignment.Left
   */
  static get DEFAULT_ALIGNMENT() {
    return "left";
  }
  /**
   * Allow Quote to be converted to/from other blocks
   * @returns conversion config object
   */
  static get conversionConfig() {
    return {
      /**
       * To create Quote data from string, simple fill 'text' property
       */
      import: "text",
      /**
       * To create string from Quote data, concatenate text and caption
       * @param quoteData - Quote data object
       * @returns string
       */
      export: function(e) {
        return e.caption ? `${e.text} — ${e.caption}` : e.text;
      }
    };
  }
  /**
   * Tool`s styles
   * @returns CSS classes names
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: "cdx-quote",
      text: "cdx-quote__text",
      input: this.api.styles.input,
      caption: "cdx-quote__caption"
    };
  }
  /**
   * Tool`s settings properties
   * @returns settings properties
   */
  get settings() {
    return [
      {
        name: "left",
        icon: Fu
      },
      {
        name: "center",
        icon: Hu
      }
    ];
  }
  /**
   * Create Quote Tool container with inputs
   * @returns blockquote DOM element - Quote Tool container
   */
  render() {
    const e = gt.make("blockquote", [
      this.css.baseClass,
      this.css.wrapper
    ]), t = gt.make("div", [this.css.input, this.css.text], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.text
    }), n = gt.make("div", [this.css.input, this.css.caption], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.caption
    });
    return t.dataset.placeholder = this.quotePlaceholder, n.dataset.placeholder = this.captionPlaceholder, e.appendChild(t), e.appendChild(n), e;
  }
  /**
   * Extract Quote data from Quote Tool element
   * @param quoteElement - Quote DOM element to save
   * @returns Quote data object
   */
  save(e) {
    const t = e.querySelector(`.${this.css.text}`), n = e.querySelector(`.${this.css.caption}`);
    return Object.assign(this.data, {
      text: t?.innerHTML ?? "",
      caption: n?.innerHTML ?? ""
    });
  }
  /**
   * Sanitizer rules
   * @returns sanitizer rules
   */
  static get sanitize() {
    return {
      text: {
        br: !0
      },
      caption: {
        br: !0
      },
      alignment: {}
    };
  }
  /**
   * Create wrapper for Tool`s settings buttons:
   * 1. Left alignment
   * 2. Center alignment
   * @returns settings menu
   */
  renderSettings() {
    const e = (t) => t && t[0].toUpperCase() + t.slice(1);
    return this.settings.map((t) => ({
      icon: t.icon,
      label: this.api.i18n.t(`Align ${e(t.name)}`),
      onActivate: () => this._toggleTune(t.name),
      isActive: this.data.alignment === t.name,
      closeOnActivate: !0
    }));
  }
  /**
   * Toggle quote`s alignment
   * @param tune - alignment
   */
  _toggleTune(e) {
    this.data.alignment = e, this.block.dispatchChange();
  }
};
(function() {
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      o.appendChild(document.createTextNode(".ce-code__textarea{min-height:200px;font-family:Menlo,Monaco,Consolas,Courier New,monospace;color:#41314e;line-height:1.6em;font-size:12px;background:#f8f7fa;border:1px solid #f1f1f4;box-shadow:none;white-space:pre;word-wrap:normal;overflow-x:auto;resize:vertical}")), document.head.appendChild(o);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
function rp(o, e) {
  let t = "";
  for (; t !== `
` && e > 0; )
    e = e - 1, t = o.substr(e, 1);
  return t === `
` && (e += 1), e;
}
const ip = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8L5 12L9 16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8L19 12L15 16"/></svg>';
class ir {
  /**
   * Notify core that read-only mode is supported
   * @returns true if read-only mode is supported
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Allows pressing Enter key to create line breaks inside the CodeTool textarea
   * This enables multi-line input within the code editor.
   * @returns true if line breaks are allowed in the textarea
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   * @param options - tool constricting options
   * @param options.data — previously saved plugin code
   * @param options.config - user config for Tool
   * @param options.api - Editor.js API
   * @param options.readOnly - read only mode flag
   */
  constructor({ data: e, config: t, api: n, readOnly: r }) {
    this.api = n, this.readOnly = r, this.placeholder = this.api.i18n.t(t.placeholder || ir.DEFAULT_PLACEHOLDER), this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: "ce-code",
      textarea: "ce-code__textarea"
    }, this.nodes = {
      holder: null,
      textarea: null
    }, this.data = {
      code: e.code ?? ""
    }, this.nodes.holder = this.drawView();
  }
  /**
   * Return Tool's view
   * @returns this.nodes.holder - Code's wrapper
   */
  render() {
    return this.nodes.holder;
  }
  /**
   * Extract Tool's data from the view
   * @param codeWrapper - CodeTool's wrapper, containing textarea with code
   * @returns - saved plugin code
   */
  save(e) {
    return {
      code: e.querySelector("textarea").value
    };
  }
  /**
   * onPaste callback fired from Editor`s core
   * @param event - event with pasted content
   */
  onPaste(e) {
    const t = e.detail;
    if ("data" in t) {
      const n = t.data;
      this.data = {
        code: n || ""
      };
    }
  }
  /**
   * Returns Tool`s data from private property
   * @returns
   */
  get data() {
    return this._data;
  }
  /**
   * Set Tool`s data to private property and update view
   * @param data - saved tool data
   */
  set data(e) {
    this._data = e, this.nodes.textarea && (this.nodes.textarea.value = e.code);
  }
  /**
   * Get Tool toolbox settings.
   * Provides the icon and title to display in the toolbox for the CodeTool.
   * @returns An object containing:
   * - icon: SVG representation of the Tool's icon
   * - title: Title to show in the toolbox
   */
  static get toolbox() {
    return {
      icon: ip,
      title: "Code"
    };
  }
  /**
   * Default placeholder for CodeTool's textarea
   * @returns
   */
  static get DEFAULT_PLACEHOLDER() {
    return "Enter a code";
  }
  /**
   *  Used by Editor.js paste handling API.
   *  Provides configuration to handle CODE tag.
   * @returns
   */
  static get pasteConfig() {
    return {
      tags: ["pre"]
    };
  }
  /**
   * Automatic sanitize config
   * @returns
   */
  static get sanitize() {
    return {
      code: !0
      // Allow HTML tags
    };
  }
  /**
   * Handles Tab key pressing (adds/removes indentations)
   * @param event - keydown
   */
  tabHandler(e) {
    e.stopPropagation(), e.preventDefault();
    const t = e.target, n = e.shiftKey, r = t.selectionStart, i = t.value, s = "  ";
    let a;
    if (!n)
      a = r + s.length, t.value = i.substring(0, r) + s + i.substring(r);
    else {
      const l = rp(i, r);
      if (i.substr(l, s.length) !== s)
        return;
      t.value = i.substring(0, l) + i.substring(l + s.length), a = r - s.length;
    }
    t.setSelectionRange(a, a);
  }
  /**
   * Create Tool's view
   * @returns
   */
  drawView() {
    const e = document.createElement("div"), t = document.createElement("textarea");
    return e.classList.add(this.CSS.baseClass, this.CSS.wrapper), t.classList.add(this.CSS.textarea, this.CSS.input), t.value = this.data.code, t.placeholder = this.placeholder, this.readOnly && (t.disabled = !0), e.appendChild(t), t.addEventListener("keydown", (n) => {
      switch (n.code) {
        case "Tab":
          this.tabHandler(n);
          break;
      }
    }), this.nodes.textarea = t, e;
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      o.appendChild(document.createTextNode(".ce-rawtool__textarea{min-height:200px;resize:vertical;border-radius:8px;border:0;background-color:#1e2128;font-family:Menlo,Monaco,Consolas,Courier New,monospace;font-size:12px;line-height:1.6;letter-spacing:-.2px;color:#a1a7b6;overscroll-behavior:contain}")), document.head.appendChild(o);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const sp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.6954 5C17.912 5 18.8468 6.07716 18.6755 7.28165L17.426 16.0659C17.3183 16.8229 16.7885 17.4522 16.061 17.6873L12.6151 18.8012C12.2152 18.9304 11.7848 18.9304 11.3849 18.8012L7.93898 17.6873C7.21148 17.4522 6.6817 16.8229 6.57403 16.0659L5.32454 7.28165C5.15322 6.07716 6.088 5 7.30461 5H16.6954Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8.4H9L9.42857 11.7939H14.5714L14.3571 13.2788L14.1429 14.7636L12 15.4L9.85714 14.7636L9.77143 14.3394"/></svg>';
class sr {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Should this tool be displayed at the Editor's Toolbox
   *
   * @returns {boolean}
   * @public
   */
  static get displayInToolbox() {
    return !0;
  }
  /**
   * Allow to press Enter inside the RawTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: sp,
      title: "Raw HTML"
    };
  }
  /**
   * @typedef {object} RawData — plugin saved data
   * @param {string} html - previously saved HTML code
   * @property
   */
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {RawData} data — previously saved HTML data
   * @param {object} config - user config for Tool
   * @param {object} api - CodeX Editor API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data: e, config: t, api: n, readOnly: r }) {
    this.api = n, this.readOnly = r, this.placeholder = n.i18n.t(t.placeholder || sr.DEFAULT_PLACEHOLDER), this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: "ce-rawtool",
      textarea: "ce-rawtool__textarea"
    }, this.data = {
      html: e.html || ""
    }, this.textarea = null, this.resizeDebounce = null;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement} this.element - RawTool's wrapper
   * @public
   */
  render() {
    const e = document.createElement("div"), t = 100;
    return this.textarea = document.createElement("textarea"), e.classList.add(this.CSS.baseClass, this.CSS.wrapper), this.textarea.classList.add(this.CSS.textarea, this.CSS.input), this.textarea.textContent = this.data.html, this.textarea.placeholder = this.placeholder, this.readOnly ? this.textarea.disabled = !0 : this.textarea.addEventListener("input", () => {
      this.onInput();
    }), e.appendChild(this.textarea), setTimeout(() => {
      this.resize();
    }, t), e;
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} rawToolsWrapper - RawTool's wrapper, containing textarea with raw HTML code
   * @returns {RawData} - raw HTML code
   * @public
   */
  save(e) {
    return {
      html: e.querySelector("textarea").value
    };
  }
  /**
   * Default placeholder for RawTool's textarea
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_PLACEHOLDER() {
    return "Enter HTML code";
  }
  /**
   * Automatic sanitize config
   */
  static get sanitize() {
    return {
      html: !0
      // Allow HTML tags
    };
  }
  /**
   * Textarea change event
   *
   * @returns {void}
   */
  onInput() {
    this.resizeDebounce && clearTimeout(this.resizeDebounce), this.resizeDebounce = setTimeout(() => {
      this.resize();
    }, 200);
  }
  /**
   * Resize textarea to fit whole height
   *
   * @returns {void}
   */
  resize() {
    this.textarea.style.height = "auto", this.textarea.style.height = this.textarea.scrollHeight + "px";
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      o.appendChild(document.createTextNode('.cdx-list{margin:0;padding:0;outline:none;display:grid;counter-reset:item;gap:var(--spacing-s);padding:var(--spacing-xs);--spacing-s: 8px;--spacing-xs: 6px;--list-counter-type: numeric;--radius-border: 5px;--checkbox-background: #fff;--color-border: #C9C9C9;--color-bg-checked: #369FFF;--line-height: 1.45em;--color-bg-checked-hover: #0059AB;--color-tick: #fff;--size-checkbox: 1.2em}.cdx-list__item{line-height:var(--line-height);display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;grid-template-areas:"checkbox content" ". child"}.cdx-list__item-children{display:grid;grid-area:child;gap:var(--spacing-s);padding-top:var(--spacing-s)}.cdx-list__item [contenteditable]{outline:none}.cdx-list__item-content{word-break:break-word;white-space:pre-wrap;grid-area:content;padding-left:var(--spacing-s)}.cdx-list__item:before{counter-increment:item;white-space:nowrap}.cdx-list-ordered .cdx-list__item:before{content:counters(item,".",var(--list-counter-type)) "."}.cdx-list-ordered{counter-reset:item}.cdx-list-unordered .cdx-list__item:before{content:"•"}.cdx-list-checklist .cdx-list__item:before{content:""}.cdx-list__settings .cdx-settings-button{width:50%}.cdx-list__checkbox{padding-top:calc((var(--line-height) - var(--size-checkbox)) / 2);grid-area:checkbox;width:var(--size-checkbox);height:var(--size-checkbox);display:flex;cursor:pointer}.cdx-list__checkbox svg{opacity:0;height:var(--size-checkbox);width:var(--size-checkbox);left:-1px;top:-1px;position:absolute}@media (hover: hover){.cdx-list__checkbox:not(.cdx-list__checkbox--no-hover):hover .cdx-list__checkbox-check svg{opacity:1}}.cdx-list__checkbox--checked{line-height:var(--line-height)}@media (hover: hover){.cdx-list__checkbox--checked:not(.cdx-list__checkbox--checked--no-hover):hover .cdx-checklist__checkbox-check{background:var(--color-bg-checked-hover);border-color:var(--color-bg-checked-hover)}}.cdx-list__checkbox--checked .cdx-list__checkbox-check{background:var(--color-bg-checked);border-color:var(--color-bg-checked)}.cdx-list__checkbox--checked .cdx-list__checkbox-check svg{opacity:1}.cdx-list__checkbox--checked .cdx-list__checkbox-check svg path{stroke:var(--color-tick)}.cdx-list__checkbox--checked .cdx-list__checkbox-check:before{opacity:0;visibility:visible;transform:scale(2.5)}.cdx-list__checkbox-check{cursor:pointer;display:inline-block;position:relative;margin:0 auto;width:var(--size-checkbox);height:var(--size-checkbox);box-sizing:border-box;border-radius:var(--radius-border);border:1px solid var(--color-border);background:var(--checkbox-background)}.cdx-list__checkbox-check:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:100%;background-color:var(--color-bg-checked);visibility:hidden;pointer-events:none;transform:scale(1);transition:transform .4s ease-out,opacity .4s}.cdx-list-start-with-field{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-list-start-with-field--invalid{background:#FFECED;border:1px solid #E13F3F}.cdx-list-start-with-field--invalid .cdx-list-start-with-field__input{color:#e13f3f}.cdx-list-start-with-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - var(--toolbox-buttons-size) - var(--icon-margin-right))}.cdx-list-start-with-field__input::placeholder{color:var(--grayText);font-weight:500}')), document.head.appendChild(o);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const ap = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 12L10.4884 15.8372C10.5677 15.9245 10.705 15.9245 10.7844 15.8372L17 9"/></svg>', di = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9.2 12L11.0586 13.8586C11.1367 13.9367 11.2633 13.9367 11.3414 13.8586L14.7 10.5"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>', ui = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="9" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 17H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 12H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 7H4.99002"/></svg>', hi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="12" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.79999 14L7.79999 7.2135C7.79999 7.12872 7.7011 7.0824 7.63597 7.13668L4.79999 9.5"/></svg>', lp = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14.2L10 7.4135C10 7.32872 9.90111 7.28241 9.83598 7.33668L7 9.7" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M13.2087 14.2H13.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>', cp = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2087 14.2H13.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M10 14.2L10 9.5" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M10 7.01L10 7" stroke="black" stroke-width="1.8" stroke-linecap="round"/></svg>', dp = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2087 14.2H13.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M10 14.2L10 7.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>', up = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0087 14.2H16" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M7 14.2L7.78865 12M13 14.2L12.1377 12M7.78865 12C7.78865 12 9.68362 7 10 7C10.3065 7 12.1377 12 12.1377 12M7.78865 12L12.1377 12" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>', hp = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2087 14.2H14.2" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M11.5 14.5C11.5 14.5 11 13.281 11 12.5M7 9.5C7 9.5 7.5 8.5 9 8.5C10.5 8.5 11 9.5 11 10.5L11 11.5M11 11.5L11 12.5M11 11.5C11 11.5 7 11 7 13C7 15.3031 11 15 11 12.5" stroke="black" stroke-width="1.6" stroke-linecap="round"/></svg>', pp = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14.2L8 7.4135C8 7.32872 7.90111 7.28241 7.83598 7.33668L5 9.7" stroke="black" stroke-width="1.6" stroke-linecap="round"/><path d="M14 13L16.4167 10.7778M16.4167 10.7778L14 8.5M16.4167 10.7778H11.6562" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var Ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fp(o) {
  if (o.__esModule)
    return o;
  var e = o.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(o).forEach(function(n) {
    var r = Object.getOwnPropertyDescriptor(o, n);
    Object.defineProperty(t, n, r.get ? r : {
      enumerable: !0,
      get: function() {
        return o[n];
      }
    });
  }), t;
}
var A = {}, ar = {}, lr = {};
Object.defineProperty(lr, "__esModule", { value: !0 });
lr.allInputsSelector = gp;
function gp() {
  var o = ["text", "password", "email", "number", "search", "tel", "url"];
  return "[contenteditable=true], textarea, input:not([type]), " + o.map(function(e) {
    return 'input[type="'.concat(e, '"]');
  }).join(", ");
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.allInputsSelector = void 0;
  var e = lr;
  Object.defineProperty(o, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
})(ar);
var Le = {}, cr = {};
Object.defineProperty(cr, "__esModule", { value: !0 });
cr.isNativeInput = mp;
function mp(o) {
  var e = [
    "INPUT",
    "TEXTAREA"
  ];
  return o && o.tagName ? e.includes(o.tagName) : !1;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isNativeInput = void 0;
  var e = cr;
  Object.defineProperty(o, "isNativeInput", { enumerable: !0, get: function() {
    return e.isNativeInput;
  } });
})(Le);
var Zs = {}, dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.append = bp;
function bp(o, e) {
  Array.isArray(e) ? e.forEach(function(t) {
    o.appendChild(t);
  }) : o.appendChild(e);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.append = void 0;
  var e = dr;
  Object.defineProperty(o, "append", { enumerable: !0, get: function() {
    return e.append;
  } });
})(Zs);
var ur = {}, hr = {};
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.blockElements = vp;
function vp() {
  return [
    "address",
    "article",
    "aside",
    "blockquote",
    "canvas",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "noscript",
    "ol",
    "output",
    "p",
    "pre",
    "ruby",
    "section",
    "table",
    "tbody",
    "thead",
    "tr",
    "tfoot",
    "ul",
    "video"
  ];
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.blockElements = void 0;
  var e = hr;
  Object.defineProperty(o, "blockElements", { enumerable: !0, get: function() {
    return e.blockElements;
  } });
})(ur);
var Qs = {}, pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.calculateBaseline = yp;
function yp(o) {
  var e = window.getComputedStyle(o), t = parseFloat(e.fontSize), n = parseFloat(e.lineHeight) || t * 1.2, r = parseFloat(e.paddingTop), i = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, l = (n - t) / 2, c = s + i + r + l + a;
  return c;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.calculateBaseline = void 0;
  var e = pr;
  Object.defineProperty(o, "calculateBaseline", { enumerable: !0, get: function() {
    return e.calculateBaseline;
  } });
})(Qs);
var Js = {}, fr = {}, gr = {}, mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.isContentEditable = kp;
function kp(o) {
  return o.contentEditable === "true";
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isContentEditable = void 0;
  var e = mr;
  Object.defineProperty(o, "isContentEditable", { enumerable: !0, get: function() {
    return e.isContentEditable;
  } });
})(gr);
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.canSetCaret = Ep;
var wp = Le, xp = gr;
function Ep(o) {
  var e = !0;
  if ((0, wp.isNativeInput)(o))
    switch (o.type) {
      case "file":
      case "checkbox":
      case "radio":
      case "hidden":
      case "submit":
      case "button":
      case "image":
      case "reset":
        e = !1;
        break;
    }
  else
    e = (0, xp.isContentEditable)(o);
  return e;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.canSetCaret = void 0;
  var e = fr;
  Object.defineProperty(o, "canSetCaret", { enumerable: !0, get: function() {
    return e.canSetCaret;
  } });
})(Js);
var Wt = {}, br = {};
function Cp(o, e, t) {
  const n = t.value !== void 0 ? "value" : "get", r = t[n], i = `#${e}Cache`;
  if (t[n] = function(...s) {
    return this[i] === void 0 && (this[i] = r.apply(this, s)), this[i];
  }, n === "get" && t.set) {
    const s = t.set;
    t.set = function(a) {
      delete o[i], s.apply(this, a);
    };
  }
  return t;
}
function ea() {
  const o = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e !== void 0 && (o[e] = !0), o;
}
function vr(o) {
  return o != null && o !== "" && (typeof o != "object" || Object.keys(o).length > 0);
}
function Tp(o) {
  return !vr(o);
}
const Sp = () => typeof window < "u" && window.navigator !== null && vr(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function _p(o) {
  const e = ea();
  return o = o.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, "+"), e.mac ? o = o.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
}
function Bp(o) {
  return o[0].toUpperCase() + o.slice(1);
}
function Op(o) {
  const e = document.createElement("div");
  e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = o, document.body.appendChild(e);
  const t = window.getSelection(), n = document.createRange();
  if (n.selectNode(e), t === null)
    throw new Error("Cannot copy text to clipboard");
  t.removeAllRanges(), t.addRange(n), document.execCommand("copy"), document.body.removeChild(e);
}
function Ip(o, e, t) {
  let n;
  return (...r) => {
    const i = this, s = () => {
      n = void 0, t !== !0 && o.apply(i, r);
    }, a = t === !0 && n !== void 0;
    window.clearTimeout(n), n = window.setTimeout(s, e), a && o.apply(i, r);
  };
}
function we(o) {
  return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function Mp(o) {
  return we(o) === "boolean";
}
function ta(o) {
  return we(o) === "function" || we(o) === "asyncfunction";
}
function Lp(o) {
  return ta(o) && /^\s*class\s+/.test(o.toString());
}
function Pp(o) {
  return we(o) === "number";
}
function vt(o) {
  return we(o) === "object";
}
function Ap(o) {
  return Promise.resolve(o) === o;
}
function Np(o) {
  return we(o) === "string";
}
function jp(o) {
  return we(o) === "undefined";
}
function Eo(o, ...e) {
  if (!e.length)
    return o;
  const t = e.shift();
  if (vt(o) && vt(t))
    for (const n in t)
      vt(t[n]) ? (o[n] === void 0 && Object.assign(o, { [n]: {} }), Eo(o[n], t[n])) : Object.assign(o, { [n]: t[n] });
  return Eo(o, ...e);
}
function Dp(o, e, t) {
  const n = `«${e}» is deprecated and will be removed in the next major release. Please use the «${t}» instead.`;
  o && console.warn(n);
}
function Rp(o) {
  try {
    return new URL(o).href;
  } catch {
  }
  return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
}
function $p(o) {
  return o > 47 && o < 58 || o === 32 || o === 13 || o === 229 || o > 64 && o < 91 || o > 95 && o < 112 || o > 185 && o < 193 || o > 218 && o < 223;
}
const Hp = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
}, Fp = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
class Up {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   * @param operation - promise should be added to queue
   */
  add(e) {
    return new Promise((t, n) => {
      this.completed = this.completed.then(e).then(t).catch(n);
    });
  }
}
function zp(o, e, t = void 0) {
  let n, r, i, s = null, a = 0;
  t || (t = {});
  const l = function() {
    a = t.leading === !1 ? 0 : Date.now(), s = null, i = o.apply(n, r), s === null && (n = r = null);
  };
  return function() {
    const c = Date.now();
    !a && t.leading === !1 && (a = c);
    const d = e - (c - a);
    return n = this, r = arguments, d <= 0 || d > e ? (s && (clearTimeout(s), s = null), a = c, i = o.apply(n, r), s === null && (n = r = null)) : !s && t.trailing !== !1 && (s = setTimeout(l, d)), i;
  };
}
const Wp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PromiseQueue: Up,
  beautifyShortcut: _p,
  cacheable: Cp,
  capitalize: Bp,
  copyTextToClipboard: Op,
  debounce: Ip,
  deepMerge: Eo,
  deprecationAssert: Dp,
  getUserOS: ea,
  getValidUrl: Rp,
  isBoolean: Mp,
  isClass: Lp,
  isEmpty: Tp,
  isFunction: ta,
  isIosDevice: Sp,
  isNumber: Pp,
  isObject: vt,
  isPrintableKey: $p,
  isPromise: Ap,
  isString: Np,
  isUndefined: jp,
  keyCodes: Hp,
  mouseButtons: Fp,
  notEmpty: vr,
  throttle: zp,
  typeOf: we
}, Symbol.toStringTag, { value: "Module" })), yr = /* @__PURE__ */ fp(Wp);
Object.defineProperty(br, "__esModule", { value: !0 });
br.containsOnlyInlineElements = Yp;
var Kp = yr, qp = ur;
function Yp(o) {
  var e;
  (0, Kp.isString)(o) ? (e = document.createElement("div"), e.innerHTML = o) : e = o;
  var t = function(n) {
    return !(0, qp.blockElements)().includes(n.tagName.toLowerCase()) && Array.from(n.children).every(t);
  };
  return Array.from(e.children).every(t);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.containsOnlyInlineElements = void 0;
  var e = br;
  Object.defineProperty(o, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return e.containsOnlyInlineElements;
  } });
})(Wt);
var oa = {}, kr = {}, Kt = {}, wr = {};
Object.defineProperty(wr, "__esModule", { value: !0 });
wr.make = Vp;
function Vp(o, e, t) {
  var n;
  e === void 0 && (e = null), t === void 0 && (t = {});
  var r = document.createElement(o);
  if (Array.isArray(e)) {
    var i = e.filter(function(a) {
      return a !== void 0;
    });
    (n = r.classList).add.apply(n, i);
  } else
    e !== null && r.classList.add(e);
  for (var s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
  return r;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.make = void 0;
  var e = wr;
  Object.defineProperty(o, "make", { enumerable: !0, get: function() {
    return e.make;
  } });
})(Kt);
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.fragmentToString = Gp;
var Xp = Kt;
function Gp(o) {
  var e = (0, Xp.make)("div");
  return e.appendChild(o), e.innerHTML;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.fragmentToString = void 0;
  var e = kr;
  Object.defineProperty(o, "fragmentToString", { enumerable: !0, get: function() {
    return e.fragmentToString;
  } });
})(oa);
var na = {}, xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.getContentLength = Qp;
var Zp = Le;
function Qp(o) {
  var e, t;
  return (0, Zp.isNativeInput)(o) ? o.value.length : o.nodeType === Node.TEXT_NODE ? o.length : (t = (e = o.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getContentLength = void 0;
  var e = xr;
  Object.defineProperty(o, "getContentLength", { enumerable: !0, get: function() {
    return e.getContentLength;
  } });
})(na);
var Er = {}, Cr = {}, pi = Ot && Ot.__spreadArray || function(o, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, r = e.length, i; n < r; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return o.concat(i || Array.prototype.slice.call(e));
};
Object.defineProperty(Cr, "__esModule", { value: !0 });
Cr.getDeepestBlockElements = ra;
var Jp = Wt;
function ra(o) {
  return (0, Jp.containsOnlyInlineElements)(o) ? [o] : Array.from(o.children).reduce(function(e, t) {
    return pi(pi([], e, !0), ra(t), !0);
  }, []);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getDeepestBlockElements = void 0;
  var e = Cr;
  Object.defineProperty(o, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return e.getDeepestBlockElements;
  } });
})(Er);
var ia = {}, Tr = {}, qt = {}, Sr = {};
Object.defineProperty(Sr, "__esModule", { value: !0 });
Sr.isLineBreakTag = ef;
function ef(o) {
  return [
    "BR",
    "WBR"
  ].includes(o.tagName);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isLineBreakTag = void 0;
  var e = Sr;
  Object.defineProperty(o, "isLineBreakTag", { enumerable: !0, get: function() {
    return e.isLineBreakTag;
  } });
})(qt);
var Yt = {}, _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.isSingleTag = tf;
function tf(o) {
  return [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ].includes(o.tagName);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isSingleTag = void 0;
  var e = _r;
  Object.defineProperty(o, "isSingleTag", { enumerable: !0, get: function() {
    return e.isSingleTag;
  } });
})(Yt);
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.getDeepestNode = sa;
var of = Le, nf = qt, rf = Yt;
function sa(o, e) {
  e === void 0 && (e = !1);
  var t = e ? "lastChild" : "firstChild", n = e ? "previousSibling" : "nextSibling";
  if (o.nodeType === Node.ELEMENT_NODE && o[t]) {
    var r = o[t];
    if ((0, rf.isSingleTag)(r) && !(0, of.isNativeInput)(r) && !(0, nf.isLineBreakTag)(r))
      if (r[n])
        r = r[n];
      else if (r.parentNode !== null && r.parentNode[n])
        r = r.parentNode[n];
      else
        return r.parentNode;
    return sa(r, e);
  }
  return o;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getDeepestNode = void 0;
  var e = Tr;
  Object.defineProperty(o, "getDeepestNode", { enumerable: !0, get: function() {
    return e.getDeepestNode;
  } });
})(ia);
var aa = {}, Br = {}, at = Ot && Ot.__spreadArray || function(o, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, r = e.length, i; n < r; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return o.concat(i || Array.prototype.slice.call(e));
};
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.findAllInputs = df;
var sf = Wt, af = Er, lf = ar, cf = Le;
function df(o) {
  return Array.from(o.querySelectorAll((0, lf.allInputsSelector)())).reduce(function(e, t) {
    return (0, cf.isNativeInput)(t) || (0, sf.containsOnlyInlineElements)(t) ? at(at([], e, !0), [t], !1) : at(at([], e, !0), (0, af.getDeepestBlockElements)(t), !0);
  }, []);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.findAllInputs = void 0;
  var e = Br;
  Object.defineProperty(o, "findAllInputs", { enumerable: !0, get: function() {
    return e.findAllInputs;
  } });
})(aa);
var la = {}, Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.isCollapsedWhitespaces = uf;
function uf(o) {
  return !/[^\t\n\r ]/.test(o);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isCollapsedWhitespaces = void 0;
  var e = Or;
  Object.defineProperty(o, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return e.isCollapsedWhitespaces;
  } });
})(la);
var Ir = {}, Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.isElement = pf;
var hf = yr;
function pf(o) {
  return (0, hf.isNumber)(o) ? !1 : !!o && !!o.nodeType && o.nodeType === Node.ELEMENT_NODE;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isElement = void 0;
  var e = Mr;
  Object.defineProperty(o, "isElement", { enumerable: !0, get: function() {
    return e.isElement;
  } });
})(Ir);
var ca = {}, Lr = {}, Pr = {}, Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.isLeaf = ff;
function ff(o) {
  return o === null ? !1 : o.childNodes.length === 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isLeaf = void 0;
  var e = Ar;
  Object.defineProperty(o, "isLeaf", { enumerable: !0, get: function() {
    return e.isLeaf;
  } });
})(Pr);
var Nr = {}, jr = {};
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.isNodeEmpty = yf;
var gf = qt, mf = Ir, bf = Le, vf = Yt;
function yf(o, e) {
  var t = "";
  return (0, vf.isSingleTag)(o) && !(0, gf.isLineBreakTag)(o) ? !1 : ((0, mf.isElement)(o) && (0, bf.isNativeInput)(o) ? t = o.value : o.textContent !== null && (t = o.textContent.replace("​", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isNodeEmpty = void 0;
  var e = jr;
  Object.defineProperty(o, "isNodeEmpty", { enumerable: !0, get: function() {
    return e.isNodeEmpty;
  } });
})(Nr);
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.isEmpty = xf;
var kf = Pr, wf = Nr;
function xf(o, e) {
  o.normalize();
  for (var t = [o]; t.length > 0; ) {
    var n = t.shift();
    if (n) {
      if (o = n, (0, kf.isLeaf)(o) && !(0, wf.isNodeEmpty)(o, e))
        return !1;
      t.push.apply(t, Array.from(o.childNodes));
    }
  }
  return !0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isEmpty = void 0;
  var e = Lr;
  Object.defineProperty(o, "isEmpty", { enumerable: !0, get: function() {
    return e.isEmpty;
  } });
})(ca);
var da = {}, Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.isFragment = Cf;
var Ef = yr;
function Cf(o) {
  return (0, Ef.isNumber)(o) ? !1 : !!o && !!o.nodeType && o.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isFragment = void 0;
  var e = Dr;
  Object.defineProperty(o, "isFragment", { enumerable: !0, get: function() {
    return e.isFragment;
  } });
})(da);
var ua = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.isHTMLString = Sf;
var Tf = Kt;
function Sf(o) {
  var e = (0, Tf.make)("div");
  return e.innerHTML = o, e.childElementCount > 0;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isHTMLString = void 0;
  var e = Rr;
  Object.defineProperty(o, "isHTMLString", { enumerable: !0, get: function() {
    return e.isHTMLString;
  } });
})(ua);
var ha = {}, $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
$r.offset = _f;
function _f(o) {
  var e = o.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, n = window.pageYOffset || document.documentElement.scrollTop, r = e.top + n, i = e.left + t;
  return {
    top: r,
    left: i,
    bottom: r + e.height,
    right: i + e.width
  };
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.offset = void 0;
  var e = $r;
  Object.defineProperty(o, "offset", { enumerable: !0, get: function() {
    return e.offset;
  } });
})(ha);
var pa = {}, Hr = {};
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.prepend = Bf;
function Bf(o, e) {
  Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
    return o.prepend(t);
  })) : o.prepend(e);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.prepend = void 0;
  var e = Hr;
  Object.defineProperty(o, "prepend", { enumerable: !0, get: function() {
    return e.prepend;
  } });
})(pa);
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.prepend = o.offset = o.make = o.isLineBreakTag = o.isSingleTag = o.isNodeEmpty = o.isLeaf = o.isHTMLString = o.isFragment = o.isEmpty = o.isElement = o.isContentEditable = o.isCollapsedWhitespaces = o.findAllInputs = o.isNativeInput = o.allInputsSelector = o.getDeepestNode = o.getDeepestBlockElements = o.getContentLength = o.fragmentToString = o.containsOnlyInlineElements = o.canSetCaret = o.calculateBaseline = o.blockElements = o.append = void 0;
  var e = ar;
  Object.defineProperty(o, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
  var t = Le;
  Object.defineProperty(o, "isNativeInput", { enumerable: !0, get: function() {
    return t.isNativeInput;
  } });
  var n = Zs;
  Object.defineProperty(o, "append", { enumerable: !0, get: function() {
    return n.append;
  } });
  var r = ur;
  Object.defineProperty(o, "blockElements", { enumerable: !0, get: function() {
    return r.blockElements;
  } });
  var i = Qs;
  Object.defineProperty(o, "calculateBaseline", { enumerable: !0, get: function() {
    return i.calculateBaseline;
  } });
  var s = Js;
  Object.defineProperty(o, "canSetCaret", { enumerable: !0, get: function() {
    return s.canSetCaret;
  } });
  var a = Wt;
  Object.defineProperty(o, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return a.containsOnlyInlineElements;
  } });
  var l = oa;
  Object.defineProperty(o, "fragmentToString", { enumerable: !0, get: function() {
    return l.fragmentToString;
  } });
  var c = na;
  Object.defineProperty(o, "getContentLength", { enumerable: !0, get: function() {
    return c.getContentLength;
  } });
  var d = Er;
  Object.defineProperty(o, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return d.getDeepestBlockElements;
  } });
  var u = ia;
  Object.defineProperty(o, "getDeepestNode", { enumerable: !0, get: function() {
    return u.getDeepestNode;
  } });
  var h = aa;
  Object.defineProperty(o, "findAllInputs", { enumerable: !0, get: function() {
    return h.findAllInputs;
  } });
  var g = la;
  Object.defineProperty(o, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return g.isCollapsedWhitespaces;
  } });
  var p = gr;
  Object.defineProperty(o, "isContentEditable", { enumerable: !0, get: function() {
    return p.isContentEditable;
  } });
  var v = Ir;
  Object.defineProperty(o, "isElement", { enumerable: !0, get: function() {
    return v.isElement;
  } });
  var _ = ca;
  Object.defineProperty(o, "isEmpty", { enumerable: !0, get: function() {
    return _.isEmpty;
  } });
  var B = da;
  Object.defineProperty(o, "isFragment", { enumerable: !0, get: function() {
    return B.isFragment;
  } });
  var k = ua;
  Object.defineProperty(o, "isHTMLString", { enumerable: !0, get: function() {
    return k.isHTMLString;
  } });
  var P = Pr;
  Object.defineProperty(o, "isLeaf", { enumerable: !0, get: function() {
    return P.isLeaf;
  } });
  var M = Nr;
  Object.defineProperty(o, "isNodeEmpty", { enumerable: !0, get: function() {
    return M.isNodeEmpty;
  } });
  var N = qt;
  Object.defineProperty(o, "isLineBreakTag", { enumerable: !0, get: function() {
    return N.isLineBreakTag;
  } });
  var U = Yt;
  Object.defineProperty(o, "isSingleTag", { enumerable: !0, get: function() {
    return U.isSingleTag;
  } });
  var G = Kt;
  Object.defineProperty(o, "make", { enumerable: !0, get: function() {
    return G.make;
  } });
  var y = ha;
  Object.defineProperty(o, "offset", { enumerable: !0, get: function() {
    return y.offset;
  } });
  var m = pa;
  Object.defineProperty(o, "prepend", { enumerable: !0, get: function() {
    return m.prepend;
  } });
})(A);
const X = "cdx-list", W = {
  wrapper: X,
  item: `${X}__item`,
  itemContent: `${X}__item-content`,
  itemChildren: `${X}__item-children`
};
class ne {
  /**
   * Getter for all CSS classes used in unordered list rendering
   */
  static get CSS() {
    return {
      ...W,
      orderedList: `${X}-ordered`
    };
  }
  /**
   * Assign passed readonly mode and config to relevant class properties
   * @param readonly - read-only mode flag
   * @param config - user config for Tool
   */
  constructor(e, t) {
    this.config = t, this.readOnly = e;
  }
  /**
   * Renders ol wrapper for list
   * @param isRoot - boolean variable that represents level of the wrappre (root or childList)
   * @returns - created html ol element
   */
  renderWrapper(e) {
    let t;
    return e === !0 ? t = A.make("ol", [ne.CSS.wrapper, ne.CSS.orderedList]) : t = A.make("ol", [ne.CSS.orderedList, ne.CSS.itemChildren]), t;
  }
  /**
   * Redners list item element
   * @param content - content used in list item rendering
   * @param _meta - meta of the list item unused in rendering of the ordered list
   * @returns - created html list item element
   */
  renderItem(e, t) {
    const n = A.make("li", ne.CSS.item), r = A.make("div", ne.CSS.itemContent, {
      innerHTML: e,
      contentEditable: (!this.readOnly).toString()
    });
    return n.appendChild(r), n;
  }
  /**
   * Return the item content
   * @param item - item wrapper (<li>)
   * @returns - item content string
   */
  getItemContent(e) {
    const t = e.querySelector(`.${ne.CSS.itemContent}`);
    return !t || A.isEmpty(t) ? "" : t.innerHTML;
  }
  /**
   * Returns item meta, for ordered list
   * @returns item meta object
   */
  getItemMeta() {
    return {};
  }
  /**
   * Returns default item meta used on creation of the new item
   */
  composeDefaultMeta() {
    return {};
  }
}
class re {
  /**
   * Getter for all CSS classes used in unordered list rendering
   */
  static get CSS() {
    return {
      ...W,
      unorderedList: `${X}-unordered`
    };
  }
  /**
   * Assign passed readonly mode and config to relevant class properties
   * @param readonly - read-only mode flag
   * @param config - user config for Tool
   */
  constructor(e, t) {
    this.config = t, this.readOnly = e;
  }
  /**
   * Renders ol wrapper for list
   * @param isRoot - boolean variable that represents level of the wrappre (root or childList)
   * @returns - created html ul element
   */
  renderWrapper(e) {
    let t;
    return e === !0 ? t = A.make("ul", [re.CSS.wrapper, re.CSS.unorderedList]) : t = A.make("ul", [re.CSS.unorderedList, re.CSS.itemChildren]), t;
  }
  /**
   * Redners list item element
   * @param content - content used in list item rendering
   * @param _meta - meta of the list item unused in rendering of the unordered list
   * @returns - created html list item element
   */
  renderItem(e, t) {
    const n = A.make("li", re.CSS.item), r = A.make("div", re.CSS.itemContent, {
      innerHTML: e,
      contentEditable: (!this.readOnly).toString()
    });
    return n.appendChild(r), n;
  }
  /**
   * Return the item content
   * @param item - item wrapper (<li>)
   * @returns - item content string
   */
  getItemContent(e) {
    const t = e.querySelector(`.${re.CSS.itemContent}`);
    return !t || A.isEmpty(t) ? "" : t.innerHTML;
  }
  /**
   * Returns item meta, for unordered list
   * @returns Item meta object
   */
  getItemMeta() {
    return {};
  }
  /**
   * Returns default item meta used on creation of the new item
   */
  composeDefaultMeta() {
    return {};
  }
}
function Te(o) {
  return o.nodeType === Node.ELEMENT_NODE;
}
var Xe = {}, Fr = {}, Vt = {}, Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.getContenteditableSlice = If;
var Of = A;
function If(o, e, t, n, r) {
  var i;
  r === void 0 && (r = !1);
  var s = document.createRange();
  if (n === "left" ? (s.setStart(o, 0), s.setEnd(e, t)) : (s.setStart(e, t), s.setEnd(o, o.childNodes.length)), r === !0) {
    var a = s.extractContents();
    return (0, Of.fragmentToString)(a);
  }
  var l = s.cloneContents(), c = document.createElement("div");
  c.appendChild(l);
  var d = (i = c.textContent) !== null && i !== void 0 ? i : "";
  return d;
}
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.checkContenteditableSliceForEmptiness = Pf;
var Mf = A, Lf = Xt;
function Pf(o, e, t, n) {
  var r = (0, Lf.getContenteditableSlice)(o, e, t, n);
  return (0, Mf.isCollapsedWhitespaces)(r);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.checkContenteditableSliceForEmptiness = void 0;
  var e = Vt;
  Object.defineProperty(o, "checkContenteditableSliceForEmptiness", { enumerable: !0, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
})(Fr);
var fa = {};
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getContenteditableSlice = void 0;
  var e = Xt;
  Object.defineProperty(o, "getContenteditableSlice", { enumerable: !0, get: function() {
    return e.getContenteditableSlice;
  } });
})(fa);
var ga = {}, Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.focus = Nf;
var Af = A;
function Nf(o, e) {
  var t, n;
  if (e === void 0 && (e = !0), (0, Af.isNativeInput)(o)) {
    o.focus();
    var r = e ? 0 : o.value.length;
    o.setSelectionRange(r, r);
  } else {
    var i = document.createRange(), s = window.getSelection();
    if (!s)
      return;
    var a = function(h, g) {
      g === void 0 && (g = !1);
      var p = document.createTextNode("");
      g ? h.insertBefore(p, h.firstChild) : h.appendChild(p), i.setStart(p, 0), i.setEnd(p, 0);
    }, l = function(h) {
      return h != null;
    }, c = o.childNodes, d = e ? c[0] : c[c.length - 1];
    if (l(d)) {
      for (; l(d) && d.nodeType !== Node.TEXT_NODE; )
        d = e ? d.firstChild : d.lastChild;
      if (l(d) && d.nodeType === Node.TEXT_NODE) {
        var u = (n = (t = d.textContent) === null || t === void 0 ? void 0 : t.length) !== null && n !== void 0 ? n : 0, r = e ? 0 : u;
        i.setStart(d, r), i.setEnd(d, r);
      } else
        a(o, e);
    } else
      a(o);
    s.removeAllRanges(), s.addRange(i);
  }
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.focus = void 0;
  var e = Ur;
  Object.defineProperty(o, "focus", { enumerable: !0, get: function() {
    return e.focus;
  } });
})(ga);
var zr = {}, Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.getCaretNodeAndOffset = jf;
function jf() {
  var o = window.getSelection();
  if (o === null)
    return [null, 0];
  var e = o.focusNode, t = o.focusOffset;
  return e === null ? [null, 0] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] !== void 0 ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], e.textContent !== null && (t = e.textContent.length))), [e, t]);
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getCaretNodeAndOffset = void 0;
  var e = Gt;
  Object.defineProperty(o, "getCaretNodeAndOffset", { enumerable: !0, get: function() {
    return e.getCaretNodeAndOffset;
  } });
})(zr);
var ma = {}, Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.getRange = Df;
function Df() {
  var o = window.getSelection();
  return o && o.rangeCount ? o.getRangeAt(0) : null;
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.getRange = void 0;
  var e = Zt;
  Object.defineProperty(o, "getRange", { enumerable: !0, get: function() {
    return e.getRange;
  } });
})(ma);
var ba = {}, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.isCaretAtEndOfInput = Hf;
var fi = A, Rf = zr, $f = Fr;
function Hf(o) {
  var e = (0, fi.getDeepestNode)(o, !0);
  if (e === null)
    return !0;
  if ((0, fi.isNativeInput)(e))
    return e.selectionEnd === e.value.length;
  var t = (0, Rf.getCaretNodeAndOffset)(), n = t[0], r = t[1];
  return n === null ? !1 : (0, $f.checkContenteditableSliceForEmptiness)(o, n, r, "right");
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isCaretAtEndOfInput = void 0;
  var e = Wr;
  Object.defineProperty(o, "isCaretAtEndOfInput", { enumerable: !0, get: function() {
    return e.isCaretAtEndOfInput;
  } });
})(ba);
var va = {}, Kr = {};
Object.defineProperty(Kr, "__esModule", { value: !0 });
Kr.isCaretAtStartOfInput = zf;
var lt = A, Ff = Gt, Uf = Vt;
function zf(o) {
  var e = (0, lt.getDeepestNode)(o);
  if (e === null || (0, lt.isEmpty)(o))
    return !0;
  if ((0, lt.isNativeInput)(e))
    return e.selectionEnd === 0;
  if ((0, lt.isEmpty)(o))
    return !0;
  var t = (0, Ff.getCaretNodeAndOffset)(), n = t[0], r = t[1];
  return n === null ? !1 : (0, Uf.checkContenteditableSliceForEmptiness)(o, n, r, "left");
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.isCaretAtStartOfInput = void 0;
  var e = Kr;
  Object.defineProperty(o, "isCaretAtStartOfInput", { enumerable: !0, get: function() {
    return e.isCaretAtStartOfInput;
  } });
})(va);
var ya = {}, qr = {};
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.save = qf;
var Wf = A, Kf = Zt;
function qf() {
  var o = (0, Kf.getRange)(), e = (0, Wf.make)("span");
  if (e.id = "cursor", e.hidden = !0, !!o)
    return o.insertNode(e), function() {
      var t = window.getSelection();
      t && (o.setStartAfter(e), o.setEndAfter(e), t.removeAllRanges(), t.addRange(o), setTimeout(function() {
        e.remove();
      }, 150));
    };
}
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.save = void 0;
  var e = qr;
  Object.defineProperty(o, "save", { enumerable: !0, get: function() {
    return e.save;
  } });
})(ya);
(function(o) {
  Object.defineProperty(o, "__esModule", { value: !0 }), o.save = o.isCaretAtStartOfInput = o.isCaretAtEndOfInput = o.getRange = o.getCaretNodeAndOffset = o.focus = o.getContenteditableSlice = o.checkContenteditableSliceForEmptiness = void 0;
  var e = Fr;
  Object.defineProperty(o, "checkContenteditableSliceForEmptiness", { enumerable: !0, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
  var t = fa;
  Object.defineProperty(o, "getContenteditableSlice", { enumerable: !0, get: function() {
    return t.getContenteditableSlice;
  } });
  var n = ga;
  Object.defineProperty(o, "focus", { enumerable: !0, get: function() {
    return n.focus;
  } });
  var r = zr;
  Object.defineProperty(o, "getCaretNodeAndOffset", { enumerable: !0, get: function() {
    return r.getCaretNodeAndOffset;
  } });
  var i = ma;
  Object.defineProperty(o, "getRange", { enumerable: !0, get: function() {
    return i.getRange;
  } });
  var s = ba;
  Object.defineProperty(o, "isCaretAtEndOfInput", { enumerable: !0, get: function() {
    return s.isCaretAtEndOfInput;
  } });
  var a = va;
  Object.defineProperty(o, "isCaretAtStartOfInput", { enumerable: !0, get: function() {
    return a.isCaretAtStartOfInput;
  } });
  var l = ya;
  Object.defineProperty(o, "save", { enumerable: !0, get: function() {
    return l.save;
  } });
})(Xe);
class F {
  /**
   * Getter for all CSS classes used in unordered list rendering
   */
  static get CSS() {
    return {
      ...W,
      checklist: `${X}-checklist`,
      itemChecked: `${X}__checkbox--checked`,
      noHover: `${X}__checkbox--no-hover`,
      checkbox: `${X}__checkbox-check`,
      checkboxContainer: `${X}__checkbox`
    };
  }
  /**
   * Assign passed readonly mode and config to relevant class properties
   * @param readonly - read-only mode flag
   * @param config - user config for Tool
   */
  constructor(e, t) {
    this.config = t, this.readOnly = e;
  }
  /**
   * Renders ul wrapper for list
   * @param isRoot - boolean variable that represents level of the wrappre (root or childList)
   * @returns - created html ul element
   */
  renderWrapper(e) {
    let t;
    return e === !0 ? (t = A.make("ul", [F.CSS.wrapper, F.CSS.checklist]), t.addEventListener("click", (n) => {
      const r = n.target;
      if (r) {
        const i = r.closest(`.${F.CSS.checkboxContainer}`);
        i && i.contains(r) && this.toggleCheckbox(i);
      }
    })) : t = A.make("ul", [F.CSS.checklist, F.CSS.itemChildren]), t;
  }
  /**
   * Redners list item element
   * @param content - content used in list item rendering
   * @param meta - meta of the list item used in rendering of the checklist
   * @returns - created html list item element
   */
  renderItem(e, t) {
    const n = A.make("li", [F.CSS.item, F.CSS.item]), r = A.make("div", F.CSS.itemContent, {
      innerHTML: e,
      contentEditable: (!this.readOnly).toString()
    }), i = A.make("span", F.CSS.checkbox), s = A.make("div", F.CSS.checkboxContainer);
    return t.checked === !0 && s.classList.add(F.CSS.itemChecked), i.innerHTML = ap, s.appendChild(i), n.appendChild(s), n.appendChild(r), n;
  }
  /**
   * Return the item content
   * @param item - item wrapper (<li>)
   * @returns - item content string
   */
  getItemContent(e) {
    const t = e.querySelector(`.${F.CSS.itemContent}`);
    return !t || A.isEmpty(t) ? "" : t.innerHTML;
  }
  /**
   * Return meta object of certain element
   * @param item - will be returned meta information of this item
   * @returns Item meta object
   */
  getItemMeta(e) {
    const t = e.querySelector(`.${F.CSS.checkboxContainer}`);
    return {
      checked: t ? t.classList.contains(F.CSS.itemChecked) : !1
    };
  }
  /**
   * Returns default item meta used on creation of the new item
   */
  composeDefaultMeta() {
    return { checked: !1 };
  }
  /**
   * Toggle checklist item state
   * @param checkbox - checkbox element to be toggled
   */
  toggleCheckbox(e) {
    e.classList.toggle(F.CSS.itemChecked), e.classList.add(F.CSS.noHover), e.addEventListener("mouseleave", () => this.removeSpecialHoverBehavior(e), { once: !0 });
  }
  /**
   * Removes class responsible for special hover behavior on an item
   * @param el - item wrapper
   */
  removeSpecialHoverBehavior(e) {
    e.classList.remove(F.CSS.noHover);
  }
}
function so(o, e = "after") {
  const t = [];
  let n;
  function r(i) {
    switch (e) {
      case "after":
        return i.nextElementSibling;
      case "before":
        return i.previousElementSibling;
    }
  }
  for (n = r(o); n !== null; )
    t.push(n), n = r(n);
  return t.length !== 0 ? t : null;
}
function de(o, e = !0) {
  let t = o;
  return o.classList.contains(W.item) && (t = o.querySelector(`.${W.itemChildren}`)), t === null ? [] : Array.from(e ? t.querySelectorAll(`:scope > .${W.item}`) : t.querySelectorAll(`.${W.item}`));
}
function Yf(o) {
  return o.nextElementSibling === null;
}
function Vf(o) {
  return o.querySelector(`.${W.itemChildren}`) !== null;
}
function ve(o) {
  return o.querySelector(`.${W.itemChildren}`);
}
function ao(o) {
  let e = o;
  o.classList.contains(W.item) && (e = ve(o)), e !== null && de(e).length === 0 && e.remove();
}
function yt(o) {
  return o.querySelector(`.${W.itemContent}`);
}
function Pe(o, e = !0) {
  const t = yt(o);
  t && Xe.focus(t, e);
}
class lo {
  /**
   * Getter method to get current item
   * @returns current list item or null if caret position is not undefined
   */
  get currentItem() {
    const e = window.getSelection();
    if (!e)
      return null;
    let t = e.anchorNode;
    return !t || (Te(t) || (t = t.parentNode), !t) || !Te(t) ? null : t.closest(`.${W.item}`);
  }
  /**
   * Method that returns nesting level of the current item, null if there is no selection
   */
  get currentItemLevel() {
    const e = this.currentItem;
    if (e === null)
      return null;
    let t = e.parentNode, n = 0;
    for (; t !== null && t !== this.listWrapper; )
      Te(t) && t.classList.contains(W.item) && (n += 1), t = t.parentNode;
    return n + 1;
  }
  /**
   * Assign all passed params and renderer to relevant class properties
   * @param params - tool constructor options
   * @param params.data - previously saved data
   * @param params.config - user config for Tool
   * @param params.api - Editor.js API
   * @param params.readOnly - read-only mode flag
   * @param renderer - renderer instance initialized in tool class
   */
  constructor({ data: e, config: t, api: n, readOnly: r, block: i }, s) {
    this.config = t, this.data = e, this.readOnly = r, this.api = n, this.block = i, this.renderer = s;
  }
  /**
   * Function that is responsible for rendering list with contents
   * @returns Filled with content wrapper element of the list
   */
  render() {
    return this.listWrapper = this.renderer.renderWrapper(!0), this.data.items.length ? this.appendItems(this.data.items, this.listWrapper) : this.appendItems(
      [
        {
          content: "",
          meta: {},
          items: []
        }
      ],
      this.listWrapper
    ), this.readOnly || this.listWrapper.addEventListener(
      "keydown",
      (e) => {
        switch (e.key) {
          case "Enter":
            e.shiftKey || this.enterPressed(e);
            break;
          case "Backspace":
            this.backspace(e);
            break;
          case "Tab":
            e.shiftKey ? this.shiftTab(e) : this.addTab(e);
            break;
        }
      },
      !1
    ), "start" in this.data.meta && this.data.meta.start !== void 0 && this.changeStartWith(this.data.meta.start), "counterType" in this.data.meta && this.data.meta.counterType !== void 0 && this.changeCounters(this.data.meta.counterType), this.listWrapper;
  }
  /**
   * Function that is responsible for list content saving
   * @param wrapper - optional argument wrapper
   * @returns whole list saved data if wrapper not passes, otherwise will return data of the passed wrapper
   */
  save(e) {
    const t = e ?? this.listWrapper, n = (s) => de(s).map((a) => {
      const l = ve(a), c = this.renderer.getItemContent(a), d = this.renderer.getItemMeta(a), u = l ? n(l) : [];
      return {
        content: c,
        meta: d,
        items: u
      };
    }), r = t ? n(t) : [];
    let i = {
      style: this.data.style,
      meta: {},
      items: r
    };
    return this.data.style === "ordered" && (i.meta = {
      start: this.data.meta.start,
      counterType: this.data.meta.counterType
    }), i;
  }
  /**
   * On paste sanitzation config. Allow only tags that are allowed in the Tool.
   * @returns - config that determines tags supposted by paste handler
   * @todo - refactor and move to list instance
   */
  static get pasteConfig() {
    return {
      tags: ["OL", "UL", "LI"]
    };
  }
  /**
   * Method that specified hot to merge two List blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * Content of the first item of the next List would be merged with deepest item in current list
   * Other items of the next List would be appended to the current list without any changes in nesting levels
   * @param data - data of the second list to be merged with current
   */
  merge(e) {
    const t = this.block.holder.querySelectorAll(`.${W.item}`), n = t[t.length - 1], r = yt(n);
    if (n === null || r === null || (r.insertAdjacentHTML("beforeend", e.items[0].content), this.listWrapper === void 0))
      return;
    const i = de(this.listWrapper);
    if (i.length === 0)
      return;
    const s = i[i.length - 1];
    let a = ve(s);
    const l = e.items.shift();
    l !== void 0 && (l.items.length !== 0 && (a === null && (a = this.renderer.renderWrapper(!1)), this.appendItems(l.items, a)), e.items.length > 0 && this.appendItems(e.items, this.listWrapper));
  }
  /**
   * On paste callback that is fired from Editor.
   * @param event - event with pasted data
   * @todo - refactor and move to list instance
   */
  onPaste(e) {
    const t = e.detail.data;
    this.data = this.pasteHandler(t);
    const n = this.listWrapper;
    n && n.parentNode && n.parentNode.replaceChild(this.render(), n);
  }
  /**
   * Handle UL, OL and LI tags paste and returns List data
   * @param element - html element that contains whole list
   * @todo - refactor and move to list instance
   */
  pasteHandler(e) {
    const { tagName: t } = e;
    let n = "unordered", r;
    switch (t) {
      case "OL":
        n = "ordered", r = "ol";
        break;
      case "UL":
      case "LI":
        n = "unordered", r = "ul";
    }
    const i = {
      style: n,
      meta: {},
      items: []
    };
    n === "ordered" && (this.data.meta.counterType = "numeric", this.data.meta.start = 1);
    const s = (a) => Array.from(a.querySelectorAll(":scope > li")).map((l) => {
      const c = l.querySelector(`:scope > ${r}`), d = c ? s(c) : [];
      return {
        content: l.innerHTML ?? "",
        meta: {},
        items: d
      };
    });
    return i.items = s(e), i;
  }
  /**
   * Changes ordered list start property value
   * @param index - new value of the start property
   */
  changeStartWith(e) {
    this.listWrapper.style.setProperty("counter-reset", `item ${e - 1}`), this.data.meta.start = e;
  }
  /**
   * Changes ordered list counterType property value
   * @param counterType - new value of the counterType value
   */
  changeCounters(e) {
    this.listWrapper.style.setProperty("--list-counter-type", e), this.data.meta.counterType = e;
  }
  /**
   * Handles Enter keypress
   * @param event - keydown
   */
  enterPressed(e) {
    var t;
    const n = this.currentItem;
    if (e.stopPropagation(), e.preventDefault(), e.isComposing || n === null)
      return;
    const r = ((t = this.renderer) == null ? void 0 : t.getItemContent(n).trim().length) === 0, i = n.parentNode === this.listWrapper, s = n.previousElementSibling === null, a = this.api.blocks.getCurrentBlockIndex();
    if (i && r)
      if (Yf(n) && !Vf(n)) {
        s ? this.convertItemToDefaultBlock(a, !0) : this.convertItemToDefaultBlock();
        return;
      } else {
        this.splitList(n);
        return;
      }
    else if (r) {
      this.unshiftItem(n);
      return;
    } else
      this.splitItem(n);
  }
  /**
   * Handle backspace
   * @param event - keydown
   */
  backspace(e) {
    var t;
    const n = this.currentItem;
    if (n !== null && Xe.isCaretAtStartOfInput(n) && ((t = window.getSelection()) == null ? void 0 : t.isCollapsed) !== !1) {
      if (e.stopPropagation(), n.parentNode === this.listWrapper && n.previousElementSibling === null) {
        this.convertFirstItemToDefaultBlock();
        return;
      }
      e.preventDefault(), this.mergeItemWithPrevious(n);
    }
  }
  /**
   * Reduce indentation for current item
   * @param event - keydown
   */
  shiftTab(e) {
    e.stopPropagation(), e.preventDefault(), this.currentItem !== null && this.unshiftItem(this.currentItem);
  }
  /**
   * Decrease indentation of the passed item
   * @param item - list item to be unshifted
   */
  unshiftItem(e) {
    if (!e.parentNode || !Te(e.parentNode))
      return;
    const t = e.parentNode.closest(`.${W.item}`);
    if (!t)
      return;
    let n = ve(e);
    if (e.parentElement === null)
      return;
    const r = so(e);
    r !== null && (n === null && (n = this.renderer.renderWrapper(!1)), r.forEach((i) => {
      n.appendChild(i);
    }), e.appendChild(n)), t.after(e), Pe(e, !1), ao(t);
  }
  /**
   * Method that is used for list splitting and moving trailing items to the new separated list
   * @param item - current item html element
   */
  splitList(e) {
    const t = de(e), n = this.block, r = this.api.blocks.getCurrentBlockIndex();
    if (t.length !== 0) {
      const l = t[0];
      this.unshiftItem(l), Pe(e, !1);
    }
    if (e.previousElementSibling === null && e.parentNode === this.listWrapper) {
      this.convertItemToDefaultBlock(r);
      return;
    }
    const i = so(e);
    if (i === null)
      return;
    const s = this.renderer.renderWrapper(!0);
    i.forEach((l) => {
      s.appendChild(l);
    });
    const a = this.save(s);
    a.meta.start = this.data.style == "ordered" ? 1 : void 0, this.api.blocks.insert(n?.name, a, this.config, r + 1), this.convertItemToDefaultBlock(r + 1), s.remove();
  }
  /**
   * Method that is used for splitting item content and moving trailing content to the new sibling item
   * @param currentItem - current item html element
   */
  splitItem(e) {
    const [t, n] = Xe.getCaretNodeAndOffset();
    if (t === null)
      return;
    const r = yt(e);
    let i;
    r === null ? i = "" : i = Xe.getContenteditableSlice(r, t, n, "right", !0);
    const s = ve(e), a = this.renderItem(i);
    e?.after(a), s && a.appendChild(s), Pe(a);
  }
  /**
   * Method that is used for merging current item with previous one
   * Content of the current item would be appended to the previous item
   * Current item children would not change nesting level
   * @param item - current item html element
   */
  mergeItemWithPrevious(e) {
    const t = e.previousElementSibling, n = e.parentNode;
    if (n === null || !Te(n))
      return;
    const r = n.closest(`.${W.item}`);
    if (!t && !r || t && !Te(t))
      return;
    let i;
    if (t) {
      const u = de(t, !1);
      u.length !== 0 && u.length !== 0 ? i = u[u.length - 1] : i = t;
    } else
      i = r;
    const s = this.renderer.getItemContent(e);
    if (!i)
      return;
    Pe(i, !1);
    const a = yt(i);
    if (a === null)
      return;
    a.insertAdjacentHTML("beforeend", s);
    const l = de(e);
    if (l.length === 0) {
      e.remove(), ao(i);
      return;
    }
    const c = t || r, d = ve(c) ?? this.renderer.renderWrapper(!1);
    t ? l.forEach((u) => {
      d.appendChild(u);
    }) : l.forEach((u) => {
      d.prepend(u);
    }), ve(c) === null && i.appendChild(d), e.remove();
  }
  /**
   * Add indentation to current item
   * @param event - keydown
   */
  addTab(e) {
    var t;
    e.stopPropagation(), e.preventDefault();
    const n = this.currentItem;
    if (!n)
      return;
    if (((t = this.config) == null ? void 0 : t.maxLevel) !== void 0) {
      const s = this.currentItemLevel;
      if (s !== null && s === this.config.maxLevel)
        return;
    }
    const r = n.previousSibling;
    if (r === null || !Te(r))
      return;
    const i = ve(r);
    if (i)
      i.appendChild(n), de(n).forEach((s) => {
        i.appendChild(s);
      });
    else {
      const s = this.renderer.renderWrapper(!1);
      s.appendChild(n), de(n).forEach((a) => {
        s.appendChild(a);
      }), r.appendChild(s);
    }
    ao(n), Pe(n, !1);
  }
  /**
   * Convert current item to default block with passed index
   * @param newBloxkIndex - optional parameter represents index, where would be inseted default block
   * @param removeList - optional parameter, that represents condition, if List should be removed
   */
  convertItemToDefaultBlock(e, t) {
    let n;
    const r = this.currentItem, i = r !== null ? this.renderer.getItemContent(r) : "";
    t === !0 && this.api.blocks.delete(), e !== void 0 ? n = this.api.blocks.insert(void 0, { text: i }, void 0, e) : n = this.api.blocks.insert(), r?.remove(), this.api.caret.setToBlock(n, "start");
  }
  /**
   * Convert first item of the list to default block
   * This method could be called when backspace button pressed at start of the first item of the list
   * First item of the list would be converted to the paragraph and first item children would be unshifted
   */
  convertFirstItemToDefaultBlock() {
    const e = this.currentItem;
    if (e === null)
      return;
    const t = de(e);
    if (t.length !== 0) {
      const s = t[0];
      this.unshiftItem(s), Pe(e);
    }
    const n = so(e), r = this.api.blocks.getCurrentBlockIndex(), i = n === null;
    this.convertItemToDefaultBlock(r, i);
  }
  /**
   * Method that calls render function of the renderer with a necessary item meta cast
   * @param itemContent - content to be rendered in new item
   * @param meta - meta used in list item rendering
   * @returns html element of the rendered item
   */
  renderItem(e, t) {
    const n = t ?? this.renderer.composeDefaultMeta();
    switch (!0) {
      case this.renderer instanceof ne:
        return this.renderer.renderItem(e, n);
      case this.renderer instanceof re:
        return this.renderer.renderItem(e, n);
      default:
        return this.renderer.renderItem(e, n);
    }
  }
  /**
   * Renders children list
   * @param items - list data used in item rendering
   * @param parentElement - where to append passed items
   */
  appendItems(e, t) {
    e.forEach((n) => {
      var r;
      const i = this.renderItem(n.content, n.meta);
      if (t.appendChild(i), n.items.length) {
        const s = (r = this.renderer) == null ? void 0 : r.renderWrapper(!1);
        this.appendItems(n.items, s), i.appendChild(s);
      }
    });
  }
}
const Ae = {
  wrapper: `${X}-start-with-field`,
  input: `${X}-start-with-field__input`,
  startWithElementWrapperInvalid: `${X}-start-with-field--invalid`
};
function Xf(o, { value: e, placeholder: t, attributes: n, sanitize: r }) {
  const i = A.make("div", Ae.wrapper), s = A.make("input", Ae.input, {
    placeholder: t,
    /**
     * Used to prevent focusing on the input by Tab key
     * (Popover in the Toolbar lays below the blocks,
     * so Tab in the last block will focus this hidden input if this property is not set)
     */
    tabIndex: -1,
    /**
     * Value of the start property, if it is not specified, then it is set to one
     */
    value: e
  });
  for (const a in n)
    s.setAttribute(a, n[a]);
  return i.appendChild(s), s.addEventListener("input", () => {
    r !== void 0 && (s.value = r(s.value));
    const a = s.checkValidity();
    !a && !i.classList.contains(Ae.startWithElementWrapperInvalid) && i.classList.add(Ae.startWithElementWrapperInvalid), a && i.classList.contains(Ae.startWithElementWrapperInvalid) && i.classList.remove(Ae.startWithElementWrapperInvalid), a && o(s.value);
  }), i;
}
const qe = /* @__PURE__ */ new Map([
  /**
   * Value that represents default arabic numbers for counters
   */
  ["Numeric", "numeric"],
  /**
   * Value that represents lower roman numbers for counteres
   */
  ["Lower Roman", "lower-roman"],
  /**
   * Value that represents upper roman numbers for counters
   */
  ["Upper Roman", "upper-roman"],
  /**
   * Value that represents lower alpha characters for counters
   */
  ["Lower Alpha", "lower-alpha"],
  /**
   * Value that represents upper alpha characters for counters
   */
  ["Upper Alpha", "upper-alpha"]
]), gi = /* @__PURE__ */ new Map([
  /**
   * Value that represents Icon for Numeric counter type
   */
  ["numeric", lp],
  /**
   * Value that represents Icon for Lower Roman counter type
   */
  ["lower-roman", cp],
  /**
   * Value that represents Icon for Upper Roman counter type
   */
  ["upper-roman", dp],
  /**
   * Value that represents Icon for Lower Alpha counter type
   */
  ["lower-alpha", hp],
  /**
   * Value that represents Icon for Upper Alpha counter type
   */
  ["upper-alpha", up]
]);
function Gf(o) {
  return o.replace(/\D+/g, "");
}
function Zf(o) {
  return typeof o.items[0] == "string";
}
function Qf(o) {
  return !("meta" in o);
}
function Jf(o) {
  return typeof o.items[0] != "string" && "text" in o.items[0] && "checked" in o.items[0] && typeof o.items[0].text == "string" && typeof o.items[0].checked == "boolean";
}
function eg(o) {
  const e = [];
  return Zf(o) ? (o.items.forEach((t) => {
    e.push({
      content: t,
      meta: {},
      items: []
    });
  }), {
    style: o.style,
    meta: {},
    items: e
  }) : Jf(o) ? (o.items.forEach((t) => {
    e.push({
      content: t.text,
      meta: {
        checked: t.checked
      },
      items: []
    });
  }), {
    style: "checklist",
    meta: {},
    items: e
  }) : Qf(o) ? {
    style: o.style,
    meta: {},
    items: o.items
  } : structuredClone(o);
}
class It {
  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Allow to use native Enter behaviour
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   */
  static get toolbox() {
    return [
      {
        icon: ui,
        title: "Unordered List",
        data: {
          style: "unordered"
        }
      },
      {
        icon: hi,
        title: "Ordered List",
        data: {
          style: "ordered"
        }
      },
      {
        icon: di,
        title: "Checklist",
        data: {
          style: "checklist"
        }
      }
    ];
  }
  /**
   * On paste sanitzation config. Allow only tags that are allowed in the Tool.
   * @returns - paste config object used in editor
   */
  static get pasteConfig() {
    return {
      tags: ["OL", "UL", "LI"]
    };
  }
  /**
   * Convert from text to list with import and export list to text
   */
  static get conversionConfig() {
    return {
      export: (e) => It.joinRecursive(e),
      import: (e, t) => ({
        meta: {},
        items: [
          {
            content: e,
            meta: {},
            items: []
          }
        ],
        style: t?.defaultStyle !== void 0 ? t.defaultStyle : "unordered"
      })
    };
  }
  /**
   * Get list style name
   */
  get listStyle() {
    return this.data.style || this.defaultListStyle;
  }
  /**
   * Set list style
   * @param style - new style to set
   */
  set listStyle(e) {
    var t;
    this.data.style = e, this.changeTabulatorByStyle();
    const n = this.list.render();
    (t = this.listElement) == null || t.replaceWith(n), this.listElement = n;
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   * @param params - tool constructor options
   * @param params.data - previously saved data
   * @param params.config - user config for Tool
   * @param params.api - Editor.js API
   * @param params.readOnly - read-only mode flag
   */
  constructor({ data: e, config: t, api: n, readOnly: r, block: i }) {
    var s;
    this.api = n, this.readOnly = r, this.config = t, this.block = i, this.defaultListStyle = ((s = this.config) == null ? void 0 : s.defaultStyle) || "unordered", this.defaultCounterTypes = this.config.counterTypes || Array.from(qe.values());
    const a = {
      style: this.defaultListStyle,
      meta: {},
      items: []
    };
    this.data = Object.keys(e).length ? eg(e) : a, this.listStyle === "ordered" && this.data.meta.counterType === void 0 && (this.data.meta.counterType = "numeric"), this.changeTabulatorByStyle();
  }
  /**
   * Convert from list to text for conversionConfig
   * @param data - current data of the list
   * @returns - string of the recursively merged contents of the items of the list
   */
  static joinRecursive(e) {
    return e.items.map((t) => `${t.content} ${It.joinRecursive(t)}`).join("");
  }
  /**
   * Function that is responsible for content rendering
   * @returns rendered list wrapper with all contents
   */
  render() {
    return this.listElement = this.list.render(), this.listElement;
  }
  /**
   * Function that is responsible for content saving
   * @returns formatted content used in editor
   */
  save() {
    return this.data = this.list.save(), this.data;
  }
  /**
   * Function that is responsible for mergind two lists into one
   * @param data - data of the next standing list, that should be merged with current
   */
  merge(e) {
    this.list.merge(e);
  }
  /**
   * Creates Block Tune allowing to change the list style
   * @returns array of tune configs
   */
  renderSettings() {
    const e = [
      {
        label: this.api.i18n.t("Unordered"),
        icon: ui,
        closeOnActivate: !0,
        isActive: this.listStyle == "unordered",
        onActivate: () => {
          this.listStyle = "unordered";
        }
      },
      {
        label: this.api.i18n.t("Ordered"),
        icon: hi,
        closeOnActivate: !0,
        isActive: this.listStyle == "ordered",
        onActivate: () => {
          this.listStyle = "ordered";
        }
      },
      {
        label: this.api.i18n.t("Checklist"),
        icon: di,
        closeOnActivate: !0,
        isActive: this.listStyle == "checklist",
        onActivate: () => {
          this.listStyle = "checklist";
        }
      }
    ];
    if (this.listStyle === "ordered") {
      const t = Xf(
        (i) => this.changeStartWith(Number(i)),
        {
          value: String(this.data.meta.start ?? 1),
          placeholder: "",
          attributes: {
            required: "true"
          },
          sanitize: (i) => Gf(i)
        }
      ), n = [
        {
          label: this.api.i18n.t("Start with"),
          icon: pp,
          children: {
            items: [
              {
                element: t,
                // @ts-expect-error ts(2820) can not use PopoverItem enum from editor.js types
                type: "html"
              }
            ]
          }
        }
      ], r = {
        label: this.api.i18n.t("Counter type"),
        icon: gi.get(this.data.meta.counterType),
        children: {
          items: []
        }
      };
      qe.forEach((i, s) => {
        const a = qe.get(s);
        this.defaultCounterTypes.includes(a) && r.children.items.push({
          title: this.api.i18n.t(s),
          icon: gi.get(a),
          isActive: this.data.meta.counterType === qe.get(s),
          closeOnActivate: !0,
          onActivate: () => {
            this.changeCounters(qe.get(s));
          }
        });
      }), r.children.items.length > 1 && n.push(r), e.push({ type: "separator" }, ...n);
    }
    return e;
  }
  /**
   * On paste callback that is fired from Editor.
   * @param event - event with pasted data
   */
  onPaste(e) {
    const { tagName: t } = e.detail.data;
    switch (t) {
      case "OL":
        this.listStyle = "ordered";
        break;
      case "UL":
      case "LI":
        this.listStyle = "unordered";
    }
    this.list.onPaste(e);
  }
  /**
   * Handle UL, OL and LI tags paste and returns List data
   * @param element - html element that contains whole list
   */
  pasteHandler(e) {
    return this.list.pasteHandler(e);
  }
  /**
   * Changes ordered list counterType property value
   * @param counterType - new value of the counterType value
   */
  changeCounters(e) {
    var t;
    (t = this.list) == null || t.changeCounters(e), this.data.meta.counterType = e;
  }
  /**
   * Changes ordered list start property value
   * @param index - new value of the start property
   */
  changeStartWith(e) {
    var t;
    (t = this.list) == null || t.changeStartWith(e), this.data.meta.start = e;
  }
  /**
   * This method allows changing tabulator respectfully to passed style
   */
  changeTabulatorByStyle() {
    switch (this.listStyle) {
      case "ordered":
        this.list = new lo(
          {
            data: this.data,
            readOnly: this.readOnly,
            api: this.api,
            config: this.config,
            block: this.block
          },
          new ne(this.readOnly, this.config)
        );
        break;
      case "unordered":
        this.list = new lo(
          {
            data: this.data,
            readOnly: this.readOnly,
            api: this.api,
            config: this.config,
            block: this.block
          },
          new re(this.readOnly, this.config)
        );
        break;
      case "checklist":
        this.list = new lo(
          {
            data: this.data,
            readOnly: this.readOnly,
            api: this.api,
            config: this.config,
            block: this.block
          },
          new F(this.readOnly, this.config)
        );
        break;
    }
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var o = document.createElement("style");
      o.appendChild(document.createTextNode('.embed-tool--loading .embed-tool__caption{display:none}.embed-tool--loading .embed-tool__preloader{display:block}.embed-tool--loading .embed-tool__content{display:none}.embed-tool__preloader{display:none;position:relative;height:200px;box-sizing:border-box;border-radius:5px;border:1px solid #e6e9eb}.embed-tool__preloader:before{content:"";position:absolute;z-index:3;left:50%;top:50%;width:30px;height:30px;margin-top:-25px;margin-left:-15px;border-radius:50%;border:2px solid #cdd1e0;border-top-color:#388ae5;box-sizing:border-box;animation:embed-preloader-spin 2s infinite linear}.embed-tool__url{position:absolute;bottom:20px;left:50%;transform:translate(-50%);max-width:250px;color:#7b7e89;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.embed-tool__content{width:100%}.embed-tool__caption{margin-top:7px}.embed-tool__caption[contentEditable=true][data-placeholder]:before{position:absolute;content:attr(data-placeholder);color:#707684;font-weight:400;opacity:0}.embed-tool__caption[contentEditable=true][data-placeholder]:empty:before{opacity:1}.embed-tool__caption[contentEditable=true][data-placeholder]:empty:focus:before{opacity:0}@keyframes embed-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')), document.head.appendChild(o);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const tg = {
  vimeo: {
    regex: /(?:http[s]?:\/\/)?(?:www.)?(?:player.)?vimeo\.co(?:.+\/([^\/]\d+)(?:#t=[\d]+)?s?$)/,
    embedUrl: "https://player.vimeo.com/video/<%= remote_id %>?title=0&byline=0",
    html: '<iframe style="width:100%;" height="320" frameborder="0"></iframe>',
    height: 320,
    width: 580
  },
  youtube: {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:(?:youtu\.be\/)|(?:youtube\.com)\/(?:v\/|u\/\w\/|embed\/|watch))(?:(?:\?v=)?([^#&?=]*))?((?:[?&]\w*=\w*)*)/,
    embedUrl: "https://www.youtube.com/embed/<%= remote_id %>",
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
    height: 320,
    width: 580,
    id: ([o, e]) => {
      if (!e && o)
        return o;
      const t = {
        start: "start",
        end: "end",
        t: "start",
        // eslint-disable-next-line camelcase
        time_continue: "start",
        list: "list"
      };
      let n = e.slice(1).split("&").map((r) => {
        const [i, s] = r.split("=");
        return !o && i === "v" ? (o = s, null) : !t[i] || s === "LL" || s.startsWith("RDMM") || s.startsWith("FL") ? null : `${t[i]}=${s}`;
      }).filter((r) => !!r);
      return o + "?" + n.join("&");
    }
  },
  coub: {
    regex: /https?:\/\/coub\.com\/view\/([^\/\?\&]+)/,
    embedUrl: "https://coub.com/embed/<%= remote_id %>",
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
    height: 320,
    width: 580
  },
  vine: {
    regex: /https?:\/\/vine\.co\/v\/([^\/\?\&]+)/,
    embedUrl: "https://vine.co/v/<%= remote_id %>/embed/simple/",
    html: '<iframe style="width:100%;" height="320" frameborder="0" allowfullscreen></iframe>',
    height: 320,
    width: 580
  },
  imgur: {
    regex: /https?:\/\/(?:i\.)?imgur\.com.*\/([a-zA-Z0-9]+)(?:\.gifv)?/,
    embedUrl: "http://imgur.com/<%= remote_id %>/embed",
    html: '<iframe allowfullscreen="true" scrolling="no" id="imgur-embed-iframe-pub-<%= remote_id %>" class="imgur-embed-iframe-pub" style="height: 500px; width: 100%; border: 1px solid #000"></iframe>',
    height: 500,
    width: 540
  },
  gfycat: {
    regex: /https?:\/\/gfycat\.com(?:\/detail)?\/([a-zA-Z]+)/,
    embedUrl: "https://gfycat.com/ifr/<%= remote_id %>",
    html: `<iframe frameborder='0' scrolling='no' style="width:100%;" height='436' allowfullscreen ></iframe>`,
    height: 436,
    width: 580
  },
  "twitch-channel": {
    regex: /https?:\/\/www\.twitch\.tv\/([^\/\?\&]*)\/?$/,
    embedUrl: "https://player.twitch.tv/?channel=<%= remote_id %>",
    html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
    height: 366,
    width: 600
  },
  "twitch-video": {
    regex: /https?:\/\/www\.twitch\.tv\/(?:[^\/\?\&]*\/v|videos)\/([0-9]*)/,
    embedUrl: "https://player.twitch.tv/?video=v<%= remote_id %>",
    html: '<iframe frameborder="0" allowfullscreen="true" scrolling="no" height="366" style="width:100%;"></iframe>',
    height: 366,
    width: 600
  },
  "yandex-music-album": {
    regex: /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/?$/,
    embedUrl: "https://music.yandex.ru/iframe/#album/<%= remote_id %>/",
    html: '<iframe frameborder="0" style="border:none;width:540px;height:400px;" style="width:100%;" height="400"></iframe>',
    height: 400,
    width: 540
  },
  "yandex-music-track": {
    regex: /https?:\/\/music\.yandex\.ru\/album\/([0-9]*)\/track\/([0-9]*)/,
    embedUrl: "https://music.yandex.ru/iframe/#track/<%= remote_id %>/",
    html: '<iframe frameborder="0" style="border:none;width:540px;height:100px;" style="width:100%;" height="100"></iframe>',
    height: 100,
    width: 540,
    id: (o) => o.join("/")
  },
  "yandex-music-playlist": {
    regex: /https?:\/\/music\.yandex\.ru\/users\/([^\/\?\&]*)\/playlists\/([0-9]*)/,
    embedUrl: "https://music.yandex.ru/iframe/#playlist/<%= remote_id %>/show/cover/description/",
    html: '<iframe frameborder="0" style="border:none;width:540px;height:400px;" width="540" height="400"></iframe>',
    height: 400,
    width: 540,
    id: (o) => o.join("/")
  },
  codepen: {
    regex: /https?:\/\/codepen\.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
    embedUrl: "https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
    html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
    height: 300,
    width: 600,
    id: (o) => o.join("/embed/")
  },
  instagram: {
    //it support both reel and post
    regex: /^https:\/\/(?:www\.)?instagram\.com\/(?:reel|p)\/(.*)/,
    embedUrl: "https://www.instagram.com/p/<%= remote_id %>/embed",
    html: '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
    height: 505,
    width: 400,
    id: (o) => {
      var e;
      return (e = o?.[0]) == null ? void 0 : e.split("/")[0];
    }
  },
  twitter: {
    regex: /^https?:\/\/(www\.)?(?:twitter\.com|x\.com)\/.+\/status\/(\d+)/,
    embedUrl: "https://platform.twitter.com/embed/Tweet.html?id=<%= remote_id %>",
    html: '<iframe width="600" height="600" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
    height: 300,
    width: 600,
    id: (o) => o[1]
  },
  pinterest: {
    regex: /https?:\/\/([^\/\?\&]*).pinterest.com\/pin\/([^\/\?\&]*)\/?$/,
    embedUrl: "https://assets.pinterest.com/ext/embed.html?id=<%= remote_id %>",
    html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 400px; max-height: 1000px;'></iframe>",
    id: (o) => o[1]
  },
  facebook: {
    regex: /https?:\/\/www.facebook.com\/([^\/\?\&]*)\/(.*)/,
    embedUrl: "https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/<%= remote_id %>&width=500",
    html: "<iframe scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; min-height: 500px; max-height: 1000px;'></iframe>",
    id: (o) => o.join("/")
  },
  aparat: {
    regex: /(?:http[s]?:\/\/)?(?:www.)?aparat\.com\/v\/([^\/\?\&]+)\/?/,
    embedUrl: "https://www.aparat.com/video/video/embed/videohash/<%= remote_id %>/vt/frame",
    html: '<iframe width="600" height="300" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
    height: 300,
    width: 600
  },
  miro: {
    regex: /https:\/\/miro.com\/\S+(\S{12})\/(\S+)?/,
    embedUrl: "https://miro.com/app/live-embed/<%= remote_id %>",
    html: '<iframe width="700" height="500" style="margin: 0 auto;" allowFullScreen frameBorder="0" scrolling="no"></iframe>'
  },
  github: {
    regex: /https?:\/\/gist.github.com\/([^\/\?\&]*)\/([^\/\?\&]*)/,
    embedUrl: 'data:text/html;charset=utf-8,<head><base target="_blank" /></head><body><script src="https://gist.github.com/<%= remote_id %>" ><\/script></body>',
    html: '<iframe width="100%" height="350" frameborder="0" style="margin: 0 auto;"></iframe>',
    height: 300,
    width: 600,
    id: (o) => `${o.join("/")}.js`
  }
};
function Co(o, e, t) {
  var n, r, i, s, a;
  e == null && (e = 100);
  function l() {
    var d = Date.now() - s;
    d < e && d >= 0 ? n = setTimeout(l, e - d) : (n = null, t || (a = o.apply(i, r), i = r = null));
  }
  var c = function() {
    i = this, r = arguments, s = Date.now();
    var d = t && !n;
    return n || (n = setTimeout(l, e)), d && (a = o.apply(i, r), i = r = null), a;
  };
  return c.clear = function() {
    n && (clearTimeout(n), n = null);
  }, c.flush = function() {
    n && (a = o.apply(i, r), i = r = null, clearTimeout(n), n = null);
  }, c;
}
Co.debounce = Co;
var og = Co;
class ie {
  /**
   * @param {{data: EmbedData, config: EmbedConfig, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   *   readOnly - read-only mode flag
   */
  constructor({ data: e, api: t, readOnly: n }) {
    this.api = t, this._data = {}, this.element = null, this.readOnly = n, this.data = e;
  }
  /**
   * @param {EmbedData} data - embed data
   * @param {RegExp} [data.regex] - pattern of source URLs
   * @param {string} [data.embedUrl] - URL scheme to embedded page. Use '<%= remote_id %>' to define a place to insert resource id
   * @param {string} [data.html] - iframe which contains embedded content
   * @param {number} [data.height] - iframe height
   * @param {number} [data.width] - iframe width
   * @param {string} [data.caption] - caption
   */
  set data(e) {
    var t;
    if (!(e instanceof Object))
      throw Error("Embed Tool data should be object");
    const { service: n, source: r, embed: i, width: s, height: a, caption: l = "" } = e;
    this._data = {
      service: n || this.data.service,
      source: r || this.data.source,
      embed: i || this.data.embed,
      width: s || this.data.width,
      height: a || this.data.height,
      caption: l || this.data.caption || ""
    };
    const c = this.element;
    c && ((t = c.parentNode) == null || t.replaceChild(this.render(), c));
  }
  /**
   * @returns {EmbedData}
   */
  get data() {
    if (this.element) {
      const e = this.element.querySelector(`.${this.api.styles.input}`);
      this._data.caption = e ? e.innerHTML : "";
    }
    return this._data;
  }
  /**
   * Get plugin styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      container: "embed-tool",
      containerLoading: "embed-tool--loading",
      preloader: "embed-tool__preloader",
      caption: "embed-tool__caption",
      url: "embed-tool__url",
      content: "embed-tool__content"
    };
  }
  /**
   * Render Embed tool content
   *
   * @returns {HTMLElement}
   */
  render() {
    if (!this.data.service) {
      const a = document.createElement("div");
      return this.element = a, a;
    }
    const { html: e } = ie.services[this.data.service], t = document.createElement("div"), n = document.createElement("div"), r = document.createElement("template"), i = this.createPreloader();
    t.classList.add(this.CSS.baseClass, this.CSS.container, this.CSS.containerLoading), n.classList.add(this.CSS.input, this.CSS.caption), t.appendChild(i), n.contentEditable = (!this.readOnly).toString(), n.dataset.placeholder = this.api.i18n.t("Enter a caption"), n.innerHTML = this.data.caption || "", r.innerHTML = e, r.content.firstChild.setAttribute("src", this.data.embed), r.content.firstChild.classList.add(this.CSS.content);
    const s = this.embedIsReady(t);
    return r.content.firstChild && t.appendChild(r.content.firstChild), t.appendChild(n), s.then(() => {
      t.classList.remove(this.CSS.containerLoading);
    }), this.element = t, t;
  }
  /**
   * Creates preloader to append to container while data is loading
   *
   * @returns {HTMLElement}
   */
  createPreloader() {
    const e = document.createElement("preloader"), t = document.createElement("div");
    return t.textContent = this.data.source, e.classList.add(this.CSS.preloader), t.classList.add(this.CSS.url), e.appendChild(t), e;
  }
  /**
   * Save current content and return EmbedData object
   *
   * @returns {EmbedData}
   */
  save() {
    return this.data;
  }
  /**
   * Handle pasted url and return Service object
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(e) {
    var t;
    const { key: n, data: r } = e.detail, { regex: i, embedUrl: s, width: a, height: l, id: c = (h) => h.shift() || "" } = ie.services[n], d = (t = i.exec(r)) == null ? void 0 : t.slice(1), u = d ? s.replace(/<%= remote_id %>/g, c(d)) : "";
    this.data = {
      service: n,
      source: r,
      embed: u,
      width: a,
      height: l
    };
  }
  /**
   * Analyze provided config and make object with services to use
   *
   * @param {EmbedConfig} config - configuration of embed block element
   */
  static prepare({ config: e = {} }) {
    const { services: t = {} } = e;
    let n = Object.entries(tg);
    const r = Object.entries(t).filter(([s, a]) => typeof a == "boolean" && a === !0).map(([s]) => s), i = Object.entries(t).filter(([s, a]) => typeof a == "object").filter(([s, a]) => ie.checkServiceConfig(a)).map(([s, a]) => {
      const { regex: l, embedUrl: c, html: d, height: u, width: h, id: g } = a;
      return [s, {
        regex: l,
        embedUrl: c,
        html: d,
        height: u,
        width: h,
        id: g
      }];
    });
    r.length && (n = n.filter(([s]) => r.includes(s))), n = n.concat(i), ie.services = n.reduce((s, [a, l]) => a in s ? (s[a] = Object.assign({}, s[a], l), s) : (s[a] = l, s), {}), ie.patterns = n.reduce((s, [a, l]) => (l && typeof l != "boolean" && (s[a] = l.regex), s), {});
  }
  /**
   * Check if Service config is valid
   *
   * @param {Service} config - configuration of embed block element
   * @returns {boolean}
   */
  static checkServiceConfig(e) {
    const { regex: t, embedUrl: n, html: r, height: i, width: s, id: a } = e;
    let l = !!(t && t instanceof RegExp) && !!(n && typeof n == "string") && !!(r && typeof r == "string");
    return l = l && (a !== void 0 ? a instanceof Function : !0), l = l && (i !== void 0 ? Number.isFinite(i) : !0), l = l && (s !== void 0 ? Number.isFinite(s) : !0), l;
  }
  /**
   * Paste configuration to enable pasted URLs processing by Editor
   *
   * @returns {object} - object of patterns which contain regx for pasteConfig
   */
  static get pasteConfig() {
    return {
      patterns: ie.patterns
    };
  }
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Checks that mutations in DOM have finished after appending iframe content
   *
   * @param {HTMLElement} targetNode - HTML-element mutations of which to listen
   * @returns {Promise<any>} - result that all mutations have finished
   */
  embedIsReady(e) {
    let t;
    return new Promise((n, r) => {
      t = new MutationObserver(og.debounce(n, 450)), t.observe(e, {
        childList: !0,
        subtree: !0
      });
    }).then(() => {
      t.disconnect();
    });
  }
}
function ng(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var co = { exports: {} }, mi;
function rg() {
  return mi || (mi = 1, (function(o, e) {
    (function(t, n) {
      o.exports = n();
    })(self, (() => (() => {
      var t = { 523: (s, a, l) => {
        l.d(a, { A: () => g });
        var c = l(601), d = l.n(c), u = l(314), h = l.n(u)()(d());
        h.push([s.id, `.ce-block--drop-target .ce-block__content:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -20px;
  margin-top: -1px;
  height: 8px;
  width: 8px;
  border: solid #a0a0a0;
  border-width: 1px 1px 0 0;
  -webkit-transform-origin: right;
  transform-origin: right;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.ce-block--drop-target .ce-block__content:after {
  background: none;
}
`, ""]);
        const g = h;
      }, 314: (s) => {
        s.exports = function(a) {
          var l = [];
          return l.toString = function() {
            return this.map((function(c) {
              var d = "", u = c[5] !== void 0;
              return c[4] && (d += "@supports (".concat(c[4], ") {")), c[2] && (d += "@media ".concat(c[2], " {")), u && (d += "@layer".concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {")), d += a(c), u && (d += "}"), c[2] && (d += "}"), c[4] && (d += "}"), d;
            })).join("");
          }, l.i = function(c, d, u, h, g) {
            typeof c == "string" && (c = [[null, c, void 0]]);
            var p = {};
            if (u) for (var v = 0; v < this.length; v++) {
              var _ = this[v][0];
              _ != null && (p[_] = !0);
            }
            for (var B = 0; B < c.length; B++) {
              var k = [].concat(c[B]);
              u && p[k[0]] || (g !== void 0 && (k[5] === void 0 || (k[1] = "@layer".concat(k[5].length > 0 ? " ".concat(k[5]) : "", " {").concat(k[1], "}")), k[5] = g), d && (k[2] && (k[1] = "@media ".concat(k[2], " {").concat(k[1], "}")), k[2] = d), h && (k[4] ? (k[1] = "@supports (".concat(k[4], ") {").concat(k[1], "}"), k[4] = h) : k[4] = "".concat(h)), l.push(k));
            }
          }, l;
        };
      }, 601: (s) => {
        s.exports = function(a) {
          return a[1];
        };
      }, 72: (s) => {
        var a = [];
        function l(u) {
          for (var h = -1, g = 0; g < a.length; g++) if (a[g].identifier === u) {
            h = g;
            break;
          }
          return h;
        }
        function c(u, h) {
          for (var g = {}, p = [], v = 0; v < u.length; v++) {
            var _ = u[v], B = h.base ? _[0] + h.base : _[0], k = g[B] || 0, P = "".concat(B, " ").concat(k);
            g[B] = k + 1;
            var M = l(P), N = { css: _[1], media: _[2], sourceMap: _[3], supports: _[4], layer: _[5] };
            if (M !== -1) a[M].references++, a[M].updater(N);
            else {
              var U = d(N, h);
              h.byIndex = v, a.splice(v, 0, { identifier: P, updater: U, references: 1 });
            }
            p.push(P);
          }
          return p;
        }
        function d(u, h) {
          var g = h.domAPI(h);
          return g.update(u), function(p) {
            if (p) {
              if (p.css === u.css && p.media === u.media && p.sourceMap === u.sourceMap && p.supports === u.supports && p.layer === u.layer) return;
              g.update(u = p);
            } else g.remove();
          };
        }
        s.exports = function(u, h) {
          var g = c(u = u || [], h = h || {});
          return function(p) {
            p = p || [];
            for (var v = 0; v < g.length; v++) {
              var _ = l(g[v]);
              a[_].references--;
            }
            for (var B = c(p, h), k = 0; k < g.length; k++) {
              var P = l(g[k]);
              a[P].references === 0 && (a[P].updater(), a.splice(P, 1));
            }
            g = B;
          };
        };
      }, 659: (s) => {
        var a = {};
        s.exports = function(l, c) {
          var d = (function(u) {
            if (a[u] === void 0) {
              var h = document.querySelector(u);
              if (window.HTMLIFrameElement && h instanceof window.HTMLIFrameElement) try {
                h = h.contentDocument.head;
              } catch {
                h = null;
              }
              a[u] = h;
            }
            return a[u];
          })(l);
          if (!d) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          d.appendChild(c);
        };
      }, 540: (s) => {
        s.exports = function(a) {
          var l = document.createElement("style");
          return a.setAttributes(l, a.attributes), a.insert(l, a.options), l;
        };
      }, 56: (s, a, l) => {
        s.exports = function(c) {
          var d = l.nc;
          d && c.setAttribute("nonce", d);
        };
      }, 825: (s) => {
        s.exports = function(a) {
          if (typeof document > "u") return { update: function() {
          }, remove: function() {
          } };
          var l = a.insertStyleElement(a);
          return { update: function(c) {
            (function(d, u, h) {
              var g = "";
              h.supports && (g += "@supports (".concat(h.supports, ") {")), h.media && (g += "@media ".concat(h.media, " {"));
              var p = h.layer !== void 0;
              p && (g += "@layer".concat(h.layer.length > 0 ? " ".concat(h.layer) : "", " {")), g += h.css, p && (g += "}"), h.media && (g += "}"), h.supports && (g += "}");
              var v = h.sourceMap;
              v && typeof btoa < "u" && (g += `
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(v)))), " */")), u.styleTagTransform(g, d, u.options);
            })(l, a, c);
          }, remove: function() {
            (function(c) {
              if (c.parentNode === null) return !1;
              c.parentNode.removeChild(c);
            })(l);
          } };
        };
      }, 113: (s) => {
        s.exports = function(a, l) {
          if (l.styleSheet) l.styleSheet.cssText = a;
          else {
            for (; l.firstChild; ) l.removeChild(l.firstChild);
            l.appendChild(document.createTextNode(a));
          }
        };
      } }, n = {};
      function r(s) {
        var a = n[s];
        if (a !== void 0) return a.exports;
        var l = n[s] = { id: s, exports: {} };
        return t[s](l, l.exports, r), l.exports;
      }
      r.n = (s) => {
        var a = s && s.__esModule ? () => s.default : () => s;
        return r.d(a, { a }), a;
      }, r.d = (s, a) => {
        for (var l in a) r.o(a, l) && !r.o(s, l) && Object.defineProperty(s, l, { enumerable: !0, get: a[l] });
      }, r.o = (s, a) => Object.prototype.hasOwnProperty.call(s, a), r.nc = void 0;
      var i = {};
      return (() => {
        r.d(i, { default: () => G });
        var s = r(72), a = r.n(s), l = r(825), c = r.n(l), d = r(659), u = r.n(d), h = r(56), g = r.n(h), p = r(540), v = r.n(p), _ = r(113), B = r.n(_), k = r(523), P = {};
        function M(y) {
          return M = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(m) {
            return typeof m;
          } : function(m) {
            return m && typeof Symbol == "function" && m.constructor === Symbol && m !== Symbol.prototype ? "symbol" : typeof m;
          }, M(y);
        }
        function N(y, m) {
          for (var w = 0; w < m.length; w++) {
            var b = m[w];
            b.enumerable = b.enumerable || !1, b.configurable = !0, "value" in b && (b.writable = !0), Object.defineProperty(y, U(b.key), b);
          }
        }
        function U(y) {
          var m = (function(w, b) {
            if (M(w) != "object" || !w) return w;
            var x = w[Symbol.toPrimitive];
            if (x !== void 0) {
              var E = x.call(w, "string");
              if (M(E) != "object") return E;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(w);
          })(y);
          return M(m) == "symbol" ? m : m + "";
        }
        P.styleTagTransform = B(), P.setAttributes = g(), P.insert = u().bind(null, "head"), P.domAPI = c(), P.insertStyleElement = v(), a()(k.A, P), k.A && k.A.locals && k.A.locals;
        var G = (function() {
          return y = function b(x, E) {
            var I = x.configuration, T = x.blocks, H = x.toolbar, Ce = x.save;
            (function(ce, Ue) {
              if (!(ce instanceof Ue)) throw new TypeError("Cannot call a class as a function");
            })(this, b), this.toolbar = H, this.borderStyle = E || "1px dashed #aaa", this.api = T, this.holder = typeof I.holder == "string" ? document.getElementById(I.holder) : I.holder, this.readOnly = I.readOnly, this.startBlock = null, this.endBlock = null, this.save = Ce, this.setDragListener(), this.setDropListener();
          }, w = [{ key: "isReadOnlySupported", get: function() {
            return !0;
          } }], (m = [{ key: "setElementCursor", value: function(b) {
            if (b) {
              var x = document.createRange(), E = window.getSelection();
              x.setStart(b.childNodes[0], 0), x.collapse(!0), E.removeAllRanges(), E.addRange(x), b.focus();
            }
          } }, { key: "setDragListener", value: function() {
            var b = this;
            if (!this.readOnly) {
              var x = this.holder.querySelector(".ce-toolbar__settings-btn");
              if (x) this.initializeDragListener(x);
              else {
                var E = new MutationObserver((function(I, T) {
                  var H = b.holder.querySelector(".ce-toolbar__settings-btn");
                  H && (b.initializeDragListener(H), T.disconnect());
                }));
                E.observe(this.holder, { childList: !0, subtree: !0 });
              }
            }
          } }, { key: "initializeDragListener", value: function(b) {
            var x = this;
            b.setAttribute("draggable", "true"), b.addEventListener("dragstart", (function() {
              x.startBlock = x.api.getCurrentBlockIndex();
            })), b.addEventListener("drag", (function() {
              if (x.toolbar.close(), !x.isTheOnlyBlock()) {
                var E = x.holder.querySelectorAll(".ce-block"), I = x.holder.querySelector(".ce-block--drop-target");
                x.setElementCursor(I), x.setBorderBlocks(E, I);
              }
            }));
          } }, { key: "setBorderBlocks", value: function(b, x) {
            var E = this;
            Object.values(b).forEach((function(I) {
              var T = I.querySelector(".ce-block__content");
              I !== x ? (T.style.removeProperty("border-top"), T.style.removeProperty("border-bottom")) : Object.keys(b).find((function(H) {
                return b[H] === x;
              })) > E.startBlock ? T.style.borderBottom = E.borderStyle : T.style.borderTop = E.borderStyle;
            }));
          } }, { key: "setDropListener", value: function() {
            var b = this;
            document.addEventListener("drop", (function(x) {
              var E = x.target;
              if (b.holder.contains(E) && b.startBlock !== null) {
                var I = b.getDropTarget(E);
                if (I) {
                  var T = I.querySelector(".ce-block__content");
                  T.style.removeProperty("border-top"), T.style.removeProperty("border-bottom"), b.endBlock = b.getTargetPosition(I), b.moveBlocks();
                }
              }
              b.startBlock = null;
            }));
          } }, { key: "getDropTarget", value: function(b) {
            return b.classList.contains("ce-block") ? b : b.closest(".ce-block");
          } }, { key: "getTargetPosition", value: function(b) {
            return Array.from(b.parentNode.children).indexOf(b);
          } }, { key: "isTheOnlyBlock", value: function() {
            return this.api.getBlocksCount() === 1;
          } }, { key: "moveBlocks", value: function() {
            this.isTheOnlyBlock() || this.api.move(this.endBlock, this.startBlock);
          } }]) && N(y.prototype, m), w && N(y, w), Object.defineProperty(y, "prototype", { writable: !1 }), y;
          var y, m, w;
        })();
      })(), i.default;
    })()));
  })(co)), co.exports;
}
var ig = rg();
const bi = /* @__PURE__ */ ng(ig);
var sg = Object.defineProperty, ag = Object.getOwnPropertyDescriptor, ot = (o, e, t, n) => {
  for (var r = n > 1 ? void 0 : n ? ag(e, t) : e, i = o.length - 1, s; i >= 0; i--)
    (s = o[i]) && (r = (n ? s(e, t, r) : s(r)) || r);
  return n && r && sg(e, t, r), r;
};
const lg = /* @__PURE__ */ new Set(["header", "image", "quote", "embed", "code", "raw", "list", "checklist", "link", "umbracoBlock"]);
async function cg(o) {
  if (typeof o == "function") {
    if (o.prototype)
      return o;
    const e = await o();
    return e?.default ?? e?.api;
  }
  if (typeof o == "string") {
    const e = await import(
      /* @vite-ignore */
      o
    );
    return e?.default ?? e?.api;
  }
}
let xe = class extends Ta {
  constructor() {
    super(), this.value = "", this.readonly = !1, this._editorId = "", this._editor = null, this._handleKeyDown = (o) => {
      (o.ctrlKey || o.metaKey) && o.stopPropagation(), o.key === "Enter" && o.stopPropagation();
    }, this._editorId = "skrivlet-editor-" + this._randomUUID();
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this._handleKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this._handleKeyDown), this._editor && this._editor.destroy();
  }
  firstUpdated() {
    this._initializeEditor();
  }
  _randomUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(o) {
      var e = Math.random() * 16 | 0, t = o == "x" ? e : e & 3 | 8;
      return t.toString(16);
    });
  }
  _getInitialData() {
    let o = {};
    if (!this.value)
      o = {};
    else if (typeof this.value == "string")
      try {
        o = JSON.parse(this.value);
      } catch (e) {
        console.error("Error parsing SkrivLet initial data JSON:", e);
      }
    else
      o = this.value ? this.value : {};
    return o;
  }
  async _initializeEditor() {
    const o = this.shadowRoot?.getElementById(this._editorId);
    if (!o) {
      console.error("EditorJS or container not available");
      return;
    }
    const e = await this._getThirdPartyTools();
    this._editor = new Mu({
      holder: o,
      placeholder: "Type '/' to insert a block or just start typing something super...",
      data: this._getInitialData(),
      inlineToolbar: !0,
      readOnly: this.readonly,
      shadowRoot: this.shadowRoot || void 0,
      tools: {
        ...e,
        header: $u,
        image: this._createUmbracoImageTool(),
        quote: np,
        embed: {
          class: this._createEmbedWithUI(),
          config: {
            services: {
              youtube: !0,
              vimeo: !0
            }
          }
        },
        code: ir,
        raw: sr,
        list: {
          class: It,
          inlineToolbar: !0
        },
        //checklist: Checklist,
        link: this._createUmbracoLinkTool(),
        umbracoBlock: this._createUmbracoBlockTool()
      },
      onChange: () => {
        this._stopUmbracosInterferingHotKeys(), this._editor.save().then((t) => {
          this.value = JSON.stringify(t), this._dispatchChangeEvent();
        }).catch((t) => {
          console.log("Saving failed: ", t);
        });
      },
      onReady: () => {
        bi && new bi(this._editor), this._stopUmbracosInterferingHotKeys();
      }
    });
  }
  /**
   * Merges any third-party tools registered via a `skrivletTool` extension manifest into the
   * Editor.js `tools: {}` config. A tool that reuses a built-in key (or is otherwise invalid)
   * is skipped with a console warning rather than breaking the whole editor.
   */
  async _getThirdPartyTools() {
    const o = Na.getByType("skrivletTool"), e = {};
    return await Promise.all(
      o.map(async (t) => {
        const n = t.meta?.toolKey;
        if (!n) {
          console.warn(`[SkrivLet] Ignoring tool manifest "${t.alias}": meta.toolKey is required.`);
          return;
        }
        if (lg.has(n)) {
          console.warn(`[SkrivLet] Ignoring tool manifest "${t.alias}": "${n}" is a reserved built-in tool key.`);
          return;
        }
        const r = await cg(t.js);
        if (!r) {
          console.warn(`[SkrivLet] Ignoring tool manifest "${t.alias}": failed to load its tool class.`);
          return;
        }
        if (t.css) {
          const i = await ja(t.css);
          i && this._adoptThirdPartyStylesheet(i);
        }
        e[n] = { class: r, config: t.meta.config, inlineToolbar: t.meta.inlineToolbar };
      })
    ), e;
  }
  _adoptThirdPartyStylesheet(o) {
    if (!this.shadowRoot) return;
    const e = new CSSStyleSheet();
    e.replaceSync(o), this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, e];
  }
  async _openUmbracoLinkPicker(o) {
    return (await nt(this, Oa, {
      data: {
        config: {},
        index: null,
        isNew: !o?.url
      },
      value: {
        link: o ?? {}
      }
    }).catch(() => {
    }))?.link;
  }
  async _openUmbracoMediaPicker(o) {
    const e = o ? Pa(o) : void 0, n = (await nt(this, Ia, {
      data: { multiple: !1 },
      value: { selection: e ? [e] : [] }
    }).catch(() => {
    }))?.selection?.[0];
    if (!n) return;
    const r = new Ma(this), i = new La(this), [{ data: s }, { data: a }] = await Promise.all([
      r.requestItems([n]),
      i.requestItems([n])
    ]), l = a?.[0]?.url;
    if (!l) return;
    const { width: c, height: d } = await Aa(l);
    return {
      url: l,
      alt: s?.[0]?.variants?.[0]?.name ?? s?.[0]?.name ?? "",
      udi: `umb://media/${n.replace(/-/g, "")}`,
      width: c,
      height: d
    };
  }
  /** Lets the editor choose which element type (a Document Type with isElement === true) to insert. */
  async _openUmbracoElementTypePicker() {
    const e = (await nt(this, Da, {
      data: {
        filter: (r) => r.isElement
      }
    }).catch(() => {
    }))?.selection?.[0];
    if (!e) return;
    const t = new Ra(this), { data: n } = await t.requestByUnique(e);
    if (n)
      return { unique: e, alias: n.alias, name: n.name };
  }
  /** Opens the bespoke property-editing modal (skrivlet-block-edit-modal.element.ts) for a block instance. */
  async _openUmbracoBlockEditModal(o, e) {
    return nt(this, Ha, {
      data: { contentTypeKey: o, values: e }
    }).catch(() => {
    });
  }
  _createUmbracoLinkTool() {
    const o = this;
    return class {
      static get isInline() {
        return !0;
      }
      constructor({ api: t }) {
        this.api = t, this.button = null, this._state = !1, this.element = null, this.tag = "A", this.class = "cdx-link";
      }
      render() {
        return this.button = document.createElement("button"), this.button.type = "button", this.button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"></path><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"></path></svg>', this.button.classList.add(this.api.styles.inlineToolButton), this.button;
      }
      surround(t) {
        if (this.state) {
          this.unwrap(t);
          return;
        }
        this.openLinkPicker(t);
      }
      openLinkPicker(t) {
        o._openUmbracoLinkPicker().then((n) => {
          n?.url && this.wrap(t, n.url);
        });
      }
      wrap(t, n) {
        const r = t.extractContents(), i = document.createElement(this.tag);
        i.classList.add(this.class), i.setAttribute("href", n), i.appendChild(r), t.insertNode(i), this.api.selection.expandToTag(i), this.element = i;
      }
      unwrap(t) {
        const n = this.api.selection.findParentTag(this.tag, this.class), r = t.extractContents();
        n.remove(), t.insertNode(r);
      }
      checkState() {
        const t = this.api.selection.findParentTag(this.tag);
        this.state = !!t, this.button?.classList.toggle(this.api.styles.inlineToolButtonActive, this.state);
      }
      get state() {
        return this._state;
      }
      set state(t) {
        this._state = t, this.button && this.button.classList.toggle(this.api.styles.inlineToolButtonActive, t);
      }
      static get sanitize() {
        return { a: { href: !0 } };
      }
    };
  }
  _createUmbracoImageTool() {
    const o = this;
    return class {
      static get toolbox() {
        return {
          title: "Image",
          icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
      }
      constructor({ data: t, api: n, config: r }) {
        this.api = n, this.config = r || {}, this.wrapper = null, this.image = null, this.button = null, this.data = {
          url: t.url || "",
          alt: t.alt || "",
          udi: t.udi || ""
        };
      }
      render() {
        return this.wrapper = document.createElement("div"), this.wrapper.classList.add("simple-image"), this.image = document.createElement("img"), this.image.src = this.data.url, this.image.alt = this.data.alt, this.image.hidden = !this.data.url, this.image.addEventListener("click", () => {
          this._openMediaPicker();
        }), this.button = document.createElement("uui-button"), this.button.type = "button", this.button.classList.add("skriv-let__add-image-button"), this.button.addEventListener("click", () => {
          this._openMediaPicker();
        }), this._updateButton(), this.wrapper.appendChild(this.image), this.wrapper.appendChild(this.button), this.wrapper;
      }
      rendered() {
        this.data.url || this.button?.focus();
      }
      _updateButton() {
        if (!this.button) return;
        const t = !!this.data.url, n = t ? "Change image" : "Select an image";
        this.button.look = t ? "secondary" : "placeholder", this.button.label = n, this.button.innerHTML = "";
        const r = document.createElement("uui-icon");
        r.name = t ? "icon-edit" : "icon-picture", r.setAttribute("aria-hidden", "true");
        const i = document.createElement("span");
        i.textContent = n, this.button.append(r, i);
      }
      _openMediaPicker() {
        o._openUmbracoMediaPicker(this.data.udi).then((t) => {
          t && (this.data.url = t.url, this.data.alt = t.alt, this.data.udi = t.udi, this.data.width = t.width, this.data.height = t.height, this.image && (this.image.src = t.url, this.image.alt = t.alt, this.image.hidden = !1), this._updateButton());
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
      validate(t) {
        return !!(t.url?.trim() && t.udi?.trim());
      }
    };
  }
  _createUmbracoBlockTool() {
    const o = this;
    return class {
      static get toolbox() {
        return {
          title: "Umbraco Block",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
        };
      }
      constructor({ data: t }) {
        this.wrapper = null, this.preview = null, this.button = null, this.data = {
          contentTypeKey: t.contentTypeKey || "",
          contentTypeAlias: t.contentTypeAlias || "",
          udi: t.udi || "",
          values: t.values || {}
        };
      }
      render() {
        return this.wrapper = document.createElement("div"), this.wrapper.classList.add("skriv-let__umbraco-block"), this.preview = document.createElement("div"), this.preview.classList.add("skriv-let__umbraco-block-preview"), this.preview.addEventListener("click", () => this._openEditModal()), this.button = document.createElement("uui-button"), this.button.type = "button", this.button.classList.add("skriv-let__add-image-button"), this.button.addEventListener("click", () => this._openEditModal()), this._updatePreview(), this._updateButton(), this.wrapper.appendChild(this.preview), this.wrapper.appendChild(this.button), this.wrapper;
      }
      rendered() {
        this.data.contentTypeAlias || this.button?.focus();
      }
      _updatePreview() {
        if (!this.preview) return;
        const t = Object.keys(this.data.values).length;
        this.preview.hidden = !this.data.contentTypeAlias, this.preview.textContent = this.data.contentTypeAlias ? `${this.data.contentTypeAlias} (${t} propert${t === 1 ? "y" : "ies"})` : "";
      }
      _updateButton() {
        if (!this.button) return;
        const t = !!this.data.contentTypeAlias, n = t ? "Edit block" : "Insert block";
        this.button.look = t ? "secondary" : "placeholder", this.button.label = n, this.button.innerHTML = "";
        const r = document.createElement("uui-icon");
        r.name = t ? "icon-edit" : "icon-add", r.setAttribute("aria-hidden", "true");
        const i = document.createElement("span");
        i.textContent = n, this.button.append(r, i);
      }
      async _openEditModal() {
        let t = this.data.contentTypeKey, n = this.data.contentTypeAlias;
        if (!t) {
          const i = await o._openUmbracoElementTypePicker();
          if (!i) return;
          t = i.unique, n = i.alias;
        }
        const r = await o._openUmbracoBlockEditModal(t, this.data.values);
        r && (this.data.contentTypeKey = t, this.data.contentTypeAlias = r.contentTypeAlias || n, this.data.values = r.values, this.data.udi || (this.data.udi = `umb://element/${o._randomUUID().replace(/-/g, "")}`), this._updatePreview(), this._updateButton());
      }
      save() {
        return {
          contentTypeKey: this.data.contentTypeKey,
          contentTypeAlias: this.data.contentTypeAlias,
          udi: this.data.udi,
          values: this.data.values
        };
      }
      validate(t) {
        return !!(t.contentTypeKey?.trim() && t.udi?.trim());
      }
    };
  }
  _createEmbedWithUI() {
    return class extends ie {
      static get toolbox() {
        return {
          title: "Video",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube w-6 h-6 mx-1"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>'
        };
      }
      render() {
        if (!this.data.service) {
          const e = document.createElement("div"), t = document.createElement("label");
          t.innerHTML = "Enter a URL to embed a video from YouTube or Vimeo", t.classList.add("cdx-label");
          const n = document.createElement("input");
          return n.setAttribute("type", "url"), n.classList.add("cdx-input"), n.addEventListener("paste", (r) => {
            const i = r.clipboardData.getData("text"), s = Object.keys(ie.services).find((a) => ie.services[a].regex.test(i));
            s && this.onPaste({ detail: { key: s, data: i } });
          }), e.appendChild(t), e.appendChild(n), e;
        }
        return super.render();
      }
      validate(e) {
        return !!(e.service && e.source);
      }
    };
  }
  _openFullscreen() {
    const o = this.shadowRoot?.getElementById(this._editorId);
    o && (document.fullscreenElement ? document.exitFullscreen && document.exitFullscreen() : o.requestFullscreen());
  }
  _stopUmbracosInterferingHotKeys() {
    this.shadowRoot?.querySelectorAll('.cdx-block:not([disable-hotkeys="true"]),.ce-header:not([disable-hotkeys="true"]),.cdx-input:not([disable-hotkeys="true"]),.cdx-checklist__item-text:not([disable-hotkeys="true"])')?.forEach((e) => {
      e.setAttribute("disable-hotkeys", "true");
    });
  }
  _dispatchChangeEvent() {
    this.dispatchEvent(new _a());
  }
  render() {
    return xa`
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
};
xe.styles = [
  Sa,
  Ea`
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
ot([
  vi({ type: String })
], xe.prototype, "value", 2);
ot([
  vi({ type: Boolean, attribute: "readonly" })
], xe.prototype, "readonly", 2);
ot([
  yi()
], xe.prototype, "_editorId", 2);
ot([
  yi()
], xe.prototype, "_editor", 2);
xe = ot([
  Ca("skrivlet-property-editor-ui")
], xe);
const zg = xe;
export {
  xe as SkrivLetPropertyEditorUIElement,
  zg as default
};
//# sourceMappingURL=skrivlet-property-editor-ui.element-BItUXas9.js.map
