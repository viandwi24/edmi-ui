<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";

	const variants = ["default", "secondary", "outline", "destructive", "brand", "ghost"] as const;

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }, { value: "sunken", label: "Sunken (-1)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap items-center gap-3">
				{#each variants as variant (variant)}
					<Button {variant} elevation={level.value}>{variant}</Button>
				{/each}
				<Button variant="link" elevation={level.value}>link</Button>
			</div>
		</div>
	{/each}
</div>
