<script lang="ts">
	import { Persona, type PersonaState } from "@edmi-svelte/ai/persona";

	const states: PersonaState[] = ["idle", "listening", "thinking", "speaking", "asleep"];
	let current = $state<PersonaState>("idle");
</script>

<div class="flex flex-col items-center gap-5">
	<Persona class="size-24" state={current} variant="obsidian" />
	<div class="flex flex-wrap justify-center gap-1.5">
		{#each states as s (s)}
			<button
				type="button"
				class="rounded-md border border-border px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
				data-active={current === s}
				onclick={() => (current = s)}
			>
				{s}
			</button>
		{/each}
	</div>
	<p class="max-w-sm text-center text-xs text-muted-foreground">
		Rive artwork loads from the network. Variants: obsidian, mana, opal, halo, glint, command.
	</p>
</div>
