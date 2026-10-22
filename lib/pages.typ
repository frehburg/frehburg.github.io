// Page bodies: front page, CV, publications, projects, notes, and entry pages.
#import "/config.typ": site
#import "/lib/util.typ": *
#import "/lib/icons.typ": icon
#import "/lib/data.typ": featured, is-pinned
#import "/cv/data.typ" as cvd

// ── small building blocks ───────────────────────────────────────────
#let btn(href, lbl, ic: none, cls: "act", dl: false) = h("a", class: cls, href: href, ..ext-attrs(href), ..(if dl { (download: "") } else { (:) }))[#if ic != none { icon(ic) }#lbl]

#let eyebrow(ic, lbl) = h("div", class: "eyebrow")[#if ic != none { icon(ic) }#lbl]

#let page-head(ic, kicker, title, lead, aside: none, below: none) = h("section", class: "card page-head")[
  #h("div", class: "ph-row")[
    #h("div", class: "ph-main")[
      #eyebrow(ic, kicker)
      #h("h1")[#title]
      #h("p")[#lead]
    ]
    #if aside != none { h("div", class: "ph-aside")[#aside] }
  ]
  #if below != none { h("div", class: "ph-below")[#below] }
]

#let tag-list(items, cls: "tags") = if items.len() > 0 { h("ul", class: cls)[#for t in items { h("li")[#t] }] }

#let type-tone = (Journal: "journal", Conference: "conf", Workshop: "conf", Poster: "poster", Preprint: "preprint")

// The small colored label on cards: venue + year, project domain, or note category.
#let badge(e) = if e.kind == "publications" {
  let v = e.at("venue-short", default: e.at("venue", default: e.at("type", default: "Publication")))
  (text: v + " · " + str(year-of(e.date)), tone: type-tone.at(e.at("type", default: "Journal"), default: "journal"))
} else if e.kind == "projects" {
  (text: e.at("domain", default: "Project"), tone: "accent")
} else {
  (text: e.at("category", default: "Note"), tone: "amber")
}
#let badge-el(e) = { let b = badge(e); h("span", class: "badge tone-" + b.tone)[#b.text] }
#let pinned-el(e) = if is-pinned(e) { h("span", class: "pinned")[#icon("pin")Pinned] }

#let when(e) = if e.kind == "projects" { fmt-range(e.date, e.at("end", default: none)) } else { fmt-date(e.date) }

// ── publications: authors, citations ────────────────────────────────
#let norm-author(a) = if type(a) == str { (name: a, inst: ()) } else {
  let i = a.at("inst", default: ())
  (name: a.name, inst: if type(i) == str { (i,) } else { i })
}
#let authors-of(e) = e.at("authors", default: ()).map(norm-author)
#let insts-of(e) = authors-of(e).map(a => a.inst).flatten().dedup()

