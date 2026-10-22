# Personal website, written in Typst

A static website for GitHub Pages: front page, CV, publications (filter by topic and year), projects and notes.
Pages, styling and the PDF CV are all generated from Typst sources by **one** `typst compile` call
(Typst 0.15's experimental *bundle* export). The small `build.py` only tells Typst which entry files exist,
because Typst cannot list directories yet.

## Build and preview

1. Install [Typst](https://github.com/typst/typst#installation) **0.15.1 or newer**, and Python 3.
2. `python build.py` writes the site to `_site/`. `python build.py --serve` rebuilds on every change and serves it locally
   (restart it after adding a new entry file).

## Publish on `<username>.github.io`

1. Create a repository named `<username>.github.io` (yours would be `frehburg.github.io`) and push this folder to `main`.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` rebuilds and deploys through `.github/workflows/pages.yml`.

## Colors: one place

`config.typ` → `theme` holds the three colors: **main** (background), **accent** and **contrast** (text).
All other shades are derived. The *Theme* button in the site header previews palettes live and prints a
snippet to paste over that block. Set `owner-tools: false` in `config.typ` to hide the *Theme* and *Pins* buttons.

## Add content: one file per entry

Copy the `_template.typ` in the matching folder, rename it (the file name becomes the URL), fill in `meta`, and write the body below it.
Files starting with `_` are ignored.

| Folder | What | Notable fields |
|---|---|---|
| `content/publications/` | papers, posters | `title`, `subtitle`, `authors` (with `inst`), `date`, `topics`, `doi`, `abstract`, `links`, `downloads` |
| `content/projects/` | projects | `title`, `subtitle`, `date`, `end`, `domain`, `tags`, `links`, `downloads` |
| `content/blog/` | notes | `title`, `subtitle`, `date`, `category`, `summary`, `downloads` |

* Downloads: put the file in `assets/files/` and list it as `downloads: ((label: "Slides", file: "slides.pdf"),)`.
* **Front page highlights:** `highlight: true` in any entry pins it. A section without a pin shows its latest entry.
* BibTeX is generated for a publication when its author list is complete (no `"…"`); otherwise add `bibtex:`.
* Publications, projects and notes show up automatically in lists, filters and the front page.

## CV

`cv/data.typ` is the single source for the CV page and the PDF (`cv/cv.typ`, built into `assets/cv.pdf`).
The publication list inside `cv/cv.typ` is still written by hand. See `fonts/README.md` for the PDF fonts.

## Photo, links, text

Replace `assets/me.jpg` with your own portrait (any size; it is cropped to a square) and edit the profile text,
links and stats in `config.typ`. TODO markers in `config.typ` and the entries show what still needs your input.

```
config.typ          colors, profile, links
main.typ            list of generated pages (the bundle root)
lib/                layout code, style.css, site.js
content/            one file per publication / project / note
cv/                 CV data and PDF source
assets/             photo, fonts, downloadable files
build.py            lists the entry files and calls Typst
```
