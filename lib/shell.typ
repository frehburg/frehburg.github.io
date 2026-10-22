// The page frame: <head>, header with navigation, footer, dialogs.
#import "/config.typ": site, theme
#import "/lib/util.typ": *
#import "/lib/icons.typ": icon
#import "/lib/data.typ": pin-count, is-pinned

#let nav-items = (
  ("About", "index.html", "home"),
  ("CV", "cv.html", "cv"),
  ("Publications", "publications.html", "publications"),
  ("Projects", "projects.html", "projects"),
  (site.blog-label, "blog.html", "blog"),
)

// Presets of the Theme dialog: (name, main, accent, contrast)
#let presets = (
  ("Academic Blue", "#ffffff", "#2563eb", "#0f172a"),
  ("ILLC Amsterdam Cyan", "#ffffff", "#0e7490", "#0f172a"),
  ("Warm Solarized Paper", "#fdf6e3", "#b45309", "#3b3326"),
  ("Emerald Logic", "#ffffff", "#047857", "#0f172a"),
  ("Monochrome Minimal", "#ffffff", "#334155", "#0f172a"),
)

// Applies a theme chosen in the Theme dialog before the page paints.
#let early-js = "try{var t=JSON.parse(localStorage.getItem('site-theme')||'null');if(t){var s=document.documentElement.style;s.setProperty('--main',t.main);s.setProperty('--accent',t.accent);s.setProperty('--contrast',t.contrast)}}catch(e){}"

#let dlg-head(id, ic, title) = h("div", class: "dlg-head")[
  #h("h2", id: id)[#icon(ic)#title]
  #h("button", class: "icon-btn", value: "cancel", aria-label: "Close")[#icon("x")]
]

#let theme-dialog() = h("dialog", id: "theme-dialog", class: "dlg", aria-labelledby: "theme-title", data-main: theme.main.to-hex(), data-accent: theme.accent.to-hex(), data-contrast: theme.contrast.to-hex())[
  #h("form", method: "dialog", class: "dlg-box")[
    #dlg-head("theme-title", "palette", "Central color scheme & Typst theme")
    #h("p", class: "dlg-lead")[Try a palette, then paste the snippet over the #raw("theme") block in #raw("config.typ"). The preview is stored in this browser only.]
    #h("h3", class: "lbl")[Palette presets]
    #h("div", class: "presets")[
      #for (name, m, a, c) in presets {
        h("button", type: "button", class: "preset", data-preset: m + "," + a + "," + c)[#name#h("span", class: "sw", style: "background:" + a)]
      }
    ]
    #h("div", class: "pickers")[
      #for (key, lbl) in (("main", "Main (background)"), ("accent", "Accent (interactive)"), ("contrast", "Contrast (text/ink)")) {
        h("label", class: "pick")[
          #h("span", class: "pk-l")[#lbl]
          #h("span", class: "pk-f")[
            #h("input", type: "color", data-key: key, aria-label: lbl)
            #h("input", type: "text", class: "hex", data-key: key, maxlength: "7", spellcheck: "false", aria-label: lbl + " as hex code")
          ]
        ]
      }
    ]
    #h("div", class: "lbl-row")[
      #h("h3", class: "lbl")[Live Typst theme configuration]
      #h("button", type: "button", class: "link-btn", data-copy: "theme-code")[#icon("copy")Copy Typst]
    ]
    #h("pre", class: "code", id: "theme-code")
    #h("div", class: "dlg-foot")[
      #h("button", type: "button", class: "link-btn", data-reset: "")[#icon("reset")Reset to default]
      #h("span", class: "grow")
      #h("button", class: "btn", value: "cancel")[Cancel]
      #h("button", type: "button", class: "btn btn-primary", data-apply: "")[Apply theme]
    ]
  ]
]

#let pins-dialog(data) = h("dialog", id: "pins-dialog", class: "dlg", aria-labelledby: "pins-title")[
  #h("form", method: "dialog", class: "dlg-box")[
    #dlg-head("pins-title", "pin", "Frontpage highlights")
    #h("p", class: "dlg-lead")[For each section the front page shows the entries marked #raw("highlight: true") in their file. Without a pin, the latest entry is shown. To change a pin, edit that one line in the entry file and rebuild.]
    #for (k, name) in (("publications", "Publications"), ("projects", "Projects"), ("blog", site.blog-label)) {
      h("section", class: "pin-sec")[
        #h("h3", class: "lbl")[#name]
        #h("ul", class: "pin-list")[
          #for e in data.at(k) {
            h("li", class: if is-pinned(e) { "on" } else { "" })[
              #h("span", class: "pl-t")[#e.title]
              #h("span", class: "pl-s")[#if is-pinned(e) [Pinned] else if e.slug == data.at(k).first().slug and not data.at(k).any(is-pinned) [Latest]]
            ]
          }
        ]
      ]
    }
    #h("div", class: "dlg-foot")[#h("span", class: "grow")#h("button", class: "btn btn-dark", value: "cancel")[Close]]
  ]
]

#let site-header(current, base, data) = h("header", class: "site-header")[
  #h("div", class: "wrap bar")[
    #h("div", class: "left")[
      #h("a", class: "brand", href: base + "index.html")[#site.name]
      #h("span", class: "sep", "/")
      #h("span", class: "role")[#site.role]
    ]
    #h("nav", class: "nav", aria-label: "Main")[
      #for (lbl, path, key) in nav-items {
        h("a", href: base + path, ..(if key == current { (aria-current: "page") } else { (:) }))[#lbl]
      }
    ]
    #h("div", class: "tools")[
      #if site.owner-tools {
        h("button", class: "btn", type: "button", data-open: "theme-dialog", aria-label: "Theme")[#h("span", class: "dot")#h("span", class: "btn-label")[#icon("palette")Theme]]
        h("button", class: "btn", type: "button", data-open: "pins-dialog", aria-label: "Pins")[#icon("pin")#h("span", class: "btn-label")[Pins]#h("span", class: "count")[#str(pin-count(data))]]
      }
      #h("a", class: "btn btn-dark", href: base + "assets/cv.pdf", download: "")[#icon("download")#("CV [PDF]")]
    ]
  ]
]

#let site-footer() = h("footer", class: "site-footer")[
  #h("div", class: "wrap foot")[
    #h("p")[#("© " + str(datetime.today().year()) + " " + site.name + " · " + site.affiliation + " · Built with Typst")]
    #h("nav", aria-label: "Footer")[
      #for l in site.links.filter(l => "short" in l) { h("a", href: l.href, ..ext-attrs(l.href))[#l.short] }
    ]
  ]
]

// Wraps the content of one page into a complete HTML document.
#let shell(current: "", base: "", title: none, desc: none, data: none, body) = {
  let full = if title == none { site.name } else { title + " · " + site.name }
  h("html", lang: "en")[
    #h("head")[
      #h("meta", charset: "utf-8")
      #h("meta", name: "viewport", content: "width=device-width, initial-scale=1")
      #h("title")[#full]
      #h("meta", name: "description", content: if desc == none { site.description } else { desc })
      #h("meta", name: "theme-color", content: theme.main.to-hex())
      #h("link", rel: "stylesheet", href: base + "assets/site.css")
      #h("script", early-js)
    ]
    #h("body")[
      #h("a", class: "skip", href: "#main")[Skip to content]
      #site-header(current, base, data)
      #h("main", class: "wrap", id: "main")[#body]
      #site-footer()
      #if site.owner-tools { theme-dialog() }
      #if site.owner-tools { pins-dialog(data) }
      #h("script", src: base + "assets/site.js", defer: "")
    ]
  ]
}
