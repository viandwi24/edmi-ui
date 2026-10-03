import { aiItem, AI_CATEGORIES as C } from "./ai-shared.ts";
import type { Item } from "./types.ts";

/** AI · Workflow: board AI 08 (Canvas, Node, Edge, Connection, Controls, Panel, Toolbar, Image, Open In Chat). */
export const items: Item[] = [
	aiItem({
		name: "canvas",
		title: "Canvas",
		description:
			"Workflow canvas on xyflow (React Flow, Vue Flow, Svelte Flow) with the dotted Edmi background.",
		category: C.workflow,
	}),
	aiItem({
		name: "node",
		title: "Node",
		description:
			"Workflow node card with header, content, footer and source/target handles.",
		category: C.workflow,
		deps: ["card"],
	}),
	aiItem({
		name: "edge",
		title: "Edge",
		description: "Animated and temporary edges for the workflow canvas.",
		category: C.workflow,
	}),
	aiItem({
		name: "connection",
		title: "Connection",
		description: "Connection line shown while dragging a new edge.",
		category: C.workflow,
	}),
	aiItem({
		name: "controls",
		title: "Controls",
		description: "Zoom and fit controls for the workflow canvas.",
		category: C.workflow,
	}),
	aiItem({
		name: "panel",
		title: "Panel",
		description: "Canvas overlay panel positioned in a corner of the workflow.",
		category: C.workflow,
	}),
	aiItem({
		name: "toolbar",
		title: "Toolbar",
		description: "Floating toolbar attached to a selected node.",
		category: C.workflow,
	}),
	aiItem({
		name: "image",
		title: "Image",
		description: "Displays an AI-generated image from base64 or bytes.",
		category: C.workflow,
	}),
	aiItem({
		name: "open-in-chat",
		title: "Open In Chat",
		description:
			"Dropdown that opens a prompt in ChatGPT, Claude, T3, Scira, v0 or Cursor.",
		category: C.workflow,
		deps: ["button", "dropdown-menu"],
	}),
];
