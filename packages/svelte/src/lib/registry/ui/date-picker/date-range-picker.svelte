<script lang="ts" module>
	import type { DateValue } from "@internationalized/date";

	type DateRange = { start: DateValue | undefined; end: DateValue | undefined };
	/** ✦ A quick range shown in a column left of the calendar. */
	export type DateRangePickerPreset = { label: string; range: () => DateRange };
</script>

<script lang="ts">
	import {
		DateFormatter,
		endOfMonth,
		getLocalTimeZone,
		startOfMonth,
		today,
	} from "@internationalized/date";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { RangeCalendar } from "$lib/registry/ui/calendar/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";


	let {
		value = $bindable(),
		placeholder = "Pick a date range",
		locale = "en-US",
		disabled = false,
		presets,
		elevation = "auto",
		class: className,
	}: {
		value?: DateRange;
		placeholder?: string;
		locale?: string;
		disabled?: boolean;
		/** ✦ `true` for the default presets, or your own list. */
		presets?: boolean | DateRangePickerPreset[];
		/** ✦ depth; forwarded to the trigger button and the calendar. */
		elevation?: Elevation;
		class?: string;
	} = $props();

	const tz = getLocalTimeZone();
	const defaultPresets: DateRangePickerPreset[] = [
		{ label: "Today", range: () => ({ start: today(tz), end: today(tz) }) },
		{
			label: "Last 7 days",
			range: () => ({ start: today(tz).subtract({ days: 6 }), end: today(tz) }),
		},
		{
			label: "Last 30 days",
			range: () => ({ start: today(tz).subtract({ days: 29 }), end: today(tz) }),
		},
		{
			label: "This month",
			range: () => ({ start: startOfMonth(today(tz)), end: endOfMonth(today(tz)) }),
		},
	];
	const list = $derived(presets === true ? defaultPresets : presets || []);

	const formatter = $derived(new DateFormatter(locale, { dateStyle: "medium" }));
	const label = $derived.by(() => {
		if (!value?.start) return placeholder;
		const from = formatter.format(value.start.toDate(tz));
		if (!value.end) return from;
		return `${from} – ${formatter.format(value.end.toDate(tz))}`;
	});
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				{elevation}
				{disabled}
				data-empty={!value?.start}
				class={cn(
					"w-[260px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
					className
				)}
				{...props}
			>
				<IconPlaceholder
					lucide="CalendarIcon"
					tabler="IconCalendar"
					hugeicons="CalendarIcon"
					phosphor="CalendarBlankIcon"
					remixicon="RiCalendarLine"
				/>
				{label}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto flex-row gap-0 p-0" align="start">
		{#if list.length > 0}
			<div class="flex w-36 flex-col gap-0.5 border-r border-border p-1.5">
				{#each list as preset (preset.label)}
					<Button
						variant="ghost"
						size="sm"
						class="justify-start font-normal"
						onclick={() => (value = preset.range())}
					>
						{preset.label}
					</Button>
				{/each}
			</div>
		{/if}
		<RangeCalendar bind:value numberOfMonths={1} captionLayout="dropdown" {locale} {elevation} />
	</Popover.Content>
</Popover.Root>
