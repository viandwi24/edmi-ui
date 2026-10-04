<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { Calendar } from "@edmi-svelte/ui/calendar";

	let day = $state(new CalendarDate(2026, 10, 16));

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-6">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<Calendar type="single" elevation={level.value} bind:value={day} />
		</div>
	{/each}
</div>
