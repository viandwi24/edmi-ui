import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import {
	IndexRow,
	IndexRowHeader,
} from "@edmi-react/blocks/index-row/index-row";
import { Badge } from "@edmi-react/ui/badge";
import { Card } from "@edmi-react/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@edmi-react/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import { Table, TableBody, TableHeader } from "@edmi-react/ui/table";
import { Toggle } from "@edmi-react/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { indexes, kinds, nav, sorts, strategies } from "./data";

export default function ExploreExample() {
	const [query, setQuery] = useState("");
	const [kind, setKind] = useState("all");
	const [preIpo, setPreIpo] = useState(false);
	const [strategy, setStrategy] = useState("any");
	const [sort, setSort] = useState("aum");

	const q = query.trim().toLowerCase();
	const rows = indexes.filter(
		(i) =>
			(kind === "all" || i.kind === kind) &&
			(!preIpo || i.tags?.some((tag) => tag.startsWith("Pre-IPO"))) &&
			(!q || `${i.name} ${i.symbol}`.toLowerCase().includes(q)),
	);

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						raised
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						active="#explore"
						onConnect={() => {}}
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-10 md:px-10">
				<div>
					<div className="flex items-center gap-3">
						<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
							Explore
						</h1>
						<Badge variant="secondary">Simulated</Badge>
					</div>
					<p className="mt-1 text-lg text-muted-foreground">34 indexes</p>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<InputGroup className="h-10 basis-full sm:flex-1 sm:basis-0 sm:min-w-64 sm:max-w-[440px]">
						<InputGroupAddon>
							<IconPlaceholder
								lucide="SearchIcon"
								tabler="IconSearch"
								hugeicons="SearchIcon"
								phosphor="MagnifyingGlassIcon"
								remixicon="RiSearchLine"
							/>
						</InputGroupAddon>
						<InputGroupInput
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search name, symbol, asset"
							aria-label="Search indexes"
						/>
					</InputGroup>
					<ToggleGroup
						elevation="raised"
						variant="segmented"
						value={[kind]}
						onValueChange={(v) => v[0] && setKind(v[0] as string)}
					>
						{kinds.map((k) => (
							<ToggleGroupItem key={k.value} value={k.value}>
								{k.label}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<Toggle
						elevation="raised"
						variant="outline"
						pressed={preIpo}
						onPressedChange={setPreIpo}
					>
						Pre-IPO
					</Toggle>
					<div className="flex items-center gap-3 sm:ml-auto">
						<Select
							value={strategy}
							items={strategies}
							onValueChange={(v) => setStrategy(v as string)}
						>
							<SelectTrigger elevation="raised" className="w-40">
								<SelectValue />
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								{strategies.map((s) => (
									<SelectItem key={s.value} value={s.value}>
										{s.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select
							value={sort}
							items={sorts}
							onValueChange={(v) => setSort(v as string)}
						>
							<SelectTrigger elevation="raised" className="w-28">
								<SelectValue />
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								{sorts.map((s) => (
									<SelectItem key={s.value} value={s.value}>
										{s.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<Card raised className="px-6 py-2">
					<Table>
						<TableHeader>
							<IndexRowHeader />
						</TableHeader>
						<TableBody>
							{rows.map((index) => (
								<IndexRow key={index.symbol} index={index} />
							))}
						</TableBody>
					</Table>
				</Card>
			</div>
		</div>
	);
}
