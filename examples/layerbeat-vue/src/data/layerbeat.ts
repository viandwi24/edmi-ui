// Mock data for the "Create a BeatVPS" page. Prices are monthly USD.

export type Flag = { dir: "h" | "v"; colors: [string, string, string] };

export type Location = {
	id: string;
	city: string;
	country: string;
	code: string;
	/** Latency from the user, shown on unselected cards. */
	ms: number;
	flag: Flag;
};

export type Region = { id: string; label: string; locations: Location[] };

export const regions: Region[] = [
	{
		id: "asia",
		label: "Asia",
		locations: [
			{
				id: "singapore",
				city: "Singapore",
				country: "Singapore",
				code: "SG",
				ms: 184,
				flag: { dir: "h", colors: ["#ef3340", "#ffffff", "#ef3340"] },
			},
			{
				id: "tokyo",
				city: "Tokyo",
				country: "Japan",
				code: "JP",
				ms: 221,
				flag: { dir: "h", colors: ["#ffffff", "#bc002d", "#ffffff"] },
			},
			{
				id: "mumbai",
				city: "Mumbai",
				country: "India",
				code: "IN",
				ms: 146,
				flag: { dir: "h", colors: ["#ff9933", "#ffffff", "#138808"] },
			},
		],
	},
	{
		id: "europe",
		label: "Europe",
		locations: [
			{
				id: "frankfurt",
				city: "Frankfurt",
				country: "Germany",
				code: "DE",
				ms: 28,
				flag: { dir: "h", colors: ["#1a1a1a", "#dd0000", "#ffce00"] },
			},
			{
				id: "amsterdam",
				city: "Amsterdam",
				country: "Netherlands",
				code: "NL",
				ms: 32,
				flag: { dir: "h", colors: ["#ae1c28", "#ffffff", "#21468b"] },
			},
			{
				id: "paris",
				city: "Paris",
				country: "France",
				code: "FR",
				ms: 32,
				flag: { dir: "v", colors: ["#0055a4", "#ffffff", "#ef4135"] },
			},
		],
	},
	{
		id: "south-america",
		label: "South America",
		locations: [
			{
				id: "sao-paulo",
				city: "Sao Paulo",
				country: "Brazil",
				code: "BR",
				ms: 201,
				flag: { dir: "h", colors: ["#009c3b", "#ffdf00", "#009c3b"] },
			},
			{
				id: "santiago",
				city: "Santiago",
				country: "Chile",
				code: "CL",
				ms: 238,
				flag: { dir: "h", colors: ["#ffffff", "#ffffff", "#d52b1e"] },
			},
		],
	},
	{
		id: "north-america",
		label: "North America",
		locations: [
			{
				id: "new-york",
				city: "New York",
				country: "United States",
				code: "US",
				ms: 84,
				flag: { dir: "h", colors: ["#b22234", "#ffffff", "#3c3b6e"] },
			},
			{
				id: "toronto",
				city: "Toronto",
				country: "Canada",
				code: "CA",
				ms: 96,
				flag: { dir: "v", colors: ["#d52b1e", "#ffffff", "#d52b1e"] },
			},
			{
				id: "dallas",
				city: "Dallas",
				country: "United States",
				code: "US",
				ms: 120,
				flag: { dir: "h", colors: ["#b22234", "#ffffff", "#3c3b6e"] },
			},
		],
	},
];

export type Plan = {
	sku: string;
	vcpu: number;
	ramGb: number;
	ssdGb: number;
	transferTb: number;
	price: number;
};

export type PlanCategory = { id: string; label: string; plans: Plan[] };

const plan = (
	sku: string,
	vcpu: number,
	ramGb: number,
	ssdGb: number,
	transferTb: number,
	price: number,
): Plan => ({
	sku,
	vcpu,
	ramGb,
	ssdGb,
	transferTb,
	price,
});

export const planCategories: PlanCategory[] = [
	{
		id: "general",
		label: "General VPS",
		plans: [
			plan("BEAT1C1G-S", 1, 1, 15, 1, 1.98),
			plan("BEAT2C2G-S", 2, 2, 30, 2, 3.38),
			plan("BEAT2C4G-S", 2, 4, 50, 3, 5.9),
			plan("BEAT4C8G-S", 4, 8, 100, 4, 11.4),
			plan("BEAT8C16G-S", 8, 16, 200, 5, 22.8),
		],
	},
	{
		id: "fast",
		label: "Fast VPS",
		plans: [
			plan("BEAT1C2G-F", 1, 2, 25, 2, 3.2),
			plan("BEAT2C4G-F", 2, 4, 50, 3, 6.4),
			plan("BEAT4C8G-F", 4, 8, 100, 4, 12.8),
			plan("BEAT8C16G-F", 8, 16, 200, 6, 25.6),
		],
	},
	{
		id: "dedicated",
		label: "Dedicated CPU",
		plans: [
			plan("BEAT2C4G-D", 2, 4, 40, 3, 9.9),
			plan("BEAT4C8G-D", 4, 8, 80, 4, 19.8),
			plan("BEAT8C16G-D", 8, 16, 160, 6, 39.6),
		],
	},
];

export const configurationCount = 28;

export type OsImage = {
	id: string;
	name: string;
	color: string;
	versions: string[];
};

export const osImages: OsImage[] = [
	{
		id: "ubuntu",
		name: "Ubuntu",
		color: "#e95420",
		versions: ["24.04 LTS", "22.04 LTS", "20.04 LTS"],
	},
	{ id: "debian", name: "Debian", color: "#a80030", versions: ["12", "11"] },
	{ id: "rocky", name: "Rocky", color: "#10b981", versions: ["9.4", "8.10"] },
	{ id: "alma", name: "Alma", color: "#0f4266", versions: ["9.4", "8.10"] },
];

export type Term = { months: number; label: string; discount: number };

export const terms: Term[] = [
	{ months: 1, label: "1 month", discount: 0 },
	{ months: 3, label: "3 months", discount: 5 },
	{ months: 6, label: "6 months", discount: 8 },
	{ months: 12, label: "12 months", discount: 12 },
];

export const credit = 50.01;

export const workspaces = [
	{ id: "achipsdao", name: "AChipsDAO" },
	{ id: "personal", name: "Personal" },
	{ id: "beat-labs", name: "Beat Labs" },
];

export const user = {
	initials: "AR",
	name: "Ari Rahman",
	email: "ari@achips.dao",
};

export const money = (n: number) => `$${n.toFixed(2)}`;
