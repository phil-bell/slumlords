function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1 = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    e$2 = Symbol(),
    n$3 = new Map();

class s$3 {
  constructor(t, n) {
    if (this._$cssResult$ = !0, n !== e$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t;
  }

  get styleSheet() {
    var e = n$3.get(this.cssText);
    return t$1 && void 0 === e && (n$3.set(this.cssText, e = new CSSStyleSheet()), e.replaceSync(this.cssText)), e;
  }

  toString() {
    return this.cssText;
  }

}

var o$3 = t => new s$3("string" == typeof t ? t : t + "", e$2),
    r$2 = function r(t) {
  for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    n[_key - 1] = arguments[_key];
  }

  var o = 1 === t.length ? t[0] : n.reduce((e, n, s) => e + (t => {
    if (!0 === t._$cssResult$) return t.cssText;
    if ("number" == typeof t) return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new s$3(o, e$2);
},
    i$1 = (e, n) => {
  t$1 ? e.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(t => {
    var n = document.createElement("style"),
        s = window.litNonce;
    void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
  });
},
    S$1 = t$1 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
  var e = "";

  for (var _n of t.cssRules) {
    e += _n.cssText;
  }

  return o$3(e);
})(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

var s$2;

var e$1 = window.reactiveElementPolyfillSupport,
    r$1 = {
  toAttribute(t, i) {
    switch (i) {
      case Boolean:
        t = t ? "" : null;
        break;

      case Object:
      case Array:
        t = null == t ? t : JSON.stringify(t);
    }

    return t;
  },

  fromAttribute(t, i) {
    var s = t;

    switch (i) {
      case Boolean:
        s = null !== t;
        break;

      case Number:
        s = null === t ? null : Number(t);
        break;

      case Object:
      case Array:
        try {
          s = JSON.parse(t);
        } catch (t) {
          s = null;
        }

    }

    return s;
  }

},
    h$1 = (t, i) => i !== t && (i == i || t == t),
    o$2 = {
  attribute: !0,
  type: String,
  converter: r$1,
  reflect: !1,
  hasChanged: h$1
};

class n$2 extends HTMLElement {
  constructor() {
    super(), this._$Et = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$Ei = null, this.o();
  }

  static addInitializer(t) {
    var i;
    null !== (i = this.l) && void 0 !== i || (this.l = []), this.l.push(t);
  }

  static get observedAttributes() {
    this.finalize();
    var t = [];
    return this.elementProperties.forEach((i, s) => {
      var e = this._$Eh(s, i);

      void 0 !== e && (this._$Eu.set(e, s), t.push(e));
    }), t;
  }

  static createProperty(t) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : o$2;

    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      var _s = "symbol" == typeof t ? Symbol() : "__" + t,
          _e = this.getPropertyDescriptor(t, _s, i);

      void 0 !== _e && Object.defineProperty(this.prototype, t, _e);
    }
  }

  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },

      set(e) {
        var r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },

      configurable: !0,
      enumerable: !0
    };
  }

  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || o$2;
  }

  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    var t = Object.getPrototypeOf(this);

    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
      var _t = this.properties,
          _i = [...Object.getOwnPropertyNames(_t), ...Object.getOwnPropertySymbols(_t)];

      for (var _s2 of _i) {
        this.createProperty(_s2, _t[_s2]);
      }
    }

    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }

  static finalizeStyles(i) {
    var s = [];

    if (Array.isArray(i)) {
      var _e2 = new Set(i.flat(1 / 0).reverse());

      for (var _i2 of _e2) {
        s.unshift(S$1(_i2));
      }
    } else void 0 !== i && s.push(S$1(i));

    return s;
  }

  static _$Eh(t, i) {
    var s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }

  o() {
    var t;
    this._$Ev = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Ep(), this.requestUpdate(), null === (t = this.constructor.l) || void 0 === t || t.forEach(t => t(this));
  }

  addController(t) {
    var i, s;
    (null !== (i = this._$Em) && void 0 !== i ? i : this._$Em = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }

  removeController(t) {
    var i;
    null === (i = this._$Em) || void 0 === i || i.splice(this._$Em.indexOf(t) >>> 0, 1);
  }

  _$Ep() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
    });
  }

  createRenderRoot() {
    var t;
    var s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return i$1(s, this.constructor.elementStyles), s;
  }

  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$Em) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  enableUpdating(t) {}

  disconnectedCallback() {
    var t;
    null === (t = this._$Em) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }

  _$Eg(t, i) {
    var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : o$2;
    var e, h;

    var n = this.constructor._$Eh(t, s);

    if (void 0 !== n && !0 === s.reflect) {
      var _o = (null !== (h = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== h ? h : r$1.toAttribute)(i, s.type);

      this._$Ei = t, null == _o ? this.removeAttribute(n) : this.setAttribute(n, _o), this._$Ei = null;
    }
  }

  _$AK(t, i) {
    var s, e, h;

    var o = this.constructor,
        n = o._$Eu.get(t);

    if (void 0 !== n && this._$Ei !== n) {
      var _t2 = o.getPropertyOptions(n),
          l = _t2.converter,
          a = null !== (h = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== h ? h : r$1.fromAttribute;

      this._$Ei = n, this[n] = a(i, _t2.type), this._$Ei = null;
    }
  }

  requestUpdate(t, i, s) {
    var e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || h$1)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$Ei !== t && (void 0 === this._$ES && (this._$ES = new Map()), this._$ES.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$Ev = this._$EC());
  }

  _$EC() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.isUpdatePending = !0;

      try {
        yield _this._$Ev;
      } catch (t) {
        Promise.reject(t);
      }

      var t = _this.scheduleUpdate();

      return null != t && (yield t), !_this.isUpdatePending;
    })();
  }

  scheduleUpdate() {
    return this.performUpdate();
  }

  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t, i) => this[i] = t), this._$Et = void 0);
    var i = !1;
    var s = this._$AL;

    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$Em) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$EU();
    } catch (t) {
      throw i = !1, this._$EU(), t;
    }

    i && this._$AE(s);
  }

  willUpdate(t) {}

  _$AE(t) {
    var i;
    null === (i = this._$Em) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }

  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }

  get updateComplete() {
    return this.getUpdateComplete();
  }

  getUpdateComplete() {
    return this._$Ev;
  }

  shouldUpdate(t) {
    return !0;
  }

  update(t) {
    void 0 !== this._$ES && (this._$ES.forEach((t, i) => this._$Eg(i, this[i], t)), this._$ES = void 0), this._$EU();
  }

  updated(t) {}

  firstUpdated(t) {}

}

