export interface Publication {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  institutions: string[];
  venue: string;
  year: number;
  date: string;
  type: 'journal' | 'conference' | 'poster' | 'preprint';
  topics: ('neuro-symbolic' | 'rare-disease' | 'signal-deeplearning')[];
  doi?: string;
  pmid?: string;
  pmcid?: string;
  arxiv?: string;
  abstract: string;
  bibtex: string;
  pdfUrl?: string;
  codeUrl?: string;
  isPinnedDefault?: boolean;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  period: string;
  affiliation: string;
  tags: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
  links: {
    github?: string;
    paper?: string;
    demo?: string;
  };
  isPinnedDefault?: boolean;
}

export interface NotePost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  typstSnippet?: string;
  downloads?: {
    name: string;
    extension: string;
    content: string;
  }[];
  isPinnedDefault?: boolean;
}

export interface Course {
  code: string;
  name: string;
  grade: string;
  institution: string;
  url?: string;
}

export interface Experience {
  period: string;
  role: string;
  institution: string;
  location: string;
  description: string;
  tags?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
  track?: string;
  advisors?: string;
}

export const PROFILE_DATA = {
  name: "Filip Rehburg",
  currentRole: "Master of Logic Student",
  institution: "Institute for Logic, Language and Computation (ILLC), University of Amsterdam",
  location: "Amsterdam, Netherlands",
  email: "filip.rehburg@student.uva.nl",
  personalEmail: "fil.rehburg@gmail.com",
  orcid: "0009-0007-0457-5724",
  orcidUrl: "https://orcid.org/0009-0007-0457-5724",
  linkedinUrl: "https://www.linkedin.com/in/filip-rehburg/",
  githubUrl: "https://github.com/frehburg",
  scholarUrl: "https://scholar.google.com/citations?user=XRQmI9QAAAAJ&hl=en&oi=sra",
  uvaUrl: "https://www.illc.uva.nl",
  statusBadge: "Active MSc · ILLC UvA",
  periodBadge: "2025–Present",
  
  photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNUBa-dU-U8399P_ZBH53VefvZbZluN1ycv-o3IoKXU8VSkty2LGjVmAhOAkIhCJJ3-s1PYJpqslYE-rYtFt26CJO4W-_APWvAJvDkM0MYmP0K2zgABQJig2sTwT6OVdIssmQ8X9sB4DoAvdhIdCc-sQtT61ufNvgfz_C9MUykFq003l0rzoQ0afge8isJLS3svKlb2ZJRWyXQ5r36mk9luUioLofMzDN4L834vyTNO-fV42TVsMIt",

  heroHeadline: "Exploring the intersection of Neuro-Symbolic AI, Reasoning, and Logic.",
  bioParagraph1: "I am currently pursuing my Master of Science in Logic at the Institute for Logic, Language and Computation (ILLC) at the University of Amsterdam. My research investigates how formal logical foundations—such as Datalog, modal logic, and rule-level forgetting—can be synthesized with deep representation models and Graph Neural Networks (GNNs) for robust, interpretable machine reasoning.",
  bioParagraph2: "Alongside formal neuro-symbolic research, I have worked extensively with the Berlin Institute of Health at Charité on standardized rare disease informatics, bridging phenotypic data registries to Global Alliance for Genomics and Health (GA4GH) Phenopackets and HL7 FHIR ontologies.",

  track: "Computation / Logic",
  committees: "Member of the Diversity Committee",
  priorDegree: "BSc (Hons) AI, Maastricht",

  researchDomains: [
    "Neuro-Symbolic AI",
    "Graph Neural Networks (GNNs)",
    "Modal & Mathematical Logic",
    "Knowledge Representation (Datalog)",
    "Rare Disease Phenomics & FHIR",
    "Medical Data Science",
    "Computational Complexity"
  ],

  stats: [
    { label: "MSc Logic (ILLC)", value: "1st Year", highlight: true },
    { label: "Publications & Preprints", value: "6+", highlight: false },
    { label: "Data Sci & AI (Maastricht)", value: "BSc (Hons)", highlight: false },
    { label: "Typeset CV & Notes", value: "Typst", highlight: true }
  ],

  education: [
    {
      degree: "MSc in Logic",
      institution: "Institute of Logic, Language and Computation (ILLC), University of Amsterdam",
      location: "Amsterdam, NL",
      period: "September 2025 – Present",
      track: "Computation Track",
      details: "Focusing on Neuro-Symbolic integration, modal logic, computational learning theory, and proof systems. Appointed member of the ILLC Diversity Committee."
    },
    {
      degree: "BSc (Honors) in Data Science and Artificial Intelligence",
      institution: "Maastricht University",
      location: "Maastricht, NL",
      period: "September 2020 – June 2023",
      advisors: "Prof. Ralf Peeters and Dr. Joël Karel",
      details: "Thesis: Electrocardiographic Imaging of Synthesized Human Data Using Deep Learning. Selected for the prestigious MaRBLe Honors program (top 4 of 15)."
    },
    {
      degree: "Exchange Semester (Department of Data Science)",
      institution: "City University of Hong Kong",
      location: "Kowloon, Hong Kong SAR",
      period: "August 2022 – December 2022",
      details: "Selected for 1 out of 3 competitive bilateral exchange positions across 100+ applicants. Focus on advanced machine learning, Bayesian analysis, and high-dimensional statistics."
    }
  ] as Education[],

  courses: [
    { code: "5204IEIA6Y", name: "Interpretability & Explainability in AI", grade: "9.0 / 10", institution: "UvA ILLC", url: "https://coursecatalogue.uva.nl/en/courses/2026/1/59202" },
    { code: "5314COCO6Y", name: "Computational Complexity", grade: "9.0 / 10", institution: "UvA ILLC", url: "https://coursecatalogue.uva.nl/en/courses/2026/1/58850" },
    { code: "5314LDEC6Y", name: "Logic, Data Examples, and Computational Learning Theory", grade: "8.5 / 10", institution: "UvA ILLC", url: "https://coursecatalogue.uva.nl/en/courses/2026/1/60563" },
    { code: "52041DEL6Y", name: "Deep Learning 1", grade: "8.0 / 10", institution: "UvA ILLC", url: "https://studiegids.uva.nl/xmlpages/page/2025-2026/zoek-vak/vak/129992" },
    { code: "KEN2520", name: "Machine Learning (Maastricht Honors)", grade: "9.0 / 10", institution: "Maastricht University" },
    { code: "KEN2110", name: "Graph Theory & Combinatorics", grade: "9.0 / 10", institution: "Maastricht University" }
  ] as Course[],

  experience: [
    {
      period: "12/2023 – 12/2024",
      role: "Research Assistant Computer Science",
      institution: "Vrije Universiteit Amsterdam",
      location: "Amsterdam, NL",
      description: "Developing a theoretically grounded approach to implementing rule-level forgetting in Neuro-Symbolic Graph Neural Networks trained to learn a set of representative rules from a Datalog dataset.",
      tags: ["Neuro-Symbolic", "Datalog", "PyTorch Geometric", "Knowledge Graphs"]
    },
    {
      period: "12/2023 – 12/2024",
      role: "Research Fellow Medical Data Science",
      institution: "Berlin Institute of Health at Charité",
      location: "Berlin, DE",
      description: "Training classification models to assist diagnosing rare diseases in automated clinical applications using data with strong class imbalance. Codeveloped RareLink, an ontology-based framework for storing and exchanging rare disease data to facilitate cross-location analysis. Contributed to phenopackets and gpsea projects. Authored one and contributed to five publications.",
      tags: ["RareLink", "GA4GH Phenopackets", "HL7 FHIR", "REDCap"]
    },
    {
      period: "08/2023",
      role: "Research Intern Medical Data Science",
      institution: "Berlin Institute of Health at Charité",
      location: "Berlin, DE",
      description: "Designed proof-of-concept pipeline for automatic harmonization between proprietary hospital health record databases and international HL7 FHIR formats for rare pediatric cohorts.",
      tags: ["Clinical Data", "Ontology Engineering"]
    },
    {
      period: "09/2021 – 07/2022",
      role: "Research Assistant (MaRBLe)",
      institution: "Ludii Research Group, DACS, Maastricht University",
      location: "Maastricht, NL",
      description: "Developed a code completion software for the bespoke Ludii programming language using classical NLP approaches and achieved high accuracy with minimal latency.",
      tags: ["Ludii DSL", "NLP", "Grammars", "Java"]
    }
  ] as Experience[],

  awards: [
    { metric: "4 / 15", title: "Successfully completed MaRBLe Honors program", subtitle: "Top excellence cohort at Maastricht University" },
    { metric: "15 / 60", title: "Accepted into MaRBLe Honors program", subtitle: "Year-long research project on DSL code completion" },
    { metric: "3 / 100+", title: "Selected for Bilateral Exchange in Hong Kong", subtitle: "City University of Hong Kong Merit Selection" },
    { metric: "Appointed", title: "ILLC Diversity Committee Member", subtitle: "Elected student representative at University of Amsterdam" }
  ],

  technicalSkills: {
    formalisms: ["Modal Logic", "Datalog", "First-Order Logic", "Proof Theory", "Ontologies (OWL, RDF)"],
    programming: ["Python (PyTorch, PyG, NumPy)", "R", "Java", "C++", "SQL", "TypeScript / JavaScript"],
    medicalStandards: ["GA4GH Phenopackets v2", "HL7 FHIR R4", "REDCap API", "SNOMED-CT", "Human Phenotype Ontology (HPO)"],
    tooling: ["Typst", "LaTeX", "Git & GitHub Actions", "Docker", "Linux / High-Performance Computing (Slurm)"]
  }
};

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: "rehburg2025rarelink",
    title: "RareLink: scalable REDCap-based framework for rare disease interoperability linking international registries to FHIR and Phenopackets",
    subtitle: "NPJ Genomic Medicine · Nature Publishing Group",
    authors: ["Graefe ASL", "Rehburg F", "Alkarkoukly S", "Wagner M", "Robinson PN", "Beyan O"],
    institutions: ["Berlin Institute of Health at Charité", "ILLC UvA", "Jackson Laboratory"],
    venue: "NPJ Genomic Medicine (Nature Portfolio)",
    year: 2025,
    date: "November 18, 2025",
    type: "journal",
    topics: ["rare-disease"],
    doi: "10.1038/s41525-025-00534-z",
    pmid: "41253795",
    pmcid: "PMC12627670",
    abstract: "Clinical patient data for rare diseases is often fragmented across bespoke hospital questionnaires and localized registries. RareLink provides an open-source, automated framework linking REDCap instruments directly to FHIR and GA4GH Phenopackets v2 schema, enabling seamless multi-center cohort analysis without requiring extensive localized IT re-architecting.",
    bibtex: `@article{Graefe2025RareLink,
  title = {RareLink: scalable REDCap-based framework for rare disease interoperability linking international registries to FHIR and Phenopackets},
  author = {Graefe, A. S. L. and Rehburg, Filip and Alkarkoukly, S. and Wagner, M. and Robinson, P. N. and Beyan, O.},
  journal = {NPJ Genomic Medicine},
  volume = {10},
  number = {1},
  pages = {72},
  year = {2025},
  month = {Nov},
  doi = {10.1038/s41525-025-00534-z},
  pmid = {41253795},
  pmcid = {PMC12627670}
}`,
    pdfUrl: "https://doi.org/10.1038/s41525-025-00534-z",
    codeUrl: "https://github.com/frehburg",
    isPinnedDefault: true
  },
  {
    id: "rehburg2026forgetting",
    title: "Rule-Level Forgetting in Relational Neuro-Symbolic Graph Neural Networks",
    subtitle: "Computational Logic & Knowledge Representation",
    authors: ["Rehburg F", "Computational Logic Group"],
    institutions: ["ILLC, University of Amsterdam", "Vrije Universiteit Amsterdam"],
    venue: "arXiv Preprint (Under Review)",
    year: 2026,
    date: "January 2026",
    type: "preprint",
    topics: ["neuro-symbolic"],
    arxiv: "2601.08412",
    abstract: "Neuro-symbolic models integrate inductive learning with background deductive knowledge specified by Horn clauses in Datalog. When background domain knowledge evolves or privacy constraints require unlearning, standard weight retraction fails to eliminate deductive side effects. We introduce exact and approximate rule-level forgetting operators that invalidate rule-derivation subgraphs in GNN message-passing representations.",
    bibtex: `@article{Rehburg2026RuleForgetting,
  title = {Rule-Level Forgetting in Relational Neuro-Symbolic Graph Neural Networks},
  author = {Rehburg, Filip and Computational Logic Group},
  journal = {arXiv preprint arXiv:2601.08412},
  year = {2026}
}`,
    codeUrl: "https://github.com/frehburg",
    isPinnedDefault: true
  },
  {
    id: "graefe2025cdm",
    title: "An ontology-based rare disease common data model harmonising international registries, FHIR, and Phenopackets",
    subtitle: "Scientific Data · Nature Portfolio",
    authors: ["Graefe ASL", "Hübner MR", "Rehburg F", "Wagner M", "Thun S"],
    institutions: ["Berlin Institute of Health at Charité"],
    venue: "Scientific Data (Nature)",
    year: 2025,
    date: "February 8, 2025",
    type: "journal",
    topics: ["rare-disease"],
    doi: "10.1038/s41597-025-04558-z",
    pmid: "39922817",
    pmcid: "PMC11807222",
    abstract: "Harmonizing diverse phenotypic observation frameworks requires semantic interoperability across standard biomedical ontologies (SNOMED, HPO, ORDO). We define a modular Common Data Model (CDM) that maps seamlessly into FHIR resources and GA4GH phenopackets for cross-border genomic diagnostics.",
    bibtex: `@article{Graefe2025SciData,
  title = {An ontology-based rare disease common data model harmonising international registries, FHIR, and Phenopackets},
  author = {Graefe, A. S. L. and H{\\"u}bner, M. R. and Rehburg, Filip and Wagner, M. and Thun, S.},
  journal = {Scientific Data},
  volume = {12},
  number = {1},
  pages = {234},
  year = {2025},
  doi = {10.1038/s41597-025-04558-z},
  pmid = {39922817}
}`,
    pdfUrl: "https://doi.org/10.1038/s41597-025-04558-z"
  },
  {
    id: "rekerle2026ajhg",
    title: "GA4GH phenopacket-driven characterization of genotype-phenotype correlations in Mendelian disorders",
    subtitle: "The American Journal of Human Genetics",
    authors: ["Rekerle L", "Danis D", "Rehburg F", "Wagner M", "Robinson PN"],
    institutions: ["Jackson Laboratory for Genomic Medicine", "Charité Berlin"],
    venue: "The American Journal of Human Genetics (AJHG)",
    year: 2026,
    date: "January 8, 2026",
    type: "journal",
    topics: ["rare-disease"],
    doi: "10.1016/j.ajhg.2025.12.001",
    pmid: "41443197",
    pmcid: "PMC12824607",
    abstract: "Computational phenotype analysis in rare disease cases depends on machine-computable phenotypic abnormalities. We utilize a standardized corpus of Phenopackets to systematically evaluate phenotypic similarity scores against variant pathogenicity.",
    bibtex: `@article{Rekerle2026AJHG,
  title = {GA4GH phenopacket-driven characterization of genotype-phenotype correlations in Mendelian disorders},
  author = {Rekerle, L. and Danis, D. and Rehburg, Filip and Wagner, M. and Robinson, P. N.},
  journal = {The American Journal of Human Genetics},
  volume = {113},
  number = {1},
  pages = {57--70},
  year = {2026},
  doi = {10.1016/j.ajhg.2025.12.001}
}`
  },
  {
    id: "danis2025hgg",
    title: "A corpus of GA4GH phenopackets: Case-level phenotyping for genomic diagnostics and discovery",
    subtitle: "Human Genetics and Genomics Advances",
    authors: ["Danis D", "Bamshad MJ", "Bridges Y", "Rehburg F", "Robinson PN"],
    institutions: ["Jackson Laboratory", "Charité Berlin"],
    venue: "HGG Advances",
    year: 2025,
    date: "January 9, 2025",
    type: "journal",
    topics: ["rare-disease"],
    doi: "10.1016/j.xhgg.2024.100371",
    pmid: "39394689",
    pmcid: "PMC11564936",
    abstract: "A comprehensive public corpus of curated GA4GH Phenopackets capturing detailed patient clinical profiles, enabling automated phenotype matching algorithms and benchmark evaluations for rare disease informatics.",
    bibtex: `@article{Danis2025HGG,
  title = {A corpus of GA4GH phenopackets: Case-level phenotyping for genomic diagnostics and discovery},
  author = {Danis, D. and Bamshad, M. J. and Bridges, Y. and Rehburg, Filip and Robinson, P. N.},
  journal = {HGG Advances},
  volume = {6},
  number = {1},
  pages = {100371},
  year = {2025},
  doi = {10.1016/j.xhgg.2024.100371}
}`
  },
  {
    id: "rehburg2024shti",
    title: "How Interoperability Can Enable Artificial Intelligence in Clinical Applications",
    subtitle: "Studies in Health Technology and Informatics",
    authors: ["Rehburg F", "Graefe A", "Hübner M", "Thun S"],
    institutions: ["Berlin Institute of Health at Charité"],
    venue: "Stud Health Technol Inform (EFMI MIE)",
    year: 2024,
    date: "August 22, 2024",
    type: "conference",
    topics: ["rare-disease"],
    doi: "10.3233/shti240485",
    pmid: "39176813",
    abstract: "Synthesizing AI model pipelines with clinical health record data requires rigorous adherence to interoperable data models. We survey current bottlenecks in medical AI deployment and propose standardized schema translations.",
    bibtex: `@inproceedings{Rehburg2024InteroperabilityAI,
  title = {How Interoperability Can Enable Artificial Intelligence in Clinical Applications},
  author = {Rehburg, Filip and Graefe, A. and H{\\"u}bner, M. and Thun, S.},
  booktitle = {Studies in Health Technology and Informatics},
  volume = {316},
  pages = {596--600},
  year = {2024},
  doi = {10.3233/shti240485}
}`
  },
  {
    id: "graefe2024shti",
    title: "Review of Key Elements in Developing a Common Data Model for Rare Diseases: Identifying Common Success Factors",
    subtitle: "Studies in Health Technology and Informatics",
    authors: ["Graefe ASL", "Rehburg F", "Hübner M", "Thun S", "Beyan O"],
    institutions: ["Berlin Institute of Health at Charité"],
    venue: "Stud Health Technol Inform",
    year: 2024,
    date: "August 22, 2024",
    type: "conference",
    topics: ["rare-disease"],
    doi: "10.3233/shti240672",
    pmid: "39176641",
    abstract: "Analysis of 12 distinct international registry architectures identifying core structural factors that maximize clinical adoption, semantic fidelity, and automated data exchange.",
    bibtex: `@inproceedings{Graefe2024CDMReview,
  title = {Review of Key Elements in Developing a Common Data Model for Rare Diseases},
  author = {Graefe, A. S. L. and Rehburg, Filip and H{\\"u}bner, M. and Thun, S. and Beyan, O.},
  booktitle = {Studies in Health Technology and Informatics},
  volume = {316},
  pages = {1396--1400},
  year = {2024},
  doi = {10.3233/shti240672}
}`
  },
  {
    id: "rehburg2023ecgi",
    title: "Reconstruction of electrograms using a deep learning network trained on simulation data",
    subtitle: "Electrocardiographic Imaging Summit · Valencia, Spain",
    authors: ["Rehburg F", "Peeters R", "Wang T", "van Dam PM", "Bonizzi P", "Karel J"],
    institutions: ["Maastricht University", "Department of Advanced Computing Sciences"],
    venue: "Electrocardiographic Imaging Summit 2023 (Valencia)",
    year: 2023,
    date: "June 2023",
    type: "poster",
    topics: ["signal-deeplearning"],
    abstract: "Inverse electrocardiography (ECGI) aims to reconstruct non-invasive epicardial potentials from multi-electrode torso body surface potentials. We construct a 3D Graph Convolutional Autoencoder regularized by boundary element formulation that reconstructs cardiac activation maps accurately across synthetic human torsos.",
    bibtex: `@inproceedings{Rehburg2023ECGISummit,
  title = {Reconstruction of electrograms using a deep learning network trained on simulation data},
  author = {Rehburg, Filip and Peeters, Ralf and Wang, T. and van Dam, P. M. and Bonizzi, P. and Karel, Jo{\\"e}l},
  booktitle = {Electrocardiographic Imaging Summit 2023},
  address = {Valencia, Spain},
  year = {2023}
}`
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-gnn-forgetting",
    title: "Rule-Level Forgetting in Neuro-Symbolic GNNs",
    summary: "Deductive knowledge invalidation and unlearning in relational graph neural embeddings.",
    description: "Developing exact and approximate rule-level forgetting operators for Neuro-Symbolic Graph Neural Networks trained over relational Datalog datasets. Unlike standard data-instance unlearning, this approach removes specific Horn clause logical implications from model inference without requiring retraining from scratch.",
    category: "Neuro-Symbolic AI",
    period: "12/2023 – Present",
    affiliation: "ILLC & VU Amsterdam",
    tags: ["Neuro-Symbolic", "Datalog", "PyTorch Geometric", "Modal Logic", "Z3 SMT"],
    codeSnippet: {
      language: "typst / datalog",
      caption: "Rule forget operator and inductive gradient formulation",
      code: `// Rule to be forgotten from active knowledge base
#let rule_forget = [
  $forall x, y : "Ancestor"(x, y) arrow.l "Parent"(x, y)$
]
// Invalidation of Horn deduction trace in GNN message passing
$cal(O)_("forget")(G, cal(R)_i) arrow.r.double nabla_Theta cal(L)_("NS")(cal(R) setminus {cal(R)_i})$`
    },
    links: {
      github: "https://github.com/frehburg",
      paper: "#publications"
    },
    isPinnedDefault: true
  },
  {
    id: "proj-rarelink",
    title: "RareLink: REDCap to FHIR & Phenopackets Pipeline",
    summary: "Standardized biomedical ontology translational engine for multi-center rare disease registries.",
    description: "Architected and implemented RareLink at the Berlin Institute of Health at Charité. Translates complex REDCap clinical questionnaires into validated GA4GH Phenopackets Schema v2 and HL7 FHIR bundles. Deployed across several university medical centers in Germany to empower decentralized genetic cohort queries.",
    category: "Medical Informatics",
    period: "12/2023 – 12/2024",
    affiliation: "Berlin Institute of Health @ Charité",
    tags: ["HL7 FHIR", "Phenopackets", "REDCap API", "Python", "Ontologies"],
    codeSnippet: {
      language: "json",
      caption: "Phenopacket v2 clinical phenotypic feature fragment",
      code: `{
  "type": {
    "id": "HP:0001250",
    "label": "Seizure"
  },
  "excluded": false,
  "onset": { "age": { "iso8601duration": "P2Y" } }
}`
    },
    links: {
      github: "https://github.com/frehburg",
      paper: "https://doi.org/10.1038/s41525-025-00534-z"
    },
    isPinnedDefault: false
  },
  {
    id: "proj-ludii-nlp",
    title: "Ludii DSL Intelligent Code Completion",
    summary: "Transformer & syntactic n-gram models for domain-specific programming languages in game systems.",
    description: "Developed during the MaRBLe Honors program at Maastricht University. Integrated AST syntax trees with specialized token prediction models to provide sub-10ms latency intelligent autocomplete for game designers writing in the Ludii game description language.",
    category: "NLP & Grammars",
    period: "09/2021 – 07/2022",
    affiliation: "Ludii Research Group, Maastricht University",
    tags: ["Java", "Transformers", "ANTLR", "DSL", "MaRBLe"],
    links: {
      github: "https://github.com/frehburg",
      demo: "https://ludii.games"
    },
    isPinnedDefault: false
  },
  {
    id: "proj-ecgi-dl",
    title: "Inverse Electrocardiography via Mesh Graph Neural Solvers",
    summary: "Non-invasive reconstruction of cardiac electrograms using 3D boundary element representations.",
    description: "My Bachelor's thesis at Maastricht University. Solved the ill-posed inverse problem of electrocardiography by training graph convolutional neural networks on 30,000 synthesized patient heart-torso meshes to reconstruct cardiac transmembrane potentials with high spatial fidelity.",
    category: "Deep Learning & Signals",
    period: "09/2022 – 06/2023",
    affiliation: "DACS Maastricht University",
    tags: ["PyTorch", "Graph Neural Networks", "FEM / BEM", "Signal Processing"],
    links: {
      github: "https://github.com/frehburg"
    },
    isPinnedDefault: false
  }
];

