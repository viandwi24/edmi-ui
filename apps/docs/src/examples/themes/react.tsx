import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { Checkbox } from "@edmi-react/ui/checkbox";
import { Input } from "@edmi-react/ui/input";
import { Label } from "@edmi-react/ui/label";
import { Switch } from "@edmi-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { type CSSProperties, useState } from "react";
import {
	type ControlKey,
	controls,
	defaults,
	intro,
	preview,
	type State,
	snippet,
	snippetTitle,
} from "./data";

export default function ThemesExample() {
	const [s, setS] = useState<State>(defaults);
	const set = (key: ControlKey, value: string) =>
		setS((p) => ({ ...p, [key]: value }));
	const raised = s.raised === "raised";

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 py-10 md:px-10 md:py-14">
				<div className="flex flex-col gap-3">
					<h1 className="text-[40px] leading-tight font-normal tracking-[-1.5px] md:text-[52px]">
						{intro.title}
					</h1>
					<p className="max-w-2xl text-muted-foreground">{intro.body}</p>
				</div>

				<Card raised className="gap-5 p-6">
					<div className="grid gap-5 sm:grid-cols-2">
						{controls.map((c) => (
							<div key={c.key} className="flex flex-col gap-2">
								<div className="flex items-baseline gap-2">
									<span className="text-[13px] font-medium">{c.label}</span>
									<span className="font-mono text-[11px] text-muted-foreground">
										{c.hint}
									</span>
								</div>
								<ToggleGroup
									elevation="raised"
									variant="segmented"
									className="flex-wrap"
									value={[s[c.key]]}
									onValueChange={(v) => v[0] && set(c.key, v[0] as string)}
								>
									{c.options.map((o) => (
										<ToggleGroupItem key={o.value} value={o.value}>
											{o.label}
										</ToggleGroupItem>
									))}
								</ToggleGroup>
							</div>
						))}
					</div>
				</Card>

				<div
					data-base={s.base}
					data-theme={s.theme}
					style={{ "--radius": `${s.radius}rem` } as CSSProperties}
					className={`${s.mode === "dark" ? "dark " : "edmi-light "}rounded-xl border border-border bg-background p-4 text-foreground sm:p-6`}
				>
					<div className="grid gap-4 md:grid-cols-2">
						<Card raised={raised} className="gap-4 px-5">
							<div className="flex items-center justify-between">
								<span className="text-lg font-medium">
									{preview.name} · {s.base}·{s.theme}
								</span>
								<Badge variant="success">Live</Badge>
							</div>
							<Tabs defaultValue="nav">
								<TabsList raised={raised}>
									{preview.tabs.map((t) => (
										<TabsTrigger key={t.value} value={t.value}>
											{t.label}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
							<div className="rounded-xl border border-border-2 bg-muted p-4">
								<div className="text-[13px] text-muted-foreground">
									{preview.aumLabel}
								</div>
								<div className="mt-1 flex items-center gap-3">
									<span className="font-mono text-3xl tracking-[-0.5px]">
										{preview.aum}
									</span>
									<Badge variant="success" shape="number">
										{preview.delta}
									</Badge>
								</div>
							</div>
							<div className="flex flex-wrap items-center gap-2">
								<Button
									elevation={raised ? "raised" : undefined}
									variant="brand"
								>
									{preview.join}
								</Button>
								<Button
									elevation={raised ? "raised" : undefined}
									variant="outline"
								>
									{preview.details}
								</Button>
								<Label className="ml-auto gap-2.5 text-[13px]">
									<Switch
										elevation={raised ? "raised" : undefined}
										defaultChecked
									/>
									{preview.keeper}
								</Label>
							</div>
						</Card>

						<Card raised={raised} className="gap-4 px-5">
							<div className="flex flex-wrap gap-2">
								{preview.variants.map((v) => (
									<Button
										key={v}
										elevation={raised ? "raised" : undefined}
										variant={v}
										size="sm"
									>
										{v}
									</Button>
								))}
							</div>
							<div className="flex flex-wrap gap-2">
								{preview.badges.map((b) => (
									<Badge key={b} variant={b}>
										{b}
									</Badge>
								))}
							</div>
							<Input placeholder={preview.placeholder} />
							<Label className="gap-2.5 text-[13px]">
								<Checkbox
									elevation={raised ? "raised" : undefined}
									defaultChecked
								/>
								{preview.mandate}
							</Label>
						</Card>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<span className="text-[13px] font-medium">{snippetTitle}</span>
					<pre className="overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-xs leading-relaxed">
						{snippet(s)}
					</pre>
				</div>
			</div>
		</div>
	);
}
