<script lang="ts">
	import * as Attachment from "@edmi-svelte/ui/attachment";
	import { Spinner } from "@edmi-svelte/ui/spinner";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<div class="flex flex-wrap items-start gap-3">
	<Attachment.Root>
		<Attachment.Media><IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" hugeicons="FileIcon" phosphor="FileTextIcon" remixicon="RiFileTextLine" /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>thesis.pdf</Attachment.Title>
			<Attachment.Description>PDF, 2.4 MB</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action aria-label="Remove"><IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" /></Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root state="uploading">
		<Attachment.Media><Spinner /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>weights.csv</Attachment.Title>
			<Attachment.Description>Uploading 64%</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
	<Attachment.Root state="processing">
		<Attachment.Media><Spinner /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>report.pdf</Attachment.Title>
			<Attachment.Description>Processing</Attachment.Description>
		</Attachment.Content>
	</Attachment.Root>
	<Attachment.Root state="error">
		<Attachment.Media><IconPlaceholder lucide="CircleAlertIcon" tabler="IconExclamationCircle" hugeicons="AlertCircleIcon" phosphor="WarningCircleIcon" remixicon="RiErrorWarningLine" /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>backtest.xlsx</Attachment.Title>
			<Attachment.Description>Upload failed</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions>
			<Attachment.Action variant="outline" size="xs">Retry</Attachment.Action>
		</Attachment.Actions>
	</Attachment.Root>
	<Attachment.Root size="sm">
		<Attachment.Media><IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" hugeicons="FileIcon" phosphor="FileTextIcon" remixicon="RiFileTextLine" /></Attachment.Media>
		<Attachment.Content>
			<Attachment.Title>mandate.pdf</Attachment.Title>
			<Attachment.Description>PDF, 540 KB</Attachment.Description>
		</Attachment.Content>
		<Attachment.Actions><IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" class="size-4 text-brand-text" /></Attachment.Actions>
	</Attachment.Root>
</div>
