"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { useMemo } from "react";

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

export type AgentAvatarProps = Omit<ComponentProps<"svg">, "color"> & {
	/** Agent id: the same seed always draws the same mark. */
	seed: string;
	/** `chart-1` to `chart-5`, or any CSS color. Defaults to a chart token picked from the seed. */
	color?: string;
	/** Pixel size of the square. */
	size?: number;
	/** Muted rounded tile behind the mark (default). `false` draws the bare mark. */
	tile?: boolean;
	/** Accessible name; the mark is decorative when omitted. */
	label?: string;
};

export function AgentAvatar({
	seed,
	color,
	size = 40,
	tile = true,
	label,
	className,
	...props
}: AgentAvatarProps) {
	const { cells, chart } = useMemo(() => agentAvatarCells(seed), [seed]);
	const fill = color
		? /^chart-[1-5]$/.test(color)
			? `var(--${color})`
			: color
		: `var(--chart-${chart})`;
	const inner = tile ? size * 0.62 : size;
	const offset = tile ? size * 0.19 : 0;
	const cell = inner * 0.17;
	const step = (inner - cell) / 4;
	return (
		<svg
			data-slot="ai-agent-avatar"
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			role={label ? "img" : undefined}
			aria-label={label}
			aria-hidden={label ? undefined : true}
			className={cn("shrink-0", className)}
			{...props}
		>
			{tile && (
				<rect
					x={0.5}
					y={0.5}
					width={size - 1}
					height={size - 1}
					rx={size * 0.28}
					fill="var(--muted)"
					stroke="var(--border)"
				/>
			)}
			{cells.map((c) => (
				<rect
					key={`${c.x}-${c.y}`}
					x={offset + c.x * step}
					y={offset + c.y * step}
					width={cell}
					height={cell}
					rx={cell * 0.17}
					fill={fill}
					opacity={c.opacity}
				/>
			))}
		</svg>
	);
}
