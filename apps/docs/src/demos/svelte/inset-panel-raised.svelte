<script lang="ts">
	import * as InsetPanel from "@edmi-svelte/ui/inset-panel";
</script>

<div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
	{#each [false, true] as raised (raised)}
		<InsetPanel.Root {raised}>
			<InsetPanel.Header>{raised ? "Raised panel" : "Flat panel"}</InsetPanel.Header>
			<InsetPanel.Body class="h-32 p-4 text-sm">Body runs edge to edge.</InsetPanel.Body>
			<InsetPanel.Footer>2,846 people joined an index this week</InsetPanel.Footer>
		</InsetPanel.Root>
	{/each}
</div>
