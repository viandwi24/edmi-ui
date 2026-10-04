"use client";

import { cn } from "cn";
import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import type { CSSProperties, ElementType, JSX } from "react";
import { memo, useMemo } from "react";

type MotionHTMLProps = MotionProps & Record<string, unknown>;

// Cache motion components at module level to avoid creating them during render.
const motionComponentCache = new Map<
	keyof JSX.IntrinsicElements,
	React.ComponentType<MotionHTMLProps>
>();

const getMotionComponent = (element: keyof JSX.IntrinsicElements) => {
	let component = motionComponentCache.get(element);
	if (!component) {
		component = motion.create(element);
		motionComponentCache.set(element, component);
	}
	return component;
};

export interface TextShimmerProps {
	children: string;
	as?: ElementType;
	className?: string;
	/** Seconds per sweep. */
	duration?: number;
	/** Highlight width per character, in px. */
	spread?: number;
}

// The sweep is a --foreground highlight over --muted-foreground text; the 0-alpha stops only shape the
// gradient inside the text clip (no surface is transparent, DESIGN §4.16).
const ShimmerComponent = ({
	children,
	as: Component = "p",
	className,
	duration = 2,
	spread = 2,
}: TextShimmerProps) => {
	const MotionComponent = getMotionComponent(
		Component as keyof JSX.IntrinsicElements,
	);

	const dynamicSpread = useMemo(
		() => (children?.length ?? 0) * spread,
		[children, spread],
	);

	return (
		<MotionComponent
			animate={{ backgroundPosition: "0% center" }}
			className={cn(
				"relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
				"[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--foreground),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
				className,
			)}
			data-slot="ai-shimmer"
			initial={{ backgroundPosition: "100% center" }}
			style={
				{
					"--spread": `${dynamicSpread}px`,
					backgroundImage:
						"var(--bg), linear-gradient(var(--muted-foreground), var(--muted-foreground))",
				} as CSSProperties
			}
			transition={{
				duration,
				ease: "linear",
				repeat: Number.POSITIVE_INFINITY,
			}}
		>
			{children}
		</MotionComponent>
	);
};

export const Shimmer = memo(ShimmerComponent);
