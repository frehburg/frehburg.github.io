// ════════════════════════════════════════════════════════════════════
//  SITE CONFIGURATION
//  The one file to edit for the look of the site and the front page.
//  Everything else (layout, pages, styling) lives in lib/ and pages are
//  built from the entry files in content/.
// ════════════════════════════════════════════════════════════════════


// ── 1. COLOR SCHEME ─────────────────────────────────────────────────
// Change these three colors and the whole website follows. Every other
// shade (borders, muted text, tinted backgrounds, hover states) is derived
// from them automatically.
//
// Tip: the "Theme" button in the site header lets you try colors live in
// the browser and copies a ready-made snippet to paste over this block.
// Swap main and contrast for a dark theme.
#let theme = (
  main: rgb("#ffffff"),      // page background
  accent: rgb("#2563eb"),    // full, bright blue: links, highlights, active states
  contrast: rgb("#0f172a"),  // dark slate gray: text, headings, dark buttons
)


// ── 2. ABOUT YOU (front page) ───────────────────────────────────────
#let site = (
  name: "Filip Rehburg",
  role: "MSc in Logic · ILLC, UvA",              // small line next to the name in the header
  affiliation: "ILLC, University of Amsterdam",  // footer
  description: "Personal website of Filip Rehburg, MSc Logic student at the ILLC, University of Amsterdam: neuro-symbolic AI, reasoning and knowledge representation.",
  blog-label: "Notes",                           // what the blog section is called in the menu

  // Portrait: put your file in assets/ and change the name here.
  photo: "assets/me.jpg",
  photo-alt: "Portrait of Filip Rehburg",

  // What I am doing right now (chip on the photo + facts list under it)
  badge: (label: "Active MSc · ILLC UvA", range: "2025–Present"),
  facts: (
    ("Institute", "ILLC, UvA"),
    ("Track", "Computation"),
    ("Committees", "Member of the Diversity Committee"),
    ("Prior", "BSc (Hons) DSAI, Maastricht"),
  ),

  // Introduction (top right card)
  eyebrow: "MSc student in Logic & computational intelligence",
  headline: [Exploring the intersection of _Neuro-Symbolic AI_, Reasoning, and Logic.],
  intro: [I am currently pursuing my Master of Science in Logic at the Institute for Logic, Language and Computation (ILLC) at the University of Amsterdam. My research investigates how formal logical foundations, such as Datalog, modal logic, and rule-level forgetting, can be synthesized with deep representation models and Graph Neural Networks (GNNs) for robust, interpretable machine reasoning.],
  intro2: [Alongside formal neuro-symbolic research, I have worked extensively with the Berlin Institute of Health at Charité on standardized rare disease informatics, bridging phenotypic data registries to Global Alliance for Genomics and Health (GA4GH) Phenopackets and HL7 FHIR ontologies.],

  // Research interests (also used in the PDF CV)
  interests: ("Reasoning", "Neuro-Symbolic AI", "Deep Learning", "Graph Neural Networks", "Knowledge Representation", "Modal Logic"),

  // Four small tiles under the introduction. `value: auto` counts your publication files.
  stats: (
    (value: "MSc", label: "Logic, ILLC Amsterdam", hot: true),
    (value: auto, label: "Papers & posters", hot: false),
    (value: "BSc (Hons)", label: "Data Sci & AI, Maastricht", hot: false),
    (value: "Typst", label: "Typeset CV & this site", hot: true),
  ),

  // Links shown on the front page. icon: mail | orcid | code | ext | cap | link
  // `short` (optional) is the label used in the footer.
  links: (
    (icon: "mail", label: "filip.rehburg@student.uva.nl", href: "mailto:filip.rehburg@student.uva.nl"),
    (icon: "orcid", label: "0009-0007-0457-5724", href: "https://orcid.org/0009-0007-0457-5724", short: "ORCID"),
    (icon: "code", label: "GitHub (frehburg)", href: "https://github.com/frehburg", short: "GitHub"),
    (icon: "ext", label: "LinkedIn", href: "https://www.linkedin.com/in/filip-rehburg/", short: "LinkedIn"),
    (icon: "cap", label: "Google Scholar", href: "https://scholar.google.com/citations?user=XRQmI9QAAAAJ&hl=en&oi=sra", short: "Google Scholar"),
    // TODO: replace with the address of your personal profile page on the UvA / ILLC site.
    (icon: "ext", label: "UvA ILLC profile", href: "https://www.illc.uva.nl/", short: "UvA ILLC"),
  ),

  // Names that are shown in bold in author lists.
  me: ("Filip Rehburg", "Rehburg F", "Rehburg, F"),

  // Show the "Theme" and "Pins" buttons in the header (handy while you work on
  // the site; set to false when you do not want visitors to see them).
  owner-tools: true,

  // CV page: newest entries first?
  cv-newest-first: true,
)
