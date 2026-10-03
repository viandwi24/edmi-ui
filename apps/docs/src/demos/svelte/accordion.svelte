<script lang="ts">
	import * as Accordion from "@edmi-svelte/ui/accordion";
</script>

<Accordion.Root type="single" value="index" class="max-w-md">
	<Accordion.Item value="index">
		<Accordion.Trigger>What is a tokenized index?</Accordion.Trigger>
		<Accordion.Content>
			A token that tracks a basket of xStocks. One join buys every token in the basket at its weight.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="rebalance">
		<Accordion.Trigger>How is it rebalanced?</Accordion.Trigger>
		<Accordion.Content>Weekly, by the index agent.</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="cost">
		<Accordion.Trigger>What does it cost?</Accordion.Trigger>
		<Accordion.Content>A 0.4% annual management fee.</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
