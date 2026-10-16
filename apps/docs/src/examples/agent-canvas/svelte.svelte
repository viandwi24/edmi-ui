<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { type ChatMessage, type TabId, type TaskRow, tasks as seed } from "./data";
	import Canvas from "./svelte/Canvas.svelte";
	import Icon from "./svelte/Icon.svelte";
	import Panel from "./svelte/Panel.svelte";

	let tab = $state<TabId>("atlas");
	let messages = $state<ChatMessage[]>([]);
	let tasks = $state<TaskRow[]>(seed);
	let open = $state(false);

	function newTask(name: string) {
		tasks = [
			{ id: `t${tasks.length + 1}-${name}`, name, agent: "atlas", color: "var(--warning)", age: "now", status: "running" },
			...tasks,
		];
		tab = "tasks";
		open = true;
	}
</script>

<ElevationProvider mode="layered">
	<div class="relative h-svh min-h-[560px] overflow-hidden bg-background text-foreground">
		<Canvas onNewTask={newTask} onOpenPanel={() => (open = true)} />
		<aside
			class="absolute top-2 right-2 bottom-2 z-20 w-[460px] max-w-[calc(100%-1rem)] lg:block {open ? 'block' : 'hidden'}"
		>
			<Panel bind:tab bind:messages {tasks} />
			<Button
				type="button"
				variant="ghost"
				size="icon-xs"
				aria-label="Close panel"
				class="absolute top-3 right-3 z-30 lg:hidden"
				onclick={() => (open = false)}
			>
				<Icon name="close" />
			</Button>
		</aside>
	</div>
</ElevationProvider>
