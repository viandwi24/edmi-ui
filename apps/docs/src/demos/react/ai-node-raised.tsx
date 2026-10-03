import { Canvas } from "@edmi-react/components/ai/canvas";
import {
	Node,
	NodeContent,
	NodeDescription,
	NodeFooter,
	NodeHeader,
	NodeTitle,
} from "@edmi-react/components/ai/node";

const nodes = [
	{ id: "check", type: "step", position: { x: 0, y: 0 }, data: {} },
];

const nodeTypes = {
	step: () => (
		<Node handles={{ target: true, source: true }} raised>
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
};

export default function Demo() {
	return (
		<div className="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas nodes={nodes} nodeTypes={nodeTypes} edges={[]} />
		</div>
	);
}
