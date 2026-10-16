// Sample data for the Atlas agent canvas example. Shared by all three ports. Coordinates are CSS px relative to the hub centre.

export const org = { name: "Acme Labs", initials: "AL", user: "Sam" };

export const tabs = [
	{ id: "atlas", label: "Atlas" },
	{ id: "tasks", label: "Tasks" },
	{ id: "company", label: "Company" },
	{ id: "library", label: "Library" },
] as const;
export type TabId = (typeof tabs)[number]["id"];

export const composerPlaceholder = "Ask Atlas anything about your company...";
export const atlasAgent = {
	id: "atlas",
	name: "Atlas",
	color: "var(--warning)",
};

// ---------------------------------------------------------------- pixel art (own drawing, rects only)

const plantRows = [
	"....y.yyy.y....",
	"..y.yyyyyyy.y..",
	"...yyybbbyyy...",
	"..yyybbbbbyyy..",
	"..yyybbbbbyyy..",
	"..yyybbbbbyyy..",
	"...yyybbbyyy...",
	"..y.yyyyyyy.y..",
	"....y.yyy.y....",
	".......d.......",
	".......d.......",
	"....gg.d.......",
	"...ggggd.gg....",
	".....ggd.gggg..",
	".......dgggg...",
	".......d.......",
	"..gg...d.......",
	"..ggggdd.......",
	"....ggd........",
	".......d.......",
	".......d.......",
	".......d.......",
];

const plantColors: Record<string, string> = {
	y: "var(--warning)",
	b: "color-mix(in srgb, var(--warning) 35%, var(--background))",
	g: "var(--success)",
	d: "color-mix(in srgb, var(--success) 60%, var(--background))",
};

export type Rect = { x: number; y: number; w: number; h: number; c: string };

function rowsToRects(rows: string[]): Rect[] {
	const out: Rect[] = [];
	rows.forEach((row, y) => {
		[...row].forEach((ch, x) => {
			const c = plantColors[ch];
			if (c) out.push({ x, y, w: 1, h: 1, c });
		});
	});
	return out;
}

export const plant = {
	w: 15,
	h: plantRows.length,
	rects: rowsToRects(plantRows),
};
export const plantHead = {
	w: 11,
	h: 9,
	rects: rowsToRects(plantRows.slice(0, 9))
		.map((r) => ({ ...r, x: r.x - 2 }))
		.filter((r) => r.x >= 0 && r.x < 11),
};

/** Deterministic pixel skyline used for the library covers (own scenes, no external art). */
function scene(seed: number, sky: [string, string], accent: string): Rect[] {
	let s = seed;
	const rnd = () => {
		s = (s * 1664525 + 1013904223) >>> 0;
		return s / 4294967296;
	};
	const out: Rect[] = [
		{ x: 0, y: 0, w: 80, h: 30, c: sky[0] },
		{ x: 0, y: 30, w: 80, h: 30, c: sky[1] },
	];
	for (let i = 0; i < 3; i++)
		out.push({
			x: Math.floor(rnd() * 60),
			y: 6 + Math.floor(rnd() * 14),
			w: 12 + Math.floor(rnd() * 10),
			h: 4,
			c: "color-mix(in srgb, var(--foreground) 70%, var(--card))",
		});
	let x = 0;
	while (x < 80) {
		const w = 8 + Math.floor(rnd() * 8);
		const h = 14 + Math.floor(rnd() * 26);
		out.push({
			x,
			y: 60 - h,
			w,
			h,
			c: "color-mix(in srgb, var(--background) 80%, var(--card))",
		});
		for (let wy = 60 - h + 3; wy < 57; wy += 5)
			for (let wx = x + 2; wx < x + w - 2; wx += 4)
				if (rnd() > 0.45) out.push({ x: wx, y: wy, w: 2, h: 2, c: accent });
		x += w + 1;
	}
	return out;
}

// ---------------------------------------------------------------- canvas graph

export type Tile = { x: number; y: number };
export type Dept = {
	id: string;
	label: string;
	/** token colour of the agent glyph / tint */
	color: string;
	/** solid tint of the plate (color-mix into --card) or null for the neutral label plate */
	tint: string | null;
	node: [number, number];
	/** dashed elbow from the node to the plate */
	path: string;
	end: [number, number];
	plate: { x: number; y: number; w: number; h: number };
	thumbs: Tile[];
	/** engineering: the plate is a card holding a 3x2 grid */
	grid?: boolean;
};

