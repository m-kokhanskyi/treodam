﻿(
    function (ha, W) {"object" === typeof exports && "undefined" !== typeof module ? module.exports = W() : "function" === typeof define && define.amd ? define("codemirror.js", W) : ha.CodeMirror = W();}
)(this, function () {
    function ha(a) {return new RegExp("(^|\\s)" + a + "(?:$|\\s)\\s*");}
    
    function W(a) {
        for (var b = a.childNodes.length; 0 < b; --b) a.removeChild(a.firstChild);
        return a;
    }
    
    function aa(a, b) {return W(a).appendChild(b);}
    
    function u(a, b, c, d) {
        a = document.createElement(a);
        c && (
            a.className = c
        );
        d && (
            a.style.cssText = d
        );
        if ("string" == typeof b) a.appendChild(document.createTextNode(b));
        else if (b) for (c = 0; c < b.length; ++c) a.appendChild(b[c]);
        return a;
    }
    
    function Za(a, b, c, d) {
        a = u(a, b, c, d);
        a.setAttribute("role", "presentation");
        return a;
    }
    
    function ya(a, b) {
        3 == b.nodeType && (
            b = b.parentNode
        );
        if (a.contains) return a.contains(b);
        do if (11 == b.nodeType && (
            b = b.host
        ), b == a) return !0; while (b = b.parentNode);
    }
    
    function ta() {
        var a;
        try {a = document.activeElement;} catch (b) {a = document.body || null;}
        for (; a && a.shadowRoot && a.shadowRoot.activeElement;) a = a.shadowRoot.activeElement;
        return a;
    }
    
    function Fa(a, b) {
        var c = a.className;
        ha(b).test(c) ||
        (
            a.className += (
                c ? " " : ""
            ) + b
        );
    }
    
    function Mc(a, b) {
        for (var c = a.split(" "), d = 0; d < c.length; d++) c[d] && !ha(c[d]).test(b) && (
            b += " " + c[d]
        );
        return b;
    }
    
    function Nc(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return function () {return a.apply(null, b);};
    }
    
    function Ga(a, b, c) {
        b || (
            b = {}
        );
        for (var d in a) !a.hasOwnProperty(d) || !1 === c && b.hasOwnProperty(d) || (
            b[d] = a[d]
        );
        return b;
    }
    
    function fa(a, b, c, d, e) {
        null == b && (
            b = a.search(/[^\s\u00a0]/), -1 == b && (
                b = a.length
            )
        );
        d = d || 0;
        for (e = e || 0; ;) {
            var f = a.indexOf("\t", d);
            if (0 > f || f >= b) return e +
                (
                    b - d
                );
            e += f - d;
            e += c - e % c;
            d = f + 1;
        }
    }
    
    function L(a, b) {
        for (var c = 0; c < a.length; ++c) if (a[c] == b) return c;
        return -1;
    }
    
    function Oc(a, b, c) {
        for (var d = 0, e = 0; ;) {
            var f = a.indexOf("\t", d);
            -1 == f && (
                f = a.length
            );
            var g = f - d;
            if (f == a.length || e + g >= b) return d + Math.min(g, b - e);
            e += f - d;
            e += c - e % c;
            d = f + 1;
            if (e >= b) return d;
        }
    }
    
    function Pc(a) {
        for (; fc.length <= a;) fc.push(z(fc) + " ");
        return fc[a];
    }
    
    function z(a) {return a[a.length - 1];}
    
    function gc(a, b) {
        for (var c = [], d = 0; d < a.length; d++) c[d] = b(a[d], d);
        return c;
    }
    
    function hg(a, b, c) {
        for (var d = 0, e = c(b); d < a.length &&
        c(a[d]) <= e;) d++;
        a.splice(d, 0, b);
    }
    
    function Wd() {}
    
    function Xd(a, b) {
        var c;
        Object.create ? c = Object.create(a) : (
            Wd.prototype = a, c = new Wd
        );
        b && Ga(b, c);
        return c;
    }
    
    function Qc(a) {
        return /\w/.test(a) || "" < a && (
            a.toUpperCase() != a.toLowerCase() || ig.test(a)
        );
    }
    
    function hc(a, b) {return b ? -1 < b.source.indexOf("\\w") && Qc(a) ? !0 : b.test(a) : Qc(a);}
    
    function Yd(a) {
        for (var b in a) if (a.hasOwnProperty(b) && a[b]) return !1;
        return !0;
    }
    
    function Rc(a) {return 768 <= a.charCodeAt(0) && jg.test(a);}
    
    function Zd(a, b, c) {
        for (; (
                   0 > c ? 0 < b : b < a.length
               ) && Rc(a.charAt(b));) b +=
            c;
        return b;
    }
    
    function rb(a, b, c) {
        for (var d = b > c ? -1 : 1; ;) {
            if (b == c) return b;
            var e = (
                b + c
                ) / 2,
                e = 0 > d ? Math.ceil(e) : Math.floor(e);
            if (e == b) return a(e) ? b : c;
            a(e) ? c = e : b = e + d;
        }
    }
    
    function kg(a, b, c) {
        this.input           = c;
        this.scrollbarFiller = u("div", null, "CodeMirror-scrollbar-filler");
        this.scrollbarFiller.setAttribute("cm-not-content", "true");
        this.gutterFiller = u("div", null, "CodeMirror-gutter-filler");
        this.gutterFiller.setAttribute("cm-not-content", "true");
        this.lineDiv      = Za("div", null, "CodeMirror-code");
        this.selectionDiv = u("div", null,
            null, "position: relative; z-index: 1");
        this.cursorDiv    = u("div", null, "CodeMirror-cursors");
        this.measure      = u("div", null, "CodeMirror-measure");
        this.lineMeasure  = u("div", null, "CodeMirror-measure");
        this.lineSpace    = Za("div", [this.measure, this.lineMeasure, this.selectionDiv, this.cursorDiv, this.lineDiv], null, "position: relative; outline: none");
        var d             = Za("div", [this.lineSpace], "CodeMirror-lines");
        this.mover        = u("div", [d], null, "position: relative");
        this.sizer        = u("div", [this.mover], "CodeMirror-sizer");
        this.sizerWidth   =
            null;
        this.heightForcer = u("div", null, null, "position: absolute; height: 30px; width: 1px;");
        this.gutters      = u("div", null, "CodeMirror-gutters");
        this.lineGutter   = null;
        this.scroller     = u("div", [this.sizer, this.heightForcer, this.gutters], "CodeMirror-scroll");
        this.scroller.setAttribute("tabIndex", "-1");
        this.wrapper = u("div", [this.scrollbarFiller, this.gutterFiller, this.scroller], "CodeMirror");
        B && 8 > D && (
            this.gutters.style.zIndex = -1, this.scroller.style.paddingRight = 0
        );
        P || za && sb || (
            this.scroller.draggable = !0
        );
        a && (
            a.appendChild ?
                a.appendChild(this.wrapper) : a(this.wrapper)
        );
        this.reportedViewFrom  = this.reportedViewTo = this.viewFrom = this.viewTo = b.first;
        this.view              = [];
        this.externalMeasured  = this.renderedView = null;
        this.lastWrapHeight    = this.lastWrapWidth = this.viewOffset = 0;
        this.updateLineNumbers = null;
        this.nativeBarWidth    = this.barHeight = this.barWidth = 0;
        this.scrollbarsClipped = !1;
        this.lineNumWidth      = this.lineNumInnerWidth = this.lineNumChars = null;
        this.alignWidgets      = !1;
        this.maxLine           = this.cachedCharWidth = this.cachedTextHeight = this.cachedPaddingH =
            null;
        this.maxLineLength     = 0;
        this.maxLineChanged    = !1;
        this.wheelDX           = this.wheelDY = this.wheelStartX = this.wheelStartY = null;
        this.shift             = !1;
        this.activeTouch       = this.selForContextMenu = null;
        c.init(this);
    }
    
    function t(a, b) {
        b -= a.first;
        if (0 > b || b >= a.size) throw Error("There is no line " + (
            b + a.first
        ) + " in the document.");
        for (var c = a; !c.lines;) for (var d = 0; ; ++d) {
            var e = c.children[d],
                f = e.chunkSize();
            if (b < f) {
                c = e;
                break;
            }
            b -= f;
        }
        return c.lines[b];
    }
    
    function Ha(a, b, c) {
        var d = [],
            e = b.line;
        a.iter(b.line, c.line + 1, function (a) {
            a = a.text;
            e == c.line &&
            (
                a = a.slice(0, c.ch)
            );
            e == b.line && (
                a = a.slice(b.ch)
            );
            d.push(a);
            ++e;
        });
        return d;
    }
    
    function Sc(a, b, c) {
        var d = [];
        a.iter(b, c, function (a) {d.push(a.text);});
        return d;
    }
    
    function na(a, b) {
        var c = b - a.height;
        if (c) for (var d = a; d; d = d.parent) d.height += c;
    }
    
    function C(a) {
        if (null == a.parent) return null;
        var b = a.parent;
        a     = L(b.lines, a);
        for (var c = b.parent; c; b = c, c = c.parent) for (var d = 0; c.children[d] != b; ++d) a += c.children[d].chunkSize();
        return a + b.first;
    }
    
    function Ia(a, b) {
        var c = a.first;
        a:do {
            for (var d = 0; d < a.children.length; ++d) {
                var e = a.children[d],
                    f = e.height;
                if (b < f) {
                    a = e;
                    continue a;
                }
                b -= f;
                c += e.chunkSize();
            }
            return c;
        } while (!a.lines);
        for (d = 0; d < a.lines.length; ++d) {
            e = a.lines[d].height;
            if (b < e) break;
            b -= e;
        }
        return c + d;
    }
    
    function tb(a, b) {return b >= a.first && b < a.first + a.size;}
    
    function Tc(a, b) {return String(a.lineNumberFormatter(b + a.firstLineNumber));}
    
    function q(a, b, c) {
        void 0 === c && (
            c = null
        );
        if (!(
            this instanceof q
        )) return new q(a, b, c);
        this.line   = a;
        this.ch     = b;
        this.sticky = c;
    }
    
    function x(a, b) {return a.line - b.line || a.ch - b.ch;}
    
    function Uc(a, b) {
        return a.sticky == b.sticky && 0 ==
            x(a, b);
    }
    
    function Vc(a) {return q(a.line, a.ch);}
    
    function ic(a, b) {return 0 > x(a, b) ? b : a;}
    
    function jc(a, b) {return 0 > x(a, b) ? a : b;}
    
    function w(a, b) {
        if (b.line < a.first) return q(a.first, 0);
        var c = a.first + a.size - 1;
        if (b.line > c) return q(c, t(a, c).text.length);
        var c = t(a, b.line).text.length,
            d = b.ch,
            c = null == d || d > c ? q(b.line, c) : 0 > d ? q(b.line, 0) : b;
        return c;
    }
    
    function $d(a, b) {
        for (var c = [], d = 0; d < b.length; d++) c[d] = w(a, b[d]);
        return c;
    }
    
    function kc(a, b, c) {
        this.marker = a;
        this.from   = b;
        this.to     = c;
    }
    
    function ub(a, b) {
        if (a) for (var c = 0; c < a.length; ++c) {
            var d =
                    a[c];
            if (d.marker == b) return d;
        }
    }
    
    function Wc(a, b) {
        if (b.full) return null;
        var c = tb(a, b.from.line) && t(a, b.from.line).markedSpans,
            d = tb(a, b.to.line) && t(a, b.to.line).markedSpans;
        if (!c && !d) return null;
        var e = b.from.ch,
            f = b.to.ch,
            g = 0 == x(b.from, b.to),
            h;
        if (c) for (var k = 0; k < c.length; ++k) {
            var l = c[k],
                m = l.marker;
            if (null == l.from || (
                m.inclusiveLeft ? l.from <= e : l.from < e
            ) || !(
                l.from != e || "bookmark" != m.type || g && l.marker.insertLeft
            )) {
                var p = null == l.to || (
                    m.inclusiveRight ? l.to >= e : l.to > e
                );
                (
                    h || (
                        h = []
                    )
                ).push(new kc(m, l.from, p ? null : l.to));
            }
        }
        var c =
                h,
            n;
        if (d) for (h = 0; h < d.length; ++h) if (k = d[h], l = k.marker, null == k.to || (
            l.inclusiveRight ? k.to >= f : k.to > f
        ) || k.from == f && "bookmark" == l.type && (
            !g || k.marker.insertLeft
        )) m = null == k.from || (
            l.inclusiveLeft ? k.from <= f : k.from < f
        ), (
            n || (
                n = []
            )
        ).push(new kc(l, m ? null : k.from - f, null == k.to ? null : k.to - f));
        d = n;
        f = 1 == b.text.length;
        g = z(b.text).length + (
            f ? e : 0
        );
        if (c) for (n = 0; n < c.length; ++n) if (h = c[n], null == h.to) (
            k = ub(d, h.marker), k
        ) ? f && (
            h.to = null == k.to ? null : k.to + g
        ) : h.to = e;
        if (d) for (e = 0; e < d.length; ++e) n = d[e], null != n.to && (
            n.to += g
        ), null == n.from ?
            ub(c, n.marker) || (
                n.from = g, f && (
                    c || (
                        c = []
                    )
                ).push(n)
            ) : (
                n.from += g, f && (
                    c || (
                        c = []
                    )
                ).push(n)
            );
        c && (
            c = ae(c)
        );
        d && d != c && (
            d = ae(d)
        );
        e = [c];
        if (!f) {
            var f = b.text.length - 2,
                r;
            if (0 < f && c) for (g = 0; g < c.length; ++g) null == c[g].to && (
                r || (
                    r = []
                )
            ).push(new kc(c[g].marker, null, null));
            for (c = 0; c < f; ++c) e.push(r);
            e.push(d);
        }
        return e;
    }
    
    function ae(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            null != c.from && c.from == c.to && !1 !== c.marker.clearWhenEmpty && a.splice(b--, 1);
        }
        return a.length ? a : null;
    }
    
    function lg(a, b, c) {
        var d = null;
        a.iter(b.line, c.line + 1, function (a) {
            if (a.markedSpans) for (var b =
                                            0; b < a.markedSpans.length; ++b) {
                var c = a.markedSpans[b].marker;
                !c.readOnly || d && -1 != L(d, c) || (
                    d || (
                        d = []
                    )
                ).push(c);
            }
        });
        if (!d) return null;
        a = [{
            from: b,
            to  : c
        }];
        for (b = 0; b < d.length; ++b) {
            c = d[b];
            for (var e = c.find(0), f = 0; f < a.length; ++f) {
                var g = a[f];
                if (!(
                    0 > x(g.to, e.from) || 0 < x(g.from, e.to)
                )) {
                    var h = [f, 1],
                        k = x(g.from, e.from),
                        l = x(g.to, e.to);
                    (
                        0 > k || !c.inclusiveLeft && !k
                    ) && h.push({
                        from: g.from,
                        to  : e.from
                    });
                    (
                        0 < l || !c.inclusiveRight && !l
                    ) && h.push({
                        from: e.to,
                        to  : g.to
                    });
                    a.splice.apply(a, h);
                    f += h.length - 3;
                }
            }
        }
        return a;
    }
    
    function be(a) {
        var b =
                a.markedSpans;
        if (b) {
            for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
            a.markedSpans = null;
        }
    }
    
    function ce(a, b) {
        if (b) {
            for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
            a.markedSpans = b;
        }
    }
    
    function Xc(a, b) {
        var c = a.lines.length - b.lines.length;
        if (0 != c) return c;
        var c = a.find(),
            d = b.find(),
            e = x(c.from, d.from) || (
                a.inclusiveLeft ? -1 : 0
            ) - (
                b.inclusiveLeft ? -1 : 0
            );
        return e ? -e : (
            c = x(c.to, d.to) || (
                a.inclusiveRight ? 1 : 0
            ) - (
                b.inclusiveRight ? 1 : 0
            )
        ) ? c : b.id - a.id;
    }
    
    function $a(a, b) {
        var c = ua && a.markedSpans,
            d;
        if (c) for (var e = void 0,
                        f = 0; f < c.length; ++f) e = c[f], e.marker.collapsed && null == (
            b ? e.from : e.to
        ) && (
            !d || 0 > Xc(d, e.marker)
        ) && (
            d = e.marker
        );
        return d;
    }
    
    function de(a, b, c, d, e) {
        a = t(a, b);
        if (a = ua && a.markedSpans) for (b = 0; b < a.length; ++b) {
            var f = a[b];
            if (f.marker.collapsed) {
                var g = f.marker.find(0),
                    h = x(g.from, c) || (
                        f.marker.inclusiveLeft ? -1 : 0
                    ) - (
                        e.inclusiveLeft ? -1 : 0
                    ),
                    k = x(g.to, d) || (
                        f.marker.inclusiveRight ? 1 : 0
                    ) - (
                        e.inclusiveRight ? 1 : 0
                    );
                if (!(
                    0 <= h && 0 >= k || 0 >= h && 0 <= k
                ) && (
                    0 >= h && (
                        f.marker.inclusiveRight && e.inclusiveLeft ? 0 <= x(g.to, c) : 0 < x(g.to, c)
                    ) || 0 <= h && (
                        f.marker.inclusiveRight &&
                        e.inclusiveLeft ? 0 >= x(g.from, d) : 0 > x(g.from, d)
                    )
                )) return !0;
            }
        }
    }
    
    function oa(a) {
        for (var b; b = $a(a, !0);) a = b.find(-1, !0).line;
        return a;
    }
    
    function Yc(a, b) {
        var c = t(a, b),
            d = oa(c);
        return c == d ? b : C(d);
    }
    
    function ee(a, b) {
        if (b > a.lastLine()) return b;
        var c = t(a, b),
            d;
        if (!Ja(a, c)) return b;
        for (; d = $a(c, !1);) c = d.find(1, !0).line;
        return C(c) + 1;
    }
    
    function Ja(a, b) {
        var c = ua && b.markedSpans;
        if (c) for (var d = void 0, e = 0; e < c.length; ++e) if (d = c[e], d.marker.collapsed && (
            null == d.from || !d.marker.widgetNode && 0 == d.from && d.marker.inclusiveLeft && Zc(a,
            b, d)
        )) return !0;
    }
    
    function Zc(a, b, c) {
        if (null == c.to) return b = c.marker.find(1, !0), Zc(a, b.line, ub(b.line.markedSpans, c.marker));
        if (c.marker.inclusiveRight && c.to == b.text.length) return !0;
        for (var d = void 0, e = 0; e < b.markedSpans.length; ++e) if (d = b.markedSpans[e], d.marker.collapsed && !d.marker.widgetNode && d.from == c.to && (
            null == d.to || d.to != c.from
        ) && (
            d.marker.inclusiveLeft || c.marker.inclusiveRight
        ) && Zc(a, b, d)) return !0;
    }
    
    function pa(a) {
        a = oa(a);
        for (var b = 0, c = a.parent, d = 0; d < c.lines.length; ++d) {
            var e = c.lines[d];
            if (e == a) break;
            else b += e.height;
        }
        for (a = c.parent; a; c = a, a = c.parent) for (d = 0; d < a.children.length && (
            e = a.children[d], e != c
        ); ++d) b += e.height;
        return b;
    }
    
    function lc(a) {
        if (0 == a.height) return 0;
        for (var b = a.text.length, c, d = a; c = $a(d, !0);) c = c.find(0, !0), d = c.from.line, b += c.from.ch - c.to.ch;
        for (d = a; c = $a(d, !1);) a = c.find(0, !0), b -= d.text.length - a.from.ch, d = a.to.line, b += d.text.length - a.to.ch;
        return b;
    }
    
    function $c(a) {
        var b            = a.display;
        a                = a.doc;
        b.maxLine        = t(a, a.first);
        b.maxLineLength  = lc(b.maxLine);
        b.maxLineChanged = !0;
        a.iter(function (a) {
            var d =
                    lc(a);
            d > b.maxLineLength && (
                b.maxLineLength = d, b.maxLine = a
            );
        });
    }
    
    function mg(a, b, c, d) {
        if (!a) return d(b, c, "ltr", 0);
        for (var e = !1, f = 0; f < a.length; ++f) {
            var g = a[f];
            if (g.from < c && g.to > b || b == c && g.to == b) d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr", f), e = !0;
        }
        e || d(b, c, "ltr");
    }
    
    function vb(a, b, c) {
        var d;
        wb = null;
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f.from < b && f.to > b) return e;
            f.to == b && (
                f.from != f.to && "before" == c ? d = e : wb = e
            );
            f.from == b && (
                f.from != f.to && "before" != c ? d = e : wb = e
            );
        }
        return null != d ? d : wb;
    }
    
    function va(a,
                b) {
        var c = a.order;
        null == c && (
            c = a.order = ng(a.text, b)
        );
        return c;
    }
    
    function ba(a, b, c) {
        if (a.removeEventListener) a.removeEventListener(b, c, !1); else if (a.detachEvent) a.detachEvent("on" + b, c); else {
            var d = (
                a = a._handlers
            ) && a[b];
            d && (
                c = L(d, c), -1 < c && (
                    a[b] = d.slice(0, c).concat(d.slice(c + 1))
                )
            );
        }
    }
    
    function F(a, b) {
        var c = a._handlers && a._handlers[b] || mc;
        if (c.length) for (var d = Array.prototype.slice.call(arguments, 2), e = 0; e < c.length; ++e) c[e].apply(null, d);
    }
    
    function I(a, b, c) {
        "string" == typeof b && (
            b = {
                type          : b,
                preventDefault: function () {
                    this.defaultPrevented =
                        !0;
                }
            }
        );
        F(a, c || b.type, a, b);
        return ad(b) || b.codemirrorIgnore;
    }
    
    function fe(a) {
        var b = a._handlers && a._handlers.cursorActivity;
        if (b) {
            a = a.curOp.cursorActivityHandlers || (
                a.curOp.cursorActivityHandlers = []
            );
            for (var c = 0; c < b.length; ++c) -1 == L(a, b[c]) && a.push(b[c]);
        }
    }
    
    function ga(a, b) {
        return 0 < (
            a._handlers && a._handlers[b] || mc
        ).length;
    }
    
    function ab(a) {
        a.prototype.on  = function (a, c) {v(this, a, c);};
        a.prototype.off = function (a, c) {ba(this, a, c);};
    }
    
    function T(a) {a.preventDefault ? a.preventDefault() : a.returnValue = !1;}
    
    function ge(a) {
        a.stopPropagation ?
            a.stopPropagation() : a.cancelBubble = !0;
    }
    
    function ad(a) {return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue;}
    
    function xb(a) {
        T(a);
        ge(a);
    }
    
    function he(a) {
        var b = a.which;
        null == b && (
            a.button & 1 ? b = 1 : a.button & 2 ? b = 3 : a.button & 4 && (
                b = 2
            )
        );
        ia && a.ctrlKey && 1 == b && (
            b = 3
        );
        return b;
    }
    
    function og(a) {
        if (null == bd) {
            var b = u("span", "​");
            aa(a, u("span", [b, document.createTextNode("x")]));
            0 != a.firstChild.offsetHeight && (
                bd = 1 >= b.offsetWidth && 2 < b.offsetHeight && !(
                    B && 8 > D
                )
            );
        }
        a = bd ? u("span", "​") : u("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        a.setAttribute("cm-text", "");
        return a;
    }
    
    function pg(a, b) {
        2 < arguments.length && (
            b.dependencies = Array.prototype.slice.call(arguments, 2)
        );
        cd[a] = b;
    }
    
    function nc(a) {
        if ("string" == typeof a && bb.hasOwnProperty(a)) a = bb[a]; else if (a && "string" == typeof a.name && bb.hasOwnProperty(a.name)) {
            var b = bb[a.name];
            "string" == typeof b && (
                b = {name: b}
            );
            a      = Xd(b, a);
            a.name = b.name;
        } else {
            if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a)) return nc("application/xml");
            if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+json$/.test(a)) return nc("application/json");
        }
        return "string" ==
        typeof a ? {name: a} : a || {name: "null"};
    }
    
    function dd(a, b) {
        b     = nc(b);
        var c = cd[b.name];
        if (!c) return dd(a, "text/plain");
        c = c(a, b);
        if (cb.hasOwnProperty(b.name)) {
            var d = cb[b.name],
                e;
            for (e in d) d.hasOwnProperty(e) && (
                c.hasOwnProperty(e) && (
                    c["_" + e] = c[e]
                ), c[e] = d[e]
            );
        }
        c.name = b.name;
        b.helperType && (
            c.helperType = b.helperType
        );
        if (b.modeProps) for (var f in b.modeProps) c[f] = b.modeProps[f];
        return c;
    }
    
    function qg(a, b) {
        var c = cb.hasOwnProperty(a) ? cb[a] : cb[a] = {};
        Ga(b, c);
    }
    
    function Ka(a, b) {
        if (!0 === b) return b;
        if (a.copyState) return a.copyState(b);
        var c = {},
            d;
        for (d in b) {
            var e = b[d];
            e instanceof Array && (
                e = e.concat([])
            );
            c[d] = e;
        }
        return c;
    }
    
    function ed(a, b) {
        for (var c; a.innerMode;) {
            c = a.innerMode(b);
            if (!c || c.mode == a) break;
            b = c.state;
            a = c.mode;
        }
        return c || {
            mode : a,
            state: b
        };
    }
    
    function ie(a, b, c) {return a.startState ? a.startState(b, c) : !0;}
    
    function je(a, b, c, d) {
        var e = [a.state.modeGen],
            f = {};
        ke(a, b.text, a.doc.mode, c, function (a, b) {return e.push(a, b);}, f, d);
        var g = c.state;
        d     = function (d) {
            c.baseTokens = e;
            var h = a.state.overlays[d],
                m = 1,
                p = 0;
            c.state = !0;
            ke(a, b.text, h.mode, c, function (a,
                                               b) {
                for (var c = m; p < a;) {
                    var d = e[m];
                    d > a && e.splice(m, 1, a, e[m + 1], d);
                    m += 2;
                    p = Math.min(a, d);
                }
                if (b) if (h.opaque) e.splice(c, m - c, a, "overlay " + b), m = c + 2; else for (; c < m; c += 2) d = e[c + 1], e[c + 1] = (
                    d ? d + " " : ""
                ) + "overlay " + b;
            }, f);
            c.state        = g;
            c.baseTokens   = null;
            c.baseTokenPos = 1;
        };
        for (var h = 0; h < a.state.overlays.length; ++h) d(h);
        return {
            styles : e,
            classes: f.bgClass || f.textClass ? f : null
        };
    }
    
    function le(a, b, c) {
        if (!b.styles || b.styles[0] != a.state.modeGen) {
            var d = yb(a, C(b)),
                e = b.text.length > a.options.maxHighlightLength && Ka(a.doc.mode, d.state),
                f =
                    je(a, b, d);
            e && (
                d.state = e
            );
            b.stateAfter = d.save(!e);
            b.styles     = f.styles;
            f.classes ? b.styleClasses = f.classes : b.styleClasses && (
                b.styleClasses = null
            );
            c === a.doc.highlightFrontier && (
                a.doc.modeFrontier = Math.max(a.doc.modeFrontier, ++a.doc.highlightFrontier)
            );
        }
        return b.styles;
    }
    
    function yb(a, b, c) {
        var d = a.doc,
            e = a.display;
        if (!d.mode.startState) return new qa(d, !0, b);
        var f = rg(a, b, c),
            g = f > d.first && t(d, f - 1).stateAfter,
            h = g ? qa.fromSaved(d, g, f) : new qa(d, ie(d.mode), f);
        d.iter(f, b, function (c) {
            fd(a, c.text, h);
            var d        = h.line;
            c.stateAfter =
                d == b - 1 || 0 == d % 5 || d >= e.viewFrom && d < e.viewTo ? h.save() : null;
            h.nextLine();
        });
        c && (
            d.modeFrontier = h.line
        );
        return h;
    }
    
    function fd(a, b, c, d) {
        var e   = a.doc.mode;
        a       = new G(b, a.options.tabSize, c);
        a.start = a.pos = d || 0;
        for ("" == b && me(e, c.state); !a.eol();) gd(e, a, c.state), a.start = a.pos;
    }
    
    function me(a, b) {
        if (a.blankLine) return a.blankLine(b);
        if (a.innerMode) {
            var c = ed(a, b);
            if (c.mode.blankLine) return c.mode.blankLine(c.state);
        }
    }
    
    function gd(a, b, c, d) {
        for (var e = 0; 10 > e; e++) {
            d && (
                d[0] = ed(a, c).mode
            );
            var f = a.token(b, c);
            if (b.pos > b.start) return f;
        }
        throw Error("Mode " +
            a.name + " failed to advance stream.");
    }
    
    function ne(a, b, c, d) {
        var e = a.doc,
            f = e.mode,
            g;
        b = w(e, b);
        var h = t(e, b.line);
        c = yb(a, b.line, c);
        a = new G(h.text, a.options.tabSize, c);
        var k;
        for (d && (
            k = []
        ); (
                 d || a.pos < b.ch
             ) && !a.eol();) a.start = a.pos, g = gd(f, a, c.state), d && k.push(new oe(a, g, Ka(e.mode, c.state)));
        return d ? k : new oe(a, g, c.state);
    }
    
    function pe(a, b) {
        if (a) for (; ;) {
            var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!c) break;
            a     = a.slice(0, c.index) + a.slice(c.index + c[0].length);
            var d = c[1] ? "bgClass" : "textClass";
            null == b[d] ?
                b[d] = c[2] : (
                new RegExp("(?:^|s)" + c[2] + "(?:$|s)")
            ).test(b[d]) || (
                b[d] += " " + c[2]
            );
        }
        return a;
    }
    
    function ke(a, b, c, d, e, f, g) {
        var h = c.flattenSpans;
        null == h && (
            h = a.options.flattenSpans
        );
        var k = 0,
            l = null,
            m = new G(b, a.options.tabSize, d),
            p,
            n = a.options.addModeClass && [null];
        for ("" == b && pe(me(c, d.state), f); !m.eol();) {
            m.pos > a.options.maxHighlightLength ? (
                h = !1, g && fd(a, b, d, m.pos), m.pos = b.length, p = null
            ) : p = pe(gd(c, m, d.state, n), f);
            if (n) {
                var r = n[0].name;
                r && (
                    p = "m-" + (
                        p ? r + " " + p : r
                    )
                );
            }
            if (!h || l != p) {
                for (; k < m.start;) k = Math.min(m.start, k +
                    5E3), e(k, l);
                l = p;
            }
            m.start = m.pos;
        }
        for (; k < m.pos;) a = Math.min(m.pos, k + 5E3), e(a, l), k = a;
    }
    
    function rg(a, b, c) {
        for (var d, e, f = a.doc, g = c ? -1 : b - (
            a.doc.mode.innerMode ? 1E3 : 100
        ); b > g; --b) {
            if (b <= f.first) return f.first;
            var h = t(f, b - 1),
                k = h.stateAfter;
            if (k && (
                !c || b + (
                    k instanceof oc ? k.lookAhead : 0
                ) <= f.modeFrontier
            )) return b;
            h = fa(h.text, null, a.options.tabSize);
            if (null == e || d > h) e = b - 1, d = h;
        }
        return e;
    }
    
    function sg(a, b) {
        a.modeFrontier = Math.min(a.modeFrontier, b);
        if (!(
            a.highlightFrontier < b - 10
        )) {
            for (var c = a.first, d = b - 1; d > c; d--) {
                var e = t(a,
                    d).stateAfter;
                if (e && (
                    !(
                        e instanceof oc
                    ) || d + e.lookAhead < b
                )) {
                    c = d + 1;
                    break;
                }
            }
            a.highlightFrontier = Math.min(a.highlightFrontier, c);
        }
    }
    
    function qe(a, b) {
        if (!a || /^\s*$/.test(a)) return null;
        var c = b.addModeClass ? tg : ug;
        return c[a] || (
            c[a] = a.replace(/\S+/g, "cm-$\x26")
        );
    }
    
    function re(a, b) {
        var c = Za("span", null, null, P ? "padding-right: .1px" : null),
            c = {
                pre: Za("pre", [c], "CodeMirror-line"),
                content: c,
                col: 0,
                pos: 0,
                cm: a,
                trailingSpace: !1,
                splitSpaces: (
                    B || P
                ) && a.getOption("lineWrapping")
            };
        b.measure = {};
        for (var d = 0; d <= (
            b.rest ? b.rest.length :
                0
        ); d++) {
            var e = d ? b.rest[d - 1] : b.line,
                f = void 0;
            c.pos = 0;
            c.addToken = vg;
            var g;
            g = a.display.measure;
            if (null != hd) g = hd; else {
                var h = aa(g, document.createTextNode("AخA")),
                    k = db(h, 0, 1).getBoundingClientRect(),
                    h = db(h, 1, 2).getBoundingClientRect();
                W(g);
                g = k && k.left != k.right ? hd = 3 > h.right - k.right : !1;
            }
            g && (
                f = va(e, a.doc.direction)
            ) && (
                c.addToken = wg(c.addToken, f)
            );
            c.map = [];
            g     = b != a.display.externalMeasured && C(e);
            a:{
                f = c;
                g = le(a, e, g);
                var l = e.markedSpans,
                    k = e.text,
                    h = 0;
                if (l) for (var m = k.length, p = 0, n = 1, r = "", X = void 0, q = void 0, t = 0, u = void 0,
                                v                                                                    = void 0, x = void 0, w = void 0, Q = void 0; ;) {
                    if (t == p) {
                        for (var u = v = x = w = q = "", Q = null, t = Infinity, A = [], Y = void 0, z = 0; z < l.length; ++z) {
                            var M = l[z],
                                y = M.marker;
                            "bookmark" == y.type && M.from == p && y.widgetNode ? A.push(y) : M.from <= p && (
                                null == M.to || M.to > p || y.collapsed && M.to == p && M.from == p
                            ) ? (
                                null != M.to && M.to != p && t > M.to && (
                                    t = M.to, v = ""
                                ), y.className && (
                                    u += " " + y.className
                                ), y.css && (
                                    q = (
                                        q ? q + ";" : ""
                                    ) + y.css
                                ), y.startStyle && M.from == p && (
                                    x += " " + y.startStyle
                                ), y.endStyle && M.to == t && (
                                    Y || (
                                        Y = []
                                    )
                                ).push(y.endStyle, M.to), y.title && !w && (
                                    w = y.title
                                ), y.collapsed &&
                                (
                                    !Q || 0 > Xc(Q.marker, y)
                                ) && (
                                    Q = M
                                )
                            ) : M.from > p && t > M.from && (
                                t = M.from
                            );
                        }
                        if (Y) for (z = 0; z < Y.length; z += 2) Y[z + 1] == t && (
                            v += " " + Y[z]
                        );
                        if (!Q || Q.from == p) for (Y = 0; Y < A.length; ++Y) se(f, 0, A[Y]);
                        if (Q && (
                            Q.from || 0
                        ) == p) {
                            se(f, (
                                null == Q.to ? m + 1 : Q.to
                            ) - p, Q.marker, null == Q.from);
                            if (null == Q.to) break a;
                            Q.to == p && (
                                Q = !1
                            );
                        }
                    }
                    if (p >= m) break;
                    for (A = Math.min(m, t); ;) {
                        if (r) {
                            Y = p + r.length;
                            Q || (
                                z = Y > A ? r.slice(0, A - p) : r, f.addToken(f, z, X ? X + u : u, x, p + z.length == t ? v : "", w, q)
                            );
                            if (Y >= A) {
                                r = r.slice(A - p);
                                p = A;
                                break;
                            }
                            p = Y;
                            x = "";
                        }
                        r = k.slice(h, h = g[n++]);
                        X = qe(g[n++], f.cm.options);
                    }
                } else for (l =
                                1; l < g.length; l += 2) f.addToken(f, k.slice(h, h = g[l]), qe(g[l + 1], f.cm.options));
            }
            e.styleClasses && (
                e.styleClasses.bgClass && (
                    c.bgClass = Mc(e.styleClasses.bgClass, c.bgClass || "")
                ), e.styleClasses.textClass && (
                    c.textClass = Mc(e.styleClasses.textClass, c.textClass || "")
                )
            );
            0 == c.map.length && c.map.push(0, 0, c.content.appendChild(og(a.display.measure)));
            0 == d ? (
                b.measure.map = c.map, b.measure.cache = {}
            ) : (
                (
                    b.measure.maps || (
                        b.measure.maps = []
                    )
                ).push(c.map), (
                    b.measure.caches || (
                        b.measure.caches = []
                    )
                ).push({})
            );
        }
        P && (
            d = c.content.lastChild,
            /\bcm-tab\b/.test(d.className) || d.querySelector && d.querySelector(".cm-tab")
        ) && (
            c.content.className = "cm-tab-wrap-hack"
        );
        F(a, "renderLine", a, b.line, c.pre);
        c.pre.className && (
            c.textClass = Mc(c.pre.className, c.textClass || "")
        );
        return c;
    }
    
    function xg(a) {
        var b   = u("span", "•", "cm-invalidchar");
        b.title = "\\u" + a.charCodeAt(0).toString(16);
        b.setAttribute("aria-label", b.title);
        return b;
    }
    
    function vg(a, b, c, d, e, f, g) {
        if (b) {
            var h;
            if (a.splitSpaces) if (h = a.trailingSpace, 1 < b.length && !/  /.test(b)) h = b; else {
                for (var k = "", l = 0; l < b.length; l++) {
                    var m =
                            b.charAt(l);
                    " " != m || !h || l != b.length - 1 && 32 != b.charCodeAt(l + 1) || (
                        m = " "
                    );
                    k += m;
                    h = " " == m;
                }
                h = k;
            } else h = b;
            k = h;
            l = a.cm.state.specialChars;
            m = !1;
            if (l.test(b)) {
                h = document.createDocumentFragment();
                for (var p = 0; ;) {
                    l.lastIndex = p;
                    var n = l.exec(b),
                        r = n ? n.index - p : b.length - p;
                    if (r) {
                        var X = document.createTextNode(k.slice(p, p + r));
                        B && 9 > D ? h.appendChild(u("span", [X])) : h.appendChild(X);
                        a.map.push(a.pos, a.pos + r, X);
                        a.col += r;
                        a.pos += r;
                    }
                    if (!n) break;
                    p += r + 1;
                    r = void 0;
                    "\t" == n[0] ? (
                        n = a.cm.options.tabSize, n -= a.col % n, r = h.appendChild(u("span",
                            Pc(n), "cm-tab")), r.setAttribute("role", "presentation"), r.setAttribute("cm-text", "\t"), a.col += n
                    ) : (
                        "\r" == n[0] || "\n" == n[0] ? (
                            r = h.appendChild(u("span", "\r" == n[0] ? "␍" : "␤", "cm-invalidchar")), r.setAttribute("cm-text", n[0])
                        ) : (
                            r = a.cm.options.specialCharPlaceholder(n[0]), r.setAttribute("cm-text", n[0]), B && 9 > D ? h.appendChild(u("span", [r])) : h.appendChild(r)
                        ), a.col += 1
                    );
                    a.map.push(a.pos, a.pos + 1, r);
                    a.pos++;
                }
            } else a.col += b.length, h = document.createTextNode(k), a.map.push(a.pos, a.pos + b.length, h), B && 9 > D && (
                m = !0
            ), a.pos += b.length;
            a.trailingSpace = 32 == k.charCodeAt(b.length - 1);
            if (c || d || e || m || g) return b = c || "", d && (
                b += d
            ), e && (
                b += e
            ), d = u("span", [h], b, g), f && (
                d.title = f
            ), a.content.appendChild(d);
            a.content.appendChild(h);
        }
    }
    
    function wg(a, b) {
        return function (c, d, e, f, g, h, k) {
            e = e ? e + " cm-force-border" : "cm-force-border";
            for (var l = c.pos, m = l + d.length; ;) {
                for (var p = void 0, n = 0; n < b.length && !(
                    p = b[n], p.to > l && p.from <= l
                ); n++) ;
                if (p.to >= m) return a(c, d, e, f, g, h, k);
                a(c, d.slice(0, p.to - l), e, f, null, h, k);
                f = null;
                d = d.slice(p.to - l);
                l = p.to;
            }
        };
    }
    
    function se(a, b, c, d) {
        var e =
                !d && c.widgetNode;
        e && a.map.push(a.pos, a.pos + b, e);
        !d && a.cm.display.input.needsContentAttribute && (
            e || (
                e = a.content.appendChild(document.createElement("span"))
            ), e.setAttribute("cm-marker", c.id)
        );
        e && (
            a.cm.display.input.setUneditable(e), a.content.appendChild(e)
        );
        a.pos += b;
        a.trailingSpace = !1;
    }
    
    function te(a, b, c) {
        for (var d = this.line = b, e; d = $a(d, !1);) d = d.find(1, !0).line, (
            e || (
                e = []
            )
        ).push(d);
        this.size   = (
            this.rest = e
        ) ? C(z(this.rest)) - c + 1 : 1;
        this.node   = this.text = null;
        this.hidden = Ja(a, b);
    }
    
    function pc(a, b, c) {
        var d = [],
            e;
        for (e =
                 b; e < c;) b = new te(a.doc, t(a.doc, e), e), e += b.size, d.push(b);
        return d;
    }
    
    function yg(a, b) {
        var c = a.ownsGroup;
        if (c) try {
            var d = c.delayedCallbacks,
                e = 0;
            do {
                for (; e < d.length; e++) d[e].call(null);
                for (var f = 0; f < c.ops.length; f++) {
                    var g = c.ops[f];
                    if (g.cursorActivityHandlers) for (; g.cursorActivityCalled < g.cursorActivityHandlers.length;) g.cursorActivityHandlers[g.cursorActivityCalled++].call(null, g.cm);
                }
            } while (e < d.length);
        } finally {eb = null, b(c);}
    }
    
    function N(a, b) {
        var c = a._handlers && a._handlers[b] || mc;
        if (c.length) {
            var d = Array.prototype.slice.call(arguments,
                2),
                e;
            eb ? e = eb.delayedCallbacks : zb ? e = zb : (
                e = zb = [], setTimeout(zg, 0)
            );
            for (var f = function (a) {e.push(function () {return c[a].apply(null, d);});}, g = 0; g < c.length; ++g) f(g);
        }
    }
    
    function zg() {
        var a = zb;
        zb    = null;
        for (var b = 0; b < a.length; ++b) a[b]();
    }
    
    function ue(a, b, c, d) {
        for (var e = 0; e < b.changes.length; e++) {
            var f = b.changes[e];
            if ("text" == f) {
                var f = a,
                    g = b,
                    h = g.text.className,
                    k = ve(f, g);
                g.text == g.node && (
                    g.node = k.pre
                );
                g.text.parentNode.replaceChild(k.pre, g.text);
                g.text = k.pre;
                k.bgClass != g.bgClass || k.textClass != g.textClass ? (
                    g.bgClass =
                        k.bgClass, g.textClass = k.textClass, id(f, g)
                ) : h && (
                    g.text.className = h
                );
            } else if ("gutter" == f) we(a, b, c, d); else if ("class" == f) id(a, b); else if ("widget" == f) {
                f = a;
                g = b;
                h = d;
                g.alignable && (
                    g.alignable = null
                );
                for (var k = g.node.firstChild, l = void 0; k; k = l) l = k.nextSibling, "CodeMirror-linewidget" == k.className && g.node.removeChild(k);
                xe(f, g, h);
            }
        }
        b.changes = null;
    }
    
    function Ab(a) {
        a.node == a.text && (
            a.node = u("div", null, null, "position: relative"), a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text), a.node.appendChild(a.text),
            B && 8 > D && (
                a.node.style.zIndex = 2
            )
        );
        return a.node;
    }
    
    function ve(a, b) {
        var c = a.display.externalMeasured;
        return c && c.line == b.line ? (
            a.display.externalMeasured = null, b.measure = c.measure, c.built
        ) : re(a, b);
    }
    
    function id(a, b) {
        var c = b.bgClass ? b.bgClass + " " + (
            b.line.bgClass || ""
        ) : b.line.bgClass;
        c && (
            c += " CodeMirror-linebackground"
        );
        if (b.background) c ? b.background.className = c : (
            b.background.parentNode.removeChild(b.background), b.background = null
        ); else if (c) {
            var d        = Ab(b);
            b.background = d.insertBefore(u("div", null, c), d.firstChild);
            a.display.input.setUneditable(b.background);
        }
        b.line.wrapClass ? Ab(b).className = b.line.wrapClass : b.node != b.text && (
            b.node.className = ""
        );
        b.text.className = (
            b.textClass ? b.textClass + " " + (
                b.line.textClass || ""
            ) : b.line.textClass
        ) || "";
    }
    
    function we(a, b, c, d) {
        b.gutter && (
            b.node.removeChild(b.gutter), b.gutter = null
        );
        b.gutterBackground && (
            b.node.removeChild(b.gutterBackground), b.gutterBackground = null
        );
        if (b.line.gutterClass) {
            var e              = Ab(b);
            b.gutterBackground = u("div", null, "CodeMirror-gutter-background " + b.line.gutterClass,
                "left: " + (
                    a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth
                ) + "px; width: " + d.gutterTotalWidth + "px");
            a.display.input.setUneditable(b.gutterBackground);
            e.insertBefore(b.gutterBackground, b.text);
        }
        e = b.line.gutterMarkers;
        if (a.options.lineNumbers || e) {
            var f = Ab(b),
                g = b.gutter = u("div", null, "CodeMirror-gutter-wrapper", "left: " + (
                    a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth
                ) + "px");
            a.display.input.setUneditable(g);
            f.insertBefore(g, b.text);
            b.line.gutterClass && (
                g.className += " " + b.line.gutterClass
            );
            !a.options.lineNumbers ||
            e && e["CodeMirror-linenumbers"] || (
                b.lineNumber = g.appendChild(u("div", Tc(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px"))
            );
            if (e) for (b = 0; b < a.options.gutters.length; ++b) c = a.options.gutters[b], (
                f = e.hasOwnProperty(c) && e[c]
            ) && g.appendChild(u("div", [f], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[c] + "px; width: " + d.gutterWidth[c] + "px"));
        }
    }
    
    function Ag(a, b, c, d) {
        var e  = ve(a, b);
        b.text = b.node = e.pre;
        e.bgClass &&
        (
            b.bgClass = e.bgClass
        );
        e.textClass && (
            b.textClass = e.textClass
        );
        id(a, b);
        we(a, b, c, d);
        xe(a, b, d);
        return b.node;
    }
    
    function xe(a, b, c) {
        ye(a, b.line, b, c, !0);
        if (b.rest) for (var d = 0; d < b.rest.length; d++) ye(a, b.rest[d], b, c, !1);
    }
    
    function ye(a, b, c, d, e) {
        if (b.widgets) {
            var f = Ab(c),
                g = 0;
            for (b = b.widgets; g < b.length; ++g) {
                var h = b[g],
                    k = u("div", [h.node], "CodeMirror-linewidget");
                h.handleMouseEvents || k.setAttribute("cm-ignore-events", "true");
                var l = h,
                    m = k,
                    p = d;
                if (l.noHScroll) {
                    (
                        c.alignable || (
                            c.alignable = []
                        )
                    ).push(m);
                    var n        = p.wrapperWidth;
                    m.style.left = p.fixedPos + "px";
                    l.coverGutter || (
                        n -= p.gutterTotalWidth, m.style.paddingLeft = p.gutterTotalWidth + "px"
                    );
                    m.style.width = n + "px";
                }
                l.coverGutter && (
                    m.style.zIndex = 5, m.style.position = "relative", l.noHScroll || (
                        m.style.marginLeft = -p.gutterTotalWidth + "px"
                    )
                );
                a.display.input.setUneditable(k);
                e && h.above ? f.insertBefore(k, c.gutter || c.text) : f.appendChild(k);
                N(h, "redraw");
            }
        }
    }
    
    function Bb(a) {
        if (null != a.height) return a.height;
        var b = a.doc.cm;
        if (!b) return 0;
        if (!ya(document.body, a.node)) {
            var c = "position: relative;";
            a.coverGutter && (
                c += "margin-left: -" + b.display.gutters.offsetWidth + "px;"
            );
            a.noHScroll && (
                c += "width: " + b.display.wrapper.clientWidth + "px;"
            );
            aa(b.display.measure, u("div", [a.node], null, c));
        }
        return a.height = a.node.parentNode.offsetHeight;
    }
    
    function wa(a, b) {for (var c = b.target || b.srcElement; c != a.wrapper; c = c.parentNode) if (!c || 1 == c.nodeType && "true" == c.getAttribute("cm-ignore-events") || c.parentNode == a.sizer && c != a.mover) return !0;}
    
    function jd(a) {return a.mover.offsetHeight - a.lineSpace.offsetHeight;}
    
    function ze(a) {
        if (a.cachedPaddingH) return a.cachedPaddingH;
        var b = aa(a.measure, u("pre", "x")),
            b = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle,
            b = {
                left: parseInt(b.paddingLeft),
                right: parseInt(b.paddingRight)
            };
        isNaN(b.left) || isNaN(b.right) || (
            a.cachedPaddingH = b
        );
        return b;
    }
    
    function ra(a) {return 30 - a.display.nativeBarWidth;}
    
    function La(a) {return a.display.scroller.clientWidth - ra(a) - a.display.barWidth;}
    
    function kd(a) {return a.display.scroller.clientHeight - ra(a) - a.display.barHeight;}
    
    function Ae(a, b, c) {
        if (a.line == b) return {
            map  : a.measure.map,
            cache: a.measure.cache
        };
        for (var d = 0; d < a.rest.length; d++) if (a.rest[d] == b) return {
            map  : a.measure.maps[d],
            cache: a.measure.caches[d]
        };
        for (b = 0; b < a.rest.length; b++) if (C(a.rest[b]) > c) return {
            map   : a.measure.maps[b],
            cache : a.measure.caches[b],
            before: !0
        };
    }
    
    function ld(a, b) {
        if (b >= a.display.viewFrom && b < a.display.viewTo) return a.display.view[Ma(a, b)];
        var c = a.display.externalMeasured;
        if (c && b >= c.lineN && b < c.lineN + c.size) return c;
    }
    
    function Na(a, b) {
        var c = C(b),
            d = ld(a, c);
        d && !d.text ? d = null : d && d.changes && (
            ue(a, d, c, md(a)), a.curOp.forceUpdate = !0
        );
        if (!d) {
            var e;
            e       = oa(b);
            d       = C(e);
            e       = a.display.externalMeasured = new te(a.doc, e, d);
            e.lineN = d;
            d       = e.built = re(a, e);
            e.text  = d.pre;
            aa(a.display.lineMeasure, d.pre);
            d = e;
        }
        c = Ae(d, b, c);
        return {
            line      : b,
            view      : d,
            rect      : null,
            map       : c.map,
            cache     : c.cache,
            before    : c.before,
            hasHeights: !1
        };
    }
    
    function ja(a, b, c, d, e) {
        b.before && (
            c = -1
        );
        var f = c + (
            d || ""
        );
        if (b.cache.hasOwnProperty(f)) a = b.cache[f]; else {
            b.rect || (
                b.rect = b.view.text.getBoundingClientRect()
            );
            if (!b.hasHeights) {
                var g = b.view,
                    h = b.rect,
                    k = a.options.lineWrapping,
                    l = k && La(a);
                if (!g.measure.heights || k && g.measure.width !=
                    l) {
                    var m = g.measure.heights = [];
                    if (k) for (g.measure.width = l, g = g.text.firstChild.getClientRects(), k = 0; k < g.length - 1; k++) {
                        var l = g[k],
                            p = g[k + 1];
                        2 < Math.abs(l.bottom - p.bottom) && m.push((
                            l.bottom + p.top
                        ) / 2 - h.top);
                    }
                    m.push(h.bottom - h.top);
                }
                b.hasHeights = !0;
            }
            m = d;
            g = Be(b.map, c, m);
            d = g.node;
            h = g.start;
            k = g.end;
            c = g.collapse;
            var n;
            if (3 == d.nodeType) {
                for (var r = 0; 4 > r; r++) {
                    for (; h && Rc(b.line.text.charAt(g.coverStart + h));) --h;
                    for (; g.coverStart + k < g.coverEnd && Rc(b.line.text.charAt(g.coverStart + k));) ++k;
                    if (B && 9 > D && 0 == h && k == g.coverEnd -
                        g.coverStart) n = d.parentNode.getBoundingClientRect(); else {
                        n = db(d, h, k).getClientRects();
                        k = Ce;
                        if ("left" == m) for (l = 0; l < n.length && (
                            k = n[l]
                        ).left == k.right; l++) ; else for (l = n.length - 1; 0 <= l && (
                            k = n[l]
                        ).left == k.right; l--) ;
                        n = k;
                    }
                    if (n.left || n.right || 0 == h) break;
                    k = h;
                    --h;
                    c = "right";
                }
                B && 11 > D && (
                    (
                        r = !window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI
                    ) || (
                        null != nd ? r = nd : (
                            m = aa(a.display.measure, u("span", "x")), r = m.getBoundingClientRect(), m = db(m, 0, 1).getBoundingClientRect(), r = nd = 1 < Math.abs(r.left - m.left)
                        ),
                            r = !r
                    ), r || (
                        r = screen.logicalXDPI / screen.deviceXDPI, m = screen.logicalYDPI / screen.deviceYDPI, n = {
                            left  : n.left * r,
                            right : n.right * r,
                            top   : n.top * m,
                            bottom: n.bottom * m
                        }
                    )
                );
            } else 0 < h && (
                c = m = "right"
            ), n = a.options.lineWrapping && 1 < (
                r = d.getClientRects()
            ).length ? r["right" == m ? r.length - 1 : 0] : d.getBoundingClientRect();
            !(
                B && 9 > D
            ) || h || n && (
                n.left || n.right
            ) || (
                n = (
                    n = d.parentNode.getClientRects()[0]
                ) ? {
                    left  : n.left,
                    right : n.left + Cb(a.display),
                    top   : n.top,
                    bottom: n.bottom
                } : Ce
            );
            d = n.top - b.rect.top;
            h = n.bottom - b.rect.top;
            r = (
                d + h
            ) / 2;
            m = b.view.measure.heights;
            for (g = 0; g < m.length - 1 && !(
                r < m[g]
            ); g++) ;
            c = {
                left  : (
                    "right" == c ? n.right : n.left
                ) - b.rect.left,
                right : (
                    "left" == c ? n.left : n.right
                ) - b.rect.left,
                top   : g ? m[g - 1] : 0,
                bottom: m[g]
            };
            n.left || n.right || (
                c.bogus = !0
            );
            a.options.singleCursorHeightPerLine || (
                c.rtop = d, c.rbottom = h
            );
            a = c;
            a.bogus || (
                b.cache[f] = a
            );
        }
        return {
            left  : a.left,
            right : a.right,
            top   : e ? a.rtop : a.top,
            bottom: e ? a.rbottom : a.bottom
        };
    }
    
    function Be(a, b, c) {
        for (var d, e, f, g, h, k, l = 0; l < a.length; l += 3) {
            h = a[l];
            k = a[l + 1];
            if (b < h) e = 0, f = 1, g = "left"; else if (b < k) e = b - h, f = e + 1; else if (l == a.length -
                3 || b == k && a[l + 3] > b) f = k - h, e = f - 1, b >= k && (
                g = "right"
            );
            if (null != e) {
                d = a[l + 2];
                h == k && c == (
                    d.insertLeft ? "left" : "right"
                ) && (
                    g = c
                );
                if ("left" == c && 0 == e) for (; l && a[l - 2] == a[l - 3] && a[l - 1].insertLeft;) d = a[(
                    l -= 3
                ) + 2], g = "left";
                if ("right" == c && e == k - h) for (; l < a.length - 3 && a[l + 3] == a[l + 4] && !a[l + 5].insertLeft;) d = a[(
                    l += 3
                ) + 2], g = "right";
                break;
            }
        }
        return {
            node      : d,
            start     : e,
            end       : f,
            collapse  : g,
            coverStart: h,
            coverEnd  : k
        };
    }
    
    function De(a) {
        if (a.measure && (
            a.measure.cache = {}, a.measure.heights = null, a.rest
        )) for (var b = 0; b < a.rest.length; b++) a.measure.caches[b] =
            {};
    }
    
    function Ee(a) {
        a.display.externalMeasure = null;
        W(a.display.lineMeasure);
        for (var b = 0; b < a.display.view.length; b++) De(a.display.view[b]);
    }
    
    function Db(a) {
        Ee(a);
        a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null;
        a.options.lineWrapping || (
            a.display.maxLineChanged = !0
        );
        a.display.lineNumChars = null;
    }
    
    function Fe() {
        return qc && rc ? -(
            document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)
        ) : window.pageXOffset || (
            document.documentElement || document.body
        ).scrollLeft;
    }
    
    function Ge() {
        return qc && rc ? -(
            document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)
        ) : window.pageYOffset || (
            document.documentElement || document.body
        ).scrollTop;
    }
    
    function od(a) {
        var b = 0;
        if (a.widgets) for (var c = 0; c < a.widgets.length; ++c) a.widgets[c].above && (
            b += Bb(a.widgets[c])
        );
        return b;
    }
    
    function sc(a, b, c, d, e) {
        e || (
            e = od(b), c.top += e, c.bottom += e
        );
        if ("line" == d) return c;
        d || (
            d = "local"
        );
        b = pa(b);
        b = "local" == d ? b + a.display.lineSpace.offsetTop : b - a.display.viewOffset;
        if ("page" == d ||
            "window" == d) a = a.display.lineSpace.getBoundingClientRect(), b += a.top + (
            "window" == d ? 0 : Ge()
        ), d = a.left + (
            "window" == d ? 0 : Fe()
        ), c.left += d, c.right += d;
        c.top += b;
        c.bottom += b;
        return c;
    }
    
    function He(a, b, c) {
        if ("div" == c) return b;
        var d = b.left;
        b     = b.top;
        "page" == c ? (
            d -= Fe(), b -= Ge()
        ) : "local" != c && c || (
            c = a.display.sizer.getBoundingClientRect(), d += c.left, b += c.top
        );
        a = a.display.lineSpace.getBoundingClientRect();
        return {
            left: d - a.left,
            top : b - a.top
        };
    }
    
    function pd(a, b, c, d, e) {
        d || (
            d = t(a.doc, b.line)
        );
        var f = d;
        b     = b.ch;
        d     = ja(a, Na(a, d), b, e);
        return sc(a,
            f, d, c);
    }
    
    function ka(a, b, c, d, e, f) {
        function g(b, g) {
            var h = ja(a, e, b, g ? "right" : "left", f);
            g ? h.left = h.right : h.right = h.left;
            return sc(a, d, h, c);
        }
        
        function h(a, b, c) {return g(c ? a - 1 : a, 1 == k[b].level != c);}
        
        d = d || t(a.doc, b.line);
        e || (
            e = Na(a, d)
        );
        var k = va(d, a.doc.direction),
            l = b.ch;
        b = b.sticky;
        l >= d.text.length ? (
            l = d.text.length, b = "before"
        ) : 0 >= l && (
            l = 0, b = "after"
        );
        if (!k) return g("before" == b ? l - 1 : l, "before" == b);
        var m = vb(k, l, b),
            p = wb,
            m = h(l, m, "before" == b);
        null != p && (
            m.other = h(l, p, "before" != b)
        );
        return m;
    }
    
    function Ie(a, b) {
        var c = 0;
        b     = w(a.doc,
            b);
        a.options.lineWrapping || (
            c = Cb(a.display) * b.ch
        );
        var d = t(a.doc, b.line),
            e = pa(d) + a.display.lineSpace.offsetTop;
        return {
            left  : c,
            right : c,
            top   : e,
            bottom: e + d.height
        };
    }
    
    function qd(a, b, c, d, e) {
        a      = q(a, b, c);
        a.xRel = e;
        d && (
            a.outside = !0
        );
        return a;
    }
    
    function rd(a, b, c) {
        var d = a.doc;
        c += a.display.viewOffset;
        if (0 > c) return qd(d.first, 0, null, !0, -1);
        var e = Ia(d, c),
            f = d.first + d.size - 1;
        if (e > f) return qd(d.first + d.size - 1, t(d, f).text.length, null, !0, 1);
        0 > b && (
            b = 0
        );
        for (var g = t(d, e); ;) {
            var f = Bg(a, g, e, b, c),
                h;
            h = f.ch + (
                0 < f.xRel ? 1 : 0
            );
            var g = ua &&
                g.markedSpans,
                k = void 0;
            if (g) for (var l = 0; l < g.length; ++l) {
                var m = g[l];
                m.marker.collapsed && (
                    null == m.from || m.from < h
                ) && (
                    null == m.to || m.to > h
                ) && (
                    !k || 0 > Xc(k, m.marker)
                ) && (
                    k = m.marker
                );
            }
            h = k;
            if (!h) return f;
            f = h.find(1);
            if (f.line == e) return f;
            g = t(d, e = f.line);
        }
    }
    
    function Je(a, b, c, d) {
        d -= od(b);
        b     = b.text.length;
        var e = rb(function (b) {return ja(a, c, b - 1).bottom <= d;}, b, 0);
        b     = rb(function (b) {return ja(a, c, b).top > d;}, e, b);
        return {
            begin: e,
            end  : b
        };
    }
    
    function Ke(a, b, c, d) {
        c || (
            c = Na(a, b)
        );
        d = sc(a, b, ja(a, c, d), "line").top;
        return Je(a, b, c, d);
    }
    
    function sd(a,
                b, c, d) {
        return a.bottom <= c ? !1 : a.top > c ? !0 : (
            d ? a.left : a.right
        ) > b;
    }
    
    function Bg(a, b, c, d, e) {
        e -= pa(b);
        var f = Na(a, b),
            g = od(b),
            h = 0,
            k = b.text.length,
            l = !0,
            m = va(b, a.doc.direction);
        m && (
            m = (
                a.options.lineWrapping ? Cg : Dg
            )(a, b, c, f, m, d, e), h = (
                l = 1 != m.level
            ) ? m.from : m.to - 1, k = l ? m.to : m.from - 1
        );
        var p = null,
            n = null,
            m = rb(function (b) {
                var c = ja(a, f, b);
                c.top += g;
                c.bottom += g;
                if (!sd(c, d, e, !1)) return !1;
                c.top <= e && c.left <= d && (
                    p = b, n = c
                );
                return !0;
            }, h, k),
            r = !1;
        n ? (
            h = d - n.left < n.right - d, l = h == l, m = p + (
                l ? 0 : 1
            ), l = l ? "after" : "before", h = h ? n.left : n.right
        ) : (
            l ||
            m != k && m != h || m++, l = 0 == m ? "after" : m == b.text.length ? "before" : ja(a, f, m - (
                l ? 1 : 0
            )).bottom + g <= e == l ? "after" : "before", r = ka(a, q(c, m, l), "line", b, f), h = r.left, r = e < r.top || e >= r.bottom
        );
        m = Zd(b.text, m, 1);
        return qd(c, m, l, r, d - h);
    }
    
    function Dg(a, b, c, d, e, f, g) {
        var h = rb(function (h) {
                h = e[h];
                var k = 1 != h.level;
                return sd(ka(a, q(c, k ? h.to : h.from, k ? "before" : "after"), "line", b, d), f, g, !0);
            }, 0, e.length - 1),
            k = e[h];
        if (0 < h) {
            var l = 1 != k.level,
                l = ka(a, q(c, l ? k.from : k.to, l ? "after" : "before"), "line", b, d);
            sd(l, f, g, !0) && l.top > g && (
                k = e[h - 1]
            );
        }
        return k;
    }
    
    function Cg(a,
                b, c, d, e, f, g) {
        g = Je(a, b, d, g);
        c = g.begin;
        g = g.end;
        /\s/.test(b.text.charAt(g - 1)) && g--;
        for (var h = b = null, k = 0; k < e.length; k++) {
            var l = e[k];
            if (!(
                l.from >= g || l.to <= c
            )) {
                var m = ja(a, d, 1 != l.level ? Math.min(g, l.to) - 1 : Math.max(c, l.from)).right,
                    m = m < f ? f - m + 1E9 : m - f;
                if (!b || h > m) b = l, h = m;
            }
        }
        b || (
            b = e[e.length - 1]
        );
        b.from < c && (
            b = {
                from : c,
                to   : b.to,
                level: b.level
            }
        );
        b.to > g && (
            b = {
                from : b.from,
                to   : g,
                level: b.level
            }
        );
        return b;
    }
    
    function Oa(a) {
        if (null != a.cachedTextHeight) return a.cachedTextHeight;
        if (null == Pa) {
            Pa = u("pre");
            for (var b = 0; 49 > b; ++b) Pa.appendChild(document.createTextNode("x")),
                Pa.appendChild(u("br"));
            Pa.appendChild(document.createTextNode("x"));
        }
        aa(a.measure, Pa);
        b = Pa.offsetHeight / 50;
        3 < b && (
            a.cachedTextHeight = b
        );
        W(a.measure);
        return b || 1;
    }
    
    function Cb(a) {
        if (null != a.cachedCharWidth) return a.cachedCharWidth;
        var b = u("span", "xxxxxxxxxx"),
            c = u("pre", [b]);
        aa(a.measure, c);
        b = b.getBoundingClientRect();
        b = (
            b.right - b.left
        ) / 10;
        2 < b && (
            a.cachedCharWidth = b
        );
        return b || 10;
    }
    
    function md(a) {
        for (var b = a.display, c = {}, d = {}, e = b.gutters.clientLeft, f = b.gutters.firstChild, g = 0; f; f = f.nextSibling, ++g) c[a.options.gutters[g]] =
            f.offsetLeft + f.clientLeft + e, d[a.options.gutters[g]] = f.clientWidth;
        return {
            fixedPos        : td(b),
            gutterTotalWidth: b.gutters.offsetWidth,
            gutterLeft      : c,
            gutterWidth     : d,
            wrapperWidth    : b.wrapper.clientWidth
        };
    }
    
    function td(a) {return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left;}
    
    function Le(a) {
        var b = Oa(a.display),
            c = a.options.lineWrapping,
            d = c && Math.max(5, a.display.scroller.clientWidth / Cb(a.display) - 3);
        return function (e) {
            if (Ja(a.doc, e)) return 0;
            var f = 0;
            if (e.widgets) for (var g = 0; g < e.widgets.length; g++) e.widgets[g].height &&
            (
                f += e.widgets[g].height
            );
            return c ? f + (
                Math.ceil(e.text.length / d) || 1
            ) * b : f + b;
        };
    }
    
    function ud(a) {
        var b = a.doc,
            c = Le(a);
        b.iter(function (a) {
            var b = c(a);
            b != a.height && na(a, b);
        });
    }
    
    function Qa(a, b, c, d) {
        var e = a.display;
        if (!c && "true" == (
            b.target || b.srcElement
        ).getAttribute("cm-not-content")) return null;
        var f,
            g;
        c = e.lineSpace.getBoundingClientRect();
        try {f = b.clientX - c.left, g = b.clientY - c.top;} catch (h) {return null;}
        b = rd(a, f, g);
        var k;
        d && 1 == b.xRel && (
            k = t(a.doc, b.line).text
        ).length == b.ch && (
            d = fa(k, k.length, a.options.tabSize) - k.length,
                b = q(b.line, Math.max(0, Math.round((
                    f - ze(a.display).left
                ) / Cb(a.display)) - d))
        );
        return b;
    }
    
    function Ma(a, b) {
        if (b >= a.display.viewTo) return null;
        b -= a.display.viewFrom;
        if (0 > b) return null;
        for (var c = a.display.view, d = 0; d < c.length; d++) if (b -= c[d].size, 0 > b) return d;
    }
    
    function Eb(a) {a.display.input.showSelection(a.display.input.prepareSelection());}
    
    function Me(a, b) {
        void 0 === b && (
            b = !0
        );
        for (var c = a.doc, d = {}, e = d.cursors = document.createDocumentFragment(), f = d.selection = document.createDocumentFragment(), g = 0; g < c.sel.ranges.length; g++) if (b ||
            g != c.sel.primIndex) {
            var h = c.sel.ranges[g];
            if (!(
                h.from().line >= a.display.viewTo || h.to().line < a.display.viewFrom
            )) {
                var k = h.empty();
                (
                    k || a.options.showCursorWhenSelecting
                ) && Ne(a, h.head, e);
                k || Eg(a, h, f);
            }
        }
        return d;
    }
    
    function Ne(a, b, c) {
        b              = ka(a, b, "div", null, null, !a.options.singleCursorHeightPerLine);
        var d          = c.appendChild(u("div", " ", "CodeMirror-cursor"));
        d.style.left   = b.left + "px";
        d.style.top    = b.top + "px";
        d.style.height = Math.max(0, b.bottom - b.top) * a.options.cursorHeight + "px";
        b.other && (
            a = c.appendChild(u("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor")),
                a.style.display = "", a.style.left = b.other.left + "px", a.style.top = b.other.top + "px", a.style.height = .85 * (
                b.other.bottom - b.other.top
            ) + "px"
        );
    }
    
    function tc(a, b) {return a.top - b.top || a.left - b.left;}
    
    function Eg(a, b, c) {
        function d(a, b, c, d) {
            0 > b && (
                b = 0
            );
            b = Math.round(b);
            d = Math.round(d);
            h.appendChild(u("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px;\n                             top: " + b + "px; width: " + (
                null == c ? m - a : c
            ) + "px;\n                             height: " + (
                d - b
            ) + "px"));
        }
        
        function e(b, c, e) {
            function f(c,
                       d) {return pd(a, q(b, c), "div", k, d);}
            
            function h(b, c, d) {
                b = Ke(a, k, null, b);
                c = "ltr" == c == (
                    "after" == d
                ) ? "left" : "right";
                d = "after" == d ? b.begin : b.end - (
                    /\s/.test(k.text.charAt(b.end - 1)) ? 2 : 1
                );
                return f(d, c)[c];
            }
            
            var k = t(g, b),
                n = k.text.length,
                u,
                v,
                x = va(k, g.direction);
            mg(x, c || 0, null == e ? n : e, function (a, b, g, k) {
                var r = "ltr" == g,
                    q = f(a, r ? "left" : "right"),
                    t = f(b - 1, r ? "right" : "left"),
                    w = null == c && 0 == a,
                    y = null == e && b == n,
                    z = 0 == k;
                k = !x || k == x.length - 1;
                3 >= t.top - q.top ? (
                        b = (
                            p ? w : y
                        ) && z ? l : (
                            r ? q : t
                        ).left, d(b, q.top, (
                            (
                                p ? y : w
                            ) && k ? m : (
                                r ? t : q
                            ).right
                        ) - b, q.bottom)
                    ) :
                    (
                        r ? (
                            r = p && w && z ? l : q.left, w = p ? m : h(a, g, "before"), a = p ? l : h(b, g, "after"), y = p && y && k ? m : t.right
                        ) : (
                            r = p ? h(a, g, "before") : l, w = !p && w && z ? m : q.right, a = !p && y && k ? l : t.left, y = p ? h(b, g, "after") : m
                        ), d(r, q.top, w - r, q.bottom), q.bottom < t.top && d(l, q.bottom, null, t.top), d(a, t.top, y - a, t.bottom)
                    );
                if (!u || 0 > tc(q, u)) u = q;
                0 > tc(t, u) && (
                    u = t
                );
                if (!v || 0 > tc(q, v)) v = q;
                0 > tc(t, v) && (
                    v = t
                );
            });
            return {
                start: u,
                end  : v
            };
        }
        
        var f = a.display,
            g = a.doc,
            h = document.createDocumentFragment(),
            k = ze(a.display),
            l = k.left,
            m = Math.max(f.sizerWidth, La(a) - f.sizer.offsetLeft) - k.right,
            p = "ltr" == g.direction,
            f = b.from();
        b     = b.to();
        if (f.line == b.line) e(f.line, f.ch, b.ch); else {
            var n = t(g, f.line),
                k = t(g, b.line),
                k = oa(n) == oa(k),
                f = e(f.line, f.ch, k ? n.text.length + 1 : null).end;
            b = e(b.line, k ? 0 : null, b.ch).start;
            k && (
                f.top < b.top - 2 ? (
                    d(f.right, f.top, null, f.bottom), d(l, b.top, b.left, b.bottom)
                ) : d(f.right, f.top, b.left - f.right, f.bottom)
            );
            f.bottom < b.top && d(l, f.bottom, null, b.top);
        }
        c.appendChild(h);
    }
    
    function vd(a) {
        if (a.state.focused) {
            var b = a.display;
            clearInterval(b.blinker);
            var c                        = !0;
            b.cursorDiv.style.visibility = "";
            0 < a.options.cursorBlinkRate ? b.blinker = setInterval(function () {
                return b.cursorDiv.style.visibility = (
                    c = !c
                ) ? "" : "hidden";
            }, a.options.cursorBlinkRate) : 0 > a.options.cursorBlinkRate && (
                b.cursorDiv.style.visibility = "hidden"
            );
        }
    }
    
    function Oe(a) {
        a.state.focused || (
            a.display.input.focus(), wd(a)
        );
    }
    
    function Pe(a) {
        a.state.delayingBlurEvent = !0;
        setTimeout(function () {
            a.state.delayingBlurEvent && (
                a.state.delayingBlurEvent = !1, Fb(a)
            );
        }, 100);
    }
    
    function wd(a, b) {
        a.state.delayingBlurEvent && (
            a.state.delayingBlurEvent = !1
        );
        "nocursor" !=
        a.options.readOnly && (
            a.state.focused || (
                F(a, "focus", a, b), a.state.focused = !0, Fa(a.display.wrapper, "CodeMirror-focused"), a.curOp || a.display.selForContextMenu == a.doc.sel || (
                    a.display.input.reset(), P && setTimeout(function () {return a.display.input.reset(!0);}, 20)
                ), a.display.input.receivedFocus()
            ), vd(a)
        );
    }
    
    function Fb(a, b) {
        a.state.delayingBlurEvent || (
            a.state.focused && (
                F(a, "blur", a, b), a.state.focused = !1, Ra(a.display.wrapper, "CodeMirror-focused")
            ), clearInterval(a.display.blinker), setTimeout(function () {
                a.state.focused ||
                (
                    a.display.shift = !1
                );
            }, 150)
        );
    }
    
    function uc(a) {
        a = a.display;
        for (var b = a.lineDiv.offsetTop, c = 0; c < a.view.length; c++) {
            var d = a.view[c],
                e = void 0;
            if (!d.hidden) {
                if (B && 8 > D) var f = d.node.offsetTop + d.node.offsetHeight,
                                    e = f - b,
                                    b = f; else e = d.node.getBoundingClientRect(), e = e.bottom - e.top;
                f = d.line.height - e;
                2 > e && (
                    e = Oa(a)
                );
                if (.005 < f || -.005 > f) if (na(d.line, e), Qe(d.line), d.rest) for (e = 0; e < d.rest.length; e++) Qe(d.rest[e]);
            }
        }
    }
    
    function Qe(a) {
        if (a.widgets) for (var b = 0; b < a.widgets.length; ++b) {
            var c = a.widgets[b],
                d = c.node.parentNode;
            d &&
            (
                c.height = d.offsetHeight
            );
        }
    }
    
    function xd(a, b, c) {
        var d = c && null != c.top ? Math.max(0, c.top) : a.scroller.scrollTop,
            d = Math.floor(d - a.lineSpace.offsetTop),
            e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight,
            d = Ia(b, d),
            e = Ia(b, e);
        if (c && c.ensure) {
            var f = c.ensure.from.line;
            c     = c.ensure.to.line;
            f < d ? (
                d = f, e = Ia(b, pa(t(b, f)) + a.wrapper.clientHeight)
            ) : Math.min(c, b.lastLine()) >= e && (
                d = Ia(b, pa(t(b, c)) - a.wrapper.clientHeight), e = c
            );
        }
        return {
            from: d,
            to  : Math.max(e, d + 1)
        };
    }
    
    function Re(a) {
        var b = a.display,
            c = b.view;
        if (b.alignWidgets || b.gutters.firstChild &&
            a.options.fixedGutter) {
            for (var d = td(b) - b.scroller.scrollLeft + a.doc.scrollLeft, e = b.gutters.offsetWidth, f = d + "px", g = 0; g < c.length; g++) if (!c[g].hidden) {
                a.options.fixedGutter && (
                    c[g].gutter && (
                        c[g].gutter.style.left = f
                    ), c[g].gutterBackground && (
                        c[g].gutterBackground.style.left = f
                    )
                );
                var h = c[g].alignable;
                if (h) for (var k = 0; k < h.length; k++) h[k].style.left = f;
            }
            a.options.fixedGutter && (
                b.gutters.style.left = d + e + "px"
            );
        }
    }
    
    function Se(a) {
        if (!a.options.lineNumbers) return !1;
        var b = a.doc,
            b = Tc(a.options, b.first + b.size - 1),
            c = a.display;
        if (b.length != c.lineNumChars) {
            var d = c.measure.appendChild(u("div", [u("div", b)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                e = d.firstChild.offsetWidth,
                d = d.offsetWidth - e;
            c.lineGutter.style.width = "";
            c.lineNumInnerWidth = Math.max(e, c.lineGutter.offsetWidth - d) + 1;
            c.lineNumWidth = c.lineNumInnerWidth + d;
            c.lineNumChars = c.lineNumInnerWidth ? b.length : -1;
            c.lineGutter.style.width = c.lineNumWidth + "px";
            yd(a);
            return !0;
        }
        return !1;
    }
    
    function zd(a, b) {
        var c = a.display,
            d = Oa(a.display);
        0 > b.top && (
            b.top = 0
        );
        var e = a.curOp && null !=
            a.curOp.scrollTop ? a.curOp.scrollTop : c.scroller.scrollTop,
            f = kd(a),
            g = {};
        b.bottom - b.top > f && (
            b.bottom = b.top + f
        );
        var h = a.doc.height + jd(c),
            k = b.top < d,
            d = b.bottom > h - d;
        b.top < e ? g.scrollTop = k ? 0 : b.top : b.bottom > e + f && (
            f = Math.min(b.top, (
                d ? h : b.bottom
            ) - f), f != e && (
                g.scrollTop = f
            )
        );
        e = a.curOp && null != a.curOp.scrollLeft ? a.curOp.scrollLeft : c.scroller.scrollLeft;
        c = La(a) - (
            a.options.fixedGutter ? c.gutters.offsetWidth : 0
        );
        if (f = b.right - b.left > c) b.right = b.left + c;
        10 > b.left ? g.scrollLeft = 0 : b.left < e ? g.scrollLeft = Math.max(0, b.left - (
            f ? 0 :
                10
        )) : b.right > c + e - 3 && (
            g.scrollLeft = b.right + (
                f ? 0 : 10
            ) - c
        );
        return g;
    }
    
    function vc(a, b) {
        null != b && (
            wc(a), a.curOp.scrollTop = (
                null == a.curOp.scrollTop ? a.doc.scrollTop : a.curOp.scrollTop
            ) + b
        );
    }
    
    function fb(a) {
        wc(a);
        var b               = a.getCursor();
        a.curOp.scrollToPos = {
            from  : b,
            to    : b,
            margin: a.options.cursorScrollMargin
        };
    }
    
    function Gb(a, b, c) {
        null == b && null == c || wc(a);
        null != b && (
            a.curOp.scrollLeft = b
        );
        null != c && (
            a.curOp.scrollTop = c
        );
    }
    
    function wc(a) {
        var b = a.curOp.scrollToPos;
        if (b) {
            a.curOp.scrollToPos = null;
            var c = Ie(a, b.from),
                d = Ie(a, b.to);
            Te(a,
                c, d, b.margin);
        }
    }
    
    function Te(a, b, c, d) {
        b = zd(a, {
            left  : Math.min(b.left, c.left),
            top   : Math.min(b.top, c.top) - d,
            right : Math.max(b.right, c.right),
            bottom: Math.max(b.bottom, c.bottom) + d
        });
        Gb(a, b.scrollLeft, b.scrollTop);
    }
    
    function Hb(a, b) {
        2 > Math.abs(a.doc.scrollTop - b) || (
            za || Ad(a, {top: b}), Ue(a, b, !0), za && Ad(a), Ib(a, 100)
        );
    }
    
    function Ue(a, b, c) {
        b = Math.min(a.display.scroller.scrollHeight - a.display.scroller.clientHeight, b);
        if (a.display.scroller.scrollTop != b || c) a.doc.scrollTop = b, a.display.scrollbars.setScrollTop(b), a.display.scroller.scrollTop !=
        b && (
            a.display.scroller.scrollTop = b
        );
    }
    
    function Sa(a, b, c, d) {
        b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth);
        (
            c ? b == a.doc.scrollLeft : 2 > Math.abs(a.doc.scrollLeft - b)
        ) && !d || (
            a.doc.scrollLeft = b, Re(a), a.display.scroller.scrollLeft != b && (
                a.display.scroller.scrollLeft = b
            ), a.display.scrollbars.setScrollLeft(b)
        );
    }
    
    function Jb(a) {
        var b = a.display,
            c = b.gutters.offsetWidth,
            d = Math.round(a.doc.height + jd(a.display));
        return {
            clientHeight  : b.scroller.clientHeight,
            viewHeight    : b.wrapper.clientHeight,
            scrollWidth   : b.scroller.scrollWidth,
            clientWidth   : b.scroller.clientWidth,
            viewWidth     : b.wrapper.clientWidth,
            barLeft       : a.options.fixedGutter ? c : 0,
            docHeight     : d,
            scrollHeight  : d + ra(a) + b.barHeight,
            nativeBarWidth: b.nativeBarWidth,
            gutterWidth   : c
        };
    }
    
    function gb(a, b) {
        b || (
            b = Jb(a)
        );
        var c = a.display.barWidth,
            d = a.display.barHeight;
        Ve(a, b);
        for (var e = 0; 4 > e && c != a.display.barWidth || d != a.display.barHeight; e++) c != a.display.barWidth && a.options.lineWrapping && uc(a), Ve(a, Jb(a)), c = a.display.barWidth, d = a.display.barHeight;
    }
    
    function Ve(a, b) {
        var c                             = a.display,
            d                             = c.scrollbars.update(b);
        c.sizer.style.paddingRight = (
            c.barWidth = d.right
        ) + "px";
        c.sizer.style.paddingBottom = (
            c.barHeight = d.bottom
        ) + "px";
        c.heightForcer.style.borderBottom = d.bottom + "px solid transparent";
        d.right && d.bottom ? (
            c.scrollbarFiller.style.display = "block", c.scrollbarFiller.style.height = d.bottom + "px", c.scrollbarFiller.style.width = d.right + "px"
        ) : c.scrollbarFiller.style.display = "";
        d.bottom && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (
            c.gutterFiller.style.display = "block", c.gutterFiller.style.height = d.bottom +
                "px", c.gutterFiller.style.width = b.gutterWidth + "px"
        ) : c.gutterFiller.style.display = "";
    }
    
    function We(a) {
        a.display.scrollbars && (
            a.display.scrollbars.clear(), a.display.scrollbars.addClass && Ra(a.display.wrapper, a.display.scrollbars.addClass)
        );
        a.display.scrollbars = new Xe[a.options.scrollbarStyle](function (b) {
                a.display.wrapper.insertBefore(b, a.display.scrollbarFiller);
                v(b, "mousedown", function () {a.state.focused && setTimeout(function () {return a.display.input.focus();}, 0);});
                b.setAttribute("cm-not-content", "true");
            },
            function (b, c) {"horizontal" == c ? Sa(a, b) : Hb(a, b);}, a);
        a.display.scrollbars.addClass && Fa(a.display.wrapper, a.display.scrollbars.addClass);
    }
    
    function Ta(a) {
        a.curOp = {
            cm                    : a,
            viewChanged           : !1,
            startHeight           : a.doc.height,
            forceUpdate           : !1,
            updateInput           : null,
            typing                : !1,
            changeObjs            : null,
            cursorActivityHandlers: null,
            cursorActivityCalled  : 0,
            selectionChanged      : !1,
            updateMaxLine         : !1,
            scrollLeft            : null,
            scrollTop             : null,
            scrollToPos           : null,
            focus                 : !1,
            id                    : ++Fg
        };
        a       = a.curOp;
        eb ? eb.ops.push(a) : a.ownsGroup = eb = {
            ops             : [a],
            delayedCallbacks: []
        };
    }
    
    function Ua(a) {
        yg(a.curOp,
            function (a) {
                for (var c = 0; c < a.ops.length; c++) a.ops[c].cm.curOp = null;
                a = a.ops;
                for (c = 0; c < a.length; c++) {
                    var d = a[c],
                        e = d.cm,
                        f = e.display,
                        g = e.display;
                    !g.scrollbarsClipped && g.scroller.offsetWidth && (
                        g.nativeBarWidth = g.scroller.offsetWidth - g.scroller.clientWidth, g.heightForcer.style.height = ra(e) + "px", g.sizer.style.marginBottom = -g.nativeBarWidth + "px", g.sizer.style.borderRightWidth = ra(e) + "px", g.scrollbarsClipped = !0
                    );
                    d.updateMaxLine && $c(e);
                    d.mustUpdate = d.viewChanged || d.forceUpdate || null != d.scrollTop || d.scrollToPos &&
                        (
                            d.scrollToPos.from.line < f.viewFrom || d.scrollToPos.to.line >= f.viewTo
                        ) || f.maxLineChanged && e.options.lineWrapping;
                    d.update     = d.mustUpdate && new xc(e, d.mustUpdate && {
                        top: d.scrollTop,
                        ensure: d.scrollToPos
                    }, d.forceUpdate);
                }
                for (c = 0; c < a.length; c++) d = a[c], d.updatedDisplay = d.mustUpdate && Bd(d.cm, d.update);
                for (c = 0; c < a.length; c++) if (d = a[c], e = d.cm, f = e.display, d.updatedDisplay && uc(e), d.barMeasure = Jb(e), f.maxLineChanged && !e.options.lineWrapping && (
                    g = void 0, g = f.maxLine.text.length, g = ja(e, Na(e, f.maxLine), g, void 0), d.adjustWidthTo =
                        g.left + 3, e.display.sizerWidth = d.adjustWidthTo, d.barMeasure.scrollWidth = Math.max(f.scroller.clientWidth, f.sizer.offsetLeft + d.adjustWidthTo + ra(e) + e.display.barWidth), d.maxScrollLeft = Math.max(0, f.sizer.offsetLeft + d.adjustWidthTo - La(e))
                ), d.updatedDisplay || d.selectionChanged) d.preparedSelection = f.input.prepareSelection();
                for (c = 0; c < a.length; c++) d = a[c], e = d.cm, null != d.adjustWidthTo && (
                    e.display.sizer.style.minWidth = d.adjustWidthTo + "px", d.maxScrollLeft < e.doc.scrollLeft && Sa(e, Math.min(e.display.scroller.scrollLeft,
                        d.maxScrollLeft), !0), e.display.maxLineChanged = !1
                ), f = d.focus && d.focus == ta(), d.preparedSelection && e.display.input.showSelection(d.preparedSelection, f), (
                    d.updatedDisplay || d.startHeight != e.doc.height
                ) && gb(e, d.barMeasure), d.updatedDisplay && Cd(e, d.barMeasure), d.selectionChanged && vd(e), e.state.focused && d.updateInput && e.display.input.reset(d.typing), f && Oe(d.cm);
                for (c = 0; c < a.length; c++) {
                    d = a[c];
                    e = d.cm;
                    f = e.display;
                    g = e.doc;
                    d.updatedDisplay && Ye(e, d.update);
                    null == f.wheelStartX || null == d.scrollTop && null == d.scrollLeft &&
                    !d.scrollToPos || (
                        f.wheelStartX = f.wheelStartY = null
                    );
                    null != d.scrollTop && Ue(e, d.scrollTop, d.forceScroll);
                    null != d.scrollLeft && Sa(e, d.scrollLeft, !0, !0);
                    if (d.scrollToPos) {
                        var h = w(g, d.scrollToPos.from),
                            k = w(g, d.scrollToPos.to),
                            l = d.scrollToPos.margin;
                        null == l && (
                            l = 0
                        );
                        var m = void 0;
                        e.options.lineWrapping || h != k || (
                            h = h.ch ? q(h.line, "before" == h.sticky ? h.ch - 1 : h.ch, "after") : h, k = "before" == h.sticky ? q(h.line, h.ch + 1, "before") : h
                        );
                        for (var p = 0; 5 > p; p++) {
                            var n = !1,
                                m = ka(e, h),
                                r = k && k != h ? ka(e, k) : m,
                                m = {
                                    left  : Math.min(m.left, r.left),
                                    top: Math.min(m.top, r.top) - l,
                                    right: Math.max(m.left, r.left),
                                    bottom: Math.max(m.bottom, r.bottom) + l
                                },
                                r = zd(e, m),
                                X = e.doc.scrollTop,
                                t = e.doc.scrollLeft;
                            null != r.scrollTop && (
                                Hb(e, r.scrollTop), 1 < Math.abs(e.doc.scrollTop - X) && (
                                    n = !0
                                )
                            );
                            null != r.scrollLeft && (
                                Sa(e, r.scrollLeft), 1 < Math.abs(e.doc.scrollLeft - t) && (
                                    n = !0
                                )
                            );
                            if (!n) break;
                        }
                        k = m;
                        I(e, "scrollCursorIntoView") || (
                            l = e.display, p = l.sizer.getBoundingClientRect(), h = null, 0 > k.top + p.top ? h = !0 : k.bottom + p.top > (
                                window.innerHeight || document.documentElement.clientHeight
                            ) && (
                                h = !1
                            ),
                            null == h || Gg || (
                                k = u("div", "​", null, "position: absolute;\n                         top: " + (
                                    k.top - l.viewOffset - e.display.lineSpace.offsetTop
                                ) + "px;\n                         height: " + (
                                    k.bottom - k.top + ra(e) + l.barHeight
                                ) + "px;\n                         left: " + k.left + "px; width: " + Math.max(2, k.right - k.left) + "px;"), e.display.lineSpace.appendChild(k), k.scrollIntoView(h), e.display.lineSpace.removeChild(k)
                            )
                        );
                    }
                    k = d.maybeHiddenMarkers;
                    h = d.maybeUnhiddenMarkers;
                    if (k) for (l = 0; l < k.length; ++l) k[l].lines.length || F(k[l],
                        "hide");
                    if (h) for (k = 0; k < h.length; ++k) h[k].lines.length && F(h[k], "unhide");
                    f.wrapper.offsetHeight && (
                        g.scrollTop = e.display.scroller.scrollTop
                    );
                    d.changeObjs && F(e, "changes", e, d.changeObjs);
                    d.update && d.update.finish();
                }
            });
    }
    
    function Z(a, b) {
        if (a.curOp) return b();
        Ta(a);
        try {return b();} finally {Ua(a);}
    }
    
    function J(a, b) {
        return function () {
            if (a.curOp) return b.apply(a, arguments);
            Ta(a);
            try {return b.apply(a, arguments);} finally {Ua(a);}
        };
    }
    
    function R(a) {
        return function () {
            if (this.curOp) return a.apply(this, arguments);
            Ta(this);
            try {return a.apply(this, arguments);} finally {Ua(this);}
        };
    }
    
    function K(a) {
        return function () {
            var b = this.cm;
            if (!b || b.curOp) return a.apply(this, arguments);
            Ta(b);
            try {return a.apply(this, arguments);} finally {Ua(b);}
        };
    }
    
    function U(a, b, c, d) {
        null == b && (
            b = a.doc.first
        );
        null == c && (
            c = a.doc.first + a.doc.size
        );
        d || (
            d = 0
        );
        var e = a.display;
        d && c < e.viewTo && (
            null == e.updateLineNumbers || e.updateLineNumbers > b
        ) && (
            e.updateLineNumbers = b
        );
        a.curOp.viewChanged = !0;
        if (b >= e.viewTo) ua && Yc(a.doc, b) < e.viewTo && Aa(a); else if (c <= e.viewFrom) ua && ee(a.doc,
            c + d) > e.viewFrom ? Aa(a) : (
            e.viewFrom += d, e.viewTo += d
        ); else if (b <= e.viewFrom && c >= e.viewTo) Aa(a); else if (b <= e.viewFrom) {
            var f = yc(a, c, c + d, 1);
            f ? (
                e.view = e.view.slice(f.index), e.viewFrom = f.lineN, e.viewTo += d
            ) : Aa(a);
        } else if (c >= e.viewTo) (
            f = yc(a, b, b, -1)
        ) ? (
            e.view = e.view.slice(0, f.index), e.viewTo = f.lineN
        ) : Aa(a); else {
            var f = yc(a, b, b, -1),
                g = yc(a, c, c + d, 1);
            f && g ? (
                e.view = e.view.slice(0, f.index).concat(pc(a, f.lineN, g.lineN)).concat(e.view.slice(g.index)), e.viewTo += d
            ) : Aa(a);
        }
        if (a = e.externalMeasured) c < a.lineN ? a.lineN += d : b < a.lineN +
            a.size && (
                e.externalMeasured = null
            );
    }
    
    function Ba(a, b, c) {
        a.curOp.viewChanged = !0;
        var d = a.display,
            e = a.display.externalMeasured;
        e && b >= e.lineN && b < e.lineN + e.size && (
            d.externalMeasured = null
        );
        b < d.viewFrom || b >= d.viewTo || (
            a = d.view[Ma(a, b)], null != a.node && (
                a = a.changes || (
                    a.changes = []
                ), -1 == L(a, c) && a.push(c)
            )
        );
    }
    
    function Aa(a) {
        a.display.viewFrom   = a.display.viewTo = a.doc.first;
        a.display.view       = [];
        a.display.viewOffset = 0;
    }
    
    function yc(a, b, c, d) {
        var e = Ma(a, b),
            f = a.display.view;
        if (!ua || c == a.doc.first + a.doc.size) return {
            index: e,
            lineN: c
        };
        for (var g = a.display.viewFrom, h = 0; h < e; h++) g += f[h].size;
        if (g != b) {
            if (0 < d) {
                if (e == f.length - 1) return null;
                b = g + f[e].size - b;
                e++;
            } else b = g - b;
            c += b;
        }
        for (; Yc(a.doc, c) != c;) {
            if (e == (
                0 > d ? 0 : f.length - 1
            )) return null;
            c += d * f[e - (
                0 > d ? 1 : 0
            )].size;
            e += d;
        }
        return {
            index: e,
            lineN: c
        };
    }
    
    function Ze(a) {
        a = a.display.view;
        for (var b = 0, c = 0; c < a.length; c++) {
            var d = a[c];
            d.hidden || d.node && !d.changes || ++b;
        }
        return b;
    }
    
    function Ib(a, b) {a.doc.highlightFrontier < a.display.viewTo && a.state.highlight.set(b, Nc(Hg, a));}
    
    function Hg(a) {
        var b = a.doc;
        if (!(
            b.highlightFrontier >=
            a.display.viewTo
        )) {
            var c = +new Date + a.options.workTime,
                d = yb(a, b.highlightFrontier),
                e = [];
            b.iter(d.line, Math.min(b.first + b.size, a.display.viewTo + 500), function (f) {
                if (d.line >= a.display.viewFrom) {
                    var g = f.styles,
                        h = f.text.length > a.options.maxHighlightLength ? Ka(b.mode, d.state) : null,
                        k = je(a, f, d, !0);
                    h && (
                        d.state = h
                    );
                    f.styles = k.styles;
                    h        = f.styleClasses;
                    (
                        k = k.classes
                    ) ? f.styleClasses = k : h && (
                        f.styleClasses = null
                    );
                    k = !g || g.length != f.styles.length || h != k && (
                        !h || !k || h.bgClass != k.bgClass || h.textClass != k.textClass
                    );
                    for (h = 0; !k &&
                    h < g.length; ++h) k = g[h] != f.styles[h];
                    k && e.push(d.line);
                    f.stateAfter = d.save();
                } else f.text.length <= a.options.maxHighlightLength && fd(a, f.text, d), f.stateAfter = 0 == d.line % 5 ? d.save() : null;
                d.nextLine();
                if (+new Date > c) return Ib(a, a.options.workDelay), !0;
            });
            b.highlightFrontier = d.line;
            b.modeFrontier      = Math.max(b.modeFrontier, d.line);
            e.length && Z(a, function () {for (var b = 0; b < e.length; b++) Ba(a, e[b], "text");});
        }
    }
    
    function Bd(a, b) {
        var c = a.display,
            d = a.doc;
        if (b.editorIsHidden) return Aa(a), !1;
        if (!b.force && b.visible.from >= c.viewFrom &&
            b.visible.to <= c.viewTo && (
                null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo
            ) && c.renderedView == c.view && 0 == Ze(a)) return !1;
        Se(a) && (
            Aa(a), b.dims = md(a)
        );
        var e = d.first + d.size,
            f = Math.max(b.visible.from - a.options.viewportMargin, d.first),
            g = Math.min(e, b.visible.to + a.options.viewportMargin);
        c.viewFrom < f && 20 > f - c.viewFrom && (
            f = Math.max(d.first, c.viewFrom)
        );
        c.viewTo > g && 20 > c.viewTo - g && (
            g = Math.min(e, c.viewTo)
        );
        ua && (
            f = Yc(a.doc, f), g = ee(a.doc, g)
        );
        d = f != c.viewFrom || g != c.viewTo || c.lastWrapHeight != b.wrapperHeight ||
            c.lastWrapWidth != b.wrapperWidth;
        e = a.display;
        0 == e.view.length || f >= e.viewTo || g <= e.viewFrom ? (
            e.view = pc(a, f, g), e.viewFrom = f
        ) : (
            e.viewFrom > f ? e.view = pc(a, f, e.viewFrom).concat(e.view) : e.viewFrom < f && (
                e.view = e.view.slice(Ma(a, f))
            ), e.viewFrom = f, e.viewTo < g ? e.view = e.view.concat(pc(a, e.viewTo, g)) : e.viewTo > g && (
                e.view = e.view.slice(0, Ma(a, g))
            )
        );
        e.viewTo                  = g;
        c.viewOffset              = pa(t(a.doc, c.viewFrom));
        a.display.mover.style.top = c.viewOffset + "px";
        g                         = Ze(a);
        if (!d && 0 == g && !b.force && c.renderedView == c.view && (
            null == c.updateLineNumbers ||
            c.updateLineNumbers >= c.viewTo
        )) return !1;
        a.hasFocus() ? f = null : (
            f = ta()
        ) && ya(a.display.lineDiv, f) ? (
            f = {activeElt: f}, window.getSelection && (
                e = window.getSelection(), e.anchorNode && e.extend && ya(a.display.lineDiv, e.anchorNode) && (
                    f.anchorNode = e.anchorNode, f.anchorOffset = e.anchorOffset, f.focusNode = e.focusNode, f.focusOffset = e.focusOffset
                )
            )
        ) : f = null;
        4 < g && (
            c.lineDiv.style.display = "none"
        );
        Ig(a, c.updateLineNumbers, b.dims);
        4 < g && (
            c.lineDiv.style.display = ""
        );
        c.renderedView = c.view;
        (
            g = f
        ) && g.activeElt && g.activeElt != ta() &&
        (
            g.activeElt.focus(), g.anchorNode && ya(document.body, g.anchorNode) && ya(document.body, g.focusNode) && (
                f = window.getSelection(), e = document.createRange(), e.setEnd(g.anchorNode, g.anchorOffset), e.collapse(!1), f.removeAllRanges(), f.addRange(e), f.extend(g.focusNode, g.focusOffset)
            )
        );
        W(c.cursorDiv);
        W(c.selectionDiv);
        c.gutters.style.height = c.sizer.style.minHeight = 0;
        d && (
            c.lastWrapHeight = b.wrapperHeight, c.lastWrapWidth = b.wrapperWidth, Ib(a, 400)
        );
        c.updateLineNumbers = null;
        return !0;
    }
    
    function Ye(a, b) {
        for (var c = b.viewport,
                 d = !0; ; d = !1) {
            if (!d || !a.options.lineWrapping || b.oldDisplayWidth == La(a)) if (c && null != c.top && (
                c = {top: Math.min(a.doc.height + jd(a.display) - kd(a), c.top)}
            ), b.visible = xd(a.display, a.doc, c), b.visible.from >= a.display.viewFrom && b.visible.to <= a.display.viewTo) break;
            if (!Bd(a, b)) break;
            uc(a);
            d = Jb(a);
            Eb(a);
            gb(a, d);
            Cd(a, d);
            b.force = !1;
        }
        b.signal(a, "update", a);
        if (a.display.viewFrom != a.display.reportedViewFrom || a.display.viewTo != a.display.reportedViewTo) b.signal(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo),
            a.display.reportedViewFrom = a.display.viewFrom, a.display.reportedViewTo = a.display.viewTo;
    }
    
    function Ad(a, b) {
        var c = new xc(a, b);
        if (Bd(a, c)) {
            uc(a);
            Ye(a, c);
            var d = Jb(a);
            Eb(a);
            gb(a, d);
            Cd(a, d);
            c.finish();
        }
    }
    
    function Ig(a, b, c) {
        function d(b) {
            var c = b.nextSibling;
            P && ia && a.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b);
            return c;
        }
        
        for (var e = a.display, f = a.options.lineNumbers, g = e.lineDiv, h = g.firstChild, k = e.view, e = e.viewFrom, l = 0; l < k.length; l++) {
            var m = k[l];
            if (!m.hidden) if (m.node && m.node.parentNode ==
                g) {
                for (; h != m.node;) h = d(h);
                h = f && null != b && b <= e && m.lineNumber;
                m.changes && (
                    -1 < L(m.changes, "gutter") && (
                        h = !1
                    ), ue(a, m, e, c)
                );
                h && (
                    W(m.lineNumber), m.lineNumber.appendChild(document.createTextNode(Tc(a.options, e)))
                );
                h = m.node.nextSibling;
            } else {
                var p = Ag(a, m, e, c);
                g.insertBefore(p, h);
            }
            e += m.size;
        }
        for (; h;) h = d(h);
    }
    
    function yd(a) {a.display.sizer.style.marginLeft = a.display.gutters.offsetWidth + "px";}
    
    function Cd(a, b) {
        a.display.sizer.style.minHeight  = b.docHeight + "px";
        a.display.heightForcer.style.top = b.docHeight + "px";
        a.display.gutters.style.height   =
            b.docHeight + a.display.barHeight + ra(a) + "px";
    }
    
    function $e(a) {
        var b = a.display.gutters,
            c = a.options.gutters;
        W(b);
        for (var d = 0; d < c.length; ++d) {
            var e = c[d],
                f = b.appendChild(u("div", null, "CodeMirror-gutter " + e));
            "CodeMirror-linenumbers" == e && (
                a.display.lineGutter = f, f.style.width = (
                    a.display.lineNumWidth || 1
                ) + "px"
            );
        }
        b.style.display = d ? "" : "none";
        yd(a);
    }
    
    function Dd(a) {
        var b = L(a.gutters, "CodeMirror-linenumbers");
        -1 == b && a.lineNumbers ? a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]) : -1 < b && !a.lineNumbers && (
            a.gutters =
                a.gutters.slice(0), a.gutters.splice(b, 1)
        );
    }
    
    function af(a) {
        var b = a.wheelDeltaX,
            c = a.wheelDeltaY;
        null == b && a.detail && a.axis == a.HORIZONTAL_AXIS && (
            b = a.detail
        );
        null == c && a.detail && a.axis == a.VERTICAL_AXIS ? c = a.detail : null == c && (
            c = a.wheelDelta
        );
        return {
            x: b,
            y: c
        };
    }
    
    function Jg(a) {
        a = af(a);
        a.x *= ca;
        a.y *= ca;
        return a;
    }
    
    function bf(a, b) {
        var c = af(b),
            d = c.x,
            c = c.y,
            e = a.display,
            f = e.scroller,
            g = f.scrollWidth > f.clientWidth,
            h = f.scrollHeight > f.clientHeight;
        if (d && g || c && h) {
            if (c && ia && P) {
                var g = b.target,
                    k = e.view;
                a:for (; g != f; g = g.parentNode) for (var l =
                                                                0; l < k.length; l++) if (k[l].node == g) {
                    a.display.currentWheelTarget = g;
                    break a;
                }
            }
            !d || za || la || null == ca ? (
                c && null != ca && (
                    h = c * ca, g = a.doc.scrollTop, k = g + e.wrapper.clientHeight, 0 > h ? g = Math.max(0, g + h - 50) : k = Math.min(a.doc.height, k + h + 50), Ad(a, {
                        top   : g,
                        bottom: k
                    })
                ), 20 > zc && (
                    null == e.wheelStartX ? (
                        e.wheelStartX = f.scrollLeft, e.wheelStartY = f.scrollTop, e.wheelDX = d, e.wheelDY = c, setTimeout(function () {
                            if (null != e.wheelStartX) {
                                var a         = f.scrollLeft - e.wheelStartX,
                                    b         = f.scrollTop - e.wheelStartY,
                                    a         = b && e.wheelDY && b / e.wheelDY || a && e.wheelDX && a /
                                        e.wheelDX;
                                e.wheelStartX = e.wheelStartY = null;
                                a && (
                                    ca = (
                                        ca * zc + a
                                    ) / (
                                        zc + 1
                                    ), ++zc
                                );
                            }
                        }, 200)
                    ) : (
                        e.wheelDX += d, e.wheelDY += c
                    )
                )
            ) : (
                c && h && Hb(a, Math.max(0, f.scrollTop + c * ca)), Sa(a, Math.max(0, f.scrollLeft + d * ca)), (
                    !c || c && h
                ) && T(b), e.wheelStartX = null
            );
        }
    }
    
    function ma(a, b) {
        var c = a[b];
        a.sort(function (a, b) {return x(a.from(), b.from());});
        b = L(a, c);
        for (c = 1; c < a.length; c++) {
            var d = a[c],
                e = a[c - 1];
            if (0 <= x(e.to(), d.from())) {
                var f = jc(e.from(), d.from()),
                    g = ic(e.to(), d.to()),
                    d = e.empty() ? d.from() == d.head : e.from() == e.head;
                c <= b && --b;
                a.splice(--c,
                    2, new A(d ? g : f, d ? f : g));
            }
        }
        return new da(a, b);
    }
    
    function xa(a, b) {return new da([new A(a, b || a)], 0);}
    
    function Ca(a) {
        return a.text ? q(a.from.line + a.text.length - 1, z(a.text).length + (
            1 == a.text.length ? a.from.ch : 0
        )) : a.to;
    }
    
    function cf(a, b) {
        if (0 > x(a, b.from)) return a;
        if (0 >= x(a, b.to)) return Ca(b);
        var c = a.line + b.text.length - (
            b.to.line - b.from.line
            ) - 1,
            d = a.ch;
        a.line == b.to.line && (
            d += Ca(b).ch - b.to.ch
        );
        return q(c, d);
    }
    
    function Ed(a, b) {
        for (var c = [], d = 0; d < a.sel.ranges.length; d++) {
            var e = a.sel.ranges[d];
            c.push(new A(cf(e.anchor, b),
                cf(e.head, b)));
        }
        return ma(c, a.sel.primIndex);
    }
    
    function df(a, b, c) {
        return a.line == b.line ? q(c.line, a.ch - b.ch + c.ch) : q(c.line + (
            a.line - b.line
        ), a.ch);
    }
    
    function Fd(a) {
        a.doc.mode = dd(a.options, a.doc.modeOption);
        Kb(a);
    }
    
    function Kb(a) {
        a.doc.iter(function (a) {
            a.stateAfter && (
                a.stateAfter = null
            );
            a.styles && (
                a.styles = null
            );
        });
        a.doc.modeFrontier = a.doc.highlightFrontier = a.doc.first;
        Ib(a, 100);
        a.state.modeGen++;
        a.curOp && U(a);
    }
    
    function ef(a, b) {
        return 0 == b.from.ch && 0 == b.to.ch && "" == z(b.text) && (
            !a.cm || a.cm.options.wholeLineUpdateBefore
        );
    }
    
    function Gd(a, b, c, d) {
        function e(a, c, e) {
            a.text = c;
            a.stateAfter && (
                a.stateAfter = null
            );
            a.styles && (
                a.styles = null
            );
            null != a.order && (
                a.order = null
            );
            be(a);
            ce(a, e);
            c = d ? d(a) : 1;
            c != a.height && na(a, c);
            N(a, "change", a, b);
        }
        
        function f(a, b) {
            for (var e = [], f = a; f < b; ++f) e.push(new hb(k[f], c ? c[f] : null, d));
            return e;
        }
        
        var g = b.from,
            h = b.to,
            k = b.text,
            l = t(a, g.line),
            m = t(a, h.line),
            p = z(k),
            n = c ? c[k.length - 1] : null,
            r = h.line - g.line;
        b.full ? (
            a.insert(0, f(0, k.length)), a.remove(k.length, a.size - k.length)
        ) : ef(a, b) ? (
            h = f(0, k.length - 1), e(m, m.text, n),
            r && a.remove(g.line, r), h.length && a.insert(g.line, h)
        ) : l == m ? 1 == k.length ? e(l, l.text.slice(0, g.ch) + p + l.text.slice(h.ch), n) : (
            r = f(1, k.length - 1), r.push(new hb(p + l.text.slice(h.ch), n, d)), e(l, l.text.slice(0, g.ch) + k[0], c ? c[0] : null), a.insert(g.line + 1, r)
        ) : 1 == k.length ? (
            e(l, l.text.slice(0, g.ch) + k[0] + m.text.slice(h.ch), c ? c[0] : null), a.remove(g.line + 1, r)
        ) : (
            e(l, l.text.slice(0, g.ch) + k[0], c ? c[0] : null), e(m, p + m.text.slice(h.ch), n), n = f(1, k.length - 1), 1 < r && a.remove(g.line + 1, r - 1), a.insert(g.line + 1, n)
        );
        N(a, "change", a, b);
    }
    
    function Va(a,
                b, c) {
        function d(a, f, g) {
            if (a.linked) for (var h = 0; h < a.linked.length; ++h) {
                var k = a.linked[h];
                if (k.doc != f) {
                    var l = g && k.sharedHist;
                    if (!c || l) b(k.doc, l), d(k.doc, a, l);
                }
            }
        }
        
        d(a, null, !0);
    }
    
    function ff(a, b) {
        if (b.cm) throw Error("This document is already in use.");
        a.doc = b;
        b.cm  = a;
        ud(a);
        Fd(a);
        gf(a);
        a.options.lineWrapping || $c(a);
        a.options.mode = b.modeOption;
        U(a);
    }
    
    function gf(a) {
        (
            "rtl" == a.doc.direction ? Fa : Ra
        )(a.display.lineDiv, "CodeMirror-rtl");
    }
    
    function Kg(a) {
        Z(a, function () {
            gf(a);
            U(a);
        });
    }
    
    function Ac(a) {
        this.done        = [];
        this.undone      =
            [];
        this.undoDepth   = Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOrigin  = this.lastSelOrigin = this.lastOp = this.lastSelOp = null;
        this.generation  = this.maxGeneration = a || 1;
    }
    
    function Hd(a, b) {
        var c = {
            from: Vc(b.from),
            to  : Ca(b),
            text: Ha(a, b.from, b.to)
        };
        hf(a, c, b.from.line, b.to.line + 1);
        Va(a, function (a) {return hf(a, c, b.from.line, b.to.line + 1);}, !0);
        return c;
    }
    
    function jf(a) {for (; a.length;) if (z(a).ranges) a.pop(); else break;}
    
    function kf(a, b, c, d) {
        var e           = a.history;
        e.undone.length = 0;
        var f           = +new Date,
            g,
            h,
            k;
        if (k = e.lastOp ==
            d || e.lastOrigin == b.origin && b.origin && (
                "+" == b.origin.charAt(0) && e.lastModTime > f - (
                    a.cm ? a.cm.options.historyEventDelay : 500
                ) || "*" == b.origin.charAt(0)
            )) e.lastOp == d ? (
            jf(e.done), g = z(e.done)
        ) : e.done.length && !z(e.done).ranges ? g = z(e.done) : 1 < e.done.length && !e.done[e.done.length - 2].ranges ? (
            e.done.pop(), g = z(e.done)
        ) : g = void 0, k = g;
        if (k) h = z(g.changes), 0 == x(b.from, b.to) && 0 == x(b.from, h.to) ? h.to = Ca(b) : g.changes.push(Hd(a, b)); else for ((
                                                                                                                                       g = z(e.done)
                                                                                                                                   ) && g.ranges || Bc(a.sel, e.done), g = {
            changes   : [Hd(a, b)],
            generation: e.generation
        },
                                                                                                                                       e.done.push(g); e.done.length > e.undoDepth;) e.done.shift(), e.done[0].ranges || e.done.shift();
        e.done.push(c);
        e.generation  = ++e.maxGeneration;
        e.lastModTime = e.lastSelTime = f;
        e.lastOp      = e.lastSelOp = d;
        e.lastOrigin  = e.lastSelOrigin = b.origin;
        h || F(a, "historyAdded");
    }
    
    function Bc(a, b) {
        var c = z(b);
        c && c.ranges && c.equals(a) || b.push(a);
    }
    
    function hf(a, b, c, d) {
        var e = b["spans_" + a.id],
            f = 0;
        a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function (c) {
            c.markedSpans && (
                (
                    e || (
                        e = b["spans_" + a.id] = {}
                    )
                )[f] = c.markedSpans
            );
            ++f;
        });
    }
    
    function Lg(a) {
        if (!a) return null;
        for (var b, c = 0; c < a.length; ++c) a[c].marker.explicitlyCleared ? b || (
            b = a.slice(0, c)
        ) : b && b.push(a[c]);
        return b ? b.length ? b : null : a;
    }
    
    function lf(a, b) {
        var c;
        if (c = b["spans_" + a.id]) {
            for (var d = [], e = 0; e < b.text.length; ++e) d.push(Lg(c[e]));
            c = d;
        } else c = null;
        d = Wc(a, b);
        if (!c) return d;
        if (!d) return c;
        for (e = 0; e < c.length; ++e) {
            var f = c[e],
                g = d[e];
            if (f && g) {
                var h = 0;
                a:for (; h < g.length; ++h) {
                    for (var k = g[h], l = 0; l < f.length; ++l) if (f[l].marker == k.marker) continue a;
                    f.push(k);
                }
            } else g && (
                c[e] = g
            );
        }
        return c;
    }
    
    function ib(a, b, c) {
        for (var d = [], e =
            0; e < a.length; ++e) {
            var f = a[e];
            if (f.ranges) d.push(c ? da.prototype.deepCopy.call(f) : f); else {
                var f = f.changes,
                    g = [];
                d.push({changes: g});
                for (var h = 0; h < f.length; ++h) {
                    var k = f[h],
                        l = void 0;
                    g.push({
                        from: k.from,
                        to  : k.to,
                        text: k.text
                    });
                    if (b) for (var m in k) (
                        l = m.match(/^spans_(\d+)$/)
                    ) && -1 < L(b, Number(l[1])) && (
                        z(g)[m] = k[m], delete k[m]
                    );
                }
            }
        }
        return d;
    }
    
    function Id(a, b, c, d) {
        return d ? (
            a = a.anchor, c && (
                d = 0 > x(b, a), d != 0 > x(c, a) ? (
                    a = b, b = c
                ) : d != 0 > x(b, c) && (
                    b = c
                )
            ), new A(a, b)
        ) : new A(c || b, b);
    }
    
    function Cc(a, b, c, d, e) {
        null == e && (
            e = a.cm && (
                a.cm.display.shift ||
                a.extend
            )
        );
        O(a, new da([Id(a.sel.primary(), b, c, e)], 0), d);
    }
    
    function mf(a, b, c) {
        for (var d = [], e = a.cm && (
            a.cm.display.shift || a.extend
        ), f       = 0; f < a.sel.ranges.length; f++) d[f] = Id(a.sel.ranges[f], b[f], null, e);
        b = ma(d, a.sel.primIndex);
        O(a, b, c);
    }
    
    function Jd(a, b, c, d) {
        var e = a.sel.ranges.slice(0);
        e[b]  = c;
        O(a, ma(e, a.sel.primIndex), d);
    }
    
    function Mg(a, b, c) {
        c = {
            ranges: b.ranges,
            update: function (b) {
                this.ranges = [];
                for (var c = 0; c < b.length; c++) this.ranges[c] = new A(w(a, b[c].anchor), w(a, b[c].head));
            },
            origin: c && c.origin
        };
        F(a, "beforeSelectionChange",
            a, c);
        a.cm && F(a.cm, "beforeSelectionChange", a.cm, c);
        return c.ranges != b.ranges ? ma(c.ranges, c.ranges.length - 1) : b;
    }
    
    function nf(a, b, c) {
        var d = a.history.done,
            e = z(d);
        e && e.ranges ? (
            d[d.length - 1] = b, Dc(a, b, c)
        ) : O(a, b, c);
    }
    
    function O(a, b, c) {
        Dc(a, b, c);
        b = a.sel;
        var d = a.cm ? a.cm.curOp.id : NaN,
            e = a.history,
            f = c && c.origin,
            g;
        if (!(
            g = d == e.lastSelOp
        ) && (
            g = f && e.lastSelOrigin == f
        ) && !(
            g = e.lastModTime == e.lastSelTime && e.lastOrigin == f
        )) {
            g     = z(e.done);
            var h = f.charAt(0);
            g     = "*" == h || "+" == h && g.ranges.length == b.ranges.length && g.somethingSelected() ==
                b.somethingSelected() && new Date - a.history.lastSelTime <= (
                    a.cm ? a.cm.options.historyEventDelay : 500
                );
        }
        g ? e.done[e.done.length - 1] = b : Bc(b, e.done);
        e.lastSelTime   = +new Date;
        e.lastSelOrigin = f;
        e.lastSelOp     = d;
        c && !1 !== c.clearRedo && jf(e.undone);
    }
    
    function Dc(a, b, c) {
        if (ga(a, "beforeSelectionChange") || a.cm && ga(a.cm, "beforeSelectionChange")) b = Mg(a, b, c);
        var d = c && c.bias || (
            0 > x(b.primary().head, a.sel.primary().head) ? -1 : 1
        );
        of(a, pf(a, b, d, !0));
        c && !1 === c.scroll || !a.cm || fb(a.cm);
    }
    
    function of(a, b) {
        b.equals(a.sel) || (
            a.sel = b, a.cm &&
            (
                a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0, fe(a.cm)
            ), N(a, "cursorActivity", a)
        );
    }
    
    function qf(a) {of(a, pf(a, a.sel, null, !1));}
    
    function pf(a, b, c, d) {
        for (var e, f = 0; f < b.ranges.length; f++) {
            var g = b.ranges[f],
                h = b.ranges.length == a.sel.ranges.length && a.sel.ranges[f],
                k = Kd(a, g.anchor, h && h.anchor, c, d),
                h = Kd(a, g.head, h && h.head, c, d);
            if (e || k != g.anchor || h != g.head) e || (
                e = b.ranges.slice(0, f)
            ), e[f] = new A(k, h);
        }
        return e ? ma(e, b.primIndex) : b;
    }
    
    function jb(a, b, c, d, e) {
        var f = t(a, b.line);
        if (f.markedSpans) for (var g = 0; g < f.markedSpans.length; ++g) {
            var h =
                    f.markedSpans[g],
                k = h.marker;
            if ((
                null == h.from || (
                    k.inclusiveLeft ? h.from <= b.ch : h.from < b.ch
                )
            ) && (
                null == h.to || (
                    k.inclusiveRight ? h.to >= b.ch : h.to > b.ch
                )
            )) {
                if (e && (
                    F(k, "beforeCursorEnter"), k.explicitlyCleared
                )) if (f.markedSpans) {
                    --g;
                    continue;
                } else break;
                if (k.atomic) {
                    if (c) {
                        g = k.find(0 > d ? 1 : -1);
                        h = void 0;
                        if (0 > d ? k.inclusiveRight : k.inclusiveLeft) g = rf(a, g, -d, g && g.line == b.line ? f : null);
                        if (g && g.line == b.line && (
                            h = x(g, c)
                        ) && (
                            0 > d ? 0 > h : 0 < h
                        )) return jb(a, g, b, d, e);
                    }
                    c = k.find(0 > d ? -1 : 1);
                    if (0 > d ? k.inclusiveLeft : k.inclusiveRight) c = rf(a,
                        c, d, c.line == b.line ? f : null);
                    return c ? jb(a, c, b, d, e) : null;
                }
            }
        }
        return b;
    }
    
    function Kd(a, b, c, d, e) {
        d = d || 1;
        b = jb(a, b, c, d, e) || !e && jb(a, b, c, d, !0) || jb(a, b, c, -d, e) || !e && jb(a, b, c, -d, !0);
        return b ? b : (
            a.cantEdit = !0, q(a.first, 0)
        );
    }
    
    function rf(a, b, c, d) {
        return 0 > c && 0 == b.ch ? b.line > a.first ? w(a, q(b.line - 1)) : null : 0 < c && b.ch == (
            d || t(a, b.line)
        ).text.length ? b.line < a.first + a.size - 1 ? q(b.line + 1, 0) : null : new q(b.line, b.ch + c);
    }
    
    function sf(a) {a.setSelection(q(a.firstLine(), 0), q(a.lastLine()), sa);}
    
    function tf(a, b, c) {
        var d = {
            canceled: !1,
            from    : b.from,
            to      : b.to,
            text    : b.text,
            origin  : b.origin,
            cancel  : function () {return d.canceled = !0;}
        };
        c && (
            d.update = function (b, c, g, h) {
                b && (
                    d.from = w(a, b)
                );
                c && (
                    d.to = w(a, c)
                );
                g && (
                    d.text = g
                );
                void 0 !== h && (
                    d.origin = h
                );
            }
        );
        F(a, "beforeChange", a, d);
        a.cm && F(a.cm, "beforeChange", a.cm, d);
        return d.canceled ? null : {
            from  : d.from,
            to    : d.to,
            text  : d.text,
            origin: d.origin
        };
    }
    
    function kb(a, b, c) {
        if (a.cm) {
            if (!a.cm.curOp) return J(a.cm, kb)(a, b, c);
            if (a.cm.state.suppressEdits) return;
        }
        if (ga(a, "beforeChange") || a.cm && ga(a.cm, "beforeChange")) if (b = tf(a, b, !0), !b) return;
        if (c = uf && !c && lg(a, b.from, b.to)) for (var d = c.length - 1; 0 <= d; --d) vf(a, {
            from  : c[d].from,
            to    : c[d].to,
            text  : d ? [""] : b.text,
            origin: b.origin
        }); else vf(a, b);
    }
    
    function vf(a, b) {
        if (1 != b.text.length || "" != b.text[0] || 0 != x(b.from, b.to)) {
            var c = Ed(a, b);
            kf(a, b, c, a.cm ? a.cm.curOp.id : NaN);
            Lb(a, b, c, Wc(a, b));
            var d = [];
            Va(a, function (a, c) {
                c || -1 != L(d, a.history) || (
                    wf(a.history, b), d.push(a.history)
                );
                Lb(a, b, null, Wc(a, b));
            });
        }
    }
    
    function Ec(a, b, c) {
        var d = a.cm && a.cm.state.suppressEdits;
        if (!d || c) {
            for (var e                                           = a.history, f, g = a.sel, h              = "undo" == b ? e.done :
                e.undone, k = "undo" == b ? e.undone : e.done, l = 0; l < h.length && (
                f = h[l], c ? !f.ranges || f.equals(a.sel) : f.ranges
            ); l++) ;
            if (l != h.length) {
                for (e.lastOrigin = e.lastSelOrigin = null; ;) if (f = h.pop(), f.ranges) {
                    Bc(f, k);
                    if (c && !f.equals(a.sel)) {
                        O(a, f, {clearRedo: !1});
                        return;
                    }
                    g = f;
                } else {
                    if (d) {
                        h.push(f);
                        return;
                    }
                    break;
                }
                var m = [];
                Bc(g, k);
                k.push({
                    changes   : m,
                    generation: e.generation
                });
                e.generation = f.generation || ++e.maxGeneration;
                var p        = ga(a, "beforeChange") || a.cm && ga(a.cm, "beforeChange");
                c            = function (c) {
                    var d    = f.changes[c];
                    d.origin = b;
                    if (p && !tf(a,
                        d, !1)) return h.length = 0, {};
                    m.push(Hd(a, d));
                    var e = c ? Ed(a, d) : z(h);
                    Lb(a, d, e, lf(a, d));
                    !c && a.cm && a.cm.scrollIntoView({
                        from: d.from,
                        to  : Ca(d)
                    });
                    var g = [];
                    Va(a, function (a, b) {
                        b || -1 != L(g, a.history) || (
                            wf(a.history, d), g.push(a.history)
                        );
                        Lb(a, d, null, lf(a, d));
                    });
                };
                for (d = f.changes.length - 1; 0 <= d; --d) if (e = c(d)) return e.v;
            }
        }
    }
    
    function xf(a, b) {
        if (0 != b && (
            a.first += b, a.sel = new da(gc(a.sel.ranges, function (a) {return new A(q(a.anchor.line + b, a.anchor.ch), q(a.head.line + b, a.head.ch));}), a.sel.primIndex), a.cm
        )) {
            U(a.cm, a.first, a.first -
                b, b);
            for (var c = a.cm.display, d = c.viewFrom; d < c.viewTo; d++) Ba(a.cm, d, "gutter");
        }
    }
    
    function Lb(a, b, c, d) {
        if (a.cm && !a.cm.curOp) return J(a.cm, Lb)(a, b, c, d);
        if (b.to.line < a.first) xf(a, b.text.length - 1 - (
            b.to.line - b.from.line
        )); else if (!(
            b.from.line > a.lastLine()
        )) {
            if (b.from.line < a.first) {
                var e = b.text.length - 1 - (
                    a.first - b.from.line
                );
                xf(a, e);
                b = {
                    from  : q(a.first, 0),
                    to    : q(b.to.line + e, b.to.ch),
                    text  : [z(b.text)],
                    origin: b.origin
                };
            }
            e = a.lastLine();
            b.to.line > e && (
                b = {
                    from  : b.from,
                    to    : q(e, t(a, e).text.length),
                    text  : [b.text[0]],
                    origin: b.origin
                }
            );
            b.removed = Ha(a, b.from, b.to);
            c || (
                c = Ed(a, b)
            );
            a.cm ? Ng(a.cm, b, d) : Gd(a, b, d);
            Dc(a, c, sa);
        }
    }
    
    function Ng(a, b, c) {
        var d = a.doc,
            e = a.display,
            f = b.from,
            g = b.to,
            h = !1,
            k = f.line;
        a.options.lineWrapping || (
            k = C(oa(t(d, f.line))), d.iter(k, g.line + 1, function (a) {if (a == e.maxLine) return h = !0;})
        );
        -1 < d.sel.contains(b.from, b.to) && fe(a);
        Gd(d, b, c, Le(a));
        a.options.lineWrapping || (
            d.iter(k, f.line + b.text.length, function (a) {
                var b = lc(a);
                b > e.maxLineLength && (
                    e.maxLine = a, e.maxLineLength = b, e.maxLineChanged = !0, h = !1
                );
            }), h && (
                a.curOp.updateMaxLine = !0
            )
        );
        sg(d, f.line);
        Ib(a, 400);
        c = b.text.length - (
            g.line - f.line
        ) - 1;
        b.full ? U(a) : f.line != g.line || 1 != b.text.length || ef(a.doc, b) ? U(a, f.line, g.line + 1, c) : Ba(a, f.line, "text");
        c = ga(a, "changes");
        if ((
            d = ga(a, "change")
        ) || c) b = {
            from   : f,
            to     : g,
            text   : b.text,
            removed: b.removed,
            origin : b.origin
        }, d && N(a, "change", a, b), c && (
            a.curOp.changeObjs || (
                a.curOp.changeObjs = []
            )
        ).push(b);
        a.display.selForContextMenu = null;
    }
    
    function lb(a, b, c, d, e) {
        d || (
            d = c
        );
        if (0 > x(d, c)) {
            var f;
            f = [d, c];
            c = f[0];
            d = f[1];
            f;
        }
        "string" == typeof b && (
            b = a.splitLines(b)
        );
        kb(a, {
            from  : c,
            to    : d,
            text  : b,
            origin: e
        });
    }
    
    function yf(a, b, c, d) {
        c < a.line ? a.line += d : b < a.line && (
            a.line = b, a.ch = 0
        );
    }
    
    function zf(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e],
                g = !0;
            if (f.ranges) for (f.copied || (
                f = a[e] = f.deepCopy(), f.copied = !0
            ), g = 0; g < f.ranges.length; g++) yf(f.ranges[g].anchor, b, c, d), yf(f.ranges[g].head, b, c, d); else {
                for (var h = 0; h < f.changes.length; ++h) {
                    var k = f.changes[h];
                    if (c < k.from.line) k.from = q(k.from.line + d, k.from.ch), k.to = q(k.to.line + d, k.to.ch); else if (b <= k.to.line) {
                        g = !1;
                        break;
                    }
                }
                g || (
                    a.splice(0, e + 1), e = 0
                );
            }
        }
    }
    
    function wf(a,
                b) {
        var c = b.from.line,
            d = b.to.line,
            e = b.text.length - (
                d - c
            ) - 1;
        zf(a.done, c, d, e);
        zf(a.undone, c, d, e);
    }
    
    function Mb(a, b, c, d) {
        var e = b,
            f = b;
        "number" == typeof b ? f = t(a, Math.max(a.first, Math.min(b, a.first + a.size - 1))) : e = C(b);
        if (null == e) return null;
        d(f, e) && a.cm && Ba(a.cm, e, c);
        return f;
    }
    
    function Nb(a) {
        this.lines  = a;
        this.parent = null;
        for (var b = 0, c = 0; c < a.length; ++c) a[c].parent = this, b += a[c].height;
        this.height = b;
    }
    
    function Ob(a) {
        this.children = a;
        for (var b = 0, c = 0, d = 0; d < a.length; ++d) {
            var e = a[d],
                b = b + e.chunkSize(),
                c = c + e.height;
            e.parent =
                this;
        }
        this.size   = b;
        this.height = c;
        this.parent = null;
    }
    
    function Og(a, b, c, d) {
        var e = new Pb(a, c, d),
            f = a.cm;
        f && e.noHScroll && (
            f.display.alignWidgets = !0
        );
        Mb(a, b, "widget", function (b) {
            var c = b.widgets || (
                b.widgets = []
            );
            null == e.insertAt ? c.push(e) : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e);
            e.line = b;
            f && !Ja(a, b) && (
                c = pa(b) < a.scrollTop, na(b, b.height + Bb(e)), c && vc(f, e.height), f.curOp.forceUpdate = !0
            );
            return !0;
        });
        f && N(f, "lineWidgetAdded", f, e, "number" == typeof b ? b : C(b));
        return e;
    }
    
    function mb(a, b, c, d, e) {
        if (d && d.shared) return Pg(a,
            b, c, d, e);
        if (a.cm && !a.cm.curOp) return J(a.cm, mb)(a, b, c, d, e);
        var f = new Da(a, e);
        e     = x(b, c);
        d && Ga(d, f, !1);
        if (0 < e || 0 == e && !1 !== f.clearWhenEmpty) return f;
        f.replacedWith && (
            f.collapsed = !0, f.widgetNode = Za("span", [f.replacedWith], "CodeMirror-widget"), d.handleMouseEvents || f.widgetNode.setAttribute("cm-ignore-events", "true"), d.insertLeft && (
                f.widgetNode.insertLeft = !0
            )
        );
        if (f.collapsed) {
            if (de(a, b.line, b, c, f) || b.line != c.line && de(a, c.line, b, c, f)) throw Error("Inserting collapsed marker partially overlapping an existing one");
            ua = !0;
        }
        f.addToHistory && kf(a, {
            from  : b,
            to    : c,
            origin: "markText"
        }, a.sel, NaN);
        var g = b.line,
            h = a.cm,
            k;
        a.iter(g, c.line + 1, function (a) {
            h && f.collapsed && !h.options.lineWrapping && oa(a) == h.display.maxLine && (
                k = !0
            );
            f.collapsed && g != b.line && na(a, 0);
            var d         = new kc(f, g == b.line ? b.ch : null, g == c.line ? c.ch : null);
            a.markedSpans = a.markedSpans ? a.markedSpans.concat([d]) : [d];
            d.marker.attachLine(a);
            ++g;
        });
        f.collapsed && a.iter(b.line, c.line + 1, function (b) {Ja(a, b) && na(b, 0);});
        f.clearOnEnter && v(f, "beforeCursorEnter", function () {return f.clear();});
        f.readOnly && (
            uf = !0, (
                a.history.done.length || a.history.undone.length
            ) && a.clearHistory()
        );
        f.collapsed && (
            f.id = ++Af, f.atomic = !0
        );
        if (h) {
            k && (
                h.curOp.updateMaxLine = !0
            );
            if (f.collapsed) U(h, b.line, c.line + 1); else if (f.className || f.title || f.startStyle || f.endStyle || f.css) for (d = b.line; d <= c.line; d++) Ba(h, d, "text");
            f.atomic && qf(h.doc);
            N(h, "markerAdded", h, f);
        }
        return f;
    }
    
    function Pg(a, b, c, d, e) {
        d = Ga(d);
        d.shared = !1;
        var f = [mb(a, b, c, d, e)],
            g = f[0],
            h = d.widgetNode;
        Va(a, function (a) {
            h && (
                d.widgetNode = h.cloneNode(!0)
            );
            f.push(mb(a,
                w(a, b), w(a, c), d, e));
            for (var l = 0; l < a.linked.length; ++l) if (a.linked[l].isParent) return;
            g = z(f);
        });
        return new Qb(f, g);
    }
    
    function Bf(a) {return a.findMarks(q(a.first, 0), a.clipPos(q(a.lastLine())), function (a) {return a.parent;});}
    
    function Qg(a) {
        for (var b = function (b) {
            b     = a[b];
            var c = [b.primary.doc];
            Va(b.primary.doc, function (a) {return c.push(a);});
            for (var f = 0; f < b.markers.length; f++) {
                var g = b.markers[f];
                -1 == L(c, g.doc) && (
                    g.parent = null, b.markers.splice(f--, 1)
                );
            }
        }, c       = 0; c < a.length; c++) b(c);
    }
    
    function Rg(a) {
        var b = this;
        Cf(b);
        if (!I(b,
            a) && !wa(b.display, a)) {
            T(a);
            B && (
                Df = +new Date
            );
            var c = Qa(b, a, !0),
                d = a.dataTransfer.files;
            if (c && !b.isReadOnly()) if (d && d.length && window.FileReader && window.File) for (var e = d.length, f = Array(e), g = 0, h = function (a, d) {
                if (!b.options.allowDropFileTypes || -1 != L(b.options.allowDropFileTypes, a.type)) {
                    var h    = new FileReader;
                    h.onload = J(b, function () {
                        var a = h.result;
                        /[\x00-\x08\x0e-\x1f]{2}/.test(a) && (
                            a = ""
                        );
                        f[d] = a;
                        ++g == e && (
                            c = w(b.doc, c), a = {
                                from  : c,
                                to    : c,
                                text  : b.doc.splitLines(f.join(b.doc.lineSeparator())),
                                origin: "paste"
                            }, kb(b.doc,
                                a), nf(b.doc, xa(c, Ca(a)))
                        );
                    });
                    h.readAsText(a);
                }
            }, k                                                                                        = 0; k < e; ++k) h(d[k], k); else if (b.state.draggingText && -1 < b.doc.sel.contains(c)) b.state.draggingText(a), setTimeout(function () {return b.display.input.focus();}, 20); else try {
                if (h = a.dataTransfer.getData("Text")) {
                    b.state.draggingText && !b.state.draggingText.copy && (
                        k = b.listSelections()
                    );
                    Dc(b.doc, xa(c, c));
                    if (k) for (d = 0; d < k.length; ++d) lb(b.doc, "", k[d].anchor, k[d].head, "drag");
                    b.replaceSelection(h, "around", "paste");
                    b.display.input.focus();
                }
            } catch (l) {}
        }
    }
    
    function Cf(a) {
        a.display.dragCursor &&
        (
            a.display.lineSpace.removeChild(a.display.dragCursor), a.display.dragCursor = null
        );
    }
    
    function Ef(a) {
        if (document.getElementsByClassName) for (var b = document.getElementsByClassName("CodeMirror"), c = 0; c < b.length; c++) {
            var d = b[c].CodeMirror;
            d && a(d);
        }
    }
    
    function Sg() {
        var a;
        v(window, "resize", function () {
            null == a && (
                a = setTimeout(function () {
                    a = null;
                    Ef(Tg);
                }, 100)
            );
        });
        v(window, "blur", function () {return Ef(Fb);});
    }
    
    function Tg(a) {
        var b               = a.display;
        b.cachedCharWidth   = b.cachedTextHeight = b.cachedPaddingH = null;
        b.scrollbarsClipped = !1;
        a.setSize();
    }
    
    function Ug(a) {
        var b = a.split(/-(?!$)/);
        a     = b[b.length - 1];
        for (var c, d, e, f, g = 0; g < b.length - 1; g++) {
            var h = b[g];
            if (/^(cmd|meta|m)$/i.test(h)) f = !0; else if (/^a(lt)?$/i.test(h)) c = !0; else if (/^(c|ctrl|control)$/i.test(h)) d = !0; else if (/^s(hift)?$/i.test(h)) e = !0; else throw Error("Unrecognized modifier name: " + h);
        }
        c && (
            a = "Alt-" + a
        );
        d && (
            a = "Ctrl-" + a
        );
        f && (
            a = "Cmd-" + a
        );
        e && (
            a = "Shift-" + a
        );
        return a;
    }
    
    function Vg(a) {
        var b = {},
            c;
        for (c in a) if (a.hasOwnProperty(c)) {
            var d = a[c];
            if (!/^(name|fallthrough|(de|at)tach)$/.test(c)) {
                if ("..." !=
                    d) for (var e = gc(c.split(" "), Ug), f = 0; f < e.length; f++) {
                    var g = void 0,
                        h = void 0;
                    f == e.length - 1 ? (
                        h = e.join(" "), g = d
                    ) : (
                        h = e.slice(0, f + 1).join(" "), g = "..."
                    );
                    var k = b[h];
                    if (!k) b[h] = g; else if (k != g) throw Error("Inconsistent bindings for " + h);
                }
                delete a[c];
            }
        }
        for (var l in b) a[l] = b[l];
        return a;
    }
    
    function nb(a, b, c, d) {
        b     = Fc(b);
        var e = b.call ? b.call(a, d) : b[a];
        if (!1 === e) return "nothing";
        if ("..." === e) return "multi";
        if (null != e && c(e)) return "handled";
        if (b.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(b.fallthrough)) return nb(a,
                b.fallthrough, c, d);
            for (e = 0; e < b.fallthrough.length; e++) {
                var f = nb(a, b.fallthrough[e], c, d);
                if (f) return f;
            }
        }
    }
    
    function Ff(a) {
        a = "string" == typeof a ? a : Ea[a.keyCode];
        return "Ctrl" == a || "Alt" == a || "Shift" == a || "Mod" == a;
    }
    
    function Gf(a, b, c) {
        var d = a;
        b.altKey && "Alt" != d && (
            a = "Alt-" + a
        );
        (
            Hf ? b.metaKey : b.ctrlKey
        ) && "Ctrl" != d && (
            a = "Ctrl-" + a
        );
        (
            Hf ? b.ctrlKey : b.metaKey
        ) && "Cmd" != d && (
            a = "Cmd-" + a
        );
        !c && b.shiftKey && "Shift" != d && (
            a = "Shift-" + a
        );
        return a;
    }
    
    function If(a, b) {
        if (la && 34 == a.keyCode && a["char"]) return !1;
        var c = Ea[a.keyCode];
        if (null ==
            c || a.altGraphKey) return !1;
        3 == a.keyCode && a.code && (
            c = a.code
        );
        return Gf(c, a, b);
    }
    
    function Fc(a) {return "string" == typeof a ? Rb[a] : a;}
    
    function ob(a, b) {
        for (var c = a.doc.sel.ranges, d = [], e = 0; e < c.length; e++) {
            for (var f = b(c[e]); d.length && 0 >= x(f.from, z(d).to);) {
                var g = d.pop();
                if (0 > x(g.from, f.from)) {
                    f.from = g.from;
                    break;
                }
            }
            d.push(f);
        }
        Z(a, function () {
            for (var b = d.length - 1; 0 <= b; b--) lb(a.doc, "", d[b].from, d[b].to, "+delete");
            fb(a);
        });
    }
    
    function Ld(a, b, c) {
        b = Zd(a.text, b + c, c);
        return 0 > b || b > a.text.length ? null : b;
    }
    
    function Md(a, b, c) {
        a = Ld(a,
            b.ch, c);
        return null == a ? null : new q(b.line, a, 0 > c ? "after" : "before");
    }
    
    function Nd(a, b, c, d, e) {
        if (a && (
            a = va(c, b.doc.direction)
        )) {
            a     = 0 > e ? z(a) : a[0];
            var f = 0 > e == (
                1 == a.level
                ) ? "after" : "before",
                g;
            if (0 < a.level || "rtl" == b.doc.direction) {
                var h = Na(b, c);
                g     = 0 > e ? c.text.length - 1 : 0;
                var k = ja(b, h, g).top;
                g     = rb(function (a) {return ja(b, h, a).top == k;}, 0 > e == (
                    1 == a.level
                ) ? a.from : a.to - 1, g);
                "before" == f && (
                    g = Ld(c, g, 1)
                );
            } else g = 0 > e ? a.to : a.from;
            return new q(d, g, f);
        }
        return new q(d, 0 > e ? c.text.length : 0, 0 > e ? "before" : "after");
    }
    
    function Wg(a, b, c, d) {
        var e =
                va(b, a.doc.direction);
        if (!e) return Md(b, c, d);
        c.ch >= b.text.length ? (
            c.ch = b.text.length, c.sticky = "before"
        ) : 0 >= c.ch && (
            c.ch = 0, c.sticky = "after"
        );
        var f = vb(e, c.ch, c.sticky),
            g = e[f];
        if ("ltr" == a.doc.direction && 0 == g.level % 2 && (
            0 < d ? g.to > c.ch : g.from < c.ch
        )) return Md(b, c, d);
        var h = function (a, c) {return Ld(b, a instanceof q ? a.ch : a, c);},
            k,
            l = function (c) {
                if (!a.options.lineWrapping) return {
                    begin: 0,
                    end: b.text.length
                };
                k = k || Na(a, b);
                return Ke(a, b, k, c);
            },
            m = l("before" == c.sticky ? h(c, -1) : c.ch);
        if ("rtl" == a.doc.direction || 1 == g.level) {
            var p =
                    1 == g.level == 0 > d,
                n = h(c, p ? 1 : -1);
            if (null != n && (
                p ? n <= g.to && n <= m.end : n >= g.from && n >= m.begin
            )) return new q(c.line, n, p ? "before" : "after");
        }
        g = function (a, b, d) {
            for (var f = function (a, b) {return b ? new q(c.line, h(a, 1), "before") : new q(c.line, a, "after");}; 0 <= a && a < e.length; a += b) {
                var g = e[a],
                    k = 0 < b == (
                        1 != g.level
                    ),
                    l = k ? d.begin : h(d.end, -1);
                if (g.from <= l && l < g.to) return f(l, k);
                l = k ? g.from : h(g.to, -1);
                if (d.begin <= l && l < d.end) return f(l, k);
            }
        };
        if (f = g(f + d, d, m)) return f;
        m = 0 < d ? m.end : h(m.begin, -1);
        return null == m || 0 < d && m == b.text.length || !(
            f =
                g(0 < d ? 0 : e.length - 1, d, l(m))
        ) ? null : f;
    }
    
    function Jf(a, b) {
        var c = t(a.doc, b),
            d = oa(c);
        d != c && (
            b = C(d)
        );
        return Nd(!0, a, d, b, 1);
    }
    
    function Kf(a, b) {
        var c = Jf(a, b.line),
            d = t(a.doc, c.line),
            e = va(d, a.doc.direction);
        return e && 0 != e[0].level ? c : (
            d = Math.max(0, d.text.search(/\S/)), q(c.line, b.line == c.line && b.ch <= d && b.ch ? 0 : d, c.sticky)
        );
    }
    
    function Gc(a, b, c) {
        if ("string" == typeof b && (
            b = Sb[b], !b
        )) return !1;
        a.display.input.ensurePolled();
        var d = a.display.shift,
            e = !1;
        try {
            a.isReadOnly() && (
                a.state.suppressEdits = !0
            ), c && (
                a.display.shift = !1
            ), e =
                b(a) != Hc;
        } finally {a.display.shift = d, a.state.suppressEdits = !1;}
        return e;
    }
    
    function Tb(a, b, c, d) {
        var e = a.state.keySeq;
        if (e) {
            if (Ff(b)) return "handled";
            /\'$/.test(b) ? a.state.keySeq = null : Xg.set(50, function () {
                a.state.keySeq == e && (
                    a.state.keySeq = null, a.display.input.reset()
                );
            });
            if (Lf(a, e + " " + b, c, d)) return !0;
        }
        return Lf(a, b, c, d);
    }
    
    function Lf(a, b, c, d) {
        a:{
            for (var e = 0; e < a.state.keyMaps.length; e++) {
                var f = nb(b, a.state.keyMaps[e], d, a);
                if (f) {
                    d = f;
                    break a;
                }
            }
            d = a.options.extraKeys && nb(b, a.options.extraKeys, d, a) || nb(b, a.options.keyMap,
                d, a);
        }
        "multi" == d && (
            a.state.keySeq = b
        );
        "handled" == d && N(a, "keyHandled", a, b, c);
        if ("handled" == d || "multi" == d) T(c), vd(a);
        return !!d;
    }
    
    function Mf(a, b) {
        var c = If(b, !0);
        return c ? b.shiftKey && !a.state.keySeq ? Tb(a, "Shift-" + c, b, function (b) {return Gc(a, b, !0);}) || Tb(a, c, b, function (b) {if ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion) return Gc(a, b);}) : Tb(a, c, b, function (b) {return Gc(a, b);}) : !1;
    }
    
    function Yg(a, b, c) {return Tb(a, "'" + c + "'", b, function (b) {return Gc(a, b, !0);});}
    
    function Nf(a) {
        this.curOp.focus = ta();
        if (!I(this, a)) {
            B &&
            11 > D && 27 == a.keyCode && (
                a.returnValue = !1
            );
            var b              = a.keyCode;
            this.display.shift = 16 == b || a.shiftKey;
            var c              = Mf(this, a);
            la && (
                Od = c ? b : null, !c && 88 == b && !Zg && (
                    ia ? a.metaKey : a.ctrlKey
                ) && this.replaceSelection("", null, "cut")
            );
            18 != b || /\bCodeMirror-crosshair\b/.test(this.display.lineDiv.className) || $g(this);
        }
    }
    
    function $g(a) {
        function b(a) {
            18 != a.keyCode && a.altKey || (
                Ra(c, "CodeMirror-crosshair"), ba(document, "keyup", b), ba(document, "mouseover", b)
            );
        }
        
        var c = a.display.lineDiv;
        Fa(c, "CodeMirror-crosshair");
        v(document, "keyup", b);
        v(document,
            "mouseover", b);
    }
    
    function Of(a) {
        16 == a.keyCode && (
            this.doc.sel.shift = !1
        );
        I(this, a);
    }
    
    function Pf(a) {
        if (!(
            wa(this.display, a) || I(this, a) || a.ctrlKey && !a.altKey || ia && a.metaKey
        )) {
            var b = a.keyCode,
                c = a.charCode;
            if (la && b == Od) Od = null, T(a); else if (!la || a.which && !(
                10 > a.which
            ) || !Mf(this, a)) if (b = String.fromCharCode(null == c ? b : c), "\b" != b && !Yg(this, a, b)) this.display.input.onKeyPress(a);
        }
    }
    
    function ah(a, b) {
        var c = +new Date;
        if (Ub && Ub.compare(c, a, b)) return Vb = Ub = null, "triple";
        if (Vb && Vb.compare(c, a, b)) return Ub = new Pd(c, a, b),
            Vb = null, "double";
        Vb = new Pd(c, a, b);
        Ub = null;
        return "single";
    }
    
    function Qf(a) {
        var b = this.display;
        if (!(
            I(this, a) || b.activeTouch && b.input.supportsTouch()
        )) if (b.input.ensurePolled(), b.shift = a.shiftKey, wa(b, a)) P || (
            b.scroller.draggable = !1, setTimeout(function () {return b.scroller.draggable = !0;}, 100)
        ); else if (!Ic(this, a, "gutterClick", !0)) {
            var c = Qa(this, a),
                d = he(a),
                e = c ? ah(c, d) : "single";
            window.focus();
            1 == d && this.state.selectingText && this.state.selectingText(a);
            c && bh(this, d, c, e, a) || (
                1 == d ? c ? ch(this, c, e, a) : (
                    a.target ||
                    a.srcElement
                ) == b.scroller && T(a) : 2 == d ? (
                    c && Cc(this.doc, c), setTimeout(function () {return b.input.focus();}, 20)
                ) : 3 == d && (
                    Qd ? Rf(this, a) : Pe(this)
                )
            );
        }
    }
    
    function bh(a, b, c, d, e) {
        var f = "Click";
        "double" == d ? f = "Double" + f : "triple" == d && (
            f = "Triple" + f
        );
        return Tb(a, Gf((
            1 == b ? "Left" : 2 == b ? "Middle" : "Right"
        ) + f, e), e, function (b) {
            "string" == typeof b && (
                b = Sb[b]
            );
            if (!b) return !1;
            var d = !1;
            try {
                a.isReadOnly() && (
                    a.state.suppressEdits = !0
                ), d = b(a, c) != Hc;
            } finally {a.state.suppressEdits = !1;}
            return d;
        });
    }
    
    function ch(a, b, c, d) {
        B ? setTimeout(Nc(Oe, a),
            0) : a.curOp.focus = ta();
        var e = a.getOption("configureMouse"),
            e = e ? e(a, c, d) : {};
        null == e.unit && (
            e.unit = (
                dh ? d.shiftKey && d.metaKey : d.altKey
            ) ? "rectangle" : "single" == c ? "char" : "double" == c ? "word" : "line"
        );
        if (null == e.extend || a.doc.extend) e.extend = a.doc.extend || d.shiftKey;
        null == e.addNew && (
            e.addNew = ia ? d.metaKey : d.ctrlKey
        );
        null == e.moveOnDrag && (
            e.moveOnDrag = !(
                ia ? d.altKey : d.ctrlKey
            )
        );
        var f = a.doc.sel,
            g;
        a.options.dragDrop && eh && !a.isReadOnly() && "single" == c && -1 < (
            g = f.contains(b)
        ) && (
            0 > x((
                g = f.ranges[g]
            ).from(), b) || 0 < b.xRel
        ) &&
        (
            0 < x(g.to(), b) || 0 > b.xRel
        ) ? fh(a, d, b, e) : gh(a, d, b, e);
    }
    
    function fh(a, b, c, d) {
        var e = a.display,
            f = !1,
            g = J(a, function (b) {
                P && (
                    e.scroller.draggable = !1
                );
                a.state.draggingText = !1;
                ba(e.wrapper.ownerDocument, "mouseup", g);
                ba(e.wrapper.ownerDocument, "mousemove", h);
                ba(e.scroller, "dragstart", k);
                ba(e.scroller, "drop", g);
                f || (
                    T(b), d.addNew || Cc(a.doc, c, null, null, d.extend), P || B && 9 == D ? setTimeout(function () {
                        e.wrapper.ownerDocument.body.focus();
                        e.input.focus();
                    }, 20) : e.input.focus()
                );
            }),
            h = function (a) {
                f = f || 10 <= Math.abs(b.clientX - a.clientX) +
                    Math.abs(b.clientY - a.clientY);
            },
            k = function () {return f = !0;};
        P && (
            e.scroller.draggable = !0
        );
        a.state.draggingText = g;
        g.copy               = !d.moveOnDrag;
        e.scroller.dragDrop && e.scroller.dragDrop();
        v(e.wrapper.ownerDocument, "mouseup", g);
        v(e.wrapper.ownerDocument, "mousemove", h);
        v(e.scroller, "dragstart", k);
        v(e.scroller, "drop", g);
        Pe(a);
        setTimeout(function () {return e.input.focus();}, 20);
    }
    
    function Sf(a, b, c) {
        if ("char" == c) return new A(b, b);
        if ("word" == c) return a.findWordAt(b);
        if ("line" == c) return new A(q(b.line, 0), w(a.doc, q(b.line +
            1, 0)));
        a = c(a, b);
        return new A(a.from, a.to);
    }
    
    function gh(a, b, c, d) {
        function e(b) {
            if (0 != x(r, b)) if (r = b, "rectangle" == d.unit) {
                for (var e = [], f = a.options.tabSize, g = fa(t(k, c.line).text, c.ch, f), h = fa(t(k, b.line).text, b.ch, f), n = Math.min(g, h), g = Math.max(g, h), h = Math.min(c.line, b.line), X = Math.min(a.lastLine(), Math.max(c.line, b.line)); h <= X; h++) {
                    var u = t(k, h).text,
                        v = Oc(u, n, f);
                    n == g ? e.push(new A(q(h, v), q(h, v))) : u.length > v && e.push(new A(q(h, v), q(h, Oc(u, g, f))));
                }
                e.length || e.push(new A(c, c));
                O(k, ma(p.ranges.slice(0, m).concat(e),
                    m), {
                    origin: "*mouse",
                    scroll: !1
                });
                a.scrollIntoView(b);
            } else e = l, n = Sf(a, b, d.unit), b = e.anchor, 0 < x(n.anchor, b) ? (
                f = n.head, b = jc(e.from(), n.anchor)
            ) : (
                f = n.anchor, b = ic(e.to(), n.head)
            ), e = p.ranges.slice(0), e[m] = hh(a, new A(w(k, b), f)), O(k, ma(e, m), Rd);
        }
        
        function f(b) {
            var c = ++u,
                g = Qa(a, b, !0, "rectangle" == d.unit);
            if (g) if (0 != x(g, r)) {
                a.curOp.focus = ta();
                e(g);
                var l = xd(h, k);
                (
                    g.line >= l.to || g.line < l.from
                ) && setTimeout(J(a, function () {u == c && f(b);}), 150);
            } else {
                var m = b.clientY < X.top ? -20 : b.clientY > X.bottom ? 20 : 0;
                m && setTimeout(J(a, function () {
                    u ==
                    c && (
                        h.scroller.scrollTop += m, f(b)
                    );
                }), 50);
            }
        }
        
        function g(b) {
            a.state.selectingText = !1;
            u                     = Infinity;
            T(b);
            h.input.focus();
            ba(h.wrapper.ownerDocument, "mousemove", y);
            ba(h.wrapper.ownerDocument, "mouseup", z);
            k.history.lastSelOrigin = null;
        }
        
        var h = a.display,
            k = a.doc;
        T(b);
        var l,
            m,
            p = k.sel,
            n = p.ranges;
        d.addNew && !d.extend ? (
            m = k.sel.contains(c), l = -1 < m ? n[m] : new A(c, c)
        ) : (
            l = k.sel.primary(), m = k.sel.primIndex
        );
        "rectangle" == d.unit ? (
            d.addNew || (
                l = new A(c, c)
            ), c = Qa(a, b, !0, !0), m = -1
        ) : (
            b = Sf(a, c, d.unit), l = d.extend ? Id(l, b.anchor, b.head, d.extend) :
                b
        );
        d.addNew ? -1 == m ? (
            m = n.length, O(k, ma(n.concat([l]), m), {
                scroll: !1,
                origin: "*mouse"
            })
        ) : 1 < n.length && n[m].empty() && "char" == d.unit && !d.extend ? (
            O(k, ma(n.slice(0, m).concat(n.slice(m + 1)), 0), {
                scroll: !1,
                origin: "*mouse"
            }), p = k.sel
        ) : Jd(k, m, l, Rd) : (
            m = 0, O(k, new da([l], 0), Rd), p = k.sel
        );
        var r = c,
            X = h.wrapper.getBoundingClientRect(),
            u = 0,
            y = J(a, function (a) {0 !== a.buttons && he(a) ? f(a) : g(a);}),
            z = J(a, g);
        a.state.selectingText = z;
        v(h.wrapper.ownerDocument, "mousemove", y);
        v(h.wrapper.ownerDocument, "mouseup", z);
    }
    
    function hh(a, b) {
        var c =
                b.anchor,
            d = b.head,
            e = t(a.doc, c.line);
        if (0 == x(c, d) && c.sticky == d.sticky) return b;
        e = va(e);
        if (!e) return b;
        var f = vb(e, c.ch, c.sticky),
            g = e[f];
        if (g.from != c.ch && g.to != c.ch) return b;
        var h = f + (
            g.from == c.ch == (
                1 != g.level
            ) ? 0 : 1
        );
        if (0 == h || h == e.length) return b;
        var k;
        d.line != c.line ? k = 0 < (
            d.line - c.line
        ) * (
            "ltr" == a.doc.direction ? 1 : -1
        ) : (
            k = vb(e, d.ch, d.sticky), f = k - f || (
                d.ch - c.ch
            ) * (
                1 == g.level ? -1 : 1
            ), k = k == h - 1 || k == h ? 0 > f : 0 < f
        );
        e = e[h + (
            k ? -1 : 0
        )];
        e = (
            h = k == (
                1 == e.level
            )
        ) ? e.from : e.to;
        h = h ? "after" : "before";
        return c.ch == e && c.sticky == h ? b : new A(new q(c.line,
            e, h), d);
    }
    
    function Ic(a, b, c, d) {
        var e,
            f;
        if (b.touches) e = b.touches[0].clientX, f = b.touches[0].clientY; else try {e = b.clientX, f = b.clientY;} catch (g) {return !1;}
        if (e >= Math.floor(a.display.gutters.getBoundingClientRect().right)) return !1;
        d && T(b);
        d     = a.display;
        var h = d.lineDiv.getBoundingClientRect();
        if (f > h.bottom || !ga(a, c)) return ad(b);
        f -= h.top - d.viewOffset;
        for (h = 0; h < a.options.gutters.length; ++h) {
            var k = d.gutters.childNodes[h];
            if (k && k.getBoundingClientRect().right >= e) return e = Ia(a.doc, f), F(a, c, a, e, a.options.gutters[h],
                b), ad(b);
        }
    }
    
    function Rf(a, b) {
        var c;
        (
            c = wa(a.display, b)
        ) || (
            c = ga(a, "gutterContextMenu") ? Ic(a, b, "gutterContextMenu", !1) : !1
        );
        if (!c && !I(a, b, "contextmenu")) a.display.input.onContextMenu(b);
    }
    
    function Tf(a) {
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        Db(a);
    }
    
    function Wb(a) {
        $e(a);
        U(a);
        Re(a);
    }
    
    function ih(a, b, c) {
        !b != !(
            c && c != pb
        ) && (
            c = a.display.dragFunctions, b = b ? v : ba, b(a.display.scroller, "dragstart", c.start), b(a.display.scroller, "dragenter",
                c.enter), b(a.display.scroller, "dragover", c.over), b(a.display.scroller, "dragleave", c.leave), b(a.display.scroller, "drop", c.drop)
        );
    }
    
    function jh(a) {
        a.options.lineWrapping ? (
            Fa(a.display.wrapper, "CodeMirror-wrap"), a.display.sizer.style.minWidth = "", a.display.sizerWidth = null
        ) : (
            Ra(a.display.wrapper, "CodeMirror-wrap"), $c(a)
        );
        ud(a);
        U(a);
        Db(a);
        setTimeout(function () {return gb(a);}, 100);
    }
    
    function E(a, b) {
        var c = this;
        if (!(
            this instanceof E
        )) return new E(a, b);
        this.options = b = b ? Ga(b) : {};
        Ga(Uf, b, !1);
        Dd(b);
        var d = b.value;
        "string" == typeof d && (
            d = new V(d, b.mode, null, b.lineSeparator, b.direction)
        );
        this.doc = d;
        var e = new E.inputStyles[b.inputStyle](this),
            e = this.display = new kg(a, d, e);
        e.wrapper.CodeMirror = this;
        $e(this);
        Tf(this);
        b.lineWrapping && (
            this.display.wrapper.className += " CodeMirror-wrap"
        );
        We(this);
        this.state = {
            keyMaps          : [],
            overlays         : [],
            modeGen          : 0,
            overwrite        : !1,
            delayingBlurEvent: !1,
            focused          : !1,
            suppressEdits    : !1,
            pasteIncoming    : !1,
            cutIncoming      : !1,
            selectingText    : !1,
            draggingText     : !1,
            highlight        : new Wa,
            keySeq           : null,
            specialChars     : null
        };
        b.autofocus &&
        !sb && e.input.focus();
        B && 11 > D && setTimeout(function () {return c.display.input.reset(!0);}, 20);
        kh(this);
        Vf || (
            Sg(), Vf = !0
        );
        Ta(this);
        this.curOp.forceUpdate = !0;
        ff(this, d);
        b.autofocus && !sb || this.hasFocus() ? setTimeout(Nc(wd, this), 20) : Fb(this);
        for (var f in Jc) if (Jc.hasOwnProperty(f)) Jc[f](c, b[f], pb);
        Se(this);
        b.finishInit && b.finishInit(this);
        for (d = 0; d < Sd.length; ++d) Sd[d](c);
        Ua(this);
        P && b.lineWrapping && "optimizelegibility" == getComputedStyle(e.lineDiv).textRendering && (
            e.lineDiv.style.textRendering = "auto"
        );
    }
    
    function kh(a) {
        function b() {
            d.activeTouch &&
            (
                e = setTimeout(function () {return d.activeTouch = null;}, 1E3), f = d.activeTouch, f.end = +new Date
            );
        }
        
        function c(a, b) {
            if (null == b.left) return !0;
            var c = b.left - a.left,
                d = b.top - a.top;
            return 400 < c * c + d * d;
        }
        
        var d = a.display;
        v(d.scroller, "mousedown", J(a, Qf));
        B && 11 > D ? v(d.scroller, "dblclick", J(a, function (b) {
            if (!I(a, b)) {
                var c = Qa(a, b);
                !c || Ic(a, b, "gutterClick", !0) || wa(a.display, b) || (
                    T(b), b = a.findWordAt(c), Cc(a.doc, b.anchor, b.head)
                );
            }
        })) : v(d.scroller, "dblclick", function (b) {return I(a, b) || T(b);});
        Qd || v(d.scroller, "contextmenu", function (b) {
            return Rf(a,
                b);
        });
        var e,
            f = {end: 0};
        v(d.scroller, "touchstart", function (b) {
            var c;
            if (c = !I(a, b)) 1 != b.touches.length ? c = !1 : (
                c = b.touches[0], c = 1 >= c.radiusX && 1 >= c.radiusY
            ), c = !c;
            c && !Ic(a, b, "gutterClick", !0) && (
                d.input.ensurePolled(), clearTimeout(e), c = +new Date, d.activeTouch = {
                    start: c,
                    moved: !1,
                    prev : 300 >= c - f.end ? f : null
                }, 1 == b.touches.length && (
                    d.activeTouch.left = b.touches[0].pageX, d.activeTouch.top = b.touches[0].pageY
                )
            );
        });
        v(d.scroller, "touchmove", function () {
            d.activeTouch && (
                d.activeTouch.moved = !0
            );
        });
        v(d.scroller, "touchend", function (e) {
            var f =
                    d.activeTouch;
            if (f && !wa(d, e) && null != f.left && !f.moved && 300 > new Date - f.start) {
                var g = a.coordsChar(d.activeTouch, "page"),
                    f = !f.prev || c(f, f.prev) ? new A(g, g) : !f.prev.prev || c(f, f.prev.prev) ? a.findWordAt(g) : new A(q(g.line, 0), w(a.doc, q(g.line + 1, 0)));
                a.setSelection(f.anchor, f.head);
                a.focus();
                T(e);
            }
            b();
        });
        v(d.scroller, "touchcancel", b);
        v(d.scroller, "scroll", function () {
            d.scroller.clientHeight && (
                Hb(a, d.scroller.scrollTop), Sa(a, d.scroller.scrollLeft, !0), F(a, "scroll", a)
            );
        });
        v(d.scroller, "mousewheel", function (b) {
            return bf(a,
                b);
        });
        v(d.scroller, "DOMMouseScroll", function (b) {return bf(a, b);});
        v(d.wrapper, "scroll", function () {return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;});
        d.dragFunctions = {
            enter: function (b) {I(a, b) || xb(b);},
            over : function (b) {
                if (!I(a, b)) {
                    var c = Qa(a, b);
                    if (c) {
                        var d = document.createDocumentFragment();
                        Ne(a, c, d);
                        a.display.dragCursor || (
                            a.display.dragCursor = u("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), a.display.lineSpace.insertBefore(a.display.dragCursor, a.display.cursorDiv)
                        );
                        aa(a.display.dragCursor, d);
                    }
                    xb(b);
                }
            },
            start: function (b) {
                if (B && (
                    !a.state.draggingText || 100 > +new Date - Df
                )) xb(b); else if (!I(a, b) && !wa(a.display, b) && (
                    b.dataTransfer.setData("Text", a.getSelection()), b.dataTransfer.effectAllowed = "copyMove", b.dataTransfer.setDragImage && !Wf
                )) {
                    var c = u("img", null, null, "position: fixed; left: 0; top: 0;");
                    c.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d";
                    la && (
                        c.width = c.height = 1, a.display.wrapper.appendChild(c), c._top = c.offsetTop
                    );
                    b.dataTransfer.setDragImage(c, 0, 0);
                    la && c.parentNode.removeChild(c);
                }
            },
            drop : J(a, Rg),
            leave: function (b) {I(a, b) || Cf(a);}
        };
        var g           = d.input.getField();
        v(g, "keyup", function (b) {return Of.call(a, b);});
        v(g, "keydown", J(a, Nf));
        v(g, "keypress", J(a, Pf));
        v(g, "focus", function (b) {return wd(a, b);});
        v(g, "blur", function (b) {return Fb(a, b);});
    }
    
    function Xb(a, b, c, d) {
        var e = a.doc,
            f;
        null == c && (
            c = "add"
        );
        "smart" == c && (
            e.mode.indent ? f = yb(a, b).state : c = "prev"
        );
        var g = a.options.tabSize,
            h = t(e, b),
            k = fa(h.text, null, g);
        h.stateAfter && (
            h.stateAfter = null
        );
        var l = h.text.match(/^\s*/)[0],
            m;
        if (!d && !/\S/.test(h.text)) m = 0,
            c = "not"; else if ("smart" == c && (
            m = e.mode.indent(f, h.text.slice(l.length), h.text), m == Hc || 150 < m
        )) {
            if (!d) return;
            c = "prev";
        }
        "prev" == c ? m = b > e.first ? fa(t(e, b - 1).text, null, g) : 0 : "add" == c ? m = k + a.options.indentUnit : "subtract" == c ? m = k - a.options.indentUnit : "number" == typeof c && (
            m = k + c
        );
        m = Math.max(0, m);
        c = "";
        d = 0;
        if (a.options.indentWithTabs) for (a = Math.floor(m / g); a; --a) d += g, c += "\t";
        d < m && (
            c += Pc(m - d)
        );
        if (c != l) return lb(e, c, q(b, 0), q(b, l.length), "+input"), h.stateAfter = null, !0;
        for (g = 0; g < e.sel.ranges.length; g++) if (h = e.sel.ranges[g],
        h.head.line == b && h.head.ch < l.length) {
            b = q(b, l.length);
            Jd(e, g, new A(b, b));
            break;
        }
    }
    
    function Xf(a) {ea = a;}
    
    function Td(a, b, c, d, e) {
        var f           = a.doc;
        a.display.shift = !1;
        d || (
            d = f.sel
        );
        var g = a.state.pasteIncoming || "paste" == e,
            h = Ud(b),
            k = null;
        if (g && 1 < d.ranges.length) if (ea && ea.text.join("\n") == b) {if (0 == d.ranges.length % ea.text.length) for (var k = [], l = 0; l < ea.text.length; l++) k.push(f.splitLines(ea.text[l]));} else h.length == d.ranges.length && a.options.pasteLinesPerSelection && (
            k = gc(h, function (a) {return [a];})
        );
        for (var m, l = d.ranges.length -
            1; 0 <= l; l--) {
            m = d.ranges[l];
            var p = m.from(),
                n = m.to();
            m.empty() && (
                c && 0 < c ? p = q(p.line, p.ch - c) : a.state.overwrite && !g ? n = q(n.line, Math.min(t(f, n.line).text.length, n.ch + z(h).length)) : ea && ea.lineWise && ea.text.join("\n") == b && (
                    p = n = q(p.line, 0)
                )
            );
            m = a.curOp.updateInput;
            p = {
                from  : p,
                to    : n,
                text  : k ? k[l % k.length] : h,
                origin: e || (
                    g ? "paste" : a.state.cutIncoming ? "cut" : "+input"
                )
            };
            kb(a.doc, p);
            N(a, "inputRead", a, p);
        }
        b && !g && Yf(a, b);
        fb(a);
        a.curOp.updateInput   = m;
        a.curOp.typing        = !0;
        a.state.pasteIncoming = a.state.cutIncoming = !1;
    }
    
    function Zf(a,
                b) {
        var c = a.clipboardData && a.clipboardData.getData("Text");
        if (c) return a.preventDefault(), b.isReadOnly() || b.options.disableInput || Z(b, function () {return Td(b, c, 0, null, "paste");}), !0;
    }
    
    function Yf(a, b) {
        if (a.options.electricChars && a.options.smartIndent) for (var c = a.doc.sel, d = c.ranges.length - 1; 0 <= d; d--) {
            var e = c.ranges[d];
            if (!(
                100 < e.head.ch || d && c.ranges[d - 1].head.line == e.head.line
            )) {
                var f = a.getModeAt(e.head),
                    g = !1;
                if (f.electricChars) for (var h = 0; h < f.electricChars.length; h++) {
                    if (-1 < b.indexOf(f.electricChars.charAt(h))) {
                        g =
                            Xb(a, e.head.line, "smart");
                        break;
                    }
                } else f.electricInput && f.electricInput.test(t(a.doc, e.head.line).text.slice(0, e.head.ch)) && (
                    g = Xb(a, e.head.line, "smart")
                );
                g && N(a, "electricInput", a, e.head.line);
            }
        }
    }
    
    function $f(a) {
        for (var b = [], c = [], d = 0; d < a.doc.sel.ranges.length; d++) {
            var e = a.doc.sel.ranges[d].head.line,
                e = {
                    anchor: q(e, 0),
                    head: q(e + 1, 0)
                };
            c.push(e);
            b.push(a.getRange(e.anchor, e.head));
        }
        return {
            text  : b,
            ranges: c
        };
    }
    
    function ag(a, b) {
        a.setAttribute("autocorrect", "off");
        a.setAttribute("autocapitalize", "off");
        a.setAttribute("spellcheck",
            !!b);
    }
    
    function bg() {
        var a = u("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            b = u("div", [a], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        P ? a.style.width = "1000px" : a.setAttribute("wrap", "off");
        Yb && (
            a.style.border = "1px solid black"
        );
        ag(a);
        return b;
    }
    
    function Vd(a, b, c, d, e) {
        function f(d) {
            var f;
            f = e ? Wg(a.cm, k, b, c) : Md(k, b, c);
            if (null == f) {
                if (d = !d) d = b.line + c, d < a.first || d >= a.first + a.size ? d = !1 : (
                    b = new q(d, b.ch, b.sticky), d = k = t(a, d)
                );
                if (d) b = Nd(e, a.cm, k, b.line, c); else return !1;
            } else b = f;
            return !0;
        }
        
        var g = b,
            h = c,
            k = t(a, b.line);
        if ("char" == d) f(); else if ("column" == d) f(!0); else if ("word" == d || "group" == d) {
            var l = null;
            d     = "group" == d;
            for (var m = a.cm && a.cm.getHelper(b, "wordChars"), p = !0; !(
                0 > c
            ) || f(!p); p = !1) {
                var n = k.text.charAt(b.ch) || "\n",
                    n = hc(n, m) ? "w" : d && "\n" == n ? "n" : !d || /\s/.test(n) ? null : "p";
                !d || p || n || (
                    n = "s"
                );
                if (l && l != n) {
                    0 > c && (
                        c = 1, f(), b.sticky = "after"
                    );
                    break;
                }
                n && (
                    l = n
                );
                if (0 < c && !f(!p)) break;
            }
        }
        h = Kd(a, b, g, h, !0);
        Uc(g, h) && (
            h.hitSide = !0
        );
        return h;
    }
    
    function cg(a,
                b, c, d) {
        var e = a.doc,
            f = b.left,
            g;
        "page" == d ? (
            g = Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight), g = Math.max(g - .5 * Oa(a.display), 3), g = (
                0 < c ? b.bottom : b.top
            ) + c * g
        ) : "line" == d && (
            g = 0 < c ? b.bottom + 3 : b.top - 3
        );
        for (; ;) {
            b = rd(a, f, g);
            if (!b.outside) break;
            if (0 > c ? 0 >= g : g >= e.height) {
                b.hitSide = !0;
                break;
            }
            g += 5 * c;
        }
        return b;
    }
    
    function dg(a, b) {
        var c = ld(a, b.line);
        if (!c || c.hidden) return null;
        var d = t(a.doc, b.line),
            c = Ae(c, d, b.line),
            d = va(d, a.doc.direction),
            e = "left";
        d && (
            e = vb(d, b.ch) % 2 ? "right" :
                "left"
        );
        c        = Be(c.map, b.ch, e);
        c.offset = "right" == c.collapse ? c.end : c.start;
        return c;
    }
    
    function lh(a) {
        for (; a; a = a.parentNode) if (/CodeMirror-gutter-wrapper/.test(a.className)) return !0;
        return !1;
    }
    
    function qb(a, b) {
        b && (
            a.bad = !0
        );
        return a;
    }
    
    function mh(a, b, c, d, e) {
        function f(a) {return function (b) {return b.id == a;};}
        
        function g() {
            m && (
                l += p, n && (
                    l += p
                ), m = n = !1
            );
        }
        
        function h(a) {
            a && (
                g(), l += a
            );
        }
        
        function k(b) {
            if (1 == b.nodeType) {
                var c = b.getAttribute("cm-text");
                if (c) h(c); else {
                    var c = b.getAttribute("cm-marker"),
                        l;
                    if (c) b = a.findMarks(q(d,
                        0), q(e + 1, 0), f(+c)), b.length && (
                        l = b[0].find(0)
                    ) && h(Ha(a.doc, l.from, l.to).join(p)); else if ("false" != b.getAttribute("contenteditable") && (
                        l = /^(pre|div|p|li|table|br)$/i.test(b.nodeName), /^br$/i.test(b.nodeName) || 0 != b.textContent.length
                    )) {
                        l && g();
                        for (c = 0; c < b.childNodes.length; c++) k(b.childNodes[c]);
                        /^(pre|p)$/i.test(b.nodeName) && (
                            n = !0
                        );
                        l && (
                            m = !0
                        );
                    }
                }
            } else 3 == b.nodeType && h(b.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
        
        for (var l = "", m = !1, p = a.doc.lineSeparator(), n = !1; ;) {
            k(b);
            if (b == c) break;
            b = b.nextSibling;
            n = !1;
        }
        return l;
    }
    
    function Kc(a, b, c) {
        var d;
        if (b == a.display.lineDiv) {
            d = a.display.lineDiv.childNodes[c];
            if (!d) return qb(a.clipPos(q(a.display.viewTo - 1)), !0);
            b = null;
            c = 0;
        } else for (d = b; ; d = d.parentNode) {
            if (!d || d == a.display.lineDiv) return null;
            if (d.parentNode && d.parentNode == a.display.lineDiv) break;
        }
        for (var e = 0; e < a.display.view.length; e++) {
            var f = a.display.view[e];
            if (f.node == d) return nh(f, b, c);
        }
    }
    
    function nh(a, b, c) {
        function d(b, c, d) {
            for (var e = -1; e < (
                l ? l.length : 0
            ); e++) for (var f = 0 > e ? k.map : l[e], g = 0; g < f.length; g += 3) {
                var h =
                        f[g + 2];
                if (h == b || h == c) {
                    c = C(0 > e ? a.line : a.rest[e]);
                    e = f[g] + d;
                    if (0 > d || h != b) e = f[g + (
                        d ? 1 : 0
                    )];
                    return q(c, e);
                }
            }
        }
        
        var e = a.text.firstChild,
            f = !1;
        if (!b || !ya(e, b)) return qb(q(C(a.line), 0), !0);
        if (b == e && (
            f = !0, b = e.childNodes[c], c = 0, !b
        )) return c = a.rest ? z(a.rest) : a.line, qb(q(C(c), c.text.length), f);
        var g = 3 == b.nodeType ? b : null,
            h = b;
        g || 1 != b.childNodes.length || 3 != b.firstChild.nodeType || (
            g = b.firstChild, c && (
                c = g.nodeValue.length
            )
        );
        for (; h.parentNode != e;) h = h.parentNode;
        var k = a.measure,
            l = k.maps;
        if (b = d(g, h, c)) return qb(b, f);
        e = h.nextSibling;
        for (g = g ? g.nodeValue.length - c : 0; e; e = e.nextSibling) {
            if (b = d(e, e.firstChild, 0)) return qb(q(b.line, b.ch - g), f);
            g += e.textContent.length;
        }
        for (h = h.previousSibling; h; h = h.previousSibling) {
            if (b = d(h, h.firstChild, -1)) return qb(q(b.line, b.ch + c), f);
            c += h.textContent.length;
        }
    }
    
    var S = navigator.userAgent,
        eg = navigator.platform,
        za = /gecko\/\d/i.test(S),
        fg = /MSIE \d/.test(S),
        gg = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(S),
        Zb = /Edge\/(\d+)/.exec(S),
        B = fg || gg || Zb,
        D = B && (
            fg ? document.documentMode || 6 : +(
                Zb || gg
            )[1]
        ),
        P = !Zb && /WebKit\//.test(S),
        oh = P && /Qt\/\d+\.\d+/.test(S),
        qc = !Zb && /Chrome\//.test(S),
        la = /Opera\//.test(S),
        Wf = /Apple Computer/.test(navigator.vendor),
        ph = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(S),
        Gg = /PhantomJS/.test(S),
        Yb = !Zb && /AppleWebKit/.test(S) && /Mobile\/\w+/.test(S),
        rc = /Android/.test(S),
        sb = Yb || rc || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(S),
        ia = Yb || /Mac/.test(eg),
        dh = /\bCrOS\b/.test(S),
        qh = /win/i.test(eg),
        Xa = la && S.match(/Version\/(\d*\.\d*)/);
    Xa && (
        Xa = Number(Xa[1])
    );
    Xa && 15 <= Xa && (
        la = !1, P = !0
    );
    var Hf = ia && (
        oh || la && (
        null ==
        Xa || 12.11 > Xa
        )
        ),
        Qd = za || B && 9 <= D,
        Ra = function (a, b) {
            var c = a.className,
                d = ha(b).exec(c);
            if (d) {
                var e = c.slice(d.index + d[0].length);
                a.className = c.slice(0, d.index) + (
                    e ? d[1] + e : ""
                );
            }
        },
        db;
    db = document.createRange ? function (a, b, c, d) {
        var e = document.createRange();
        e.setEnd(d || a, c);
        e.setStart(a, b);
        return e;
    } : function (a, b, c) {
        var d = document.body.createTextRange();
        try {d.moveToElementText(a.parentNode);} catch (e) {return d;}
        d.collapse(!0);
        d.moveEnd("character", c);
        d.moveStart("character", b);
        return d;
    };
    var $b = function (a) {a.select();};
    Yb ? $b = function (a) {
        a.selectionStart = 0;
        a.selectionEnd   = a.value.length;
    } : B && (
        $b = function (a) {try {a.select();} catch (b) {}}
    );
    var Wa                     = function () {this.id = null;};
    Wa.prototype.set           = function (a, b) {
        clearTimeout(this.id);
        this.id = setTimeout(b, a);
    };
    var Hc                     = {toString: function () {return "CodeMirror.Pass";}},
        sa                     = {scroll: !1},
        Rd                     = {origin: "*mouse"},
        ac                     = {origin: "+move"},
        fc                     = [""],
        ig                     = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        jg                     = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
        uf                     = !1,
        ua                     = !1,
        wb                     = null,
        ng                     = function () {
            function a(a) {
                return 247 >= a ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(a) : 1424 <= a && 1524 >= a ? "R" : 1536 <= a && 1785 >= a ? "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(a -
                    1536) : 1774 <= a && 2220 >= a ? "r" : 8192 <= a && 8203 >= a ? "w" : 8204 == a ? "b" : "L";
            }
        
            function b(a, b, c) {
                this.level = a;
                this.from = b;
                this.to = c;
            }
        
            var c = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                d = /[stwN]/,
                e = /[LRr]/,
                f = /[Lb1n]/,
                g = /[1n]/;
            return function (h, k) {
                var l = "ltr" == k ? "L" : "R";
                if (0 == h.length || "ltr" == k && !c.test(h)) return !1;
                for (var m = h.length, p = [], n = 0; n < m; ++n) p.push(a(h.charCodeAt(n)));
                for (var n = 0, r = l; n < m; ++n) {
                    var q = p[n];
                    "m" == q ? p[n] = r : r = q;
                }
                n = 0;
                for (r = l; n < m; ++n) q = p[n], "1" == q && "r" == r ? p[n] = "n" : e.test(q) && (
                    r = q, "r" == q && (
                        p[n] = "R"
                    )
                );
                n = 1;
                for (r = p[0]; n < m - 1; ++n) q = p[n], "+" == q && "1" == r && "1" == p[n + 1] ? p[n] = "1" : "," != q || r != p[n + 1] || "1" != r && "n" != r || (
                    p[n] = r
                ), r = q;
                for (n = 0; n < m; ++n) if (r = p[n], "," == r) p[n] = "N"; else if ("%" == r) {
                    r = void 0;
                    for (r = n + 1; r < m && "%" == p[r]; ++r) ;
                    for (q = n && "!" == p[n - 1] || r < m && "1" == p[r] ? "1" : "N"; n < r; ++n) p[n] = q;
                    n = r - 1;
                }
                n = 0;
                for (r = l; n < m; ++n) q = p[n], "L" == r && "1" == q ? p[n] = "L" : e.test(q) && (
                    r = q
                );
                for (r = 0; r < m; ++r) if (d.test(p[r])) {
                    n = void 0;
                    for (n = r + 1; n < m && d.test(p[n]); ++n) ;
                    q = "L" == (
                        r ? p[r - 1] : l
                    );
                    for (q = q == (
                        "L" == (
                            n < m ? p[n] : l
                        )
                    ) ? q ? "L" : "R" : l; r < n; ++r) p[r] = q;
                    r =
                        n - 1;
                }
                for (var l = [], t, n = 0; n < m;) if (f.test(p[n])) {
                    r = n;
                    for (++n; n < m && f.test(p[n]); ++n) ;
                    l.push(new b(0, r, n));
                } else {
                    var u = n,
                        r = l.length;
                    for (++n; n < m && "L" != p[n]; ++n) ;
                    for (q = u; q < n;) if (g.test(p[q])) {
                        u < q && l.splice(r, 0, new b(1, u, q));
                        u = q;
                        for (++q; q < n && g.test(p[q]); ++q) ;
                        l.splice(r, 0, new b(2, u, q));
                        u = q;
                    } else ++q;
                    u < n && l.splice(r, 0, new b(1, u, n));
                }
                "ltr" == k && (
                    1 == l[0].level && (
                        t = h.match(/^\s+/)
                    ) && (
                        l[0].from = t[0].length, l.unshift(new b(0, 0, t[0].length))
                    ), 1 == z(l).level && (
                        t = h.match(/\s+$/)
                    ) && (
                        z(l).to -= t[0].length, l.push(new b(0, m -
                            t[0].length, m))
                    )
                );
                return "rtl" == k ? l.reverse() : l;
            };
        }(),
        mc                     = [],
        v                      = function (a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : (
                a = a._handlers || (
                    a._handlers = {}
                ), a[b] = (
                    a[b] || mc
                ).concat(c)
            );
        },
        eh                     = function () {
            if (B && 9 > D) return !1;
            var a = u("div");
            return "draggable" in a || "dragDrop" in a;
        }(),
        bd,
        hd,
        Ud                     = 3 != "\n\nb".split(/\n/).length ? function (a) {
            for (var b = 0, c = [], d = a.length; b <= d;) {
                var e = a.indexOf("\n", b);
                -1 == e && (
                    e = a.length
                );
                var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
                    g = f.indexOf("\r");
                -1 !=
                g ? (
                    c.push(f.slice(0, g)), b += g + 1
                ) : (
                    c.push(f), b = e + 1
                );
            }
            return c;
        } : function (a) {return a.split(/\r\n?|\n/);},
        rh                     = window.getSelection ? function (a) {try {return a.selectionStart != a.selectionEnd;} catch (b) {return !1;}} : function (a) {
            var b;
            try {b = a.ownerDocument.selection.createRange();} catch (c) {}
            return b && b.parentElement() == a ? 0 != b.compareEndPoints("StartToEnd", b) : !1;
        },
        Zg                     = function () {
            var a = u("div");
            if ("oncopy" in a) return !0;
            a.setAttribute("oncopy", "return;");
            return "function" == typeof a.oncopy;
        }(),
        nd                     = null,
        cd                     = {},
        bb                     = {},
        cb                     = {},
        G                      = function (a,
                                           b, c) {
            this.pos = this.start = 0;
            this.string = a;
            this.tabSize = b || 8;
            this.lineStart = this.lastColumnPos = this.lastColumnValue = 0;
            this.lineOracle = c;
        };
    G.prototype.eol            = function () {return this.pos >= this.string.length;};
    G.prototype.sol            = function () {return this.pos == this.lineStart;};
    G.prototype.peek           = function () {return this.string.charAt(this.pos) || void 0;};
    G.prototype.next           = function () {if (this.pos < this.string.length) return this.string.charAt(this.pos++);};
    G.prototype.eat            = function (a) {
        var b = this.string.charAt(this.pos);
        if ("string" ==
        typeof a ? b == a : b && (
            a.test ? a.test(b) : a(b)
        )) return ++this.pos, b;
    };
    G.prototype.eatWhile       = function (a) {
        for (var b = this.pos; this.eat(a);) ;
        return this.pos > b;
    };
    G.prototype.eatSpace       = function () {
        for (var a = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
        return this.pos > a;
    };
    G.prototype.skipToEnd      = function () {this.pos = this.string.length;};
    G.prototype.skipTo         = function (a) {
        a = this.string.indexOf(a, this.pos);
        if (-1 < a) return this.pos = a, !0;
    };
    G.prototype.backUp         = function (a) {this.pos -= a;};
    G.prototype.column         = function () {
        this.lastColumnPos <
        this.start && (
            this.lastColumnValue = fa(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start
        );
        return this.lastColumnValue - (
            this.lineStart ? fa(this.string, this.lineStart, this.tabSize) : 0
        );
    };
    G.prototype.indentation    = function () {
        return fa(this.string, null, this.tabSize) - (
            this.lineStart ? fa(this.string, this.lineStart, this.tabSize) : 0
        );
    };
    G.prototype.match          = function (a, b, c) {
        if ("string" == typeof a) {
            var d = function (a) {return c ? a.toLowerCase() : a;},
                e = this.string.substr(this.pos,
                    a.length);
            if (d(e) == d(a)) return !1 !== b && (
                this.pos += a.length
            ), !0;
        } else {
            if ((
                a = this.string.slice(this.pos).match(a)
            ) && 0 < a.index) return null;
            a && !1 !== b && (
                this.pos += a[0].length
            );
            return a;
        }
    };
    G.prototype.current = function () {return this.string.slice(this.start, this.pos);};
    G.prototype.hideFirstChars = function (a, b) {
        this.lineStart += a;
        try {return b();} finally {this.lineStart -= a;}
    };
    G.prototype.lookAhead = function (a) {
        var b = this.lineOracle;
        return b && b.lookAhead(a);
    };
    G.prototype.baseToken = function () {
        var a = this.lineOracle;
        return a &&
            a.baseToken(this.pos);
    };
    var oc                     = function (a, b) {
            this.state = a;
            this.lookAhead = b;
        },
        qa                     = function (a, b, c, d) {
            this.state = b;
            this.doc = a;
            this.line = c;
            this.maxLookAhead = d || 0;
            this.baseTokens = null;
            this.baseTokenPos = 1;
        };
    qa.prototype.lookAhead     = function (a) {
        var b = this.doc.getLine(this.line + a);
        null != b && a > this.maxLookAhead && (
            this.maxLookAhead = a
        );
        return b;
    };
    qa.prototype.baseToken     = function (a) {
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= a;) this.baseTokenPos += 2;
        var b = this.baseTokens[this.baseTokenPos +
        1];
        return {
            type: b && b.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - a
        };
    };
    qa.prototype.nextLine      = function () {
        this.line++;
        0 < this.maxLookAhead && this.maxLookAhead--;
    };
    qa.fromSaved               = function (a, b, c) {return b instanceof oc ? new qa(a, Ka(a.mode, b.state), c, b.lookAhead) : new qa(a, Ka(a.mode, b), c);};
    qa.prototype.save          = function (a) {
        a = !1 !== a ? Ka(this.doc.mode, this.state) : this.state;
        return 0 < this.maxLookAhead ? new oc(a, this.maxLookAhead) : a;
    };
    var oe                     = function (a, b, c) {
            this.start = a.start;
            this.end = a.pos;
            this.string =
                a.current();
            this.type   = b || null;
            this.state  = c;
        },
        hb                     = function (a, b, c) {
            this.text = a;
            ce(this, b);
            this.height = c ? c(this) : 1;
        };
    hb.prototype.lineNo        = function () {return C(this);};
    ab(hb);
    var ug                          = {},
        tg                          = {},
        eb                          = null,
        zb                          = null,
        Ce                          = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        Pa,
        Ya                          = function (a, b, c) {
            this.cm = c;
            var d = this.vert = u("div", [u("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                e = this.horiz = u("div", [u("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
            d.tabIndex = e.tabIndex = -1;
            a(d);
            a(e);
            v(d, "scroll", function () {
                d.clientHeight &&
                b(d.scrollTop, "vertical");
            });
            v(e, "scroll", function () {e.clientWidth && b(e.scrollLeft, "horizontal");});
            this.checkedZeroWidth = !1;
            B && 8 > D && (
                this.horiz.style.minHeight = this.vert.style.minWidth = "18px"
            );
        };
    Ya.prototype.update             = function (a) {
        var b = a.scrollWidth > a.clientWidth + 1,
            c = a.scrollHeight > a.clientHeight + 1,
            d = a.nativeBarWidth;
        c ? (
            this.vert.style.display = "block", this.vert.style.bottom = b ? d + "px" : "0", this.vert.firstChild.style.height = Math.max(0, a.scrollHeight - a.clientHeight + (
                a.viewHeight - (
                    b ? d : 0
                )
            )) + "px"
        ) : (
            this.vert.style.display =
                "", this.vert.firstChild.style.height = "0"
        );
        b ? (
            this.horiz.style.display = "block", this.horiz.style.right = c ? d + "px" : "0", this.horiz.style.left = a.barLeft + "px", this.horiz.firstChild.style.width = Math.max(0, a.scrollWidth - a.clientWidth + (
                a.viewWidth - a.barLeft - (
                    c ? d : 0
                )
            )) + "px"
        ) : (
            this.horiz.style.display = "", this.horiz.firstChild.style.width = "0"
        );
        !this.checkedZeroWidth && 0 < a.clientHeight && (
            0 == d && this.zeroWidthHack(), this.checkedZeroWidth = !0
        );
        return {
            right : c ? d : 0,
            bottom: b ? d : 0
        };
    };
    Ya.prototype.setScrollLeft      = function (a) {
        this.horiz.scrollLeft !=
        a && (
            this.horiz.scrollLeft = a
        );
        this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
    };
    Ya.prototype.setScrollTop = function (a) {
        this.vert.scrollTop != a && (
            this.vert.scrollTop = a
        );
        this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
    };
    Ya.prototype.zeroWidthHack = function () {
        this.horiz.style.height        = this.vert.style.width = ia && !ph ? "12px" : "18px";
        this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
        this.disableHoriz              = new Wa;
        this.disableVert               = new Wa;
    };
    Ya.prototype.enableZeroWidthBar =
        function (a, b, c) {
            function d() {
                var e = a.getBoundingClientRect();
                (
                    "vert" == c ? document.elementFromPoint(e.right - 1, (
                        e.top + e.bottom
                    ) / 2) : document.elementFromPoint((
                        e.right + e.left
                    ) / 2, e.bottom - 1)
                ) != a ? a.style.pointerEvents = "none" : b.set(1E3, d);
            }
            
            a.style.pointerEvents = "auto";
            b.set(1E3, d);
        };
    Ya.prototype.clear              = function () {
        var a = this.horiz.parentNode;
        a.removeChild(this.horiz);
        a.removeChild(this.vert);
    };
    var bc                          = function () {};
    bc.prototype.update             = function () {
        return {
            bottom: 0,
            right : 0
        };
    };
    bc.prototype.setScrollLeft      = function () {};
    bc.prototype.setScrollTop       = function () {};
    bc.prototype.clear              = function () {};
    var Xe                          = {
            "native": Ya,
            "null": bc
        },
        Fg                          = 0,
        xc                          = function (a, b, c) {
            var d = a.display;
            this.viewport = b;
            this.visible = xd(d, a.doc, b);
            this.editorIsHidden = !d.wrapper.offsetWidth;
            this.wrapperHeight = d.wrapper.clientHeight;
            this.wrapperWidth = d.wrapper.clientWidth;
            this.oldDisplayWidth = La(a);
            this.force = c;
            this.dims = md(a);
            this.events = [];
        };
    xc.prototype.signal             = function (a, b) {ga(a, b) && this.events.push(arguments);};
    xc.prototype.finish             = function () {
        for (var a = 0; a < this.events.length; a++) F.apply(null,
            this.events[a]);
    };
    var zc                          = 0,
        ca                          = null;
    B ? ca = -.53 : za ? ca = 15 : qc ? ca = -.7 : Wf && (
        ca = -1 / 3
    );
    var da                         = function (a, b) {
        this.ranges    = a;
        this.primIndex = b;
    };
    da.prototype.primary           = function () {return this.ranges[this.primIndex];};
    da.prototype.equals            = function (a) {
        if (a == this) return !0;
        if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length) return !1;
        for (var b = 0; b < this.ranges.length; b++) {
            var c = this.ranges[b],
                d = a.ranges[b];
            if (!Uc(c.anchor, d.anchor) || !Uc(c.head, d.head)) return !1;
        }
        return !0;
    };
    da.prototype.deepCopy          = function () {
        for (var a         =
                     [], b = 0; b < this.ranges.length; b++) a[b] = new A(Vc(this.ranges[b].anchor), Vc(this.ranges[b].head));
        return new da(a, this.primIndex);
    };
    da.prototype.somethingSelected = function () {
        for (var a = 0; a < this.ranges.length; a++) if (!this.ranges[a].empty()) return !0;
        return !1;
    };
    da.prototype.contains          = function (a, b) {
        b || (
            b = a
        );
        for (var c = 0; c < this.ranges.length; c++) {
            var d = this.ranges[c];
            if (0 <= x(b, d.from()) && 0 >= x(a, d.to())) return c;
        }
        return -1;
    };
    var A                          = function (a, b) {
        this.anchor = a;
        this.head   = b;
    };
    A.prototype.from               = function () {
        return jc(this.anchor,
            this.head);
    };
    A.prototype.to                 = function () {return ic(this.anchor, this.head);};
    A.prototype.empty              = function () {return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;};
    Nb.prototype                   = {
        chunkSize  : function () {return this.lines.length;},
        removeInner: function (a, b) {
            for (var c = a, d = a + b; c < d; ++c) {
                var e    = this.lines[c];
                this.height -= e.height;
                var f    = e;
                f.parent = null;
                be(f);
                N(e, "delete");
            }
            this.lines.splice(a, b);
        },
        collapse   : function (a) {a.push.apply(a, this.lines);},
        insertInner: function (a, b, c) {
            this.height += c;
            this.lines = this.lines.slice(0,
                a).concat(b).concat(this.lines.slice(a));
            for (a = 0; a < b.length; ++a) b[a].parent = this;
        },
        iterN      : function (a, b, c) {for (b = a + b; a < b; ++a) if (c(this.lines[a])) return !0;}
    };
    Ob.prototype                   = {
        chunkSize  : function () {return this.size;},
        removeInner: function (a, b) {
            this.size -= b;
            for (var c = 0; c < this.children.length; ++c) {
                var d = this.children[c],
                    e = d.chunkSize();
                if (a < e) {
                    var f = Math.min(b, e - a),
                        g = d.height;
                    d.removeInner(a, f);
                    this.height -= g - d.height;
                    e == f && (
                        this.children.splice(c--, 1), d.parent = null
                    );
                    if (0 == (
                        b -= f
                    )) break;
                    a = 0;
                } else a -= e;
            }
            25 > this.size -
            b && (
                1 < this.children.length || !(
                this.children[0] instanceof Nb
                )
            ) && (
                c = [], this.collapse(c), this.children = [new Nb(c)], this.children[0].parent = this
            );
        },
        collapse   : function (a) {for (var b = 0; b < this.children.length; ++b) this.children[b].collapse(a);},
        insertInner: function (a, b, c) {
            this.size += b.length;
            this.height += c;
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (a <= f) {
                    e.insertInner(a, b, c);
                    if (e.lines && 50 < e.lines.length) {
                        for (b = a = e.lines.length % 25 + 25; b < e.lines.length;) c = new Nb(e.lines.slice(b,
                            b += 25)), e.height -= c.height, this.children.splice(++d, 0, c), c.parent = this;
                        e.lines = e.lines.slice(0, a);
                        this.maybeSpill();
                    }
                    break;
                }
                a -= f;
            }
        },
        maybeSpill : function () {
            if (!(
                10 >= this.children.length
            )) {
                var a = this;
                do {
                    var b = a.children.splice(a.children.length - 5, 5),
                        b = new Ob(b);
                    if (a.parent) {
                        a.size -= b.size;
                        a.height -= b.height;
                        var c = L(a.parent.children, a);
                        a.parent.children.splice(c + 1, 0, b);
                    } else c = new Ob(a.children), c.parent = a, a.children = [c, b], a = c;
                    b.parent = a.parent;
                } while (10 < a.children.length);
                a.parent.maybeSpill();
            }
        },
        iterN      : function (a,
                               b, c) {
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (a < f) {
                    f = Math.min(b, f - a);
                    if (e.iterN(a, f, c)) return !0;
                    if (0 == (
                        b -= f
                    )) break;
                    a = 0;
                } else a -= f;
            }
        }
    };
    var Pb                         = function (a, b, c) {
        if (c) for (var d in c) c.hasOwnProperty(d) && (
            this[d] = c[d]
        );
        this.doc  = a;
        this.node = b;
    };
    Pb.prototype.clear             = function () {
        var a = this.doc.cm,
            b = this.line.widgets,
            c = this.line,
            d = C(c);
        if (null != d && b) {
            for (var e = 0; e < b.length; ++e) b[e] == this && b.splice(e--, 1);
            b.length || (
                c.widgets = null
            );
            var f = Bb(this);
            na(c, Math.max(0, c.height - f));
            a && (
                Z(a, function () {
                    var b = -f;
                    pa(c) < (
                        a.curOp && a.curOp.scrollTop || a.doc.scrollTop
                    ) && vc(a, b);
                    Ba(a, d, "widget");
                }), N(a, "lineWidgetCleared", a, this, d)
            );
        }
    };
    Pb.prototype.changed           = function () {
        var a = this,
            b = this.height,
            c = this.doc.cm,
            d = this.line;
        this.height = null;
        var e = Bb(this) - b;
        e && (
            na(d, d.height + e), c && Z(c, function () {
                c.curOp.forceUpdate = !0;
                pa(d) < (
                    c.curOp && c.curOp.scrollTop || c.doc.scrollTop
                ) && vc(c, e);
                N(c, "lineWidgetChanged", c, a, C(d));
            })
        );
    };
    ab(Pb);
    var Af                  = 0,
        Da                  = function (a, b) {
            this.lines = [];
            this.type = b;
            this.doc = a;
            this.id =
                ++Af;
        };
    Da.prototype.clear      = function () {
        if (!this.explicitlyCleared) {
            var a = this.doc.cm,
                b = a && !a.curOp;
            b && Ta(a);
            if (ga(this, "clear")) {
                var c = this.find();
                c && N(this, "clear", c.from, c.to);
            }
            for (var d = c = null, e = 0; e < this.lines.length; ++e) {
                var f = this.lines[e],
                    g = ub(f.markedSpans, this);
                a && !this.collapsed ? Ba(a, C(f), "text") : a && (
                    null != g.to && (
                        d = C(f)
                    ), null != g.from && (
                        c = C(f)
                    )
                );
                for (var h = f, k = f.markedSpans, l = g, m = void 0, p = 0; p < k.length; ++p) k[p] != l && (
                    m || (
                        m = []
                    )
                ).push(k[p]);
                h.markedSpans = m;
                null == g.from && this.collapsed && !Ja(this.doc,
                    f) && a && na(f, Oa(a.display));
            }
            if (a && this.collapsed && !a.options.lineWrapping) for (e = 0; e < this.lines.length; ++e) f = oa(this.lines[e]), g = lc(f), g > a.display.maxLineLength && (
                a.display.maxLine = f, a.display.maxLineLength = g, a.display.maxLineChanged = !0
            );
            null != c && a && this.collapsed && U(a, c, d + 1);
            this.lines.length      = 0;
            this.explicitlyCleared = !0;
            this.atomic && this.doc.cantEdit && (
                this.doc.cantEdit = !1, a && qf(a.doc)
            );
            a && N(a, "markerCleared", a, this, c, d);
            b && Ua(a);
            this.parent && this.parent.clear();
        }
    };
    Da.prototype.find       = function (a, b) {
        null ==
        a && "bookmark" == this.type && (
            a = 1
        );
        for (var c, d, e = 0; e < this.lines.length; ++e) {
            var f = this.lines[e],
                g = ub(f.markedSpans, this);
            if (null != g.from && (
                c = q(b ? f : C(f), g.from), -1 == a
            )) return c;
            if (null != g.to && (
                d = q(b ? f : C(f), g.to), 1 == a
            )) return d;
        }
        return c && {
            from: c,
            to  : d
        };
    };
    Da.prototype.changed    = function () {
        var a = this,
            b = this.find(-1, !0),
            c = this,
            d = this.doc.cm;
        b && d && Z(d, function () {
            var e = b.line,
                f = C(b.line);
            if (f = ld(d, f)) De(f), d.curOp.selectionChanged = d.curOp.forceUpdate = !0;
            d.curOp.updateMaxLine = !0;
            Ja(c.doc, e) || null == c.height || (
                f =
                    c.height, c.height = null, (
                    f = Bb(c) - f
                ) && na(e, e.height + f)
            );
            N(d, "markerChanged", d, a);
        });
    };
    Da.prototype.attachLine = function (a) {
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            b.maybeHiddenMarkers && -1 != L(b.maybeHiddenMarkers, this) || (
                b.maybeUnhiddenMarkers || (
                    b.maybeUnhiddenMarkers = []
                )
            ).push(this);
        }
        this.lines.push(a);
    };
    Da.prototype.detachLine = function (a) {
        this.lines.splice(L(this.lines, a), 1);
        !this.lines.length && this.doc.cm && (
            a = this.doc.cm.curOp, (
                a.maybeHiddenMarkers || (
                    a.maybeHiddenMarkers = []
                )
            ).push(this)
        );
    };
    ab(Da);
    var Qb             = function (a, b) {
        this.markers = a;
        this.primary = b;
        for (var c = 0; c < a.length; ++c) a[c].parent = this;
    };
    Qb.prototype.clear = function () {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
            N(this, "clear");
        }
    };
    Qb.prototype.find  = function (a, b) {return this.primary.find(a, b);};
    ab(Qb);
    var sh               = 0,
        V                = function (a, b, c, d, e) {
            if (!(
                this instanceof V
            )) return new V(a, b, c, d, e);
            null == c && (
                c = 0
            );
            Ob.call(this, [new Nb([new hb("", null)])]);
            this.first           = c;
            this.scrollTop       =
                this.scrollLeft = 0;
            this.cantEdit = !1;
            this.cleanGeneration = 1;
            this.modeFrontier = this.highlightFrontier = c;
            c = q(c, 0);
            this.sel = xa(c);
            this.history = new Ac(null);
            this.id = ++sh;
            this.modeOption = b;
            this.lineSep = d;
            this.direction = "rtl" == e ? "rtl" : "ltr";
            this.extend = !1;
            "string" == typeof a && (
                a = this.splitLines(a)
            );
            Gd(this, {
                from: c,
                to: c,
                text: a
            });
            O(this, xa(c), sa);
        };
    V.prototype          = Xd(Ob.prototype, {
        constructor             : V,
        iter                    : function (a, b, c) {c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a);},
        insert                  : function (a,
                                            b) {
            for (var c = 0, d = 0; d < b.length; ++d) c += b[d].height;
            this.insertInner(a - this.first, b, c);
        },
        remove                  : function (a, b) {this.removeInner(a - this.first, b);},
        getValue                : function (a) {
            var b = Sc(this, this.first, this.first + this.size);
            return !1 === a ? b : b.join(a || this.lineSeparator());
        },
        setValue                : K(function (a) {
            var b = q(this.first, 0),
                c = this.first + this.size - 1;
            kb(this, {
                from  : b,
                to    : q(c, t(this, c).text.length),
                text  : this.splitLines(a),
                origin: "setValue",
                full  : !0
            }, !0);
            this.cm && Gb(this.cm, 0, 0);
            O(this, xa(b), sa);
        }),
        replaceRange            : function (a, b, c, d) {
            b =
                w(this, b);
            c = c ? w(this, c) : b;
            lb(this, a, b, c, d);
        },
        getRange                : function (a, b, c) {
            a = Ha(this, w(this, a), w(this, b));
            return !1 === c ? a : a.join(c || this.lineSeparator());
        },
        getLine                 : function (a) {
            return (
                a = this.getLineHandle(a)
            ) && a.text;
        },
        getLineHandle           : function (a) {if (tb(this, a)) return t(this, a);},
        getLineNumber           : function (a) {return C(a);},
        getLineHandleVisualStart: function (a) {
            "number" == typeof a && (
                a = t(this, a)
            );
            return oa(a);
        },
        lineCount               : function () {return this.size;},
        firstLine               : function () {return this.first;},
        lastLine                : function () {
            return this.first +
                this.size - 1;
        },
        clipPos                 : function (a) {return w(this, a);},
        getCursor               : function (a) {
            var b = this.sel.primary();
            return null == a || "head" == a ? b.head : "anchor" == a ? b.anchor : "end" == a || "to" == a || !1 === a ? b.to() : b.from();
        },
        listSelections          : function () {return this.sel.ranges;},
        somethingSelected       : function () {return this.sel.somethingSelected();},
        setCursor               : K(function (a, b, c) {
            a = w(this, "number" == typeof a ? q(a, b || 0) : a);
            O(this, xa(a, null), c);
        }),
        setSelection            : K(function (a, b, c) {
            var d = w(this, a);
            a     = w(this, b || a);
            O(this, xa(d, a), c);
        }),
        extendSelection         : K(function (a,
                                              b, c) {Cc(this, w(this, a), b && w(this, b), c);}),
        extendSelections        : K(function (a, b) {mf(this, $d(this, a), b);}),
        extendSelectionsBy      : K(function (a, b) {
            var c = gc(this.sel.ranges, a);
            mf(this, $d(this, c), b);
        }),
        setSelections           : K(function (a, b, c) {
            if (a.length) {
                for (var d = [], e = 0; e < a.length; e++) d[e] = new A(w(this, a[e].anchor), w(this, a[e].head));
                null == b && (
                    b = Math.min(a.length - 1, this.sel.primIndex)
                );
                O(this, ma(d, b), c);
            }
        }),
        addSelection            : K(function (a, b, c) {
            var d = this.sel.ranges.slice(0);
            d.push(new A(w(this, a), w(this, b || a)));
            O(this, ma(d, d.length -
                1), c);
        }),
        getSelection            : function (a) {
            for (var b = this.sel.ranges, c, d = 0; d < b.length; d++) {
                var e = Ha(this, b[d].from(), b[d].to());
                c     = c ? c.concat(e) : e;
            }
            return !1 === a ? c : c.join(a || this.lineSeparator());
        },
        getSelections           : function (a) {
            for (var b = [], c = this.sel.ranges, d = 0; d < c.length; d++) {
                var e = Ha(this, c[d].from(), c[d].to());
                !1 !== a && (
                    e = e.join(a || this.lineSeparator())
                );
                b[d] = e;
            }
            return b;
        },
        replaceSelection        : function (a, b, c) {
            for (var d = [], e = 0; e < this.sel.ranges.length; e++) d[e] = a;
            this.replaceSelections(d, b, c || "+input");
        },
        replaceSelections       : K(function (a,
                                              b, c) {
            for (var d = [], e = this.sel, f = 0; f < e.ranges.length; f++) {
                var g = e.ranges[f];
                d[f]  = {
                    from  : g.from(),
                    to    : g.to(),
                    text  : this.splitLines(a[f]),
                    origin: c
                };
            }
            if (a = b && "end" != b) {
                a = [];
                e = c = q(this.first, 0);
                for (f = 0; f < d.length; f++) {
                    var h = d[f],
                        g = df(h.from, c, e),
                        k = df(Ca(h), c, e);
                    c = h.to;
                    e = k;
                    "around" == b ? (
                        h = this.sel.ranges[f], h = 0 > x(h.head, h.anchor), a[f] = new A(h ? k : g, h ? g : k)
                    ) : a[f] = new A(g, g);
                }
                a = new da(a, this.sel.primIndex);
            }
            b = a;
            for (a = d.length - 1; 0 <= a; a--) kb(this, d[a]);
            b ? nf(this, b) : this.cm && fb(this.cm);
        }),
        undo                    : K(function () {Ec(this, "undo");}),
        redo                    : K(function () {Ec(this, "redo");}),
        undoSelection           : K(function () {Ec(this, "undo", !0);}),
        redoSelection           : K(function () {Ec(this, "redo", !0);}),
        setExtending            : function (a) {this.extend = a;},
        getExtending            : function () {return this.extend;},
        historySize             : function () {
            for (var a = this.history, b = 0, c = 0, d = 0; d < a.done.length; d++) a.done[d].ranges || ++b;
            for (d = 0; d < a.undone.length; d++) a.undone[d].ranges || ++c;
            return {
                undo: b,
                redo: c
            };
        },
        clearHistory            : function () {this.history = new Ac(this.history.maxGeneration);},
        markClean               : function () {
            this.cleanGeneration =
                this.changeGeneration(!0);
        },
        changeGeneration        : function (a) {
            a && (
                this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null
            );
            return this.history.generation;
        },
        isClean                 : function (a) {
            return this.history.generation == (
                a || this.cleanGeneration
            );
        },
        getHistory              : function () {
            return {
                done  : ib(this.history.done),
                undone: ib(this.history.undone)
            };
        },
        setHistory              : function (a) {
            var b    = this.history = new Ac(this.history.maxGeneration);
            b.done   = ib(a.done.slice(0), null, !0);
            b.undone = ib(a.undone.slice(0), null, !0);
        },
        setGutterMarker         : K(function (a,
                                              b, c) {
            return Mb(this, a, "gutter", function (a) {
                var e = a.gutterMarkers || (
                    a.gutterMarkers = {}
                );
                e[b]  = c;
                !c && Yd(e) && (
                    a.gutterMarkers = null
                );
                return !0;
            });
        }),
        clearGutter             : K(function (a) {
            var b = this;
            this.iter(function (c) {
                c.gutterMarkers && c.gutterMarkers[a] && Mb(b, c, "gutter", function () {
                    c.gutterMarkers[a] = null;
                    Yd(c.gutterMarkers) && (
                        c.gutterMarkers = null
                    );
                    return !0;
                });
            });
        }),
        lineInfo                : function (a) {
            var b;
            if ("number" == typeof a) {
                if (!tb(this, a)) return null;
                b = a;
                a = t(this, a);
                if (!a) return null;
            } else if (b = C(a), null == b) return null;
            return {
                line         : b,
                handle       : a,
                text         : a.text,
                gutterMarkers: a.gutterMarkers,
                textClass    : a.textClass,
                bgClass      : a.bgClass,
                wrapClass    : a.wrapClass,
                widgets      : a.widgets
            };
        },
        addLineClass            : K(function (a, b, c) {
            return Mb(this, a, "gutter" == b ? "gutter" : "class", function (a) {
                var e = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass";
                if (a[e]) {
                    if (ha(c).test(a[e])) return !1;
                    a[e] += " " + c;
                } else a[e] = c;
                return !0;
            });
        }),
        removeLineClass         : K(function (a, b, c) {
            return Mb(this, a, "gutter" == b ? "gutter" : "class", function (a) {
                var e = "text" == b ? "textClass" :
                    "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass",
                    f = a[e];
                if (f) if (null == c) a[e] = null; else {
                    var g = f.match(ha(c));
                    if (!g) return !1;
                    var h = g.index + g[0].length;
                    a[e]  = f.slice(0, g.index) + (
                        g.index && h != f.length ? " " : ""
                    ) + f.slice(h) || null;
                } else return !1;
                return !0;
            });
        }),
        addLineWidget           : K(function (a, b, c) {return Og(this, a, b, c);}),
        removeLineWidget        : function (a) {a.clear();},
        markText                : function (a, b, c) {return mb(this, w(this, a), w(this, b), c, c && c.type || "range");},
        setBookmark             : function (a, b) {
            var c = {
                replacedWith     : b && (
                    null == b.nodeType ?
                        b.widget : b
                ),
                insertLeft       : b && b.insertLeft,
                clearWhenEmpty   : !1,
                shared           : b && b.shared,
                handleMouseEvents: b && b.handleMouseEvents
            };
            a     = w(this, a);
            return mb(this, a, a, c, "bookmark");
        },
        findMarksAt             : function (a) {
            a = w(this, a);
            var b = [],
                c = t(this, a.line).markedSpans;
            if (c) for (var d = 0; d < c.length; ++d) {
                var e = c[d];
                (
                    null == e.from || e.from <= a.ch
                ) && (
                    null == e.to || e.to >= a.ch
                ) && b.push(e.marker.parent || e.marker);
            }
            return b;
        },
        findMarks               : function (a, b, c) {
            a = w(this, a);
            b = w(this, b);
            var d = [],
                e = a.line;
            this.iter(a.line, b.line + 1, function (f) {
                if (f = f.markedSpans) for (var g =
                                                    0; g < f.length; g++) {
                    var h = f[g];
                    null != h.to && e == a.line && a.ch >= h.to || null == h.from && e != a.line || null != h.from && e == b.line && h.from >= b.ch || c && !c(h.marker) || d.push(h.marker.parent || h.marker);
                }
                ++e;
            });
            return d;
        },
        getAllMarks             : function () {
            var a = [];
            this.iter(function (b) {if (b = b.markedSpans) for (var c = 0; c < b.length; ++c) null != b[c].from && a.push(b[c].marker);});
            return a;
        },
        posFromIndex            : function (a) {
            var b,
                c = this.first,
                d = this.lineSeparator().length;
            this.iter(function (e) {
                e = e.text.length + d;
                if (e > a) return b = a, !0;
                a -= e;
                ++c;
            });
            return w(this,
                q(c, b));
        },
        indexFromPos            : function (a) {
            a     = w(this, a);
            var b = a.ch;
            if (a.line < this.first || 0 > a.ch) return 0;
            var c = this.lineSeparator().length;
            this.iter(this.first, a.line, function (a) {b += a.text.length + c;});
            return b;
        },
        copy                    : function (a) {
            var b        = new V(Sc(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            b.scrollTop  = this.scrollTop;
            b.scrollLeft = this.scrollLeft;
            b.sel        = this.sel;
            b.extend     = !1;
            a && (
                b.history.undoDepth = this.history.undoDepth, b.setHistory(this.getHistory())
            );
            return b;
        },
        linkedDoc               : function (a) {
            a ||
            (
                a = {}
            );
            var b = this.first,
                c = this.first + this.size;
            null != a.from && a.from > b && (
                b = a.from
            );
            null != a.to && a.to < c && (
                c = a.to
            );
            b = new V(Sc(this, b, c), a.mode || this.modeOption, b, this.lineSep, this.direction);
            a.sharedHist && (
                b.history = this.history
            );
            (
                this.linked || (
                    this.linked = []
                )
            ).push({
                doc       : b,
                sharedHist: a.sharedHist
            });
            b.linked = [{
                doc       : this,
                isParent  : !0,
                sharedHist: a.sharedHist
            }];
            a        = Bf(this);
            for (c = 0; c < a.length; c++) {
                var d = a[c],
                    e = d.find(),
                    f = b.clipPos(e.from),
                    e = b.clipPos(e.to);
                x(f, e) && (
                    f = mb(b, f, e, d.primary, d.primary.type), d.markers.push(f),
                        f.parent = d
                );
            }
            return b;
        },
        unlinkDoc               : function (a) {
            a instanceof E && (
                a = a.doc
            );
            if (this.linked) for (var b = 0; b < this.linked.length; ++b) if (this.linked[b].doc == a) {
                this.linked.splice(b, 1);
                a.unlinkDoc(this);
                Qg(Bf(this));
                break;
            }
            if (a.history == this.history) {
                var c = [a.id];
                Va(a, function (a) {return c.push(a.id);}, !0);
                a.history        = new Ac(null);
                a.history.done   = ib(this.history.done, c);
                a.history.undone = ib(this.history.undone, c);
            }
        },
        iterLinkedDocs          : function (a) {Va(this, a);},
        getMode                 : function () {return this.mode;},
        getEditor               : function () {return this.cm;},
        splitLines              : function (a) {return this.lineSep ? a.split(this.lineSep) : Ud(a);},
        lineSeparator           : function () {return this.lineSep || "\n";},
        setDirection            : K(function (a) {
            "rtl" != a && (
                a = "ltr"
            );
            a != this.direction && (
                this.direction = a, this.iter(function (a) {return a.order = null;}), this.cm && Kg(this.cm)
            );
        })
    });
    V.prototype.eachLine = V.prototype.iter;
    for (var Df = 0, Vf = !1, Ea = {
        3    : "Pause",
        8    : "Backspace",
        9    : "Tab",
        13   : "Enter",
        16   : "Shift",
        17   : "Ctrl",
        18   : "Alt",
        19   : "Pause",
        20   : "CapsLock",
        27   : "Esc",
        32   : "Space",
        33   : "PageUp",
        34   : "PageDown",
        35   : "End",
        36   : "Home",
        37   : "Left",
        38   : "Up",
        39   : "Right",
        40   : "Down",
        44   : "PrintScrn",
        45   : "Insert",
        46   : "Delete",
        59   : ";",
        61   : "\x3d",
        91   : "Mod",
        92   : "Mod",
        93   : "Mod",
        106  : "*",
        107  : "\x3d",
        109  : "-",
        110  : ".",
        111  : "/",
        127  : "Delete",
        145  : "ScrollLock",
        173  : "-",
        186  : ";",
        187  : "\x3d",
        188  : ",",
        189  : "-",
        190  : ".",
        191  : "/",
        192  : "`",
        219  : "[",
        220  : "\\",
        221  : "]",
        222  : "'",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    }, cc       = 0; 10 > cc; cc++) Ea[cc + 48] = Ea[cc + 96] = String(cc);
    for (var Lc = 65; 90 >= Lc; Lc++) Ea[Lc] =
        String.fromCharCode(Lc);
    for (var dc = 1; 12 >= dc; dc++) Ea[dc + 111] = Ea[dc + 63235] = "F" + dc;
    var Rb                             = {
        basic     : {
            Left             : "goCharLeft",
            Right            : "goCharRight",
            Up               : "goLineUp",
            Down             : "goLineDown",
            End              : "goLineEnd",
            Home             : "goLineStartSmart",
            PageUp           : "goPageUp",
            PageDown         : "goPageDown",
            Delete           : "delCharAfter",
            Backspace        : "delCharBefore",
            "Shift-Backspace": "delCharBefore",
            Tab              : "defaultTab",
            "Shift-Tab"      : "indentAuto",
            Enter            : "newlineAndIndent",
            Insert           : "toggleOverwrite",
            Esc              : "singleSelection"
        },
        pcDefault : {
            "Ctrl-A"        : "selectAll",
            "Ctrl-D"        : "deleteLine",
            "Ctrl-Z"        : "undo",
            "Shift-Ctrl-Z"  : "redo",
            "Ctrl-Y"        : "redo",
            "Ctrl-Home"     : "goDocStart",
            "Ctrl-End"      : "goDocEnd",
            "Ctrl-Up"       : "goLineUp",
            "Ctrl-Down"     : "goLineDown",
            "Ctrl-Left"     : "goGroupLeft",
            "Ctrl-Right"    : "goGroupRight",
            "Alt-Left"      : "goLineStart",
            "Alt-Right"     : "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete"   : "delGroupAfter",
            "Ctrl-S"        : "save",
            "Ctrl-F"        : "find",
            "Ctrl-G"        : "findNext",
            "Shift-Ctrl-G"  : "findPrev",
            "Shift-Ctrl-F"  : "replace",
            "Shift-Ctrl-R"  : "replaceAll",
            "Ctrl-["        : "indentLess",
            "Ctrl-]"        : "indentMore",
            "Ctrl-U"        : "undoSelection",
            "Shift-Ctrl-U"  : "redoSelection",
            "Alt-U"         : "redoSelection",
            fallthrough     : "basic"
        },
        emacsy    : {
            "Ctrl-F"       : "goCharRight",
            "Ctrl-B"       : "goCharLeft",
            "Ctrl-P"       : "goLineUp",
            "Ctrl-N"       : "goLineDown",
            "Alt-F"        : "goWordRight",
            "Alt-B"        : "goWordLeft",
            "Ctrl-A"       : "goLineStart",
            "Ctrl-E"       : "goLineEnd",
            "Ctrl-V"       : "goPageDown",
            "Shift-Ctrl-V" : "goPageUp",
            "Ctrl-D"       : "delCharAfter",
            "Ctrl-H"       : "delCharBefore",
            "Alt-D"        : "delWordAfter",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K"       : "killLine",
            "Ctrl-T"       : "transposeChars",
            "Ctrl-O"       : "openLine"
        },
        macDefault: {
            "Cmd-A"             : "selectAll",
            "Cmd-D"             : "deleteLine",
            "Cmd-Z"             : "undo",
            "Shift-Cmd-Z"       : "redo",
            "Cmd-Y"             : "redo",
            "Cmd-Home"          : "goDocStart",
            "Cmd-Up"            : "goDocStart",
            "Cmd-End"           : "goDocEnd",
            "Cmd-Down"          : "goDocEnd",
            "Alt-Left"          : "goGroupLeft",
            "Alt-Right"         : "goGroupRight",
            "Cmd-Left"          : "goLineLeft",
            "Cmd-Right"         : "goLineRight",
            "Alt-Backspace"     : "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete"        : "delGroupAfter",
            "Cmd-S"             : "save",
            "Cmd-F"             : "find",
            "Cmd-G"             : "findNext",
            "Shift-Cmd-G"       : "findPrev",
            "Cmd-Alt-F"         : "replace",
            "Shift-Cmd-Alt-F"   : "replaceAll",
            "Cmd-["             : "indentLess",
            "Cmd-]"             : "indentMore",
            "Cmd-Backspace"     : "delWrappedLineLeft",
            "Cmd-Delete"        : "delWrappedLineRight",
            "Cmd-U"             : "undoSelection",
            "Shift-Cmd-U"       : "redoSelection",
            "Ctrl-Up"           : "goDocStart",
            "Ctrl-Down"         : "goDocEnd",
            fallthrough         : ["basic", "emacsy"]
        }
    };
    Rb["default"]                      = ia ? Rb.macDefault : Rb.pcDefault;
    var Sb                             = {
            selectAll          : sf,
            singleSelection    : function (a) {return a.setSelection(a.getCursor("anchor"), a.getCursor("head"), sa);},
            killLine           : function (a) {
                return ob(a, function (b) {
                    if (b.empty()) {
                        var c = t(a.doc, b.head.line).text.length;
                        return b.head.ch == c && b.head.line < a.lastLine() ? {
                            from: b.head,
                            to: q(b.head.line +
                                1, 0)
                        } : {
                            from: b.head,
                            to: q(b.head.line, c)
                        };
                    }
                    return {
                        from: b.from(),
                        to: b.to()
                    };
                });
            },
            deleteLine: function (a) {
                return ob(a, function (b) {
                    return {
                        from: q(b.from().line, 0),
                        to: w(a.doc, q(b.to().line + 1, 0))
                    };
                });
            },
            delLineLeft: function (a) {
                return ob(a, function (a) {
                    return {
                        from: q(a.from().line, 0),
                        to: a.from()
                    };
                });
            },
            delWrappedLineLeft: function (a) {
                return ob(a, function (b) {
                    var c = a.charCoords(b.head, "div").top + 5;
                    return {
                        from: a.coordsChar({
                            left: 0,
                            top: c
                        }, "div"),
                        to: b.from()
                    };
                });
            },
            delWrappedLineRight: function (a) {
                return ob(a, function (b) {
                    var c =
                            a.charCoords(b.head, "div").top + 5,
                        c = a.coordsChar({
                            left: a.display.lineDiv.offsetWidth + 100,
                            top: c
                        }, "div");
                    return {
                        from: b.from(),
                        to: c
                    };
                });
            },
            undo               : function (a) {return a.undo();},
            redo               : function (a) {return a.redo();},
            undoSelection      : function (a) {return a.undoSelection();},
            redoSelection      : function (a) {return a.redoSelection();},
            goDocStart         : function (a) {return a.extendSelection(q(a.firstLine(), 0));},
            goDocEnd           : function (a) {return a.extendSelection(q(a.lastLine()));},
            goLineStart        : function (a) {
                return a.extendSelectionsBy(function (b) {
                    return Jf(a,
                        b.head.line);
                }, {
                    origin: "+move",
                    bias: 1
                });
            },
            goLineStartSmart   : function (a) {
                return a.extendSelectionsBy(function (b) {return Kf(a, b.head);}, {
                    origin: "+move",
                    bias: 1
                });
            },
            goLineEnd          : function (a) {
                return a.extendSelectionsBy(function (b) {
                    b = b.head.line;
                    var c = t(a.doc, b),
                        d;
                    d = c;
                    for (var e; e = $a(d, !1);) d = e.find(1, !0).line;
                    d != c && (
                        b = C(d)
                    );
                    return Nd(!0, a, c, b, -1);
                }, {
                    origin: "+move",
                    bias: -1
                });
            },
            goLineRight        : function (a) {
                return a.extendSelectionsBy(function (b) {
                    b = a.cursorCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: a.display.lineDiv.offsetWidth +
                            100,
                        top : b
                    }, "div");
                }, ac);
            },
            goLineLeft         : function (a) {
                return a.extendSelectionsBy(function (b) {
                    b = a.cursorCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: 0,
                        top: b
                    }, "div");
                }, ac);
            },
            goLineLeftSmart    : function (a) {
                return a.extendSelectionsBy(function (b) {
                    var c = a.cursorCoords(b.head, "div").top + 5,
                        c = a.coordsChar({
                            left: 0,
                            top: c
                        }, "div");
                    return c.ch < a.getLine(c.line).search(/\S/) ? Kf(a, b.head) : c;
                }, ac);
            },
            goLineUp           : function (a) {return a.moveV(-1, "line");},
            goLineDown         : function (a) {return a.moveV(1, "line");},
            goPageUp           : function (a) {
                return a.moveV(-1,
                    "page");
            },
            goPageDown         : function (a) {return a.moveV(1, "page");},
            goCharLeft         : function (a) {return a.moveH(-1, "char");},
            goCharRight        : function (a) {return a.moveH(1, "char");},
            goColumnLeft       : function (a) {return a.moveH(-1, "column");},
            goColumnRight      : function (a) {return a.moveH(1, "column");},
            goWordLeft         : function (a) {return a.moveH(-1, "word");},
            goGroupRight       : function (a) {return a.moveH(1, "group");},
            goGroupLeft        : function (a) {return a.moveH(-1, "group");},
            goWordRight        : function (a) {return a.moveH(1, "word");},
            delCharBefore      : function (a) {
                return a.deleteH(-1,
                    "char");
            },
            delCharAfter       : function (a) {return a.deleteH(1, "char");},
            delWordBefore      : function (a) {return a.deleteH(-1, "word");},
            delWordAfter       : function (a) {return a.deleteH(1, "word");},
            delGroupBefore     : function (a) {return a.deleteH(-1, "group");},
            delGroupAfter      : function (a) {return a.deleteH(1, "group");},
            indentAuto         : function (a) {return a.indentSelection("smart");},
            indentMore         : function (a) {return a.indentSelection("add");},
            indentLess         : function (a) {return a.indentSelection("subtract");},
            insertTab          : function (a) {return a.replaceSelection("\t");},
            insertSoftTab      : function (a) {
                for (var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0; e < c.length; e++) {
                    var f = c[e].from(),
                        f = fa(a.getLine(f.line), f.ch, d);
                    b.push(Pc(d - f % d));
                }
                a.replaceSelections(b);
            },
            defaultTab         : function (a) {a.somethingSelected() ? a.indentSelection("add") : a.execCommand("insertTab");},
            transposeChars     : function (a) {
                return Z(a, function () {
                    for (var b = a.listSelections(), c = [], d = 0; d < b.length; d++) if (b[d].empty()) {
                        var e = b[d].head,
                            f = t(a.doc, e.line).text;
                        if (f) if (e.ch == f.length && (
                            e = new q(e.line, e.ch - 1)
                        ), 0 < e.ch) e =
                            new q(e.line, e.ch + 1), a.replaceRange(f.charAt(e.ch - 1) + f.charAt(e.ch - 2), q(e.line, e.ch - 2), e, "+transpose"); else if (e.line > a.doc.first) {
                            var g = t(a.doc, e.line - 1).text;
                            g && (
                                e = new q(e.line, 1), a.replaceRange(f.charAt(0) + a.doc.lineSeparator() + g.charAt(g.length - 1), q(e.line - 1, g.length - 1), e, "+transpose")
                            );
                        }
                        c.push(new A(e, e));
                    }
                    a.setSelections(c);
                });
            },
            newlineAndIndent   : function (a) {
                return Z(a, function () {
                    for (var b = a.listSelections(), c = b.length - 1; 0 <= c; c--) a.replaceRange(a.doc.lineSeparator(), b[c].anchor, b[c].head, "+input");
                    b = a.listSelections();
                    for (c = 0; c < b.length; c++) a.indentLine(b[c].from().line, null, !0);
                    fb(a);
                });
            },
            openLine           : function (a) {return a.replaceSelection("\n", "start");},
            toggleOverwrite    : function (a) {return a.toggleOverwrite();}
        },
        Xg                             = new Wa,
        Od                             = null,
        Pd                             = function (a, b, c) {
            this.time = a;
            this.pos = b;
            this.button = c;
        };
    Pd.prototype.compare               = function (a, b, c) {return this.time + 400 > a && 0 == x(b, this.pos) && c == this.button;};
    var Vb,
        Ub,
        pb                             = {toString: function () {return "CodeMirror.Init";}},
        Uf                             = {},
        Jc                             = {};
    E.defaults                         = Uf;
    E.optionHandlers                   = Jc;
    var Sd                             = [];
    E.defineInitHook                   =
        function (a) {return Sd.push(a);};
    var ea                             = null,
        y                              = function (a) {
            this.cm = a;
            this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
            this.polling = new Wa;
            this.composing = null;
            this.gracePeriod = !1;
            this.readDOMTimeout = null;
        };
    y.prototype.init                   = function (a) {
        function b(a) {
            if (!I(e, a)) {
                if (e.somethingSelected()) Xf({
                    lineWise: !1,
                    text    : e.getSelections()
                }), "cut" == a.type && e.replaceSelection("", null, "cut"); else if (e.options.lineWiseCopyCut) {
                    var b = $f(e);
                    Xf({
                        lineWise: !0,
                        text    : b.text
                    });
                    "cut" == a.type &&
                    e.operation(function () {
                        e.setSelections(b.ranges, 0, sa);
                        e.replaceSelection("", null, "cut");
                    });
                } else return;
                if (a.clipboardData) {
                    a.clipboardData.clearData();
                    var c = ea.text.join("\n");
                    a.clipboardData.setData("Text", c);
                    if (a.clipboardData.getData("Text") == c) {
                        a.preventDefault();
                        return;
                    }
                }
                var l = bg();
                a     = l.firstChild;
                e.display.lineSpace.insertBefore(l, e.display.lineSpace.firstChild);
                a.value = ea.text.join("\n");
                var m   = document.activeElement;
                $b(a);
                setTimeout(function () {
                    e.display.lineSpace.removeChild(l);
                    m.focus();
                    m == f &&
                    d.showPrimarySelection();
                }, 50);
            }
        }
        
        var c = this,
            d = this,
            e = d.cm,
            f = d.div = a.lineDiv;
        ag(f, e.options.spellcheck);
        v(f, "paste", function (a) {I(e, a) || Zf(a, e) || 11 >= D && setTimeout(J(e, function () {return c.updateFromDOM();}), 20);});
        v(f, "compositionstart", function (a) {
            c.composing = {
                data: a.data,
                done: !1
            };
        });
        v(f, "compositionupdate", function (a) {
            c.composing || (
                c.composing = {
                    data: a.data,
                    done: !1
                }
            );
        });
        v(f, "compositionend", function (a) {
            c.composing && (
                a.data != c.composing.data && c.readFromDOMSoon(), c.composing.done = !0
            );
        });
        v(f, "touchstart", function () {return d.forceCompositionEnd();});
        v(f, "input", function () {c.composing || c.readFromDOMSoon();});
        v(f, "copy", b);
        v(f, "cut", b);
    };
    y.prototype.prepareSelection       = function () {
        var a   = Me(this.cm, !1);
        a.focus = this.cm.state.focused;
        return a;
    };
    y.prototype.showSelection          = function (a, b) {
        a && this.cm.display.view.length && (
            (
                a.focus || b
            ) && this.showPrimarySelection(), this.showMultipleSelections(a)
        );
    };
    y.prototype.getSelection           = function () {return this.cm.display.wrapper.ownerDocument.getSelection();};
    y.prototype.showPrimarySelection   = function () {
        var a = this.getSelection(),
            b = this.cm,
            c = b.doc.sel.primary(),
            d = c.from(),
            c = c.to();
        if (b.display.viewTo == b.display.viewFrom || d.line >= b.display.viewTo || c.line < b.display.viewFrom) a.removeAllRanges(); else {
            var e = Kc(b, a.anchorNode, a.anchorOffset),
                f = Kc(b, a.focusNode, a.focusOffset);
            if (!e || e.bad || !f || f.bad || 0 != x(jc(e, f), d) || 0 != x(ic(e, f), c)) if (e = b.display.view, d = d.line >= b.display.viewFrom && dg(b, d) || {
                node  : e[0].measure.map[2],
                offset: 0
            }, c = c.line < b.display.viewTo && dg(b, c), c || (
                c = e[e.length - 1].measure, c = c.maps ? c.maps[c.maps.length - 1] : c.map, c =
                    {
                        node  : c[c.length - 1],
                        offset: c[c.length - 2] - c[c.length - 3]
                    }
            ), d && c) {
                var e = a.rangeCount && a.getRangeAt(0),
                    g;
                try {g = db(d.node, d.offset, c.offset, c.node);} catch (h) {}
                g && (
                    !za && b.state.focused ? (
                        a.collapse(d.node, d.offset), g.collapsed || (
                            a.removeAllRanges(), a.addRange(g)
                        )
                    ) : (
                        a.removeAllRanges(), a.addRange(g)
                    ), e && null == a.anchorNode ? a.addRange(e) : za && this.startGracePeriod()
                );
                this.rememberSelection();
            } else a.removeAllRanges();
        }
    };
    y.prototype.startGracePeriod       = function () {
        var a = this;
        clearTimeout(this.gracePeriod);
        this.gracePeriod =
            setTimeout(function () {
                a.gracePeriod = !1;
                a.selectionChanged() && a.cm.operation(function () {return a.cm.curOp.selectionChanged = !0;});
            }, 20);
    };
    y.prototype.showMultipleSelections = function (a) {
        aa(this.cm.display.cursorDiv, a.cursors);
        aa(this.cm.display.selectionDiv, a.selection);
    };
    y.prototype.rememberSelection = function () {
        var a                 = this.getSelection();
        this.lastAnchorNode   = a.anchorNode;
        this.lastAnchorOffset = a.anchorOffset;
        this.lastFocusNode    = a.focusNode;
        this.lastFocusOffset  = a.focusOffset;
    };
    y.prototype.selectionInEditor = function () {
        var a =
                this.getSelection();
        if (!a.rangeCount) return !1;
        a = a.getRangeAt(0).commonAncestorContainer;
        return ya(this.div, a);
    };
    y.prototype.focus                  = function () {
        "nocursor" != this.cm.options.readOnly && (
            this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus()
        );
    };
    y.prototype.blur                   = function () {this.div.blur();};
    y.prototype.getField               = function () {return this.div;};
    y.prototype.supportsTouch          = function () {return !0;};
    y.prototype.receivedFocus          = function () {
        function a() {
            b.cm.state.focused && (
                b.pollSelection(),
                    b.polling.set(b.cm.options.pollInterval, a)
            );
        }
        
        var b = this;
        this.selectionInEditor() ? this.pollSelection() : Z(this.cm, function () {return b.cm.curOp.selectionChanged = !0;});
        this.polling.set(this.cm.options.pollInterval, a);
    };
    y.prototype.selectionChanged       = function () {
        var a = this.getSelection();
        return a.anchorNode != this.lastAnchorNode || a.anchorOffset != this.lastAnchorOffset || a.focusNode != this.lastFocusNode || a.focusOffset != this.lastFocusOffset;
    };
    y.prototype.pollSelection          = function () {
        if (null == this.readDOMTimeout && !this.gracePeriod &&
            this.selectionChanged()) {
            var a = this.getSelection(),
                b = this.cm;
            if (rc && qc && this.cm.options.gutters.length && lh(a.anchorNode)) this.cm.triggerOnKeyDown({
                type          : "keydown",
                keyCode       : 8,
                preventDefault: Math.abs
            }), this.blur(), this.focus(); else if (!this.composing) {
                this.rememberSelection();
                var c = Kc(b, a.anchorNode, a.anchorOffset),
                    d = Kc(b, a.focusNode, a.focusOffset);
                c && d && Z(b, function () {
                    O(b.doc, xa(c, d), sa);
                    if (c.bad || d.bad) b.curOp.selectionChanged = !0;
                });
            }
        }
    };
    y.prototype.pollContent            = function () {
        null != this.readDOMTimeout && (
            clearTimeout(this.readDOMTimeout),
                this.readDOMTimeout = null
        );
        var a = this.cm,
            b = a.display,
            c = a.doc.sel.primary(),
            d = c.from(),
            e = c.to();
        0 == d.ch && d.line > a.firstLine() && (
            d = q(d.line - 1, t(a.doc, d.line - 1).length)
        );
        e.ch == t(a.doc, e.line).text.length && e.line < a.lastLine() && (
            e = q(e.line + 1, 0)
        );
        if (d.line < b.viewFrom || e.line > b.viewTo - 1) return !1;
        var f;
        d.line == b.viewFrom || 0 == (
            f = Ma(a, d.line)
        ) ? (
            c = C(b.view[0].line), f = b.view[0].node
        ) : (
            c = C(b.view[f].line), f = b.view[f - 1].node.nextSibling
        );
        var g = Ma(a, e.line);
        g == b.view.length - 1 ? (
                e = b.viewTo - 1, b = b.lineDiv.lastChild
            ) :
            (
                e = C(b.view[g + 1].line) - 1, b = b.view[g + 1].node.previousSibling
            );
        if (!f) return !1;
        b = a.doc.splitLines(mh(a, f, b, c, e));
        for (f = Ha(a.doc, q(c, 0), q(e, t(a.doc, e).text.length)); 1 < b.length && 1 < f.length;) if (z(b) == z(f)) b.pop(), f.pop(), e--; else if (b[0] == f[0]) b.shift(), f.shift(), c++; else break;
        for (var h = 0, g = 0, k = b[0], l = f[0], m = Math.min(k.length, l.length); h < m && k.charCodeAt(h) == l.charCodeAt(h);) ++h;
        k = z(b);
        l = z(f);
        for (m = Math.min(k.length - (
            1 == b.length ? h : 0
        ), l.length - (
            1 == f.length ? h : 0
        )); g < m && k.charCodeAt(k.length - g - 1) == l.charCodeAt(l.length -
            g - 1);) ++g;
        if (1 == b.length && 1 == f.length && c == d.line) for (; h && h > d.ch && k.charCodeAt(k.length - g - 1) == l.charCodeAt(l.length - g - 1);) h--, g++;
        b[b.length - 1] = k.slice(0, k.length - g).replace(/^\u200b+/, "");
        b[0]            = b[0].slice(h).replace(/\u200b+$/, "");
        d               = q(c, h);
        c               = q(e, f.length ? z(f).length - g : 0);
        if (1 < b.length || b[0] || x(d, c)) return lb(a.doc, b, d, c, "+input"), !0;
    };
    y.prototype.ensurePolled           = function () {this.forceCompositionEnd();};
    y.prototype.reset                  = function () {this.forceCompositionEnd();};
    y.prototype.forceCompositionEnd    = function () {
        this.composing &&
        (
            clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus()
        );
    };
    y.prototype.readFromDOMSoon        = function () {
        var a = this;
        null == this.readDOMTimeout && (
            this.readDOMTimeout = setTimeout(function () {
                a.readDOMTimeout = null;
                if (a.composing) if (a.composing.done) a.composing = null; else return;
                a.updateFromDOM();
            }, 80)
        );
    };
    y.prototype.updateFromDOM          = function () {
        var a = this;
        !this.cm.isReadOnly() && this.pollContent() || Z(this.cm, function () {return U(a.cm);});
    };
    y.prototype.setUneditable          = function (a) {
        a.contentEditable =
            "false";
    };
    y.prototype.onKeyPress             = function (a) {
        0 == a.charCode || this.composing || (
            a.preventDefault(), this.cm.isReadOnly() || J(this.cm, Td)(this.cm, String.fromCharCode(null == a.charCode ? a.keyCode : a.charCode), 0)
        );
    };
    y.prototype.readOnlyChanged        = function (a) {this.div.contentEditable = String("nocursor" != a);};
    y.prototype.onContextMenu          = function () {};
    y.prototype.resetPosition          = function () {};
    y.prototype.needsContentAttribute  = !0;
    var H                              = function (a) {
        this.cm           = a;
        this.prevInput    = "";
        this.pollingFast  = !1;
        this.polling      = new Wa;
        this.hasSelection =
            !1;
        this.composing    = null;
    };
    H.prototype.init                   = function (a) {
        function b(a) {
            if (!I(e, a)) {
                if (e.somethingSelected()) ea = {
                    lineWise: !1,
                    text    : e.getSelections()
                }; else if (e.options.lineWiseCopyCut) {
                    var b = $f(e);
                    ea    = {
                        lineWise: !0,
                        text    : b.text
                    };
                    "cut" == a.type ? e.setSelections(b.ranges, null, sa) : (
                        d.prevInput = "", f.value = b.text.join("\n"), $b(f)
                    );
                } else return;
                "cut" == a.type && (
                    e.state.cutIncoming = !0
                );
            }
        }
        
        var c = this,
            d = this,
            e = this.cm;
        this.createField(a);
        var f = this.textarea;
        a.wrapper.insertBefore(this.wrapper, a.wrapper.firstChild);
        Yb && (
            f.style.width =
                "0px"
        );
        v(f, "input", function () {
            B && 9 <= D && c.hasSelection && (
                c.hasSelection = null
            );
            d.poll();
        });
        v(f, "paste", function (a) {
            I(e, a) || Zf(a, e) || (
                e.state.pasteIncoming = !0, d.fastPoll()
            );
        });
        v(f, "cut", b);
        v(f, "copy", b);
        v(a.scroller, "paste", function (b) {
            wa(a, b) || I(e, b) || (
                e.state.pasteIncoming = !0, d.focus()
            );
        });
        v(a.lineSpace, "selectstart", function (b) {wa(a, b) || T(b);});
        v(f, "compositionstart", function () {
            var a = e.getCursor("from");
            d.composing && d.composing.range.clear();
            d.composing = {
                start: a,
                range: e.markText(a, e.getCursor("to"), {className: "CodeMirror-composing"})
            };
        });
        v(f, "compositionend", function () {
            d.composing && (
                d.poll(), d.composing.range.clear(), d.composing = null
            );
        });
    };
    H.prototype.createField            = function (a) {
        this.wrapper  = bg();
        this.textarea = this.wrapper.firstChild;
    };
    H.prototype.prepareSelection       = function () {
        var a = this.cm,
            b = a.display,
            c = a.doc,
            d = Me(a);
        if (a.options.moveInputWithCursor) {
            var a = ka(a, c.sel.primary().head, "div"),
                c = b.wrapper.getBoundingClientRect(),
                e = b.lineDiv.getBoundingClientRect();
            d.teTop = Math.max(0, Math.min(b.wrapper.clientHeight - 10, a.top + e.top - c.top));
            d.teLeft =
                Math.max(0, Math.min(b.wrapper.clientWidth - 10, a.left + e.left - c.left));
        }
        return d;
    };
    H.prototype.showSelection          = function (a) {
        var b = this.cm.display;
        aa(b.cursorDiv, a.cursors);
        aa(b.selectionDiv, a.selection);
        null != a.teTop && (
            this.wrapper.style.top = a.teTop + "px", this.wrapper.style.left = a.teLeft + "px"
        );
    };
    H.prototype.reset                  = function (a) {
        if (!this.contextMenuPending && !this.composing) {
            var b = this.cm;
            b.somethingSelected() ? (
                this.prevInput = "", a = b.getSelection(), this.textarea.value = a, b.state.focused && $b(this.textarea), B && 9 <= D &&
                (
                    this.hasSelection = a
                )
            ) : a || (
                this.prevInput = this.textarea.value = "", B && 9 <= D && (
                    this.hasSelection = null
                )
            );
        }
    };
    H.prototype.getField               = function () {return this.textarea;};
    H.prototype.supportsTouch          = function () {return !1;};
    H.prototype.focus                  = function () {
        if ("nocursor" != this.cm.options.readOnly && (
            !sb || ta() != this.textarea
        )) try {this.textarea.focus();} catch (a) {}
    };
    H.prototype.blur                   = function () {this.textarea.blur();};
    H.prototype.resetPosition          = function () {this.wrapper.style.top = this.wrapper.style.left = 0;};
    H.prototype.receivedFocus          =
        function () {this.slowPoll();};
    H.prototype.slowPoll               = function () {
        var a = this;
        this.pollingFast || this.polling.set(this.cm.options.pollInterval, function () {
            a.poll();
            a.cm.state.focused && a.slowPoll();
        });
    };
    H.prototype.fastPoll               = function () {
        function a() {
            c.poll() || b ? (
                c.pollingFast = !1, c.slowPoll()
            ) : (
                b = !0, c.polling.set(60, a)
            );
        }
        
        var b = !1,
            c = this;
        c.pollingFast = !0;
        c.polling.set(20, a);
    };
    H.prototype.poll                   = function () {
        var a = this,
            b = this.cm,
            c = this.textarea,
            d = this.prevInput;
        if (this.contextMenuPending || !b.state.focused || rh(c) && !d && !this.composing ||
            b.isReadOnly() || b.options.disableInput || b.state.keySeq) return !1;
        var e = c.value;
        if (e == d && !b.somethingSelected()) return !1;
        if (B && 9 <= D && this.hasSelection === e || ia && /[\uf700-\uf7ff]/.test(e)) return b.display.input.reset(), !1;
        if (b.doc.sel == b.display.selForContextMenu) {
            var f = e.charCodeAt(0);
            8203 != f || d || (
                d = "​"
            );
            if (8666 == f) return this.reset(), this.cm.execCommand("undo");
        }
        for (var g = 0, f = Math.min(d.length, e.length); g < f && d.charCodeAt(g) == e.charCodeAt(g);) ++g;
        Z(b, function () {
            Td(b, e.slice(g), d.length - g, null, a.composing ?
                "*compose" : null);
            1E3 < e.length || -1 < e.indexOf("\n") ? c.value = a.prevInput = "" : a.prevInput = e;
            a.composing && (
                a.composing.range.clear(), a.composing.range = b.markText(a.composing.start, b.getCursor("to"), {className: "CodeMirror-composing"})
            );
        });
        return !0;
    };
    H.prototype.ensurePolled           = function () {
        this.pollingFast && this.poll() && (
            this.pollingFast = !1
        );
    };
    H.prototype.onKeyPress             = function () {
        B && 9 <= D && (
            this.hasSelection = null
        );
        this.fastPoll();
    };
    H.prototype.onContextMenu          = function (a) {
        function b() {
            if (null != g.selectionStart) {
                var a               = e.somethingSelected(),
                    b = "​" + (
                        a ? g.value : ""
                    );
                g.value = "⇚";
                g.value = b;
                d.prevInput = a ? "" : "​";
                g.selectionStart = 1;
                g.selectionEnd = b.length;
                f.selForContextMenu = e.doc.sel;
            }
        }
        
        function c() {
            d.contextMenuPending    = !1;
            d.wrapper.style.cssText = m;
            g.style.cssText         = l;
            B && 9 > D && f.scrollbars.setScrollTop(f.scroller.scrollTop = k);
            if (null != g.selectionStart) {
                (
                    !B || B && 9 > D
                ) && b();
                var a                = 0,
                    c                = function () {
                        f.selForContextMenu == e.doc.sel && 0 == g.selectionStart && 0 < g.selectionEnd && "​" == d.prevInput ? J(e, sf)(e) : 10 > a++ ? f.detectingSelectAll = setTimeout(c, 500) : (
                            f.selForContextMenu =
                                null, f.input.reset()
                        );
                    };
                f.detectingSelectAll = setTimeout(c, 200);
            }
        }
        
        var d = this,
            e = d.cm,
            f = e.display,
            g = d.textarea,
            h = Qa(e, a),
            k = f.scroller.scrollTop;
        if (h && !la) {
            e.options.resetSelectionOnContextMenu && -1 == e.doc.sel.contains(h) && J(e, O)(e.doc, xa(h), sa);
            var l = g.style.cssText,
                m = d.wrapper.style.cssText;
            d.wrapper.style.cssText = "position: absolute";
            h = d.wrapper.getBoundingClientRect();
            g.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (
                a.clientY - h.top - 5
                ) + "px; left: " + (
                a.clientX - h.left - 5
                ) + "px;\n      z-index: 1000; background: " +
                (
                    B ? "rgba(255, 255, 255, .05)" : "transparent"
                ) + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity\x3d5);";
            var p;
            P && (
                p = window.scrollY
            );
            f.input.focus();
            P && window.scrollTo(null, p);
            f.input.reset();
            e.somethingSelected() || (
                g.value = d.prevInput = " "
            );
            d.contextMenuPending = !0;
            f.selForContextMenu  = e.doc.sel;
            clearTimeout(f.detectingSelectAll);
            B && 9 <= D && b();
            if (Qd) {
                xb(a);
                var n = function () {
                    ba(window, "mouseup", n);
                    setTimeout(c, 20);
                };
                v(window, "mouseup", n);
            } else setTimeout(c,
                50);
        }
    };
    H.prototype.readOnlyChanged        = function (a) {
        a || this.reset();
        this.textarea.disabled = "nocursor" == a;
    };
    H.prototype.setUneditable          = function () {};
    H.prototype.needsContentAttribute  = !1;
    (
        function (a) {
            function b(b, e, f, g) {
                a.defaults[b] = e;
                f && (
                    c[b] = g ? function (a, b, c) {c != pb && f(a, b, c);} : f
                );
            }
            
            var c          = a.optionHandlers;
            a.defineOption = b;
            a.Init         = pb;
            b("value", "", function (a, b) {return a.setValue(b);}, !0);
            b("mode", null, function (a, b) {
                a.doc.modeOption = b;
                Fd(a);
            }, !0);
            b("indentUnit", 2, Fd, !0);
            b("indentWithTabs", !1);
            b("smartIndent", !0);
            b("tabSize",
                4, function (a) {
                    Kb(a);
                    Db(a);
                    U(a);
                }, !0);
            b("lineSeparator", null, function (a, b) {
                if (a.doc.lineSep = b) {
                    var c = [],
                        g = a.doc.first;
                    a.doc.iter(function (a) {
                        for (var d = 0; ;) {
                            var h = a.text.indexOf(b, d);
                            if (-1 == h) break;
                            d = h + b.length;
                            c.push(q(g, h));
                        }
                        g++;
                    });
                    for (var h = c.length - 1; 0 <= h; h--) lb(a.doc, b, c[h], q(c[h].line, c[h].ch + b.length));
                }
            });
            b("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (a, b, c) {
                a.state.specialChars = new RegExp(b.source + (
                    b.test("\t") ? "" : "|\t"
                ), "g");
                c != pb && a.refresh();
            });
            b("specialCharPlaceholder", xg, function (a) {return a.refresh();}, !0);
            b("electricChars", !0);
            b("inputStyle", sb ? "contenteditable" : "textarea", function () {throw Error("inputStyle can not (yet) be changed in a running editor");}, !0);
            b("spellcheck", !1, function (a, b) {return a.getInputField().spellcheck = b;}, !0);
            b("rtlMoveVisually", !qh);
            b("wholeLineUpdateBefore", !0);
            b("theme", "default", function (a) {
                Tf(a);
                Wb(a);
            }, !0);
            b("keyMap", "default", function (a, b, c) {
                b = Fc(b);
                (
                    c = c != pb && Fc(c)
                ) && c.detach && c.detach(a, b);
                b.attach && b.attach(a,
                    c || null);
            });
            b("extraKeys", null);
            b("configureMouse", null);
            b("lineWrapping", !1, jh, !0);
            b("gutters", [], function (a) {
                Dd(a.options);
                Wb(a);
            }, !0);
            b("fixedGutter", !0, function (a, b) {
                a.display.gutters.style.left = b ? td(a.display) + "px" : "0";
                a.refresh();
            }, !0);
            b("coverGutterNextToScrollbar", !1, function (a) {return gb(a);}, !0);
            b("scrollbarStyle", "native", function (a) {
                We(a);
                gb(a);
                a.display.scrollbars.setScrollTop(a.doc.scrollTop);
                a.display.scrollbars.setScrollLeft(a.doc.scrollLeft);
            }, !0);
            b("lineNumbers", !1, function (a) {
                Dd(a.options);
                Wb(a);
            }, !0);
            b("firstLineNumber", 1, Wb, !0);
            b("lineNumberFormatter", function (a) {return a;}, Wb, !0);
            b("showCursorWhenSelecting", !1, Eb, !0);
            b("resetSelectionOnContextMenu", !0);
            b("lineWiseCopyCut", !0);
            b("pasteLinesPerSelection", !0);
            b("readOnly", !1, function (a, b) {
                "nocursor" == b && (
                    Fb(a), a.display.input.blur()
                );
                a.display.input.readOnlyChanged(b);
            });
            b("disableInput", !1, function (a, b) {b || a.display.input.reset();}, !0);
            b("dragDrop", !0, ih);
            b("allowDropFileTypes", null);
            b("cursorBlinkRate", 530);
            b("cursorScrollMargin", 0);
            b("cursorHeight", 1, Eb, !0);
            b("singleCursorHeightPerLine", !0, Eb, !0);
            b("workTime", 100);
            b("workDelay", 100);
            b("flattenSpans", !0, Kb, !0);
            b("addModeClass", !1, Kb, !0);
            b("pollInterval", 100);
            b("undoDepth", 200, function (a, b) {return a.doc.history.undoDepth = b;});
            b("historyEventDelay", 1250);
            b("viewportMargin", 10, function (a) {return a.refresh();}, !0);
            b("maxHighlightLength", 1E4, Kb, !0);
            b("moveInputWithCursor", !0, function (a, b) {b || a.display.input.resetPosition();});
            b("tabindex", null, function (a, b) {
                return a.display.input.getField().tabIndex =
                    b || "";
            });
            b("autofocus", null);
            b("direction", "ltr", function (a, b) {return a.doc.setDirection(b);}, !0);
        }
    )(E);
    (
        function (a) {
            var b = a.optionHandlers,
                c = a.helpers = {};
            a.prototype = {
                constructor       : a,
                focus             : function () {
                    window.focus();
                    this.display.input.focus();
                },
                setOption         : function (a, c) {
                    var f = this.options,
                        g = f[a];
                    if (f[a] != c || "mode" == a) f[a] = c, b.hasOwnProperty(a) && J(this, b[a])(this, c, g), F(this, "optionChange", this, a);
                },
                getOption         : function (a) {return this.options[a];},
                getDoc            : function () {return this.doc;},
                addKeyMap         : function (a, b) {
                    this.state.keyMaps[b ?
                        "push" : "unshift"](Fc(a));
                },
                removeKeyMap      : function (a) {for (var b = this.state.keyMaps, c = 0; c < b.length; ++c) if (b[c] == a || b[c].name == a) return b.splice(c, 1), !0;},
                addOverlay        : R(function (b, c) {
                    var f = b.token ? b : a.getMode(this.options, b);
                    if (f.startState) throw Error("Overlays may not be stateful.");
                    hg(this.state.overlays, {
                        mode    : f,
                        modeSpec: b,
                        opaque  : c && c.opaque,
                        priority: c && c.priority || 0
                    }, function (a) {return a.priority;});
                    this.state.modeGen++;
                    U(this);
                }),
                removeOverlay     : R(function (a) {
                    for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
                        var g =
                                b[c].modeSpec;
                        if (g == a || "string" == typeof a && g.name == a) {
                            b.splice(c, 1);
                            this.state.modeGen++;
                            U(this);
                            break;
                        }
                    }
                }),
                indentLine        : R(function (a, b, c) {
                    "string" != typeof b && "number" != typeof b && (
                        b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract"
                    );
                    tb(this.doc, a) && Xb(this, a, b, c);
                }),
                indentSelection   : R(function (a) {
                    for (var b = this.doc.sel.ranges, c = -1, g = 0; g < b.length; g++) {
                        var h = b[g];
                        if (h.empty()) h.head.line > c && (
                            Xb(this, h.head.line, a, !0), c = h.head.line, g == this.doc.sel.primIndex && fb(this)
                        ); else {
                            for (var k                                      = h.from(),
                                     h = h.to(), l = Math.max(c, k.line), c = Math.min(this.lastLine(), h.line - (
                                    h.ch ? 0 : 1
                                )) + 1, h = l; h < c; ++h) Xb(this, h, a);
                            h = this.doc.sel.ranges;
                            0 == k.ch && b.length == h.length && 0 < h[g].from().ch && Jd(this.doc, g, new A(k, h[g].to()), sa);
                        }
                    }
                }),
                getTokenAt        : function (a, b) {return ne(this, a, b);},
                getLineTokens     : function (a, b) {return ne(this, q(a), b, !0);},
                getTokenTypeAt    : function (a) {
                    a = w(this.doc, a);
                    var b = le(this, t(this.doc, a.line)),
                        c = 0,
                        g = (
                            b.length - 1
                        ) / 2;
                    a = a.ch;
                    if (0 == a) b = b[2]; else for (; ;) {
                        var h = c + g >> 1;
                        if ((
                            h ? b[2 * h - 1] : 0
                        ) >= a) g = h; else if (b[2 * h + 1] <
                            a) c = h + 1; else {
                            b = b[2 * h + 2];
                            break;
                        }
                    }
                    c = b ? b.indexOf("overlay ") : -1;
                    return 0 > c ? b : 0 == c ? null : b.slice(0, c - 1);
                },
                getModeAt         : function (b) {
                    var c = this.doc.mode;
                    return c.innerMode ? a.innerMode(c, this.getTokenAt(b).state).mode : c;
                },
                getHelper         : function (a, b) {return this.getHelpers(a, b)[0];},
                getHelpers        : function (a, b) {
                    var f = [];
                    if (!c.hasOwnProperty(b)) return f;
                    var g = c[b],
                        h = this.getModeAt(a);
                    if ("string" == typeof h[b]) g[h[b]] && f.push(g[h[b]]); else if (h[b]) for (var k = 0; k < h[b].length; k++) {
                        var l = g[h[b][k]];
                        l && f.push(l);
                    } else h.helperType &&
                    g[h.helperType] ? f.push(g[h.helperType]) : g[h.name] && f.push(g[h.name]);
                    for (k = 0; k < g._global.length; k++) l = g._global[k], l.pred(h, this) && -1 == L(f, l.val) && f.push(l.val);
                    return f;
                },
                getStateAfter     : function (a, b) {
                    var c = this.doc;
                    a     = Math.max(c.first, Math.min(null == a ? c.first + c.size - 1 : a, c.first + c.size - 1));
                    return yb(this, a + 1, b).state;
                },
                cursorCoords      : function (a, b) {
                    var c;
                    c = this.doc.sel.primary();
                    c = null == a ? c.head : "object" == typeof a ? w(this.doc, a) : a ? c.from() : c.to();
                    return ka(this, c, b || "page");
                },
                charCoords        : function (a, b) {
                    return pd(this,
                        w(this.doc, a), b || "page");
                },
                coordsChar        : function (a, b) {
                    a = He(this, a, b || "page");
                    return rd(this, a.left, a.top);
                },
                lineAtHeight      : function (a, b) {
                    a = He(this, {
                        top : a,
                        left: 0
                    }, b || "page").top;
                    return Ia(this.doc, a + this.display.viewOffset);
                },
                heightAtLine      : function (a, b, c) {
                    var g = !1;
                    if ("number" == typeof a) {
                        var h = this.doc.first + this.doc.size - 1;
                        a < this.doc.first ? a = this.doc.first : a > h && (
                            a = h, g = !0
                        );
                        a = t(this.doc, a);
                    }
                    return sc(this, a, {
                        top : 0,
                        left: 0
                    }, b || "page", c || g).top + (
                        g ? this.doc.height - pa(a) : 0
                    );
                },
                defaultTextHeight : function () {return Oa(this.display);},
                defaultCharWidth  : function () {return Cb(this.display);},
                getViewport       : function () {
                    return {
                        from: this.display.viewFrom,
                        to  : this.display.viewTo
                    };
                },
                addWidget         : function (a, b, c, g, h) {
                    var k = this.display;
                    a = ka(this, w(this.doc, a));
                    var l = a.bottom,
                        m = a.left;
                    b.style.position = "absolute";
                    b.setAttribute("cm-ignore-events", "true");
                    this.display.input.setUneditable(b);
                    k.sizer.appendChild(b);
                    if ("over" == g) l = a.top; else if ("above" == g || "near" == g) {
                        var p = Math.max(k.wrapper.clientHeight, this.doc.height),
                            n = Math.max(k.sizer.clientWidth, k.lineSpace.clientWidth);
                        (
                            "above" == g || a.bottom + b.offsetHeight > p
                        ) && a.top > b.offsetHeight ? l = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= p && (
                            l = a.bottom
                        );
                        m + b.offsetWidth > n && (
                            m = n - b.offsetWidth
                        );
                    }
                    b.style.top  = l + "px";
                    b.style.left = b.style.right = "";
                    "right" == h ? (
                        m = k.sizer.clientWidth - b.offsetWidth, b.style.right = "0px"
                    ) : (
                        "left" == h ? m = 0 : "middle" == h && (
                            m = (
                                k.sizer.clientWidth - b.offsetWidth
                            ) / 2
                        ), b.style.left = m + "px"
                    );
                    c && (
                        a = zd(this, {
                            left  : m,
                            top   : l,
                            right : m + b.offsetWidth,
                            bottom: l + b.offsetHeight
                        }), null != a.scrollTop && Hb(this, a.scrollTop), null != a.scrollLeft &&
                        Sa(this, a.scrollLeft)
                    );
                },
                triggerOnKeyDown  : R(Nf),
                triggerOnKeyPress : R(Pf),
                triggerOnKeyUp    : Of,
                triggerOnMouseDown: R(Qf),
                execCommand       : function (a) {if (Sb.hasOwnProperty(a)) return Sb[a].call(null, this);},
                triggerElectric   : R(function (a) {Yf(this, a);}),
                findPosH          : function (a, b, c, g) {
                    var h = 1;
                    0 > b && (
                        h = -1, b = -b
                    );
                    a = w(this.doc, a);
                    for (var k = 0; k < b && (
                        a = Vd(this.doc, a, h, c, g), !a.hitSide
                    ); ++k) ;
                    return a;
                },
                moveH             : R(function (a, b) {
                    var c = this;
                    this.extendSelectionsBy(function (g) {
                        return c.display.shift || c.doc.extend || g.empty() ? Vd(c.doc, g.head,
                            a, b, c.options.rtlMoveVisually) : 0 > a ? g.from() : g.to();
                    }, ac);
                }),
                deleteH           : R(function (a, b) {
                    var c = this.doc;
                    this.doc.sel.somethingSelected() ? c.replaceSelection("", null, "+delete") : ob(this, function (g) {
                        var h = Vd(c, g.head, a, b, !1);
                        return 0 > a ? {
                            from: h,
                            to  : g.head
                        } : {
                            from: g.head,
                            to  : h
                        };
                    });
                }),
                findPosV          : function (a, b, c, g) {
                    var h = 1;
                    0 > b && (
                        h = -1, b = -b
                    );
                    var k = w(this.doc, a);
                    for (a = 0; a < b && (
                        k = ka(this, k, "div"), null == g ? g = k.left : k.left = g, k = cg(this, k, h, c), !k.hitSide
                    ); ++a) ;
                    return k;
                },
                moveV             : R(function (a, b) {
                    var c = this,
                        g = this.doc,
                        h = [],
                        k = !this.display.shift &&
                            !g.extend && g.sel.somethingSelected();
                    g.extendSelectionsBy(function (l) {
                        if (k) return 0 > a ? l.from() : l.to();
                        var p = ka(c, l.head, "div");
                        null != l.goalColumn && (
                            p.left = l.goalColumn
                        );
                        h.push(p.left);
                        var n = cg(c, p, a, b);
                        "page" == b && l == g.sel.primary() && vc(c, pd(c, n, "div").top - p.top);
                        return n;
                    }, ac);
                    if (h.length) for (var l = 0; l < g.sel.ranges.length; l++) g.sel.ranges[l].goalColumn = h[l];
                }),
                findWordAt        : function (a) {
                    var b = t(this.doc, a.line).text,
                        c = a.ch,
                        g = a.ch;
                    if (b) {
                        var h = this.getHelper(a, "wordChars");
                        "before" != a.sticky && g != b.length ||
                        !c ? ++g : --c;
                        for (var k = b.charAt(c), k = hc(k, h) ? function (a) {return hc(a, h);} : /\s/.test(k) ? function (a) {return /\s/.test(a);} : function (a) {return !/\s/.test(a) && !hc(a);}; 0 < c && k(b.charAt(c - 1));) --c;
                        for (; g < b.length && k(b.charAt(g));) ++g;
                    }
                    return new A(q(a.line, c), q(a.line, g));
                },
                toggleOverwrite   : function (a) {
                    if (null == a || a != this.state.overwrite) (
                        this.state.overwrite = !this.state.overwrite
                    ) ? Fa(this.display.cursorDiv, "CodeMirror-overwrite") : Ra(this.display.cursorDiv, "CodeMirror-overwrite"), F(this, "overwriteToggle", this, this.state.overwrite);
                },
                hasFocus          : function () {return this.display.input.getField() == ta();},
                isReadOnly        : function () {
                    return !(
                        !this.options.readOnly && !this.doc.cantEdit
                    );
                },
                scrollTo          : R(function (a, b) {Gb(this, a, b);}),
                getScrollInfo     : function () {
                    var a = this.display.scroller;
                    return {
                        left        : a.scrollLeft,
                        top         : a.scrollTop,
                        height      : a.scrollHeight - ra(this) - this.display.barHeight,
                        width       : a.scrollWidth - ra(this) - this.display.barWidth,
                        clientHeight: kd(this),
                        clientWidth : La(this)
                    };
                },
                scrollIntoView    : R(function (a, b) {
                    null == a ? (
                        a = {
                            from: this.doc.sel.primary().head,
                            to  : null
                        },
                        null == b && (
                            b = this.options.cursorScrollMargin
                        )
                    ) : "number" == typeof a ? a = {
                        from: q(a, 0),
                        to  : null
                    } : null == a.from && (
                        a = {
                            from: a,
                            to  : null
                        }
                    );
                    a.to || (
                        a.to = a.from
                    );
                    a.margin = b || 0;
                    if (null != a.from.line) {
                        var c = a;
                        wc(this);
                        this.curOp.scrollToPos = c;
                    } else Te(this, a.from, a.to, a.margin);
                }),
                setSize           : R(function (a, b) {
                    var c = this,
                        g = function (a) {return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a;};
                    null != a && (
                        this.display.wrapper.style.width = g(a)
                    );
                    null != b && (
                        this.display.wrapper.style.height = g(b)
                    );
                    this.options.lineWrapping && Ee(this);
                    var h = this.display.viewFrom;
                    this.doc.iter(h, this.display.viewTo, function (a) {
                        if (a.widgets) for (var b = 0; b < a.widgets.length; b++) if (a.widgets[b].noHScroll) {
                            Ba(c, h, "widget");
                            break;
                        }
                        ++h;
                    });
                    this.curOp.forceUpdate = !0;
                    F(this, "refresh", this);
                }),
                operation         : function (a) {return Z(this, a);},
                startOperation    : function () {return Ta(this);},
                endOperation      : function () {return Ua(this);},
                refresh           : R(function () {
                    var a = this.display.cachedTextHeight;
                    U(this);
                    this.curOp.forceUpdate = !0;
                    Db(this);
                    Gb(this, this.doc.scrollLeft, this.doc.scrollTop);
                    yd(this);
                    (
                        null == a || .5 < Math.abs(a - Oa(this.display))
                    ) && ud(this);
                    F(this, "refresh", this);
                }),
                swapDoc           : R(function (a) {
                    var b = this.doc;
                    b.cm  = null;
                    ff(this, a);
                    Db(this);
                    this.display.input.reset();
                    Gb(this, a.scrollLeft, a.scrollTop);
                    this.curOp.forceScroll = !0;
                    N(this, "swapDoc", this, b);
                    return b;
                }),
                getInputField     : function () {return this.display.input.getField();},
                getWrapperElement : function () {return this.display.wrapper;},
                getScrollerElement: function () {return this.display.scroller;},
                getGutterElement  : function () {return this.display.gutters;}
            };
            ab(a);
            a.registerHelper       = function (b, e, f) {
                c.hasOwnProperty(b) || (
                    c[b] = a[b] = {_global: []}
                );
                c[b][e] = f;
            };
            a.registerGlobalHelper = function (b, e, f, g) {
                a.registerHelper(b, e, g);
                c[b]._global.push({
                    pred: f,
                    val : g
                });
            };
        }
    )(E);
    var th = "iter insert remove copy getEditor constructor".split(" "),
        ec;
    for (ec in V.prototype) V.prototype.hasOwnProperty(ec) && 0 > L(th, ec) && (
        E.prototype[ec] = function (a) {return function () {return a.apply(this.doc, arguments);};}(V.prototype[ec])
    );
    ab(V);
    E.inputStyles = {
        textarea       : H,
        contenteditable: y
    };
    E.defineMode  =
        function (a) {
            E.defaults.mode || "null" == a || (
                E.defaults.mode = a
            );
            pg.apply(this, arguments);
        };
    E.defineMIME  = function (a, b) {bb[a] = b;};
    E.defineMode("null", function () {return {token: function (a) {return a.skipToEnd();}};});
    E.defineMIME("text/plain", "null");
    E.defineExtension    = function (a, b) {E.prototype[a] = b;};
    E.defineDocExtension = function (a, b) {V.prototype[a] = b;};
    E.fromTextArea       = function (a, b) {
        function c() {a.value = k.getValue();}
        
        b       = b ? Ga(b) : {};
        b.value = a.value;
        !b.tabindex && a.tabIndex && (
            b.tabindex = a.tabIndex
        );
        !b.placeholder && a.placeholder &&
        (
            b.placeholder = a.placeholder
        );
        if (null == b.autofocus) {
            var d       = ta();
            b.autofocus = d == a || null != a.getAttribute("autofocus") && d == document.body;
        }
        var e;
        if (a.form && (
            v(a.form, "submit", c), !b.leaveSubmitMethodAlone
        )) {
            var f = a.form;
            e     = f.submit;
            try {
                var g = f.submit = function () {
                    c();
                    f.submit = e;
                    f.submit();
                    f.submit = g;
                };
            } catch (h) {}
        }
        b.finishInit    = function (b) {
            b.save        = c;
            b.getTextArea = function () {return a;};
            b.toTextArea  = function () {
                b.toTextArea = isNaN;
                c();
                a.parentNode.removeChild(b.getWrapperElement());
                a.style.display = "";
                a.form && (
                    ba(a.form,
                        "submit", c), "function" == typeof a.form.submit && (
                        a.form.submit = e
                    )
                );
            };
        };
        a.style.display = "none";
        var k           = E(function (b) {return a.parentNode.insertBefore(b, a.nextSibling);}, b);
        return k;
    };
    (
        function (a) {
            a.off               = ba;
            a.on                = v;
            a.wheelEventPixels  = Jg;
            a.Doc               = V;
            a.splitLines        = Ud;
            a.countColumn       = fa;
            a.findColumn        = Oc;
            a.isWordChar        = Qc;
            a.Pass              = Hc;
            a.signal            = F;
            a.Line              = hb;
            a.changeEnd         = Ca;
            a.scrollbarModel    = Xe;
            a.Pos               = q;
            a.cmpPos            = x;
            a.modes             = cd;
            a.mimeModes         = bb;
            a.resolveMode       = nc;
            a.getMode           = dd;
            a.modeExtensions    = cb;
            a.extendMode        = qg;
            a.copyState         = Ka;
            a.startState        =
                ie;
            a.innerMode         = ed;
            a.commands          = Sb;
            a.keyMap            = Rb;
            a.keyName           = If;
            a.isModifierKey     = Ff;
            a.lookupKey         = nb;
            a.normalizeKeyMap   = Vg;
            a.StringStream      = G;
            a.SharedTextMarker  = Qb;
            a.TextMarker        = Da;
            a.LineWidget        = Pb;
            a.e_preventDefault  = T;
            a.e_stopPropagation = ge;
            a.e_stop            = xb;
            a.addClass          = Fa;
            a.contains          = ya;
            a.rmClass           = Ra;
            a.keyNames          = Ea;
        }
    )(E);
    E.version = "5.39.0";
    return E;
});