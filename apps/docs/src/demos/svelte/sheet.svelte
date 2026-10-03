<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Sheet from "@edmi-svelte/ui/sheet";
</script>

<Sheet.Root>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Filters</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Filters</Sheet.Title>
			<Sheet.Description>Narrow the index list.</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-2 px-[22px] text-[13px]">
			<label class="flex items-center gap-2" for="sheet-xstocks">
				<input id="sheet-xstocks" type="checkbox" checked />
				xStocks
			</label>
			<label class="flex items-center gap-2" for="sheet-ipo">
				<input id="sheet-ipo" type="checkbox" checked />
				Pre-IPO
			</label>
		</div>
		<Sheet.Footer>
			<Button>Apply</Button>
			<Sheet.Close>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Reset</Button>
				{/snippet}
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
