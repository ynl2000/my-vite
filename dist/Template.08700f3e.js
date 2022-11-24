import { resolveComponent as l, openBlock as c, createElementBlock as _, createElementVNode as o, createVNode as e, withCtx as n, createTextVNode as r, Fragment as i } from "vue";
import { _ as m } from "./main.9b77de5f.js";
const d = {}, f = { class: "header-menu" };
function p(u, a) {
  const t = l("router-link");
  return c(), _("ul", f, [
    o("li", null, [
      e(t, { to: "/about" }, {
        default: n(() => [
          r("AboutUs")
        ]),
        _: 1
      })
    ]),
    o("li", null, [
      e(t, { to: "/skill" }, {
        default: n(() => [
          r("skill")
        ]),
        _: 1
      })
    ]),
    o("li", null, [
      e(t, { to: "/history" }, {
        default: n(() => [
          r("history")
        ]),
        _: 1
      })
    ]),
    o("li", null, [
      e(t, { to: "/contact" }, {
        default: n(() => [
          r("contact")
        ]),
        _: 1
      })
    ])
  ]);
}
const h = /* @__PURE__ */ m(d, [["render", p]]), v = {
  __name: "Template",
  setup(u) {
    return (a, t) => {
      const s = l("router-view");
      return c(), _(i, null, [
        e(s),
        e(h)
      ], 64);
    };
  }
};
export {
  v as default
};
