// Small helpers shared by every module.

// h("div", class: "x", data-y: "1")[body]  ->  <div class="x" data-y="1">body</div>
// Named arguments become HTML attributes (values must be strings).
#let h(tag, ..args) = {
  let body = args.pos().join()
  if body == none { html.elem(tag, attrs: args.named()) } else { html.elem(tag, attrs: args.named(), body) }
}

// ── dates: "2025", "2025-11" or "2025-11-18" (or "present") ──
#let months = ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
#let parse-date(s) = {
  let p = s.split("-").map(int)
  (y: p.at(0), m: p.at(1, default: 0), d: p.at(2, default: 0))
}
#let date-key(s) = if s == "present" { 99999999 } else { let p = parse-date(s); p.y * 10000 + p.m * 100 + p.d }
#let year-of(s) = parse-date(s).y
#let fmt-date(s) = {
  let p = parse-date(s)
  if p.m == 0 { str(p.y) } else if p.d == 0 { months.at(p.m - 1) + " " + str(p.y) } else { months.at(p.m - 1) + " " + str(p.d) + ", " + str(p.y) }
}
// "12/2023"
#let fmt-my(s) = if s == "present" { "Present" } else {
  let p = parse-date(s)
  if p.m == 0 { str(p.y) } else { (if p.m < 10 { "0" } else { "" }) + str(p.m) + "/" + str(p.y) }
}
#let fmt-range(a, b) = if a == none and b == none { "" } else if a == none { fmt-my(b) } else if b == none or b == a { fmt-my(a) } else { fmt-my(a) + " – " + fmt-my(b) }

// ── urls: external links stay as they are, local paths get the page's prefix ──
#let is-ext(p) = p.starts-with("http") or p.starts-with("mailto:") or p.starts-with("#")
#let url(base, p) = if is-ext(p) { p } else { base + p }
#let enc(s) = s.replace("%", "%25").replace(" ", "%20").replace("&", "%26").replace("#", "%23")

// External links open in a new tab.
#let ext-attrs(u) = if u.starts-with("http") { (target: "_blank", rel: "noopener") } else { (:) }
