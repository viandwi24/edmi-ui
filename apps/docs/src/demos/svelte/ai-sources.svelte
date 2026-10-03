<script lang="ts">
	import { Source, Sources, SourcesContent, SourcesTrigger } from "@edmi-svelte/ai/sources";

	const sources = [
		{ title: "Nvidia Q3 results", href: "https://www.reuters.com/technology/nvidia-q3" },
		{ title: "Form 10-Q", href: "https://www.sec.gov/cgi-bin/browse-edgar" },
		{ title: "NVDA quote", href: "https://www.nasdaq.com/market-activity/stocks/nvda" },
	];
</script>

<div class="flex w-full max-w-lg flex-col gap-6">
	<Sources>
		<SourcesTrigger count={sources.length} />
		<SourcesContent>
			{#each sources as s (s.href)}
				<Source href={s.href} title={s.title} />
			{/each}
		</SourcesContent>
	</Sources>
	<Sources open>
		<SourcesTrigger count={sources.length} />
		<SourcesContent>
			{#each sources as s (s.href)}
				<Source href={s.href} title={s.title} />
			{/each}
		</SourcesContent>
	</Sources>
</div>
