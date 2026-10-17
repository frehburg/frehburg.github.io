import React from 'react';
import { Pin, X, Check, BookOpen, Layers, FileText } from 'lucide-react';
import { PUBLICATIONS_DATA, PROJECTS_DATA, NOTES_DATA } from '../data/profile.ts';
import { PinnedState, savePinnedState } from '../utils/pins.ts';
import { ColorTheme } from '../utils/theme.ts';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  pinnedState: PinnedState;
  onUpdatePinnedState: (next: PinnedState) => void;
  currentTheme: ColorTheme;
}

export const PinModal: React.FC<PinModalProps> = ({
  isOpen,
  onClose,
  pinnedState,
  onUpdatePinnedState,
  currentTheme,
}) => {
  if (!isOpen) return null;

  const handleSelectPub = (id: string) => {
    const next = { ...pinnedState, publicationId: id };
    savePinnedState(next);
    onUpdatePinnedState(next);
  };

  const handleSelectProj = (id: string) => {
    const next = { ...pinnedState, projectId: id };
    savePinnedState(next);
    onUpdatePinnedState(next);
  };

  const handleSelectNote = (id: string) => {
    const next = { ...pinnedState, noteId: id };
    savePinnedState(next);
    onUpdatePinnedState(next);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-xl max-w-xl w-full p-6 shadow-xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Pin className="w-5 h-5 text-blue-600" style={{ color: currentTheme.accent }} />
            <h2 className="font-serif-academic text-xl font-medium text-slate-900">
              Curate Frontpage Highlights
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="font-sans-ui text-xs text-slate-600">
          Select which work to showcase under "Curated Highlights" on your frontpage. You can choose one primary entry per section or toggle them anytime.
        </p>

        {/* 1. Select Featured Publication */}
        <div className="space-y-2">
          <label className="font-mono-code text-xs uppercase font-semibold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>1. Featured Research Publication</span>
          </label>
          <div className="space-y-1.5 font-sans-ui text-xs">
            {PUBLICATIONS_DATA.map((pub) => {
              const isSelected = pinnedState.publicationId === pub.id;
              return (
                <div
                  key={pub.id}
                  onClick={() => handleSelectPub(pub.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 shadow-2xs font-medium text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/40'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 font-mono-code text-[11px]">
                      <span className="text-blue-700 font-semibold">{pub.venue} ({pub.year})</span>
                    </div>
                    <div className="font-semibold text-slate-900">{pub.title}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-md">{pub.abstract}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Select Featured Project */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="font-mono-code text-xs uppercase font-semibold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>2. Featured Research Project</span>
          </label>
          <div className="space-y-1.5 font-sans-ui text-xs">
            {PROJECTS_DATA.map((proj) => {
              const isSelected = pinnedState.projectId === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProj(proj.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 shadow-2xs font-medium text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/40'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-mono-code text-[11px] text-slate-500">{proj.category} · {proj.affiliation}</div>
                    <div className="font-semibold text-slate-900">{proj.title}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-md">{proj.summary}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Select Featured Note */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="font-mono-code text-xs uppercase font-semibold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Featured Research Note / Blogpost</span>
          </label>
          <div className="space-y-1.5 font-sans-ui text-xs">
            {NOTES_DATA.map((note) => {
              const isSelected = pinnedState.noteId === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 shadow-2xs font-medium text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/40'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-mono-code text-[11px] text-slate-500">{note.category} · {note.date}</div>
                    <div className="font-semibold text-slate-900">{note.title}</div>
                    <div className="text-[11px] text-slate-500 truncate max-w-md">{note.subtitle}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end pt-3 border-t border-slate-200 font-mono-code text-xs">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded text-white font-medium"
            style={{ backgroundColor: currentTheme.contrast }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
