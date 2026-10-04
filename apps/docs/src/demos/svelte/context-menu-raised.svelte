<script lang="ts">
	import * as ContextMenu from "@edmi-svelte/ui/context-menu";

	const levels = [{ value: "flat", label: "Flat" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-wrap gap-3">
	{#each levels as level (level.value)}
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex h-28 w-48 select-none items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground"
			>
				Right-click: {level.label}
			</ContextMenu.Trigger>
			<ContextMenu.Content elevation={level.value} class="w-52">
				<ContextMenu.Group>
					<ContextMenu.Item>Open</ContextMenu.Item>
					<ContextMenu.Item>
						Copy address <ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
					</ContextMenu.Item>
				</ContextMenu.Group>
				<ContextMenu.Separator />
				<ContextMenu.Item variant="destructive">Hide index</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	{/each}
</div>