n$2.finalized = !0, n$2.elementProperties = new Map(), n$2.elementStyles = [], n$2.shadowRootOptions = {
  mode: "open"
}, null == e$1 || e$1({
  ReactiveElement: n$2
}), (null !== (s$2 = globalThis.reactiveElementVersions) && void 0 !== s$2 ? s$2 : globalThis.reactiveElementVersions = []).push("1.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;

var i = globalThis.trustedTypes,
    s$1 = i ? i.createPolicy("lit-html", {
  createHTML: t => t
}) : void 0,
    e = "lit$".concat((Math.random() + "").slice(9), "$"),
    o$1 = "?" + e,
    n$1 = "<".concat(o$1, ">"),
    l$1 = document,
    h = function h() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return l$1.createComment(t);
},
    r = t => null === t || "object" != typeof t && "function" != typeof t,
    d = Array.isArray,
    u = t => {
  var i;
  return d(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
},
    c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    v = /-->/g,
    a = />/g,
    f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
    _ = /'/g,
    m = /"/g,
    g = /^(?:script|style|textarea)$/i,
    $ = t => function (i) {
  for (var _len = arguments.length, s = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    s[_key - 1] = arguments[_key];
  }

  return {
    _$litType$: t,
    strings: i,
    values: s
  };
},
    p = $(1),
    b = Symbol.for("lit-noChange"),
    T = Symbol.for("lit-nothing"),
    x = new WeakMap(),
    w = (t, i, s) => {
  var e, o;
  var n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  var l = n._$litPart$;

  if (void 0 === l) {
    var _t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;

    n._$litPart$ = l = new N(i.insertBefore(h(), _t), _t, void 0, null != s ? s : {});
  }

  return l._$AI(t), l;
},
    A = l$1.createTreeWalker(l$1, 129, null, !1),
    C = (t, i) => {
  var o = t.length - 1,
      l = [];
  var h,
      r = 2 === i ? "<svg>" : "",
      d = c;

  for (var _i = 0; _i < o; _i++) {
    var _s = t[_i];

    var _o = void 0,
        _u = void 0,
        _$ = -1,
        _p = 0;

    for (; _p < _s.length && (d.lastIndex = _p, _u = d.exec(_s), null !== _u);) {
      _p = d.lastIndex, d === c ? "!--" === _u[1] ? d = v : void 0 !== _u[1] ? d = a : void 0 !== _u[2] ? (g.test(_u[2]) && (h = RegExp("</" + _u[2], "g")), d = f) : void 0 !== _u[3] && (d = f) : d === f ? ">" === _u[0] ? (d = null != h ? h : c, _$ = -1) : void 0 === _u[1] ? _$ = -2 : (_$ = d.lastIndex - _u[2].length, _o = _u[1], d = void 0 === _u[3] ? f : '"' === _u[3] ? m : _) : d === m || d === _ ? d = f : d === v || d === a ? d = c : (d = f, h = void 0);
    }

    var _y = d === f && t[_i + 1].startsWith("/>") ? " " : "";

    r += d === c ? _s + n$1 : _$ >= 0 ? (l.push(_o), _s.slice(0, _$) + "$lit$" + _s.slice(_$) + e + _y) : _s + e + (-2 === _$ ? (l.push(void 0), _i) : _y);
  }

  var u = r + (t[o] || "<?>") + (2 === i ? "</svg>" : "");
  return [void 0 !== s$1 ? s$1.createHTML(u) : u, l];
};

class P {
  constructor(_ref, n) {
    var {
      strings: t,
      _$litType$: s
    } = _ref;
    var l;
    this.parts = [];
    var r = 0,
        d = 0;
    var u = t.length - 1,
        c = this.parts,
        [v, a] = C(t, s);

    if (this.el = P.createElement(v, n), A.currentNode = this.el.content, 2 === s) {
      var _t2 = this.el.content,
          _i2 = _t2.firstChild;
      _i2.remove(), _t2.append(..._i2.childNodes);
    }

    for (; null !== (l = A.nextNode()) && c.length < u;) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          var _t3 = [];

          for (var _i3 of l.getAttributeNames()) {
            if (_i3.endsWith("$lit$") || _i3.startsWith(e)) {
              var _s2 = a[d++];

              if (_t3.push(_i3), void 0 !== _s2) {
                var _t4 = l.getAttribute(_s2.toLowerCase() + "$lit$").split(e),
                    _i4 = /([.?@])?(.*)/.exec(_s2);

                c.push({
                  type: 1,
                  index: r,
                  name: _i4[2],
                  strings: _t4,
                  ctor: "." === _i4[1] ? M : "?" === _i4[1] ? k : "@" === _i4[1] ? H : S
                });
              } else c.push({
                type: 6,
                index: r
              });
            }
          }

          for (var _i5 of _t3) {
            l.removeAttribute(_i5);
          }
        }

        if (g.test(l.tagName)) {
          var _t5 = l.textContent.split(e),
              _s3 = _t5.length - 1;

          if (_s3 > 0) {
            l.textContent = i ? i.emptyScript : "";

            for (var _i6 = 0; _i6 < _s3; _i6++) {
              l.append(_t5[_i6], h()), A.nextNode(), c.push({
                type: 2,
                index: ++r
              });
            }

            l.append(_t5[_s3], h());
          }
        }
      } else if (8 === l.nodeType) if (l.data === o$1) c.push({
        type: 2,
        index: r
      });else {
        var _t6 = -1;

        for (; -1 !== (_t6 = l.data.indexOf(e, _t6 + 1));) {
          c.push({
            type: 7,
            index: r
          }), _t6 += e.length - 1;
        }
      }

      r++;
    }
  }

  static createElement(t, i) {
    var s = l$1.createElement("template");
    return s.innerHTML = t, s;
  }

}

