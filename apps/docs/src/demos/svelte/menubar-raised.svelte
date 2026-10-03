<script lang="ts">
	import * as Menubar from "@edmi-svelte/ui/menubar";
</script>

<div class="flex flex-col items-start gap-4">
	{#each [false, true] as raised (raised)}
		<Menubar.Root {raised}>
			<Menubar.Menu>
				<Menubar.Trigger>File</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>New index <Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item>
					<Menubar.Item>Open…</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>Edit</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>Undo</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>View</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>Zoom in</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar.Root>
	{/each}
</div>
