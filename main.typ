// Bundle root: one `typst compile` turns this project into the whole website
// (all HTML pages, the CV PDF and every asset). See build.py / README.md.
#import "/config.typ": site, theme
#import "/lib/util.typ": *
#import "/lib/data.typ": load-all
#import "/lib/icons.typ": icon-css
#import "/lib/shell.typ": shell
#import "/lib/pages.typ": *

#let data = load-all()
#let base-of(path) = "../" * (path.split("/").len() - 1)

#let doc(path, title, current, desc: none, body) = document(path, title: title)[
  #shell(current: current, base: base-of(path), title: title, desc: desc, data: data, body)
]

// ── pages ───────────────────────────────────────────────────────────
#doc("index.html", none, "home", home(data, ""))
#doc("cv.html", "CV", "cv", cv-page(""))
#doc("publications.html", "Publications", "publications", publications-page(data, ""))
#doc("projects.html", "Projects", "projects", projects-page(data, ""))
#doc("blog.html", site.blog-label, "blog", blog-page(data, ""))

// ── one page per entry file in content/ ─────────────────────────────
#for e in data.values().flatten() {
  let body = include ("/content/" + e.kind + "/" + e.slug + ".typ")
  doc(e.path, e.title, e.kind, desc: e.at("subtitle", default: e.at("summary", default: none)), entry-page(e, body, "../"))
}

// ── stylesheet (colors come from config.typ), script, fonts, photo ──
#let css = ":root{--main:" + theme.main.to-hex() + ";--accent:" + theme.accent.to-hex() + ";--contrast:" + theme.contrast.to-hex() + "}\n" + read("/lib/style.css") + "\n" + icon-css
#asset("assets/site.css", css)
#asset("assets/site.js", read("/lib/site.js"))
#for f in ("Inter", "Newsreader", "Newsreader-Italic", "JetBrainsMono") {
  asset("assets/fonts/" + f + ".woff2", read("/assets/fonts/" + f + ".woff2", encoding: none))
}
#asset(site.photo, read("/" + site.photo, encoding: none))

// ── files that entries offer as downloads (copied automatically) ────
#let files = data.values().flatten().map(e => e.at("downloads", default: ()).map(d => d.file)).flatten().dedup()
#for f in files { asset("assets/files/" + f, read("/assets/files/" + f, encoding: none)) }

// ── the CV as PDF, built from cv/cv.typ ─────────────────────────────
#document("assets/cv.pdf", title: site.name + " – CV", include "/cv/cv.typ")
