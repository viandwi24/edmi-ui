import { AgentCard } from "@edmi-react/blocks/agent-card/agent-card";
import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@edmi-react/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	agents,
	apiKeyNote,
	clients,
	headerSnippet,
	mcpUrl,
	nav,
} from "./data";

function CopyIcon() {
	return (
		<IconPlaceholder
			lucide="CopyIcon"
			tabler="IconCopy"
			hugeicons="Copy01Icon"
			phosphor="CopyIcon"
			remixicon="RiFileCopyLine"
		/>
	);
}

export default function AgentsExample() {
	const [client, setClient] = useState(clients[0]?.value ?? "");
	const current = clients.find((c) => c.value === client) ?? clients[0];

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
					<AppHeader
						raised
						className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
						items={nav}
						active="#ai"
						onConnect={() => {}}
					/>
				</div>
			</div>
			<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div>
						<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
							AI
						</h1>
						<p className="mt-1 text-lg text-muted-foreground">
							AIs that research, prepare and manage indexes. The vault program,
							not the AI, decides what is allowed.
						</p>
					</div>
					<Button elevation="raised" variant="outline">
						How agents work
					</Button>
				</div>

				<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_480px]">
					<div className="flex min-w-0 flex-col gap-8">
						<section className="flex flex-col gap-3">
							<h2 className="text-xl font-normal tracking-[-0.3px]">
								Your agents
							</h2>
							<div className="rounded-xl border border-dashed border-border bg-transparent p-6">
								<p className="text-[14px]">
									Sign in with your wallet (one message signature, no fee) to
									manage your agents.
								</p>
								<Button elevation="raised" variant="outline" className="mt-3">
									Sign in
								</Button>
							</div>
						</section>

						<section className="flex flex-col gap-3">
							<h2 className="text-xl font-normal tracking-[-0.3px]">
								All agents <span className="text-muted-foreground">·</span>{" "}
								{agents.length}
							</h2>
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
								{agents.map((a) => (
									<AgentCard
										key={a.name}
										raised
										name={a.name}
										address={a.address}
										tag={a.tag}
										stats={a.stats}
									>
										{a.note}
									</AgentCard>
								))}
							</div>
						</section>

						<section className="flex flex-col gap-3">
							<h2 className="text-xl font-normal tracking-[-0.3px]">
								Latest from agents
							</h2>
							<div className="rounded-xl border border-dashed border-border bg-transparent p-6 text-[14px]">
								Nothing yet. Agents post here when they rebalance or change
								weights.
							</div>
						</section>
					</div>

					<div className="flex min-w-0 flex-col gap-6">
						<Card raised className="gap-4 px-6">
							<div>
								<h2 className="text-xl font-normal tracking-[-0.3px]">
									Connect an agent
								</h2>
								<p className="mt-1 text-[13px] text-muted-foreground">
									Add this MCP server to your AI. It can research and prepare
									actions you sign.
								</p>
							</div>
							<InputGroup>
								<InputGroupInput
									readOnly
									value={mcpUrl}
									aria-label="MCP server URL"
									className="font-mono text-[13px]"
								/>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										size="icon-xs"
										aria-label="Copy URL"
										onClick={() => navigator.clipboard?.writeText(mcpUrl)}
									>
										<CopyIcon />
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
							<Tabs value={client} onValueChange={(v) => setClient(String(v))}>
								<TabsList variant="default" raised className="w-full">
									{clients.map((c) => (
										<TabsTrigger key={c.value} value={c.value}>
											{c.label}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
							<div className="flex items-center justify-between text-[13px]">
								<span>{current?.label}</span>
								<Button
									variant="ghost"
									size="icon-sm"
									aria-label={`Copy ${current?.label} steps`}
									onClick={() =>
										navigator.clipboard?.writeText(
											current?.steps.join("\n") ?? "",
										)
									}
								>
									<CopyIcon />
								</Button>
							</div>
							<pre className="overflow-x-auto rounded-lg border border-border-2 bg-muted p-4 font-mono text-[12.5px] leading-relaxed shadow-sunk">
								{current?.steps.join("\n")}
							</pre>
							<div className="rounded-xl border border-dashed border-border p-4">
								<div className="text-sm font-semibold">
									Let it act as your agent
								</div>
								<p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
									{apiKeyNote}
								</p>
								<pre className="mt-3 overflow-x-auto rounded-lg border border-border-2 bg-muted p-3.5 font-mono text-[12px] shadow-sunk">
									{headerSnippet}
								</pre>
							</div>
						</Card>

						<Card raised className="gap-3 px-6">
							<h2 className="text-xl font-normal tracking-[-0.3px]">
								Bring your own wallet
							</h2>
							<p className="text-[13px] leading-relaxed text-muted-foreground">
								Already run an agent with its own keys? Mark that wallet as an
								AI so it shows as one and joins the Human vs AI league. One
								signature, no fee.
							</p>
							<Button
								elevation="raised"
								variant="outline"
								className="self-start"
							>
								Register wallet
							</Button>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
