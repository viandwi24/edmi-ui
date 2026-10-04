<script lang="ts">
	import { Badge } from "@edmi-svelte/ui/badge";

	const variants = ["default", "secondary", "brand", "success", "destructive", "outline"] as const;

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap items-center gap-2">
				{#each variants as variant (variant)}
					<Badge {variant} elevation={level.value}>{variant}</Badge>
				{/each}
				<Badge variant="brand" shape="pill" elevation={level.value}>pill</Badge>
			</div>
		</div>
	{/each}
</div>
