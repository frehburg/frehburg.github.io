// TEMPLATE for a publication. Copy to content/publications/<url-name>.typ.
// Titles, subtitles and venues are plain strings; the abstract is Typst content.
#let meta = (
  title: "Title of the paper",
  subtitle: "Optional subtitle",
  // Names are shown as written. Add institutions to get numbered affiliations;
  // "…" stands for omitted authors. Your own name is shown in bold (config.typ).
  authors: (
    (name: "Rehburg F", inst: ("Institute for Logic, Language and Computation, University of Amsterdam",)),
    (name: "Another A", inst: ("Some University", "Another Institute")),
    "Third T",
  ),
  date: "2026-01-31",            // "YYYY-MM-DD" (or "YYYY-MM", "YYYY")
  type: "Journal",               // Journal | Conference | Workshop | Poster | Preprint
  venue: "Journal of Examples",
  venue-short: "J Examples",     // optional: used on the colored label
  ref: "12(3):45–67",            // optional: volume, pages
  topics: ("Rare diseases", "Interoperability"),   // used by the filter
  doi: "10.1000/example",        // optional: becomes a DOI link
  links: (                       // optional
    (label: "PubMed", href: "https://pubmed.ncbi.nlm.nih.gov/..."),
  ),
  downloads: (                   // optional: put the files in assets/files/
    (label: "Paper (PDF)", file: "my-paper.pdf"),
  ),
  highlight: false,              // true = pin to the front page
  abstract: [The abstract, in normal Typst markup.],
  // bibtex: "@article{...}",    // optional: otherwise generated when the author list is complete
)

Optional extra notes below the abstract (supplementary material, errata, talk links).
