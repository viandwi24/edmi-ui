<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "@edmi-svelte/ui/button";
	import * as Command from "@edmi-svelte/ui/command";
	import { Kbd } from "@edmi-svelte/ui/kbd";

	let open = $state(false);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:document onkeydown={onKeydown} />

<div class="flex flex-col items-start gap-4">
	<Command.Root class="w-[420px] rounded-xl border border-border">
		<Command.Input placeholder="Search indexes and actions…" />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group heading="Indexes">
				<Command.Item>MAG4 · Magnificent Four</Command.Item>
				<Command.Item>MAG7 · equal weight</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Actions">
				<Command.Item>
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
						remixicon="RiAddLine"
					/>
					Create index <Command.Shortcut>⌘N</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<IconPlaceholder
						lucide="SparklesIcon"
						tabler="IconSparkles"
						hugeicons="SparklesIcon"
						phosphor="SparkleIcon"
						remixicon="RiSparklingLine"
					/>
					Ask agent <Command.Shortcut>⌘J</Command.Shortcut>
				</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Root>
	<Button variant="outline" onclick={() => (open = true)}>
		Open palette <Kbd>⌘K</Kbd>
	</Button>
	<Command.Dialog bind:open>
		<Command.Input placeholder="Type a command…" />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group heading="Actions">
				<Command.Item onSelect={() => (open = false)}>Create index</Command.Item>
				<Command.Item onSelect={() => (open = false)}>Toggle theme</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Dialog>
</div>