export const NOTES_DATA: NotePost[] = [
  {
    id: "note-modal-neurosymbolic",
    title: "From Datalog to Graph Embeddings: Why Latent Representations Need Modal Logic",
    subtitle: "On the limits of pure connectionism for deductive reasoning over relational structures",
    date: "October 24, 2025",
    readingTime: "8 min read",
    category: "Logic & AI",
    tags: ["ModalLogic", "GNNs", "Datalog", "NeuroSymbolic", "ProofTheory"],
    summary: "Continuous deep representations excel at smooth interpolation over manifolds, but fail when strict deductive invariance and counterfactual proof traces are required. We demonstrate how viewing GNN message passing through modal Kripke frames yields strict bounds on reasoning depth.",
    typstSnippet: `#let gnn_modal_equiv = [
  $ h_v^((k+1)) = sigma ( W dot "AGG" ({ h_u^((k)) : u in cal(N)(v) }) ) <==> cal(M), w models Box phi $
]

*Theorem 1 (Rehburg, 2025)*: A $k$-hop Graph Neural Network computes a valuation over Kripke frames of bounded path depth $k$.`,
    content: `While continuous deep neural representations excel at statistical pattern generalization across massive manifolds, they inherently struggle with counterfactual deduction and strict invariance. By viewing graph message-passing layers as approximations of modal logic box operators (Box phi), we establish provable boundaries for inductive reasoning.

When background domain knowledge is represented as a set of definite Horn clauses:
  forall x, y: Ancestor(x, y) <- Parent(x, y)
  forall x, y, z: Ancestor(x, z) <- Parent(x, y) and Ancestor(y, z)

A standard message-passing neural network (MPNN) updates node states according to topological neighbors. If we interpret the graph as a Kripke frame <W, R> where worlds W correspond to graph vertices and accessibility relation R represents edges, then k message-passing iterations correspond to calculating satisfaction for modal formulae of modal depth at most k.

Furthermore, this connection allows us to formalize 'Rule-Level Forgetting'. When an axiom is retracted from the logical theory, we can prune derivation trees in polynomial time and compute minimal gradient updates on the neural weights without full catastrophic retraining.`,
    downloads: [
      {
        name: "modal-neurosymbolic-proofs",
        extension: "typ",
        content: `// Typst Document: Modal Logic & GNN Equivalence
#set page(paper: "a4", margin: 2.5cm)
#set text(font: "Newsreader", size: 11pt)

= From Datalog to Graph Embeddings
_Filip Rehburg · ILLC, University of Amsterdam_

== Abstract
We formalize graph neural message passing as evaluation over modal Kripke frames.

== 1. Formal Preliminaries
Let $cal(M) = (W, R, V)$ be a Kripke model.
A $k$-layer GNN implements:
$ h_v^((k+1)) = sigma ( W dot "AGG" ({ h_u^((k)) : u in cal(N)(v) }) ) $

Which satisfies $cal(M), w models Box^k phi$.
`
      }
    ],
    isPinnedDefault: true
  },
  {
    id: "note-rarelink-clinical",
    title: "RareLink: Building FHIR and Phenopackets Bridges for Rare Disease Cohorts",
    subtitle: "Practical lessons in medical data harmonization and automated ETL pipelines across German hospitals",
    date: "August 12, 2025",
    readingTime: "6 min read",
    category: "Medical Informatics",
    tags: ["HL7FHIR", "REDCap", "RareDiseases", "GA4GH", "Phenomics"],
    summary: "How to translate heterogeneous REDCap clinical forms into compliant GA4GH Phenopackets v2 and HL7 FHIR bundles without requiring enterprise-level hospital server installations.",
    content: `Standardization across European Reference Networks (ERNs) demands automated pipelines that bridge clinical questionnaires with genomic metadata. Here is an overview of the schema translation algorithms implemented in our NPJ Genomic Medicine framework.

1. Schema Mapping Layer: Decoupling hospital-specific instrument fields into semantic concepts using Human Phenotype Ontology (HPO), OMIM, and Orphanet codes.
2. Validation Layer: Performing real-time JSON-schema validation against GA4GH Phenopackets v2 before publishing to FHIR servers.
3. Privacy & Compliance: Ensuring cross-location cohort federations operate strictly on pseudo-anonymized phenotypic abstractions.`,
    downloads: [
      {
        name: "rarelink-architecture",
        extension: "typ",
        content: `// Typst Document: RareLink Architecture Specification
#set page(paper: "a4")
= RareLink Specification
Author: Filip Rehburg & Charité Research Team
`
      }
    ]
  },
  {
    id: "note-typst-academic-workflow",
    title: "A Minimal Typst Workflow for Academic GitHub Pages and Continuous CV Builds",
    subtitle: "Compiling research notes, resumes, and project portals with single-source Typst files",
    date: "June 18, 2025",
    readingTime: "5 min read",
    category: "Tooling & DevOps",
    tags: ["Typst", "StaticWeb", "GitHubPages", "DevOps"],
    summary: "How to configure continuous integration via GitHub Actions to compile Typst markup directly to PDF and inject semantic JSON fragments directly into your static web presentation.",
    content: `Typst offers speed, clean syntax, and programmatic styling that outclasses legacy LaTeX setups for modern researchers.

By setting up a GitHub Actions workflow:
- Whenever a commit is pushed to main, 'typst compile cv.typ cv.pdf' generates a publication-ready CV.
- A small Python script extracts metadata directly from Typst '#let' dictionaries and writes an updated 'publications.json'.
- GitHub Pages deploys the static single-page app instantly.`,
    downloads: [
      {
        name: "github-actions-typst-workflow",
        extension: "typ",
        content: `// Sample Typst config for GitHub Actions CI
#set text(font: "JetBrains Mono")
= Typst CI Pipeline Config
`
      }
    ]
  }
];