function V(t, i) {
  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : t;
  var e = arguments.length > 3 ? arguments[3] : undefined;
  var o, n, l, h;
  if (i === b) return i;
  var d = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
  var u = r(i) ? void 0 : i._$litDirective$;
  return (null == d ? void 0 : d.constructor) !== u && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1), void 0 === u ? d = void 0 : (d = new u(t), d._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = d : s._$Cu = d), void 0 !== d && (i = V(t, d._$AS(t, i.values), d, e)), i;
}

class E {
  constructor(t, i) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }

  get parentNode() {
    return this._$AM.parentNode;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  p(t) {
    var i;
    var {
      el: {
        content: s
      },
      parts: e
    } = this._$AD,
        o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : l$1).importNode(s, !0);
    A.currentNode = o;
    var n = A.nextNode(),
        h = 0,
        r = 0,
        d = e[0];

    for (; void 0 !== d;) {
      if (h === d.index) {
        var _i7 = void 0;

        2 === d.type ? _i7 = new N(n, n.nextSibling, this, t) : 1 === d.type ? _i7 = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (_i7 = new I(n, this, t)), this.v.push(_i7), d = e[++r];
      }

      h !== (null == d ? void 0 : d.index) && (n = A.nextNode(), h++);
    }

    return o;
  }

  m(t) {
    var i = 0;

    for (var _s4 of this.v) {
      void 0 !== _s4 && (void 0 !== _s4.strings ? (_s4._$AI(t, _s4, i), i += _s4.strings.length - 2) : _s4._$AI(t[i])), i++;
    }
  }

}

