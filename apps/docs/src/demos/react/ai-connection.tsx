import { Canvas } from "@edmi-react/components/ai/canvas";
import { Connection } from "@edmi-react/components/ai/connection";
import { Node, NodeHeader, NodeTitle } from "@edmi-react/components/ai/node";

const nodes = [
	{
		id: "a",
		type: "step",
		position: { x: 0, y: 40 },
		data: { l: "Start", t: false },
	},
	{
		id: "b",
		type: "step",
		position: { x: 320, y: 40 },
		data: { l: "Check drift", t: true },
	},
];

const nodeTypes = {
	step: ({ data }: { data: { l: string; t: boolean } }) => (
		<Node handles={{ target: data.t, source: !data.t }} className="w-40">
			<NodeHeader className="border-b-0">
				<NodeTitle>{data.l}</NodeTitle>
			</NodeHeader>
		</Node>
	),
};

export default function Demo() {
	return (
		<div className="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<p className="absolute z-10 m-3 text-xs text-muted-foreground">
				Drag from the right handle of Start.
			</p>
			<Canvas
				connectionLineComponent={Connection}
				edges={[]}
				nodes={nodes}
				nodeTypes={nodeTypes}
			/>
		</div>
	);
}
