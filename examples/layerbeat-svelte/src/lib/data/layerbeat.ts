// Mock data for the "Create a BeatVPS" page. Prices are monthly, in USD.

export type Flag = { colors: string[]; direction: "horizontal" | "vertical" };

export type Location = {
	id: string;
	city: string;
	country: string;
	ping: number;
	flag: Flag;
};

export type Continent = { id: string; name: string; locations: Location[] };

const h = (...colors: string[]): Flag => ({ colors, direction: "horizontal" });
const v = (...colors: string[]): Flag => ({ colors, direction: "vertical" });

export const continents: Continent[] = [
	{
		id: "asia",
		name: "Asia",
		locations: [
			{
				id: "singapore",
				city: "Singapore",
				country: "SG",
				ping: 168,
				flag: h("#ed2939", "#ffffff"),
			},
			{
				id: "jakarta",
				city: "Jakarta",
				country: "ID",
				ping: 174,
				flag: h("#e70011", "#ffffff"),
			},
			{
				id: "mumbai",
				city: "Mumbai",
				country: "IN",
				ping: 121,
				flag: h("#ff9933", "#ffffff", "#138808"),
			},
		],
	},
	{
		id: "europe",
		name: "Europe",
		locations: [
			{
				id: "frankfurt",
				city: "Frankfurt",
				country: "DE",
				ping: 24,
				flag: h("#1a1a1a", "#dd0000", "#ffce00"),
			},
			{
				id: "amsterdam",
				city: "Amsterdam",
				country: "NL",
				ping: 32,
				flag: h("#ae1c28", "#ffffff", "#21468b"),
			},
			{
				id: "paris",
				city: "Paris",
				country: "FR",
				ping: 32,
				flag: v("#0055a4", "#ffffff", "#ef4135"),
			},
		],
	},
	{
		id: "south-america",
		name: "South America",
		locations: [
			{
				id: "sao-paulo",
				city: "São Paulo",
				country: "BR",
				ping: 198,
				flag: h("#009c3b", "#ffdf00", "#009c3b"),
			},
			{
				id: "santiago",
				city: "Santiago",
				country: "CL",
				ping: 214,
				flag: h("#ffffff", "#d52b1e"),
			},
			{
				id: "buenos-aires",
				city: "Buenos Aires",
				country: "AR",
				ping: 205,
				flag: h("#74acdf", "#ffffff", "#74acdf"),
			},
		],
	},
	{
		id: "north-america",
		name: "North America",
		locations: [
			{
				id: "new-york",
				city: "New York",
				country: "US",
				ping: 88,
				flag: h("#b22234", "#ffffff", "#3c3b6e"),
			},
			{
				id: "toronto",
				city: "Toronto",
				country: "CA",
				ping: 94,
				flag: v("#d52b1e", "#ffffff", "#d52b1e"),
			},
			{
				id: "dallas",
				city: "Dallas",
				country: "US",
				ping: 121,
				flag: h("#b22234", "#ffffff", "#3c3b6e"),
			},
		],
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

export type PlanFamily = { id: string; name: string; plans: Plan[] };

export const planFamilies: PlanFamily[] = [
	{
		id: "general",
		name: "General VPS",
		plans: [
			{ id: "BEAT1C1G-S", vcpu: 1, ram: 1, ssd: 15, transfer: 1, price: 1.98 },
			{ id: "BEAT2C2G-S", vcpu: 2, ram: 2, ssd: 30, transfer: 2, price: 3.38 },
			{ id: "BEAT2C4G-S", vcpu: 2, ram: 4, ssd: 50, transfer: 3, price: 5.9 },
			{ id: "BEAT4C8G-S", vcpu: 4, ram: 8, ssd: 100, transfer: 4, price: 11.4 },
			{
				id: "BEAT8C16G-S",
				vcpu: 8,
				ram: 16,
				ssd: 200,
				transfer: 5,
				price: 22.8,
			},
		],
	},
	{
		id: "fast",
		name: "Fast VPS",
		plans: [
			{ id: "BEAT2C4G-F", vcpu: 2, ram: 4, ssd: 60, transfer: 3, price: 8.2 },
			{ id: "BEAT4C8G-F", vcpu: 4, ram: 8, ssd: 120, transfer: 5, price: 15.9 },
			{
				id: "BEAT8C16G-F",
				vcpu: 8,
				ram: 16,
				ssd: 240,
				transfer: 8,
				price: 30.6,
			},
		],
	},
	{
		id: "dedicated",
		name: "Dedicated CPU",
		plans: [
			{ id: "BEAT2C8G-D", vcpu: 2, ram: 8, ssd: 80, transfer: 4, price: 18.4 },
			{
				id: "BEAT4C16G-D",
				vcpu: 4,
				ram: 16,
				ssd: 160,
				transfer: 6,
				price: 35.2,
			},
			{
				id: "BEAT8C32G-D",
				vcpu: 8,
				ram: 32,
				ssd: 320,
				transfer: 10,
				price: 68.9,
			},
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

export const availableCredit = 50.01;

export const workspace = { name: "AChipsDAO", user: "AR" };

export const usd = (n: number) => `$${n.toFixed(2)}`;
