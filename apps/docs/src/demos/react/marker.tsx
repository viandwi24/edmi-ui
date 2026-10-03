import { Marker, MarkerContent, MarkerIcon } from "@edmi-react/ui/marker";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-4">
			<Marker variant="separator">
				<MarkerContent>Today</MarkerContent>
			</Marker>
			<Marker>
				<MarkerIcon>
					<IconPlaceholder
						lucide="SparklesIcon"
						tabler="IconSparkles"
						hugeicons="SparklesIcon"
						phosphor="SparkleIcon"
						remixicon="RiSparklingLine"
					/>
				</MarkerIcon>
				<MarkerContent>Keeper rebalanced MAG4 · 3 trades</MarkerContent>
			</Marker>
			<Marker variant="border">
				<MarkerIcon>
					<IconPlaceholder
						lucide="CircleCheckIcon"
						tabler="IconCircleCheck"
						hugeicons="CheckmarkCircle02Icon"
						phosphor="CheckCircleIcon"
						remixicon="RiCheckboxCircleLine"
					/>
				</MarkerIcon>
				<MarkerContent>Transaction confirmed · slot 318,204,551</MarkerContent>
			</Marker>
		</div>
	);
}
