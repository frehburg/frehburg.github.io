// Icons are CSS masks (so they take the surrounding text color).
// Add one by adding a name and its SVG shapes (24x24 grid, stroke only).
#let paths = (
  download: "<path d='M12 3v12m0 0-4-4m4 4 4-4M5 21h14'/>",
  ext: "<path d='M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'/>",
  code: "<path d='m8 8-4 4 4 4M16 8l4 4-4 4'/>",
  mail: "<rect x='3' y='5' width='18' height='14' rx='2'/><path d='m3 7 9 6 9-6'/>",
  pin: "<path d='M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z'/>",
  palette: "<circle cx='12' cy='12' r='9'/><circle cx='8.5' cy='10' r='1'/><circle cx='12' cy='7.5' r='1'/><circle cx='15.5' cy='10' r='1'/><path d='M12 21c-1.5 0-1.5-2 0-3s2-2.5 0-3'/>",
  search: "<circle cx='11' cy='11' r='7'/><path d='m20 20-4-4'/>",
  chevron: "<path d='m6 9 6 6 6-6'/>",
  cap: "<path d='m2 9 10-5 10 5-10 5z'/><path d='M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5'/>",
  book: "<path d='M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z'/>",
  print: "<path d='M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2'/><rect x='7' y='14' width='10' height='7'/>",
  briefcase: "<rect x='3' y='7' width='18' height='13' rx='2'/><path d='M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18'/>",
  award: "<circle cx='12' cy='9' r='6'/><path d='m8.5 14-1.5 8 5-3 5 3-1.5-8'/>",
  copy: "<rect x='9' y='9' width='12' height='12' rx='2'/><path d='M5 15V5a2 2 0 0 1 2-2h10'/>",
  x: "<path d='M6 6l12 12M18 6 6 18'/>",
  reset: "<path d='M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5'/>",
  link: "<path d='M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1'/>",
  file: "<path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z'/><path d='M14 3v5h5M9 13h6M9 17h6'/>",
  calendar: "<rect x='3' y='5' width='18' height='16' rx='2'/><path d='M8 3v4M16 3v4M3 11h18'/>",
)
#let icon(name) = html.elem("span", attrs: (class: "i i-" + name, aria-hidden: "true"))

#let svg-uri(inner) = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E" + inner.replace("<", "%3C").replace(">", "%3E") + "%3C/svg%3E"
#let icon-css = paths.pairs().map(((k, v)) => ".i-" + k + "{--m:url(\"" + svg-uri(v) + "\")}").join("\n")
