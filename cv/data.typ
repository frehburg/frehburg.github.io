// ════════════════════════════════════════════════════════════════════
//  CV DATA — single source of truth.
//  Edit this file: it feeds both the CV page on the website and the PDF
//  (cv/cv.typ → assets/cv.pdf). Dates are "YYYY-MM" (or "present").
// ════════════════════════════════════════════════════════════════════

#let education = (
  (
    title: "MSc in Logic",
    org: "Institute of Logic, Language and Computation, UvA",
    place: "Amsterdam, NL",
    start: "2025-09", end: "present",
    detail: [Computation Track, \ Member of the Diversity Committee],
  ),
  (
    title: "BSc (Honors) in Data Science and Artificial Intelligence",
    org: "Maastricht University",
    place: "Maastricht, NL",
    end: "2023-06",
    detail: [Thesis: Electrocardiographic Imaging of Synthesized Human Data Using Deep Learning \ Advisors: Prof. Ralf Peeters and Dr. Joël Karel],
  ),
  (
    title: "Exchange semester at Department of Data Science",
    org: "City University of Hong Kong",
    place: "Kowloon, Hong Kong SAR",
  ),
)

#let experience = (
  (
    start: "2023-12", end: "2024-12",
    title: "Research Assistant Computer Science",
    org: "Vrije Universiteit Amsterdam", place: "Amsterdam, NL",
    body: [Developing a theoretically grounded approach to implementing rule-level forgetting in Neuro-Symbolic Graph Neural Networks trained to learn a set of representative rules from a Datalog dataset.],
  ),
  (
    start: "2023-12", end: "2024-12",
    title: "Research Fellow Medical Data Science",
    org: "Berlin Institute of Health at Charité", place: "Berlin, DE",
    body: [Training classification models to assist diagnosing rare diseases in automated clinical applications using data with strong class imbalance. Codeveloped a framework for storing and exchanging rare disease data to facilitate cross-location analysis. Contributed to the phenopackets and gpsea projects. Authored one and contributed to five publications.],
  ),
  (
    start: "2023-08", end: "2023-08",
    title: "Research Intern Medical Data Science",
    org: "Berlin Institute of Health at Charité", place: "Berlin, DE",
    body: [],
  ),
  (
    start: "2021-09", end: "2022-07",
    title: "Research Assistant (MaRBLe)",
    org: "Ludii Research Group, DACS, UM", place: "Maastricht, NL",
    body: [Developed a code completion software for the bespoke Ludii programming language using classical NLP approaches and achieved high accuracy with minimal latency.],
  ),
)

#let awards = (
  (label: "4/15", text: "Successfully completed MaRBLe Honors program"),
  (label: "15/60", text: "Accepted into MaRBLe Honors program: year-long research project on code completion"),
  (label: "3/100+", text: "Selected for one out of three spots for an exchange semester in Hong Kong"),
)

// pdf: false → shown on the website but left out of the PDF.
#let courses = (
  (inst: "UvA", code: "5204IEIA6Y", url: "https://coursecatalogue.uva.nl/en/courses/2026/1/59202", title: "Interpretability & Explainability in AI", grade: "9/10"),
  (inst: "UvA", code: "5314COCO6Y", url: "https://coursecatalogue.uva.nl/en/courses/2026/1/58850", title: "Computational Complexity", grade: "9/10"),
  (inst: "UvA", code: "5314LDEC6Y", url: "https://coursecatalogue.uva.nl/en/courses/2026/1/60563", title: "Logic, Data Examples, and Computational Learning Theory", grade: "8.5/10"),
  (inst: "UvA", code: "52041DEL6Y", url: "https://studiegids.uva.nl/xmlpages/page/2025-2026/zoek-vak/vak/129992", title: "Deep Learning 1", grade: "8/10"),
  (inst: "UM", code: "KEN2520", url: "https://www.maastrichtuniversity.nl/education/bachelor/programmes/data-science-and-artificial-intelligence/courses-and-curriculum", title: "Machine Learning", grade: "9/10", pdf: false),
  (inst: "UM", code: "KEN2110", url: "https://www.maastrichtuniversity.nl/education/bachelor/programmes/data-science-and-artificial-intelligence/courses-and-curriculum", title: "Graph Theory", grade: "9/10", pdf: false),
)
