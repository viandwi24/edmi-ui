<script lang="ts">
	import * as Tabs from "@edmi-svelte/ui/tabs";
</script>

<Tabs.Root value="overview" class="w-[420px]">
	<Tabs.List>
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
		<Tabs.Trigger value="holdings">Holdings</Tabs.Trigger>
		<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview">NAV 59.9998. 4 tokens, 412 holders, rebalanced 2 days ago.</Tabs.Content>
	<Tabs.Content value="holdings">Four tokens, weighted by AUM.</Tabs.Content>
	<Tabs.Content value="activity">No recent trades.</Tabs.Content>
</Tabs.Root>
