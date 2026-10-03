<script lang="ts">
	import { Shimmer } from "@edmi-svelte/ai/shimmer";
</script>

<div class="flex flex-wrap items-center gap-10">
	<Shimmer>Thinking...</Shimmer>
	<Shimmer as="h2" class="text-2xl font-medium">Generating your plan</Shimmer>
	<Shimmer duration={1} spread={4}>Calling get_prices</Shimmer>
</div>
