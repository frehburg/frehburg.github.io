import React, { useState } from 'react';
import { NOTES_DATA, NotePost } from '../data/profile.ts';
import { ColorTheme } from '../utils/theme.ts';
import { PinnedState, isItemPinned, togglePin } from '../utils/pins.ts';
import { downloadTextFile } from '../utils/typst.ts';
import { Pin, Download, Calendar, Clock, ChevronDown, ChevronUp, FileCode, Check } from 'lucide-react';

interface NotesSectionProps {
  currentTheme: ColorTheme;
  pinnedState: PinnedState;
  onUpdatePinnedState: (next: PinnedState) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  currentTheme,
  pinnedState,
  onUpdatePinnedState,
}) => {
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({
    'note-modal-neurosymbolic': true // Default open the first note
  });
  const [downloadedFeedback, setDownloadedFeedback] = useState<Record<string, boolean>>({});

  const toggleNote = (id: string) => {
    setExpandedNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTogglePin = (id: string) => {
    const next = togglePin(id, 'note', pinnedState);
    onUpdatePinnedState(next);
  };

  const handleDownloadFile = (dl: { name: string; extension: string; content: string }) => {
    downloadTextFile(`${dl.name}.${dl.extension}`, dl.content, 'text/plain');
    setDownloadedFeedback(prev => ({ ...prev, [dl.name]: true }));
    setTimeout(() => {
      setDownloadedFeedback(prev => ({ ...prev, [dl.name]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-xl space-y-2 shadow-xs">
        <div className="font-mono-code text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.accent }}>
          Academic Notebook & Essays
        </div>
        <h1 className="font-serif-academic text-3xl text-slate-900">
          Research Notes & Technical Writings
        </h1>
        <p className="font-sans-ui text-xs text-slate-600">
          Authored in Typst, discussing neuro-symbolic logic, rare disease data architectures, and academic workflows.
        </p>
      </div>

      {/* List of Blogposts */}
      <div className="space-y-6">
        {NOTES_DATA.map((note) => {
          const isPinned = isItemPinned(note.id, pinnedState);
          const isExpanded = !!expandedNotes[note.id];

          return (
            <article
              key={note.id}
              className="bg-white p-6 md:p-8 border border-slate-200 rounded-xl space-y-4 hover:border-blue-500 transition-all shadow-xs"
            >
              {/* Meta bar: Date, read time, category, pin */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono-code text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="font-semibold text-slate-800">{note.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{note.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{note.readingTime}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePin(note.id)}
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

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-serif-academic text-2xl font-normal text-slate-900 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => toggleNote(note.id)}>
                  {note.title}
                </h2>
                <p className="font-sans-ui text-xs text-slate-500 mt-1">
                  {note.subtitle}
                </p>
              </div>

              {/* Summary */}
              <p className="font-serif-academic text-base text-slate-700 leading-relaxed">
                {note.summary}
              </p>

              {/* Typst Mathematical snippet */}
              {note.typstSnippet && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono-code text-xs text-slate-800 space-y-2 overflow-x-auto">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold flex items-center justify-between">
                    <span>// Typst Equation & Theorem Formulation</span>
                    <span className="text-blue-600">typeset in Typst</span>
                  </div>
                  <pre className="text-slate-800 leading-relaxed whitespace-pre font-mono-code text-[11px]">
                    {note.typstSnippet}
                  </pre>
                </div>
              )}

              {/* Expanded Full Content */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-200 space-y-4 font-serif-academic text-slate-800 text-base leading-relaxed animate-in fade-in duration-150">
                  <div className="whitespace-pre-line bg-slate-50/50 p-4 rounded-lg border border-slate-100 font-sans-ui text-xs text-slate-700">
                    {note.content}
                  </div>

                  {/* Possible Downloads */}
                  {note.downloads && note.downloads.length > 0 && (
                    <div className="pt-2">
                      <div className="font-mono-code text-xs uppercase text-slate-500 font-semibold mb-2">
                        Attached Downloads & Typst Files:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {note.downloads.map((dl) => {
                          const isCopied = !!downloadedFeedback[dl.name];
                          return (
                            <button
                              key={dl.name}
                              onClick={() => handleDownloadFile(dl)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-slate-300 hover:border-blue-600 hover:text-blue-600 font-mono-code text-xs text-slate-700 transition-colors shadow-2xs"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5 text-blue-600" />}
                              <span>{dl.name}.{dl.extension}</span>
                              <span className="text-slate-400 text-[10px]">[{dl.extension.toUpperCase()}]</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer row: Tags and Toggle Action */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 font-mono-code text-xs">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((t) => (
                    <span key={t} className="text-slate-500 text-xs mr-2">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleNote(note.id)}
                  className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>{isExpanded ? 'Collapse Post' : 'Read Full Note'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
