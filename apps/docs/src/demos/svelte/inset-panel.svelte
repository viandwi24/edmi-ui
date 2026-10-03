<script lang="ts">
	import * as InsetPanel from "@edmi-svelte/ui/inset-panel";
</script>

<div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
	<InsetPanel.Root>
		<InsetPanel.Header>Live joiners</InsetPanel.Header>
		<InsetPanel.Body fade class="h-40 p-4 text-sm">
			Body runs edge to edge with a faded bottom.
		</InsetPanel.Body>
		<InsetPanel.Footer>2,846 people joined an index this week</InsetPanel.Footer>
	</InsetPanel.Root>
	<InsetPanel.Root>
		<InsetPanel.Header>Keeper activity</InsetPanel.Header>
		<InsetPanel.Body class="h-40 p-4 text-sm">
			No footer: the body runs to the bottom edge.
		</InsetPanel.Body>
	</InsetPanel.Root>
</div>
