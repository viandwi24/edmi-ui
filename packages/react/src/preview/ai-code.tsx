import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Agent,
	AgentContent,
	AgentHeader,
	AgentInstructions,
	AgentOutput,
	AgentTool,
	AgentTools,
} from "@/registry/edmi/components/ai/agent";
import {
	Artifact,
	ArtifactAction,
	ArtifactActions,
	ArtifactClose,
	ArtifactContent,
	ArtifactDescription,
	ArtifactHeader,
	ArtifactTitle,
} from "@/registry/edmi/components/ai/artifact";
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
} from "@/registry/edmi/components/ai/code-block";
import {
	Commit,
	CommitAuthor,
	CommitAuthorAvatar,
	CommitContent,
	CommitCopyButton,
	CommitFile,
	CommitFileAdditions,
	CommitFileChanges,
	CommitFileDeletions,
	CommitFileInfo,
	CommitFilePath,
	CommitFileStatus,
	CommitFiles,
	CommitFilesToggle,
	CommitHash,
	CommitHeader,
	CommitInfo,
	CommitMessage,
	CommitMetadata,
	CommitSeparator,
	CommitTimestamp,
} from "@/registry/edmi/components/ai/commit";
import {
	EnvironmentVariable,
	EnvironmentVariableCopyButton,
	EnvironmentVariableName,
	EnvironmentVariableRequired,
	EnvironmentVariables,
	EnvironmentVariablesContent,
	EnvironmentVariablesHeader,
	EnvironmentVariablesTitle,
	EnvironmentVariablesToggle,
	EnvironmentVariableValue,
} from "@/registry/edmi/components/ai/environment-variables";
import {
	FileTree,
	FileTreeFile,
	FileTreeFolder,
} from "@/registry/edmi/components/ai/file-tree";
import {
	JSXPreview,
	JSXPreviewContent,
	JSXPreviewError,
} from "@/registry/edmi/components/ai/jsx-preview";
import {
	PackageInfo,
	PackageInfoChangeType,
	PackageInfoContent,
	PackageInfoDependencies,
	PackageInfoDependency,
	PackageInfoDescription,
	PackageInfoHeader,
	PackageInfoName,
	PackageInfoVersion,
} from "@/registry/edmi/components/ai/package-info";
import { Button } from "@/registry/edmi/ui/button";
import { Card } from "@/registry/edmi/ui/card";
import { Skeleton } from "@/registry/edmi/ui/skeleton";
import { RaisedSection } from "./_raised";

const Label = ({ children }: { children: string }) => (
	<p className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
		{children}
	</p>
);

const DemoAgent_getPrices = {
	description: "Quotes for tokens",
	inputSchema: "{ symbols: string[] }",
};
const DemoAgent_rebalance = {
	description: "Send one rebalance tx",
	inputSchema: `{ "index": string, "maxSlippage"?: number }`,
};
const DemoAgent_postFeed = {
	description: "Write a feed post",
	inputSchema: "{ text: string }",
};

function DemoAgent() {
	return (
		<Agent className="max-w-lg">
			<AgentHeader name="Keeper agent" model="claude-opus" />
			<AgentContent>
				<AgentInstructions>
					Keep every index within its drift limit. Never trade without approval
					when the order is above <b>$500</b>.
				</AgentInstructions>
				<AgentTools defaultValue={["rebalance"]} multiple>
					<AgentTool
						name="get_prices"
						tool={DemoAgent_getPrices}
						value="get_prices"
					/>
					<AgentTool
						name="rebalance"
						tool={DemoAgent_rebalance}
						value="rebalance"
					/>
					<AgentTool
						name="post_feed"
						tool={DemoAgent_postFeed}
						value="post_feed"
					/>
				</AgentTools>
				<AgentOutput schema={`{ status: "ok" | "skipped"; tx?: string }`} />
			</AgentContent>
		</Agent>
	);
}

