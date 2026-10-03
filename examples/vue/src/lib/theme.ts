// Theme = `.dark` on <html>, persisted in a cookie (DESIGN §3). index.html applies it before first paint.
const COOKIE = "edmi-theme";

export type Theme = "light" | "dark";

export function getTheme(): Theme {
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function setTheme(theme: Theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.cookie = `${COOKIE}=${theme}; path=/; max-age=31536000; samesite=lax`;
}
