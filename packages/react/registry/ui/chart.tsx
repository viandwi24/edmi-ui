import { cn } from "cn";
import * as React from "react";
import type { TooltipValueType } from "recharts";
import * as RechartsPrimitive from "recharts";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

const INITIAL_DIMENSION = { width: 320, height: 200 } as const;
type TooltipNameType = number | string;

export type ChartConfig = Record<
	string,
	{
		label?: React.ReactNode;
		icon?: React.ComponentType;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	)
>;

type ChartContextProps = {
	config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
	const context = React.useContext(ChartContext);

	if (!context) {
		throw new Error("useChart must be used within a <ChartContainer />");
	}

	return context;
}

function ChartContainer({
	id,
	className,
	children,
	config,
	initialDimension = INITIAL_DIMENSION,
	...props
}: React.ComponentProps<"div"> & {
	config: ChartConfig;
	children: React.ComponentProps<
		typeof RechartsPrimitive.ResponsiveContainer
	>["children"];
	initialDimension?: {
		width: number;
		height: number;
	};
}) {
	const uniqueId = React.useId();
	const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-slot="chart"
				data-chart={chartId}
				className={cn(
					"flex aspect-video justify-center font-sans text-xs tabular-nums [&_.recharts-cartesian-axis-tick-value]:fill-muted-foreground [&_.recharts-cartesian-axis-tick-value]:text-xs [&_.recharts-cartesian-grid_line]:[stroke-dasharray:none] [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
					className,
				)}
				{...props}
			>
				<ChartStyle id={chartId} config={config} />
				<RechartsPrimitive.ResponsiveContainer
					initialDimension={initialDimension}
				>
					{children}
				</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
	// ✦ Series without an explicit color fall back to --chart-1…5 by order.
	const colorConfig = Object.entries(config).map(
		([key, itemConfig], index) =>
			[
				key,
				itemConfig.theme || itemConfig.color
					? itemConfig
					: { ...itemConfig, color: `var(--chart-${(index % 5) + 1})` },
			] as const,
	);

	if (!colorConfig.length) {
		return null;
	}

	return (
		<style
			// biome-ignore lint/security/noDangerouslySetInnerHtml: CSS built from the chart config only
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color =
			itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
			itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join("\n")}
}
`,
					)
					.join("\n"),
			}}
		/>
	);
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
	active,
	payload,
	className,
	indicator = "dot",
	hideLabel = false,
	hideIndicator = false,
	label,
	labelFormatter,
	labelClassName,
	formatter,
	color,
	nameKey,
	labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
	React.ComponentProps<"div"> & {
		hideLabel?: boolean;
		hideIndicator?: boolean;
		indicator?: "line" | "dot" | "dashed" | "none";
		nameKey?: string;
		labelKey?: string;
	} & Omit<
		RechartsPrimitive.DefaultTooltipContentProps<
			TooltipValueType,
			TooltipNameType
		>,
		"accessibilityLayer"
	>) {
	const { config } = useChart();

	const tooltipLabel = React.useMemo(() => {
		if (hideLabel || !payload?.length) {
			return null;
		}

		const [item] = payload;
		const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
		const itemConfig = getPayloadConfigFromPayload(config, item, key);
		const value =
			!labelKey && typeof label === "string"
				? (config[label]?.label ?? label)
				: itemConfig?.label;

		if (labelFormatter) {
			return (
				<div className={cn("font-medium text-foreground", labelClassName)}>
					{labelFormatter(value, payload)}
				</div>
			);
		}

		if (!value) {
			return null;
		}

		return (
			<div className={cn("font-medium text-foreground", labelClassName)}>
				{value}
			</div>
		);
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey,
	]);

	if (!active || !payload?.length) {
		return null;
	}

	const showIndicator = !hideIndicator && indicator !== "none";

	return (
		<div
			data-slot="chart-tooltip"
			className={cn(
				"grid min-w-36 gap-1.5 rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground text-xs shadow-floating",
				className,
			)}
		>
			{tooltipLabel}
			<div className="grid gap-1.5">
				{payload
					.filter((item) => item.type !== "none")
					.map((item, index) => {
						const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
						const itemConfig = getPayloadConfigFromPayload(config, item, key);
						const indicatorColor = color ?? item.payload?.fill ?? item.color;

						return (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: recharts payload entries have no stable id
								key={index}
								className="flex w-full items-center gap-2 [&>svg]:size-3 [&>svg]:text-muted-foreground"
							>
								{formatter && item?.value !== undefined && item.name ? (
									formatter(item.value, item.name, item, index, item.payload)
								) : (
									<>
										{itemConfig?.icon ? (
											<itemConfig.icon />
										) : (
											showIndicator && (
												<div
													className={cn("shrink-0", {
														"size-2 rounded-[2px] bg-(--color-bg)":
															indicator === "dot",
														"min-h-3.5 w-1 self-stretch rounded-[2px] bg-(--color-bg)":
															indicator === "line",
														"min-h-3.5 w-0 self-stretch border-l-2 border-dashed border-(--color-bg)":
															indicator === "dashed",
													})}
													style={
														{
															"--color-bg": indicatorColor,
														} as React.CSSProperties
													}
												/>
											)
										)}
										<span className="flex-1 text-muted-foreground">
											{itemConfig?.label ?? item.name}
										</span>
										{item.value != null && (
											<span className="ml-3 whitespace-nowrap font-semibold text-foreground tabular-nums">
												{typeof item.value === "number"
													? item.value.toLocaleString()
													: String(item.value)}
											</span>
										)}
									</>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
	className,
	hideIcon = false,
	payload,
	verticalAlign = "bottom",
	nameKey,
	swatch = "square",
}: React.ComponentProps<"div"> & {
	hideIcon?: boolean;
	nameKey?: string;
	/** ✦ `line` draws the 14x2 swatch used by line charts. */
	swatch?: "square" | "line";
} & RechartsPrimitive.DefaultLegendContentProps) {
	const { config } = useChart();

	if (!payload?.length) {
		return null;
	}

	return (
		<div
			data-slot="chart-legend"
			className={cn(
				"flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12.5px] text-foreground-2",
				verticalAlign === "top" ? "pb-2.5" : "pt-2.5",
				className,
			)}
		>
			{payload
				.filter((item) => item.type !== "none")
				.map((item, index) => {
					const key = `${nameKey ?? item.dataKey ?? "value"}`;
					const itemConfig = getPayloadConfigFromPayload(config, item, key);

					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: recharts payload entries have no stable id
							key={index}
							className="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground"
						>
							{itemConfig?.icon && !hideIcon ? (
								<itemConfig.icon />
							) : (
								<div
									className={cn(
										"shrink-0",
										swatch === "line"
											? "h-0.5 w-3.5 rounded-[1px]"
											: "size-2 rounded-[2px]",
									)}
									style={{
										backgroundColor: item.color,
									}}
								/>
							)}
							{itemConfig?.label}
						</div>
					);
				})}
		</div>
	);
}

/** ✦ Stat well: switches the series of an interactive chart. `active` sinks it (sunken, -1). */
function ChartStatWell({
	className,
	active = false,
	...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
	return (
		<button
			type="button"
			data-slot="chart-stat-well"
			data-active={active ? "" : undefined}
			aria-pressed={active}
			className={cn(
				"flex min-w-36 flex-col justify-center gap-0.5 border-border border-l px-6 py-4 text-left text-muted-foreground text-xs outline-none first:border-l-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&_b]:font-semibold [&_b]:text-[26px] [&_b]:text-foreground [&_b]:leading-[1.1] [&_b]:tracking-[-0.6px]",
				active && "bg-sk-bg shadow-sunken",
				className,
			)}
			{...props}
		/>
	);
}

function getPayloadConfigFromPayload(
	config: ChartConfig,
	payload: unknown,
	key: string,
) {
	if (typeof payload !== "object" || payload === null) {
		return undefined;
	}

	const payloadPayload =
		"payload" in payload &&
		typeof payload.payload === "object" &&
		payload.payload !== null
			? payload.payload
			: undefined;

	let configLabelKey: string = key;

	if (
		key in payload &&
		typeof payload[key as keyof typeof payload] === "string"
	) {
		configLabelKey = payload[key as keyof typeof payload] as string;
	} else if (
		payloadPayload &&
		key in payloadPayload &&
		typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
	) {
		configLabelKey = payloadPayload[
			key as keyof typeof payloadPayload
		] as string;
	}

	return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartStatWell,
	ChartStyle,
	ChartTooltip,
	ChartTooltipContent,
};
