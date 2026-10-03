<script lang="ts">
	import * as Progress from "@edmi-svelte/ui/progress";
	import { onMount } from "svelte";

	let value = $state(20);
	onMount(() => {
		const id = setInterval(() => {
			value = value >= 100 ? 10 : value + 10;
		}, 1200);
		return () => clearInterval(id);
	});
</script>

<div class="flex w-80 flex-col gap-6">
	<Progress.Root {value} />
	<Progress.Root {value} variant="brand">
		<Progress.Label>Raising for launch</Progress.Label>
		<Progress.Value />
	</Progress.Root>
</div>
