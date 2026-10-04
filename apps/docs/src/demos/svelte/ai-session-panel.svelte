<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		SessionFile,
		SessionOutputPreview,
		SessionOutputTitle,
		SessionPanel,
		SessionPanelDivider,
		SessionProgress,
		SessionSection,
		SessionSource,
	} from "@edmi-svelte/ai/session-panel";
	import { Button } from "@edmi-svelte/ui/button";

	let open = $state(true);

	const favicons = [
		{ label: "Jupiter", color: "#e5484d" },
		{ label: "Coinglass", color: "#3b6fd6" },
		{ label: "Orca", color: "#111111" },
	];
</script>

{#if !open}
	<Button size="sm" variant="outline" onclick={() => (open = true)}>Show session</Button>
{:else}
<SessionPanel>
	<SessionProgress value={60} onClose={() => (open = false)}>
		Reading the keeper config, then drafting the report.
	</SessionProgress>
	<SessionPanelDivider />
	<SessionSection title="Outputs">
		<SessionOutputPreview class="bg-[#14213d] px-5 py-[18px]">
			<div class="font-mono text-[7px] tracking-[1px] text-[#e39a3c]">RESEARCH · OCT 2026</div>
			<div class="mt-9 font-serif text-[17px] leading-[1.2] font-bold text-white">
				MAG4 rebalance, three trades
			</div>
		</SessionOutputPreview>
		<SessionOutputTitle meta="Artifact">Rebalance report</SessionOutputTitle>
		<div class="mt-1">
			<SessionFile name="Rebalance report" format="PDF" />
			<SessionFile name="Rebalance report" format="MD" kind="code" />
		</div>
	</SessionSection>
	<SessionPanelDivider />
	<SessionSection title="Used in this session">
		<SessionSource label="Web search" {favicons} more={4}>
			{#snippet icon()}
				<IconPlaceholder
					lucide="GlobeIcon"
					tabler="IconWorld"
					hugeicons="Globe02Icon"
					phosphor="GlobeIcon"
					remixicon="RiGlobalLine"
				/>
			{/snippet}
		</SessionSource>
		<SessionSource label="Memory">
			{#snippet icon()}
				<IconPlaceholder
					lucide="ClockIcon"
					tabler="IconClock"
					hugeicons="Clock01Icon"
					phosphor="ClockIcon"
					remixicon="RiTimeLine"
				/>
			{/snippet}
			Read · Keeper, MAG4, fees
		</SessionSource>
	</SessionSection>
</SessionPanel>
{/if}
