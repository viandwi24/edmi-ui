<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
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
	} from "@edmi-svelte/ai/code-block";

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
	] as const;

	let language = $state<"typescript" | "javascript" | "json">("typescript");
	const label = $derived(languages.find((l) => l.value === language)?.label);
</script>

<div class="flex w-full max-w-xl flex-col gap-6">
	<div class="flex flex-col gap-2">
		<span class="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase"
			>With header + line numbers</span
		>
		<CodeBlock {code} {language} showLineNumbers>
			<CodeBlockHeader>
				<CodeBlockTitle>
					<IconPlaceholder
						lucide="FileCodeIcon"
						tabler="IconFileCode"
						hugeicons="File01Icon"
						phosphor="FileCodeIcon"
						remixicon="RiFileCodeLine"
						class="size-3.5"
					/>
					<CodeBlockFilename>keeper.ts</CodeBlockFilename>
				</CodeBlockTitle>
				<CodeBlockActions>
					<CodeBlockLanguageSelector type="single" bind:value={language}>
						<CodeBlockLanguageSelectorTrigger>
							<CodeBlockLanguageSelectorValue>{label}</CodeBlockLanguageSelectorValue>
						</CodeBlockLanguageSelectorTrigger>
						<CodeBlockLanguageSelectorContent align="end">
							{#each languages as l (l.value)}
								<CodeBlockLanguageSelectorItem value={l.value} label={l.label}
									>{l.label}</CodeBlockLanguageSelectorItem
								>
							{/each}
						</CodeBlockLanguageSelectorContent>
					</CodeBlockLanguageSelector>
					<CodeBlockCopyButton />
				</CodeBlockActions>
			</CodeBlockHeader>
		</CodeBlock>
	</div>
	<div class="flex flex-col gap-2">
		<span class="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">No header</span>
		<CodeBlock
			class="max-w-md"
			code="const w = &#123; NVDAx: 0.32, MSFTx: 0.28 &#125;"
			language="typescript"
		/>
	</div>
</div>
