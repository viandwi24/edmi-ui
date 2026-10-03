import { Canvas } from "@edmi-react/components/ai/canvas";
import { Controls } from "@edmi-react/components/ai/controls";
import { Edge } from "@edmi-react/components/ai/edge";
import {
	Node,
	NodeContent,
	NodeDescription,
	NodeFooter,
	NodeHeader,
	NodeTitle,
} from "@edmi-react/components/ai/node";
import { Panel } from "@edmi-react/components/ai/panel";
import { Toolbar } from "@edmi-react/components/ai/toolbar";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { edges, legend, nodes, type StepData } from "./data";

const nodeTypes = {
	step: ({ data, selected }: { data: StepData; selected?: boolean }) => (
		<>
			{data.toolbar && (
				<Toolbar isVisible={selected}>
					<Button size="icon-xs" variant="ghost" aria-label="Settings">
						<IconPlaceholder
							lucide="SettingsIcon"
							tabler="IconSettings"
							hugeicons="Settings01Icon"
							phosphor="GearIcon"
							remixicon="RiSettings3Line"
						/>
					</Button>
					<Button size="icon-xs" variant="ghost" aria-label="Duplicate">
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="Copy01Icon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					</Button>
					<Button size="icon-xs" variant="ghost" aria-label="Delete">
						<IconPlaceholder
							lucide="Trash2Icon"
							tabler="IconTrash"
							hugeicons="Delete02Icon"
							phosphor="TrashIcon"
							remixicon="RiDeleteBinLine"
						/>
					</Button>
				</Toolbar>
			)}
			<Node handles={data.handles} selected={selected}>
				<NodeHeader>
					<NodeTitle>{data.title}</NodeTitle>
					{data.description && (
						<NodeDescription>{data.description}</NodeDescription>
					)}
				</NodeHeader>
				{(data.body || data.badges || data.actions) && (
					<NodeContent
						className={data.badges || data.actions ? "flex gap-1.5" : undefined}
					>
						{data.badges ? (
							<>
								<Badge variant="success">{data.badges[0]}</Badge>
								<Badge variant="outline">{data.badges[1]}</Badge>
							</>
						) : data.actions ? (
							<>
								<Button size="xs">{data.actions[0]}</Button>
								<Button size="xs" variant="outline">
									{data.actions[1]}
								</Button>
							</>
						) : data.bodyBadge ? (
							<Badge variant="secondary">{data.body}</Badge>
						) : (
							<span className="font-mono text-xs">{data.body}</span>
						)}
					</NodeContent>
				)}
				{data.footer && <NodeFooter>{data.footer}</NodeFooter>}
			</Node>
		</>
	),
};

const edgeTypes = {
	animated: Edge.Animated,
	temporary: Edge.Temporary,
};

export default function WorkflowExample() {
	return (
		<div className="h-svh min-h-96 w-full bg-background text-foreground">
			<Canvas
				edges={edges}
				edgeTypes={edgeTypes}
				nodes={nodes}
				nodeTypes={nodeTypes}
			>
				<Controls position="bottom-left" />
				<Panel position="top-left" className="px-3 py-2.5 text-xs">
					<p className="mb-1.5 font-semibold">Legend</p>
					{legend.map((item, i) => (
						<p
							key={item.label}
							className={
								i ? "mt-1 flex items-center gap-2" : "flex items-center gap-2"
							}
						>
							<svg aria-hidden="true" height="6" width="26">
								<path
									d="M0 3h26"
									stroke={item.color}
									strokeDasharray={item.dash}
									strokeWidth="1.6"
								/>
							</svg>
							{item.label}
						</p>
					))}
				</Panel>
				<Panel position="top-right" className="flex items-center gap-1.5">
					<Button size="sm">
						<IconPlaceholder
							lucide="PlayIcon"
							tabler="IconPlayerPlay"
							hugeicons="PlayIcon"
							phosphor="PlayIcon"
							remixicon="RiPlayLine"
							className="size-3.5"
						/>
						Run
					</Button>
					<Button size="sm" variant="outline">
						Save
					</Button>
				</Panel>
			</Canvas>
		</div>
	);
}
