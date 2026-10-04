// Themes page BUILDER presets (docs only, never shipped in @edmi-ui/tokens or the registry).
// Extra shadcn-style base colors (Zinc, Neutral, Gray) and accents (Blue, Violet, Rose, Red, Orange, Amber,
// Yellow) are derived from the Tailwind v4 default OKLCH palette (MIT) and mapped onto the Edmi token roles
// exactly like base/slate.css and themes/ocean.css do (same variable set, same relationships). A custom accent
// (any colour) goes through the same accent derivation. Everything here is pure and framework-free.

export type ModeVars = {
	light: Record<string, string>;
	dark: Record<string, string>;
};
type Lch = { l: number; c: number; h: number };

// ---- colour math (OKLCH <-> sRGB) -------------------------------------------------------------------

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const toLinear = (v: number) =>
	v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
const toGamma = (v: number) =>
	v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;

function lchToRgb({ l, c, h }: Lch): [number, number, number] {
	const a = c * Math.cos((h * Math.PI) / 180);
	const b = c * Math.sin((h * Math.PI) / 180);
	const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
	const lin = [
		4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
		-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
		-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
	];
	return lin.map((v) => clamp(toGamma(clamp(v, 0, 1)), 0, 1)) as [
		number,
		number,
		number,
	];
}

function rgbToLch([r, g, b]: [number, number, number]): Lch {
	const [lr, lg, lb] = [r, g, b].map(toLinear) as [number, number, number];
	const l = Math.cbrt(
		0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
	);
	const m = Math.cbrt(
		0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
	);
	const s = Math.cbrt(
		0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
	);
	const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
	const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
	const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
	const c = Math.hypot(A, B);
	return {
		l: L,
		c,
		h: c < 0.002 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360,
	};
}

export function hexToLch(hex: string): Lch | null {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!m) return null;
	const n = Number.parseInt(m[1] as string, 16);
	return rgbToLch([(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]);
}

export function parseOklch(s: string): Lch | null {
	const m = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/.exec(s);
	return m ? { l: Number(m[1]), c: Number(m[2]), h: Number(m[3]) } : null;
}

const f3 = (n: number) => n.toFixed(3);
export const oklch = ({ l, c, h }: Lch) => `oklch(${f3(l)} ${f3(c)} ${f3(h)})`;
const rgba = (x: Lch, a: number) => {
	const [r, g, b] = lchToRgb(x).map((v) => Math.round(v * 255));
	return `rgba(${r},${g},${b},${a})`;
};
export const lchToHex = (x: Lch) =>
	`#${lchToRgb(x)
		.map((v) =>
			Math.round(v * 255)
				.toString(16)
				.padStart(2, "0"),
		)
		.join("")}`;

/** `pct`% of `fg` over `bg` in sRGB, as one solid colour (pre-mixed soft tints, never transparent). */
function mixSolid(fg: Lch, bg: Lch, pct: number): Lch {
	const a = lchToRgb(fg);
	const b = lchToRgb(bg);
	return rgbToLch(
		a.map((v, i) => v * pct + (b[i] as number) * (1 - pct)) as [
			number,
			number,
			number,
		],
	);
}

/** oklch interpolation between two palette steps (used to place dark surfaces between Tailwind steps). */
const lerp = (a: Lch, b: Lch, t: number): Lch => ({
	l: a.l + (b.l - a.l) * t,
	c: a.c + (b.c - a.c) * t,
	h: a.h + (b.h - a.h) * t,
});

// ---- Tailwind v4 palettes (oklch, steps 50..950) -------------------------------------------------------

const P = (l: number, c: number, h: number): Lch => ({ l, c, h });
type Ramp = Record<
	| "50"
	| "100"
	| "200"
	| "300"
	| "400"
	| "500"
	| "600"
	| "700"
	| "800"
	| "900"
	| "950",
	Lch
>;

