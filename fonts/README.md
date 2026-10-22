# Fonts for the PDF CV

The CV template (`@preview/acadennial-cv`) sets its text in **Alegreya** and its headings in **Arial**.
Typst only uses fonts it can find, so on a machine (or on GitHub's build server) that does not have them, the PDF
falls back to Typst's built-in serif font. The content is identical, only the typeface differs.

To get the same look everywhere, drop the `.ttf` / `.otf` files (for example Alegreya from Google Fonts, which is
free under the SIL Open Font License) into this folder and commit them. `build.py` and the GitHub workflow
pass this folder to Typst automatically.

This folder is not used for the website itself: its fonts (Inter, Newsreader, JetBrains Mono) are bundled as
web fonts in `assets/fonts/`.
