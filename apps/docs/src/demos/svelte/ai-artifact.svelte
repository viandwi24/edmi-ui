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

	const code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;
</script>

<Artifact class="max-w-xl">
	<ArtifactHeader>
		<div>
			<ArtifactTitle>rebalance.ts</ArtifactTitle>
			<ArtifactDescription>Generated · 8 lines</ArtifactDescription>
		</div>
		<ArtifactActions>
			<ArtifactAction tooltip="Copy">
				<IconPlaceholder
					lucide="CopyIcon"
					tabler="IconCopy"
					hugeicons="Copy01Icon"
					phosphor="CopyIcon"
					remixicon="RiFileCopyLine"
					class="size-4"
				/>
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
			<ArtifactClose />
		</ArtifactActions>
	</ArtifactHeader>
	<ArtifactContent>
		<CodeBlock class="rounded-none border-0" {code} language="typescript" showLineNumbers />
	</ArtifactContent>
</Artifact>
