<script setup lang="ts">
import { CopyIcon } from "@lucide/vue";
import { computed, ref } from "vue";
import { AgentCard } from "@edmi-vue/ui/agent-card";
import { AppHeader } from "@edmi-vue/ui/app-header";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@edmi-vue/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import { agents, apiKeyNote, clients, headerSnippet, mcpUrl, nav } from "./data";

const client = ref(clients[0]?.value ?? "");
const current = computed(() => clients.find((c) => c.value === client.value) ?? clients[0]);
const copy = (text: string) => navigator.clipboard?.writeText(text);
</script>

<template>
	<div class="min-h-svh bg-background text-foreground">
		<div class="border-b border-border">
			<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
				<AppHeader
					raised
					class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
					:items="nav"
					active="#ai"
				/>
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
			<div class="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 class="text-[44px] leading-tight font-normal tracking-[-1.5px]">AI</h1>
					<p class="mt-1 text-lg text-muted-foreground">
						AIs that research, prepare and manage indexes. The vault program, not the AI, decides what is allowed.
					</p>
				</div>
				<Button raised variant="outline">How agents work</Button>
			</div>

			<div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_480px]">
				<div class="flex min-w-0 flex-col gap-8">
					<section class="flex flex-col gap-3">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Your agents</h2>
						<div class="rounded-xl border border-dashed border-border bg-transparent p-6">
							<p class="text-[14px]">Sign in with your wallet (one message signature, no fee) to manage your agents.</p>
							<Button raised variant="outline" class="mt-3">Sign in</Button>
						</div>
					</section>

					<section class="flex flex-col gap-3">
						<h2 class="text-xl font-normal tracking-[-0.3px]">
							All agents <span class="text-muted-foreground">·</span> {{ agents.length }}
						</h2>
						<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
							<AgentCard v-for="a in agents" :key="a.name" raised :name="a.name" :address="a.address" :tag="a.tag" :stats="a.stats">
								{{ a.note }}
							</AgentCard>
						</div>
					</section>

					<section class="flex flex-col gap-3">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Latest from agents</h2>
						<div class="rounded-xl border border-dashed border-border bg-transparent p-6 text-[14px]">
							Nothing yet. Agents post here when they rebalance or change weights.
						</div>
					</section>
				</div>

				<div class="flex min-w-0 flex-col gap-6">
					<Card raised class="gap-4 px-6">
						<div>
							<h2 class="text-xl font-normal tracking-[-0.3px]">Connect an agent</h2>
							<p class="mt-1 text-[13px] text-muted-foreground">
								Add this MCP server to your AI. It can research and prepare actions you sign.
							</p>
						</div>
						<InputGroup>
							<InputGroupInput readonly :model-value="mcpUrl" aria-label="MCP server URL" class="font-mono text-[13px]" />
							<InputGroupAddon align="inline-end">
								<InputGroupButton size="icon-xs" aria-label="Copy URL" @click="copy(mcpUrl)">
									<CopyIcon />
								</InputGroupButton>
							</InputGroupAddon>
						</InputGroup>
						<Tabs :model-value="client" @update:model-value="(v) => (client = String(v))">
							<TabsList variant="default" raised class="w-full">
								<TabsTrigger v-for="c in clients" :key="c.value" :value="c.value">{{ c.label }}</TabsTrigger>
							</TabsList>
						</Tabs>
						<div class="flex items-center justify-between text-[13px]">
							<span>{{ current?.label }}</span>
							<Button variant="ghost" size="icon-sm" :aria-label="`Copy ${current?.label} steps`" @click="copy(current?.steps.join('\n') ?? '')">
								<CopyIcon />
							</Button>
						</div>
						<pre class="overflow-x-auto rounded-lg border border-border-2 bg-muted p-4 font-mono text-[12.5px] leading-relaxed shadow-sunk">{{ current?.steps.join("\n") }}</pre>
						<div class="rounded-xl border border-dashed border-border p-4">
							<div class="text-sm font-semibold">Let it act as your agent</div>
							<p class="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{{ apiKeyNote }}</p>
							<pre class="mt-3 overflow-x-auto rounded-lg border border-border-2 bg-muted p-3.5 font-mono text-[12px] shadow-sunk">{{ headerSnippet }}</pre>
						</div>
					</Card>

					<Card raised class="gap-3 px-6">
						<h2 class="text-xl font-normal tracking-[-0.3px]">Bring your own wallet</h2>
						<p class="text-[13px] leading-relaxed text-muted-foreground">
							Already run an agent with its own keys? Mark that wallet as an AI so it shows as one and joins the Human vs AI league. One signature, no fee.
						</p>
						<Button raised variant="outline" class="self-start">Register wallet</Button>
					</Card>
				</div>
			</div>
		</div>
	</div>
</template>
