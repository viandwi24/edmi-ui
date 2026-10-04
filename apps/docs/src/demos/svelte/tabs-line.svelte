<script lang="ts">
	import * as Tabs from "@edmi-svelte/ui/tabs";
</script>

<Tabs.Root value="positions" class="w-[420px]">
	<Tabs.List variant="line">
		<Tabs.Trigger value="positions">Positions</Tabs.Trigger>
		<Tabs.Trigger value="created">Created</Tabs.Trigger>
		<Tabs.Trigger value="history">History</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="positions">Open positions.</Tabs.Content>
	<Tabs.Content value="created">Indexes you created.</Tabs.Content>
	<Tabs.Content value="history">Closed positions.</Tabs.Content>
</Tabs.Root>
