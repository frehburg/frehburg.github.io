// Note (blog post). Copy _template.typ to write a new one; the file name becomes the URL.
// This is an example: delete it when you publish your own notes.
#let meta = (
  title: "Hello, world",
  subtitle: "How this site works, and how to add a note",
  date: "2026-10-17",
  category: "Site",
  summary: "This site is written entirely in Typst. A note is a single file: metadata at the top, Typst markup below.",
  // downloads: ((label: "Slides (PDF)", file: "hello-slides.pdf"),),   // files live in assets/files/
  highlight: false,
)

Every note is one `.typ` file in `content/blog/`. The metadata block above controls how it shows up in lists and on the front page; everything below it is ordinary Typst.

= What you can write

You get the usual Typst toolbox: _emphasis_, *strong text*, lists, links like #link("https://typst.app")[typst.app], and code:

```typst
#let meta = (title: "My note", date: "2026-11-01")
```

Math is typeset as MathML, so it stays selectable and accessible. A modal logic axiom, inline: $square (p -> q) -> (square p -> square q)$. And displayed:

$ forall x. (P(x) -> Q(x)) => (exists x. P(x) -> exists x. Q(x)) $

= Publishing

Commit the file and push: the build picks up every file in `content/blog/` automatically. Set `highlight: true` in the metadata to pin a note to the front page.
