import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/edmi/ui/accordion";
import { Button } from "@/registry/edmi/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/edmi/ui/carousel";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";
import { DirectionProvider } from "@/registry/edmi/ui/direction";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/edmi/ui/resizable";
import { ScrollArea, ScrollBar } from "@/registry/edmi/ui/scroll-area";

function AccordionDemo() {
	return (
		<Accordion defaultValue={["index"]} className="max-w-md">
			<AccordionItem value="index">
				<AccordionTrigger>What is a tokenized index?</AccordionTrigger>
				<AccordionContent>
					A token that tracks a basket of xStocks. One join buys every token in
					the basket at its weight.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="rebalance">
				<AccordionTrigger>How is it rebalanced?</AccordionTrigger>
				<AccordionContent>Weekly, by the index agent.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="cost">
				<AccordionTrigger>What does it cost?</AccordionTrigger>
				<AccordionContent>A 0.4% annual management fee.</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

function AccordionMultipleDemo() {
	return (
		<Accordion
			multiple
			defaultValue={["a", "c"]}
			variant="card"
			className="max-w-md"
		>
			<AccordionItem value="a">
				<AccordionTrigger>3.1 Vault incorporation</AccordionTrigger>
				<AccordionContent>How the vault entity is formed.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="b">
				<AccordionTrigger>3.2 Index analytics</AccordionTrigger>
				<AccordionContent>Performance and weight history.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="c">
				<AccordionTrigger>3.3 Holder support</AccordionTrigger>
				<AccordionContent>
					Answer holder questions with the agent, using the same mandate
					context.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

const rowsCollapsibleDemo = [
	"NVDAx · 32%",
	"MSFTx · 28%",
	"AAPLx · 24%",
	"ANTHRP-pre · 16%",
];

function CollapsibleDemo() {
	const [open, setOpen] = useState(false);
	return (
		<Collapsible
			open={open}
			onOpenChange={setOpen}
			className="w-[320px] rounded-xl border border-border bg-card p-3"
		>
			<div className="flex items-center justify-between">
				<span className="px-1 text-sm font-medium">3 tokens hidden</span>
				<CollapsibleTrigger
					render={<Button variant="ghost" size="icon-xs" aria-label="Toggle" />}
				>
					<IconPlaceholder
						lucide="ChevronsUpDownIcon"
						tabler="IconSelector"
						hugeicons="UnfoldMoreIcon"
						phosphor="CaretUpDownIcon"
						remixicon="RiArrowUpDownLine"
					/>
				</CollapsibleTrigger>
			</div>
			<div className="mt-2 rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]">
				{rowsCollapsibleDemo[0]}
			</div>
			<CollapsibleContent className="mt-2 flex flex-col gap-2">
				{rowsCollapsibleDemo.slice(1).map((r) => (
					<div
						key={r}
						className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]"
					>
						{r}
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}

const paneResizableDemo =
	"flex h-full items-center justify-center text-sm text-muted-foreground";

function ResizableDemo() {
	return (
		<div className="flex flex-col gap-6">
			<ResizablePanelGroup
				orientation="horizontal"
				className="min-h-[180px] max-w-md rounded-xl border border-border bg-card"
			>
				<ResizablePanel defaultSize="60%">
					<div className={paneResizableDemo}>Chart</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize="40%">
					<div className={paneResizableDemo}>Order book</div>
				</ResizablePanel>
			</ResizablePanelGroup>
			<ResizablePanelGroup
				orientation="horizontal"
				className="min-h-[220px] max-w-md rounded-xl border border-border bg-card"
			>
				<ResizablePanel defaultSize="30%">
					<div className={paneResizableDemo}>Sidebar</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize="70%">
					<ResizablePanelGroup orientation="vertical">
						<ResizablePanel defaultSize="60%">
							<div className={paneResizableDemo}>Editor</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize="40%">
							<div className={paneResizableDemo}>Agent log</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}

const tokensScrollAreaDemo = [
	["NVDAx", "32.0%"],
	["MSFTx", "28.0%"],
	["AAPLx", "24.0%"],
	["ANTHRP-pre", "16.0%"],
	["TSLAx", "—"],
	["GOOGLx", "—"],
];

function ScrollAreaDemo() {
	return (
		<div className="flex flex-wrap items-start gap-8">
			<ScrollArea className="h-40 w-56 rounded-xl border border-border bg-card">
				<div className="p-3">
					<div className="mb-1 text-xs text-muted-foreground">Tokens</div>
					{tokensScrollAreaDemo.map(([t, w]) => (
						<div
							key={t}
							className="flex justify-between border-t border-border py-2 font-mono text-[13px]"
						>
							<span>{t}</span>
							<span className="text-muted-foreground">{w}</span>
						</div>
					))}
				</div>
			</ScrollArea>
			<ScrollArea className="w-72 whitespace-nowrap">
				<div className="flex gap-3 pb-4">
					{["MAG4", "PREIPO", "AIDX", "ENRG"].map((n) => (
						<div
							key={n}
							className="w-32 shrink-0 rounded-xl border border-border bg-card p-3"
						>
							<div className="font-mono text-[11px] text-muted-foreground">
								{n}
							</div>
							<div className="mt-2 font-mono text-xl">$1.0412</div>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}

const slidesCarouselDemo = [
	["Magnificent Four", "from-blue-500 to-emerald-500"],
	["Pre-IPO Basket", "from-amber-500 to-red-500"],
	["AI Index", "from-violet-500 to-indigo-500"],
	["Energy", "from-lime-500 to-teal-500"],
];

function CarouselDemo() {
	return (
		<div className="mx-12 max-w-md">
			<Carousel opts={{ align: "start" }}>
				<CarouselContent>
					{slidesCarouselDemo.map(([name, g]) => (
						<CarouselItem key={name} className="basis-1/2">
							<div
								className={`flex h-32 items-end rounded-xl bg-linear-to-br p-3 text-sm font-semibold text-white ${g}`}
							>
								{name}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
				<CarouselDots />
			</Carousel>
		</div>
	);
}

function CardDirectionDemo({
	title,
	sub,
	join,
	share,
}: Record<string, string>) {
	return (
		<div className="w-64 rounded-xl border border-border bg-card p-4">
			<div className="text-sm font-medium">{title}</div>
			<div className="text-xs text-muted-foreground">{sub}</div>
			<div className="mt-3 flex gap-2">
				<Button size="sm">{join}</Button>
				<Button size="sm" variant="secondary">
					{share}
				</Button>
			</div>
		</div>
	);
}

function DirectionDemo() {
	return (
		<div className="flex flex-wrap gap-6">
			<DirectionProvider direction="ltr">
				<div dir="ltr">
					<CardDirectionDemo
						title="Magnificent Four"
						sub="4 tokens · rebalanced weekly"
						join="Join"
						share="Share"
					/>
				</div>
			</DirectionProvider>
			<DirectionProvider direction="rtl">
				<div dir="rtl">
					<CardDirectionDemo
						title="مؤشر الأربعة العظماء"
						sub="٤ رموز · إعادة توازن أسبوعية"
						join="انضم"
						share="مشاركة"
					/>
				</div>
			</DirectionProvider>
		</div>
	);
}

export default function LayoutPreview() {
	return (
		<div className="flex flex-col gap-10">
			<AccordionDemo />
			<AccordionMultipleDemo />
			<CollapsibleDemo />
			<ResizableDemo />
			<ScrollAreaDemo />
			<CarouselDemo />
			<DirectionDemo />
		</div>
	);
}