const D = 155;
const tint = (c: string) => `color-mix(in srgb, ${c} 16%, var(--card))`;
const pink = "color-mix(in srgb, var(--chart-5) 55%, var(--chart-4))";
const orange = "color-mix(in srgb, var(--chart-5) 50%, var(--chart-3))";
const teal = "color-mix(in srgb, var(--chart-1) 55%, var(--chart-2))";

export const RING = 219;
export const TILE = { w: 44, h: 32 };

export const depts: Dept[] = [
	{
		id: "support",
		label: "Support",
		color: pink,
		tint: null,
		node: [0, -RING],
		path: "M0 -219 V-290",
		end: [0, -290],
		plate: { x: -63, y: -318, w: 126, h: 28 },
		thumbs: [],
	},
	{
		id: "operations",
		label: "Operations",
		color: orange,
		tint: tint(orange),
		node: [D, -D],
		path: `M${D} -${D} H297 L340 -197`,
		end: [340, -197],
		plate: { x: 275, y: -229, w: 128, h: 32 },
		thumbs: [
			{ x: 403, y: -261 },
			{ x: 447, y: -261 },
			{ x: 403, y: -229 },
		],
	},
	{
		id: "finance",
		label: "Finance",
		color: "var(--chart-3)",
		tint: null,
		node: [RING, 0],
		path: "M219 0 H448",
		end: [448, 0],
		plate: { x: 448, y: -14, w: 130, h: 28 },
		thumbs: [],
	},
	{
		id: "legal",
		label: "Legal",
		color: teal,
		tint: null,
		node: [D, D],
		path: `M${D} ${D} H297 L340 198`,
		end: [340, 198],
		plate: { x: 277, y: 199, w: 126, h: 30 },
		thumbs: [],
	},
	{
		id: "engineering",
		label: "Engineering",
		color: "var(--chart-2)",
		tint: tint("var(--chart-2)"),
		node: [0, RING],
		path: "M0 219 V288",
		end: [0, 288],
		plate: { x: -65, y: 288, w: 131, h: 94 },
		thumbs: [],
		grid: true,
	},
	{
		id: "design",
		label: "Design",
		color: "var(--chart-4)",
		tint: tint("var(--chart-4)"),
		node: [-D, D],
		path: `M-${D} ${D} H-297 L-340 197`,
		end: [-340, 197],
		plate: { x: -405, y: 197, w: 130, h: 32 },
		thumbs: [
			{ x: -447, y: 229 },
			{ x: -403, y: 229 },
			{ x: -447, y: 261 },
			{ x: -403, y: 261 },
		],
	},
	{
		id: "marketing",
		label: "Marketing",
		color: "var(--chart-5)",
		tint: tint("var(--chart-5)"),
		node: [-RING, 0],
		path: "M-219 0 H-445",
		end: [-445, 0],
		plate: { x: -572, y: -16, w: 127, h: 32 },
		thumbs: [
			{ x: -616, y: -16 },
			{ x: -660, y: 16 },
			{ x: -616, y: 16 },
		],
	},
	{
		id: "sales",
		label: "Sales",
		color: "var(--chart-1)",
		tint: tint("var(--chart-1)"),
		node: [-D, -D],
		path: `M-${D} -${D} H-297 L-340 -197`,
		end: [-340, -197],
		plate: { x: -403, y: -229, w: 128, h: 32 },
		thumbs: [
			{ x: -491, y: -261 },
			{ x: -447, y: -261 },
			{ x: -403, y: -261 },
			{ x: -491, y: -229 },
			{ x: -447, y: -229 },
		],
	},
];

// ---------------------------------------------------------------- panel

export const tasks = [
	{
		id: "t1",
		name: "Draft landing copy",
		agent: "marketing",
		color: "var(--chart-2)",
		age: "13d",
		status: "running" as const,
	},
	{
		id: "t2",
		name: "Build app",
		agent: "engineering",
		color: "var(--chart-2)",
		age: "4mo",
		status: "done" as const,
	},
];

export const suggested = [
	"Build marketing website",
	"Define positioning",
	"Define brand voice",
	"Create launch post",
	"Incorporate LLC",
];

