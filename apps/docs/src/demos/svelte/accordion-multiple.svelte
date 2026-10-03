<script lang="ts">
	import * as Accordion from "@edmi-svelte/ui/accordion";
</script>

<Accordion.Root type="multiple" value={["a", "c"]} variant="card" class="max-w-md">
	<Accordion.Item value="a">
		<Accordion.Trigger>3.1 Vault incorporation</Accordion.Trigger>
		<Accordion.Content>How the vault entity is formed.</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="b">
		<Accordion.Trigger>3.2 Index analytics</Accordion.Trigger>
		<Accordion.Content>Performance and weight history.</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="c">
		<Accordion.Trigger>3.3 Holder support</Accordion.Trigger>
		<Accordion.Content>
			Answer holder questions with the agent, using the same mandate context.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
