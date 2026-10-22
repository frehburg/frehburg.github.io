#import "@preview/acadennial-cv:0.1.0": *
#import "/cv/data.typ": *
#import "/config.typ": site
// ============================================
// Default function configurations
// ============================================
#let col-cfg = (
c1-len: 15%,
c2-len: 1fr,
c3-len: auto,
col-gutter: 1em,
)
#let employment-head = employment-head.with(..col-cfg)
#let employment-head-item = employment-head-item.with(..col-cfg)
#let employment-head-item-list = employment-head-item-list.with(..col-cfg)
#let meta-entry = meta-entry.with(..col-cfg)
#let meta-entry-item = meta-entry-item.with(..col-cfg)
#let meta-entry-item-list = meta-entry-item-list.with(..col-cfg)
#let pub-item = pub-item.with(..col-cfg)
#let pub-item-list = pub-item-list.with(..col-cfg)
// ============================================
// Initialize resume settings
// ============================================
#show: resume.with(
col-args: (
c1-len: col-cfg.c1-len,
c2-len: col-cfg.c2-len,
col-gutter: col-cfg.col-gutter,
),
author-info: (
name: "Filip Rehburg",
primary-info: [
Master of Logic Student
ILLC, UvA
Amsterdam, NL
],
secondary-info: [
#link("mailto:filip.rehburg@student.uva.nl")[filip.rehburg\@student.uva.nl]
#link("https://orcid.org/0009-0007-0457-5724")[orcid.org/0009-0007-0457-5724]
#link("https://www.linkedin.com/in/filip-rehburg/")[#linkedin-icon()] #link("https://scholar.google.com/citations?user=XRQmI9QAAAAJ&hl=en&oi=sra")[#google-scholar-icon()] #link("https://github.com/frehburg")[#github-icon()] //#link("https://orcid.org/0000-0000-0000-0000")[#orcid-icon()]
],
),
)
// ── PDF date helpers ──
#let months = ("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
#let month-long(s) = { let p = s.split("-").map(int); months.at(p.at(1) - 1) + " " + str(p.at(0)) }
#let short(s) = { let p = s.split("-").map(int); str(p.at(1)) + "/" + str(p.at(0)) }
#let pdf-range(e) = if e.start == e.end { short(e.start) } else { short(e.start) + " - " + short(e.end) }

== Current Education
#for e in education.filter(e => e.at("end", default: none) == "present") [
  #employment-head-item(e.org, e.place)[#e.title, #month-long(e.start) - #e.detail]
]
== Prior Education
#employment-head-item-list(..education.filter(e => e.at("end", default: none) != "present").map(e => (
  c2: e.org,
  c3: e.place,
  body: [#e.title#if "end" in e [, #month-long(e.end)]#if "detail" in e [ #e.detail]],
)))
== Research Interests
#site.interests.join(", ")
== Relevant Courses
#meta-entry-item-list(
  c2-text-args: (weight: "regular"),
  c1-len: 8em,
  ..courses.filter(c => c.at("pdf", default: true)).map(c => (c1: [#c.inst: #link(c.url)[#c.code]], c2: c.title, c3: c.grade)),
)
== Experience
#meta-entry-item-list(
  c1-len: 7em,
  ..experience.map(e => (c1: pdf-range(e), c2: e.title, c3: e.org + ", " + e.place, body: e.body)),
)
== Awards and Honors
#meta-entry-item-list(
  c2-text-args: (weight: "regular"),
  item-spacing: 0.8em,
  ..awards.map(a => (c1: a.label, c2: a.text)),
)
#pagebreak()
== Research and Publications
#pubs-reset()
=== Journal
#pub-item-list(
[
Graefe ASL, Rehburg F, Alkarkoukly S, ..., & Beyan O. RareLink: scalable REDCap-based framework for rare disease interoperability linking international registries to FHIR and Phenopackets. NPJ Genom Med. 2025 Nov 18;10(1):72. doi: #link("https://doi.org/10.1038/s41525-025-00534-z")[10.1038/s41525-025-00534-z]. PMID: 41253795; PMCID: PMC12627670.
],
[
Graefe ASL, Hübner MR, Rehburg F, ... & Thun S. An ontology-based rare disease common data model harmonising international registries, FHIR, and Phenopackets. Sci Data. 2025 Feb 8;12(1):234. doi:#link("https://doi.org/10.1038/s41597-025-04558-z")[10.1038/s41597-025-04558-z]. PMID: 39922817; PMCID: PMC11807222.
],
[
Rekerle L, Danis D, Rehburg F, ... & Robinson PN. GA4GH phenopacket-driven characterization of genotype-phenotype correlations in Mendelian disorders. Am J Hum Genet. 2026 Jan 8;113(1):57-70. doi: #link("https://doi.org/10.1016/j.ajhg.2025.12.001")[10.1016/j.ajhg.2025.12.001]. Epub 2025 Dec 23. PMID: 41443197; PMCID: PMC12824607.
],
[
Danis D, Bamshad MJ, Bridges Y, ..., Rehburg F, ... & Robinson PN. A corpus of GA4GH phenopackets: Case-level phenotyping for genomic diagnostics and discovery. HGG Adv. 2025 Jan 9;6(1):100371. doi: #link("https://doi.org/10.1016/j.xhgg.2024.100371")[10.1016/j.xhgg.2024.100371]. Epub 2024 Oct 10. PMID: 39394689; PMCID: PMC11564936.
],
)
=== Conference
#pub-item-list(
[Rehburg F, Graefe A, Hübner M, Thun S. How Interoperability Can Enable Artificial Intelligence in Clinical Applications. Stud Health Technol Inform. 2024 Aug 22;316:596-600. doi: #link("https://doi.org/10.3233/shti240485")[10.3233/SHTI240485. PMID: 39176813].],
[Graefe ASL, Rehburg F, Hübner M, Thun S, Beyan O. Review of Key Elements in Developing a Common Data Model for Rare Diseases: Identifying Common Success Factors. Stud Health Technol Inform. 2024 Aug 22;316:1396-1400. doi: #link("https://doi.org/10.3233/shti240672")[10.3233/SHTI240672]. PMID: 39176641.],
)
=== Poster
#pub-item-list(
[Rehburg, F, Peeters, R, Wang, T, van Dam, P M., Bonizzi, P, & Karel, J (2023). Reconstruction of electrograms using a deep learning network trained on simulation data. Abstract from Electrocardiographic Imaging Summit 2023, Valencia, Spain. #link("https://cris.maastrichtuniversity.nl/en/publications/reconstruction-of-electrograms-using-a-deep-learning-network-trai/")],
)
