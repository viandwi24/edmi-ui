<script lang="ts">
	import * as Empty from "@edmi-svelte/ui/empty";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="grid w-full max-w-3xl gap-5 sm:grid-cols-3">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<Empty.Root>
				<Empty.Header>
					<Empty.Media variant="icon" elevation={level.value}><IconPlaceholder lucide="BriefcaseIcon" tabler="IconBriefcase" hugeicons="Briefcase01Icon" phosphor="BriefcaseIcon" remixicon="RiBriefcaseLine" /></Empty.Media>
					<Empty.Title>No positions yet</Empty.Title>
					<Empty.Description>Your holdings will show up here.</Empty.Description>
				</Empty.Header>
			</Empty.Root>
		</div>
	{/each}
</div>
