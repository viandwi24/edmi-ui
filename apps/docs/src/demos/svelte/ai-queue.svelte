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

	const queued = [
		{ id: "1", title: "Summarize Q3 filings", description: "For NVDAx, MSFTx" },
		{ id: "2", title: "Draft a feed post about MAG4", description: undefined },
		{ id: "3", title: "Compare fees with SPYx", description: undefined },
	];
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
							<QueueItemIndicator />
							<QueueItemContent>{todo.title}</QueueItemContent>
							<QueueItemActions>
								<QueueItemAction aria-label="Edit">
									<IconPlaceholder
										lucide="PencilIcon"
										tabler="IconPencil"
										hugeicons="EditIcon"
										phosphor="PencilIcon"
										remixicon="RiPencilLine"
									/>
								</QueueItemAction>
								<QueueItemAction aria-label="Remove">
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
			<QueueSectionLabel label="Completed" count={2} />
		</QueueSectionTrigger>
		<QueueSectionContent>
			<QueueList>
				<QueueItem>
					<div class="flex items-start gap-2">
						<QueueItemIndicator completed />
						<QueueItemContent completed>Quote MAG4 legs</QueueItemContent>
					</div>
					<QueueItemAttachment>
						<QueueItemFile>quotes.csv</QueueItemFile>
					</QueueItemAttachment>
				</QueueItem>
				<QueueItem>
					<div class="flex items-start gap-2">
						<QueueItemIndicator completed />
						<QueueItemContent completed>Check keeper limits</QueueItemContent>
					</div>
				</QueueItem>
			</QueueList>
		</QueueSectionContent>
	</QueueSection>
</Queue>
