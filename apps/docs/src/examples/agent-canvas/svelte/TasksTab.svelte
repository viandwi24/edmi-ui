<script lang="ts">
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
	import { Checkbox } from "@edmi-svelte/ui/checkbox";
	import { suggested, type TaskRow } from "../data";
	import Status from "./Status.svelte";

	let { tasks }: { tasks: TaskRow[] } = $props();
	const label = "mt-5 mb-1 text-[13px] text-muted-foreground";
	let picked = $state<string[]>([]);
	const all = $derived(picked.length === tasks.length);
	const toggle = (id: string, on: boolean) => {
		picked = on ? [...picked, id] : picked.filter((x) => x !== id);
	};
</script>

<div class="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4">
	<h2 class="text-lg font-medium">Tasks</h2>
	<div class="mt-3 flex items-center gap-3 text-[13px] text-muted-foreground">
		<Checkbox
			aria-label="Select all"
			checked={all}
			indeterminate={picked.length > 0 && !all}
			onCheckedChange={(c) => (picked = c ? tasks.map((t) => t.id) : [])}
		/>
		Select all
	</div>
	<div class={label}>Tasks</div>
	<div class="flex flex-col">
		{#each tasks as t (t.id)}
			<div class="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
				<Checkbox aria-label={t.name} checked={picked.includes(t.id)} onCheckedChange={(c) => toggle(t.id, c)} />
				<Status status={t.status} />
				<AgentAvatar seed={t.agent} color={t.color} size={20} tile={false} />
				<span class="text-[15px]">{t.name}</span>
			</div>
		{/each}
	</div>
	<div class={label}>Suggested Next</div>
	<div class="flex flex-col">
		{#each suggested as s (s)}
			<div class="flex items-center gap-3 py-2.5">
				<svg viewBox="0 0 16 16" class="size-3.5 text-muted-foreground" aria-hidden="true">
					<circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2.4" />
				</svg>
				<span class="text-[15px]">{s}</span>
			</div>
		{/each}
	</div>
</div>
