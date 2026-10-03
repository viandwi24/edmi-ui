import { Shimmer } from "@edmi-react/components/ai/shimmer";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-10">
			<Shimmer>Thinking...</Shimmer>
			<Shimmer as="h2" className="text-2xl font-medium">
				Generating your plan
			</Shimmer>
			<Shimmer duration={1} spread={4}>
				Calling get_prices
			</Shimmer>
		</div>
	);
}
