import type { Publication } from '../data/profile.ts';

export interface FilterOptions {
  topic: string; // 'all' or specific topic
  year: string;  // 'all' or specific year as string e.g. '2025'
  searchQuery: string;
}

export function filterPublications(
  publications: Publication[],
  filters: FilterOptions
): Publication[] {
  const query = filters.searchQuery.trim().toLowerCase();

  return publications.filter(pub => {
    // Check topic
    if (filters.topic !== 'all') {
      if (!pub.topics.includes(filters.topic as any)) {
        return false;
      }
    }

    // Check year
    if (filters.year !== 'all') {
      if (pub.year.toString() !== filters.year) {
        return false;
      }
    }

    // Check search query
    if (query) {
      const matchTitle = pub.title.toLowerCase().includes(query);
      const matchAuthors = pub.authors.some(a => a.toLowerCase().includes(query));
      const matchVenue = pub.venue.toLowerCase().includes(query);
      const matchAbstract = pub.abstract.toLowerCase().includes(query);
      const matchDoi = (pub.doi || '').toLowerCase().includes(query);
      if (!matchTitle && !matchAuthors && !matchVenue && !matchAbstract && !matchDoi) {
        return false;
      }
    }

    return true;
  });
}

export function getUniqueYears(publications: Publication[]): number[] {
  const set = new Set<number>();
  publications.forEach(p => set.add(p.year));
  return Array.from(set).sort((a, b) => b - a);
}
