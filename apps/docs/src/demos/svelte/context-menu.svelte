<script lang="ts">
	import * as ContextMenu from "@edmi-svelte/ui/context-menu";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-40 w-72 select-none items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground"
	>
		Right-click an index row
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-52">
		<ContextMenu.Group>
			<ContextMenu.Item>Open</ContextMenu.Item>
			<ContextMenu.Item>
				Copy address <ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
			</ContextMenu.Item>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>
			<ContextMenu.SubContent>
				<ContextMenu.Item>Copy link</ContextMenu.Item>
				<ContextMenu.Item>Share card</ContextMenu.Item>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Separator />
		<ContextMenu.Item variant="destructive">Hide index</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
