<script lang="ts">
	import type { Snippet } from "svelte";
	import { AppHeader } from "#lib/components/ui/app-header/index.js";
	import { nav } from "#lib/data/markets.js";
	import ThemeToggle from "../theme-toggle.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-svh">
	<div class="border-b border-border">
		<div class="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
			<AppHeader
				raised
				class="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
				items={nav}
				active="#explore"
				onConnect={() => {}}
			/>
			<ThemeToggle />
		</div>
	</div>
	{@render children()}
</div>