const RAMPS: Record<string, Ramp> = {
	zinc: {
		"50": P(0.985, 0, 0),
		"100": P(0.967, 0.001, 286.375),
		"200": P(0.92, 0.004, 286.32),
		"300": P(0.871, 0.006, 286.286),
		"400": P(0.705, 0.015, 286.067),
		"500": P(0.552, 0.016, 285.938),
		"600": P(0.442, 0.017, 285.786),
		"700": P(0.37, 0.013, 285.805),
		"800": P(0.274, 0.006, 286.033),
		"900": P(0.21, 0.006, 285.885),
		"950": P(0.141, 0.005, 285.823),
	},
	neutral: {
		"50": P(0.985, 0, 0),
		"100": P(0.97, 0, 0),
		"200": P(0.922, 0, 0),
		"300": P(0.87, 0, 0),
		"400": P(0.708, 0, 0),
		"500": P(0.556, 0, 0),
		"600": P(0.439, 0, 0),
		"700": P(0.371, 0, 0),
		"800": P(0.269, 0, 0),
		"900": P(0.205, 0, 0),
		"950": P(0.145, 0, 0),
	},
	gray: {
		"50": P(0.985, 0.002, 247.839),
		"100": P(0.967, 0.003, 264.542),
		"200": P(0.928, 0.006, 264.531),
		"300": P(0.872, 0.01, 258.338),
		"400": P(0.7072, 0.022, 261.325),
		"500": P(0.551, 0.027, 264.364),
		"600": P(0.446, 0.03, 256.802),
		"700": P(0.373, 0.034, 259.733),
		"800": P(0.278, 0.033, 256.848),
		"900": P(0.21, 0.034, 264.665),
		"950": P(0.13, 0.028, 261.692),
	},
};

/** Accent seeds = the Tailwind v4 `-500` step. */
const ACCENT_SEEDS: Record<string, Lch> = {
	blue: P(0.623, 0.214, 259.815),
	violet: P(0.606, 0.25, 292.717),
	rose: P(0.645, 0.246, 16.439),
	red: P(0.637, 0.237, 25.331),
	orange: P(0.705, 0.213, 47.604),
	amber: P(0.769, 0.188, 70.08),
	yellow: P(0.795, 0.184, 86.047),
};

export const BUILDER_BASES = Object.keys(RAMPS);
export const BUILDER_ACCENTS = Object.keys(ACCENT_SEEDS);
export const CUSTOM_ACCENT = "custom";
export const DEFAULT_CUSTOM = "#7c3aed";

export const baseSwatch = (name: string) =>
	lchToHex((RAMPS[name] as Ramp)["50"]);
export const accentSwatch = (name: string, custom = DEFAULT_CUSTOM) =>
	name === CUSTOM_ACCENT
		? custom
		: lchToHex(ACCENT_SEEDS[name] ?? (ACCENT_SEEDS.blue as Lch));

// ---- base colors: same variable set as base/slate.css ------------------------------------------------

const WHITE = P(1, 0, 0);

