<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { DatePicker } from "@edmi-svelte/ui/date-picker";

	let value = $state(new CalendarDate(2026, 10, 16));
</script>

<DatePicker bind:value />
