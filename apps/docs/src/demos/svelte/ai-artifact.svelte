<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		Artifact,
		ArtifactAction,
		ArtifactActions,
		ArtifactClose,
		ArtifactContent,
		ArtifactDescription,
		ArtifactHeader,
		ArtifactTitle,
	} from "@edmi-svelte/ai/artifact";
	import { CodeBlock } from "@edmi-svelte/ai/code-block";
	import { Button } from "@edmi-svelte/ui/button";

	const code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;

	let open = $state(true);
	let copied = $state(false);
	function copy() {
		navigator.clipboard?.writeText(code).catch(() => {});
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

{#if !open}
	<Button variant="outline" size="sm" onclick={() => (open = true)}>Reopen rebalance.ts</Button>
{:else}
<Artifact class="max-w-xl">
	<ArtifactHeader>
		<div>
			<ArtifactTitle>rebalance.ts</ArtifactTitle>
			<ArtifactDescription>Generated · 8 lines</ArtifactDescription>
		</div>
		<ArtifactActions>
			<ArtifactAction tooltip="Copy" onclick={copy}>
				{#if copied}
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
						remixicon="RiCheckLine"
						class="size-4"
					/>
				{:else}
					<IconPlaceholder
						lucide="CopyIcon"
						tabler="IconCopy"
						hugeicons="Copy01Icon"
						phosphor="CopyIcon"
						remixicon="RiFileCopyLine"
						class="size-4"
					/>
				{/if}
			</ArtifactAction>
			<ArtifactAction tooltip="Download">
				<IconPlaceholder
					lucide="DownloadIcon"
					tabler="IconDownload"
					hugeicons="DownloadIcon"
					phosphor="DownloadIcon"
					remixicon="RiDownloadLine"
					class="size-4"
				/>
			</ArtifactAction>
			<ArtifactAction tooltip="Open">
				<IconPlaceholder
					lucide="ExternalLinkIcon"
					tabler="IconExternalLink"
					hugeicons="LinkSquare02Icon"
					phosphor="ArrowSquareOutIcon"
					remixicon="RiExternalLinkLine"
					class="size-4"
				/>
			</ArtifactAction>
			<ArtifactClose onclick={() => (open = false)} />
		</ArtifactActions>
	</ArtifactHeader>
	<ArtifactContent>
		<CodeBlock class="rounded-none border-0" {code} language="typescript" showLineNumbers />
	</ArtifactContent>
</Artifact>
{/if}