function baseVars(name: string, status: ModeVars): ModeVars {
	const r = RAMPS[name] as Ramp;
	const alpha = (a: number) => `rgba(255,255,255,${a})`;
	const light: Record<string, string> = {
		background: oklch(lerp(r["50"], r["100"], 0.35)),
		foreground: oklch(lerp(r["900"], r["950"], 0.3)),
		card: oklch(WHITE),
		"card-foreground": oklch(lerp(r["900"], r["950"], 0.3)),
		popover: oklch(WHITE),
		"popover-foreground": oklch(lerp(r["900"], r["950"], 0.3)),
		primary: oklch(r["900"]),
		"primary-foreground": oklch(WHITE),
		"primary-hi": oklch(r["700"]),
		"primary-edge": oklch(lerp(r["900"], r["950"], 0.6)),
		"primary-lip": oklch(r["950"]),
		"primary-inset": alpha(0.22),
		secondary: oklch(r["100"]),
		"secondary-foreground": oklch(r["900"]),
		"secondary-hi": oklch(WHITE),
		"secondary-lip": oklch(r["300"]),
		muted: oklch(lerp(r["50"], r["100"], 0.7)),
		"muted-foreground": oklch(r["500"]),
		accent: oklch(lerp(r["100"], r["200"], 0.25)),
		"accent-foreground": oklch(r["900"]),
		border: oklch(r["200"]),
		input: oklch(r["300"]),
		sidebar: oklch(lerp(r["50"], r["100"], 0.7)),
		"sidebar-foreground": oklch(r["900"]),
		"sidebar-primary": oklch(r["900"]),
		"sidebar-primary-foreground": oklch(WHITE),
		"sidebar-accent": oklch(lerp(r["100"], r["200"], 0.25)),
		"sidebar-accent-foreground": oklch(r["900"]),
		"sidebar-border": oklch(r["200"]),
		overlay: rgba({ ...r["950"], l: 0.2 }, 0.35),
		lip: oklch(lerp(r["200"], r["300"], 0.3)),
		"lip-strong": oklch(lerp(r["200"], r["300"], 0.85)),
		"outline-hi": oklch(WHITE),
		"outline-face": oklch(WHITE),
		"outline-lip": oklch(lerp(r["200"], r["300"], 0.3)),
		"card-hi": oklch(WHITE),
		"grid-dot": oklch(r["200"]),
		stage: oklch(r["100"]),
		"foreground-2": oklch(r["700"]),
		"tab-active": oklch(WHITE),
		"muted-foreground-2": oklch(r["400"]),
		"border-2": oklch(lerp(r["100"], r["200"], 0.6)),
	};
	const popover = lerp(r["900"], r["800"], 0.35);
	const dark: Record<string, string> = {
		background: oklch(lerp(r["900"], r["950"], 0.55)),
		foreground: oklch(r["100"]),
		card: oklch(lerp(r["900"], r["800"], 0.08)),
		"card-foreground": oklch(r["100"]),
		popover: oklch(popover),
		"popover-foreground": oklch(r["100"]),
		primary: oklch(r["100"]),
		"primary-foreground": oklch(lerp(r["900"], r["950"], 0.55)),
		"primary-hi": oklch(WHITE),
		"primary-edge": "transparent",
		"primary-lip": oklch(r["400"]),
		"primary-inset": "rgba(255,255,255,0.7)",
		secondary: oklch(lerp(r["800"], r["900"], 0.1)),
		"secondary-foreground": oklch(r["100"]),
		"secondary-hi": oklch(lerp(r["800"], r["700"], 0.25)),
		"secondary-inset": "rgba(255,255,255,0.08)",
		"secondary-lip": oklch(lerp(r["800"], r["700"], 0.55)),
		muted: oklch(lerp(r["900"], r["950"], 0.25)),
		"muted-foreground": oklch(r["400"]),
		accent: oklch(lerp(r["800"], r["900"], 0.05)),
		"accent-foreground": oklch(r["100"]),
		border: oklch(lerp(r["800"], r["900"], 0.15)),
		input: oklch(lerp(r["800"], r["700"], 0.45)),
		sidebar: oklch(lerp(r["900"], r["950"], 0.4)),
		"sidebar-foreground": oklch(r["100"]),
		"sidebar-primary": oklch(r["100"]),
		"sidebar-primary-foreground": oklch(lerp(r["900"], r["950"], 0.55)),
		"sidebar-accent": oklch(lerp(r["800"], r["900"], 0.4)),
		"sidebar-accent-foreground": oklch(r["100"]),
		"sidebar-border": oklch(lerp(r["800"], r["900"], 0.3)),
		overlay: "rgba(2,6,15,0.65)",
		lip: oklch(lerp(r["800"], r["700"], 0.3)),
		"lip-strong": oklch(lerp(r["800"], r["700"], 0.45)),
		"outline-hi": oklch(lerp(r["900"], r["800"], 0.55)),
		"outline-face": oklch(popover),
		"outline-lip": oklch(lerp(r["800"], r["700"], 0.55)),
		"card-hi": "rgba(255,255,255,0.04)",
		"grid-dot": oklch(lerp(r["800"], r["900"], 0.5)),
		stage: oklch(lerp(r["900"], r["950"], 0.4)),
		"foreground-2": oklch(r["300"]),
		"tab-active": oklch(lerp(r["800"], r["900"], 0.05)),
		"muted-foreground-2": oklch(lerp(r["500"], r["600"], 0.2)),
		"border-2": oklch(lerp(r["800"], r["900"], 0.5)),
	};
	// dark soft tints are pre-mixed onto this base's popover (light ones are white-based, base independent)
	for (const k of ["destructive", "success", "warning", "info"]) {
		const c = parseOklch(status.dark[k] ?? "");
		if (c) dark[`${k}-soft`] = oklch(mixSolid(c, popover, 0.13));
	}
	return { light, dark };
}

// ---- accents: same variable set as themes/ocean.css ---------------------------------------------------

