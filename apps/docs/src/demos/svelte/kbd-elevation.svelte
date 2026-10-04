<script lang="ts">
	import * as Kbd from "@edmi-svelte/ui/kbd";

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap items-center gap-6">
				<Kbd.Root elevation={level.value}>K</Kbd.Root>
				<Kbd.Group>
					<Kbd.Root elevation={level.value}>⌘</Kbd.Root>
					<Kbd.Root elevation={level.value}>K</Kbd.Root>
				</Kbd.Group>
				<Kbd.Root elevation={level.value}>Enter</Kbd.Root>
			</div>
		</div>
	{/each}
</div>
