// TEMPLATE for a note (blog post). Copy to content/blog/<url-name>.typ.
// Files starting with "_" are ignored by the build.
#let meta = (
  title: "Title of the note",
  subtitle: "Optional subtitle",
  date: "2026-01-31",            // "YYYY-MM-DD" (or "YYYY-MM", "YYYY")
  category: "Logic & AI",        // optional: small label on cards
  summary: "One or two sentences for the cards on the front page and in the list.",
  downloads: (                   // optional: put the files in assets/files/
    // (label: "Slides (PDF)", file: "my-slides.pdf"),
  ),
  highlight: false,              // true = pin to the front page
)

The text of the note starts here, in normal Typst markup.
