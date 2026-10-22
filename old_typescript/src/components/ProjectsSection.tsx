import React from 'react';
import { PROJECTS_DATA, Project } from '../data/profile.ts';
import { ColorTheme } from '../utils/theme.ts';
import { PinnedState, isItemPinned, togglePin } from '../utils/pins.ts';
import { Pin, Code, ExternalLink, BookOpen, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  currentTheme: ColorTheme;
  pinnedState: PinnedState;
  onUpdatePinnedState: (next: PinnedState) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  currentTheme,
  pinnedState,
  onUpdatePinnedState,
  onNavigateTab,
}) => {
  const handleTogglePin = (id: string) => {
    const next = togglePin(id, 'project', pinnedState);
    onUpdatePinnedState(next);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-xl space-y-2 shadow-xs">
        <div className="font-mono-code text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.accent }}>
          Research & Systems
        </div>
        <h1 className="font-serif-academic text-3xl text-slate-900">
          Projects & Formal Architectures
        </h1>
        <p className="font-sans-ui text-xs text-slate-600">
          Open-source neuro-symbolic algorithms, clinical semantic pipelines, and machine learning models.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS_DATA.map((proj) => {
          const isPinned = isItemPinned(proj.id, pinnedState);

          return (
            <div
              key={proj.id}
              className="bg-white p-6 border border-slate-200 rounded-xl space-y-4 flex flex-col justify-between hover:border-blue-500 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-code text-xs">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{proj.period}</span>
                    <button
                      onClick={() => handleTogglePin(proj.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs transition-colors ${
                        isPinned
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                          : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800'
                      }`}
                      title={isPinned ? "Pinned to Frontpage" : "Pin to Frontpage Curated Highlights"}
                    >
                      <Pin className={`w-3 h-3 ${isPinned ? 'fill-current text-blue-600' : ''}`} />
                      <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                    </button>
                  </div>
                </div>

                <h2 className="font-sans-ui text-lg font-semibold text-slate-900">
                  {proj.title}
                </h2>

                <div className="font-mono-code text-[11px] text-slate-500">
                  Affiliation: <span className="text-slate-700 font-medium">{proj.affiliation}</span>
                </div>

                <p className="font-sans-ui text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>

                {/* Optional code/formula preview snippet */}
                {proj.codeSnippet && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono-code text-[11px] text-slate-800 space-y-1 overflow-x-auto">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">
                      // {proj.codeSnippet.caption}
                    </div>
                    <pre className="whitespace-pre leading-relaxed text-slate-700">
                      {proj.codeSnippet.code}
                    </pre>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 font-mono-code text-[11px] text-slate-600 pt-1">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-50 rounded border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono-code text-xs">
                <div className="flex items-center gap-3">
                  {proj.links.github && (
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {proj.links.paper && (
                    <button
                      onClick={() => onNavigateTab('publications')}
                      className="text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Paper</span>
                    </button>
                  )}

                  {proj.links.demo && (
                    <a
                      href={proj.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Portal</span>
                    </a>
                  )}
                </div>

                <span className="text-slate-400 text-[11px]">
                  PyG & Datalog
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
