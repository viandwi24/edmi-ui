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
import { Input } from "@edmi-react/ui/input";
import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelFooter,
	InsetPanelHeader,
} from "@edmi-react/ui/inset-panel";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@edmi-react/ui/tooltip";
import {
	ArrowCounterClockwiseIcon,
	CaretDownIcon,
	CopyIcon,
	SlidersHorizontalIcon,
	TerminalWindowIcon,
} from "@phosphor-icons/react";
import { Fragment, useEffect, useMemo, useState } from "react";
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
	/** `${base}/${theme}` -> complete composed token sets (builder presets layer on top of these) */
	vars: Record<string, ModeVars>;
};

import {
	accentSwatch,
	BUILDER_ACCENTS,
	BUILDER_BASES,
	baseSwatch,
	CUSTOM_ACCENT,
	DEFAULT_CUSTOM,
	isOfficial,
	type ModeVars,
	resolveVars,
	varsToCss,
} from "../../lib/theme-presets";

const RADII = ["0.3", "0.5", "0.625", "0.75", "1"];
const KEY = "edmi-themes";
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type State = {
	base: string;
	theme: string;
	radius: string;
	mode: "light" | "dark";
	custom: string;
};

type Option = { value: string; label: string; swatch?: React.ReactNode };

/** One customize row: label on top, then a full-width 2-segment control; options with more than two
 * values fall back to a Select (with the swatches), so extra bases/themes slot in without code changes. */
