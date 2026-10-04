<script lang="ts">
	import * as Tabs from "@edmi-svelte/ui/tabs";

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1): only the active tab rises" }] as const;
	const variants = ["default", "pills"] as const;
</script>

<div class="flex flex-col gap-6">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap items-start gap-6">
				{#each variants as variant (variant)}
					<Tabs.Root value="overview">
						<Tabs.List {variant} elevation={level.value}>
							<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
							<Tabs.Trigger value="holdings">Holdings</Tabs.Trigger>
							<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
						</Tabs.List>
					</Tabs.Root>
				{/each}
			</div>
		</div>
	{/each}
</div>
