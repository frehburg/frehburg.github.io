import test from 'node:test';
import assert from 'node:assert/strict';
import { filterPublications, getUniqueYears } from './filter.ts';
import { PUBLICATIONS_DATA } from '../data/profile.ts';
import { DEFAULT_PINNED_STATE, getPinnedItems, togglePin, isItemPinned } from './pins.ts';
import { generateTypstThemeCode, THEME_PRESETS } from './theme.ts';

test('filterPublications filters by topic properly', () => {
  const filtered = filterPublications(PUBLICATIONS_DATA, {
    topic: 'neuro-symbolic',
    year: 'all',
    searchQuery: ''
  });
  assert.ok(filtered.length >= 1);
  assert.ok(filtered.every(p => p.topics.includes('neuro-symbolic')));
});

test('filterPublications filters by year properly', () => {
  const filtered2025 = filterPublications(PUBLICATIONS_DATA, {
    topic: 'all',
    year: '2025',
    searchQuery: ''
  });
  assert.ok(filtered2025.length > 0);
  assert.ok(filtered2025.every(p => p.year === 2025));
});

test('filterPublications searches across text', () => {
  const searchResults = filterPublications(PUBLICATIONS_DATA, {
    topic: 'all',
    year: 'all',
    searchQuery: 'rarelink'
  });
  assert.ok(searchResults.length >= 1);
  assert.ok(searchResults[0].title.toLowerCase().includes('rarelink'));
});

test('getUniqueYears returns descending unique years', () => {
  const years = getUniqueYears(PUBLICATIONS_DATA);
  assert.ok(years.includes(2025));
  assert.ok(years.includes(2026));
  assert.ok(years[0] > years[years.length - 1]);
});

test('pinned items logic supports querying and toggling', () => {
  const initial = getPinnedItems(DEFAULT_PINNED_STATE);
  assert.ok(initial.publication);
  assert.equal(initial.publication.id, 'rehburg2025rarelink');
  assert.ok(initial.project);
  assert.equal(initial.project.id, 'proj-gnn-forgetting');
  assert.ok(initial.note);
  assert.equal(initial.note.id, 'note-modal-neurosymbolic');

  assert.equal(isItemPinned('rehburg2025rarelink', DEFAULT_PINNED_STATE), true);
  assert.equal(isItemPinned('non-existent-id', DEFAULT_PINNED_STATE), false);

  // Toggle pin to unpin or switch
  const updated = togglePin('rehburg2025rarelink', 'publication', DEFAULT_PINNED_STATE);
  assert.notEqual(updated.publicationId, 'rehburg2025rarelink');
});

test('generateTypstThemeCode creates valid Typst theme block', () => {
  const code = generateTypstThemeCode(THEME_PRESETS[0]);
  assert.ok(code.includes('#let theme ='));
  assert.ok(code.includes('rgb("#2563eb")'));
  assert.ok(code.includes('rgb("#ffffff")'));
});
