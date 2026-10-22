import React, { useState } from 'react';
import { Quote, X, Copy, Check } from 'lucide-react';
import { PUBLICATIONS_DATA } from '../data/profile.ts';
import { ColorTheme } from '../utils/theme.ts';

interface BibtexModalProps {
  publicationId: string | null;
  onClose: () => void;
  currentTheme: ColorTheme;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({
  publicationId,
  onClose,
  currentTheme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!publicationId) return null;

  const pub = PUBLICATIONS_DATA.find((p) => p.id === publicationId) || PUBLICATIONS_DATA[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-xl max-w-xl w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-blue-600" style={{ color: currentTheme.accent }} />
            <h2 className="font-serif-academic text-xl font-medium text-slate-900">
              BibTeX Citation
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="font-sans-ui text-xs text-slate-600">
          Standard academic citation entry for <em>{pub.title}</em>:
        </p>

        <pre className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono-code text-[11px] text-slate-800 overflow-x-auto whitespace-pre leading-relaxed">
          {pub.bibtex}
        </pre>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-mono-code text-xs">
          <span className="text-emerald-700 text-xs">
            {copied ? 'Copied to clipboard!' : ''}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded text-white flex items-center gap-1.5 font-medium transition-all"
              style={{ backgroundColor: currentTheme.accent }}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy BibTeX'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