const DemoAgentRaised_getPrices = {
	description: "Quotes for tokens",
	inputSchema: "{ symbols: string[] }",
};
const DemoAgentRaised_rebalance = {
	description: "Send one rebalance tx",
	inputSchema: `{ "index": string, "maxSlippage"?: number }`,
};
const DemoAgentRaised_postFeed = {
	description: "Write a feed post",
	inputSchema: "{ text: string }",
};

function DemoAgentRaised() {
	return (
		<Agent className="max-w-lg" raised>
			<AgentHeader name="Keeper agent" model="claude-opus" />
			<AgentContent>
				<AgentInstructions>
					Keep every index within its drift limit. Never trade without approval
					when the order is above <b>$500</b>.
				</AgentInstructions>
				<AgentTools defaultValue={["rebalance"]} multiple>
					<AgentTool
						name="get_prices"
						tool={DemoAgentRaised_getPrices}
						value="get_prices"
					/>
					<AgentTool
						name="rebalance"
						tool={DemoAgentRaised_rebalance}
						value="rebalance"
					/>
					<AgentTool
						name="post_feed"
						tool={DemoAgentRaised_postFeed}
						value="post_feed"
					/>
				</AgentTools>
				<AgentOutput schema={`{ status: "ok" | "skipped"; tx?: string }`} />
			</AgentContent>
		</Agent>
	);
}

const DemoArtifact_code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;

