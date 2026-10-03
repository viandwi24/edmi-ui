import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Canvas } from "@/registry/edmi/components/ai/canvas";
import { Connection } from "@/registry/edmi/components/ai/connection";
import { Controls } from "@/registry/edmi/components/ai/controls";
import { Edge } from "@/registry/edmi/components/ai/edge";
import { Image } from "@/registry/edmi/components/ai/image";
import {
	Node,
	NodeContent,
	NodeDescription,
	NodeFooter,
	NodeHeader,
	NodeTitle,
} from "@/registry/edmi/components/ai/node";
import {
	OpenIn,
	OpenInChatGPT,
	OpenInClaude,
	OpenInContent,
	OpenInCursor,
	OpenInLabel,
	OpenInSeparator,
	OpenInTrigger,
	OpenInv0,
} from "@/registry/edmi/components/ai/open-in-chat";
import { Panel } from "@/registry/edmi/components/ai/panel";
import { Toolbar } from "@/registry/edmi/components/ai/toolbar";
import { Badge } from "@/registry/edmi/ui/badge";
import { Button } from "@/registry/edmi/ui/button";

const Label = ({ children }: { children: string }) => (
	<p className="mb-3 font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
		{children}
	</p>
);

type StepData = {
	title: string;
	description: string;
	body?: string;
	footer?: string;
	raised?: boolean;
	toolbar?: boolean;
	handles: { target: boolean; source: boolean };
};

const step = (
	id: string,
	x: number,
	y: number,
	data: StepData,
	selected = false,
) => ({ id, type: "step", position: { x, y }, data, selected });

const nodes = [
	step("start", 0, 90, {
		title: "Start",
		description: "Trigger · every hour",
		body: "cron 0 * * * *",
		handles: { target: false, source: true },
	}),
	step("drift", 330, 0, {
		title: "Check drift",
		description: "Tool · get_prices",
		body: "MAG4 drift: 2.4%",
		footer: "412 ms",
		handles: { target: true, source: true },
	}),
	step("post", 330, 190, {
		title: "Draft feed post",
		description: "Agent · writer",
		body: "Writing...",
		footer: "running",
		handles: { target: true, source: true },
	}),
	step(
		"decision",
		660,
		0,
		{
			title: "Decision",
			description: "drift > 2%?",
			body: "yes",
			toolbar: true,
			handles: { target: true, source: true },
		},
		true,
	),
	step("raised", 660, 190, {
		title: "Check drift",
		description: "Raised ✦",
		body: "MAG4 drift: 2.4%",
		raised: true,
		handles: { target: true, source: false },
	}),
];

const edges = [
	{ id: "e1", source: "start", target: "drift", type: "animated" },
	{ id: "e2", source: "start", target: "post" },
	{ id: "e3", source: "drift", target: "decision", type: "animated" },
	{ id: "e4", source: "post", target: "raised", type: "temporary" },
];

const nodeTypes = {
	step: ({ data, selected }: { data: StepData; selected?: boolean }) => (
		<>
			{data.toolbar && (
				<Toolbar isVisible>
					{["SunIcon", "CopyIcon", "TrashIcon"].map((n) => (
						<Button key={n} size="icon-xs" variant="ghost" aria-label={n}>
							<IconPlaceholder
								lucide={n}
								tabler="IconCopy"
								hugeicons="Copy01Icon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
							/>
						</Button>
					))}
				</Toolbar>
			)}
			<Node handles={data.handles} raised={data.raised} selected={selected}>
				<NodeHeader>
					<NodeTitle>{data.title}</NodeTitle>
					<NodeDescription>{data.description}</NodeDescription>
				</NodeHeader>
				<NodeContent>
					{data.body === "yes" ? (
						<Badge variant="success">yes</Badge>
					) : (
						<span className="font-mono text-xs">{data.body}</span>
					)}
				</NodeContent>
				{data.footer && <NodeFooter>{data.footer}</NodeFooter>}
			</Node>
		</>
	),
};

const edgeTypes = { animated: Edge.Animated, temporary: Edge.Temporary };

const svg = btoa(
	"<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><defs><radialGradient id='a' cx='25%' cy='30%' r='45%'><stop offset='0' stop-color='#e8a33d'/><stop offset='1' stop-color='#e8a33d' stop-opacity='0'/></radialGradient></defs><rect width='600' height='400' fill='#62a07a'/><rect width='600' height='400' fill='url(#a)'/></svg>",
);

export default function AiWorkflowPreview() {
	return (
		<div className="flex max-w-4xl flex-col gap-12">
			<section>
				<Label>Canvas · Node · Edge · Controls · Panel · Toolbar</Label>
				<div className="h-[440px] overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
					<Canvas
						connectionLineComponent={Connection}
						edges={edges}
						edgeTypes={edgeTypes}
						nodes={nodes}
						nodeTypes={nodeTypes}
					>
						<Controls position="bottom-left" />
						<Panel position="top-right" className="flex gap-1.5">
							<Button size="sm">Run</Button>
							<Button size="sm" variant="outline">
								Save
							</Button>
						</Panel>
					</Canvas>
				</div>
			</section>
			<section>
				<Label>Image</Label>
				<Image
					alt="Generated"
					base64={svg}
					className="aspect-[3/2] w-72"
					mediaType="image/svg+xml"
					uint8Array={new Uint8Array()}
				/>
			</section>
			<section>
				<Label>Open in chat</Label>
				<OpenIn query="Rebalance MAG4">
					<OpenInTrigger />
					<OpenInContent>
						<OpenInLabel>Open in chat</OpenInLabel>
						<OpenInSeparator />
						<OpenInClaude />
						<OpenInChatGPT />
						<OpenInv0 />
						<OpenInCursor />
					</OpenInContent>
				</OpenIn>
			</section>
		</div>
	);
}
