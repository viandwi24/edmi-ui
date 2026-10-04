<script lang="ts">
	import * as InsetPanel from "@edmi-svelte/ui/inset-panel";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<InsetPanel.Root elevation={level.value}>
				<InsetPanel.Header>Live joiners</InsetPanel.Header>
				<InsetPanel.Body fade class="h-32 p-4 text-sm">The body plate is inset 2px from the shell.</InsetPanel.Body>
				<InsetPanel.Footer>2,846 people joined this week</InsetPanel.Footer>
			</InsetPanel.Root>
		</div>
	{/each}
</div>
