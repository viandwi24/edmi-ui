<script lang="ts">
	import { Suggestion } from "@edmi-svelte/ai/suggestion";
</script>

<div class="flex flex-wrap gap-2">
	<Suggestion suggestion="Rebalance now" raised />
	<Suggestion suggestion="Draft a post" raised />
	<Suggestion suggestion="Explain the keeper" variant="card" raised>How rebalancing works</Suggestion>
</div>
