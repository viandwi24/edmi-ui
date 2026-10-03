// Themes page customizer (mirrors board 02): Base x Theme x Radius x Mode drive a scoped preview of the
// real Edmi landing cards. Only the preview wrapper carries data-base/data-theme/--radius/.dark, so the
// docs chrome keeps its own theme. The choice persists in localStorage (never the docs chrome theme).

import { useEffect, useMemo, useState } from "react";
import {
	FRAMEWORK_LABEL,
	FRAMEWORKS,
	type Framework,
	installCommand,
} from "../../config";
import {
	ChartCard,
	ChatCard,
	CommandCard,
	ControlsCard,
	FeedbackCard,
	FormCard,
	MarketCard,
	PeopleCard,
	QuestionCard,
	setRaised,
	useRaised,
} from "../landing/cards";

export type ThemeData = {
	bases: string[];
	themes: string[];
	/** accent swatch per theme, surface swatch per base (light values) */
	swatch: {
		themes: Record<string, string>;
		bases: Record<string, { bg: string; ink: string }>;
	};
	/** `${base}/${theme}` -> ready-made CSS (`:root` + `.dark`, radius 0.625rem) */
	css: Record<string, string>;
};

const RADII = ["0.3", "0.5", "0.625", "0.75", "1"];
const KEY = "edmi-themes";
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type State = {
	base: string;
	theme: string;
	radius: string;
	mode: "light" | "dark";
};

