import React, { useState, useMemo } from 'react';
import { Search, Link as LinkIcon, Download, Quote, Pin, ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react';
import { PUBLICATIONS_DATA, Publication } from '../data/profile.ts';
import { ColorTheme } from '../utils/theme.ts';
import { PinnedState, isItemPinned, togglePin } from '../utils/pins.ts';
import { filterPublications, getUniqueYears } from '../utils/filter.ts';

interface PublicationsSectionProps {
  currentTheme: ColorTheme;
  pinnedState: PinnedState;
  onUpdatePinnedState: (next: PinnedState) => void;
  onOpenBibtex: (id: string) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  currentTheme,
  pinnedState,
  onUpdatePinnedState,
  onOpenBibtex,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});

  const availableYears = useMemo(() => getUniqueYears(PUBLICATIONS_DATA), []);

  const filteredPublications = useMemo(() => {
    return filterPublications(PUBLICATIONS_DATA, {
      topic: selectedTopic,
      year: selectedYear,
      searchQuery,
    });
  }, [selectedTopic, selectedYear, searchQuery]);

  // Topic count calculation
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: PUBLICATIONS_DATA.length,
      'neuro-symbolic': 0,
      'rare-disease': 0,
      'signal-deeplearning': 0,
    };
    PUBLICATIONS_DATA.forEach(p => {
      p.topics.forEach(t => {
        if (counts[t] !== undefined) counts[t]++;
      });
    });
    return counts;
  }, []);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTogglePin = (id: string) => {
    const next = togglePin(id, 'publication', pinnedState);
    onUpdatePinnedState(next);
  };

  return (
    <div className="space-y-8">
      {/* Intro & Filter Header */}
      <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-xl space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="font-mono-code text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.accent }}>
              Scientific Output
            </div>
            <h1 className="font-serif-academic text-3xl text-slate-900 mt-1">
              Publications & Preprints
            </h1>
            <p className="font-sans-ui text-xs text-slate-600 mt-1">
              Peer-reviewed journal articles, conference papers, and manuscripts in progress.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, author, DOI, venue..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded font-mono-code text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-700 text-xs font-mono-code"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Rails */}
        <div className="space-y-3 pt-3 border-t border-slate-200">
          {/* Topic Filters */}
          <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
            <span className="text-slate-500 text-[11px] uppercase mr-1">Topic:</span>
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedTopic === 'all'
                  ? 'bg-blue-50 text-blue-700 border border-blue-400 font-semibold'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              All [{topicCounts['all']}]
            </button>
            <button
              onClick={() => setSelectedTopic('neuro-symbolic')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedTopic === 'neuro-symbolic'
                  ? 'bg-blue-50 text-blue-700 border border-blue-400 font-semibold'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              Neuro-Symbolic [{topicCounts['neuro-symbolic']}]
            </button>
            <button
              onClick={() => setSelectedTopic('rare-disease')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedTopic === 'rare-disease'
                  ? 'bg-blue-50 text-blue-700 border border-blue-400 font-semibold'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              Rare Diseases & FHIR [{topicCounts['rare-disease']}]
            </button>
            <button
              onClick={() => setSelectedTopic('signal-deeplearning')}
              className={`px-3 py-1 rounded transition-colors ${
                selectedTopic === 'signal-deeplearning'
                  ? 'bg-blue-50 text-blue-700 border border-blue-400 font-semibold'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              Signals & Deep Learning [{topicCounts['signal-deeplearning']}]
            </button>
          </div>

          {/* Year Filters */}
          <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
            <span className="text-slate-500 text-[11px] uppercase mr-1">Year:</span>
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-2.5 py-0.5 rounded transition-colors ${
                selectedYear === 'all'
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            {availableYears.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr.toString())}
                className={`px-2.5 py-0.5 rounded transition-colors ${
                  selectedYear === yr.toString()
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredPublications.length === 0 ? (
          <div className="bg-white p-12 border border-slate-200 rounded-xl text-center space-y-3">
            <FileText className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-serif-academic text-lg text-slate-700">No publications found matching criteria</p>
            <button
              onClick={() => { setSelectedTopic('all'); setSelectedYear('all'); setSearchQuery(''); }}
              className="text-xs font-mono-code text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredPublications.map((pub) => {
            const isPinned = isItemPinned(pub.id, pinnedState);
            const isExpanded = !!expandedAbstracts[pub.id];

            return (
              <article
                key={pub.id}
                className="bg-white p-6 border border-slate-200 rounded-xl space-y-3.5 hover:border-blue-500 transition-all shadow-xs"
              >
                {/* Meta line: Venue, Type, Year, and Pin Action */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono-code text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-medium border ${
                      pub.type === 'journal'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : pub.type === 'conference'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : pub.type === 'preprint'
                        ? 'bg-purple-50 text-purple-800 border-purple-200'
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {pub.venue} · {pub.year}
                    </span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">
                      {pub.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePin(pub.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs transition-colors ${
                        isPinned
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                          : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800'
                      }`}
                      title={isPinned ? "Pinned to Frontpage" : "Pin to Frontpage Curated Highlights"}
                    >
                      <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current text-blue-600' : ''}`} />
                      <span>{isPinned ? 'Pinned' : 'Pin'}</span>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-sans-ui text-base sm:text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                  {pub.doi ? (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h2>

                {/* Subtitle / Venue description if present */}
                {pub.subtitle && (
                  <p className="font-mono-code text-xs text-slate-500">
                    {pub.subtitle}
                  </p>
                )}

                {/* Authors with Filip Rehburg bolded */}
                <div className="font-sans-ui text-xs text-slate-600 leading-relaxed">
                  {pub.authors.map((author, aIdx) => {
                    const isFilip = author.toLowerCase().includes('rehburg');
                    return (
                      <span key={aIdx}>
                        {isFilip ? (
                          <strong className="text-slate-900 font-semibold underline decoration-blue-500 underline-offset-2">
                            {author}
                          </strong>
                        ) : (
                          author
                        )}
                        {aIdx < pub.authors.length - 1 ? ', ' : ''}
                      </span>
                    );
                  })}
                  {pub.institutions.length > 0 && (
                    <span className="text-slate-400 block sm:inline sm:ml-2 text-[11px] font-mono-code">
                      [{pub.institutions.join(' · ')}]
                    </span>
                  )}
                </div>

                {/* Collapsible Abstract */}
                {isExpanded && (
                  <div className="font-sans-ui text-xs text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200 leading-relaxed space-y-2 animate-in fade-in duration-150">
                    <div className="font-mono-code text-[11px] text-slate-400 uppercase font-semibold">Abstract</div>
                    <p>{pub.abstract}</p>
                    {pub.pmid && (
                      <div className="font-mono-code text-[11px] text-slate-500 pt-1">
                        PMID: {pub.pmid} {pub.pmcid && `· PMCID: ${pub.pmcid}`}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons Cluster */}
                <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs pt-1 border-t border-slate-100">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>DOI: {pub.doi}</span>
                    </a>
                  )}

                  {pub.arxiv && (
                    <a
                      href={`https://arxiv.org/abs/${pub.arxiv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>arXiv:{pub.arxiv}</span>
                    </a>
                  )}

                  <button
                    onClick={() => toggleAbstract(pub.id)}
                    className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Abstract' : 'Abstract'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => onOpenBibtex(pub.id)}
                    className="text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>BibTeX</span>
                  </button>

                  {pub.pdfUrl ? (
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Open Access [PDF]</span>
                    </a>
                  ) : null}

                  {pub.codeUrl && (
                    <a
                      href={pub.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <span>Code / GitHub</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
