<script lang="ts">
	import {
		Queue,
		QueueItem,
		QueueItemAction,
		QueueItemActions,
		QueueItemAttachment,
		QueueItemContent,
		QueueItemDescription,
		QueueItemFile,
		QueueItemIndicator,
		QueueList,
		QueueSection,
		QueueSectionContent,
		QueueSectionLabel,
		QueueSectionTrigger,
	} from "@edmi-svelte/ai/queue";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	type Todo = { id: string; title: string; description?: string };

	let queued = $state<Todo[]>([
		{ id: "1", title: "Summarize Q3 filings", description: "For NVDAx, MSFTx" },
		{ id: "2", title: "Draft a feed post about MAG4" },
		{ id: "3", title: "Compare fees with SPYx" },
	]);
	let done = $state<Todo[]>([
		{ id: "d1", title: "Quote MAG4 legs" },
		{ id: "d2", title: "Check keeper limits" },
	]);

	function complete(todo: Todo) {
		queued = queued.filter((t) => t.id !== todo.id);
		done = [todo, ...done];
	}
	function uncomplete(todo: Todo) {
		done = done.filter((t) => t.id !== todo.id);
		queued = [...queued, todo];
	}
	function remove(todo: Todo) {
		queued = queued.filter((t) => t.id !== todo.id);
	}
	function edit(todo: Todo) {
		const title = window.prompt("Edit task", todo.title)?.trim();
		if (title) queued = queued.map((t) => (t.id === todo.id ? { ...t, title } : t));
	}
</script>

<Queue class="w-full max-w-md">
	<QueueSection>
		<QueueSectionTrigger>
			<QueueSectionLabel label="Queued" count={queued.length} />
		</QueueSectionTrigger>
		<QueueSectionContent>
			<QueueList>
				{#each queued as todo (todo.id)}
					<QueueItem>
						<div class="flex items-start gap-2">
							<QueueItemIndicator
								role="button"
								tabindex={0}
								aria-label="Mark completed"
								class="cursor-pointer"
								onclick={() => complete(todo)}
								onkeydown={(e) => e.key === "Enter" && complete(todo)}
							/>
							<QueueItemContent>{todo.title}</QueueItemContent>
							<QueueItemActions>
								<QueueItemAction aria-label="Edit" onclick={() => edit(todo)}>
									<IconPlaceholder
										lucide="PencilIcon"
										tabler="IconPencil"
										hugeicons="EditIcon"
										phosphor="PencilIcon"
										remixicon="RiPencilLine"
									/>
								</QueueItemAction>
								<QueueItemAction aria-label="Remove" onclick={() => remove(todo)}>
									<IconPlaceholder
										lucide="Trash2Icon"
										tabler="IconTrash"
										hugeicons="Delete02Icon"
										phosphor="TrashIcon"
										remixicon="RiDeleteBinLine"
									/>
								</QueueItemAction>
							</QueueItemActions>
						</div>
						{#if todo.description}
							<QueueItemDescription>{todo.description}</QueueItemDescription>
						{/if}
					</QueueItem>
				{/each}
			</QueueList>
		</QueueSectionContent>
	</QueueSection>
	<QueueSection open={false}>
		<QueueSectionTrigger>
			<QueueSectionLabel label="Completed" count={done.length} />
		</QueueSectionTrigger>
		<QueueSectionContent>
			<QueueList>
				{#each done as todo (todo.id)}
					<QueueItem>
						<div class="flex items-start gap-2">
							<QueueItemIndicator
								completed
								role="button"
								tabindex={0}
								aria-label="Mark not completed"
								class="cursor-pointer"
								onclick={() => uncomplete(todo)}
								onkeydown={(e) => e.key === "Enter" && uncomplete(todo)}
							/>
							<QueueItemContent completed>{todo.title}</QueueItemContent>
						</div>
						{#if todo.id === "d1"}
							<QueueItemAttachment>
								<QueueItemFile>quotes.csv</QueueItemFile>
							</QueueItemAttachment>
						{/if}
					</QueueItem>
				{/each}
			</QueueList>
		</QueueSectionContent>
	</QueueSection>
</Queue>
