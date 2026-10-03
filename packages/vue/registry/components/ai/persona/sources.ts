export type PersonaState =
	| "idle"
	| "listening"
	| "thinking"
	| "speaking"
	| "asleep";

export type PersonaVariant =
	| "command"
	| "glint"
	| "halo"
	| "mana"
	| "obsidian"
	| "opal";

interface PersonaSource {
	dynamicColor: boolean;
	hasModel: boolean;
	source: string;
}

/** Rive artwork per variant. The state machine is always `default`. */
export const personaSources: Record<PersonaVariant, PersonaSource> = {
	command: {
		dynamicColor: true,
		hasModel: true,
		source:
			"https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/command-2.0.riv",
	},
	glint: {
		dynamicColor: true,
		hasModel: true,
		source:
			"https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/glint-2.0.riv",
	},
	halo: {
		dynamicColor: true,
		hasModel: true,
		source:
			"https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/halo-2.0.riv",
	},
	mana: {
		dynamicColor: false,
		hasModel: true,
		source:
			"https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/mana-2.0.riv",
	},
	obsidian: {
		dynamicColor: true,
		hasModel: true,
		source:
			"https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/obsidian-2.0.riv",
	},
	opal: {
		dynamicColor: false,
		hasModel: false,
		source:
			"https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/orb-1.2.riv",
	},
};
