<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Dialog from "@edmi-svelte/ui/dialog";
</script>

<Dialog.Root>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Open floating dialog</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content elevation="floating">
		<Dialog.Header>
			<Dialog.Title>Floating dialog</Dialog.Title>
			<Dialog.Description>Bevel plus one soft drop (+2).</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Dialog.Close>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Cancel</Button>
				{/snippet}
			</Dialog.Close>
			<Button>Save</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
