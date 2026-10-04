import { Canvas } from "@edmi-react/components/ai/canvas";
import {
	Node,
	NodeContent,
	NodeDescription,
	NodeFooter,
	NodeHeader,
	NodeTitle,
} from "@edmi-react/components/ai/node";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

const nodes = levels.map(({ value, label }, i) => ({
	id: value,
	type: "step",
	position: { x: (i % 2) * 290, y: Math.floor(i / 2) * 170 },
	data: { elevation: value, label },
}));

const nodeTypes = {
	step: ({
		data,
	}: {
		data: { elevation: (typeof levels)[number]["value"]; label: string };
	}) => (
		<Node handles={{ target: true, source: true }} elevation={data.elevation}>
			<NodeHeader>
				<NodeTitle>Check drift</NodeTitle>
				<NodeDescription>{data.label}</NodeDescription>
			</NodeHeader>
			<NodeContent>
				<span className="font-mono text-xs">
					MAG4 drift: <b>2.4%</b>
				</span>
			</NodeContent>
			<NodeFooter>412 ms</NodeFooter>
		</Node>
	),
};

export default function Demo() {
	return (
		<div className="h-[26rem] w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas
				edges={[]}
				fitViewOptions={{ maxZoom: 1, padding: 0.2 }}
				nodes={nodes}
				nodeTypes={nodeTypes}
			/>
		</div>
	);
}
