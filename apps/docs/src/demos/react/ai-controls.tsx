import { Canvas } from "@edmi-react/components/ai/canvas";
import { Controls } from "@edmi-react/components/ai/controls";

export default function Demo() {
	return (
		<div className="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas edges={[]} nodes={[]}>
				<Controls position="bottom-left" showFitView showInteractive showZoom />
			</Canvas>
		</div>
	);
}
