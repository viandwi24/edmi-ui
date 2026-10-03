<script lang="ts">
	import * as AlertDialog from "@edmi-svelte/ui/alert-dialog";
	import { Button } from "@edmi-svelte/ui/button";
</script>

<div class="flex flex-wrap gap-3">
	{#each [false, true] as raised (raised)}
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {raised} {...props}>{raised ? "Raised alert" : "Flat alert"}</Button>
				{/snippet}
			</AlertDialog.Trigger>
			<AlertDialog.Content {raised}>
				<AlertDialog.Header>
					<AlertDialog.Title>Close this index?</AlertDialog.Title>
					<AlertDialog.Description>Holders can still withdraw. This cannot be undone.</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action variant="destructive">Close index</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/each}
</div>
