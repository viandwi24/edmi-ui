<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import { Calendar } from "@edmi-svelte/ui/calendar";

	let value = $state(new CalendarDate(2026, 10, 16));
</script>

<Calendar type="single" bind:value class="rounded-xl border border-border" />