class N {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cg = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }

  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cg;
  }

  get parentNode() {
    var t = this._$AA.parentNode;
    var i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }

  get startNode() {
    return this._$AA;
  }

  get endNode() {
    return this._$AB;
  }

  _$AI(t) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
    t = V(this, t, i), r(t) ? t === T || null == t || "" === t ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== b && this.$(t) : void 0 !== t._$litType$ ? this.T(t) : void 0 !== t.nodeType ? this.S(t) : u(t) ? this.M(t) : this.$(t);
  }

  A(t) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._$AB;
    return this._$AA.parentNode.insertBefore(t, i);
  }

  S(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.A(t));
  }

  $(t) {
    this._$AH !== T && r(this._$AH) ? this._$AA.nextSibling.data = t : this.S(l$1.createTextNode(t)), this._$AH = t;
  }

  T(t) {
    var i;
    var {
      values: s,
      _$litType$: e
    } = t,
        o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = P.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);else {
      var _t7 = new E(o, this),
          _i8 = _t7.p(this.options);

      _t7.m(s), this.S(_i8), this._$AH = _t7;
    }
  }

  _$AC(t) {
    var i = x.get(t.strings);
    return void 0 === i && x.set(t.strings, i = new P(t)), i;
  }

  M(t) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    var i = this._$AH;
    var s,
        e = 0;

    for (var _o2 of t) {
      e === i.length ? i.push(s = new N(this.A(h()), this.A(h()), this, this.options)) : s = i[e], s._$AI(_o2), e++;
    }

    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }

  _$AR() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._$AA.nextSibling;
    var i = arguments.length > 1 ? arguments[1] : undefined;
    var s;

    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      var _i9 = t.nextSibling;
      t.remove(), t = _i9;
    }
  }

  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$Cg = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }

}

class S {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T;
  }

  get tagName() {
    return this.element.tagName;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
    var s = arguments.length > 2 ? arguments[2] : undefined;
    var e = arguments.length > 3 ? arguments[3] : undefined;
    var o = this.strings;
    var n = !1;
    if (void 0 === o) t = V(this, t, i, 0), n = !r(t) || t !== this._$AH && t !== b, n && (this._$AH = t);else {
      var _e = t;

      var _l, _h;

      for (t = o[0], _l = 0; _l < o.length - 1; _l++) {
        _h = V(this, _e[s + _l], i, _l), _h === b && (_h = this._$AH[_l]), n || (n = !r(_h) || _h !== this._$AH[_l]), _h === T ? t = T : t !== T && (t += (null != _h ? _h : "") + o[_l + 1]), this._$AH[_l] = _h;
      }
    }
    n && !e && this.k(t);
  }

  k(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }

}

class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }

  k(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }

}

class k extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }

  k(t) {
    t && t !== T ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }

}

class H extends S {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }

  _$AI(t) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
    var s;
    if ((t = null !== (s = V(this, t, i, 0)) && void 0 !== s ? s : T) === b) return;
    var e = this._$AH,
        o = t === T && e !== T || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
        n = t !== T && (e === T || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }

  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }

}

class I {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t) {
    V(this, t);
  }

}

var R = window.litHtmlPolyfillSupport;
null == R || R(P, N), (null !== (t = globalThis.litHtmlVersions) && void 0 !== t ? t : globalThis.litHtmlVersions = []).push("2.0.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

var l, o;

class s extends n$2 {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Dt = void 0;
  }

  createRenderRoot() {
    var t, e;
    var i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }

  update(t) {
    var i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = w(i, this.renderRoot, this.renderOptions);
  }

  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }

  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }

  render() {
    return b;
  }

}

s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
  LitElement: s
});
var n = globalThis.litElementPolyfillSupport;
null == n || n({
  LitElement: s
});
(null !== (o = globalThis.litElementVersions) && void 0 !== o ? o : globalThis.litElementVersions = []).push("3.0.1");

var _templateObject$5, _templateObject2$2;
class SlumNav extends s {
  render() {
    return p(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteral(["<div class=\"slum-nav\"><slot></slot></div>"])));
  }

}

_defineProperty(SlumNav, "styles", r$2(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral(["\n    :host .slum-nav {\n      display: flex;\n      flex-direction: row;\n    }\n  "]))));

customElements.define("slum-nav", SlumNav);

var appliedClassMixins = new WeakMap();
/** Vefify if the Mixin was previously applyed
 * @private
 * @param {function} mixin      Mixin being applyed
 * @param {object} superClass   Class receiving the new mixin
 * @returns {boolean}
 */

function wasMixinPreviouslyApplied(mixin, superClass) {
  var klass = superClass;

  while (klass) {
    if (appliedClassMixins.get(klass) === mixin) {
      return true;
    }

    klass = Object.getPrototypeOf(klass);
  }

  return false;
}
/** Apply each mixin in the chain to make sure they are not applied more than once to the final class.
 * @export
 * @param {function} mixin      Mixin to be applyed
 * @returns {object}            Mixed class with mixin applied
 */


