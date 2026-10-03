import {
	ChainOfThought,
	ChainOfThoughtContent,
	ChainOfThoughtHeader,
	ChainOfThoughtImage,
	ChainOfThoughtSearchResult,
	ChainOfThoughtSearchResults,
	ChainOfThoughtStep,
} from "@edmi-react/components/ai/chain-of-thought";
import { Shimmer } from "@edmi-react/components/ai/shimmer";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const globe = (
	<IconPlaceholder
		lucide="GlobeIcon"
		tabler="IconWorld"
		hugeicons="Globe02Icon"
		phosphor="GlobeIcon"
		remixicon="RiGlobalLine"
		className="size-3"
	/>
);

export default function Demo() {
	return (
		<ChainOfThought defaultOpen className="max-w-lg">
			<ChainOfThoughtHeader />
			<ChainOfThoughtContent>
				<ChainOfThoughtStep
					icon={
						<IconPlaceholder
							lucide="SearchIcon"
							tabler="IconSearch"
							hugeicons="SearchIcon"
							phosphor="MagnifyingGlassIcon"
							remixicon="RiSearchLine"
						/>
					}
					label="Searched for NVDAx news"
				>
					<ChainOfThoughtSearchResults>
						{["reuters.com", "sec.gov", "nasdaq.com"].map((site) => (
							<ChainOfThoughtSearchResult key={site}>
								{globe}
								{site}
							</ChainOfThoughtSearchResult>
						))}
					</ChainOfThoughtSearchResults>
				</ChainOfThoughtStep>
				<ChainOfThoughtStep
					icon={
						<IconPlaceholder
							lucide="ChartLineIcon"
							tabler="IconChartLine"
							hugeicons="ChartLineData01Icon"
							phosphor="ChartLineIcon"
							remixicon="RiLineChartLine"
						/>
					}
					label="Read the 30-day chart"
				>
					<ChainOfThoughtImage caption="NVDAx 30-day price">
						<div className="h-28 w-64 bg-linear-to-br from-chart-2 to-chart-1" />
					</ChainOfThoughtImage>
				</ChainOfThoughtStep>
				<ChainOfThoughtStep
					status="active"
					icon={
						<IconPlaceholder
							lucide="BrainIcon"
							tabler="IconBrain"
							hugeicons="AiBrainIcon"
							phosphor="BrainIcon"
							remixicon="RiBrainLine"
						/>
					}
					label={
						<Shimmer as="span">Comparing weights with the mandate</Shimmer>
					}
					description="MAG4 · drift limit 5%"
				/>
				<ChainOfThoughtStep status="pending" label="Write the answer" />
			</ChainOfThoughtContent>
		</ChainOfThought>
	);
}
