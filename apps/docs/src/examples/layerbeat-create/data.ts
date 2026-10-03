// Sample data for the Layerbeat "Create a BeatVPS" example. Prices are monthly USD. Shared by react.tsx, vue.vue and svelte.svelte.

export type Flag =
	| { dir: "h"; colors: [string, string, string] }
	| { dir: "v"; colors: [string, string, string] };

export type Location = {
	id: string;
	city: string;
	country: string;
	region: string;
	latency: number;
	flag: Flag;
};

const DE: Flag = { dir: "h", colors: ["#1a1a1a", "#dd0000", "#ffce00"] };
const NL: Flag = { dir: "h", colors: ["#ae1c28", "#ffffff", "#21468b"] };
const FR: Flag = { dir: "v", colors: ["#0055a4", "#ffffff", "#ef4135"] };
const SG: Flag = { dir: "h", colors: ["#ef3340", "#ffffff", "#ffffff"] };
const JP: Flag = { dir: "h", colors: ["#ffffff", "#bc002d", "#ffffff"] };
const BR: Flag = { dir: "h", colors: ["#009c3b", "#ffdf00", "#009c3b"] };
const US: Flag = { dir: "h", colors: ["#b22234", "#ffffff", "#3c3b6e"] };

export const regions = [
	"Asia",
	"Europe",
	"South America",
	"North America",
] as const;
export type Region = (typeof regions)[number];

export const locations: Location[] = [
	{
		id: "sin",
		city: "Singapore",
		country: "SG",
		region: "Asia",
		latency: 168,
		flag: SG,
	},
	{
		id: "tyo",
		city: "Tokyo",
		country: "JP",
		region: "Asia",
		latency: 210,
		flag: JP,
	},
	{
		id: "fra",
		city: "Frankfurt",
		country: "DE",
		region: "Europe",
		latency: 28,
		flag: DE,
	},
	{
		id: "ams",
		city: "Amsterdam",
		country: "NL",
		region: "Europe",
		latency: 32,
		flag: NL,
	},
	{
		id: "par",
		city: "Paris",
		country: "FR",
		region: "Europe",
		latency: 32,
		flag: FR,
	},
	{
		id: "gru",
		city: "Sao Paulo",
		country: "BR",
		region: "South America",
		latency: 190,
		flag: BR,
	},
	{
		id: "nyc",
		city: "New York",
		country: "US",
		region: "North America",
		latency: 92,
		flag: US,
	},
	{
		id: "sfo",
		city: "San Francisco",
		country: "US",
		region: "North America",
		latency: 148,
		flag: US,
	},
];

export type Plan = {
	id: string;
	vcpu: number;
	ram: number;
	ssd: number;
	transfer: number;
	price: number;
};

export const planCategories = [
	{ id: "general", label: "General VPS" },
	{ id: "fast", label: "Fast VPS" },
	{ id: "dedicated", label: "Dedicated CPU" },
] as const;
export type PlanCategory = (typeof planCategories)[number]["id"];

export const configurationCount = 28;

export const plans: Record<PlanCategory, Plan[]> = {
	general: [
		{ id: "BEAT1C1G-S", vcpu: 1, ram: 1, ssd: 15, transfer: 1, price: 1.98 },
		{ id: "BEAT2C2G-S", vcpu: 2, ram: 2, ssd: 30, transfer: 2, price: 3.38 },
		{ id: "BEAT2C4G-S", vcpu: 2, ram: 4, ssd: 50, transfer: 3, price: 5.9 },
		{ id: "BEAT4C8G-S", vcpu: 4, ram: 8, ssd: 100, transfer: 4, price: 11.4 },
		{ id: "BEAT8C16G-S", vcpu: 8, ram: 16, ssd: 200, transfer: 5, price: 22.8 },
	],
	fast: [
		{ id: "BEAT1C2G-F", vcpu: 1, ram: 2, ssd: 25, transfer: 2, price: 4.2 },
		{ id: "BEAT2C4G-F", vcpu: 2, ram: 4, ssd: 50, transfer: 3, price: 8.6 },
		{ id: "BEAT4C8G-F", vcpu: 4, ram: 8, ssd: 100, transfer: 5, price: 16.9 },
		{ id: "BEAT8C16G-F", vcpu: 8, ram: 16, ssd: 200, transfer: 8, price: 33.4 },
	],
	dedicated: [
		{ id: "BEAT2C8G-D", vcpu: 2, ram: 8, ssd: 80, transfer: 4, price: 24 },
		{ id: "BEAT4C16G-D", vcpu: 4, ram: 16, ssd: 160, transfer: 6, price: 46 },
		{ id: "BEAT8C32G-D", vcpu: 8, ram: 32, ssd: 320, transfer: 10, price: 89 },
	],
};

export type Image = {
	id: string;
	name: string;
	color: string;
	versions: { value: string; label: string }[];
};

export const images: Image[] = [
	{
		id: "ubuntu",
		name: "Ubuntu",
		color: "#e95420",
		versions: [
			{ value: "24.04", label: "24.04 LTS" },
			{ value: "22.04", label: "22.04 LTS" },
		],
	},
	{
		id: "debian",
		name: "Debian",
		color: "#a80030",
		versions: [
			{ value: "12", label: "12" },
			{ value: "11", label: "11" },
		],
	},
	{
		id: "rocky",
		name: "Rocky",
		color: "#10b981",
		versions: [
			{ value: "9.4", label: "9.4" },
			{ value: "8.10", label: "8.10" },
		],
	},
	{
		id: "alma",
		name: "Alma",
		color: "#0f3d6b",
		versions: [
			{ value: "9.4", label: "9.4" },
			{ value: "8.10", label: "8.10" },
		],
	},
];

export const billingTerms = [
	{ months: 1, label: "1 month", discount: 0 },
	{ months: 3, label: "3 months", discount: 5 },
	{ months: 6, label: "6 months", discount: 8 },
	{ months: 12, label: "12 months", discount: 12 },
];

export const workspaces = ["AChipsDAO", "Layerbeat Labs", "Personal"];

export const availableCredit = 50.01;

export const formatUsd = (n: number) => `$${n.toFixed(2)}`;

export const navPlatform = [
	{ label: "Overview", icon: "home" },
	{ label: "BeatVPS", icon: "server", active: true, badge: "1" },
	{ label: "Billing", icon: "billing" },
] as const;
export const navWorkspace = [
	{ label: "Access & keys", icon: "key" },
	{ label: "Team", icon: "team" },
] as const;
