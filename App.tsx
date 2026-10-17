import React from 'react';
import { Palette, Pin, Download, Menu, X, ExternalLink, GraduationCap } from 'lucide-react';
import { ColorTheme } from '../utils/theme.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenThemeModal: () => void;
  onOpenPinModal: () => void;
  onDownloadPdf: () => void;
  currentTheme: ColorTheme;
  pinnedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenThemeModal,
  onOpenPinModal,
  onDownloadPdf,
  currentTheme,
  pinnedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'cv', label: 'CV' },
    { id: 'publications', label: 'Publications' },
    { id: 'projects', label: 'Projects' },
    { id: 'notes', label: 'Notes' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-colors" style={{ backgroundColor: `${currentTheme.main}f0` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Brand & Academic Subtext */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSelectTab('about')}
            className="text-left font-serif-academic text-xl font-semibold tracking-tight text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2"
            style={{ color: currentTheme.contrast }}
          >
            <span>Filip Rehburg</span>
          </button>
          <span className="hidden sm:inline-block text-slate-300 font-mono-code text-xs">/</span>
          <span className="hidden sm:inline-block font-mono-code text-xs text-slate-500">
            MSc in Logic · ILLC, UvA
          </span>
        </div>

        {/* Center Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                data-nav={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`font-mono-code text-xs transition-all pb-1 border-b-2 ${
                  isActive
                    ? 'font-semibold border-current'
                    : 'text-slate-600 hover:text-slate-900 border-transparent'
                }`}
                style={{
                  color: isActive ? currentTheme.accent : undefined,
                  borderColor: isActive ? currentTheme.accent : 'transparent',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Trailing Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Theme & Palette trigger */}
          <button
            onClick={onOpenThemeModal}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 font-mono-code text-xs bg-white/70"
            title="Theme & Typst Palette Customizer"
            aria-label="Theme settings"
          >
            <div
              className="w-3 h-3 rounded-full border border-black/20 shrink-0"
              style={{ backgroundColor: currentTheme.accent }}
            />
            <Palette className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
            <span className="hidden md:inline">Theme</span>
          </button>

          {/* Frontpage Pins Manager */}
          <button
            onClick={onOpenPinModal}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center gap-1 font-mono-code text-xs bg-white/70"
            title="Curate Frontpage Highlights"
            aria-label="Manage frontpage pins"
          >
            <Pin className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
            <span className="hidden md:inline">Pins</span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-1 rounded border border-slate-200 font-mono-code">
              {pinnedCount}
            </span>
          </button>

          {/* Download CV PDF Action */}
          <button
            onClick={onDownloadPdf}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded font-mono-code text-xs flex items-center gap-1 sm:gap-1.5 transition-all text-white shadow-2xs hover:opacity-90 shrink-0"
            style={{ backgroundColor: currentTheme.contrast }}
            title="Download compiled Academic CV (PDF)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="font-medium whitespace-nowrap">CV [PDF]</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Sub-Navigation Strip for quick switching */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200/80 py-2 bg-slate-50/90 backdrop-blur-xs overflow-x-auto px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectTab(item.id)}
            className={`font-mono-code text-xs px-2.5 py-1 whitespace-nowrap rounded ${
              activeTab === item.id
                ? 'font-bold bg-white text-blue-700 shadow-2xs border border-slate-200'
                : 'text-slate-600'
            }`}
            style={{
              color: activeTab === item.id ? currentTheme.accent : undefined,
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
