<script lang="ts">
	import {
		Attachment,
		AttachmentHoverCard,
		AttachmentHoverCardContent,
		AttachmentHoverCardTrigger,
		AttachmentInfo,
		AttachmentPreview,
		AttachmentRemove,
		Attachments,
	} from "@edmi-svelte/ai/attachments";

	const chart =
		"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%2362b36f'/><stop offset='1' stop-color='%23386fd6'/></linearGradient></defs><rect width='220' height='120' fill='url(%23g)'/></svg>";

	const files = [
		{ id: "1", type: "file" as const, filename: "weights.csv", mediaType: "text/csv", url: "", size: 2048 },
		{ id: "2", type: "file" as const, filename: "chart.png", mediaType: "image/png", url: chart, size: 188416 },
	];
</script>

<div class="flex w-full max-w-md flex-col gap-6">
	<Attachments variant="grid">
		{#each files as f (f.id)}
			<Attachment data={f} onRemove={() => {}}>
				<AttachmentPreview />
				<AttachmentInfo />
				<AttachmentRemove />
			</Attachment>
		{/each}
	</Attachments>
	<Attachments variant="list">
		{#each files as f (f.id)}
			<Attachment data={f} onRemove={() => {}}>
				<AttachmentPreview />
				<AttachmentInfo showMediaType />
				<AttachmentRemove />
			</Attachment>
		{/each}
	</Attachments>
	<Attachments variant="inline">
		{#each files as f (f.id)}
			<AttachmentHoverCard>
				<AttachmentHoverCardTrigger>
					{#snippet child({ props })}
						<Attachment data={f} onRemove={() => {}} {...props}>
							<AttachmentPreview />
							<AttachmentInfo />
							<AttachmentRemove />
						</Attachment>
					{/snippet}
				</AttachmentHoverCardTrigger>
				<AttachmentHoverCardContent>
					{#if f.mediaType.startsWith("image/")}
						<img alt={f.filename} src={f.url} class="h-24 rounded-lg object-cover" />
					{:else}
						<span class="px-1 text-xs">{f.filename}</span>
					{/if}
				</AttachmentHoverCardContent>
			</AttachmentHoverCard>
		{/each}
	</Attachments>
</div>
