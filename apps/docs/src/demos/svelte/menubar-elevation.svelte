<script lang="ts">
	import * as Menubar from "@edmi-svelte/ui/menubar";

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }] as const;
	let showSidebar = $state(true);
	let showGrid = $state(false);
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<Menubar.Root elevation={level.value}>
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
		</div>
	{/each}
</div>
