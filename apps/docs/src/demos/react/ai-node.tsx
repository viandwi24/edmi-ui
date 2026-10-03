import { Canvas } from "@edmi-react/components/ai/canvas";
import {
	Node,
	NodeContent,
	NodeDescription,
	NodeFooter,
	NodeHeader,
	NodeTitle,
} from "@edmi-react/components/ai/node";
import { Badge } from "@edmi-react/ui/badge";

const nodes = [
	{
		id: "check",
		type: "step",
		position: { x: 0, y: 0 },
		data: { selected: false },
	},
	{
		id: "decision",
		type: "decision",
		position: { x: 300, y: 0 },
		data: {},
		selected: true,
	},
];

const nodeTypes = {
	step: () => (
		<Node handles={{ target: true, source: true }}>
			<NodeHeader>
				<NodeTitle>Check drift</NodeTitle>
				<NodeDescription>Tool · get_prices</NodeDescription>
			</NodeHeader>
			<NodeContent>
				<span className="font-mono text-xs">
					MAG4 drift: <b>2.4%</b>
				</span>
			</NodeContent>
			<NodeFooter>412 ms</NodeFooter>
		</Node>
	),
	decision: () => (
		<Node handles={{ target: true, source: true }}>
			<NodeHeader>
				<NodeTitle>Decision</NodeTitle>
				<NodeDescription>drift &gt; 2%?</NodeDescription>
			</NodeHeader>
			<NodeContent className="flex gap-1.5">
				<Badge variant="success">yes</Badge>
				<Badge variant="outline">no</Badge>
			</NodeContent>
			<NodeFooter>selected</NodeFooter>
		</Node>
	),
};

export default function Demo() {
	return (
		<div className="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas nodes={nodes} nodeTypes={nodeTypes} edges={[]} />
		</div>
	);
}
