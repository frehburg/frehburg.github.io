import React from 'react';
import { PROFILE_DATA } from '../data/profile.ts';
import { ColorTheme } from '../utils/theme.ts';

interface FooterProps {
  currentTheme: ColorTheme;
  onOpenBibtexAll: () => void;
  onOpenThemeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentTheme,
  onOpenBibtexAll,
  onOpenThemeModal,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono-code text-slate-500">
        <div className="text-center md:text-left">
          © {new Date().getFullYear()} {PROFILE_DATA.name} · ILLC, University of Amsterdam · Built with Typst & Tailwind
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={PROFILE_DATA.orcidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            ORCID
          </a>
          <a
            href={PROFILE_DATA.scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Google Scholar
          </a>
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PROFILE_DATA.uvaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            UvA ILLC
          </a>
          <button
            onClick={onOpenBibtexAll}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            BibTeX Export
          </button>
          <button
            onClick={onOpenThemeModal}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Theme
          </button>
        </div>
      </div>
    </footer>
  );
};
