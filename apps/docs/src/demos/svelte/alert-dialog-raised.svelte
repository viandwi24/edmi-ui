<script lang="ts">
	import * as AlertDialog from "@edmi-svelte/ui/alert-dialog";
	import { Button } from "@edmi-svelte/ui/button";
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Close index</Button>
		{/snippet}
	</AlertDialog.Trigger>
	<AlertDialog.Content raised>
		<AlertDialog.Header>
			<AlertDialog.Title>Close this index?</AlertDialog.Title>
			<AlertDialog.Description>
				Holders can still withdraw, but no one can join. This cannot be undone.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action variant="destructive">Close index</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
