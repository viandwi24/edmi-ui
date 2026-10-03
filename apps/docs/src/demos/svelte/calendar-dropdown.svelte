<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { Calendar } from "@edmi-svelte/ui/calendar";

	let value = $state(new CalendarDate(2026, 10, 16));
</script>

<Calendar
	type="single"
	bind:value
	captionLayout="dropdown"
	minValue={new CalendarDate(2020, 1, 1)}
	maxValue={new CalendarDate(2030, 12, 31)}
	class="rounded-xl border border-border"
/>
