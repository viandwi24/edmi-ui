<script lang="ts">
	import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import CalendarBlankIcon from 'phosphor-svelte/lib/CalendarBlank';
	import { cn } from "#lib/utils.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import type { Elevation } from "#lib/components/ui/elevation/index.js";
	import { Calendar } from "#lib/components/ui/calendar/index.js";
	import * as Popover from "#lib/components/ui/popover/index.js";

	// Date Picker = composition, not a component: Popover + outline Button + Calendar.
	let {
		value = $bindable(),
		placeholder = "Pick a date",
		locale = "en-US",
		disabled = false,
		elevation = "auto",
		class: className,
	}: {
		value?: DateValue;
		placeholder?: string;
		locale?: string;
		disabled?: boolean;
		/** ✦ depth; forwarded to the trigger button and the calendar. */
		elevation?: Elevation;
		class?: string;
	} = $props();

	let open = $state(false);

	const formatter = $derived(new DateFormatter(locale, { dateStyle: "long" }));
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				{elevation}
				{disabled}
				data-empty={!value}
				class={cn(
					"w-[240px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground",
					className
				)}
				{...props}
			>
				<CalendarBlankIcon  />
				{value ? formatter.format(value.toDate(getLocalTimeZone())) : placeholder}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar
			type="single"
			bind:value
			captionLayout="dropdown"
			{locale}
			{elevation}
			onValueChange={() => (open = false)}
		/>
	</Popover.Content>
</Popover.Root>
