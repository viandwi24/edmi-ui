"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { Experimental_TranscriptionResult as TranscriptionResult } from "ai";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useControllableState } from "@/registry/edmi/hooks/ai/use-controllable-state";

type TranscriptionSegment = TranscriptionResult["segments"][number];

interface TranscriptionContextValue {
	segments: TranscriptionSegment[];
	currentTime: number;
	onTimeUpdate: (time: number) => void;
	onSeek?: (time: number) => void;
}

const TranscriptionContext = createContext<TranscriptionContextValue | null>(
	null,
);

const useTranscription = () => {
	const context = useContext(TranscriptionContext);
	if (!context) {
		throw new Error(
			"Transcription components must be used within Transcription",
		);
	}
	return context;
};

export type TranscriptionProps = Omit<ComponentProps<"div">, "children"> & {
	segments: TranscriptionSegment[];
	currentTime?: number;
	onSeek?: (time: number) => void;
	children: (segment: TranscriptionSegment, index: number) => ReactNode;
};

export const Transcription = ({
	segments,
	currentTime: externalCurrentTime,
	onSeek,
	className,
	children,
	...props
}: TranscriptionProps) => {
	const [currentTime, setCurrentTime] = useControllableState({
		defaultProp: 0,
		onChange: onSeek,
		prop: externalCurrentTime,
	});

	const contextValue = useMemo(
		() => ({ currentTime, onSeek, onTimeUpdate: setCurrentTime, segments }),
		[currentTime, onSeek, setCurrentTime, segments],
	);

	return (
		<TranscriptionContext.Provider value={contextValue}>
			<div
				className={cn(
					"flex flex-wrap gap-x-1 gap-y-0.5 text-[15px] leading-[1.9]",
					className,
				)}
				data-slot="ai-transcription"
				{...props}
			>
				{segments
					.filter((segment) => segment.text.trim())
					.map((segment, index) => children(segment, index))}
			</div>
		</TranscriptionContext.Provider>
	);
};

export type TranscriptionSegmentProps = ComponentProps<"button"> & {
	segment: TranscriptionSegment;
	index: number;
};

/** States: past (`--muted-foreground`), active (`--primary` fill), future (`--muted-foreground-2`). */
export const TranscriptionSegment = ({
	segment,
	index,
	className,
	onClick,
	...props
}: TranscriptionSegmentProps) => {
	const { currentTime, onSeek } = useTranscription();

	const isActive =
		currentTime >= segment.startSecond && currentTime < segment.endSecond;
	const isPast = currentTime >= segment.endSecond;

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			if (onSeek) {
				onSeek(segment.startSecond);
			}
			onClick?.(event);
		},
		[onSeek, segment.startSecond, onClick],
	);

	return (
		<button
			className={cn(
				"inline rounded px-[3px] py-0.5 text-left transition-colors",
				isActive && "bg-primary text-primary-foreground",
				isPast && "text-muted-foreground",
				!(isActive || isPast) && "text-muted-foreground-2",
				onSeek && !isActive && "cursor-pointer hover:text-foreground",
				!onSeek && "cursor-default",
				className,
			)}
			data-active={isActive}
			data-index={index}
			data-slot="ai-transcription-segment"
			onClick={handleClick}
			type="button"
			{...props}
		>
			{segment.text}
		</button>
	);
};
