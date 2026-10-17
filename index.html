import React, { useState, useEffect } from 'react';
import { Palette, X, Copy, Check, RotateCcw } from 'lucide-react';
import { ColorTheme, THEME_PRESETS, generateTypstThemeCode } from '../utils/theme.ts';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ColorTheme;
  onSaveTheme: (theme: ColorTheme) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSaveTheme,
}) => {
  const [mainColor, setMainColor] = useState(currentTheme.main);
  const [accentColor, setAccentColor] = useState(currentTheme.accent);
  const [contrastColor, setContrastColor] = useState(currentTheme.contrast);
  const [copiedTypst, setCopiedTypst] = useState(false);

  useEffect(() => {
    setMainColor(currentTheme.main);
    setAccentColor(currentTheme.accent);
    setContrastColor(currentTheme.contrast);
  }, [currentTheme]);

  if (!isOpen) return null;

  const activeThemeState: ColorTheme = {
    name: "Custom Theme",
    main: mainColor,
    accent: accentColor,
    contrast: contrastColor,
    surface: mainColor === '#ffffff' ? '#f8fafc' : mainColor,
    border: '#e2e8f0'
  };

  const typstCode = generateTypstThemeCode(activeThemeState);

  const handleApplyPreset = (preset: ColorTheme) => {
    setMainColor(preset.main);
    setAccentColor(preset.accent);
    setContrastColor(preset.contrast);
    onSaveTheme(preset);
  };

  const handleSave = () => {
    onSaveTheme(activeThemeState);
    onClose();
  };

  const handleCopyTypst = () => {
    navigator.clipboard.writeText(typstCode);
    setCopiedTypst(true);
    setTimeout(() => setCopiedTypst(false), 2000);
  };

  const handleResetDefault = () => {
    handleApplyPreset(THEME_PRESETS[0]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600" style={{ color: accentColor }} />
            <h2 className="font-serif-academic text-xl font-medium text-slate-900">
              Central Color Scheme & Typst Theme
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="font-sans-ui text-xs text-slate-600 leading-relaxed">
          Configure the global palette across your portfolio and generate corresponding Typst variables for export.
        </p>

        {/* Presets */}
        <div className="space-y-2">
          <label className="font-mono-code text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
            Academic Palette Presets
          </label>
          <div className="grid grid-cols-2 gap-2 font-mono-code text-xs">
            {THEME_PRESETS.map((p) => {
              const isSelected = mainColor === p.main && accentColor === p.accent;
              return (
                <button
                  key={p.name}
                  onClick={() => handleApplyPreset(p)}
                  className={`p-2.5 rounded border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-2xs font-semibold text-slate-900'
                      : 'border-slate-200 hover:border-slate-400 text-slate-700 bg-white'
                  }`}
                >
                  <span className="truncate mr-2">{p.name.split('(')[0]}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: p.accent }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Hex Pickers */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {/* Main Color */}
          <div className="space-y-1">
            <label className="font-mono-code text-[11px] text-slate-500 block">
              Main (Background)
            </label>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded p-1.5 bg-slate-50">
              <input
                type="color"
                value={mainColor}
                onChange={(e) => {
                  setMainColor(e.target.value);
                  onSaveTheme({ ...activeThemeState, main: e.target.value });
                }}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={mainColor}
                onChange={(e) => {
                  setMainColor(e.target.value);
                  onSaveTheme({ ...activeThemeState, main: e.target.value });
                }}
                className="w-full font-mono-code text-xs bg-transparent border-0 p-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-1">
            <label className="font-mono-code text-[11px] text-slate-500 block">
              Accent (Interactive)
            </label>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded p-1.5 bg-slate-50">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => {
                  setAccentColor(e.target.value);
                  onSaveTheme({ ...activeThemeState, accent: e.target.value });
                }}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => {
                  setAccentColor(e.target.value);
                  onSaveTheme({ ...activeThemeState, accent: e.target.value });
                }}
                className="w-full font-mono-code text-xs bg-transparent border-0 p-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Contrast Color */}
          <div className="space-y-1">
            <label className="font-mono-code text-[11px] text-slate-500 block">
              Contrast (Text/Ink)
            </label>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded p-1.5 bg-slate-50">
              <input
                type="color"
                value={contrastColor}
                onChange={(e) => {
                  setContrastColor(e.target.value);
                  onSaveTheme({ ...activeThemeState, contrast: e.target.value });
                }}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={contrastColor}
                onChange={(e) => {
                  setContrastColor(e.target.value);
                  onSaveTheme({ ...activeThemeState, contrast: e.target.value });
                }}
                className="w-full font-mono-code text-xs bg-transparent border-0 p-0 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Typst Code Block */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <label className="font-mono-code text-[11px] text-slate-500 uppercase font-semibold">
              Live Typst Theme Configuration
            </label>
            <button
              onClick={handleCopyTypst}
              className="text-blue-600 hover:underline font-mono-code text-xs flex items-center gap-1"
            >
              {copiedTypst ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTypst ? 'Copied!' : 'Copy Typst'}</span>
            </button>
          </div>
          <pre className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono-code text-[11px] text-slate-700 overflow-x-auto whitespace-pre">
            {typstCode}
          </pre>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 font-mono-code text-xs">
          <button
            onClick={handleResetDefault}
            className="text-slate-500 hover:text-slate-900 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded text-white font-medium"
              style={{ backgroundColor: accentColor }}
            >
              Apply Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
