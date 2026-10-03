<script lang="ts">
	import { Separator } from "@edmi-svelte/ui/separator";
</script>

<div class="w-72">
	<div class="space-y-1">
		<h4 class="text-sm font-medium">Magnificent Four</h4>
		<p class="text-[13px] text-muted-foreground">4 tokens, rebalanced weekly.</p>
	</div>
	<Separator class="my-4" />
	<div class="flex h-5 items-center gap-4 text-sm">
		<span>Overview</span>
		<Separator orientation="vertical" />
		<span>Holdings</span>
		<Separator orientation="vertical" />
		<span>Holders</span>
	</div>
</div>
