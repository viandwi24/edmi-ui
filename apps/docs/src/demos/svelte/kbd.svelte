<script lang="ts">
	import * as Kbd from "@edmi-svelte/ui/kbd";
</script>

<div class="flex flex-wrap items-center gap-6">
	<Kbd.Root>K</Kbd.Root>
	<Kbd.Group>
		<Kbd.Root>⌘</Kbd.Root>
		<Kbd.Root>K</Kbd.Root>
	</Kbd.Group>
	<Kbd.Root>Enter</Kbd.Root>
	<span class="text-sm">
		Press
		<Kbd.Group>
			<Kbd.Root>⌘</Kbd.Root>
			<Kbd.Root>J</Kbd.Root>
		</Kbd.Group>
		to ask the agent
	</span>
</div>
