<script lang="ts">
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
	import { Message, MessageContent, MessageHeader } from "@edmi-svelte/ai/message";
	import { Suggestion, Suggestions } from "@edmi-svelte/ai/suggestion";
	import { Button } from "@edmi-svelte/ui/button";
	import * as Item from "@edmi-svelte/ui/item";
	import { type ChatMessage, org, plantHead, suggested, type TaskRow, thread } from "../data";
	import Icon from "./Icon.svelte";
	import Pixels from "./Pixels.svelte";
	import Status from "./Status.svelte";

	let {
		view,
		onView,
		messages,
		tasks,
		onSend,
		onReset,
	}: {
		view: "chat" | "home" | "thread";
		onView: (v: "chat" | "home" | "thread") => void;
		messages: ChatMessage[];
		tasks: TaskRow[];
		onSend: (text: string) => void;
		onReset: () => void;
	} = $props();
</script>

{#if view === "home"}
	<div class="flex min-h-0 flex-1 flex-col px-5 pb-3">
		<div class="mt-3 [mask-image:linear-gradient(to_bottom,black,transparent)]">
			<Item.Root variant="outline" size="sm">
				<Item.Media variant="icon"><Icon name="map" /></Item.Media>
				<Item.Content>
					<Item.Title>Open the company roadmap</Item.Title>
					<Item.Description>General</Item.Description>
				</Item.Content>
			</Item.Root>
		</div>
		<div class="flex justify-center py-3">
			<Button type="button" variant="ghost" size="xs" onclick={() => onView("chat")}>
				<Icon name="arrowUp" />
				Back to chat
			</Button>
		</div>
		<div class="flex flex-1 flex-col items-center justify-center gap-2 text-center">
			<h2 class="text-2xl font-normal">Good evening, {org.user}</h2>
			<Button type="button" variant="ghost" size="xs">
				<Icon name="map" />
				Roadmap
			</Button>
		</div>
		<div class="mb-2 text-xs text-muted-foreground">Tasks</div>
		<div class="flex flex-col">
			{#each tasks as t (t.id)}
				<div class="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
					<AgentAvatar seed={t.agent} color={t.color} size={20} tile={false} />
					<span class="text-[15px]">{t.name}</span>
					<span class="ml-auto font-mono text-xs text-muted-foreground">{t.age}</span>
					<Status status={t.status} />
				</div>
			{/each}
		</div>
		<div class="mt-3 flex items-center gap-2">
			<span class="text-xs text-muted-foreground">Suggested</span>
			<Suggestions class="min-w-0">
				{#each suggested as s (s)}
					<Suggestion suggestion={s} onclick={onSend} />
				{/each}
			</Suggestions>
		</div>
	</div>
{:else}
	<div class="flex min-h-0 flex-1 flex-col">
		<div class="flex justify-end px-3 pt-3">
			<Button type="button" variant="ghost" size="icon-xs" aria-label="Toggle thread" onclick={() => onView(view === "thread" ? "chat" : "thread")}>
				<Icon name="more" />
			</Button>
		</div>
		{#if view === "thread"}
			<div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-3">
				<Message from="assistant">
					<MessageContent>
						<p>{thread.intro[0]}</p>
						<ol class="my-2 list-decimal pl-5">
							<li>{thread.intro[1]}</li>
							<li>{thread.intro[2]}</li>
						</ol>
						<p>{thread.intro[3]}</p>
					</MessageContent>
				</Message>
				<Message from="user"><MessageContent>{thread.question}</MessageContent></Message>
				<Message from="assistant">
					<MessageHeader>
						<Pixels w={plantHead.w} h={plantHead.h} rects={plantHead.rects} class="h-3 w-3.5" />
						Atlas
					</MessageHeader>
					<MessageContent>{thread.answer}</MessageContent>
				</Message>
				<div class="flex flex-col gap-2">
					{#each thread.actions as a (a.id)}
						<Item.Root variant="outline" size="sm">
							<Item.Media><AgentAvatar seed={a.agent} color={a.color} size={20} tile={false} /></Item.Media>
							<Item.Content>
								<Item.Title>{a.title}</Item.Title>
								<Item.Description>{a.dept}</Item.Description>
							</Item.Content>
						</Item.Root>
					{/each}
				</div>
				<div class="flex justify-center">
					<Button type="button" variant="outline" size="icon-xs" aria-label="Scroll to latest"><Icon name="chevronDown" /></Button>
				</div>
			</div>
		{:else if messages.length === 0}
			<div class="flex flex-1 flex-col items-center justify-center gap-2 px-10 text-center">
				<svg viewBox="0 0 24 24" class="mb-2 size-7 text-muted-foreground" fill="currentColor" aria-hidden="true">
					<circle cx="12" cy="12" r="1.4" />
					<circle cx="12" cy="6" r="1" />
					<circle cx="12" cy="18" r="1" />
					<circle cx="6" cy="12" r="1" />
					<circle cx="18" cy="12" r="1" />
				</svg>
				<h2 class="text-[15px] font-semibold">What should we work on?</h2>
				<p class="text-sm text-muted-foreground">
					Bring me an idea, a problem, or a goal. I'll help turn it into the next useful step.
				</p>
			</div>
		{:else}
			<div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-3">
				{#each messages as m (m.id)}
					<Message from={m.from}>
						<MessageContent>{m.text}</MessageContent>
					</Message>
				{/each}
				<div>
					<Button type="button" variant="ghost" size="xs" onclick={onReset}>
						<Icon name="home" />
						Back to home
					</Button>
				</div>
			</div>
		{/if}
	</div>
{/if}
