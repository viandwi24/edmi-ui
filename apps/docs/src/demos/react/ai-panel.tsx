import { Canvas } from "@edmi-react/components/ai/canvas";
import { Panel } from "@edmi-react/components/ai/panel";
import { Button } from "@edmi-react/ui/button";

export default function Demo() {
	return (
		<div className="h-56 w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
			<Canvas edges={[]} nodes={[]}>
				<Panel className="px-3 py-2.5 text-xs" position="top-left">
					<p className="mb-1.5 font-semibold">Legend</p>
					<p className="flex items-center gap-2">
						<svg aria-hidden="true" height="6" width="26">
							<path
								d="M0 3h26"
								stroke="var(--brand)"
								strokeDasharray="6 5"
								strokeWidth="1.6"
							/>
						</svg>
						active flow
					</p>
					<p className="mt-1 flex items-center gap-2">
						<svg aria-hidden="true" height="6" width="26">
							<path
								d="M0 3h26"
								stroke="var(--muted-foreground-2)"
								strokeDasharray="2 5"
								strokeWidth="1.6"
							/>
						</svg>
						conditional
					</p>
				</Panel>
				<Panel className="flex items-center gap-1.5" position="top-right">
					<Button size="sm">Run</Button>
					<Button size="sm" variant="outline">
						Save
					</Button>
				</Panel>
			</Canvas>
		</div>
	);
}