function dedupeMixin(mixin) {
  return superClass => {
    if (wasMixinPreviouslyApplied(mixin, superClass)) {
      return superClass;
    }

    var mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}

/**
 * @typedef {import('../types/DisabledMixinTypes').DisabledMixin} DisabledMixin
 */

/**
 * @type {DisabledMixin}
 * @param {import('@open-wc/dedupe-mixin').Constructor<import('../index').LitElement>} superclass
 */

var DisabledMixinImplementation = superclass => // eslint-disable-next-line no-shadow
class extends superclass {
  static get properties() {
    return {
      disabled: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    /** @protected */

    this._requestedToBeDisabled = false;
    /** @private */

    this.__isUserSettingDisabled = true;
    /** @private */

    this.__restoreDisabledTo = false;
    this.disabled = false;
  }

  makeRequestToBeDisabled() {
    if (this._requestedToBeDisabled === false) {
      this._requestedToBeDisabled = true;
      this.__restoreDisabledTo = this.disabled;

      this.__internalSetDisabled(true);
    }
  }

  retractRequestToBeDisabled() {
    if (this._requestedToBeDisabled === true) {
      this._requestedToBeDisabled = false;

      this.__internalSetDisabled(this.__restoreDisabledTo);
    }
  }
  /**
   * @param {boolean} value
   * @private
   */


  __internalSetDisabled(value) {
    this.__isUserSettingDisabled = false;
    this.disabled = value;
    this.__isUserSettingDisabled = true;
  }
  /**
   * @param {PropertyKey} name
   * @param {?} oldValue
   */


  requestUpdate(name, oldValue) {
    super.requestUpdate(name, oldValue);

    if (name === 'disabled') {
      if (this.__isUserSettingDisabled) {
        this.__restoreDisabledTo = this.disabled;
      }

      if (this.disabled === false && this._requestedToBeDisabled === true) {
        this.__internalSetDisabled(true);
      }
    }
  }

};

var DisabledMixin = dedupeMixin(DisabledMixinImplementation);

/**
 * @typedef {import('../types/DisabledWithTabIndexMixinTypes').DisabledWithTabIndexMixin} DisabledWithTabIndexMixin
 */

/**
 * @type {DisabledWithTabIndexMixin}
 * @param {import('@open-wc/dedupe-mixin').Constructor<import('../index').LitElement>} superclass
 */

var DisabledWithTabIndexMixinImplementation = superclass => // eslint-disable-next-line no-shadow
class extends DisabledMixin(superclass) {
  static get properties() {
    return {
      // we use a property here as if we use the native tabIndex we can not set a default value
      // in the constructor as it synchronously sets the attribute which is not allowed in the
      // constructor phase
      tabIndex: {
        type: Number,
        reflect: true,
        attribute: 'tabindex'
      }
    };
  }

  constructor() {
    super();
    /** @private */

    this.__isUserSettingTabIndex = true;
    /** @private */

    this.__restoreTabIndexTo = 0;

    this.__internalSetTabIndex(0);
  }

  makeRequestToBeDisabled() {
    super.makeRequestToBeDisabled();

    if (this._requestedToBeDisabled === false && this.tabIndex != null) {
      this.__restoreTabIndexTo = this.tabIndex;
    }
  }

  retractRequestToBeDisabled() {
    super.retractRequestToBeDisabled();

    if (this._requestedToBeDisabled === true) {
      this.__internalSetTabIndex(this.__restoreTabIndexTo);
    }
  }
  /**
   * @param {number} value
   * @private
   */


  __internalSetTabIndex(value) {
    this.__isUserSettingTabIndex = false;
    this.tabIndex = value;
    this.__isUserSettingTabIndex = true;
  }
  /**
   * @param {PropertyKey} name
   * @param {?} oldValue
   */


  requestUpdate(name, oldValue) {
    super.requestUpdate(name, oldValue);

    if (name === 'disabled') {
      if (this.disabled) {
        this.__internalSetTabIndex(-1);
      } else {
        this.__internalSetTabIndex(this.__restoreTabIndexTo);
      }
    }

    if (name === 'tabIndex') {
      if (this.__isUserSettingTabIndex && this.tabIndex != null) {
        this.__restoreTabIndexTo = this.tabIndex;
      }

      if (this.tabIndex !== -1 && this._requestedToBeDisabled === true) {
        this.__internalSetTabIndex(-1);
      }
    }
  }
  /** @param {import('lit-element').PropertyValues } changedProperties */


  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties); // for ShadyDom the timing is a little different and we need to make sure
    // the tabindex gets correctly updated here

    if (this.disabled) {
      this.__internalSetTabIndex(-1);
    }
  }

};

