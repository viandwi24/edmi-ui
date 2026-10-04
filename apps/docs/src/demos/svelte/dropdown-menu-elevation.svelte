<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";

	const levels = [{ value: "flat", label: "Flat" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-wrap gap-3">
	{#each levels as level (level.value)}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>{level.label}</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content elevation={level.value} class="w-52">
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading>My account</DropdownMenu.GroupHeading>
					<DropdownMenu.Item>
						Profile <DropdownMenu.Shortcut>⇧P</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item>Wallets</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">Log out</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/each}
</div>
