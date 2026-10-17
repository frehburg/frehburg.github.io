import React, { useState } from 'react';
import { Code, X, Copy, Check, Download } from 'lucide-react';
import { getCustomizedTypstCV, downloadTextFile } from '../utils/typst.ts';
import { ColorTheme } from '../utils/theme.ts';

interface TypstModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ColorTheme;
}

export const TypstModal: React.FC<TypstModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const typstCode = getCustomizedTypstCV(currentTheme);

  const handleCopy = () => {
    navigator.clipboard.writeText(typstCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadTextFile('cv.typ', typstCode, 'text/plain');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-xl max-w-3xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" style={{ color: currentTheme.accent }} />
            <div>
              <h2 className="font-serif-academic text-xl font-medium text-slate-900">
                Academic Typst CV Source
              </h2>
              <p className="font-mono-code text-[11px] text-slate-500">
                Package: <code className="text-blue-600">@preview/acadennial-cv:0.1.0</code>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="font-sans-ui text-xs text-slate-600 shrink-0">
          This Typst markup compiles directly using <code className="bg-slate-100 px-1 py-0.5 rounded font-mono-code text-slate-800">typst compile cv.typ</code> into your official Academic CV:
        </p>

        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-lg bg-slate-50 p-4">
          <pre className="font-mono-code text-xs text-slate-800 whitespace-pre leading-relaxed">
            {typstCode}
          </pre>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200 font-mono-code text-xs shrink-0">
          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded border border-slate-300 text-slate-800 hover:border-slate-800 transition-colors flex items-center gap-1.5 bg-white shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Download cv.typ</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded text-white flex items-center gap-1.5 font-medium transition-all"
              style={{ backgroundColor: currentTheme.accent }}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