var DisabledWithTabIndexMixin = dedupeMixin(DisabledWithTabIndexMixinImplementation);

/**
 * From https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
 * @param {string} [flavor]
 */
function checkChrome() {
  var flavor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'google-chrome';
  var isChromium =
  /** @type {window & { chrome?: boolean}} */
  window.chrome;

  if (flavor === 'chromium') {
    return isChromium;
  }

  var winNav = window.navigator;
  var vendorName = winNav.vendor;
  var isOpera = typeof
  /** @type {window & { opr?: boolean}} */
  window.opr !== 'undefined';
  var isIEedge = winNav.userAgent.indexOf('Edge') > -1;
  var isIOSChrome = winNav.userAgent.match('CriOS');

  if (flavor === 'ios') {
    return isIOSChrome;
  }

  if (flavor === 'google-chrome') {
    return isChromium !== null && typeof isChromium !== 'undefined' && vendorName === 'Google Inc.' && isOpera === false && isIEedge === false;
  }

  return undefined;
}

var browserDetection = {
  isIE11: /Trident/.test(window.navigator.userAgent),
  isChrome: checkChrome(),
  isIOSChrome: checkChrome('ios'),
  isChromium: checkChrome('chromium'),
  isMac: navigator.appVersion.indexOf('Mac') !== -1
};

var _templateObject$4, _templateObject2$1;

var isKeyboardClickEvent = (
/** @type {KeyboardEvent} */
e) => e.key === ' ' || e.key === 'Enter';

var isSpaceKeyboardClickEvent = (
/** @type {KeyboardEvent} */
e) => e.key === ' ';
/**
 * @typedef {import('@lion/core').TemplateResult} TemplateResult
 */

/**
 * Use LionButton (or LionButtonReset|LionButtonSubmit) when there is a need to extend HTMLButtonElement.
 * It allows to create complex shadow DOM for buttons needing this. Think of:
 * - a material Design button that needs a JS controlled ripple
 * - a LionSelectRich invoker that needs a complex shadow DOM structure
 * (for styling/maintainability purposes)
 * - a specialized button (for instance a primary button or icon button in a Design System) that
 * needs a simple api: `<my-button>text</my-button>` is always better than
 * `<button class="my-button"><div class="my-button__container">text</div><button>`
 *
 * In other cases, whenever you can, still use native HTMLButtonElement (`<button>`).
 *
 * Note that LionButton is meant for buttons with type="button". It's cleaner and more
 * lightweight than LionButtonReset and LionButtonSubmit, which should only be considered when native
 * `<form>` support is needed:
 * - When type="reset|submit" should be supported, use LionButtonReset.
 * - When implicit form submission should be supported on top, use LionButtonSubmit.
 */


class LionButton extends DisabledWithTabIndexMixin(s) {
  static get properties() {
    return {
      active: {
        type: Boolean,
        reflect: true
      },
      type: {
        type: String,
        reflect: true
      }
    };
  }

