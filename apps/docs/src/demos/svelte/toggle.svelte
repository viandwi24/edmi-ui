<script lang="ts">
	import { Toggle } from "@edmi-svelte/ui/toggle";

	let watching = $state(false);
</script>

<div class="flex flex-wrap items-center gap-3">
	<Toggle aria-label="Bold"><b>B</b></Toggle>
	<Toggle aria-label="Bold" pressed><b>B</b></Toggle>
	<Toggle variant="outline" aria-label="Italic"><i>I</i></Toggle>
	<Toggle variant="outline" bind:pressed={watching}>{watching ? "Watching" : "Watch"}</Toggle>
	<Toggle size="sm" aria-label="Bold"><b>B</b></Toggle>
	<Toggle size="lg" aria-label="Bold"><b>B</b></Toggle>
	<Toggle disabled aria-label="Bold"><b>B</b></Toggle>
</div>
