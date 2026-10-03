"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { Experimental_SpeechResult as SpeechResult } from "ai";
import { cn } from "cn";
import {
	MediaControlBar,
	MediaController,
	MediaDurationDisplay,
	MediaMuteButton,
	MediaPlayButton,
	MediaSeekBackwardButton,
	MediaSeekForwardButton,
	MediaTimeDisplay,
	MediaTimeRange,
	MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps, CSSProperties } from "react";
import { buttonVariants } from "@/registry/edmi/ui/button";

// Built on ui/button (DESIGN §5b): round primary play button, ghost icon buttons for seek and mute, mono
// tabular times. The ranges are media-chrome ranges themed through its CSS variables (brand fill, --muted track).

export type AudioPlayerProps = Omit<
	ComponentProps<typeof MediaController>,
	"audio"
>;

/** Card shell (`--card`, 1px border) around the media-chrome controller; the controls are children. */
export const AudioPlayer = ({
	children,
	className,
	style,
	...props
}: AudioPlayerProps) => (
	<MediaController
		audio
		data-slot="ai-audio-player"
		className={cn(
			"block w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-foreground",
			className,
		)}
		style={
			{
				"--media-background-color": "transparent",
				"--media-button-icon-height": "0.875rem",
				"--media-button-icon-width": "0.875rem",
				"--media-control-background": "transparent",
				"--media-control-hover-background": "transparent",
				"--media-control-padding": "0",
				"--media-font": "var(--font-sans)",
				"--media-font-size": "12px",
				"--media-icon-color": "currentColor",
				"--media-preview-time-background": "var(--popover)",
				"--media-preview-time-border-radius": "6px",
				"--media-preview-time-text-shadow": "none",
				"--media-primary-color": "var(--foreground)",
				"--media-range-bar-color": "var(--brand)",
				"--media-range-track-background": "var(--border)",
				"--media-range-track-border-radius": "999px",
				"--media-range-track-height": "4px",
				"--media-range-thumb-background": "var(--brand)",
				"--media-range-thumb-border-radius": "999px",
				"--media-range-thumb-height": "12px",
				"--media-range-thumb-width": "12px",
				"--media-secondary-color": "var(--muted)",
				"--media-text-color": "var(--foreground)",
				"--media-tooltip-arrow-display": "none",
				"--media-tooltip-background": "var(--popover)",
				"--media-tooltip-border-radius": "6px",
				...style,
			} as CSSProperties
		}
		{...props}
	>
		{children}
	</MediaController>
);

export type AudioPlayerElementProps = Omit<ComponentProps<"audio">, "src"> &
	(
		| {
				data: SpeechResult["audio"];
		  }
		| {
				src: string;
		  }
	);

export const AudioPlayerElement = ({ ...props }: AudioPlayerElementProps) => (
	// Captions are provided by the consumer.
	<audio
		data-slot="ai-audio-player-element"
		slot="media"
		src={
			"src" in props
				? props.src
				: `data:${props.data.mediaType};base64,${props.data.base64}`
		}
		{...props}
	/>
);

export type AudioPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const AudioPlayerControlBar = ({
	className,
	...props
}: AudioPlayerControlBarProps) => (
	<MediaControlBar
		data-slot="ai-audio-player-control-bar"
		className={cn("flex w-full items-center gap-2", className)}
		{...props}
	/>
);

export type AudioPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

/** The only filled control: a 36px round primary button. */
export const AudioPlayerPlayButton = ({
	className,
	...props
}: AudioPlayerPlayButtonProps) => (
	<MediaPlayButton
		data-slot="ai-audio-player-play-button"
		className={cn(
			buttonVariants({ variant: "default", size: "icon" }),
			"rounded-full",
			className,
		)}
		{...props}
	/>
);

export type AudioPlayerSeekBackwardButtonProps = ComponentProps<
	typeof MediaSeekBackwardButton
>;

export const AudioPlayerSeekBackwardButton = ({
	seekOffset = 10,
	className,
	...props
}: AudioPlayerSeekBackwardButtonProps) => (
	<MediaSeekBackwardButton
		data-slot="ai-audio-player-seek-backward-button"
		className={cn(
			buttonVariants({ variant: "ghost", size: "icon-sm" }),
			className,
		)}
		seekOffset={seekOffset}
		{...props}
	/>
);

export type AudioPlayerSeekForwardButtonProps = ComponentProps<
	typeof MediaSeekForwardButton
>;

export const AudioPlayerSeekForwardButton = ({
	seekOffset = 10,
	className,
	...props
}: AudioPlayerSeekForwardButtonProps) => (
	<MediaSeekForwardButton
		data-slot="ai-audio-player-seek-forward-button"
		className={cn(
			buttonVariants({ variant: "ghost", size: "icon-sm" }),
			className,
		)}
		seekOffset={seekOffset}
		{...props}
	/>
);

export type AudioPlayerTimeDisplayProps = ComponentProps<
	typeof MediaTimeDisplay
>;

export const AudioPlayerTimeDisplay = ({
	className,
	...props
}: AudioPlayerTimeDisplayProps) => (
	<MediaTimeDisplay
		data-slot="ai-audio-player-time-display"
		className={cn(
			"font-mono text-xs text-foreground tabular-nums [--media-font:var(--font-mono)]",
			className,
		)}
		{...props}
	/>
);

export type AudioPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const AudioPlayerTimeRange = ({
	className,
	...props
}: AudioPlayerTimeRangeProps) => (
	<MediaTimeRange
		data-slot="ai-audio-player-time-range"
		className={cn("h-7 min-w-0 flex-1 px-1", className)}
		{...props}
	/>
);

export type AudioPlayerDurationDisplayProps = ComponentProps<
	typeof MediaDurationDisplay
>;

export const AudioPlayerDurationDisplay = ({
	className,
	...props
}: AudioPlayerDurationDisplayProps) => (
	<MediaDurationDisplay
		data-slot="ai-audio-player-duration-display"
		className={cn(
			"font-mono text-xs text-muted-foreground tabular-nums [--media-font:var(--font-mono)] [--media-text-color:var(--muted-foreground)]",
			className,
		)}
		{...props}
	/>
);

export type AudioPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const AudioPlayerMuteButton = ({
	className,
	...props
}: AudioPlayerMuteButtonProps) => (
	<MediaMuteButton
		data-slot="ai-audio-player-mute-button"
		className={cn(
			buttonVariants({ variant: "ghost", size: "icon-sm" }),
			className,
		)}
		{...props}
	/>
);

export type AudioPlayerVolumeRangeProps = ComponentProps<
	typeof MediaVolumeRange
>;

export const AudioPlayerVolumeRange = ({
	className,
	...props
}: AudioPlayerVolumeRangeProps) => (
	<MediaVolumeRange
		data-slot="ai-audio-player-volume-range"
		className={cn("h-7 w-[70px] px-1", className)}
		{...props}
	/>
);
