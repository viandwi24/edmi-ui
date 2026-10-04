import {
	Artifact,
	ArtifactAction,
	ArtifactActions,
	ArtifactClose,
	ArtifactContent,
	ArtifactDescription,
	ArtifactHeader,
	ArtifactTitle,
} from "@edmi-react/components/ai/artifact";
import { CodeBlock } from "@edmi-react/components/ai/code-block";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;

export default function Demo() {
	const [open, setOpen] = useState(true);
	const [copied, setCopied] = useState(false);
	const copy = () => {
		navigator.clipboard?.writeText(code).catch(() => {});
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};
	if (!open)
		return (
			<Button variant="outline" size="sm" onClick={() => setOpen(true)}>
				Reopen rebalance.ts
			</Button>
		);
	return (
		<Artifact className="max-w-xl">
			<ArtifactHeader>
				<div>
					<ArtifactTitle>rebalance.ts</ArtifactTitle>
					<ArtifactDescription>Generated · 8 lines</ArtifactDescription>
				</div>
				<ArtifactActions>
					<ArtifactAction
						onClick={copy}
						icon={
							copied ? (
								<IconPlaceholder
									lucide="CheckIcon"
									tabler="IconCheck"
									hugeicons="Tick02Icon"
									phosphor="CheckIcon"
									remixicon="RiCheckLine"
									className="size-4"
								/>
							) : (
								<IconPlaceholder
									lucide="CopyIcon"
									tabler="IconCopy"
									hugeicons="Copy01Icon"
									phosphor="CopyIcon"
									remixicon="RiFileCopyLine"
									className="size-4"
								/>
							)
						}
						tooltip="Copy"
					/>
					<ArtifactAction
						icon={
							<IconPlaceholder
								lucide="DownloadIcon"
								tabler="IconDownload"
								hugeicons="DownloadIcon"
								phosphor="DownloadIcon"
								remixicon="RiDownloadLine"
								className="size-4"
							/>
						}
						tooltip="Download"
					/>
					<ArtifactAction
						icon={
							<IconPlaceholder
								lucide="ExternalLinkIcon"
								tabler="IconExternalLink"
								hugeicons="LinkSquare02Icon"
								phosphor="ArrowSquareOutIcon"
								remixicon="RiExternalLinkLine"
								className="size-4"
							/>
						}
						tooltip="Open"
					/>
					<ArtifactClose onClick={() => setOpen(false)} />
				</ArtifactActions>
			</ArtifactHeader>
			<ArtifactContent>
				<CodeBlock
					className="rounded-none border-0"
					code={code}
					language="typescript"
					showLineNumbers
				/>
			</ArtifactContent>
		</Artifact>
	);
}
