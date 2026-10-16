import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@edmi-react/ui/input-group";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@edmi-react/ui/item";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import { type Folder, library } from "../data";
import { Icon } from "./icons";
import { Pixels } from "./pixel";

const count = (n: number) => `${n} ${n === 1 ? "file" : "files"}`;

function Cover({ f }: { f: Folder }) {
	if (f.kind === "scene" && f.rects)
		return <Pixels w={80} h={60} rects={f.rects} className="size-full" />;
	return (
		<div className="grid size-full grid-cols-2 gap-2 bg-muted p-2">
			{[0, 1, 2, 3].map((n) => (
				<div
					key={n}
					className="grid place-items-center rounded-md border border-border bg-card"
				>
					{n === 1 && (
						<span className="h-4 w-3 rounded-[2px] bg-muted-foreground" />
					)}
				</div>
			))}
		</div>
	);
}

export function LibraryTab() {
	const [banner, setBanner] = useState(true);
	const [view, setView] = useState("grid");
	return (
		<div className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-4">
			<div className="flex items-center justify-between">
				<h2 className="flex items-center gap-2 text-lg font-medium">
					Library
					<Icon name="info" className="size-3.5 text-muted-foreground" />
				</h2>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="ghost"
						size="icon-xs"
						aria-label="Upload"
					>
						<Icon name="upload" className="size-4" />
					</Button>
					<ToggleGroup
						variant="segmented"
						value={[view]}
						onValueChange={(v) => v[0] && setView(v[0] as string)}
					>
						<ToggleGroupItem value="grid" aria-label="Grid">
							<Icon name="grid" className="size-3.5" />
						</ToggleGroupItem>
						<ToggleGroupItem value="list" aria-label="List">
							<Icon name="list" className="size-3.5" />
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>
			<InputGroup className="mt-3">
				<InputGroupAddon>
					<Icon name="search" />
				</InputGroupAddon>
				<InputGroupInput placeholder="Search files" />
			</InputGroup>
			{banner && (
				<Item variant="muted" size="sm" className="mt-3 items-start">
					<ItemMedia variant="icon">
						<Icon name="message" />
					</ItemMedia>
					<ItemContent>
						<ItemTitle>{library.banner.title}</ItemTitle>
						<ItemDescription className="line-clamp-none">
							{library.banner.body}
						</ItemDescription>
						<div className="pt-2">
							<Button
								type="button"
								variant="outline"
								size="xs"
								elevation="raised"
							>
								{library.banner.action}
							</Button>
						</div>
					</ItemContent>
					<ItemActions>
						<Button
							type="button"
							variant="ghost"
							size="icon-xs"
							aria-label="Dismiss"
							onClick={() => setBanner(false)}
						>
							<Icon name="close" className="size-3.5" />
						</Button>
					</ItemActions>
				</Item>
			)}
			{view === "grid" ? (
				<div className="mt-3 grid grid-cols-2 gap-3">
					{library.folders.map((f) => (
						<Card key={f.id} className="gap-0 overflow-hidden py-0">
							<div className="aspect-[4/3] overflow-hidden border-b border-border">
								<Cover f={f} />
							</div>
							<div className="px-3 py-2.5">
								<div className="text-[13px] font-medium">{f.name}</div>
								<div className="text-xs text-muted-foreground">
									{count(f.files)}
								</div>
							</div>
						</Card>
					))}
				</div>
			) : (
				<Card className="mt-3 gap-0 py-0">
					{library.folders.map((f) => (
						<Item key={f.id} size="sm">
							<ItemMedia variant="image">
								<Cover f={f} />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>{f.name}</ItemTitle>
								<ItemDescription>{count(f.files)}</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</Card>
			)}
		</div>
	);
}
