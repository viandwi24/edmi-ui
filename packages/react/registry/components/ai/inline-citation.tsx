"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
import { Button } from "@/registry/edmi/ui/button";
import type { CarouselApi } from "@/registry/edmi/ui/carousel";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/registry/edmi/ui/carousel";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/edmi/ui/hover-card";

export type InlineCitationProps = ComponentProps<"span">;

export const InlineCitation = ({
	className,
	...props
}: InlineCitationProps) => (
	<span
		data-slot="ai-inline-citation"
		className={cn("group/citation inline items-center gap-1", className)}
		{...props}
	/>
);

export type InlineCitationTextProps = ComponentProps<"span">;

export const InlineCitationText = ({
	className,
	...props
}: InlineCitationTextProps) => (
	<span
		data-slot="ai-inline-citation-text"
		className={cn(
			"transition-colors group-hover/citation:bg-accent",
			className,
		)}
		{...props}
	/>
);

export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;

export const InlineCitationCard = (props: InlineCitationCardProps) => (
	<HoverCard {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
	sources: string[];
};

const hostOf = (url: string) => {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url;
	}
};

export const InlineCitationCardTrigger = ({
	sources,
	className,
	...props
}: InlineCitationCardTriggerProps) => (
	<HoverCardTrigger
		closeDelay={0}
		delay={0}
		render={
			<Badge
				data-slot="ai-inline-citation-trigger"
				className={cn(
					"ml-1 h-5 cursor-default px-[7px] align-[1px] text-[11.5px] font-normal text-foreground-2",
					className,
				)}
				shape="pill"
				variant="secondary"
				{...props}
			/>
		}
	>
		{sources[0] ? (
			<>
				{hostOf(sources[0])} {sources.length > 1 && `+${sources.length - 1}`}
			</>
		) : (
			"unknown"
		)}
	</HoverCardTrigger>
);

export type InlineCitationCardBodyProps = ComponentProps<
	typeof HoverCardContent
>;

export const InlineCitationCardBody = ({
	className,
	...props
}: InlineCitationCardBodyProps) => (
	<HoverCardContent
		className={cn("relative w-80 overflow-hidden p-0", className)}
		{...props}
	/>
);

const CarouselApiContext = createContext<CarouselApi | undefined>(undefined);

const useCarouselApi = () => {
	const context = useContext(CarouselApiContext);
	return context;
};

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

export const InlineCitationCarousel = ({
	className,
	children,
	...props
}: InlineCitationCarouselProps) => {
	const [api, setApi] = useState<CarouselApi>();

	return (
		<CarouselApiContext.Provider value={api}>
			<Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
				{children}
			</Carousel>
		</CarouselApiContext.Provider>
	);
};

export type InlineCitationCarouselContentProps = ComponentProps<"div">;

export const InlineCitationCarouselContent = (
	props: InlineCitationCarouselContentProps,
) => <CarouselContent {...props} />;

export type InlineCitationCarouselItemProps = ComponentProps<"div">;

// CarouselContent has a -ml-4 gutter, so the left padding is gutter (16) + content inset (14).
export const InlineCitationCarouselItem = ({
	className,
	...props
}: InlineCitationCarouselItemProps) => (
	<CarouselItem
		className={cn("w-full space-y-1 py-3 pr-3.5 pl-[30px]", className)}
		{...props}
	/>
);

export type InlineCitationCarouselHeaderProps = ComponentProps<"div">;

export const InlineCitationCarouselHeader = ({
	className,
	...props
}: InlineCitationCarouselHeaderProps) => (
	<div
		data-slot="ai-inline-citation-header"
		className={cn(
			"flex items-center gap-0.5 border-b border-border px-2.5 py-2",
			className,
		)}
		{...props}
	/>
);

export type InlineCitationCarouselIndexProps = ComponentProps<"div">;

export const InlineCitationCarouselIndex = ({
	children,
	className,
	...props
}: InlineCitationCarouselIndexProps) => {
	const api = useCarouselApi();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	const syncState = useCallback(() => {
		if (!api) {
			return;
		}
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);
	}, [api]);

	useEffect(() => {
		if (!api) {
			return;
		}

		syncState();

		api.on("select", syncState);

		return () => {
			api.off("select", syncState);
		};
	}, [api, syncState]);

	return (
		<div
			className={cn(
				"ml-auto font-mono text-xs text-muted-foreground tabular-nums",
				className,
			)}
			{...props}
		>
			{children ?? `${current}/${count}`}
		</div>
	);
};

export type InlineCitationCarouselPrevProps = ComponentProps<typeof Button>;

export const InlineCitationCarouselPrev = ({
	className,
	children,
	...props
}: InlineCitationCarouselPrevProps) => {
	const api = useCarouselApi();

	const handleClick = useCallback(() => {
		if (api) {
			api.scrollPrev();
		}
	}, [api]);

	return (
		<Button
			aria-label="Previous"
			className={className}
			onClick={handleClick}
			size="icon-xs"
			type="button"
			variant="ghost"
			{...props}
		>
			{children ?? (
				<IconPlaceholder
					lucide="ChevronLeftIcon"
					tabler="IconChevronLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="CaretLeftIcon"
					remixicon="RiArrowLeftSLine"
				/>
			)}
		</Button>
	);
};

export type InlineCitationCarouselNextProps = ComponentProps<typeof Button>;

export const InlineCitationCarouselNext = ({
	className,
	children,
	...props
}: InlineCitationCarouselNextProps) => {
	const api = useCarouselApi();

	const handleClick = useCallback(() => {
		if (api) {
			api.scrollNext();
		}
	}, [api]);

	return (
		<Button
			aria-label="Next"
			className={className}
			onClick={handleClick}
			size="icon-xs"
			type="button"
			variant="ghost"
			{...props}
		>
			{children ?? (
				<IconPlaceholder
					lucide="ChevronRightIcon"
					tabler="IconChevronRight"
					hugeicons="ArrowRight01Icon"
					phosphor="CaretRightIcon"
					remixicon="RiArrowRightSLine"
				/>
			)}
		</Button>
	);
};

export type InlineCitationSourceProps = ComponentProps<"div"> & {
	title?: string;
	url?: string;
	description?: string;
};

export const InlineCitationSource = ({
	title,
	url,
	description,
	className,
	children,
	...props
}: InlineCitationSourceProps) => (
	<div
		data-slot="ai-inline-citation-source"
		className={cn("space-y-0.5", className)}
		{...props}
	>
		{title && (
			<h4 className="truncate text-[13.5px] leading-tight font-semibold">
				{title}
			</h4>
		)}
		{url && (
			<p className="truncate font-mono text-[11.5px] text-muted-foreground">
				{url.replace(/^https?:\/\//, "")}
			</p>
		)}
		{description && (
			<p className="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
				{description}
			</p>
		)}
		{children}
	</div>
);

export type InlineCitationQuoteProps = ComponentProps<"blockquote">;

export const InlineCitationQuote = ({
	children,
	className,
	...props
}: InlineCitationQuoteProps) => (
	<blockquote
		data-slot="ai-inline-citation-quote"
		className={cn(
			"mt-2.5 border-l-2 border-border pl-2.5 text-[12.5px] text-foreground-2",
			className,
		)}
		{...props}
	>
		{children}
	</blockquote>
);
