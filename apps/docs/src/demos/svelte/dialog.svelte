<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Dialog from "@edmi-svelte/ui/dialog";
	import { Input } from "@edmi-svelte/ui/input";
</script>

<Dialog.Root>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Edit profile</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content showCloseButton>
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>Shown on your indexes and in the feed.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-3 text-[13px]">
			<div class="grid gap-1.5">
				<label for="dialog-name">Display name</label>
				<Input id="dialog-name" value="Dewi Lestari" />
			</div>
			<div class="grid gap-1.5">
				<label for="dialog-handle">Handle</label>
				<Input id="dialog-handle" value="@dewi" />
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Cancel</Button>
				{/snippet}
			</Dialog.Close>
			<Button>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
