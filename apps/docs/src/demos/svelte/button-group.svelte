<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as ButtonGroup from "@edmi-svelte/ui/button-group";
</script>

<div class="flex flex-wrap items-start gap-6">
	<ButtonGroup.Root>
		<Button variant="outline">Archive</Button>
		<Button variant="outline">Report</Button>
		<Button variant="outline">Snooze</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<Button>Join</Button>
		<ButtonGroup.Separator />
		<Button size="icon" aria-label="More">▾</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<ButtonGroup.Text>Amount</ButtonGroup.Text>
		<ButtonGroup.Text>1,000 USDC</ButtonGroup.Text>
	</ButtonGroup.Root>
	<ButtonGroup.Root orientation="vertical">
		<Button variant="outline" size="icon">+</Button>
		<Button variant="outline" size="icon">-</Button>
	</ButtonGroup.Root>
</div>
