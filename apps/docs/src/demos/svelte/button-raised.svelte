<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";

	const variants = ["default", "secondary", "outline", "destructive", "brand"] as const;
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-wrap items-center gap-3">
		{#each variants as variant (variant)}
			<Button {variant}>{variant}</Button>
		{/each}
	</div>
	<div class="flex flex-wrap items-center gap-3">
		{#each variants as variant (variant)}
			<Button {variant} raised>{variant}</Button>
		{/each}
		<Button variant="ghost" raised>ghost (never raised)</Button>
	</div>
</div>
