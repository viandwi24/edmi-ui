<script lang="ts">
	import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	// ✦ Month/year dropdown caption (React `captionLayout="dropdown"`): a styled native <select> under a label.
	let {
		captionLayout = "label",
		month,
		placeholder = $bindable(),
		locale = "en-US",
		monthIndex = 0,
		minValue,
		maxValue,
	}: {
		captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
		/** The month this caption is for (first of the displayed month). */
		month: DateValue;
		placeholder: DateValue | undefined;
		locale?: string;
		monthIndex?: number;
		minValue?: DateValue;
		maxValue?: DateValue;
	} = $props();

	const tz = getLocalTimeZone();
	const monthFmt = $derived(new DateFormatter(locale, { month: "short" }));
	const longFmt = $derived(new DateFormatter(locale, { month: "long" }));
	const yearFmt = $derived(new DateFormatter(locale, { year: "numeric" }));

	const months = $derived(
		Array.from({ length: 12 }, (_, i) => {
			const m = i + 1;
			return { value: m, label: monthFmt.format(month.set({ month: m, day: 1 }).toDate(tz)) };
		})
	);
	const years = $derived.by(() => {
		const from = minValue?.year ?? month.year - 100;
		const to = maxValue?.year ?? month.year + 10;
		return Array.from({ length: to - from + 1 }, (_, i) => {
			const y = from + i;
			return { value: y, label: yearFmt.format(month.set({ year: y, day: 1 }).toDate(tz)) };
		});
	});

	function setPlaceholder(part: { month: number } | { year: number }) {
		if (!placeholder) return;
		placeholder = placeholder.set(part).subtract({ months: monthIndex });
	}
</script>

{#snippet Caret()}
	<IconPlaceholder
		lucide="ChevronDownIcon"
		tabler="IconChevronDown"
		hugeicons="ArrowDown01Icon"
		phosphor="CaretDownIcon"
		remixicon="RiArrowDownSLine"
	/>
{/snippet}

{#snippet MonthSelect()}
	<span
		class="relative rounded-md border border-input bg-card has-focus:border-ring has-focus:shadow-ring"
	>
		<span
			class="pointer-events-none flex h-7 items-center gap-1 rounded-md pr-1.5 pl-2 text-[13px] font-medium [&>svg]:size-3.5 [&>svg]:text-muted-foreground"
			aria-hidden="true"
		>
			{monthFmt.format(month.toDate(tz))}
			{@render Caret()}
		</span>
		<select
			class="absolute inset-0 w-full cursor-pointer bg-popover opacity-0"
			aria-label="Month"
			value={month.month}
			onchange={(e) => setPlaceholder({ month: Number.parseInt(e.currentTarget.value) })}
		>
			{#each months as m (m.value)}
				<option value={m.value} selected={m.value === month.month}>{m.label}</option>
			{/each}
		</select>
	</span>
{/snippet}

{#snippet YearSelect()}
	<span
		class="relative rounded-md border border-input bg-card has-focus:border-ring has-focus:shadow-ring"
	>
		<span
			class="pointer-events-none flex h-7 items-center gap-1 rounded-md pr-1.5 pl-2 text-[13px] font-medium [&>svg]:size-3.5 [&>svg]:text-muted-foreground"
			aria-hidden="true"
		>
			{yearFmt.format(month.toDate(tz))}
			{@render Caret()}
		</span>
		<select
			class="absolute inset-0 w-full cursor-pointer bg-popover opacity-0"
			aria-label="Year"
			value={month.year}
			onchange={(e) => setPlaceholder({ year: Number.parseInt(e.currentTarget.value) })}
		>
			{#each years as y (y.value)}
				<option value={y.value} selected={y.value === month.year}>{y.label}</option>
			{/each}
		</select>
	</span>
{/snippet}

{#if captionLayout === "dropdown"}
	{@render MonthSelect()}
	{@render YearSelect()}
{:else if captionLayout === "dropdown-months"}
	{@render MonthSelect()}
	<span class="text-[13px] font-medium">{yearFmt.format(month.toDate(tz))}</span>
{:else if captionLayout === "dropdown-years"}
	<span class="text-[13px] font-medium">{monthFmt.format(month.toDate(tz))}</span>
	{@render YearSelect()}
{:else}
	<span class="text-sm font-semibold select-none">
		{longFmt.format(month.toDate(tz))}
		{yearFmt.format(month.toDate(tz))}
	</span>
{/if}
