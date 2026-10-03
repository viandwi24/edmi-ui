<script lang="ts">
	import * as Tabs from "@edmi-svelte/ui/tabs";
</script>

<div class="flex flex-col gap-5">
	{#each [false, true] as raised (raised)}
		<div class="flex flex-wrap items-center gap-6">
			<Tabs.Root value="overview">
				<Tabs.List {raised}>
					<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
					<Tabs.Trigger value="holdings">Holdings</Tabs.Trigger>
					<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
			<Tabs.Root value="overview">
				<Tabs.List variant="pills" {raised}>
					<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
					<Tabs.Trigger value="holdings">Holdings</Tabs.Trigger>
					<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		</div>
	{/each}
</div>
