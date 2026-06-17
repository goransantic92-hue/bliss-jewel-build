import type { ThemeColors } from "@/types/content";

export function applyTheme(theme: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--foreground", theme.foreground);
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--card", theme.card);
  root.style.setProperty("--muted", theme.muted);
  root.style.setProperty("--popover", theme.background);
  root.style.setProperty("--popover-foreground", theme.foreground);
  root.style.setProperty("--primary-foreground", theme.background);
  root.style.setProperty("--secondary", theme.card);
  root.style.setProperty("--secondary-foreground", theme.foreground);
  root.style.setProperty("--muted-foreground", theme.foreground);
  root.style.setProperty("--accent", theme.card);
  root.style.setProperty("--accent-foreground", theme.foreground);
  root.style.setProperty("--border", theme.muted);
  root.style.setProperty("--input", theme.muted);
  root.style.setProperty("--ring", theme.primary);
  root.style.setProperty("--cream", theme.background);
  root.style.setProperty("--gold", theme.primary);
  root.style.setProperty("--gold-light", theme.primary);
  root.style.setProperty("--rose", theme.primary);
  root.style.setProperty("--charcoal", theme.card);
  root.style.setProperty("--charcoal-deep", theme.foreground);
  root.style.setProperty("--price", theme.price);
  root.style.setProperty("--sidebar-background", theme.card);
  root.style.setProperty("--sidebar-foreground", theme.foreground);
  root.style.setProperty("--sidebar-primary", theme.primary);
  root.style.setProperty("--sidebar-primary-foreground", theme.background);
  root.style.setProperty("--sidebar-accent", theme.card);
  root.style.setProperty("--sidebar-accent-foreground", theme.foreground);
  root.style.setProperty("--sidebar-border", theme.muted);
  root.style.setProperty("--sidebar-ring", theme.primary);
}
