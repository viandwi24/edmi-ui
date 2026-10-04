import { Canvas } from "@edmi-react/components/ai/canvas";
import {
	Node,
	NodeContent,
	NodeDescription,
	NodeHeader,
	NodeTitle,
} from "@edmi-react/components/ai/node";
import { Toolbar } from "@edmi-react/components/ai/toolbar";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";

const nodes = [
	{
		id: "decision",
		type: "decision",
		position: { x: 0, y: 40 },
		data: {},
		selected: true,
	},
];

const nodeTypes = {
	decision: () => (
		<>
			<Toolbar isVisible>
				<Button size="icon-xs" variant="ghost" aria-label="Settings">
					<svg
						aria-hidden="true"
						fill="none"
						height="14"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
						viewBox="0 0 24 24"
						width="14"
					>
						<circle cx="12" cy="12" r="3" />
						<path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
					</svg>
				</Button>
				<Button size="icon-xs" variant="ghost" aria-label="Duplicate">
					<svg
						aria-hidden="true"
						fill="none"
						height="14"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
						viewBox="0 0 24 24"
						width="14"
					>
						<rect height="11" rx="2" width="11" x="9" y="9" />
						<path d="M5 15V6a2 2 0 0 1 2-2h9" />
					</svg>
				</Button>
				<Button size="icon-xs" variant="ghost" aria-label="Delete">
					<svg
						aria-hidden="true"
						fill="none"
						height="14"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.7"
						viewBox="0 0 24 24"
						width="14"
					>
						<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
					</svg>
				</Button>
			</Toolbar>
			<Node handles={{ target: true, source: true }}>
				<NodeHeader>
					<NodeTitle>Decision</NodeTitle>
					<NodeDescription>drift &gt; 2%?</NodeDescription>
				</NodeHeader>
				<NodeContent>
					<Badge variant="success">yes</Badge>
				</NodeContent>
			</Node>
		</>
	),
};

export default function Demo() {
	return (
		<div className="h-64 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas
				edges={[]}
				fitViewOptions={{ maxZoom: 1, padding: 0.4 }}
				nodes={nodes}
				nodeTypes={nodeTypes}
			/>
		</div>
	);
}
