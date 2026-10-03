<script lang="ts">
	import { ScrollArea } from "@edmi-svelte/ui/scroll-area";

	const tokens = [
		["NVDAx", "32.0%"],
		["MSFTx", "28.0%"],
		["AAPLx", "24.0%"],
		["ANTHRP-pre", "16.0%"],
		["TSLAx", "—"],
		["GOOGLx", "—"],
	];
	const baskets = ["MAG4", "PREIPO", "AIDX", "ENRG"];
</script>

<div class="flex flex-wrap items-start gap-8">
	<ScrollArea class="h-40 w-56 rounded-xl border border-border bg-card">
		<div class="p-3">
			<div class="mb-1 text-xs text-muted-foreground">Tokens</div>
			{#each tokens as [t, w] (t)}
				<div class="flex justify-between border-t border-border py-2 font-mono text-[13px]">
					<span>{t}</span>
					<span class="text-muted-foreground">{w}</span>
				</div>
			{/each}
		</div>
	</ScrollArea>
	<ScrollArea orientation="horizontal" class="w-72 whitespace-nowrap">
		<div class="flex gap-3 pb-4">
			{#each baskets as n (n)}
				<div class="w-32 shrink-0 rounded-xl border border-border bg-card p-3">
					<div class="font-mono text-[11px] text-muted-foreground">{n}</div>
					<div class="mt-2 font-mono text-xl">$1.0412</div>
				</div>
			{/each}
		</div>
	</ScrollArea>
</div>
