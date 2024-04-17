(window._iconfont_svg_string_ = '<!---template--->'),
(function (a) {
  var t = (t = document.getElementsByTagName("script"))[t.length - 1],
    e = t.getAttribute("data-injectcss"),
    t = t.getAttribute("data-disable-injectsvg");
  if (!t) {
    var i,
      n,
      l,
      c,
      o,
      h = function (t, e) {
        e.parentNode.insertBefore(t, e);
      };
    if (e && !a.__iconfont__svg__cssinject__) {
      a.__iconfont__svg__cssinject__ = !0;
      try {
        document.write(
          "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
        );
      } catch (t) {
        console && console.log(t);
      }
    }
    (i = function () {
      var t,
        e = document.createElement("div");
      (e.innerHTML = a._iconfont_svg_string_),
        (e = e.getElementsByTagName("svg")[0]) &&
          (e.setAttribute("aria-hidden", "true"),
          (e.style.position = "absolute"),
          (e.style.width = 0),
          (e.style.height = 0),
          (e.style.overflow = "hidden"),
          (e = e),
          (t = document.body).firstChild
            ? h(e, t.firstChild)
            : t.appendChild(e));
    }),
      document.addEventListener
        ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
          ? setTimeout(i, 0)
          : ((n = function () {
              document.removeEventListener("DOMContentLoaded", n, !1), i();
            }),
            document.addEventListener("DOMContentLoaded", n, !1))
        : document.attachEvent &&
          ((l = i),
          (c = a.document),
          (o = !1),
          s(),
          (c.onreadystatechange = function () {
            "complete" == c.readyState &&
              ((c.onreadystatechange = null), d());
          }));
  }
  function d() {
    o || ((o = !0), l());
  }
  function s() {
    try {
      c.documentElement.doScroll("left");
    } catch (t) {
      return void setTimeout(s, 50);
    }
    d();
  }
})(window);