  render() {
    return p(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteral([" <div class=\"button-content\" id=\"", "\"><slot></slot></div> "])), this._buttonId);
  }

  static get styles() {
    return [r$2(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n        :host {\n          position: relative;\n          display: inline-flex;\n          box-sizing: border-box;\n          vertical-align: middle;\n          line-height: 24px;\n          background: #eee; /* minimal styling to make it recognizable as btn */\n          padding: 8px; /* padding to fix with min-height */\n          outline: none; /* focus style handled below */\n          cursor: default; /* we should always see the default arrow, never a caret */\n          /* TODO: remove, native button also allows selection. Could be usability concern... */\n          user-select: none;\n          -webkit-user-select: none;\n          -moz-user-select: none;\n          -ms-user-select: none;\n        }\n\n        :host::before {\n          content: '';\n\n          /* center vertically and horizontally */\n          position: absolute;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n\n          /* touch area (comes into play when button height goes below this one) */\n          /* src = https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/ */\n          min-height: 40px;\n          min-width: 40px;\n          width: 100%;\n          height: 100%;\n        }\n\n        .button-content {\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n\n        /* Show focus styles on keyboard focus. */\n        :host(:focus:not([disabled])),\n        :host(:focus-visible) {\n          /* if you extend, please overwrite */\n          outline: 2px solid #bde4ff;\n        }\n\n        /* Hide focus styles if they're not needed, for example,\n        when an element receives focus via the mouse. */\n        :host(:focus:not(:focus-visible)) {\n          outline: 0;\n        }\n\n        :host(:hover) {\n          /* if you extend, please overwrite */\n          background: #f4f6f7;\n        }\n\n        :host(:active), /* keep native :active to render quickly where possible */\n        :host([active]) /* use custom [active] to fix IE11 */ {\n          /* if you extend, please overwrite */\n          background: gray;\n        }\n\n        :host([hidden]) {\n          display: none;\n        }\n\n        :host([disabled]) {\n          pointer-events: none;\n          /* if you extend, please overwrite */\n          background: lightgray;\n          color: #adadad;\n          fill: #adadad;\n        }\n      "])))];
  }

  constructor() {
    super();
    this.type = 'button';
    this.active = false;
    this._buttonId = "button-".concat(Math.random().toString(36).substr(2, 10));

    if (browserDetection.isIE11) {
      this.updateComplete.then(() => {
        if (!this.hasAttribute('aria-labelledby')) {
          this.setAttribute('aria-labelledby', this._buttonId);
        }
      });
    }

    this.__setupEvents();
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
  }
  /**
   * @param {import('@lion/core').PropertyValues } changedProperties
   */


  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', "".concat(this.disabled)); // create mixin if we need it in more places
    }
  }
  /**
   * @private
   */


  __setupEvents() {
    this.addEventListener('mousedown', this.__mousedownHandler);
    this.addEventListener('keydown', this.__keydownHandler);
    this.addEventListener('keyup', this.__keyupHandler);
  }
  /**
   * @private
   */


  __mousedownHandler() {
    this.active = true;

    var mouseupHandler = () => {
      this.active = false;
      document.removeEventListener('mouseup', mouseupHandler);
      this.removeEventListener('mouseup', mouseupHandler);
    };

    document.addEventListener('mouseup', mouseupHandler);
    this.addEventListener('mouseup', mouseupHandler);
  }
  /**
   * @param {KeyboardEvent} event
   * @private
   */


  __keydownHandler(event) {
    if (this.active || !isKeyboardClickEvent(event)) {
      if (isSpaceKeyboardClickEvent(event)) {
        event.preventDefault();
      }

      return;
    }

    if (isSpaceKeyboardClickEvent(event)) {
      event.preventDefault();
    }

    this.active = true;
    /**
     * @param {KeyboardEvent} keyupEvent
     */

    var keyupHandler = keyupEvent => {
      if (isKeyboardClickEvent(keyupEvent)) {
        this.active = false;
        document.removeEventListener('keyup', keyupHandler, true);
      }
    };

    document.addEventListener('keyup', keyupHandler, true);
  }
  /**
   * @param {KeyboardEvent} event
   * @private
   */


  __keyupHandler(event) {
    if (isKeyboardClickEvent(event)) {
      // Fixes IE11 double submit/click. Enter keypress somehow triggers the __keyUpHandler on the native <button>
      if (event.target && event.target !== this) {
        return;
      } // dispatch click


      this.click();
    }
  }

}

var _templateObject$3;
var coreStyles = r$2(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n  @import url(\"https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap\");\n  :host {\n    --slum-cyan: #7be4d5;\n    --slum-cyan-dark: #70cec0;\n    --slum-pink: #ff487a;\n    --slum-pink-dark: #fc3068;\n    --slum-purple: #8719b3;\n    --slum-grey: #383838;\n    --slum-grey-light: #c2c2c2;\n    --slum-grey-lightest: #f3f3f3;\n    --slum-white: white;\n    --slum-rainbow: linear-gradient(\n      90deg,\n      #f79533 0%,\n      #f37055 15%,\n      #ef4e7b 30%,\n      #a166ab 44%,\n      #5073b8 58%,\n      #1098ad 72%,\n      #07b39b 86%,\n      #6dba82 100%\n    );\n    --font-size-xl: 26px;\n    --font-size-l: 22px;\n    --font-size: 20px;\n    --font-size-s: 16px;\n    --font-size-xs: 12px;\n\n    --font-family: \"Inconsolata\", monospace;\n    font-family: var(--font-family);\n  }\n"])));