#let authors-line(e, marks: false, max: none) = {
  let all = authors-of(e)
  let insts = insts-of(e)
  let shown = if max != none and all.len() > max { all.slice(0, max) } else { all }
  let parts = shown.map(a => {
    let nm = if a.name in site.me { h("strong", class: "me")[#a.name] } else { a.name }
    let mk = if marks and a.inst.len() > 0 { h("sup")[#a.inst.map(x => str(insts.position(y => y == x) + 1)).join(",")] } else { none }
    [#nm#mk]
  })
  [#parts.join([, ])#if max != none and all.len() > max [, et al.]]
}

// BibTeX is generated when the author list is complete (no "…"), or taken from `bibtex:`.
#let bibtex(e) = {
  if "bibtex" in e { return e.bibtex }
  let names = e.at("authors", default: ()).map(a => if type(a) == str { a } else { a.name })
  if names.len() == 0 or "…" in names or not ("venue" in e) { return none }
  let conv(n) = { let p = n.split(" "); p.slice(0, -1).join(" ") + ", " + p.last() }
  let sur = conv(names.first()).split(",").first()
  let word = e.title.split(" ").first().replace(regex("[^A-Za-z0-9]"), "")
  let key = lower(sur.replace(" ", "")) + str(year-of(e.date)) + lower(word)
  let kind = e.at("type", default: "Journal")
  let (entry, field) = if kind == "Journal" { ("article", "journal") } else if kind == "Conference" { ("inproceedings", "booktitle") } else { ("misc", "howpublished") }
  let lines = ("title = {" + e.title + (if "subtitle" in e { ": " + e.subtitle } else { "" }) + "}", "author = {" + names.map(conv).join(" and ") + "}", field + " = {" + e.venue + "}", "year = {" + str(year-of(e.date)) + "}")
  if "doi" in e { lines.push("doi = {" + e.doi + "}") }
  "@" + entry + "{" + key + ",\n  " + lines.join(",\n  ") + "\n}"
}

#let search-text(e) = lower((e.title, e.at("subtitle", default: ""), e.at("venue", default: ""), e.at("doi", default: ""), ..authors-of(e).map(a => a.name), ..e.at("topics", default: ())).join(" "))

#let toggle(id, lbl) = h("button", class: "act", type: "button", data-toggle: id, aria-expanded: "false", aria-controls: id)[#lbl#icon("chevron")]

// DOI, extra links, downloads (+ toggles for abstract / BibTeX on cards).
#let pub-actions(e, base, toggles: true) = {
  let items = ()
  if "doi" in e { items.push(btn("https://doi.org/" + e.doi, "DOI: " + e.doi, ic: "link", cls: "act act-doi")) }
  if toggles and "abstract" in e { items.push(toggle("abs-" + e.slug, "Abstract")) }
  if bibtex(e) != none { items.push(toggle("bib-" + e.slug, "BibTeX")) }
  for l in e.at("links", default: ()) { items.push(btn(url(base, l.href), l.label, ic: "ext")) }
  for d in e.at("downloads", default: ()) { items.push(btn(base + "assets/files/" + d.file, d.label, ic: "download", dl: true)) }
  items.join()
}
#let bib-panel(e) = if bibtex(e) != none {
  h("div", class: "panel", id: "bib-" + e.slug, data-panel: "")[
    #raw(bibtex(e), block: true)
    #h("button", class: "link-btn", type: "button", data-copy-text: "bib-" + e.slug)[#icon("copy")Copy BibTeX]
  ]
}

#let pub-card(e, base) = {
  let insts = insts-of(e)
  h("article", class: "card pcard", data-year: str(year-of(e.date)), data-topics: e.at("topics", default: ()).join("|"), data-text: search-text(e))[
    #h("div", class: "pc-top")[
      #badge-el(e)
      #h("span", class: "date")[#fmt-date(e.date)]
      #pinned-el(e)
    ]
    #h("h3", class: "pc-title")[#h("a", href: base + e.path)[#e.title]]
    #if "subtitle" in e { h("p", class: "pc-sub")[#e.subtitle] }
    #if "venue" in e { h("p", class: "pc-venue")[#e.venue#if "ref" in e [ #e.ref]] }
    #h("p", class: "pc-authors")[#authors-line(e)#if insts.len() > 0 { h("span", class: "insts")[#("[" + insts.join(" · ") + "]")] }]
    #h("div", class: "pc-actions")[#pub-actions(e, base)]
    #if "abstract" in e { h("div", class: "panel", id: "abs-" + e.slug, data-panel: "")[#e.abstract] }
    #bib-panel(e)
  ]
}

