// TEMPLATE for a project. Copy to content/projects/<url-name>.typ.
#let meta = (
  title: "Project title",
  subtitle: "Optional subtitle",
  date: "2026-01",               // start date
  end: "present",                // optional: end date or "present"
  domain: "Neuro-Symbolic AI",   // optional: small colored label
  affiliation: "Institution",    // optional
  summary: "One or two sentences for the cards.",
  tags: ("Tag one", "Tag two"),
  links: (                       // optional
    (label: "GitHub", href: "https://github.com/..."),
  ),
  downloads: (                   // optional: put the files in assets/files/
    // (label: "Poster (PDF)", file: "my-poster.pdf"),
  ),
  highlight: false,              // true = pin to the front page
)

The longer description of the project starts here, in normal Typst markup.
