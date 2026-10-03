import {
	Source,
	Sources,
	SourcesContent,
	SourcesTrigger,
} from "@edmi-react/components/ai/sources";

const sources = [
	{
		title: "Nvidia Q3 results",
		href: "https://www.reuters.com/technology/nvidia-q3",
	},
	{ title: "Form 10-Q", href: "https://www.sec.gov/cgi-bin/browse-edgar" },
	{
		title: "NVDA quote",
		href: "https://www.nasdaq.com/market-activity/stocks/nvda",
	},
];

export default function Demo() {
	return (
		<div className="flex w-full max-w-lg flex-col gap-6">
			<Sources>
				<SourcesTrigger count={sources.length} />
				<SourcesContent>
					{sources.map((s) => (
						<Source key={s.href} href={s.href} title={s.title} />
					))}
				</SourcesContent>
			</Sources>
			<Sources defaultOpen>
				<SourcesTrigger count={sources.length} />
				<SourcesContent>
					{sources.map((s) => (
						<Source key={s.href} href={s.href} title={s.title} />
					))}
				</SourcesContent>
			</Sources>
		</div>
	);
}
