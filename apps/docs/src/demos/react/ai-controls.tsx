import { Canvas } from "@edmi-react/components/ai/canvas";
import { Controls } from "@edmi-react/components/ai/controls";
import {
	Node,
	NodeDescription,
	NodeHeader,
	NodeTitle,
} from "@edmi-react/components/ai/node";

const nodes = [
	{ id: "a", type: "step", position: { x: 0, y: 0 }, data: { t: "Start" } },
	{
		id: "b",
		type: "step",
		position: { x: 300, y: 40 },
		data: { t: "Check drift" },
	},
];

const nodeTypes = {
	step: ({ data }: { data: { t: string } }) => (
		<Node className="w-40" handles={{ target: false, source: false }}>
			<NodeHeader className="border-b-0">
				<NodeTitle>{data.t}</NodeTitle>
				<NodeDescription>Step</NodeDescription>
			</NodeHeader>
		</Node>
	),
};

export default function Demo() {
	return (
		<div className="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas edges={[]} nodes={nodes} nodeTypes={nodeTypes}>
				<Controls position="bottom-left" showFitView showInteractive showZoom />
			</Canvas>
		</div>
	);
}
