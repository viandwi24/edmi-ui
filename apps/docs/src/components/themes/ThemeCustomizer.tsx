// Themes page (mirrors board 02): a page header with the primary actions (Copy CSS / Install open Edmi
// Dialogs), a toolbar of Edmi Tabs (Base x Theme x Radius x Mode x Style) and a large scoped preview of the
// real Edmi landing cards. Only the preview wrapper carries data-base/data-theme/--radius/.dark, so the
// docs chrome keeps its own theme. The choice persists in localStorage (never the docs chrome theme).

import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockHeader,
	CodeBlockTitle,
} from "@edmi-react/components/ai/code-block";
import { Button } from "@edmi-react/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@edmi-react/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import {
	ArrowCounterClockwiseIcon,
	CaretDownIcon,
	CopyIcon,
	SlidersHorizontalIcon,
	TerminalWindowIcon,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import {
	FRAMEWORK_LABEL,
	FRAMEWORKS,
	type Framework,
	installCommand,
	type PackageManager,
	PMS,
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
	setLayered,
	useLayered,
} from "../landing/cards";
import { setPm, useFramework, usePm } from "../landing/hooks";

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

function Row<T extends string>({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: T;
	options: { value: T; label: string; swatch?: React.ReactNode }[];
	onChange: (v: T) => void;
}) {
	const items = options.map((o) => ({
		value: o.value,
		label: (
			<span className="flex items-center gap-2">
				{o.swatch}
				{o.label}
			</span>
		),
	}));
	return (
		<Select
			value={value}
			items={items}
			onValueChange={(v) => v && onChange(v as T)}
		>
			<SelectTrigger
				aria-label={label}
				className="h-11 w-full gap-3 rounded-lg px-3"
			>
				<span className="text-xs font-medium text-muted-foreground">
					{label}
				</span>
				<SelectValue className="ml-auto flex-none text-[13px] font-medium" />
			</SelectTrigger>
			<SelectContent align="end" alignItemWithTrigger={false}>
				{options.map((o) => (
					<SelectItem key={o.value} value={o.value}>
						{o.swatch}
						{o.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

function Snippet({
	code,
	language,
	filename,
}: {
	code: string;
	language: string;
	filename: string;
}) {
	return (
		<CodeBlock code={code} language={language as "css"}>
			<CodeBlockHeader>
				<CodeBlockTitle>
					<CodeBlockFilename>{filename}</CodeBlockFilename>
				</CodeBlockTitle>
				<CodeBlockActions>
					<CodeBlockCopyButton aria-label={`Copy ${filename}`} />
				</CodeBlockActions>
			</CodeBlockHeader>
		</CodeBlock>
	);
}

export default function ThemeCustomizer({ data }: { data: ThemeData }) {
	const [s, setS] = useState<State>({
		base: "stone",
		theme: "green",
		radius: "0.625",
		mode: "light",
	});
	const [dialog, setDialog] = useState<"css" | "install" | null>(null);
	const [panelOpen, setPanelOpen] = useState(false);
	const [cssTab, setCssTab] = useState<"css" | "tailwind">("css");
	const [fw, setFw] = useFramework();
	const pm = usePm();
	const layered = useLayered();

	// restore the saved choice (or follow the docs mode on first visit)
	useEffect(() => {
		try {
			const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
			if (saved) {
				setS((p) => ({ ...p, ...saved.state }));
				setLayered(Boolean(saved.layered));
				return;
			}
		} catch {}
		if (document.documentElement.classList.contains("dark"))
			setS((p) => ({ ...p, mode: "dark" }));
	}, []);
	useEffect(() => {
		try {
			localStorage.setItem(KEY, JSON.stringify({ state: s, layered }));
		} catch {}
	}, [s, layered]);

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
	const tailwind = `@import "tailwindcss";
@import "@edmi-ui/tokens/tokens.css";
@import "@edmi-ui/tokens/theme.css";

${css}`;
	const install = `# once: the Edmi tokens and Tailwind theme
${installCommand(fw, "theme", pm)}

# this base + theme (replaces the color variables, light and dark)
${installCommand(fw, item, pm)}`;
	const label = `${cap(s.base)} \u00b7 ${cap(s.theme)}`;

	const reset = () => {
		setS({ base: "stone", theme: "green", radius: "0.625", mode: "light" });
		setLayered(false);
	};

	return (
		<div className="edmi-themes edmi-fit not-content flex h-full min-h-0 flex-col gap-3 min-[900px]:flex-row">
			<aside
				aria-label="Customize"
				className="flex shrink-0 flex-col rounded-2xl border border-border bg-popover min-[900px]:w-72 min-[900px]:min-h-0"
			>
				<div className="flex items-center gap-2 p-3 min-[900px]:pb-2">
					<div className="min-w-0 flex-1">
						<h2 className="m-0! text-[15px] leading-tight font-medium text-foreground">
							Customize
						</h2>
						<p className="m-0! mt-0.5! hidden truncate text-xs text-muted-foreground min-[900px]:block">
							{label} · {s.radius}rem · {s.mode}
						</p>
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="min-[900px]:hidden"
						aria-expanded={panelOpen}
						onClick={() => setPanelOpen((o) => !o)}
					>
						<SlidersHorizontalIcon className="size-4" />
						Options
						<CaretDownIcon
							className={`size-3.5 transition-transform ${panelOpen ? "rotate-180" : ""}`}
						/>
					</Button>
					<Button
						variant="ghost"
						size="icon-sm"
						aria-label="Reset"
						title="Reset"
						onClick={reset}
					>
						<ArrowCounterClockwiseIcon className="size-4" />
					</Button>
				</div>
				<div
					className={`${panelOpen ? "flex" : "hidden"} max-h-[55dvh] flex-col gap-2 overflow-y-auto border-t border-border p-3 min-[900px]:flex min-[900px]:max-h-none min-[900px]:flex-1 min-[900px]:border-t-0 min-[900px]:pt-1`}
				>
					<Row
						label="Base color"
						value={s.base}
						onChange={(v) => set("base", v)}
						options={data.bases.map((b) => ({
							value: b,
							label: cap(b),
							swatch: (
								<span
									className="size-3 shrink-0 rounded-full border border-border"
									style={{ background: data.swatch.bases[b]?.bg }}
								/>
							),
						}))}
					/>
					<Row
						label="Theme"
						value={s.theme}
						onChange={(v) => set("theme", v)}
						options={data.themes.map((t) => ({
							value: t,
							label: cap(t),
							swatch: (
								<span
									className="size-3 shrink-0 rounded-full"
									style={{ background: data.swatch.themes[t] }}
								/>
							),
						}))}
					/>
					<Row
						label="Radius"
						value={s.radius}
						onChange={(v) => set("radius", v)}
						options={RADII.map((r) => ({ value: r, label: `${r}rem` }))}
					/>
					<Row
						label="Mode"
						value={s.mode}
						onChange={(v) => set("mode", v)}
						options={[
							{ value: "light", label: "Light" },
							{ value: "dark", label: "Dark" },
						]}
					/>
					<Row
						label="Style"
						value={layered ? "layered" : "flat"}
						onChange={(v) => setLayered(v === "layered")}
						options={[
							{ value: "flat", label: "Flat" },
							{ value: "layered", label: "Layered \u2726" },
						]}
					/>
				</div>
				<div className="mt-auto flex gap-2 border-t border-border p-3">
					<Button
						variant="outline"
						className="flex-1"
						onClick={() => setDialog("css")}
					>
						<CopyIcon className="size-4" />
						Copy CSS
					</Button>
					<Button className="flex-1" onClick={() => setDialog("install")}>
						<TerminalWindowIcon className="size-4" />
						Install
					</Button>
				</div>
			</aside>

			<div
				data-preview
				data-base={s.base}
				data-theme={s.theme}
				className={`edmi-showcase relative min-h-0 min-w-0 flex-1 overflow-auto rounded-2xl border border-border bg-background p-4 text-foreground sm:p-6 ${
					s.mode === "dark" ? "dark" : "edmi-light"
				}`}
				style={
					{
						"--radius": `${s.radius}rem`,
						fontFamily: '"Instrument Sans", system-ui, sans-serif',
					} as React.CSSProperties
				}
			>
				<div className="columns-1 gap-4 min-[700px]:columns-2 min-[1500px]:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
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

			<Dialog
				open={dialog === "css"}
				onOpenChange={(o) => !o && setDialog(null)}
			>
				<DialogContent className="sm:max-w-2xl">
					<DialogHeader>
						<DialogTitle>Copy CSS</DialogTitle>
						<DialogDescription>
							{label}, radius {s.radius}rem. Paste after the Edmi tokens, or
							replace the <code>:root</code> and <code>.dark</code> blocks the
							theme item wrote.
						</DialogDescription>
					</DialogHeader>
					<Tabs
						value={cssTab}
						onValueChange={(v) => setCssTab(v as "css" | "tailwind")}
					>
						<TabsList>
							<TabsTrigger value="css">CSS</TabsTrigger>
							<TabsTrigger value="tailwind">Tailwind v4</TabsTrigger>
						</TabsList>
					</Tabs>
					<div className="max-h-[50vh] overflow-auto rounded-lg">
						{cssTab === "css" ? (
							<Snippet code={css} language="css" filename="globals.css" />
						) : (
							<Snippet code={tailwind} language="css" filename="app.css" />
						)}
					</div>
				</DialogContent>
			</Dialog>

			<Dialog
				open={dialog === "install"}
				onOpenChange={(o) => !o && setDialog(null)}
			>
				<DialogContent className="sm:max-w-2xl">
					<DialogHeader>
						<DialogTitle>Install {label}</DialogTitle>
						<DialogDescription>
							Installs the <code>{item}</code> registry theme. It replaces the
							color variables (light and dark); your radius stays, so copy the
							radius with Copy CSS.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-wrap gap-3">
						<Tabs value={fw} onValueChange={(v) => setFw(v as Framework)}>
							<TabsList>
								{FRAMEWORKS.map((f) => (
									<TabsTrigger key={f} value={f}>
										{FRAMEWORK_LABEL[f]}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<Tabs value={pm} onValueChange={(v) => setPm(v as PackageManager)}>
							<TabsList>
								{PMS.map((p) => (
									<TabsTrigger key={p} value={p}>
										{p}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
					</div>
					<Snippet code={install} language="bash" filename="terminal" />
				</DialogContent>
			</Dialog>
		</div>
	);
}
