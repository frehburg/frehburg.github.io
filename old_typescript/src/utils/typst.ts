import { ColorTheme } from './theme.ts';

export const RAW_TYPST_CV = `#import "@preview/acadennial-cv:0.1.0": *

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
      Master of Logic Student \\
      ILLC, UvA \\
      Amsterdam, NL
    ],
    secondary-info: [
      #link("mailto:filip.rehburg@student.uva.nl")[filip.rehburg@student.uva.nl] \\
      #link("https://orcid.org/0009-0007-0457-5724")[orcid.org/0009-0007-0457-5724] \\
      #link("https://www.linkedin.com/in/filip-rehburg/")[#linkedin-icon()] #link("https://scholar.google.com/citations?user=XRQmI9QAAAAJ&hl=en&oi=sra")[#google-scholar-icon()] #link("https://github.com/frehburg")[#github-icon()]
    ],
  ),
)

== Current Education
#employment-head-item(
  "Institute of Logic, Language and Computation, UvA",
  "Amsterdam, NL",
)[
  MSc in Logic, September 2025 - \\
  Computation Track, \\
  Member of the Diversity Committee
]

== Prior Education
#employment-head-item-list(
  (
    c2: "Maastricht University",
    c3: "Maastricht, NL",
    body: [
      BSc (Honors) in Data Science and Artificial Intelligence, June 2023 \\
      Thesis: Electrocardiographic Imaging of Synthesized Human Data Using Deep Learning \\
      Advisors: Prof. Ralf Peeters and Dr. Joël Karel
    ],
  ),
  (
    c2: "City University of Hong Kong",
    c3: "Kowloon, Hong Kong SAR",
    body: [
      Exchange semester at Department of Data Science
    ],
  ),
)

== Research Interests
Reasoning, Neuro-Symbolic AI, Deep Learning, Graph Neural Networks, Knowledge Representation, Modal Logic

== Relevant Courses
#meta-entry-item-list(
  c2-text-args: (weight: "regular"),
  c1-len: 8em,
  (c1: [UvA: #link("https://coursecatalogue.uva.nl/en/courses/2026/1/59202")[5204IEIA6Y]], c2: [Interpretability & Explainability in AI], c3: [9/10]),
  (c1: [UvA: #link("https://coursecatalogue.uva.nl/en/courses/2026/1/58850")[5314COCO6Y]], c2: [Computational Complexity], c3: [9/10]),
  (c1: [UvA: #link("https://coursecatalogue.uva.nl/en/courses/2026/1/60563")[5314LDEC6Y]], c2: [Logic, Data Examples, and Computational Learning Theory], c3: [8.5/10]),
  (c1: [UvA: #link("https://studiegids.uva.nl/xmlpages/page/2025-2026/zoek-vak/vak/129992")[52041DEL6Y]], c2: [Deep Learning 1], c3: [8/10]),
)

== Experience
#meta-entry-item-list(
  c1-len: 7em,
  (
    c1: "12/2023 - 12/2024",
    c2: "Research Assistant Computer Science",
    c3: "Vrije Universiteit Amsterdam, Amsterdam, NL",
    body: [Developing a theoretically grounded approach to implementing rule-level forgetting in Neuro-Symbolic Graph Neural Networks trained to learn a set of representative rules from a Datalog dataset.],
  ),
  (
    c1: "12/2023 - 12/2024",
    c2: "Research Fellow Medical Data Science",
    c3: "Berlin Institute of Health at Charité, Berlin, DE",
    body: [Training classification models to assist diagnosing rare diseases in automated clinical applications using data with strong class imbalance. Codeveloped a framework for storing and exchanging rare disease data to facilitate cross-location analysis. Contributed to the phenopackets and gpsea projects. Authored one and contributed to five publications.],
  ),
  (
    c1: "8/2023",
    c2: "Research Intern Medical Data Science",
    c3: "Berlin Institute of Health at Charité, Berlin, DE",
    body: [],
  ),
  (
    c1: "9/2021 - 7/2022",
    c2: "Research Assistant (MaRBLe)",
    c3: "Ludii Research Group, DACS, UM, Maastricht, NL",
    body: [Developed a code completion software for the bespoke Ludii programming language using classical NLP approaches and achieved high accuracy with minimal latency.],
  ),
)

== Awards and Honors
#meta-entry-item-list(
  c2-text-args: (weight: "regular"),
  item-spacing: 0.8em,
  (c1: "4/15", c2: "Successfully completed MaRBLe Honors program"),
  (c1: "15/60", c2: "Accepted into MaRBLe Honors program: year-long research project on code completion"),
  (c1: "3/100+", c2: "Selected for one out of three spots for an exchange semester in Hong Kong"),
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
`;

export function getCustomizedTypstCV(theme: ColorTheme): string {
  const header = `// Typst CV for Filip Rehburg
// Compiled using @preview/acadennial-cv:0.1.0
// Main color: ${theme.main}, Accent: ${theme.accent}, Contrast: ${theme.contrast}
#let accent-color = rgb("${theme.accent}")
`;
  return header + RAW_TYPST_CV;
}

export function downloadTextFile(filename: string, content: string, mimeType = "text/plain"): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
