<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { DatePicker } from "@edmi-svelte/ui/date-picker";

	let date = $state(new CalendarDate(2026, 10, 16));

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<DatePicker elevation={level.value} bind:value={date} />
		</div>
	{/each}
</div>
