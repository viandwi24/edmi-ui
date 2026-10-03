<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { Calendar, RangeCalendar } from "@edmi-svelte/ui/calendar";

	let day = $state(new CalendarDate(2026, 10, 16));
	let range = $state({ start: new CalendarDate(2026, 10, 12), end: new CalendarDate(2026, 10, 18) });
</script>

<div class="flex flex-wrap items-start gap-5">
	<Calendar type="single" raised bind:value={day} class="rounded-xl border border-border" />
	<RangeCalendar raised bind:value={range} class="rounded-xl border border-border" />
</div>
