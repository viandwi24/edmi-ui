<script lang="ts">
	import { Checkbox } from "@edmi-svelte/ui/checkbox";
	import { Label } from "@edmi-svelte/ui/label";
</script>

<div class="flex flex-wrap items-center gap-8">
	<Label>Index name</Label>
	<Label>Ticker <span class="text-destructive-text">*</span></Label>
	<Label class="items-baseline">
		Description
		<span class="font-normal text-muted-foreground">(optional)</span>
	</Label>
	<div class="flex items-center gap-2">
		<Checkbox id="keeper" checked />
		<Label for="keeper">Allow keeper</Label>
	</div>
</div>
