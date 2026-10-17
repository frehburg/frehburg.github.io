/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { CvSection } from './components/CvSection.tsx';
import { PublicationsSection } from './components/PublicationsSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { NotesSection } from './components/NotesSection.tsx';
import { ThemeModal } from './components/ThemeModal.tsx';
import { PinModal } from './components/PinModal.tsx';
import { BibtexModal } from './components/BibtexModal.tsx';
import { TypstModal } from './components/TypstModal.tsx';
import { Footer } from './components/Footer.tsx';
import { getStoredTheme, saveTheme, applyThemeToDOM, ColorTheme } from './utils/theme.ts';
import { getStoredPinnedState, savePinnedState, PinnedState } from './utils/pins.ts';
import { generateAcademicCvPdf } from './utils/pdfGenerator.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(getStoredTheme);
  const [pinnedState, setPinnedState] = useState<PinnedState>(getStoredPinnedState);

  // Modals state
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isTypstModalOpen, setIsTypstModalOpen] = useState(false);
  const [activeBibtexPubId, setActiveBibtexPubId] = useState<string | null>(null);

  // Initialize theme into DOM on mount
  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, [currentTheme]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['about', 'cv', 'publications', 'projects', 'notes'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const handleSaveTheme = (newTheme: ColorTheme) => {
    setCurrentTheme(newTheme);
    saveTheme(newTheme);
  };

  const handleUpdatePinnedState = (newState: PinnedState) => {
    setPinnedState(newState);
    savePinnedState(newState);
  };

  const handleDownloadPdf = () => {
    generateAcademicCvPdf(currentTheme);
  };

  // Count active pins
  const pinnedCount = [
    pinnedState.publicationId ? 1 : 0,
    pinnedState.projectId ? 1 : 0,
    pinnedState.noteId ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div
      className="min-h-screen flex flex-col antialiased transition-colors duration-200"
      style={{ backgroundColor: currentTheme.main, color: currentTheme.contrast }}
    >
      {/* Global Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenPinModal={() => setIsPinModalOpen(true)}
        onDownloadPdf={handleDownloadPdf}
        currentTheme={currentTheme}
        pinnedCount={pinnedCount}
      />

      {/* Main Dynamic Content Canvas */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {activeTab === 'about' && (
          <section data-testid="tab-about" className="animate-in fade-in duration-200">
            <AboutSection
              currentTheme={currentTheme}
              pinnedState={pinnedState}
              onUpdatePinnedState={handleUpdatePinnedState}
              onNavigateTab={handleSelectTab}
              onOpenBibtex={(id) => setActiveBibtexPubId(id)}
              onOpenPinModal={() => setIsPinModalOpen(true)}
            />
          </section>
        )}

        {activeTab === 'cv' && (
          <section data-testid="tab-cv" className="animate-in fade-in duration-200">
            <CvSection
              currentTheme={currentTheme}
              onDownloadPdf={handleDownloadPdf}
              onViewTypstSource={() => setIsTypstModalOpen(true)}
            />
          </section>
        )}

        {activeTab === 'publications' && (
          <section data-testid="tab-publications" className="animate-in fade-in duration-200">
            <PublicationsSection
              currentTheme={currentTheme}
              pinnedState={pinnedState}
              onUpdatePinnedState={handleUpdatePinnedState}
              onOpenBibtex={(id) => setActiveBibtexPubId(id)}
            />
          </section>
        )}

        {activeTab === 'projects' && (
          <section data-testid="tab-projects" className="animate-in fade-in duration-200">
            <ProjectsSection
              currentTheme={currentTheme}
              pinnedState={pinnedState}
              onUpdatePinnedState={handleUpdatePinnedState}
              onNavigateTab={handleSelectTab}
            />
          </section>
        )}

        {activeTab === 'notes' && (
          <section data-testid="tab-notes" className="animate-in fade-in duration-200">
            <NotesSection
              currentTheme={currentTheme}
              pinnedState={pinnedState}
              onUpdatePinnedState={handleUpdatePinnedState}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer
        currentTheme={currentTheme}
        onOpenBibtexAll={() => setActiveBibtexPubId('rehburg2025rarelink')}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Central Color Scheme & Typst Theme Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSaveTheme={handleSaveTheme}
      />

      {/* Curated Highlights / Frontpage Pin Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        pinnedState={pinnedState}
        onUpdatePinnedState={handleUpdatePinnedState}
        currentTheme={currentTheme}
      />

      {/* BibTeX Citation Modal */}
      <BibtexModal
        publicationId={activeBibtexPubId}
        onClose={() => setActiveBibtexPubId(null)}
        currentTheme={currentTheme}
      />

      {/* Academic Typst CV Source Modal */}
      <TypstModal
        isOpen={isTypstModalOpen}
        onClose={() => setIsTypstModalOpen(false)}
        currentTheme={currentTheme}
      />
    </div>
  );
}
