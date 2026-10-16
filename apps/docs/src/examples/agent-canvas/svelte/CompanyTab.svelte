<script lang="ts">
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import * as Item from "@edmi-svelte/ui/item";
	import { company, org } from "../data";
	import Icon from "./Icon.svelte";

	const icons: Record<string, string> = { domain: "globe", email: "mail", revenue: "card", hosting: "server" };
	const label = "mt-6 mb-2 text-[13px] text-muted-foreground";
</script>

<div class="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-medium">{org.name}</h2>
		<Button type="button" variant="ghost" size="icon-xs" aria-label="Edit">
			<Icon name="pencil" class="size-4" />
		</Button>
	</div>
	<div class={label}>Stack</div>
	<Card class="gap-0 py-0">
		<Item.Group>
			{#each company.stack as row, i (row.title)}
				<div>
					{#if i > 0}<Item.Separator class="my-0" />{/if}
					<Item.Root>
						<Item.Media variant="icon"><Icon name={icons[row.icon] ?? "globe"} /></Item.Media>
						<Item.Content>
							<Item.Title>{row.title}</Item.Title>
							<Item.Description>{row.note}</Item.Description>
						</Item.Content>
						<Icon name="chevronRight" class="size-4 text-muted-foreground" />
					</Item.Root>
				</div>
			{/each}
		</Item.Group>
	</Card>
	<div class={label}>Important links</div>
	<Card class="gap-0 py-0">
		<Item.Group>
			{#each company.links as row, i (row.title)}
				<div>
					{#if i > 0}<Item.Separator class="my-0" />{/if}
					<Item.Root size="sm">
						<Item.Content>
							<Item.Title>{row.title}</Item.Title>
							<Item.Description>{row.note}</Item.Description>
						</Item.Content>
						<Icon name="chevronRight" class="size-4 text-muted-foreground" />
					</Item.Root>
				</div>
			{/each}
		</Item.Group>
	</Card>
	<div class={label}>Agents</div>
	<Card class="gap-0 py-0">
		<Item.Group>
			{#each company.agents as row, i (row.id)}
				<div>
					{#if i > 0}<Item.Separator class="my-0" />{/if}
					<Item.Root>
						<Item.Media>
							<AgentAvatar seed={row.id} color={row.color} size={40} />
						</Item.Media>
						<Item.Content>
							<Item.Title>{row.name}</Item.Title>
							<Item.Description>{row.note}</Item.Description>
						</Item.Content>
					</Item.Root>
				</div>
			{/each}
		</Item.Group>
	</Card>
</div>
