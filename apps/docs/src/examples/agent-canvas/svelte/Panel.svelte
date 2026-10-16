<script lang="ts">
	import * as InsetPanel from "@edmi-svelte/ui/inset-panel";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import { type ChatMessage, reply, type TabId, type TaskRow, tabs } from "../data";
	import HomeTab from "./HomeTab.svelte";
	import CompanyTab from "./CompanyTab.svelte";
	import Composer from "./Composer.svelte";
	import LibraryTab from "./LibraryTab.svelte";
	import TasksTab from "./TasksTab.svelte";

	let {
		tab = $bindable(),
		messages = $bindable(),
		tasks,
	}: { tab: TabId; messages: ChatMessage[]; tasks: TaskRow[] } = $props();

	let view = $state<"chat" | "home" | "thread">("chat");
	function send(text: string) {
		const id = messages.length + 1;
		messages = [...messages, { id, from: "user", text }, { id: id + 1, from: "assistant", text: reply }];
		view = "chat";
		tab = "atlas";
	}
	function reset() {
		messages = [];
		view = "home";
	}
</script>

<Tabs.Root bind:value={tab} class="size-full gap-0">
	<InsetPanel.Root elevation="floating" class="h-full">
		<InsetPanel.Header class="px-5 py-3">
			<Tabs.List variant="pills">
				{#each tabs as t (t.id)}
					<Tabs.Trigger value={t.id}>{t.label}</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</InsetPanel.Header>
		<InsetPanel.Body class="flex flex-col">
			<Tabs.Content value="atlas" class="flex min-h-0 flex-1 flex-col">
				<HomeTab {view} {tasks} onView={(v) => (view = v)} {messages} onSend={send} onReset={reset} />
			</Tabs.Content>
			<Tabs.Content value="tasks" class="flex min-h-0 flex-1 flex-col"><TasksTab {tasks} /></Tabs.Content>
			<Tabs.Content value="company" class="flex min-h-0 flex-1 flex-col"><CompanyTab /></Tabs.Content>
			<Tabs.Content value="library" class="flex min-h-0 flex-1 flex-col"><LibraryTab /></Tabs.Content>
			{#if tab !== "library"}
				<Composer onSend={send} onClear={reset} />
			{/if}
		</InsetPanel.Body>
	</InsetPanel.Root>
</Tabs.Root>
