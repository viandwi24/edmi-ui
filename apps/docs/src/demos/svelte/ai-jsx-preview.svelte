<script lang="ts">
	import { JSXPreview, JSXPreviewContent, JSXPreviewError } from "@edmi-svelte/ai/jsx-preview";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { Skeleton } from "@edmi-svelte/ui/skeleton";

	// Only components in this map can be rendered; markup is parsed, never evaluated.
	const components = { Card, Button, Skeleton };

	const rendered = `<Card size="sm" class="gap-0 px-4">
  <div class="font-semibold">Join MAG4</div>
  <div class="mt-0.5 text-xs text-muted-foreground">Magnificent Four · 4 tokens</div>
  <div class="mt-3.5 flex gap-2">
    <Button raised>Join index</Button>
    <Button variant="outline">Details</Button>
  </div>
</Card>`;

	// The model is still writing: <Card> is unclosed.
	const streaming = `<Card size="sm" class="gap-0 px-4">
  <div class="font-semibold">Join MAG4</div>
  <Skeleton class="mt-2 h-3 w-48" />
  <Skeleton class="mt-3.5 h-[34px] w-32" />`;

	const broken = `<Card>
  <div class="font-semibold">Join MAG4</div>
  <Chartt />
</Card>`;
</script>

<div class="flex w-full max-w-3xl flex-col gap-5">
	<div class="grid gap-5 sm:grid-cols-2">
		<div class="flex flex-col gap-2">
			<span class="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase"
				>Rendered</span
			>
			<JSXPreview {components} jsx={rendered}>
				<JSXPreviewContent />
				<JSXPreviewError />
			</JSXPreview>
		</div>
		<div class="flex flex-col gap-2">
			<span class="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase"
				>Streaming</span
			>
			<JSXPreview {components} isStreaming jsx={streaming}>
				<JSXPreviewContent />
				<JSXPreviewError />
			</JSXPreview>
		</div>
	</div>
	<div class="flex max-w-sm flex-col gap-2">
		<span class="font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">Error</span>
		<JSXPreview {components} jsx={broken}>
			<JSXPreviewContent />
			<JSXPreviewError />
		</JSXPreview>
	</div>
</div>
