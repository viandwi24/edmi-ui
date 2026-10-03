<script lang="ts">
	import * as Menubar from "@edmi-svelte/ui/menubar";

	let showSidebar = $state(true);
	let showGrid = $state(false);
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.Item>
					New index <Menubar.Shortcut>⌘N</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>Open…</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Item variant="destructive">Discard draft</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.CheckboxItem bind:checked={showSidebar}>Show sidebar</Menubar.CheckboxItem>
				<Menubar.CheckboxItem bind:checked={showGrid}>Show grid</Menubar.CheckboxItem>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Item>
				Zoom in <Menubar.Shortcut>⌘+</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Zoom out <Menubar.Shortcut>⌘-</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Help</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>Docs</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