export const reply =
	"Got it. I'll break that down into tasks, hand them to the right department agents and report back here as soon as the first draft is ready.";

export type StackIcon = "domain" | "email" | "revenue" | "hosting";
export const company = {
	stack: [
		{
			icon: "domain",
			title: "Domain",
			note: "Connect your customer-facing domain",
		},
		{ icon: "email", title: "Email", note: "Configure your email domain" },
		{ icon: "revenue", title: "Revenue", note: "Connect billing" },
		{ icon: "hosting", title: "Hosting", note: "Deployment provider" },
	] as { icon: StackIcon; title: string; note: string }[],
	links: [
		{ title: "App", note: "App, source, and deployment links." },
		{
			title: "Marketing Website",
			note: "Website, source, and deployment links.",
		},
	],
	agents: [
		{
			id: "design",
			name: "Design Agent",
			note: "Design department agent.",
			color: "var(--chart-4)",
		},
		{
			id: "engineer",
			name: "Engineer",
			note: "Engineering department agent.",
			color: "var(--chart-2)",
		},
		{
			id: "marketing",
			name: "Marketing Agent",
			note: "Marketing department agent.",
			color: "var(--chart-5)",
		},
		{
			id: "sales",
			name: "Sales Agent",
			note: "Sales department agent.",
			color: "var(--chart-1)",
		},
		{
			id: "ops",
			name: "Ops Agent",
			note: "Operations department agent.",
			color: orange,
		},
	],
};

export type Folder = {
	id: string;
	name: string;
	files: number;
	kind: "grid" | "scene";
	rects?: Rect[];
};
export const library = {
	banner: {
		title: "Bring over context from other tools",
		body: "Copy a prompt that turns old chats, decisions, and working preferences into import-ready Markdown.",
		action: "Copy prompt",
	},
	folders: [
		{ id: "general", name: "General", files: 2, kind: "grid" },
		{
			id: "engineering",
			name: "Engineering",
			files: 1,
			kind: "scene",
			rects: scene(
				11,
				[
					"color-mix(in srgb, var(--chart-2) 45%, var(--card))",
					"color-mix(in srgb, var(--chart-2) 22%, var(--card))",
				],
				"var(--warning)",
			),
		},
		{
			id: "sales",
			name: "Sales",
			files: 0,
			kind: "scene",
			rects: scene(
				23,
				[
					"color-mix(in srgb, var(--chart-1) 40%, var(--card))",
					"color-mix(in srgb, var(--chart-2) 25%, var(--card))",
				],
				"var(--warning)",
			),
		},
		{
			id: "marketing",
			name: "Marketing",
			files: 0,
			kind: "scene",
			rects: scene(
				37,
				[
					"color-mix(in srgb, var(--chart-4) 45%, var(--card))",
					"color-mix(in srgb, var(--chart-5) 30%, var(--card))",
				],
				"var(--chart-3)",
			),
		},
		{
			id: "design",
			name: "Design",
			files: 0,
			kind: "scene",
			rects: scene(
				51,
				[
					"color-mix(in srgb, var(--chart-4) 35%, var(--card))",
					"color-mix(in srgb, var(--chart-2) 30%, var(--card))",
				],
				"var(--chart-4)",
			),
		},
		{
			id: "operations",
			name: "Operations",
			files: 0,
			kind: "scene",
			rects: scene(
				67,
				[
					"color-mix(in srgb, var(--chart-3) 35%, var(--card))",
					"color-mix(in srgb, var(--chart-5) 25%, var(--card))",
				],
				"var(--warning)",
			),
		},
	] as Folder[],
};

export type ChatMessage = {
	id: number;
	from: "user" | "assistant";
	text: string;
};

// ---------------------------------------------------------------- overlays, menus and thread (shared content)

export type MenuIcon =
	| "settings"
	| "globe"
	| "lightbulb"
	| "plug"
	| "gift"
	| "database"
	| "coins"
	| "keyboard"
	| "book"
	| "users"
	| "lifebuoy"
	| "plus"
	| "map"
	| "home"
	| "archive"
	| "paperclip"
	| "listChecks"
	| "trash";

