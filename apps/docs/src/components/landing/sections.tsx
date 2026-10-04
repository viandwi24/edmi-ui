// Landing sections built from the Edmi React registry (Card, Tabs, Select, Button, Badge, Switch, AI pack).
// Only layout wrappers are custom; every visible control is a registry component.

import {
	ArtifactCard,
	ArtifactCardActions,
	ArtifactCardBody,
	ArtifactCardIcon,
	ArtifactCardMeta,
	ArtifactCardTitle,
} from "@edmi-react/components/ai/artifact-card";
import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputHeader,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@edmi-react/components/ai/prompt-input";
import { PromptInputAgent } from "@edmi-react/components/ai/prompt-input-agent";
import {
	Reasoning,
	ReasoningContent,
	ReasoningTrigger,
} from "@edmi-react/components/ai/reasoning";
import { Tool, ToolHeader } from "@edmi-react/components/ai/tool";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { DropdownMenuItem } from "@edmi-react/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import { Switch } from "@edmi-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { CopyIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { installCommand, type PackageManager, PMS } from "../../config";
import { setLayered, useLayered } from "./cards";
import { setPm, useFramework, usePm } from "./hooks";

/* hero: install card ------------------------------------------------------------------------ */
export function InstallCard() {
	const pm = usePm();
	const [fw] = useFramework();
	const [done, setDone] = useState(false);
	const cmd = installCommand(fw, "button", pm);
	return (
		<Card className="w-full gap-0 overflow-hidden p-0 text-left">
			<div className="flex h-10 items-center gap-2 border-b border-border bg-muted pr-1.5 pl-3.5">
				<span className="flex-1 text-[12.5px] text-muted-foreground">
					Install a component
				</span>
				<Tabs value={pm} onValueChange={(v) => setPm(v as PackageManager)}>
					<TabsList
						variant="pills"
						aria-label="Package manager"
						className="gap-0.5"
					>
						{PMS.map((p) => (
							<TabsTrigger key={p} value={p} className="h-6 px-2 text-xs">
								{p}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>
			<div className="flex items-center gap-2.5 py-3 pr-2 pl-4">
				<span className="font-mono text-[13px] text-muted-foreground">$</span>
				<code className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] whitespace-nowrap [scrollbar-width:none]">
					{cmd}
				</code>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label={done ? "Copied" : "Copy command"}
					onClick={() => {
						navigator.clipboard?.writeText(cmd).catch(() => {});
						setDone(true);
						setTimeout(() => setDone(false), 1500);
					}}
				>
					<CopyIcon />
				</Button>
			</div>
		</Card>
	);
}

/* live preview controls: Style + Theme (drives data-base/data-theme on #edmi-live) ----------- */
const SCOPES = [
	{ value: "stone/green", label: "Stone · Green", dot: "var(--brand)" },
	{
		value: "stone/ocean",
		label: "Stone · Ocean",
		dot: "oklch(0.569 0.237 260.4)",
	},
	{ value: "slate/green", label: "Slate · Green", dot: "var(--brand)" },
	{
		value: "slate/ocean",
		label: "Slate · Ocean",
		dot: "oklch(0.569 0.237 260.4)",
	},
];

export function LiveBar() {
	const layered = useLayered();
	const [scope, setScope] = useState("stone/green");
	const cur = SCOPES.find((s) => s.value === scope) ?? SCOPES[0];
	const apply = (v: string) => {
		setScope(v);
		const [base, theme] = v.split("/");
		const el = document.getElementById("edmi-live");
		if (el && base && theme) {
			el.dataset.base = base;
			el.dataset.theme = theme;
		}
	};
	return (
		<div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
			<span className="text-[12.5px] text-muted-foreground">Style</span>
			<Tabs
				value={layered ? "layered" : "flat"}
				onValueChange={(v) => setLayered(v === "layered")}
			>
				<TabsList aria-label="Preview style">
					<TabsTrigger value="flat" className="h-[30px] px-3">
						Flat
					</TabsTrigger>
					<TabsTrigger value="layered" className="h-[30px] px-3">
						Layered ✦
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<span
				aria-hidden="true"
				className="mx-1 hidden h-5 w-px bg-border sm:block"
			/>
			<span className="text-[12.5px] text-muted-foreground">Theme</span>
			<Select value={scope} onValueChange={(v) => v && apply(v)}>
				<SelectTrigger size="sm" className="w-[170px]" aria-label="Theme">
					<SelectValue>
						{() => (
							<>
								<span
									className="size-2 rounded-full"
									style={{ background: cur?.dot }}
								/>
								{cur?.label}
							</>
						)}
					</SelectValue>
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false} align="end">
					{SCOPES.map((s) => (
						<SelectItem key={s.value} value={s.value}>
							<span
								className="size-2 rounded-full"
								style={{ background: s.dot }}
							/>
							{s.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

/* theming: four scoped mini cards ------------------------------------------------------------ */
const MINI = [
	{ base: "stone", theme: "green", mode: "edmi-light", label: "Stone · Green" },
	{ base: "stone", theme: "green", mode: "dark", label: "Stone · Green" },
	{ base: "slate", theme: "ocean", mode: "edmi-light", label: "Slate · Ocean" },
	{ base: "slate", theme: "ocean", mode: "dark", label: "Slate · Ocean" },
];

export function ThemeScopes() {
	return (
		<div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
			{MINI.map((m) => (
				<div
					key={`${m.base}-${m.mode}`}
					data-base={m.base}
					data-theme={m.theme}
					className={`${m.mode} contents`}
				>
					<Card
						elevation="raised"
						className="gap-3 bg-background p-4 text-foreground"
					>
						<div className="flex items-center justify-between">
							<span className="text-[13px] font-semibold">{m.label}</span>
							<Badge variant="brand" shape="pill">
								Live
							</Badge>
						</div>
						<div className="flex items-center gap-1.5">
							<Button size="sm" elevation="raised">
								Join
							</Button>
							<Button size="sm" variant="outline">
								Details
							</Button>
							<span className="flex-1" />
							<Switch defaultChecked aria-label="Switch" />
						</div>
					</Card>
				</div>
			))}
		</div>
	);
}

/* AI pack preview ---------------------------------------------------------------------------- */
export function AiPackCard() {
	return (
		<div className="flex flex-col gap-2.5 rounded-[calc(var(--radius)*1.8)] border border-border bg-muted p-5">
			<Reasoning defaultOpen={false} duration={6}>
				<ReasoningTrigger />
				<ReasoningContent>
					NVDAx is 2.4% over target; the keeper limit is 2%.
				</ReasoningContent>
			</Reasoning>
			<Tool>
				<ToolHeader type="tool-get_prices" state="output-available" />
			</Tool>
			<ArtifactCard>
				<ArtifactCardIcon kind="document" />
				<ArtifactCardBody>
					<ArtifactCardTitle>Rebalance report</ArtifactCardTitle>
					<ArtifactCardMeta>Document · PDF</ArtifactCardMeta>
				</ArtifactCardBody>
				<ArtifactCardActions>
					<DropdownMenuItem>Copy link</DropdownMenuItem>
					<DropdownMenuItem>Open</DropdownMenuItem>
				</ArtifactCardActions>
			</ArtifactCard>
			<PromptInput
				onSubmit={() => {}}
				className="[&_[data-slot=input-group]]:bg-muted"
			>
				<PromptInputHeader>
					<PromptInputAgent
						agent={{
							id: "keeper",
							name: "Keeper",
							scope: "trading",
							color: "chart-3",
						}}
					/>
				</PromptInputHeader>
				<PromptInputBody>
					<PromptInputTextarea
						placeholder="Ask Keeper anything about your index…"
						className="min-h-14"
					/>
				</PromptInputBody>
				<PromptInputFooter>
					<PromptInputTools>
						<Button
							aria-label="Attach"
							size="icon-sm"
							type="button"
							variant="ghost"
						>
							<PlusIcon />
						</Button>
					</PromptInputTools>
					<PromptInputSubmit
						size="icon-sm"
						className="size-10"
						variant="secondary"
					/>
				</PromptInputFooter>
			</PromptInput>
		</div>
	);
}