#let project-card(e, base) = h("article", class: "card jcard")[
  #h("div", class: "pc-top")[
    #badge-el(e)
    #h("span", class: "date")[#when(e)]
    #pinned-el(e)
  ]
  #h("h3", class: "pc-title")[#h("a", href: base + e.path)[#e.title]]
  #if "subtitle" in e { h("p", class: "pc-sub")[#e.subtitle] }
  #if "affiliation" in e { h("p", class: "pc-venue")[#h("span", class: "k")[Affiliation: ]#e.affiliation] }
  #if "summary" in e { h("p", class: "pc-sum")[#e.summary] }
  #tag-list(e.at("tags", default: ()))
  #h("div", class: "pc-foot")[
    #h("a", class: "act", href: base + e.path)[#icon("file")Details]
    #for l in e.at("links", default: ()) { btn(url(base, l.href), l.label, ic: "ext") }
  ]
]

#let note-card(e, base) = h("article", class: "card ncard")[
  #h("div", class: "pc-top")[
    #badge-el(e)
    #h("span", class: "date")[#icon("calendar")#fmt-date(e.date)]
    #pinned-el(e)
  ]
  #h("h3", class: "nc-title")[#h("a", href: base + e.path)[#e.title]]
  #if "subtitle" in e { h("p", class: "pc-sub")[#e.subtitle] }
  #if "summary" in e { h("p", class: "nc-sum")[#e.summary] }
  #h("div", class: "pc-foot")[
    #h("a", class: "act", href: base + e.path)[Read note]
    #for d in e.at("downloads", default: ()) { btn(base + "assets/files/" + d.file, d.label, ic: "download", dl: true) }
  ]
]

// ── front page ──────────────────────────────────────────────────────
#let chip-link(l) = h("a", class: "chip-link", href: l.href, ..ext-attrs(l.href))[#if l.icon == "orcid" { h("span", class: "orcid")[iD] } else { icon(l.icon) }#l.label]

#let feature-card(e, pinned, base) = {
  let sum = if "summary" in e { e.summary } else if "subtitle" in e { e.subtitle } else { none }
  let kind-name = (publications: "Publication", projects: "Project", blog: "Note").at(e.kind)
  h("article", class: "card fcard")[
    #h("div", class: "pc-top")[
      #badge-el(e)
      #if pinned { h("span", class: "pin-i", title: "Pinned")[#icon("pin")] } else { h("span", class: "latest")[Latest] }
    ]
    #h("h3", class: "fc-title")[#h("a", href: base + e.path)[#e.title]]
    #if sum != none { h("p", class: "fc-sum")[#sum] }
    #if e.kind == "publications" { h("p", class: "fc-auth")[#authors-line(e, max: 3)] }
    #if e.kind == "projects" { tag-list(e.at("tags", default: ()), cls: "tags sm") }
    #h("div", class: "fc-foot")[
      #if e.kind == "publications" and "doi" in e { btn("https://doi.org/" + e.doi, "DOI: " + e.doi, ic: "link") } else { h("a", class: "act", href: base + e.path)[#(if e.kind == "blog" { "Read note" } else { "View details" })] }
      #h("span", class: "kind")[#kind-name]
    ]
  ]
}

#let home(data, base) = {
  let stat(s) = h("div", class: "stat" + if s.at("hot", default: false) { " hot" } else { "" })[
    #h("div", class: "sv")[#if s.value == auto { str(data.publications.len()) } else { s.value }]
    #h("div", class: "sl")[#s.label]
  ]
  [
    #h("div", class: "home")[
      #h("aside", class: "card profile")[
        #h("div", class: "portrait")[
          #h("img", src: base + site.photo, alt: site.photo-alt, width: "331", height: "288")
          #h("div", class: "badge-live")[
            #h("span", class: "bl-l")[#h("i", class: "dot pulse")#site.badge.label]
            #h("span", class: "bl-r")[#site.badge.range]
          ]
        ]
        #h("dl", class: "facts")[#for (k, v) in site.facts { h("div")[#h("dt")[#k:]#h("dd")[#v]] }]
        #h("hr")
        #h("div", class: "chip-links")[#for l in site.links { chip-link(l) }]
      ]
      #h("div", class: "home-main")[
        #h("section", class: "card intro")[
          #eyebrow(none, site.eyebrow)
          #h("h1", class: "headline")[#site.headline]
          #h("div", class: "lead")[#site.intro]
          #h("div", class: "body2")[#site.intro2]
          #h("hr")
          #h("p", class: "mini")[Core research domains]
          #tag-list(site.interests, cls: "tags box")
        ]
        #h("div", class: "stats")[#for s in site.stats { stat(s) }]
      ]
    ]
    #h("section", class: "highlights")[
      #h("div", class: "sec-head")[
        #h("div")[
          #h("h2")[Curated highlights & featured work]
          #h("p", class: "mini")[Pinned entries from publications, projects and notes. Without a pin, the latest entry is shown.]
        ]
        #if site.owner-tools { h("button", class: "btn", type: "button", data-open: "pins-dialog")[#icon("pin")Configure pins] }
      ]
      #h("div", class: "cards3")[#for f in featured(data) { feature-card(f.e, f.pinned, base) }]
    ]
  ]
}

