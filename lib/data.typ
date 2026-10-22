// Loads the entry files in content/<kind>/. The list of file names is handed
// in by build.py (--input), because Typst cannot list directories yet.
#import "/lib/util.typ": *

#let slugs(kind) = sys.inputs.at(kind, default: "").split(",").filter(s => s != "")

// Every entry file defines `meta` (a dictionary) and then contains its body.
#let load(kind) = {
  slugs(kind).map(slug => {
    import "/content/" + kind + "/" + slug + ".typ": meta
    // Projects sort by their end date ("present" = newest), everything else by date.
    let key = if "end" in meta { meta.end } else { meta.date }
    (..meta, kind: kind, slug: slug, path: kind + "/" + slug + ".html", sort: date-key(key) * 100000000 + date-key(meta.date))
  }).sorted(key: e => e.sort).rev()
}

#let load-all() = (blog: load("blog"), projects: load("projects"), publications: load("publications"))

#let is-pinned(e) = e.at("highlight", default: false)

// Front page: for each section the entries marked `highlight: true`;
// if a section has none, its most recent entry.
#let featured(data) = ("publications", "projects", "blog").map(k => {
  let all = data.at(k)
  let pins = all.filter(is-pinned)
  if pins.len() > 0 { pins.map(e => (e: e, pinned: true)) } else if all.len() > 0 { ((e: all.first(), pinned: false),) } else { () }
}).flatten()

#let pin-count(data) = data.values().flatten().filter(is-pinned).len()