function Seg<T extends string>({
	label,
	hint,
	value,
	options,
	onChange,
}: {
	label: string;
	hint: string;
	value: T;
	options: { value: T; label: string; swatch?: React.ReactNode }[];
	onChange: (v: T) => void;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-baseline gap-2">
				<span className="text-[13px] font-medium text-foreground">{label}</span>
				<span className="font-mono text-[11px] text-muted-foreground-2">
					{hint}
				</span>
			</div>
			{/* biome-ignore lint/a11y/useSemanticElements: a fieldset would bring UA borders into the preview chrome */}
			<div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
				{options.map((o) => (
					<button
						key={o.value}
						type="button"
						aria-pressed={value === o.value}
						onClick={() => onChange(o.value)}
						className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-[13px] font-medium transition-colors ${
							value === o.value
								? "border-ring bg-card text-foreground ring-1 ring-ring"
								: "border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
						}`}
					>
						{o.swatch}
						{o.label}
					</button>
				))}
			</div>
		</div>
	);
}

function useFramework(): [Framework, (f: Framework) => void] {
	const [fw, setFw] = useState<Framework>("react");
	useEffect(() => {
		try {
			const v = localStorage.getItem("edmi-framework") as Framework | null;
			if (v && FRAMEWORKS.includes(v)) setFw(v);
		} catch {}
		const on = (e: Event) => setFw((e as CustomEvent<Framework>).detail);
		window.addEventListener("edmi-framework", on);
		return () => window.removeEventListener("edmi-framework", on);
	}, []);
	return [
		fw,
		(f) => {
			setFw(f);
			try {
				localStorage.setItem("edmi-framework", f);
			} catch {}
			window.dispatchEvent(new CustomEvent("edmi-framework", { detail: f }));
		},
	];
}

function CopyButton({ text, label }: { text: string; label: string }) {
	const [done, setDone] = useState(false);
	return (
		<button
			type="button"
			onClick={() => {
				navigator.clipboard?.writeText(text).catch(() => {});
				setDone(true);
				setTimeout(() => setDone(false), 1500);
			}}
			className="inline-flex h-8 items-center rounded-md border border-border bg-card px-3 text-[13px] font-medium text-foreground hover:bg-accent"
		>
			{done ? "Copied" : label}
		</button>
	);
}

export default function ThemeCustomizer({ data }: { data: ThemeData }) {
	const [s, setS] = useState<State>({
		base: "stone",
		theme: "green",
		radius: "0.625",
		mode: "light",
	});
	const [tab, setTab] = useState<"css" | "install">("css");
	const [fw, setFw] = useFramework();
	const raised = useRaised();

	// restore the saved choice (or follow the docs mode on first visit)
	useEffect(() => {
		try {
			const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
			if (saved) {
				setS((p) => ({ ...p, ...saved.state }));
				setRaised(Boolean(saved.raised));
				return;
			}
		} catch {}
		if (document.documentElement.classList.contains("dark"))
			setS((p) => ({ ...p, mode: "dark" }));
	}, []);
	useEffect(() => {
		try {
			localStorage.setItem(KEY, JSON.stringify({ state: s, raised }));
		} catch {}
	}, [s, raised]);

	const set = <K extends keyof State>(k: K, v: State[K]) =>
		setS((p) => ({ ...p, [k]: v }));

	const item = `theme-${s.base}-${s.theme}`;
	const css = useMemo(
		() =>
			(data.css[`${s.base}/${s.theme}`] ?? "").replace(
				"--radius: 0.625rem;",
				`--radius: ${s.radius}rem;`,
			),
		[data.css, s.base, s.theme, s.radius],
	);

	return (
		<div className="edmi-themes not-content flex flex-col gap-6">
			<div className="flex flex-wrap gap-x-8 gap-y-4 rounded-xl border border-border bg-card p-5">
				<Seg
					label="Base color"
					hint="data-base"
					value={s.base}
					onChange={(v) => set("base", v)}
					options={data.bases.map((b) => ({
						value: b,
						label: cap(b),
						swatch: (
							<span
								className="size-3 rounded-full border border-border"
								style={{ background: data.swatch.bases[b]?.bg }}
							/>
						),
					}))}
				/>
				<Seg
					label="Theme"
					hint="data-theme"
					value={s.theme}
					onChange={(v) => set("theme", v)}
					options={data.themes.map((t) => ({
						value: t,
						label: cap(t),
						swatch: (
							<span
								className="size-3 rounded-full"
								style={{ background: data.swatch.themes[t] }}
							/>
						),
					}))}
				/>
				<Seg
					label="Radius"
					hint="--radius"
					value={s.radius}
					onChange={(v) => set("radius", v)}
					options={RADII.map((r) => ({ value: r, label: r }))}
				/>
				<Seg
					label="Mode"
					hint="class=dark"
					value={s.mode}
					onChange={(v) => set("mode", v)}
					options={[
						{ value: "light", label: "Light" },
						{ value: "dark", label: "Dark" },
					]}
				/>
				<Seg
					label="Style"
					hint="raised"
					value={raised ? "raised" : "flat"}
					onChange={(v) => setRaised(v === "raised")}
					options={[
						{ value: "flat", label: "Flat" },
						{ value: "raised", label: "Raised ✦" },
					]}
				/>
			</div>

			<div
				data-preview
				data-base={s.base}
				data-theme={s.theme}
				className={`edmi-showcase rounded-xl border border-border bg-background p-4 text-foreground sm:p-6 ${
					s.mode === "dark" ? "dark" : "edmi-light"
				}`}
				style={
					{
						"--radius": `${s.radius}rem`,
						fontFamily: '"Instrument Sans", system-ui, sans-serif',
					} as React.CSSProperties
				}
			>
				<div className="columns-1 gap-4 md:columns-2 2xl:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
					<ControlsCard />
					<ChartCard />
					<FormCard />
					<MarketCard />
					<ChatCard />
					<CommandCard />
					<QuestionCard />
					<FeedbackCard />
					<PeopleCard />
				</div>
			</div>

			<div className="rounded-xl border border-border bg-card">
				<div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-2">
					<div className="flex gap-1" role="tablist">
						{(["css", "install"] as const).map((t) => (
							<button
								key={t}
								type="button"
								role="tab"
								aria-selected={tab === t}
								onClick={() => setTab(t)}
								className={`h-8 rounded-md border px-3 text-[13px] font-medium ${
									tab === t
										? "border-border bg-tab-active text-foreground"
										: "border-transparent text-muted-foreground hover:text-foreground"
								}`}
							>
								{t === "css" ? "Copy CSS" : "Install"}
							</button>
						))}
					</div>
					{tab === "css" ? (
						<CopyButton text={css} label="Copy CSS" />
					) : (
						<div className="flex gap-1" role="tablist" aria-label="Framework">
							{FRAMEWORKS.map((f) => (
								<button
									key={f}
									type="button"
									role="tab"
									aria-selected={fw === f}
									onClick={() => setFw(f)}
									className={`h-8 rounded-md border px-3 text-[13px] font-medium ${
										fw === f
											? "border-border bg-tab-active text-foreground"
											: "border-transparent text-muted-foreground hover:text-foreground"
									}`}
								>
									{FRAMEWORK_LABEL[f]}
								</button>
							))}
						</div>
					)}
				</div>
				{tab === "css" ? (
					<div className="p-4">
						<p className="mb-3 text-[13px] text-muted-foreground">
							Paste into your global CSS after <code>@edmi-ui/tokens</code> (or
							replace the <code>:root</code> and <code>.dark</code> blocks the
							theme item wrote).
						</p>
						<pre
							data-css
							className="max-h-96 overflow-auto rounded-lg border border-border bg-muted p-3 font-mono text-[12px] leading-5 text-foreground"
						>
							{css}
						</pre>
					</div>
				) : (
					<div className="flex flex-col gap-3 p-4">
						<p className="text-[13px] text-muted-foreground">
							Install the matching registry theme item after{" "}
							<code>@edmi-ui/theme</code>. It replaces the color variables
							(light and dark); your radius stays. The radius above is copied
							with <b>Copy CSS</b>, not installed.
						</p>
						<pre
							data-install
							className="overflow-x-auto rounded-lg border border-border bg-muted p-3 font-mono text-[12.5px] text-foreground"
						>
							{installCommand(fw, item)}
						</pre>
						<div>
							<CopyButton
								text={installCommand(fw, item)}
								label="Copy command"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
