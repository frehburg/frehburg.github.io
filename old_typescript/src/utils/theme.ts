export interface ColorTheme {
  name: string;
  main: string;      // Main background (e.g. #ffffff)
  accent: string;    // Full, energetic blue (e.g. #2563eb)
  contrast: string;  // Dark gray/charcoal text (e.g. #0f172a)
  surface: string;   // Light neutral card background (e.g. #f8fafc)
  border: string;    // Hairline border color (e.g. #e2e8f0)
}

export const THEME_PRESETS: ColorTheme[] = [
  {
    name: "Academic Blue (Default)",
    main: "#ffffff",
    accent: "#2563eb",
    contrast: "#0f172a",
    surface: "#f8fafc",
    border: "#e2e8f0"
  },
  {
    name: "ILLC Amsterdam Cyan",
    main: "#f4f7fa",
    accent: "#00759f",
    contrast: "#191c1e",
    surface: "#ffffff",
    border: "#d0d7de"
  },
  {
    name: "Warm Solarized Paper",
    main: "#fcfbf7",
    accent: "#b45309",
    contrast: "#1c1917",
    surface: "#f5f3ec",
    border: "#e7e2d6"
  },
  {
    name: "Emerald Logic",
    main: "#f8fafc",
    accent: "#047857",
    contrast: "#0f172a",
    surface: "#ffffff",
    border: "#cbd5e1"
  },
  {
    name: "Monochrome Minimal",
    main: "#ffffff",
    accent: "#334155",
    contrast: "#09090b",
    surface: "#f4f4f5",
    border: "#e4e4e7"
  }
];

const THEME_STORAGE_KEY = "filip_rehburg_theme_v1";

export function getStoredTheme(): ColorTheme {
  if (typeof window === "undefined") return THEME_PRESETS[0];
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.main && parsed.accent && parsed.contrast) {
        return parsed;
      }
    }
  } catch {
    // Ignore JSON error
  }
  return THEME_PRESETS[0];
}

export function saveTheme(theme: ColorTheme): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch {
      // Ignore storage error
    }
    applyThemeToDOM(theme);
  }
}

export function applyThemeToDOM(theme: ColorTheme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--theme-main", theme.main);
  root.style.setProperty("--theme-accent", theme.accent);
  root.style.setProperty("--theme-contrast", theme.contrast);
  root.style.setProperty("--theme-surface", theme.surface || "#f8fafc");
  root.style.setProperty("--theme-border", theme.border || "#e2e8f0");
}

export function generateTypstThemeCode(theme: ColorTheme): string {
  return `// Typst Global Theme Definition
#let theme = (
  main: rgb("${theme.main}"),
  accent: rgb("${theme.accent}"),
  contrast: rgb("${theme.contrast}"),
  surface: rgb("${theme.surface || '#f8fafc'}"),
  font-body: ("Inter", "Newsreader"),
  font-code: ("JetBrains Mono"),
)

#show link: set text(fill: theme.accent)
#set text(fill: theme.contrast, font: theme.font-body)`;
}
