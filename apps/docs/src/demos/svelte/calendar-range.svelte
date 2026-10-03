<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { RangeCalendar } from "@edmi-svelte/ui/calendar";

	let value = $state({ start: new CalendarDate(2026, 10, 12), end: new CalendarDate(2026, 10, 18) });
</script>

<RangeCalendar bind:value class="rounded-xl border border-border" />