function accentVars(seed: Lch, popover: ModeVars): ModeVars {
	const pl = parseOklch(popover.light.popover ?? "") ?? WHITE;
	const pd = parseOklch(popover.dark.popover ?? "") ?? P(0.26, 0.01, 285);
	const onBrand = (l: number) =>
		l > 0.72 ? oklch(P(0.2, 0.03, seed.h)) : oklch(WHITE);

	// light: the seed itself (Tailwind -500), lighter hi, darker edge/lip, solid soft tint, dark text
	const lb = { ...seed, l: clamp(seed.l, 0.52, 0.8) };
	const lHi = { l: lb.l + 0.08, c: lb.c * 0.82, h: lb.h };
	const lEdge = { l: lb.l - 0.09, c: lb.c * 0.85, h: lb.h };
	const lLip = { l: lb.l - 0.18, c: lb.c * 0.7, h: lb.h };
	const lText = { l: Math.min(lb.l - 0.1, 0.52), c: lb.c * 0.8, h: lb.h };
	const light: Record<string, string> = {
		primary: oklch(lb),
		"primary-foreground": onBrand(lb.l),
		"primary-hi": oklch(lHi),
		"primary-edge": oklch(lEdge),
		"primary-lip": oklch(lLip),
		"primary-inset": "rgba(255,255,255,0.28)",
		"sidebar-primary": oklch(lb),
		"sidebar-primary-foreground": onBrand(lb.l),
		"sidebar-ring": oklch(lb),
		ring: oklch(lb),
		"ring-soft": rgba(lb, 0.25),
		brand: oklch(lb),
		"brand-foreground": onBrand(lb.l),
		"brand-hi": oklch(lHi),
		"brand-edge": oklch(lEdge),
		"brand-lip": oklch(lLip),
		"brand-soft": oklch(mixSolid(lb, pl, 0.1)),
		"brand-text": oklch(lText),
		"chart-1": oklch(lb),
	};

	// dark: a touch lighter than the seed so it holds on the dark canvas
	const db = {
		l: clamp(seed.l + 0.04, 0.6, 0.82),
		c: seed.c * 0.92,
		h: seed.h,
	};
	const dHi = { l: db.l + 0.065, c: db.c * 0.8, h: db.h };
	const dEdge = { l: db.l - 0.09, c: db.c * 0.95, h: db.h };
	const dLip = { l: db.l - 0.24, c: db.c * 0.7, h: db.h };
	const dText = { l: Math.min(db.l + 0.11, 0.84), c: db.c * 0.65, h: db.h };
	const dFg = db.l > 0.7 ? oklch(P(0.2, 0.03, seed.h)) : oklch(WHITE);
	const dark: Record<string, string> = {
		primary: oklch(db),
		"primary-foreground": dFg,
		"primary-hi": oklch(dHi),
		"primary-edge": oklch(dEdge),
		"primary-lip": oklch(dLip),
		"primary-inset": "rgba(255,255,255,0.25)",
		"sidebar-primary": oklch(db),
		"sidebar-primary-foreground": dFg,
		"sidebar-ring": oklch(db),
		ring: oklch(db),
		"ring-soft": rgba(db, 0.3),
		brand: oklch(db),
		"brand-foreground": dFg,
		"brand-hi": oklch(dHi),
		"brand-edge": oklch(dEdge),
		"brand-lip": oklch(dLip),
		"brand-soft": oklch(mixSolid(db, pd, 0.18)),
		"brand-text": oklch(dText),
		"chart-1": oklch(db),
	};
	return { light, dark };
}

// ---- public API -----------------------------------------------------------------------------------------

export type Pick = { base: string; theme: string; custom: string };

/** Official (registry) combinations only: both halves ship in @edmi-ui/tokens. */
export const isOfficial = (
	p: Pick,
	official: { bases: string[]; themes: string[] },
) => official.bases.includes(p.base) && official.themes.includes(p.theme);

/**
 * Full token sets for any base x accent. `official` holds the composed sets of the shipped combinations
 * (`${base}/${theme}`); builder bases/accents are layered on top of the closest shipped set.
 */
export function resolveVars(
	p: Pick,
	official: Record<string, ModeVars>,
	officialNames: { bases: string[]; themes: string[] },
): ModeVars {
	const baseOfficial = officialNames.bases.includes(p.base);
	const themeOfficial = officialNames.themes.includes(p.theme);
	const fallbackBase = baseOfficial ? p.base : "stone";
	const fallbackTheme = themeOfficial ? p.theme : "green";
	const start = official[`${fallbackBase}/${fallbackTheme}`] as ModeVars;
	const out: ModeVars = { light: { ...start.light }, dark: { ...start.dark } };
	if (!baseOfficial) {
		const b = baseVars(p.base, start);
		Object.assign(out.light, b.light);
		Object.assign(out.dark, b.dark);
	}
	if (!themeOfficial) {
		const seed =
			p.theme === CUSTOM_ACCENT
				? (hexToLch(p.custom) ?? (ACCENT_SEEDS.violet as Lch))
				: ((ACCENT_SEEDS[p.theme] ?? ACCENT_SEEDS.blue) as Lch);
		const a = accentVars(seed, out);
		Object.assign(out.light, a.light);
		Object.assign(out.dark, a.dark);
	}
	return out;
}

/** shadcn-style "Copy code": `:root` (light + radius) then `.dark`. */
export function varsToCss(v: ModeVars, radius: string): string {
	const block = (sel: string, o: Record<string, string>) =>
		`${sel} {\n${Object.entries(o)
			.filter(([k]) => k !== "radius")
			.map(([k, val]) => `  --${k}: ${val};`)
			.join("\n")}\n}`;
	return `${block(":root", { radius, ...v.light })}\n\n${block(".dark", v.dark)}\n`;
}
