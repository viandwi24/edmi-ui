<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtContent,
		ChainOfThoughtHeader,
		ChainOfThoughtImage,
		ChainOfThoughtSearchResult,
		ChainOfThoughtSearchResults,
		ChainOfThoughtStep,
	} from "@edmi-svelte/ai/chain-of-thought";
	import { Shimmer } from "@edmi-svelte/ai/shimmer";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const sites = ["reuters.com", "sec.gov", "nasdaq.com"];
</script>

{#snippet searchIcon()}
	<IconPlaceholder
		lucide="SearchIcon"
		tabler="IconSearch"
		hugeicons="SearchIcon"
		phosphor="MagnifyingGlassIcon"
		remixicon="RiSearchLine"
	/>
{/snippet}
{#snippet chartIcon()}
	<IconPlaceholder
		lucide="ChartLineIcon"
		tabler="IconChartLine"
		hugeicons="ChartLineData01Icon"
		phosphor="ChartLineIcon"
		remixicon="RiLineChartLine"
	/>
{/snippet}
{#snippet brainIcon()}
	<IconPlaceholder
		lucide="BrainIcon"
		tabler="IconBrain"
		hugeicons="AiBrainIcon"
		phosphor="BrainIcon"
		remixicon="RiBrainLine"
	/>
{/snippet}
{#snippet comparing()}
	<Shimmer as="span">Comparing weights with the mandate</Shimmer>
{/snippet}

<ChainOfThought defaultOpen class="max-w-lg">
	<ChainOfThoughtHeader />
	<ChainOfThoughtContent>
		<ChainOfThoughtStep icon={searchIcon} label="Searched for NVDAx news">
			<ChainOfThoughtSearchResults>
				{#each sites as site (site)}
					<ChainOfThoughtSearchResult>{site}</ChainOfThoughtSearchResult>
				{/each}
			</ChainOfThoughtSearchResults>
		</ChainOfThoughtStep>
		<ChainOfThoughtStep icon={chartIcon} label="Read the 30-day chart">
			<ChainOfThoughtImage caption="NVDAx 30-day price">
				<div class="h-28 w-64 bg-linear-to-br from-chart-2 to-chart-1"></div>
			</ChainOfThoughtImage>
		</ChainOfThoughtStep>
		<ChainOfThoughtStep
			status="active"
			icon={brainIcon}
			label={comparing}
			description="MAG4 · drift limit 5%"
		/>
		<ChainOfThoughtStep status="pending" label="Write the answer" />
	</ChainOfThoughtContent>
</ChainOfThought>
