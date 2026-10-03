// FNV-1a hash + xorshift32: the same seed gives the same mark in every framework port.
function seedRandom(seed: string) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	let s = h >>> 0 || 1;
	return () => {
		s ^= s << 13;
		s >>>= 0;
		s ^= s >>> 17;
		s ^= s << 5;
		s >>>= 0;
		return s;
	};
}

const OPACITIES = [0.45, 0.58, 0.71, 0.84, 0.97];

export type AgentAvatarCell = { x: number; y: number; opacity: number };

/** 5x5 mirrored grid: three columns are drawn, the outer two mirror them. */
export function agentAvatarCells(seed: string): {
	cells: AgentAvatarCell[];
	chart: number;
} {
	const next = seedRandom(seed);
	const chart = (next() % 5) + 1;
	const cells: AgentAvatarCell[] = [];
	for (let y = 0; y < 5; y++) {
		for (let x = 0; x < 3; x++) {
			const v = next() % 8;
			if (v < 3) continue;
			const opacity = OPACITIES[v - 3] ?? 0.97;
			cells.push({ x, y, opacity });
			if (x < 2) cells.push({ x: 4 - x, y, opacity });
		}
	}
	return { cells, chart };
}