// ── CV page ─────────────────────────────────────────────────────────
#let sort-key(e) = {
  let st = e.at("start", default: "0")
  date-key(e.at("end", default: st)) * 100000000 + date-key(st)
}

#let tl-item(e, cur: false) = {
  let rng = fmt-range(e.at("start", default: none), e.at("end", default: none))
  let extra = e.at("detail", default: e.at("body", default: none))
  h("article", class: "tl-item" + if cur { " cur" } else { "" })[
    #h("div", class: "tl-head")[
      #h("h4", class: "tl-title")[#e.title]
      #if rng != "" { h("span", class: "tl-date")[#rng] }
    ]
    #h("p", class: "tl-org")[#h("strong")[#e.org]#if "place" in e [, #e.place]]
    #if extra != none and extra != [] { h("div", class: "tl-body")[#extra] }
  ]
}

#let cv-page(base) = {
  let order(items) = items.sorted(key: e => if site.cv-newest-first { -sort-key(e) } else { sort-key(e) })
  [
    #page-head("cap", "Curriculum vitae", site.name, [#site.affiliation. Typeset in Typst with the #raw("acadennial-cv") template.],
      aside: [
        #h("button", class: "btn", type: "button", data-print: "")[#icon("print")Print CV]
        #h("a", class: "btn btn-dark", href: base + "assets/cv.pdf", download: "")[#icon("download")Download PDF]
      ])
    #h("div", class: "cv-grid")[
      #h("div", class: "cv-main")[
        #h("section", class: "cv-sec")[
          #h("h2", class: "cv-h")[#icon("cap")Education]
          #for e in order(cvd.education) { tl-item(e, cur: e.at("end", default: none) == "present") }
        ]
        #h("section", class: "cv-sec")[
          #h("h2", class: "cv-h")[#icon("briefcase")Research & work experience]
          #for e in order(cvd.experience) { tl-item(e) }
        ]
      ]
      #h("aside", class: "cv-side")[
        #h("section", class: "card side-card")[
          #h("h3")[#icon("award")Relevant coursework & marks]
          #h("ul", class: "courses")[
            #for c in cvd.courses {
              h("li")[#h("span", class: "cc")[#c.code]#h("a", href: c.url, ..ext-attrs(c.url))[#c.title]#h("span", class: "cg")[#c.grade]]
            }
          ]
        ]
        #h("section", class: "card side-card")[
          #h("h3")[#icon("award")Honors & recognitions]
          #h("ul", class: "honors")[#for a in cvd.awards { h("li")[#h("span", class: "ratio")[#a.label]#h("span")[#a.text]] }]
        ]
      ]
    ]
  ]
}