function Row({
	label,
	value,
	options,
	onChange,
	forceSegmented = false,
}: {
	label: string;
	value: string;
	options: Option[];
	onChange: (v: string) => void;
	forceSegmented?: boolean;
}) {
	const segmented = forceSegmented || options.length <= 2;
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
		<div className="flex flex-col gap-1.5">
			<span className="text-xs font-medium text-muted-foreground">{label}</span>
			{segmented ? (
				<ToggleGroup
					variant="segmented"
					aria-label={label}
					className="w-full"
					value={[value]}
					onValueChange={(v) => v[0] && onChange(v[0])}
				>
					{options.map((o) => (
						<ToggleGroupItem
							key={o.value}
							value={o.value}
							className="h-8 min-w-0 flex-1 gap-1.5 px-2 text-[13px]"
						>
							{o.swatch}
							{o.label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			) : (
				<Select
					value={value}
					items={items}
					onValueChange={(v) => v && onChange(v)}
				>
					<SelectTrigger aria-label={label} className="h-10 w-full">
						<SelectValue className="text-[13px] font-medium" />
					</SelectTrigger>
					<SelectContent alignItemWithTrigger={false}>
						{options.map((o) => (
							<SelectItem key={o.value} value={o.value}>
								{o.swatch}
								{o.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	);
}

/** Custom accent: a native colour input + hex field; the accent roles are derived in theme-presets. */
function CustomAccent({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	const [text, setText] = useState(value);
	useEffect(() => setText(value), [value]);
	return (
		<div className="-mt-2 flex items-center gap-2">
			<input
				type="color"
				aria-label="Custom accent colour"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="size-9 shrink-0 cursor-pointer rounded-lg border border-input bg-card p-1"
			/>
			<Input
				aria-label="Custom accent hex"
				value={text}
				spellCheck={false}
				className="h-9 font-mono text-[13px]"
				onChange={(e) => {
					setText(e.target.value);
					if (/^#[0-9a-f]{6}$/i.test(e.target.value)) onChange(e.target.value);
				}}
			/>
		</div>
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
		custom: DEFAULT_CUSTOM,
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
	const official = isOfficial(
		{ base: s.base, theme: s.theme, custom: s.custom },
		data,
	);
	const vars = useMemo(
		() =>
			resolveVars(
				{ base: s.base, theme: s.theme, custom: s.custom },
				data.vars,
				data,
			),
		[data, s.base, s.theme, s.custom],
	);
	const css = useMemo(
		() => varsToCss(vars, `${s.radius}rem`),
		[vars, s.radius],
	);
	const tailwind = `@import "tailwindcss";
@import "@edmi-ui/tokens/tokens.css";
@import "@edmi-ui/tokens/theme.css";

${css}`;
	const install = official
		? `# once: the Edmi tokens and Tailwind theme
${installCommand(fw, "theme", pm)}

# this base + theme (replaces the color variables, light and dark)
${installCommand(fw, item, pm)}`
		: "";
	// builder-only combos are applied as inline custom properties on the scoped preview wrapper
	const modeStyle = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(vars[s.mode]).map(([k, v]) => [`--${k}`, v]),
			),
		[vars, s.mode],
	);
	const label = `${cap(s.base)} \u00b7 ${cap(s.theme)}`;

	const reset = () => {
		setS({
			base: "stone",
			theme: "green",
			radius: "0.625",
			mode: "light",
			custom: DEFAULT_CUSTOM,
		});
		setLayered(false);
	};

	// data-driven: every row is built from theme-data; two values -> segmented, more -> Select
	const rows: Parameters<typeof Row>[0][] = [
		{
			label: "Mode",
			value: s.mode,
			onChange: (v) => set("mode", v as State["mode"]),
			options: [
				{ value: "light", label: "Light" },
				{ value: "dark", label: "Dark" },
			],
		},
		{
			label: "Style",
			value: layered ? "layered" : "flat",
			onChange: (v) => setLayered(v === "layered"),
			options: [
				{ value: "flat", label: "Flat" },
				{ value: "layered", label: "Layered \u2726" },
			],
		},
		{
			label: "Base color",
			value: s.base,
			onChange: (v) => set("base", v),
			options: [...data.bases, ...BUILDER_BASES].map((b) => ({
				value: b,
				label: cap(b),
				swatch: (
					<span
						className="size-3 shrink-0 rounded-full border border-border"
						style={{
							background: data.swatch.bases[b]?.bg ?? baseSwatch(b),
						}}
					/>
				),
			})),
		},
		{
			label: "Theme",
			value: s.theme,
			onChange: (v) => set("theme", v),
			options: [...data.themes, ...BUILDER_ACCENTS, CUSTOM_ACCENT].map((t) => ({
				value: t,
				label: cap(t),
				swatch: (
					<span
						className="size-3 shrink-0 rounded-full"
						style={{
							background: data.swatch.themes[t] ?? accentSwatch(t, s.custom),
						}}
					/>
				),
			})),
		},
		{
			label: "Radius",
			value: s.radius,
			onChange: (v) => set("radius", v),
			forceSegmented: true,
			options: RADII.map((r) => ({ value: r, label: r })),
		},
	];

	return (
		<div className="edmi-themes edmi-fit not-content flex h-full min-h-0 flex-col gap-3 min-[900px]:flex-row">
			<InsetPanel
				aria-label="Customize"
				className="shrink-0 min-[900px]:h-full min-[900px]:w-72 min-[900px]:min-h-0"
			>
				<InsetPanelHeader className="gap-3 px-4 py-3">
					<div className="min-w-0 flex-1">
						<h2 className="m-0! text-[15px] leading-tight font-medium text-foreground">
							Customize
						</h2>
						<p className="m-0! mt-0.5! hidden truncate text-xs font-normal text-muted-foreground min-[900px]:block">
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
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger
								render={
									<Button
										variant="ghost"
										size="icon-sm"
										aria-label="Reset"
										onClick={reset}
									/>
								}
							>
								<ArrowCounterClockwiseIcon className="size-4" />
							</TooltipTrigger>
							<TooltipContent>Reset to defaults</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</InsetPanelHeader>
				<InsetPanelBody
					className={`${panelOpen ? "block" : "hidden"} max-h-[55dvh] overflow-y-auto min-[900px]:block min-[900px]:max-h-none`}
				>
					<div className="flex flex-col gap-4 p-4">
						{rows.map((r) => (
							<Fragment key={r.label}>
								<Row {...r} />
								{r.label === "Theme" && s.theme === CUSTOM_ACCENT && (
									<CustomAccent
										value={s.custom}
										onChange={(v) => set("custom", v)}
									/>
								)}
							</Fragment>
						))}
					</div>
				</InsetPanelBody>
				<InsetPanelFooter className="flex gap-2 p-3">
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
				</InsetPanelFooter>
			</InsetPanel>

			<div
				data-preview
				data-base={data.bases.includes(s.base) ? s.base : "stone"}
				data-theme={data.themes.includes(s.theme) ? s.theme : "green"}
				className={`edmi-showcase relative min-h-0 min-w-0 flex-1 overflow-auto rounded-2xl border border-border bg-background p-4 text-foreground sm:p-5 min-[1200px]:p-6 ${
					s.mode === "dark" ? "dark" : "edmi-light"
				}`}
				style={
					{
						...(official ? {} : modeStyle),
						"--radius": `${s.radius}rem`,
						fontFamily: '"Instrument Sans", system-ui, sans-serif',
					} as React.CSSProperties
				}
			>
				<div className="columns-1 gap-5 min-[760px]:columns-2 min-[1500px]:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
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
							{official ? (
								<>
									Installs the <code>{item}</code> registry theme. It replaces
									the color variables (light and dark); your radius stays, so
									copy the radius with Copy CSS.
								</>
							) : (
								"Only the Stone/Slate x Green/Ocean combinations ship as registry themes."
							)}
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
					{official ? (
						<Snippet code={install} language="bash" filename="terminal" />
					) : (
						<p className="m-0! rounded-lg border border-border bg-muted p-3 text-sm text-muted-foreground">
							This combination is builder-only and has no registry item. Use
							Copy CSS to use this theme.
						</p>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