function DemoArtifact() {
	return (
		<Artifact className="max-w-xl">
			<ArtifactHeader>
				<div>
					<ArtifactTitle>rebalance.ts</ArtifactTitle>
					<ArtifactDescription>Generated · 8 lines</ArtifactDescription>
				</div>
				<ArtifactActions>
					<ArtifactAction
						icon={
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="Copy01Icon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
								className="size-4"
							/>
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
					<ArtifactClose />
				</ArtifactActions>
			</ArtifactHeader>
			<ArtifactContent>
				<CodeBlock
					className="rounded-none border-0"
					code={DemoArtifact_code}
					language="typescript"
					showLineNumbers
				/>
			</ArtifactContent>
		</Artifact>
	);
}

const DemoArtifactRaised_code = `import { rebalance } from "@/lib/keeper"

export async function run(index: string) {
  // only when drift is above the limit
  const drift = await getDrift(index)
  if (drift < 0.02) return
  return rebalance(index, { slippage: 0.01 })
}`;

function DemoArtifactRaised() {
	return (
		<Artifact className="max-w-xl" raised>
			<ArtifactHeader>
				<div>
					<ArtifactTitle>rebalance.ts</ArtifactTitle>
					<ArtifactDescription>Generated · 8 lines</ArtifactDescription>
				</div>
				<ArtifactActions>
					<ArtifactAction
						icon={
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="Copy01Icon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
								className="size-4"
							/>
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
					<ArtifactClose />
				</ArtifactActions>
			</ArtifactHeader>
			<ArtifactContent>
				<CodeBlock
					className="rounded-none border-0"
					code={DemoArtifactRaised_code}
					language="typescript"
					showLineNumbers
				/>
			</ArtifactContent>
		</Artifact>
	);
}

const DemoCodeBlock_code = `import { rebalance } from "@/lib/keeper"

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

function DemoCodeBlock() {
	const [language, setLanguage] = useState("typescript");

	return (
		<div className="flex w-full max-w-xl flex-col gap-6">
			<div className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
					With header + line numbers
				</span>
				<CodeBlock
					code={DemoCodeBlock_code}
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

const files = [
	{ path: "lib/keeper.ts", status: "modified", add: 12, del: 3 },
	{ path: "lib/drift.ts", status: "added", add: 28, del: 0 },
	{ path: "tests/keeper.test.ts", status: "renamed", add: 4, del: 4 },
	{ path: "lib/old-keeper.ts", status: "deleted", add: 0, del: 41 },
] as const;

const date = new Date(Date.now() - 12 * 60 * 1000);

function DemoCommit() {
	return (
		<Commit className="max-w-lg" defaultOpen>
			<CommitHeader>
				<CommitAuthor>
					<CommitAuthorAvatar initials="DL" />
				</CommitAuthor>
				<CommitInfo>
					<CommitMessage>
						feat(keeper): skip rebalance under 2% drift
					</CommitMessage>
					<CommitMetadata>
						<span>Dewi Lestari</span>
						<CommitSeparator />
						<CommitTimestamp date={date} />
					</CommitMetadata>
				</CommitInfo>
				<CommitHash>
					a3f9c21
					<CommitCopyButton hash="a3f9c21" />
				</CommitHash>
			</CommitHeader>
			<CommitFilesToggle count={files.length} />
			<CommitContent>
				<CommitFiles>
					{files.map((f) => (
						<CommitFile key={f.path}>
							<CommitFileInfo>
								<CommitFileStatus status={f.status} />
								<CommitFilePath>{f.path}</CommitFilePath>
							</CommitFileInfo>
							<CommitFileChanges>
								<CommitFileAdditions count={f.add} />
								<CommitFileDeletions count={f.del} />
							</CommitFileChanges>
						</CommitFile>
					))}
				</CommitFiles>
			</CommitContent>
		</Commit>
	);
}

const vars = [
	{
		name: "SOLANA_RPC_URL",
		value: "https://api.devnet.solana.com",
		required: true,
	},
	{ name: "JUPITER_API_KEY", value: "jup_live_7Hc2…", required: true },
	{ name: "KEEPER_MAX_SLIPPAGE", value: "0.01", required: false },
];

function DemoEnvironmentVariables() {
	return (
		<EnvironmentVariables className="max-w-lg">
			<EnvironmentVariablesHeader>
				<EnvironmentVariablesTitle />
				<EnvironmentVariablesToggle />
			</EnvironmentVariablesHeader>
			<EnvironmentVariablesContent>
				{vars.map((v) => (
					<EnvironmentVariable key={v.name} name={v.name} value={v.value}>
						<EnvironmentVariableName />
						{v.required && <EnvironmentVariableRequired />}
						<EnvironmentVariableValue />
						<EnvironmentVariableCopyButton copyFormat="value" />
					</EnvironmentVariable>
				))}
			</EnvironmentVariablesContent>
		</EnvironmentVariables>
	);
}

function DemoFileTree() {
	const [selected, setSelected] = useState("src/lib/keeper.ts");

	return (
		<FileTree
			className="w-72"
			defaultExpanded={new Set(["src", "src/lib"])}
			onSelect={setSelected}
			selectedPath={selected}
		>
			<FileTreeFolder name="src" path="src">
				<FileTreeFolder name="lib" path="src/lib">
					<FileTreeFile name="keeper.ts" path="src/lib/keeper.ts" />
					<FileTreeFile name="drift.ts" path="src/lib/drift.ts" />
				</FileTreeFolder>
				<FileTreeFolder name="components" path="src/components">
					<FileTreeFile name="ticker.tsx" path="src/components/ticker.tsx" />
				</FileTreeFolder>
				<FileTreeFile name="app.tsx" path="src/app.tsx" />
			</FileTreeFolder>
			<FileTreeFolder name="tests" path="tests">
				<FileTreeFile name="keeper.test.ts" path="tests/keeper.test.ts" />
			</FileTreeFolder>
			<FileTreeFile name="package.json" path="package.json" />
		</FileTree>
	);
}

const components = {
	Card: (props: React.ComponentProps<typeof Card>) => (
		<Card className="gap-0 px-4" size="sm" {...props} />
	),
	Button,
	Skeleton,
};

const rendered = `<Card>
  <div className="font-semibold">Join MAG4</div>
  <div className="mt-0.5 text-xs text-muted-foreground">Magnificent Four · 4 tokens</div>
  <div className="mt-3.5 flex gap-2">
    <Button raised>Join index</Button>
    <Button variant="outline">Details</Button>
  </div>
</Card>`;

// The model is still writing: <Card> and the last <div> are unclosed.
const streaming = `<Card>
  <div className="font-semibold">Join MAG4</div>
  <Skeleton className="mt-2 h-3 w-48" />
  <Skeleton className="mt-3.5 h-[34px] w-32" />`;

const broken = `<Card>
  <div className="font-semibold">Join MAG4</div>
  <Chartt data={`;

function DemoJsxPreview() {
	return (
		<div className="flex w-full max-w-3xl flex-col gap-5">
			<div className="grid gap-5 sm:grid-cols-2">
				<div className="flex flex-col gap-2">
					<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
						Rendered
					</span>
					<JSXPreview components={components} jsx={rendered}>
						<JSXPreviewContent />
						<JSXPreviewError />
					</JSXPreview>
				</div>
				<div className="flex flex-col gap-2">
					<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
						Streaming
					</span>
					<JSXPreview components={components} isStreaming jsx={streaming}>
						<JSXPreviewContent />
						<JSXPreviewError />
					</JSXPreview>
				</div>
			</div>
			<div className="flex max-w-sm flex-col gap-2">
				<span className="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
					Error
				</span>
				<JSXPreview components={components} jsx={broken}>
					<JSXPreviewContent />
					<JSXPreviewError />
				</JSXPreview>
			</div>
		</div>
	);
}

const changes = [
	{
		name: "react",
		from: "18.3.1",
		to: "19.0.0",
		type: "major",
		note: "Breaking: new JSX transform, ref as prop.",
	},
	{
		name: "@solana/web3.js",
		from: "1.95.2",
		to: "1.98.0",
		type: "minor",
		note: "Adds versioned transaction helpers.",
	},
	{
		name: "zod",
		from: "3.23.8",
		to: "3.23.9",
		type: "patch",
		note: "Fixes an edge case in unions.",
	},
	{
		name: "@jup-ag/api",
		from: undefined,
		to: "6.0.30",
		type: "added",
		note: "Quote and swap API client.",
	},
] as const;

function DemoPackageInfo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-2.5">
			{changes.map((c) => (
				<PackageInfo
					changeType={c.type}
					currentVersion={c.from}
					key={c.name}
					name={c.name}
					newVersion={c.to}
				>
					<PackageInfoHeader>
						<PackageInfoName />
						<PackageInfoChangeType />
						<PackageInfoVersion />
					</PackageInfoHeader>
					<PackageInfoDescription>{c.note}</PackageInfoDescription>
				</PackageInfo>
			))}
			<PackageInfo
				changeType="minor"
				currentVersion="1.2.0"
				name="@edmi-ui/tokens"
				newVersion="1.3.0"
			>
				<PackageInfoHeader>
					<PackageInfoName />
					<PackageInfoChangeType />
					<PackageInfoVersion />
				</PackageInfoHeader>
				<PackageInfoContent>
					<PackageInfoDependencies>
						<PackageInfoDependency name="tailwindcss" version="^4.1.0" />
						<PackageInfoDependency name="shiki" version="^4.5.0" />
					</PackageInfoDependencies>
				</PackageInfoContent>
			</PackageInfo>
		</div>
	);
}

export default function AiCodePreview() {
	return (
		<div className="flex flex-col gap-10">
			<section className="flex flex-col gap-4">
				<Label>agent</Label>
				<DemoAgent />
				<RaisedSection>
					<DemoAgentRaised />
				</RaisedSection>
			</section>
			<section className="flex flex-col gap-4">
				<Label>artifact</Label>
				<DemoArtifact />
				<RaisedSection>
					<DemoArtifactRaised />
				</RaisedSection>
			</section>
			<section className="flex flex-col gap-4">
				<Label>code-block</Label>
				<DemoCodeBlock />
			</section>
			<section className="flex flex-col gap-4">
				<Label>commit</Label>
				<DemoCommit />
			</section>
			<section className="flex flex-col gap-4">
				<Label>environment-variables</Label>
				<DemoEnvironmentVariables />
			</section>
			<section className="flex flex-col gap-4">
				<Label>file-tree</Label>
				<DemoFileTree />
			</section>
			<section className="flex flex-col gap-4">
				<Label>jsx-preview</Label>
				<DemoJsxPreview />
			</section>
			<section className="flex flex-col gap-4">
				<Label>package-info</Label>
				<DemoPackageInfo />
			</section>
		</div>
	);
}
