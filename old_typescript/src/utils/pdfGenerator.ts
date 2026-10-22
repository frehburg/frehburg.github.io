import { jsPDF } from 'jspdf';
import { PROFILE_DATA } from '../data/profile.ts';
import { ColorTheme } from './theme.ts';

export function generateAcademicCvPdf(theme?: ColorTheme): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Primary colors
  const accentHex = theme?.accent || '#2563eb';
  const contrastHex = theme?.contrast || '#0f172a';

  // Helper for text
  const addHeader = (text: string) => {
    if (y > 750) {
      doc.addPage();
      y = margin;
    }
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(accentHex);
    doc.text(text.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(200, 205, 215);
    doc.setLineWidth(0.75);
    doc.line(margin, y, margin + contentWidth, y);
    y += 14;
    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(contrastHex);
  };

  // Header Title
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(contrastHex);
  doc.text(PROFILE_DATA.name, margin, y);
  y += 18;

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(90, 95, 110);
  doc.text(`${PROFILE_DATA.currentRole} · ${PROFILE_DATA.institution}`, margin, y);
  y += 14;

  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 70, 100);
  doc.text(`${PROFILE_DATA.email}  |  ORCID: ${PROFILE_DATA.orcid}  |  github.com/frehburg`, margin, y);
  y += 20;

  // CURRENT EDUCATION
  addHeader('Current Education');
  doc.setFont('times', 'bold');
  doc.text('Institute for Logic, Language and Computation (ILLC), University of Amsterdam', margin, y);
  doc.setFont('times', 'normal');
  doc.text('Amsterdam, NL  |  09/2025 – Present', margin + contentWidth - 170, y);
  y += 13;
  doc.text('MSc in Logic — Computation Track. Member of the ILLC Diversity Committee.', margin + 10, y);
  y += 18;

  // PRIOR EDUCATION
  addHeader('Prior Education');
  doc.setFont('times', 'bold');
  doc.text('Maastricht University — BSc (Honors) Data Science & AI', margin, y);
  doc.setFont('times', 'normal');
  doc.text('Maastricht, NL  |  09/2020 – 06/2023', margin + contentWidth - 170, y);
  y += 13;
  doc.text('Thesis: Electrocardiographic Imaging of Synthesized Human Data Using Deep Learning.', margin + 10, y);
  y += 12;
  doc.text('Advisors: Prof. Ralf Peeters and Dr. Joël Karel. MaRBLe Honors Program (Selected 4/15).', margin + 10, y);
  y += 16;

  doc.setFont('times', 'bold');
  doc.text('City University of Hong Kong — Department of Data Science (Exchange Semester)', margin, y);
  doc.setFont('times', 'normal');
  doc.text('Hong Kong  |  08/2022 – 12/2022', margin + contentWidth - 150, y);
  y += 13;
  doc.text('Competitive merit exchange selection (3 / 100+ candidates). Advanced Machine Learning.', margin + 10, y);
  y += 18;

  // RESEARCH INTERESTS
  addHeader('Research Interests');
  doc.text('Reasoning, Neuro-Symbolic AI, Deep Learning, Graph Neural Networks (GNNs),', margin, y);
  y += 13;
  doc.text('Knowledge Representation, Datalog, Modal Logic, Clinical Data Interoperability (FHIR / Phenopackets).', margin, y);
  y += 18;

  // RELEVANT COURSES
  addHeader('Relevant Graduate Coursework & Marks');
  PROFILE_DATA.courses.slice(0, 4).forEach(c => {
    doc.setFont('courier', 'bold');
    doc.text(c.code, margin + 5, y);
    doc.setFont('times', 'normal');
    doc.text(c.name, margin + 85, y);
    doc.setFont('times', 'bold');
    doc.setTextColor(accentHex);
    doc.text(c.grade, margin + contentWidth - 45, y);
    doc.setTextColor(contrastHex);
    y += 13;
  });
  y += 8;

  // EXPERIENCE
  addHeader('Research & Work Experience');
  PROFILE_DATA.experience.forEach(exp => {
    if (y > 740) {
      doc.addPage();
      y = margin;
    }
    doc.setFont('times', 'bold');
    doc.text(`${exp.role} — ${exp.institution}`, margin, y);
    doc.setFont('times', 'normal');
    doc.text(exp.period, margin + contentWidth - 110, y);
    y += 13;
    const splitDesc = doc.splitTextToSize(exp.description, contentWidth - 20);
    doc.text(splitDesc, margin + 10, y);
    y += splitDesc.length * 11 + 6;
  });

  // AWARDS & HONORS
  addHeader('Awards and Honors');
  PROFILE_DATA.awards.forEach(aw => {
    doc.setFont('courier', 'bold');
    doc.text(aw.metric, margin + 5, y);
    doc.setFont('times', 'normal');
    doc.text(`${aw.title} (${aw.subtitle})`, margin + 65, y);
    y += 13;
  });
  y += 10;

  // PUBLICATIONS
  if (y > 680) {
    doc.addPage();
    y = margin;
  }
  addHeader('Key Publications & Preprints');
  
  const pubItems = [
    "Graefe ASL, Rehburg F, Alkarkoukly S, et al. RareLink: scalable REDCap-based framework for rare disease interoperability. NPJ Genom Med. 2025;10(1):72. doi: 10.1038/s41525-025-00534-z",
    "Rehburg F, Computational Logic Group. Rule-Level Forgetting in Relational Neuro-Symbolic Graph Neural Networks. arXiv preprint. 2026.",
    "Graefe ASL, Hübner MR, Rehburg F, et al. An ontology-based rare disease common data model harmonising registries, FHIR, and Phenopackets. Sci Data. 2025;12(1):234.",
    "Rekerle L, Danis D, Rehburg F, et al. GA4GH phenopacket-driven characterization of genotype-phenotype correlations. Am J Hum Genet. 2026;113(1):57-70.",
    "Danis D, ..., Rehburg F, et al. A corpus of GA4GH phenopackets. HGG Adv. 2025;6(1):100371.",
    "Rehburg F, Graefe A, Hübner M, Thun S. How Interoperability Can Enable Artificial Intelligence in Clinical Applications. Stud Health Technol Inform. 2024;316:596-600."
  ];

  pubItems.forEach((p, idx) => {
    if (y > 760) {
      doc.addPage();
      y = margin;
    }
    const splitPub = doc.splitTextToSize(`[${idx + 1}]  ${p}`, contentWidth);
    doc.text(splitPub, margin, y);
    y += splitPub.length * 11 + 4;
  });

  doc.save('Filip_Rehburg_CV.pdf');
}
