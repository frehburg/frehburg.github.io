import React, { useState } from 'react';
import { Mail, Code, ExternalLink, GraduationCap, Pin, ArrowUpRight, BookOpen, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile.ts';
import { ColorTheme } from '../utils/theme.ts';
import { PinnedState, getPinnedItems, togglePin } from '../utils/pins.ts';

interface AboutSectionProps {
  currentTheme: ColorTheme;
  pinnedState: PinnedState;
  onUpdatePinnedState: (next: PinnedState) => void;
  onNavigateTab: (tabId: string) => void;
  onOpenBibtex: (id: string) => void;
  onOpenPinModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentTheme,
  pinnedState,
  onUpdatePinnedState,
  onNavigateTab,
  onOpenBibtex,
  onOpenPinModal,
}) => {
  const { publication, project, note } = getPinnedItems(pinnedState);

  const handleTogglePubPin = () => {
    if (publication) {
      const next = togglePin(publication.id, 'publication', pinnedState);
      onUpdatePinnedState(next);
    }
  };

  const handleToggleProjPin = () => {
    if (project) {
      const next = togglePin(project.id, 'project', pinnedState);
      onUpdatePinnedState(next);
    }
  };

  const handleToggleNotePin = () => {
    if (note) {
      const next = togglePin(note.id, 'note', pinnedState);
      onUpdatePinnedState(next);
    }
  };

  const [imageSrc, setImageSrc] = useState<string>(PROFILE_DATA.photoUrl);

  return (
    <div className="space-y-12">
      {/* Bento Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait Card with Meta Badge */}
        <div className="lg:col-span-4 bg-white p-6 border border-slate-200 rounded-xl shadow-xs">
          <div className="relative overflow-hidden rounded-lg aspect-square border border-slate-200 bg-slate-100">
            <img
              src={imageSrc}
              onError={() => {
                if (imageSrc !== PROFILE_DATA.fallbackPhotoUrl) {
                  setImageSrc(PROFILE_DATA.fallbackPhotoUrl);
                }
              }}
              alt={PROFILE_DATA.name}
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm border border-slate-200 px-2.5 py-1.5 rounded flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono-code text-[11px] font-medium text-blue-700 uppercase tracking-tight">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {PROFILE_DATA.statusBadge}
              </span>
              <span className="font-mono-code text-xs text-slate-500">
                {PROFILE_DATA.periodBadge}
              </span>
            </div>
          </div>

          {/* Academic Affiliation Details */}
          <div className="mt-5 space-y-2.5">
            <div className="flex items-center justify-between font-mono-code text-xs">
              <span className="text-slate-500">Institute:</span>
              <span className="font-medium text-slate-800">ILLC, UvA</span>
            </div>
            <div className="flex items-center justify-between font-mono-code text-xs">
              <span className="text-slate-500">Track:</span>
              <span className="font-medium text-slate-800">{PROFILE_DATA.track}</span>
            </div>
            <div className="flex items-center justify-between font-mono-code text-xs">
              <span className="text-slate-500">Committees:</span>
              <span className="font-medium text-slate-800">{PROFILE_DATA.committees}</span>
            </div>
            <div className="flex items-center justify-between font-mono-code text-xs">
              <span className="text-slate-500">Prior:</span>
              <span className="font-medium text-slate-800">{PROFILE_DATA.priorDegree}</span>
            </div>
          </div>

          {/* Contact & Scholarly Links Cluster */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap gap-2 font-mono-code text-xs">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors text-slate-700"
              title="Send academic email"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{PROFILE_DATA.email}</span>
            </a>

            <a
              href={PROFILE_DATA.orcidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:border-emerald-600 hover:text-emerald-700 transition-colors text-slate-700"
              title="ORCID Researcher Profile"
            >
              <span className="text-emerald-600 font-bold text-xs">iD</span>
              <span>{PROFILE_DATA.orcid}</span>
            </a>

            <a
              href={PROFILE_DATA.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:border-slate-900 hover:text-slate-900 transition-colors text-slate-700"
            >
              <Code className="w-3.5 h-3.5 text-slate-500" />
              <span>GitHub (frehburg)</span>
            </a>

            <a
              href={PROFILE_DATA.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:border-blue-700 hover:text-blue-700 transition-colors text-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PROFILE_DATA.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors text-slate-700"
            >
              <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
              <span>Google Scholar</span>
            </a>

            <a
              href={PROFILE_DATA.uvaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors text-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>UvA ILLC Profile</span>
            </a>
          </div>
        </div>

        {/* Right Column: Narrative Bio & Research Domains */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-xl space-y-6 shadow-xs">
            <div className="space-y-2">
              <p className="font-mono-code text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.accent }}>
                MSc Student in Logic & Computational Intelligence
              </p>
              <h1 className="font-serif-academic text-3xl sm:text-4xl text-slate-900 font-light leading-tight">
                Exploring the intersection of{' '}
                <em className="italic" style={{ color: currentTheme.accent }}>
                  Neuro-Symbolic AI
                </em>
                , Reasoning, and Logic.
              </h1>
            </div>

            <p className="font-serif-academic text-lg text-slate-700 leading-relaxed">
              {PROFILE_DATA.bioParagraph1}
            </p>

            <p className="font-sans-ui text-sm text-slate-600 leading-relaxed">
              {PROFILE_DATA.bioParagraph2}
            </p>

            {/* Research Domains Matrix */}
            <div className="pt-4 border-t border-slate-200">
              <h2 className="font-mono-code text-xs uppercase tracking-wider text-slate-500 mb-3">
                Core Research Domains
              </h2>
              <div className="flex flex-wrap gap-2">
                {PROFILE_DATA.researchDomains.map((domain) => (
                  <span
                    key={domain}
                    className="px-3 py-1.5 rounded bg-slate-50 border border-slate-200 font-mono-code text-xs text-slate-800 hover:border-slate-400 transition-colors"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PROFILE_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-slate-200 rounded-lg text-center shadow-2xs"
              >
                <div
                  className="font-serif-academic text-2xl font-semibold"
                  style={{ color: stat.highlight ? currentTheme.accent : currentTheme.contrast }}
                >
                  {stat.value}
                </div>
                <div className="font-mono-code text-xs text-slate-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CURATED HIGHLIGHTS SHOWCASE (PINNED ITEMS) */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="font-serif-academic text-2xl text-slate-900 font-normal">
              Curated Highlights & Featured Work
            </h2>
            <p className="font-mono-code text-xs text-slate-500 mt-0.5">
              Frontpage pinned entries across publications, active experiments, and notes.
            </p>
          </div>
          <button
            onClick={onOpenPinModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 font-mono-code transition-colors bg-white shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Configure Pins</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PINNED CARD 1: PUBLICATION */}
          {publication ? (
            <div className="bg-white p-6 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-blue-500 transition-all shadow-xs relative group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-code text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    {publication.venue.includes('NPJ') ? 'NPJ Genom Med 2025' : `${publication.venue} ${publication.year}`}
                  </span>
                  <button
                    onClick={handleTogglePubPin}
                    className="text-blue-600 hover:text-red-500 p-1"
                    title="Pinned item (click to unpin)"
                  >
                    <Pin className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="font-sans-ui text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                  <button onClick={() => onNavigateTab('publications')} className="text-left">
                    {publication.title}
                  </button>
                </h3>

                <p className="font-sans-ui text-xs text-slate-600 line-clamp-3">
                  {publication.abstract}
                </p>

                <div className="font-mono-code text-xs text-slate-500">
                  <strong className="text-slate-900 font-medium">Filip Rehburg</strong>, S. Graefe, M. Wagner, et al.
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between font-mono-code text-xs">
                {publication.doi ? (
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>DOI: {publication.doi.slice(0, 16)}...</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button onClick={() => onNavigateTab('publications')} className="text-blue-600 hover:underline">
                    View Paper
                  </button>
                )}

                <button
                  onClick={() => onOpenBibtex(publication.id)}
                  className="text-slate-500 hover:text-blue-600 cursor-pointer"
                >
                  [BibTeX]
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 border border-dashed border-slate-300 rounded-xl text-center flex flex-col justify-center items-center font-mono-code text-xs text-slate-400">
              <span>No publication pinned</span>
              <button onClick={onOpenPinModal} className="text-blue-600 hover:underline mt-2">Choose one</button>
            </div>
          )}

          {/* PINNED CARD 2: RESEARCH PROJECT */}
          {project ? (
            <div className="bg-white p-6 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-blue-500 transition-all shadow-xs relative group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-code text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    <BookOpen className="w-3 h-3" />
                    <span>{project.category}</span>
                  </span>
                  <button
                    onClick={handleToggleProjPin}
                    className="text-blue-600 hover:text-red-500 p-1"
                    title="Pinned item (click to unpin)"
                  >
                    <Pin className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="font-sans-ui text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                  <button onClick={() => onNavigateTab('projects')} className="text-left">
                    {project.title}
                  </button>
                </h3>

                <p className="font-sans-ui text-xs text-slate-600 line-clamp-3">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1 font-mono-code text-[11px] text-slate-600">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between font-mono-code text-xs">
                <button
                  onClick={() => onNavigateTab('projects')}
                  className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-800"
                  >
                    Code: GitHub
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 border border-dashed border-slate-300 rounded-xl text-center flex flex-col justify-center items-center font-mono-code text-xs text-slate-400">
              <span>No project pinned</span>
              <button onClick={onOpenPinModal} className="text-blue-600 hover:underline mt-2">Choose one</button>
            </div>
          )}

          {/* PINNED CARD 3: NOTE / ESSAY */}
          {note ? (
            <div className="bg-white p-6 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-blue-500 transition-all shadow-xs relative group">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-code text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                    <span>{note.category}</span>
                  </span>
                  <button
                    onClick={handleToggleNotePin}
                    className="text-blue-600 hover:text-red-500 p-1"
                    title="Pinned item (click to unpin)"
                  >
                    <Pin className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="font-sans-ui text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                  <button onClick={() => onNavigateTab('notes')} className="text-left">
                    {note.title}
                  </button>
                </h3>

                <p className="font-sans-ui text-xs text-slate-600 line-clamp-3">
                  {note.summary}
                </p>

                <div className="font-mono-code text-xs text-slate-500 flex items-center gap-2">
                  <span>{note.date.split(',')[0]}</span>
                  <span>·</span>
                  <span>{note.readingTime}</span>
                  <span>·</span>
                  <span className="text-blue-600">Typst Source</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between font-mono-code text-xs">
                <button
                  onClick={() => onNavigateTab('notes')}
                  className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Read Note</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-400">[PDF + .typ]</span>
              </div>
            </div>
          ) : (
            <div className="p-6 border border-dashed border-slate-300 rounded-xl text-center flex flex-col justify-center items-center font-mono-code text-xs text-slate-400">
              <span>No note pinned</span>
              <button onClick={onOpenPinModal} className="text-blue-600 hover:underline mt-2">Choose one</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
