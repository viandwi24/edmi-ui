import {
	InlineCitation,
	InlineCitationCard,
	InlineCitationCardBody,
	InlineCitationCardTrigger,
	InlineCitationCarousel,
	InlineCitationCarouselContent,
	InlineCitationCarouselHeader,
	InlineCitationCarouselIndex,
	InlineCitationCarouselItem,
	InlineCitationCarouselNext,
	InlineCitationCarouselPrev,
	InlineCitationQuote,
	InlineCitationSource,
	InlineCitationText,
} from "@edmi-react/components/ai/inline-citation";

const sources = [
	{
		title: "Nvidia Q3 results beat estimates",
		url: "https://reuters.com/technology/nvidia-q3",
		quote: "Revenue rose 94% from a year earlier…",
	},
	{
		title: "Form 10-Q, quarterly report",
		url: "https://sec.gov/cgi-bin/browse-edgar",
		quote: "Data center revenue was a record for the quarter.",
	},
	{
		title: "NVDA quote and guidance",
		url: "https://nasdaq.com/market-activity/stocks/nvda",
		quote: "The company raised its outlook for the next quarter.",
	},
];

export default function Demo() {
	return (
		<p className="max-w-md text-sm leading-[1.7]">
			<InlineCitation>
				<InlineCitationText>
					Nvidia beat revenue estimates for the quarter
				</InlineCitationText>
				<InlineCitationCard>
					<InlineCitationCardTrigger sources={sources.map((s) => s.url)} />
					<InlineCitationCardBody>
						<InlineCitationCarousel>
							<InlineCitationCarouselHeader>
								<InlineCitationCarouselPrev />
								<InlineCitationCarouselNext />
								<InlineCitationCarouselIndex />
							</InlineCitationCarouselHeader>
							<InlineCitationCarouselContent>
								{sources.map((s) => (
									<InlineCitationCarouselItem key={s.url}>
										<InlineCitationSource title={s.title} url={s.url} />
										<InlineCitationQuote>{s.quote}</InlineCitationQuote>
									</InlineCitationCarouselItem>
								))}
							</InlineCitationCarouselContent>
						</InlineCitationCarousel>
					</InlineCitationCardBody>
				</InlineCitationCard>
			</InlineCitation>{" "}
			and raised guidance.
		</p>
	);
}
