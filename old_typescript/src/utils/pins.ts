import { PUBLICATIONS_DATA, PROJECTS_DATA, NOTES_DATA } from '../data/profile.ts';
import type { Publication, Project, NotePost } from '../data/profile.ts';

export interface PinnedState {
  publicationId: string;
  projectId: string;
  noteId: string;
  customList?: string[]; // arbitrary additional pinned item IDs
}

const PIN_STORAGE_KEY = "filip_rehburg_pinned_items_v1";

export const DEFAULT_PINNED_STATE: PinnedState = {
  publicationId: "rehburg2025rarelink",
  projectId: "proj-gnn-forgetting",
  noteId: "note-modal-neurosymbolic",
  customList: ["rehburg2025rarelink", "proj-gnn-forgetting", "note-modal-neurosymbolic"]
};

export function getStoredPinnedState(): PinnedState {
  if (typeof window === "undefined") return DEFAULT_PINNED_STATE;
  try {
    const raw = localStorage.getItem(PIN_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.publicationId || parsed.projectId || parsed.noteId)) {
        return {
          publicationId: parsed.publicationId || DEFAULT_PINNED_STATE.publicationId,
          projectId: parsed.projectId || DEFAULT_PINNED_STATE.projectId,
          noteId: parsed.noteId || DEFAULT_PINNED_STATE.noteId,
          customList: Array.isArray(parsed.customList) ? parsed.customList : DEFAULT_PINNED_STATE.customList
        };
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_PINNED_STATE;
}

export function savePinnedState(state: PinnedState): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }
}

export function isItemPinned(id: string, state: PinnedState): boolean {
  if (state.publicationId === id || state.projectId === id || state.noteId === id) {
    return true;
  }
  if (state.customList && state.customList.includes(id)) {
    return true;
  }
  return false;
}

export function togglePin(id: string, type: 'publication' | 'project' | 'note', currentState: PinnedState): PinnedState {
  const next: PinnedState = { ...currentState };
  const custom = new Set(next.customList || []);

  if (type === 'publication') {
    if (next.publicationId === id) {
      // Find another publication or unpin
      const other = PUBLICATIONS_DATA.find(p => p.id !== id);
      next.publicationId = other ? other.id : "";
      custom.delete(id);
    } else {
      next.publicationId = id;
      custom.add(id);
    }
  } else if (type === 'project') {
    if (next.projectId === id) {
      const other = PROJECTS_DATA.find(p => p.id !== id);
      next.projectId = other ? other.id : "";
      custom.delete(id);
    } else {
      next.projectId = id;
      custom.add(id);
    }
  } else if (type === 'note') {
    if (next.noteId === id) {
      const other = NOTES_DATA.find(n => n.id !== id);
      next.noteId = other ? other.id : "";
      custom.delete(id);
    } else {
      next.noteId = id;
      custom.add(id);
    }
  }

  next.customList = Array.from(custom);
  savePinnedState(next);
  return next;
}

export function getPinnedItems(state: PinnedState): {
  publication?: Publication;
  project?: Project;
  note?: NotePost;
} {
  const pub = PUBLICATIONS_DATA.find(p => p.id === state.publicationId) || PUBLICATIONS_DATA[0];
  const proj = PROJECTS_DATA.find(p => p.id === state.projectId) || PROJECTS_DATA[0];
  const note = NOTES_DATA.find(n => n.id === state.noteId) || NOTES_DATA[0];

  return { publication: pub, project: proj, note };
}