// ── listing pages ───────────────────────────────────────────────────
#let publications-page(data, base) = {
  let pubs = data.publications
  let years = pubs.map(e => year-of(e.date)).dedup().sorted().rev()
  let topics = pubs.map(e => e.at("topics", default: ())).flatten().dedup().sorted()
  let chip(group, value, lbl, n, on: false) = h("button", type: "button", class: "fchip", data-group: group, data-value: value, aria-pressed: if on { "true" } else { "false" })[#lbl#if n != none { h("span", class: "n")[#("[" + str(n) + "]")] }]
  [
    #page-head("file", "Scientific output", "Publications", "Peer-reviewed journal articles, conference papers and posters.",
      aside: h("label", class: "search-box")[#icon("search")#h("input", type: "search", class: "search", placeholder: "Search title, author, DOI, venue…", aria-label: "Search publications", data-search: "")],
      below: h("div", class: "filters")[
        #h("div", class: "frow", role: "group", aria-label: "Filter by topic")[
          #h("span", class: "flabel")[Topic:]
          #chip("topic", "all", "All", pubs.len(), on: true)
          #for t in topics { chip("topic", t, t, pubs.filter(e => t in e.at("topics", default: ())).len()) }
        ]
        #h("div", class: "frow", role: "group", aria-label: "Filter by year")[
          #h("span", class: "flabel")[Year:]
          #chip("year", "all", "All", none, on: true)
          #for y in years { chip("year", str(y), str(y), none) }
        ]
      ])
    #h("p", class: "result-count", data-count: "", aria-live: "polite")
    #h("div", class: "stack", data-list: "")[#for e in pubs { pub-card(e, base) }]
    #h("p", class: "empty", data-empty: "", hidden: "")[No publications match these filters.]
  ]
}

#let projects-page(data, base) = [
  #page-head("code", "Research & systems", "Projects", "Research and engineering projects, from neuro-symbolic learning to clinical data infrastructure.")
  #h("div", class: "grid2")[#for e in data.projects { project-card(e, base) }]
]

#let blog-page(data, base) = [
  #page-head("book", "Academic notebook & essays", site.blog-label, "Writing on logic, learning and research practice.")
  #h("div", class: "stack")[#for e in data.blog { note-card(e, base) }]
]

// ── entry pages (one per file in content/) ──────────────────────────
#let entry-page(e, body, base) = {
  let back = (publications: ("Publications", "publications.html"), projects: ("Projects", "projects.html"), blog: (site.blog-label, "blog.html")).at(e.kind)
  let insts = insts-of(e)
  let dls = e.at("downloads", default: ())
  let lks = e.at("links", default: ())
  [
    #h("a", class: "back", href: base + back.at(1))[#icon("chevron")#back.at(0)]
    #h("article", class: "article")[
      #h("header", class: "card a-head")[
        #h("div", class: "pc-top")[#badge-el(e)#h("span", class: "date")[#when(e)]#pinned-el(e)]
        #h("h1", class: "a-title")[#e.title]
        #if "subtitle" in e { h("p", class: "a-sub")[#e.subtitle] }
        #if e.kind == "publications" {
          [
            #h("p", class: "a-authors")[#authors-line(e, marks: true)]
            #if insts.len() > 0 { h("ol", class: "affil")[#for i in insts { h("li")[#i] }] }
            #if "venue" in e { h("p", class: "pc-venue")[#e.venue#if "ref" in e [ #e.ref]] }
            #h("div", class: "pc-actions")[#pub-actions(e, base, toggles: false)]
            #bib-panel(e)
          ]
        } else {
          [
            #if e.kind == "projects" and "affiliation" in e { h("p", class: "pc-venue")[#h("span", class: "k")[Affiliation: ]#e.affiliation] }
            #tag-list(e.at("tags", default: ()))
            #if lks.len() + dls.len() > 0 {
              h("div", class: "pc-actions")[
                #for l in lks { btn(url(base, l.href), l.label, ic: "ext") }
                #for d in dls { btn(base + "assets/files/" + d.file, d.label, ic: "download", dl: true) }
              ]
            }
          ]
        }
      ]
      #if "abstract" in e { h("section", class: "card abstract")[#h("h2")[Abstract]#e.abstract] }
      #h("div", class: "prose")[#body]
    ]
  ]
}
