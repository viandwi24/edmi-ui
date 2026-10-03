import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockHeader,
	CodeBlockLanguageSelector,
	CodeBlockLanguageSelectorContent,
	CodeBlockLanguageSelectorItem,
	CodeBlockLanguageSelectorTrigger,
	CodeBlockLanguageSelectorValue,
	CodeBlockTitle,
} from "@edmi-react/components/ai/code-block";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;

const languages = [
	{ value: "typescript", label: "TypeScript" },
	{ value: "javascript", label: "JavaScript" },
	{ value: "json", label: "JSON" },
];

export default function Demo() {
	const [language, setLanguage] = useState("typescript");

	return (
		<div className="flex w-full max-w-xl flex-col gap-6">
			<div className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
					With header + line numbers
				</span>
				<CodeBlock
					code={code}
					language={language as "typescript"}
					showLineNumbers
				>
					<CodeBlockHeader>
						<CodeBlockTitle>
							<IconPlaceholder
								lucide="FileCodeIcon"
								tabler="IconFileCode"
								hugeicons="File01Icon"
								phosphor="FileCodeIcon"
								remixicon="RiFileCodeLine"
								className="size-3.5"
							/>
							<CodeBlockFilename>keeper.ts</CodeBlockFilename>
						</CodeBlockTitle>
						<CodeBlockActions>
							<CodeBlockLanguageSelector
								items={languages}
								onValueChange={(v) => v && setLanguage(String(v))}
								value={language}
							>
								<CodeBlockLanguageSelectorTrigger>
									<CodeBlockLanguageSelectorValue />
								</CodeBlockLanguageSelectorTrigger>
								<CodeBlockLanguageSelectorContent>
									{languages.map((l) => (
										<CodeBlockLanguageSelectorItem
											key={l.value}
											value={l.value}
										>
											{l.label}
										</CodeBlockLanguageSelectorItem>
									))}
								</CodeBlockLanguageSelectorContent>
							</CodeBlockLanguageSelector>
							<CodeBlockCopyButton />
						</CodeBlockActions>
					</CodeBlockHeader>
				</CodeBlock>
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
					No header
				</span>
				<CodeBlock
					className="max-w-md"
					code="const w = { NVDAx: 0.32, MSFTx: 0.28 }"
					language="typescript"
				/>
			</div>
		</div>
	);
}
