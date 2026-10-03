<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Tooltip from "@edmi-svelte/ui/tooltip";

	const sides = ["top", "right", "bottom", "left"] as const;
</script>

<Tooltip.Provider>
	<div class="flex gap-2">
		{#each sides as side (side)}
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" size="sm" {...props}>{side}</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content {side}>Copy address</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
</Tooltip.Provider>
