<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Dialog from "@edmi-svelte/ui/dialog";
</script>

<div class="flex flex-wrap gap-3">
	{#each [false, true] as raised (raised)}
		<Dialog.Root>
			<Dialog.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" elevation={raised ? "raised" : undefined} {...props}>{raised ? "Raised dialog" : "Flat dialog"}</Button>
				{/snippet}
			</Dialog.Trigger>
			<Dialog.Content {raised}>
				<Dialog.Header>
					<Dialog.Title>{raised ? "Raised" : "Flat"} dialog</Dialog.Title>
					<Dialog.Description>Pass <code>raised</code> to <code>Dialog.Content</code> for the hard lip.</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Dialog.Close>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Close</Button>
						{/snippet}
					</Dialog.Close>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
</div>
