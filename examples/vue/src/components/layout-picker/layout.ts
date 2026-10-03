export type Layout = "dashboard" | "navbar";

export const LAYOUT_COOKIE = "edmi-layout";

/** Reads the saved layout from a cookie string (defaults to `document.cookie`); `undefined` when unset. */
export function getLayoutCookie(cookie?: string): Layout | undefined {
    const source =
        cookie ?? (typeof document === "undefined" ? "" : document.cookie);
    const m = source.match(
        new RegExp(`(?:^|;\\s*)${LAYOUT_COOKIE}=(dashboard|navbar)`),
    );
    return m?.[1] as Layout | undefined;
}

/** Saves the layout for a year (DESIGN §3/§6: a cookie so SSR renders the right shell with no flash). */
export function setLayoutCookie(layout: Layout) {
    document.cookie = `${LAYOUT_COOKIE}=${layout}; path=/; max-age=31536000; samesite=lax`;
}