var _templateObject$2;
class SlumButton extends LionButton {
  static get styles() {
    return [super.styles, coreStyles, r$2(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n        :host {\n          --background-color: var(--slum-white);\n          --border-color: var(--slum-cyan-dark);\n          --font-color: var(--slum-cyan-dark);\n          --hover-shadow-color: var(--slum-pink);\n          --active-background-color: var(--slum-grey-lightest);\n          --hover-font-color: var(--font-color);\n          --hover-background-color: var(--background-color);\n\n          font-family: var(--font-family);\n          color: var(--font-color);\n          background: var(--background-color);\n          border-radius: 5px;\n          border: 2px solid var(--border-color);\n        }\n        :host(:hover) {\n          box-shadow: 5px 5px 0 var(--hover-shadow-color);\n          color: var(--hover-font-color);\n          background: var(--hover-background-color);\n        }\n        :host(:active) {\n          background: var(--active-background-color);\n        }\n        :host([active]) {\n          background: var(--active-background-color);\n        }\n\n        :host([variant=\"cyan-solid\"]) {\n          --background-color: var(--slum-cyan);\n          --border-color: var(--slum-cyan-dark);\n          --font-color: var(--slum-white);\n          --hover-shadow-color: var(--slum-pink);\n          --active-background-color: var(--slum-cyan-dark);\n        }\n        :host([variant=\"cyan-outlined\"]) {\n          --background-color: var(--slum-white);\n          --border-color: var(--slum-cyan-dark);\n          --font-color: var(--slum-cyan-dark);\n          --hover-shadow-color: var(--slum-pink);\n          --active-background-color: var(--slum-grey-lightest);\n        }\n        :host([variant=\"cyan-transparent\"]) {\n          --background-color: var(--slum-cyan-dark);\n          --border-color: transparent;\n          --font-color: var(--slum-cyan-dark);\n          --hover-shadow-color: transparent;\n          --hover-background-color: var(--slum-rainbow);\n          --active-background-color: var(--slum-purple);\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n        }\n        :host([variant=\"pink-solid\"]) {\n          --background-color: var(--slum-pink);\n          --border-color: var(--slum-pink);\n          --font-color: var(--slum-white);\n          --hover-shadow-color: var(--slum-purple);\n          --active-background-color: var(--slum-pink-dark);\n        }\n        :host([variant=\"pink-outlined\"]) {\n          --background-color: var(--white);\n          --border-color: var(--slum-pink);\n          --font-color: var(--slum-pink);\n          --hover-shadow-color: var(--slum-purple);\n          --active-background-color: var(--slum-grey-lightest);\n        }\n        :host([variant=\"pink-transparent\"]) {\n          --background-color: var(--slum-pink);\n          --border-color: transparent;\n          --font-color: var(--slum-pink);\n          --hover-shadow-color: transparent;\n          --hover-background-color: var(--slum-rainbow);\n          --active-background-color: var(--slum-purple);\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n        }\n        :host([variant=\"purple-transparent\"]) {\n          --background-color: var(--slum-purple);\n          --border-color: transparent;\n          --font-color: var(--slum-purple);\n          --hover-shadow-color: transparent;\n          --hover-background-color: var(--slum-rainbow);\n          --active-background-color: var(--slum-pink);\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n        }\n        :host([size=\"small\"]) {\n          font-size: var(--font-size-xs);\n          padding: 4px;\n        }\n        :host([size=\"medium\"]) {\n          font-size: var(--font-size-s);\n          padding: 8px;\n        }\n        :host([size=\"large\"]) {\n          font-size: var(--font-size-xl);\n          padding: 16px;\n        }\n      "])))];
  }

  static get properties() {
    return {
      variant: {
        type: String,
        reflect: true
      }
    };
  }

}
customElements.define("slum-button", SlumButton);

var _templateObject$1, _templateObject2, _templateObject3;
class SlumLoginButton extends s {
  static get styles() {
    return [coreStyles, r$2(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n        :host .logout__text--username {\n          font-family: var(--font-family);\n          color: var(--slum-purple);\n        }\n      "])))];
  }

  static get properties() {
    return {
      login: {
        type: Object,
        attribute: "login"
      },
      logoutLink: {
        type: String,
        attribute: "logout-link"
      },
      loginLink: {
        type: String,
        attribute: "login-link"
      },
      createLink: {
        type: String,
        attribute: "create-link"
      }
    };
  }

  get logoutTemplate() {
    return p(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      <strong class=\"logout__text--username\">", "</strong>\n      <slum-button variant=\"pink-transparent\" link=\"", "\"\n        >logout</slum-button\n      >\n    "])), this.login.username, this.logoutLink);
  }

  get loginTemplate() {
    return p(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n      <slum-button variant=\"pink-transparent\" link=\"", "\"\n        >login</slum-button\n      >\n      <slum-button variant=\"pink-transparent\" link=\"", "\"\n        >create</slum-button\n      >\n    "])), this.loginLink, this.createLink);
  }

  render() {
    if (this.login) {
      return this.logoutTemplate;
    }

    return this.loginTemplate;
  }

}
customElements.define("slum-login-button", SlumLoginButton);

var _templateObject;
class SlumNavItem extends SlumButton {
  static get styles() {
    return [super.styles, r$2(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        :host([end]) {\n          margin-left: auto;\n        }\n      "])))];
  }

  firstUpdated() {
    this.variant = "pink-transparent";
    this.size = "small";
  }

}
customElements.define("slum-nav-item", SlumNavItem);
//# sourceMappingURL=bundle.js.map
