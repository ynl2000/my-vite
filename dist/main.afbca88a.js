import { resolveComponent as Et, openBlock as _t, createBlock as wt, shallowRef as bt, unref as Y, computed as D, reactive as We, nextTick as Rt, defineComponent as Qe, inject as Z, h as Fe, provide as fe, ref as Pt, watch as Ye, getCurrentInstance as Je, watchEffect as kt, createApp as Nt } from "vue";
const Ot = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, St = {};
function Ct(e, t) {
  const n = Et("router-view");
  return _t(), wt(n);
}
const At = /* @__PURE__ */ Ot(St, [["render", Ct]]);
function $t() {
  return Xe().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Xe() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const xt = typeof Proxy == "function", It = "devtools-plugin:setup", Dt = "plugin:settings:set";
let H, me;
function Vt() {
  var e;
  return H !== void 0 || (typeof window < "u" && window.performance ? (H = !0, me = window.performance) : typeof global < "u" && ((e = global.perf_hooks) === null || e === void 0 ? void 0 : e.performance) ? (H = !0, me = global.perf_hooks.performance) : H = !1), H;
}
function Tt() {
  return Vt() ? me.now() : Date.now();
}
class jt {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const f in t.settings) {
        const h = t.settings[f];
        o[f] = h.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let c = Object.assign({}, o);
    try {
      const f = localStorage.getItem(r), h = JSON.parse(f);
      Object.assign(c, h);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return c;
      },
      setSettings(f) {
        try {
          localStorage.setItem(r, JSON.stringify(f));
        } catch {
        }
        c = f;
      },
      now() {
        return Tt();
      }
    }, n && n.on(Dt, (f, h) => {
      f === this.plugin.id && this.fallbacks.setSettings(h);
    }), this.proxiedOn = new Proxy({}, {
      get: (f, h) => this.target ? this.target.on[h] : (...l) => {
        this.onQueue.push({
          method: h,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (f, h) => this.target ? this.target[h] : h === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(h) ? (...l) => (this.targetQueue.push({
        method: h,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[h](...l)) : (...l) => new Promise((d) => {
        this.targetQueue.push({
          method: h,
          args: l,
          resolve: d
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Mt(e, t) {
  const n = e, o = Xe(), r = $t(), c = xt && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !c))
    r.emit(It, e, t);
  else {
    const f = c ? new jt(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: f
    }), f && t(f.proxiedTarget);
  }
}
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const j = typeof window < "u";
function Lt(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const k = Object.assign;
function de(e, t) {
  const n = {};
  for (const o in t) {
    const r = t[o];
    n[o] = I(r) ? r.map(e) : e(r);
  }
  return n;
}
const J = () => {
}, I = Array.isArray;
function R(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Ut = /\/$/, Bt = (e) => e.replace(Ut, "");
function he(e, t, n = "/") {
  let o, r = {}, c = "", f = "";
  const h = t.indexOf("#");
  let l = t.indexOf("?");
  return h < l && h >= 0 && (l = -1), l > -1 && (o = t.slice(0, l), c = t.slice(l + 1, h > -1 ? h : t.length), r = e(c)), h > -1 && (o = o || t.slice(0, h), f = t.slice(h, t.length)), o = Kt(o != null ? o : t, n), {
    fullPath: o + (c && "?") + c + f,
    path: o,
    query: r,
    hash: f
  };
}
function Gt(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Ae(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function $e(e, t, n) {
  const o = t.matched.length - 1, r = n.matched.length - 1;
  return o > -1 && o === r && U(t.matched[o], n.matched[r]) && Ze(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function U(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ze(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Ht(e[n], t[n]))
      return !1;
  return !0;
}
function Ht(e, t) {
  return I(e) ? xe(e, t) : I(t) ? xe(t, e) : e === t;
}
function xe(e, t) {
  return I(t) ? e.length === t.length && e.every((n, o) => n === t[o]) : e.length === 1 && e[0] === t;
}
function Kt(e, t) {
  if (e.startsWith("/"))
    return e;
  if (process.env.NODE_ENV !== "production" && !t.startsWith("/"))
    return R(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), o = e.split("/");
  let r = n.length - 1, c, f;
  for (c = 0; c < o.length; c++)
    if (f = o[c], f !== ".")
      if (f === "..")
        r > 1 && r--;
      else
        break;
  return n.slice(0, r).join("/") + "/" + o.slice(c - (c === o.length ? 1 : 0)).join("/");
}
var ee;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ee || (ee = {}));
var X;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(X || (X = {}));
function qt(e) {
  if (!e)
    if (j) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Bt(e);
}
const zt = /^[^#]+#/;
function Wt(e, t) {
  return e.replace(zt, "#") + t;
}
function Qt(e, t) {
  const n = document.documentElement.getBoundingClientRect(), o = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: o.left - n.left - (t.left || 0),
    top: o.top - n.top - (t.top || 0)
  };
}
const re = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function Ft(e) {
  let t;
  if ("el" in e) {
    const n = e.el, o = typeof n == "string" && n.startsWith("#");
    if (process.env.NODE_ENV !== "production" && typeof e.el == "string" && (!o || !document.getElementById(e.el.slice(1))))
      try {
        const c = document.querySelector(e.el);
        if (o && c) {
          R(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        R(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const r = typeof n == "string" ? o ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r) {
      process.env.NODE_ENV !== "production" && R(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = Qt(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function Ie(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ge = /* @__PURE__ */ new Map();
function Yt(e, t) {
  ge.set(e, t);
}
function Jt(e) {
  const t = ge.get(e);
  return ge.delete(e), t;
}
let Xt = () => location.protocol + "//" + location.host;
function et(e, t) {
  const { pathname: n, search: o, hash: r } = t, c = e.indexOf("#");
  if (c > -1) {
    let h = r.includes(e.slice(c)) ? e.slice(c).length : 1, l = r.slice(h);
    return l[0] !== "/" && (l = "/" + l), Ae(l, "");
  }
  return Ae(n, e) + o + r;
}
function Zt(e, t, n, o) {
  let r = [], c = [], f = null;
  const h = ({ state: u }) => {
    const p = et(e, location), y = n.value, C = t.value;
    let N = 0;
    if (u) {
      if (n.value = p, t.value = u, f && f === y) {
        f = null;
        return;
      }
      N = C ? u.position - C.position : 0;
    } else
      o(p);
    r.forEach((E) => {
      E(n.value, y, {
        delta: N,
        type: ee.pop,
        direction: N ? N > 0 ? X.forward : X.back : X.unknown
      });
    });
  };
  function l() {
    f = n.value;
  }
  function d(u) {
    r.push(u);
    const p = () => {
      const y = r.indexOf(u);
      y > -1 && r.splice(y, 1);
    };
    return c.push(p), p;
  }
  function s() {
    const { history: u } = window;
    !u.state || u.replaceState(k({}, u.state, { scroll: re() }), "");
  }
  function a() {
    for (const u of c)
      u();
    c = [], window.removeEventListener("popstate", h), window.removeEventListener("beforeunload", s);
  }
  return window.addEventListener("popstate", h), window.addEventListener("beforeunload", s), {
    pauseListeners: l,
    listen: d,
    destroy: a
  };
}
function De(e, t, n, o = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: o,
    position: window.history.length,
    scroll: r ? re() : null
  };
}
function en(e) {
  const { history: t, location: n } = window, o = {
    value: et(e, n)
  }, r = { value: t.state };
  r.value || c(o.value, {
    back: null,
    current: o.value,
    forward: null,
    position: t.length - 1,
    replaced: !0,
    scroll: null
  }, !0);
  function c(l, d, s) {
    const a = e.indexOf("#"), u = a > -1 ? (n.host && document.querySelector("base") ? e : e.slice(a)) + l : Xt() + e + l;
    try {
      t[s ? "replaceState" : "pushState"](d, "", u), r.value = d;
    } catch (p) {
      process.env.NODE_ENV !== "production" ? R("Error with push/replace State", p) : console.error(p), n[s ? "replace" : "assign"](u);
    }
  }
  function f(l, d) {
    const s = k({}, t.state, De(
      r.value.back,
      l,
      r.value.forward,
      !0
    ), d, { position: r.value.position });
    c(l, s, !0), o.value = l;
  }
  function h(l, d) {
    const s = k(
      {},
      r.value,
      t.state,
      {
        forward: l,
        scroll: re()
      }
    );
    process.env.NODE_ENV !== "production" && !t.state && R(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), c(s.current, s, !0);
    const a = k({}, De(o.value, l, null), { position: s.position + 1 }, d);
    c(l, a, !1), o.value = l;
  }
  return {
    location: o,
    state: r,
    push: h,
    replace: f
  };
}
function tn(e) {
  e = qt(e);
  const t = en(e), n = Zt(e, t.state, t.location, t.replace);
  function o(c, f = !0) {
    f || n.pauseListeners(), history.go(c);
  }
  const r = k({
    location: "",
    base: e,
    go: o,
    createHref: Wt.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function nn(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function tt(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const M = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, ve = Symbol(process.env.NODE_ENV !== "production" ? "navigation failure" : "");
var Ve;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(Ve || (Ve = {}));
const on = {
  [1]({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  [2]({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${sn(t)}" via a navigation guard.`;
  },
  [4]({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  [8]({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  [16]({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function q(e, t) {
  return process.env.NODE_ENV !== "production" ? k(new Error(on[e](t)), {
    type: e,
    [ve]: !0
  }, t) : k(new Error(), {
    type: e,
    [ve]: !0
  }, t);
}
function T(e, t) {
  return e instanceof Error && ve in e && (t == null || !!(e.type & t));
}
const rn = ["params", "query", "hash"];
function sn(e) {
  if (typeof e == "string")
    return e;
  if ("path" in e)
    return e.path;
  const t = {};
  for (const n of rn)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const Te = "[^/]+?", an = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, cn = /[.+*?^${}()[\]/\\]/g;
function ln(e, t) {
  const n = k({}, an, t), o = [];
  let r = n.start ? "^" : "";
  const c = [];
  for (const d of e) {
    const s = d.length ? [] : [90];
    n.strict && !d.length && (r += "/");
    for (let a = 0; a < d.length; a++) {
      const u = d[a];
      let p = 40 + (n.sensitive ? 0.25 : 0);
      if (u.type === 0)
        a || (r += "/"), r += u.value.replace(cn, "\\$&"), p += 40;
      else if (u.type === 1) {
        const { value: y, repeatable: C, optional: N, regexp: E } = u;
        c.push({
          name: y,
          repeatable: C,
          optional: N
        });
        const w = E || Te;
        if (w !== Te) {
          p += 10;
          try {
            new RegExp(`(${w})`);
          } catch (x) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${w}): ` + x.message);
          }
        }
        let S = C ? `((?:${w})(?:/(?:${w}))*)` : `(${w})`;
        a || (S = N && d.length < 2 ? `(?:/${S})` : "/" + S), N && (S += "?"), r += S, p += 20, N && (p += -8), C && (p += -20), w === ".*" && (p += -50);
      }
      s.push(p);
    }
    o.push(s);
  }
  if (n.strict && n.end) {
    const d = o.length - 1;
    o[d][o[d].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const f = new RegExp(r, n.sensitive ? "" : "i");
  function h(d) {
    const s = d.match(f), a = {};
    if (!s)
      return null;
    for (let u = 1; u < s.length; u++) {
      const p = s[u] || "", y = c[u - 1];
      a[y.name] = p && y.repeatable ? p.split("/") : p;
    }
    return a;
  }
  function l(d) {
    let s = "", a = !1;
    for (const u of e) {
      (!a || !s.endsWith("/")) && (s += "/"), a = !1;
      for (const p of u)
        if (p.type === 0)
          s += p.value;
        else if (p.type === 1) {
          const { value: y, repeatable: C, optional: N } = p, E = y in d ? d[y] : "";
          if (I(E) && !C)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const w = I(E) ? E.join("/") : E;
          if (!w)
            if (N)
              u.length < 2 && (s.endsWith("/") ? s = s.slice(0, -1) : a = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          s += w;
        }
    }
    return s || "/";
  }
  return {
    re: f,
    score: o,
    keys: c,
    parse: h,
    stringify: l
  };
}
function un(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const o = t[n] - e[n];
    if (o)
      return o;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0;
}
function fn(e, t) {
  let n = 0;
  const o = e.score, r = t.score;
  for (; n < o.length && n < r.length; ) {
    const c = un(o[n], r[n]);
    if (c)
      return c;
    n++;
  }
  if (Math.abs(r.length - o.length) === 1) {
    if (je(o))
      return 1;
    if (je(r))
      return -1;
  }
  return r.length - o.length;
}
function je(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const dn = {
  type: 0,
  value: ""
}, hn = /[a-zA-Z0-9_]/;
function pn(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[dn]];
  if (!e.startsWith("/"))
    throw new Error(process.env.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(p) {
    throw new Error(`ERR (${n})/"${d}": ${p}`);
  }
  let n = 0, o = n;
  const r = [];
  let c;
  function f() {
    c && r.push(c), c = [];
  }
  let h = 0, l, d = "", s = "";
  function a() {
    !d || (n === 0 ? c.push({
      type: 0,
      value: d
    }) : n === 1 || n === 2 || n === 3 ? (c.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`), c.push({
      type: 1,
      value: d,
      regexp: s,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), d = "");
  }
  function u() {
    d += l;
  }
  for (; h < e.length; ) {
    if (l = e[h++], l === "\\" && n !== 2) {
      o = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (d && a(), f()) : l === ":" ? (a(), n = 1) : u();
        break;
      case 4:
        u(), n = o;
        break;
      case 1:
        l === "(" ? n = 2 : hn.test(l) ? u() : (a(), n = 0, l !== "*" && l !== "?" && l !== "+" && h--);
        break;
      case 2:
        l === ")" ? s[s.length - 1] == "\\" ? s = s.slice(0, -1) + l : n = 3 : s += l;
        break;
      case 3:
        a(), n = 0, l !== "*" && l !== "?" && l !== "+" && h--, s = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${d}"`), a(), f(), r;
}
function mn(e, t, n) {
  const o = ln(pn(e.path), n);
  if (process.env.NODE_ENV !== "production") {
    const c = /* @__PURE__ */ new Set();
    for (const f of o.keys)
      c.has(f.name) && R(`Found duplicated params with name "${f.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), c.add(f.name);
  }
  const r = k(o, {
    record: e,
    parent: t,
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function gn(e, t) {
  const n = [], o = /* @__PURE__ */ new Map();
  t = Ue({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(s) {
    return o.get(s);
  }
  function c(s, a, u) {
    const p = !u, y = vn(s);
    process.env.NODE_ENV !== "production" && wn(y, a), y.aliasOf = u && u.record;
    const C = Ue(t, s), N = [
      y
    ];
    if ("alias" in s) {
      const S = typeof s.alias == "string" ? [s.alias] : s.alias;
      for (const x of S)
        N.push(k({}, y, {
          components: u ? u.record.components : y.components,
          path: x,
          aliasOf: u ? u.record : y
        }));
    }
    let E, w;
    for (const S of N) {
      const { path: x } = S;
      if (a && x[0] !== "/") {
        const B = a.record.path, V = B[B.length - 1] === "/" ? "" : "/";
        S.path = a.record.path + (x && V + x);
      }
      if (process.env.NODE_ENV !== "production" && S.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (E = mn(S, a, C), process.env.NODE_ENV !== "production" && a && x[0] === "/" && bn(E, a), u ? (u.alias.push(E), process.env.NODE_ENV !== "production" && _n(u, E)) : (w = w || E, w !== E && w.alias.push(E), p && s.name && !Le(E) && f(s.name)), y.children) {
        const B = y.children;
        for (let V = 0; V < B.length; V++)
          c(B[V], E, u && u.children[V]);
      }
      u = u || E, (E.record.components && Object.keys(E.record.components).length || E.record.name || E.record.redirect) && l(E);
    }
    return w ? () => {
      f(w);
    } : J;
  }
  function f(s) {
    if (tt(s)) {
      const a = o.get(s);
      a && (o.delete(s), n.splice(n.indexOf(a), 1), a.children.forEach(f), a.alias.forEach(f));
    } else {
      const a = n.indexOf(s);
      a > -1 && (n.splice(a, 1), s.record.name && o.delete(s.record.name), s.children.forEach(f), s.alias.forEach(f));
    }
  }
  function h() {
    return n;
  }
  function l(s) {
    let a = 0;
    for (; a < n.length && fn(s, n[a]) >= 0 && (s.record.path !== n[a].record.path || !nt(s, n[a])); )
      a++;
    n.splice(a, 0, s), s.record.name && !Le(s) && o.set(s.record.name, s);
  }
  function d(s, a) {
    let u, p = {}, y, C;
    if ("name" in s && s.name) {
      if (u = o.get(s.name), !u)
        throw q(1, {
          location: s
        });
      if (process.env.NODE_ENV !== "production") {
        const w = Object.keys(s.params || {}).filter((S) => !u.keys.find((x) => x.name === S));
        w.length && R(`Discarded invalid param(s) "${w.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      C = u.record.name, p = k(
        Me(
          a.params,
          u.keys.filter((w) => !w.optional).map((w) => w.name)
        ),
        s.params && Me(s.params, u.keys.map((w) => w.name))
      ), y = u.stringify(p);
    } else if ("path" in s)
      y = s.path, process.env.NODE_ENV !== "production" && !y.startsWith("/") && R(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`), u = n.find((w) => w.re.test(y)), u && (p = u.parse(y), C = u.record.name);
    else {
      if (u = a.name ? o.get(a.name) : n.find((w) => w.re.test(a.path)), !u)
        throw q(1, {
          location: s,
          currentLocation: a
        });
      C = u.record.name, p = k({}, a.params, s.params), y = u.stringify(p);
    }
    const N = [];
    let E = u;
    for (; E; )
      N.unshift(E.record), E = E.parent;
    return {
      name: C,
      path: y,
      params: p,
      matched: N,
      meta: En(N)
    };
  }
  return e.forEach((s) => c(s)), { addRoute: c, resolve: d, removeRoute: f, getRoutes: h, getRecordMatcher: r };
}
function Me(e, t) {
  const n = {};
  for (const o of t)
    o in e && (n[o] = e[o]);
  return n;
}
function vn(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: yn(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function yn(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const o in e.components)
      t[o] = typeof n == "boolean" ? n : n[o];
  return t;
}
function Le(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function En(e) {
  return e.reduce((t, n) => k(t, n.meta), {});
}
function Ue(e, t) {
  const n = {};
  for (const o in e)
    n[o] = o in t ? t[o] : e[o];
  return n;
}
function ye(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function _n(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(ye.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(ye.bind(null, n)))
      return R(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function wn(e, t) {
  t && t.record.name && !e.name && !e.path && R(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function bn(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(ye.bind(null, n)))
      return R(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function nt(e, t) {
  return t.children.some((n) => n === e || nt(e, n));
}
const ot = /#/g, Rn = /&/g, Pn = /\//g, kn = /=/g, Nn = /\?/g, rt = /\+/g, On = /%5B/g, Sn = /%5D/g, st = /%5E/g, Cn = /%60/g, it = /%7B/g, An = /%7C/g, at = /%7D/g, $n = /%20/g;
function be(e) {
  return encodeURI("" + e).replace(An, "|").replace(On, "[").replace(Sn, "]");
}
function xn(e) {
  return be(e).replace(it, "{").replace(at, "}").replace(st, "^");
}
function Ee(e) {
  return be(e).replace(rt, "%2B").replace($n, "+").replace(ot, "%23").replace(Rn, "%26").replace(Cn, "`").replace(it, "{").replace(at, "}").replace(st, "^");
}
function In(e) {
  return Ee(e).replace(kn, "%3D");
}
function Dn(e) {
  return be(e).replace(ot, "%23").replace(Nn, "%3F");
}
function Vn(e) {
  return e == null ? "" : Dn(e).replace(Pn, "%2F");
}
function te(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    process.env.NODE_ENV !== "production" && R(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
function Tn(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const o = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < o.length; ++r) {
    const c = o[r].replace(rt, " "), f = c.indexOf("="), h = te(f < 0 ? c : c.slice(0, f)), l = f < 0 ? null : te(c.slice(f + 1));
    if (h in t) {
      let d = t[h];
      I(d) || (d = t[h] = [d]), d.push(l);
    } else
      t[h] = l;
  }
  return t;
}
function Be(e) {
  let t = "";
  for (let n in e) {
    const o = e[n];
    if (n = In(n), o == null) {
      o !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (I(o) ? o.map((c) => c && Ee(c)) : [o && Ee(o)]).forEach((c) => {
      c !== void 0 && (t += (t.length ? "&" : "") + n, c != null && (t += "=" + c));
    });
  }
  return t;
}
function jn(e) {
  const t = {};
  for (const n in e) {
    const o = e[n];
    o !== void 0 && (t[n] = I(o) ? o.map((r) => r == null ? null : "" + r) : o == null ? o : "" + o);
  }
  return t;
}
const Mn = Symbol(process.env.NODE_ENV !== "production" ? "router view location matched" : ""), Ge = Symbol(process.env.NODE_ENV !== "production" ? "router view depth" : ""), Re = Symbol(process.env.NODE_ENV !== "production" ? "router" : ""), ct = Symbol(process.env.NODE_ENV !== "production" ? "route location" : ""), _e = Symbol(process.env.NODE_ENV !== "production" ? "router view location" : "");
function Q() {
  let e = [];
  function t(o) {
    return e.push(o), () => {
      const r = e.indexOf(o);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e,
    reset: n
  };
}
function L(e, t, n, o, r) {
  const c = o && (o.enterCallbacks[r] = o.enterCallbacks[r] || []);
  return () => new Promise((f, h) => {
    const l = (a) => {
      a === !1 ? h(q(4, {
        from: n,
        to: t
      })) : a instanceof Error ? h(a) : nn(a) ? h(q(2, {
        from: t,
        to: a
      })) : (c && o.enterCallbacks[r] === c && typeof a == "function" && c.push(a), f());
    }, d = e.call(o && o.instances[r], t, n, process.env.NODE_ENV !== "production" ? Ln(l, t, n) : l);
    let s = Promise.resolve(d);
    if (e.length < 3 && (s = s.then(l)), process.env.NODE_ENV !== "production" && e.length > 2) {
      const a = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof d == "object" && "then" in d)
        s = s.then((u) => l._called ? u : (R(a), Promise.reject(new Error("Invalid navigation guard"))));
      else if (d !== void 0 && !l._called) {
        R(a), h(new Error("Invalid navigation guard"));
        return;
      }
    }
    s.catch((a) => h(a));
  });
}
function Ln(e, t, n) {
  let o = 0;
  return function() {
    o++ === 1 && R(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, o === 1 && e.apply(null, arguments);
  };
}
function pe(e, t, n, o) {
  const r = [];
  for (const c of e) {
    process.env.NODE_ENV !== "production" && !c.components && !c.children.length && R(`Record with path "${c.path}" is either missing a "component(s)" or "children" property.`);
    for (const f in c.components) {
      let h = c.components[f];
      if (process.env.NODE_ENV !== "production") {
        if (!h || typeof h != "object" && typeof h != "function")
          throw R(`Component "${f}" in record with path "${c.path}" is not a valid component. Received "${String(h)}".`), new Error("Invalid route component");
        if ("then" in h) {
          R(`Component "${f}" in record with path "${c.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const l = h;
          h = () => l;
        } else
          h.__asyncLoader && !h.__warnedDefineAsync && (h.__warnedDefineAsync = !0, R(`Component "${f}" in record with path "${c.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !c.instances[f]))
        if (Un(h)) {
          const d = (h.__vccOpts || h)[t];
          d && r.push(L(d, n, o, c, f));
        } else {
          let l = h();
          process.env.NODE_ENV !== "production" && !("catch" in l) && (R(`Component "${f}" in record with path "${c.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), l = Promise.resolve(l)), r.push(() => l.then((d) => {
            if (!d)
              return Promise.reject(new Error(`Couldn't resolve component "${f}" at "${c.path}"`));
            const s = Lt(d) ? d.default : d;
            c.components[f] = s;
            const u = (s.__vccOpts || s)[t];
            return u && L(u, n, o, c, f)();
          }));
        }
    }
  }
  return r;
}
function Un(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function He(e) {
  const t = Z(Re), n = Z(ct), o = D(() => t.resolve(Y(e.to))), r = D(() => {
    const { matched: l } = o.value, { length: d } = l, s = l[d - 1], a = n.matched;
    if (!s || !a.length)
      return -1;
    const u = a.findIndex(U.bind(null, s));
    if (u > -1)
      return u;
    const p = Ke(l[d - 2]);
    return d > 1 && Ke(s) === p && a[a.length - 1].path !== p ? a.findIndex(U.bind(null, l[d - 2])) : u;
  }), c = D(() => r.value > -1 && Kn(n.params, o.value.params)), f = D(() => r.value > -1 && r.value === n.matched.length - 1 && Ze(n.params, o.value.params));
  function h(l = {}) {
    return Hn(l) ? t[Y(e.replace) ? "replace" : "push"](
      Y(e.to)
    ).catch(J) : Promise.resolve();
  }
  if ((process.env.NODE_ENV !== "production" || !1) && j) {
    const l = Je();
    if (l) {
      const d = {
        route: o.value,
        isActive: c.value,
        isExactActive: f.value
      };
      l.__vrl_devtools = l.__vrl_devtools || [], l.__vrl_devtools.push(d), kt(() => {
        d.route = o.value, d.isActive = c.value, d.isExactActive = f.value;
      }, { flush: "post" });
    }
  }
  return {
    route: o,
    href: D(() => o.value.href),
    isActive: c,
    isExactActive: f,
    navigate: h
  };
}
const Bn = /* @__PURE__ */ Qe({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: He,
  setup(e, { slots: t }) {
    const n = We(He(e)), { options: o } = Z(Re), r = D(() => ({
      [qe(e.activeClass, o.linkActiveClass, "router-link-active")]: n.isActive,
      [qe(e.exactActiveClass, o.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const c = t.default && t.default(n);
      return e.custom ? c : Fe("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        onClick: n.navigate,
        class: r.value
      }, c);
    };
  }
}), Gn = Bn;
function Hn(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Kn(e, t) {
  for (const n in t) {
    const o = t[n], r = e[n];
    if (typeof o == "string") {
      if (o !== r)
        return !1;
    } else if (!I(r) || r.length !== o.length || o.some((c, f) => c !== r[f]))
      return !1;
  }
  return !0;
}
function Ke(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const qe = (e, t, n) => e != null ? e : t != null ? t : n, qn = /* @__PURE__ */ Qe({
  name: "RouterView",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    process.env.NODE_ENV !== "production" && Wn();
    const o = Z(_e), r = D(() => e.route || o.value), c = Z(Ge, 0), f = D(() => {
      let d = Y(c);
      const { matched: s } = r.value;
      let a;
      for (; (a = s[d]) && !a.components; )
        d++;
      return d;
    }), h = D(() => r.value.matched[f.value]);
    fe(Ge, D(() => f.value + 1)), fe(Mn, h), fe(_e, r);
    const l = Pt();
    return Ye(() => [l.value, h.value, e.name], ([d, s, a], [u, p, y]) => {
      s && (s.instances[a] = d, p && p !== s && d && d === u && (s.leaveGuards.size || (s.leaveGuards = p.leaveGuards), s.updateGuards.size || (s.updateGuards = p.updateGuards))), d && s && (!p || !U(s, p) || !u) && (s.enterCallbacks[a] || []).forEach((C) => C(d));
    }, { flush: "post" }), () => {
      const d = r.value, s = e.name, a = h.value, u = a && a.components[s];
      if (!u)
        return ze(n.default, { Component: u, route: d });
      const p = a.props[s], y = p ? p === !0 ? d.params : typeof p == "function" ? p(d) : p : null, N = Fe(u, k({}, y, t, {
        onVnodeUnmounted: (E) => {
          E.component.isUnmounted && (a.instances[s] = null);
        },
        ref: l
      }));
      if ((process.env.NODE_ENV !== "production" || !1) && j && N.ref) {
        const E = {
          depth: f.value,
          name: a.name,
          path: a.path,
          meta: a.meta
        };
        (I(N.ref) ? N.ref.map((S) => S.i) : [N.ref.i]).forEach((S) => {
          S.__vrv_devtools = E;
        });
      }
      return ze(n.default, { Component: N, route: d }) || N;
    };
  }
});
function ze(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const zn = qn;
function Wn() {
  const e = Je(), t = e.parent && e.parent.type.name;
  if (t && (t === "KeepAlive" || t.includes("Transition"))) {
    const n = t === "KeepAlive" ? "keep-alive" : "transition";
    R(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${n}>
    <component :is="Component" />
  </${n}>
</router-view>`);
  }
}
function F(e, t) {
  const n = k({}, e, {
    matched: e.matched.map((o) => no(o, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function oe(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let Qn = 0;
function Fn(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const o = Qn++;
  Mt({
    id: "org.vuejs.router" + (o ? "." + o : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (r) => {
    typeof r.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.on.inspectComponent((s, a) => {
      s.instanceData && s.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: F(t.currentRoute.value, "Current Route")
      });
    }), r.on.visitComponentTree(({ treeNode: s, componentInstance: a }) => {
      if (a.__vrv_devtools) {
        const u = a.__vrv_devtools;
        s.tags.push({
          label: (u.name ? `${u.name.toString()}: ` : "") + u.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: lt
        });
      }
      I(a.__vrl_devtools) && (a.__devtoolsApi = r, a.__vrl_devtools.forEach((u) => {
        let p = dt, y = "";
        u.isExactActive ? (p = ft, y = "This is exactly active") : u.isActive && (p = ut, y = "This link is active"), s.tags.push({
          label: u.route.path,
          textColor: 0,
          tooltip: y,
          backgroundColor: p
        });
      }));
    }), Ye(t.currentRoute, () => {
      l(), r.notifyComponentUpdate(), r.sendInspectorTree(h), r.sendInspectorState(h);
    });
    const c = "router:navigations:" + o;
    r.addTimelineLayer({
      id: c,
      label: `Router${o ? " " + o : ""} Navigations`,
      color: 4237508
    }), t.onError((s, a) => {
      r.addTimelineEvent({
        layerId: c,
        event: {
          title: "Error during Navigation",
          subtitle: a.fullPath,
          logType: "error",
          time: r.now(),
          data: { error: s },
          groupId: a.meta.__navigationId
        }
      });
    });
    let f = 0;
    t.beforeEach((s, a) => {
      const u = {
        guard: oe("beforeEach"),
        from: F(a, "Current Location during this navigation"),
        to: F(s, "Target location")
      };
      Object.defineProperty(s.meta, "__navigationId", {
        value: f++
      }), r.addTimelineEvent({
        layerId: c,
        event: {
          time: r.now(),
          title: "Start of navigation",
          subtitle: s.fullPath,
          data: u,
          groupId: s.meta.__navigationId
        }
      });
    }), t.afterEach((s, a, u) => {
      const p = {
        guard: oe("afterEach")
      };
      u ? (p.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: u ? u.message : "",
          tooltip: "Navigation Failure",
          value: u
        }
      }, p.status = oe("\u274C")) : p.status = oe("\u2705"), p.from = F(a, "Current Location during this navigation"), p.to = F(s, "Target location"), r.addTimelineEvent({
        layerId: c,
        event: {
          title: "End of navigation",
          subtitle: s.fullPath,
          time: r.now(),
          data: p,
          logType: u ? "warning" : "default",
          groupId: s.meta.__navigationId
        }
      });
    });
    const h = "router-inspector:" + o;
    r.addInspector({
      id: h,
      label: "Routes" + (o ? " " + o : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function l() {
      if (!d)
        return;
      const s = d;
      let a = n.getRoutes().filter((u) => !u.parent);
      a.forEach(mt), s.filter && (a = a.filter((u) => we(u, s.filter.toLowerCase()))), a.forEach((u) => pt(u, t.currentRoute.value)), s.rootNodes = a.map(ht);
    }
    let d;
    r.on.getInspectorTree((s) => {
      d = s, s.app === e && s.inspectorId === h && l();
    }), r.on.getInspectorState((s) => {
      if (s.app === e && s.inspectorId === h) {
        const u = n.getRoutes().find((p) => p.record.__vd_id === s.nodeId);
        u && (s.state = {
          options: Jn(u)
        });
      }
    }), r.sendInspectorTree(h), r.sendInspectorState(h);
  });
}
function Yn(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function Jn(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((o) => `${o.name}${Yn(o)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((o) => o.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((o) => o.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const lt = 15485081, ut = 2450411, ft = 8702998, Xn = 2282478, dt = 16486972, Zn = 6710886;
function ht(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: Xn
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: dt
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: lt
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: ft
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: ut
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: Zn
  });
  let o = n.__vd_id;
  return o == null && (o = String(eo++), n.__vd_id = o), {
    id: o,
    label: n.path,
    tags: t,
    children: e.children.map(ht)
  };
}
let eo = 0;
const to = /^\/(.*)\/([a-z]*)$/;
function pt(e, t) {
  const n = t.matched.length && U(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((o) => U(o, e.record))), e.children.forEach((o) => pt(o, t));
}
function mt(e) {
  e.__vd_match = !1, e.children.forEach(mt);
}
function we(e, t) {
  const n = String(e.re).match(to);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((f) => we(f, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const r = e.record.path.toLowerCase(), c = te(r);
  return !t.startsWith("/") && (c.includes(t) || r.includes(t)) || c.startsWith(t) || r.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((f) => we(f, t));
}
function no(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || (n[o] = e[o]);
  return n;
}
function oo(e) {
  const t = gn(e.routes, e), n = e.parseQuery || Tn, o = e.stringifyQuery || Be, r = e.history;
  if (process.env.NODE_ENV !== "production" && !r)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const c = Q(), f = Q(), h = Q(), l = bt(M);
  let d = M;
  j && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const s = de.bind(null, (i) => "" + i), a = de.bind(null, Vn), u = de.bind(null, te);
  function p(i, g) {
    let m, v;
    return tt(i) ? (m = t.getRecordMatcher(i), v = g) : v = i, t.addRoute(v, m);
  }
  function y(i) {
    const g = t.getRecordMatcher(i);
    g ? t.removeRoute(g) : process.env.NODE_ENV !== "production" && R(`Cannot remove non-existent route "${String(i)}"`);
  }
  function C() {
    return t.getRoutes().map((i) => i.record);
  }
  function N(i) {
    return !!t.getRecordMatcher(i);
  }
  function E(i, g) {
    if (g = k({}, g || l.value), typeof i == "string") {
      const _ = he(n, i, g.path), O = t.resolve({ path: _.path }, g), G = r.createHref(_.fullPath);
      return process.env.NODE_ENV !== "production" && (G.startsWith("//") ? R(`Location "${i}" resolved to "${G}". A resolved location cannot start with multiple slashes.`) : O.matched.length || R(`No match found for location with path "${i}"`)), k(_, O, {
        params: u(O.params),
        hash: te(_.hash),
        redirectedFrom: void 0,
        href: G
      });
    }
    let m;
    if ("path" in i)
      process.env.NODE_ENV !== "production" && "params" in i && !("name" in i) && Object.keys(i.params).length && R(`Path "${i.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), m = k({}, i, {
        path: he(n, i.path, g.path).path
      });
    else {
      const _ = k({}, i.params);
      for (const O in _)
        _[O] == null && delete _[O];
      m = k({}, i, {
        params: a(i.params)
      }), g.params = a(g.params);
    }
    const v = t.resolve(m, g), P = i.hash || "";
    process.env.NODE_ENV !== "production" && P && !P.startsWith("#") && R(`A \`hash\` should always start with the character "#". Replace "${P}" with "#${P}".`), v.params = s(u(v.params));
    const A = Gt(o, k({}, i, {
      hash: xn(P),
      path: v.path
    })), b = r.createHref(A);
    return process.env.NODE_ENV !== "production" && (b.startsWith("//") ? R(`Location "${i}" resolved to "${b}". A resolved location cannot start with multiple slashes.`) : v.matched.length || R(`No match found for location with path "${"path" in i ? i.path : i}"`)), k({
      fullPath: A,
      hash: P,
      query: o === Be ? jn(i.query) : i.query || {}
    }, v, {
      redirectedFrom: void 0,
      href: b
    });
  }
  function w(i) {
    return typeof i == "string" ? he(n, i, l.value.path) : k({}, i);
  }
  function S(i, g) {
    if (d !== i)
      return q(8, {
        from: g,
        to: i
      });
  }
  function x(i) {
    return z(i);
  }
  function B(i) {
    return x(k(w(i), { replace: !0 }));
  }
  function V(i) {
    const g = i.matched[i.matched.length - 1];
    if (g && g.redirect) {
      const { redirect: m } = g;
      let v = typeof m == "function" ? m(i) : m;
      if (typeof v == "string" && (v = v.includes("?") || v.includes("#") ? v = w(v) : { path: v }, v.params = {}), process.env.NODE_ENV !== "production" && !("path" in v) && !("name" in v))
        throw R(`Invalid redirect found:
${JSON.stringify(v, null, 2)}
 when navigating to "${i.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return k({
        query: i.query,
        hash: i.hash,
        params: "path" in v ? {} : i.params
      }, v);
    }
  }
  function z(i, g) {
    const m = d = E(i), v = l.value, P = i.state, A = i.force, b = i.replace === !0, _ = V(m);
    if (_)
      return z(
        k(w(_), {
          state: typeof _ == "object" ? k({}, P, _.state) : P,
          force: A,
          replace: b
        }),
        g || m
      );
    const O = m;
    O.redirectedFrom = g;
    let G;
    return !A && $e(o, v, m) && (G = q(16, { to: O, from: v }), Se(
      v,
      v,
      !0,
      !1
    )), (G ? Promise.resolve(G) : Pe(O, v)).catch(($) => T($) ? T($, 2) ? $ : ae($) : ie($, O, v)).then(($) => {
      if ($) {
        if (T($, 2))
          return process.env.NODE_ENV !== "production" && $e(o, E($.to), O) && g && (g._count = g._count ? g._count + 1 : 1) > 10 ? (R(`Detected an infinite redirection in a navigation guard when going from "${v.fullPath}" to "${O.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : z(
            k({
              replace: b
            }, w($.to), {
              state: typeof $.to == "object" ? k({}, P, $.to.state) : P,
              force: A
            }),
            g || O
          );
      } else
        $ = Ne(O, v, !0, b, P);
      return ke(O, v, $), $;
    });
  }
  function gt(i, g) {
    const m = S(i, g);
    return m ? Promise.reject(m) : Promise.resolve();
  }
  function Pe(i, g) {
    let m;
    const [v, P, A] = ro(i, g);
    m = pe(v.reverse(), "beforeRouteLeave", i, g);
    for (const _ of v)
      _.leaveGuards.forEach((O) => {
        m.push(L(O, i, g));
      });
    const b = gt.bind(null, i, g);
    return m.push(b), K(m).then(() => {
      m = [];
      for (const _ of c.list())
        m.push(L(_, i, g));
      return m.push(b), K(m);
    }).then(() => {
      m = pe(P, "beforeRouteUpdate", i, g);
      for (const _ of P)
        _.updateGuards.forEach((O) => {
          m.push(L(O, i, g));
        });
      return m.push(b), K(m);
    }).then(() => {
      m = [];
      for (const _ of i.matched)
        if (_.beforeEnter && !g.matched.includes(_))
          if (I(_.beforeEnter))
            for (const O of _.beforeEnter)
              m.push(L(O, i, g));
          else
            m.push(L(_.beforeEnter, i, g));
      return m.push(b), K(m);
    }).then(() => (i.matched.forEach((_) => _.enterCallbacks = {}), m = pe(A, "beforeRouteEnter", i, g), m.push(b), K(m))).then(() => {
      m = [];
      for (const _ of f.list())
        m.push(L(_, i, g));
      return m.push(b), K(m);
    }).catch((_) => T(_, 8) ? _ : Promise.reject(_));
  }
  function ke(i, g, m) {
    for (const v of h.list())
      v(i, g, m);
  }
  function Ne(i, g, m, v, P) {
    const A = S(i, g);
    if (A)
      return A;
    const b = g === M, _ = j ? history.state : {};
    m && (v || b ? r.replace(i.fullPath, k({
      scroll: b && _ && _.scroll
    }, P)) : r.push(i.fullPath, P)), l.value = i, Se(i, g, m, b), ae();
  }
  let W;
  function vt() {
    W || (W = r.listen((i, g, m) => {
      if (!Ce.listening)
        return;
      const v = E(i), P = V(v);
      if (P) {
        z(k(P, { replace: !0 }), v).catch(J);
        return;
      }
      d = v;
      const A = l.value;
      j && Yt(Ie(A.fullPath, m.delta), re()), Pe(v, A).catch((b) => T(b, 12) ? b : T(b, 2) ? (z(
        b.to,
        v
      ).then((_) => {
        T(_, 20) && !m.delta && m.type === ee.pop && r.go(-1, !1);
      }).catch(J), Promise.reject()) : (m.delta && r.go(-m.delta, !1), ie(b, v, A))).then((b) => {
        b = b || Ne(
          v,
          A,
          !1
        ), b && (m.delta && !T(b, 8) ? r.go(-m.delta, !1) : m.type === ee.pop && T(b, 20) && r.go(-1, !1)), ke(v, A, b);
      }).catch(J);
    }));
  }
  let se = Q(), Oe = Q(), ne;
  function ie(i, g, m) {
    ae(i);
    const v = Oe.list();
    return v.length ? v.forEach((P) => P(i, g, m)) : (process.env.NODE_ENV !== "production" && R("uncaught error during route navigation:"), console.error(i)), Promise.reject(i);
  }
  function yt() {
    return ne && l.value !== M ? Promise.resolve() : new Promise((i, g) => {
      se.add([i, g]);
    });
  }
  function ae(i) {
    return ne || (ne = !i, vt(), se.list().forEach(([g, m]) => i ? m(i) : g()), se.reset()), i;
  }
  function Se(i, g, m, v) {
    const { scrollBehavior: P } = e;
    if (!j || !P)
      return Promise.resolve();
    const A = !m && Jt(Ie(i.fullPath, 0)) || (v || !m) && history.state && history.state.scroll || null;
    return Rt().then(() => P(i, g, A)).then((b) => b && Ft(b)).catch((b) => ie(b, i, g));
  }
  const ce = (i) => r.go(i);
  let le;
  const ue = /* @__PURE__ */ new Set(), Ce = {
    currentRoute: l,
    listening: !0,
    addRoute: p,
    removeRoute: y,
    hasRoute: N,
    getRoutes: C,
    resolve: E,
    options: e,
    push: x,
    replace: B,
    go: ce,
    back: () => ce(-1),
    forward: () => ce(1),
    beforeEach: c.add,
    beforeResolve: f.add,
    afterEach: h.add,
    onError: Oe.add,
    isReady: yt,
    install(i) {
      const g = this;
      i.component("RouterLink", Gn), i.component("RouterView", zn), i.config.globalProperties.$router = g, Object.defineProperty(i.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Y(l)
      }), j && !le && l.value === M && (le = !0, x(r.location).catch((P) => {
        process.env.NODE_ENV !== "production" && R("Unexpected error when starting the router:", P);
      }));
      const m = {};
      for (const P in M)
        m[P] = D(() => l.value[P]);
      i.provide(Re, g), i.provide(ct, We(m)), i.provide(_e, l);
      const v = i.unmount;
      ue.add(i), i.unmount = function() {
        ue.delete(i), ue.size < 1 && (d = M, W && W(), W = null, l.value = M, le = !1, ne = !1), v();
      }, (process.env.NODE_ENV !== "production" || !1) && j && Fn(i, g, t);
    }
  };
  return Ce;
}
function K(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function ro(e, t) {
  const n = [], o = [], r = [], c = Math.max(t.matched.length, e.matched.length);
  for (let f = 0; f < c; f++) {
    const h = t.matched[f];
    h && (e.matched.find((d) => U(d, h)) ? o.push(h) : n.push(h));
    const l = e.matched[f];
    l && (t.matched.find((d) => U(d, l)) || r.push(l));
  }
  return [n, o, r];
}
const so = [
  {
    path: "/",
    name: "\uBA54\uC778\uD398\uC774\uC9C0",
    component: () => import("./index.ef902a02.js")
  },
  {
    path: "/about",
    name: "aboutus",
    component: () => import("./about.15530d2f.js")
  },
  {
    path: "/skill",
    name: "skill",
    component: () => import("./skill.782f643e.js")
  },
  {
    path: "/history",
    name: "history",
    component: () => import("./history.d597718b.js")
  }
], io = oo({
  history: tn("/"),
  routes: so
});
Nt(At).use(io).mount("#app");
export {
  Ot as _
};