export const orgMenu: {
	id: string;
	label: string;
	icon: MenuIcon;
	keys?: string[];
}[][] = [
	[
		{
			id: "settings",
			label: "Settings",
			icon: "settings",
			keys: ["⌘", "⌥", "S"],
		},
		{ id: "domains", label: "Domains", icon: "globe" },
		{ id: "skills", label: "Skills", icon: "lightbulb" },
		{ id: "integrations", label: "Integrations", icon: "plug" },
		{ id: "referrals", label: "Referrals", icon: "gift" },
		{ id: "database", label: "Database", icon: "database" },
		{ id: "billing", label: "Billing & Usage", icon: "coins" },
	],
	[
		{ id: "shortcuts", label: "Keyboard Shortcuts", icon: "keyboard" },
		{ id: "docs", label: "Docs", icon: "book" },
		{ id: "community", label: "Join community", icon: "users" },
		{ id: "support", label: "Support Request", icon: "lifebuoy" },
		{ id: "new-company", label: "Create new company", icon: "plus" },
	],
];

export const paletteCommands: {
	id: string;
	label: string;
	icon: MenuIcon;
	keys: string[];
}[] = [
	{ id: "create-task", label: "Create task", icon: "plus", keys: ["C"] },
	{
		id: "overview",
		label: "Go to overview",
		icon: "home",
		keys: ["⌘", "⌥", "O"],
	},
	{ id: "roadmap", label: "Open roadmap", icon: "map", keys: ["⌘", "⌥", "R"] },
	{
		id: "archived",
		label: "View archived tasks",
		icon: "archive",
		keys: ["⌘", "⌥", "A"],
	},
	{
		id: "settings",
		label: "Open settings",
		icon: "settings",
		keys: ["⌘", "⌥", "S"],
	},
];
export const paletteDepartments = [
	"operations",
	"engineering",
	"design",
	"marketing",
	"sales",
];
export const paletteWorkspaces = ["App", "Marketing Website"];
export const palettePlaceholder =
	"Search files, tasks, workspaces, or @ a department...";

export const shortcutList: { label: string; keys: string[] }[] = [
	{ label: "Open command palette", keys: ["⌘", "K"] },
	{ label: "Create task", keys: ["C"] },
	{ label: "Open settings", keys: ["⌘", "⌥", "S"] },
	{ label: "Go to overview", keys: ["⌘", "⌥", "O"] },
	{ label: "Open roadmap", keys: ["⌘", "⌥", "R"] },
	{ label: "Pan the canvas", keys: ["Drag"] },
];

export const roadmapStages = [
	{ title: "Incorporate", note: "Entity, bank account and domain" },
	{ title: "Build", note: "First app and landing page" },
	{ title: "Launch", note: "Outreach, content and first customers" },
];

export const composerMenu: {
	id: string;
	label: string;
	icon: MenuIcon;
}[] = [
	{ id: "attach", label: "Attach files", icon: "paperclip" },
	{ id: "plan", label: "Turn on plan mode", icon: "listChecks" },
	{ id: "clear", label: "Clear chat", icon: "trash" },
];

export type TaskRow = {
	id: string;
	name: string;
	agent: string;
	color: string;
	age: string;
	status: "running" | "done";
};

export const thread = {
	intro: [
		"Here is where Acme Labs stands today: the brand basics are in place, and two areas can move first.",
		"Brand and positioning, so every page and post sounds the same.",
		"Go-to-market, so your first customers hear from you this week.",
		"Want me to take one of them on now?",
	],
	question: "Hey Atlas, what should I do next?",
	answer:
		"Based on what we have set up so far for Acme Labs, these are the areas you can start on next.",
	actions: [
		{
			id: "a1",
			title: "Build your first app or landing page",
			dept: "Engineering",
			agent: "engineering",
			color: "var(--chart-2)",
		},
		{
			id: "a2",
			title: "Incorporate your company",
			dept: "Operations",
			agent: "operations",
			color: "color-mix(in srgb, var(--chart-5) 50%, var(--chart-3))",
		},
		{
			id: "a3",
			title: "Start reaching out to potential customers",
			dept: "Sales",
			agent: "sales",
			color: "var(--chart-1)",
		},
		{
			id: "a4",
			title: "Open the company roadmap",
			dept: "General",
			agent: "general",
			color: "var(--chart-3)",
		},
	],
};
