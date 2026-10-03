// Theme = `.dark` on <html>, persisted in a cookie (DESIGN §3). hooks.server.ts reads it so SSR has no flash.
export const THEME_COOKIE = "edmi-theme";

export type Theme = "light" | "dark";

export function getTheme(): Theme {
	if (typeof document === "undefined") return "light";
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
}
