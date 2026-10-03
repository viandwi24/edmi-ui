<script lang="ts">
	import { Canvas } from "@edmi-svelte/ai/canvas";
	import { Controls } from "@edmi-svelte/ai/controls";
</script>

<div style="height: 224px" class="w-full overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-border">
	<Canvas nodes={[]} edges={[]}>
		<Controls position="bottom-left" />
	</Canvas>
</div>
