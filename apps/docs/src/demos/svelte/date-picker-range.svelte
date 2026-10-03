<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { DateRangePicker } from "@edmi-svelte/ui/date-picker";

	let value = $state({ start: new CalendarDate(2026, 10, 12), end: new CalendarDate(2026, 10, 18) });
</script>

<DateRangePicker bind:value presets />
