import { Skeleton } from "@edmi-react/ui/skeleton";

export default function Demo() {
	return (
		<div className="flex items-center gap-4">
			<Skeleton className="size-10 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-60" />
				<Skeleton className="h-4 w-44" />
			</div>
		</div>
	);
}
