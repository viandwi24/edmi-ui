import { WatchlistItem } from "@edmi-react/blocks/watchlist-item/watchlist-item";

export default function Demo() {
	return (
		<div className="flex w-60 flex-col gap-1.5">
			<WatchlistItem
				href="#mag4"
				symbol="MAG4"
				price="1.0000"
				change="+2.38%"
				color="var(--chart-1)"
				active
			/>
			<WatchlistItem
				href="#aifr"
				symbol="AIFR"
				price="1.0104"
				change="+0.84%"
				color="var(--chart-4)"
			/>
			<WatchlistItem
				href="#atls"
				symbol="ATLS"
				price="0.9893"
				change="−0.64%"
				color="var(--chart-3)"
			/>
		</div>
	);
}
