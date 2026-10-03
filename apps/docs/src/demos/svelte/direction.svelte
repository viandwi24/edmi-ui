<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { DirectionProvider } from "@edmi-svelte/ui/direction";
</script>

{#snippet card(title: string, sub: string, join: string, share: string)}
	<div class="w-64 rounded-xl border border-border bg-card p-4">
		<div class="text-sm font-medium">{title}</div>
		<div class="text-xs text-muted-foreground">{sub}</div>
		<div class="mt-3 flex gap-2">
			<Button size="sm">{join}</Button>
			<Button size="sm" variant="secondary">{share}</Button>
		</div>
	</div>
{/snippet}

<div class="flex flex-wrap gap-6">
	<DirectionProvider direction="ltr">
		<div dir="ltr">
			{@render card("Magnificent Four", "4 tokens · rebalanced weekly", "Join", "Share")}
		</div>
	</DirectionProvider>
	<DirectionProvider direction="rtl">
		<div dir="rtl">
			{@render card("مؤشر الأربعة العظماء", "٤ رموز · إعادة توازن أسبوعية", "انضم", "مشاركة")}
		</div>
	</DirectionProvider>
</div>
