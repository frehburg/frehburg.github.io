import React from 'react';
import { Download, Printer, Code, GraduationCap, Briefcase, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile.ts';
import { ColorTheme } from '../utils/theme.ts';

interface CvSectionProps {
  currentTheme: ColorTheme;
  onDownloadPdf: () => void;
  onViewTypstSource: () => void;
}

export const CvSection: React.FC<CvSectionProps> = ({
  currentTheme,
  onDownloadPdf,
  onViewTypstSource,
}) => {
  return (
    <div className="space-y-8">
      {/* Academic CV Header & Actions */}
      <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.accent }}>
            <GraduationCap className="w-4 h-4" />
            <span>Curriculum Vitae</span>
          </div>
          <h1 className="font-serif-academic text-3xl text-slate-900 mt-1">
            {PROFILE_DATA.name}
          </h1>
          <p className="font-sans-ui text-xs text-slate-600 mt-1">
            {PROFILE_DATA.institution} · Formatted via Typst <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono-code text-[11px] text-slate-700">@preview/acadennial-cv:0.1.0</code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded border border-slate-300 font-mono-code text-xs text-slate-700 hover:border-slate-800 hover:text-slate-900 transition-colors flex items-center gap-1.5 bg-white shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print CV</span>
          </button>

          <button
            onClick={onViewTypstSource}
            className="px-3 py-1.5 rounded border border-slate-300 font-mono-code text-xs text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 bg-white shadow-2xs"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Typst Source</span>
          </button>

          <button
            onClick={onDownloadPdf}
            className="px-4 py-1.5 rounded text-white font-mono-code text-xs transition-colors flex items-center gap-1.5 shadow-sm hover:opacity-90"
            style={{ backgroundColor: currentTheme.contrast }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* CV Grid Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column: Timeline (Education & Experience) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Education Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <GraduationCap className="w-5 h-5 text-blue-600" style={{ color: currentTheme.accent }} />
              <h2 className="font-serif-academic text-xl font-medium text-slate-900">
                Education
              </h2>
            </div>

            <div className="space-y-6">
              {/* Item 1: MSc Logic */}
              <div className="relative pl-6 border-l-2 border-blue-600 space-y-1" style={{ borderColor: currentTheme.accent }}>
                <div className="flex flex-wrap items-center justify-between font-mono-code text-xs">
                  <span className="font-semibold text-slate-900">MSc in Logic (Master of Logic)</span>
                  <span className="font-medium text-blue-600" style={{ color: currentTheme.accent }}>
                    09/2025 – Present
                  </span>
                </div>
                <div className="font-sans-ui text-xs text-slate-600">
                  <strong>Institute for Logic, Language and Computation (ILLC)</strong>, University of Amsterdam, Netherlands
                </div>
                <p className="font-sans-ui text-xs text-slate-600 pt-1 leading-relaxed">
                  Track: <em>Computation</em>. Focus on Neuro-symbolic integration, proof theory, computational complexity, and modal logic. Appointed member of the ILLC Diversity Committee.
                </p>
              </div>

              {/* Item 2: BSc Maastricht */}
              <div className="relative pl-6 border-l-2 border-slate-200 space-y-1">
                <div className="flex flex-wrap items-center justify-between font-mono-code text-xs">
                  <span className="font-semibold text-slate-900">BSc (Honors) in Data Science & Artificial Intelligence</span>
                  <span className="text-slate-500">09/2020 – 06/2023</span>
                </div>
                <div className="font-sans-ui text-xs text-slate-600">
                  <strong>Department of Advanced Computing Sciences</strong>, Maastricht University, Netherlands
                </div>
                <p className="font-sans-ui text-xs text-slate-600 pt-1 leading-relaxed">
                  <em>Thesis:</em> Electrocardiographic Imaging of Synthesized Human Data Using Deep Learning. Supervised by Prof. Ralf Peeters and Dr. Joël Karel. Selected for the MaRBLe Honors program (top 4 of 15).
                </p>
              </div>

              {/* Item 3: Exchange CityU HK */}
              <div className="relative pl-6 border-l-2 border-slate-200 space-y-1">
                <div className="flex flex-wrap items-center justify-between font-mono-code text-xs">
                  <span className="font-semibold text-slate-900">Exchange Semester (Department of Data Science)</span>
                  <span className="text-slate-500">08/2022 – 12/2022</span>
                </div>
                <div className="font-sans-ui text-xs text-slate-600">
                  <strong>City University of Hong Kong</strong>, Kowloon, Hong Kong SAR
                </div>
                <p className="font-sans-ui text-xs text-slate-600 pt-1 leading-relaxed">
                  Selected through competitive university-wide bilateral exchange scheme (3/100+ applicants). Focused on advanced machine learning, stochastic processes, and financial data analytics.
                </p>
              </div>
            </div>
          </section>

          {/* Research & Professional Appointments */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <Briefcase className="w-5 h-5 text-blue-600" style={{ color: currentTheme.accent }} />
              <h2 className="font-serif-academic text-xl font-medium text-slate-900">
                Research & Work Experience
              </h2>
            </div>

            <div className="space-y-6">
              {PROFILE_DATA.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-200 space-y-1">
                  <div className="flex flex-wrap items-center justify-between font-mono-code text-xs">
                    <span className="font-semibold text-slate-900">{exp.role}</span>
                    <span className="text-slate-500">{exp.period}</span>
                  </div>
                  <div className="font-sans-ui text-xs text-slate-600">
                    <strong>{exp.institution}</strong>, {exp.location}
                  </div>
                  <p className="font-sans-ui text-xs text-slate-600 pt-1 leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.tags && (
                    <div className="flex flex-wrap gap-1 pt-1.5 font-mono-code text-[11px] text-slate-500">
                      {exp.tags.map(t => (
                        <span key={t} className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column: Coursework, Honors & Skills */}
        <div className="lg:col-span-4 space-y-6">
          {/* Key Graduate Coursework Card with Grades */}
          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <h3 className="font-sans-ui text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" style={{ color: currentTheme.accent }} />
              <span>Relevant Coursework & Marks</span>
            </h3>
            <div className="space-y-2.5 font-mono-code text-xs">
              {PROFILE_DATA.courses.map((course) => (
                <div
                  key={course.code}
                  className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="truncate mr-2">
                    <span className="text-slate-400 mr-1 text-[11px]">{course.code}:</span>
                    <span className="text-slate-800">{course.name}</span>
                  </div>
                  <span className="font-bold text-blue-600 shrink-0" style={{ color: currentTheme.accent }}>
                    {course.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Recognitions */}
          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <h3 className="font-sans-ui text-sm font-semibold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500" />
              <span>Honors & Recognitions</span>
            </h3>
            <ul className="space-y-3 font-sans-ui text-xs text-slate-600">
              {PROFILE_DATA.awards.map((aw, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono-code font-bold text-slate-800 bg-slate-100 px-1 rounded text-[11px] shrink-0 mt-0.5">
                    {aw.metric}
                  </span>
                  <span>
                    <strong>{aw.title}:</strong> {aw.subtitle}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical & Formal Stack */}
          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4 shadow-xs">
            <h3 className="font-sans-ui text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-600" style={{ color: currentTheme.accent }} />
              <span>Formal & Technical Skills</span>
            </h3>
            <div className="space-y-3 font-mono-code text-xs">
              <div>
                <span className="text-slate-500 block text-[11px] mb-1">Formalisms & Logic:</span>
                <span className="text-slate-800 font-sans-ui text-xs">
                  {PROFILE_DATA.technicalSkills.formalisms.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] mb-1">Languages & Machine Learning:</span>
                <span className="text-slate-800 font-sans-ui text-xs">
                  {PROFILE_DATA.technicalSkills.programming.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] mb-1">Standards & Clinical Formats:</span>
                <span className="text-slate-800 font-sans-ui text-xs">
                  {PROFILE_DATA.technicalSkills.medicalStandards.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] mb-1">Publishing & Systems:</span>
                <span className="text-slate-800 font-sans-ui text-xs">
                  {PROFILE_DATA.technicalSkills.tooling.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
