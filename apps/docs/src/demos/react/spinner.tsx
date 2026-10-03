import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Spinner } from "@edmi-react/ui/spinner";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<Spinner />
			<Spinner className="size-6" />
			<Button disabled variant="secondary">
				<Spinner />
				Deploying vault
			</Button>
			<Badge variant="brand">
				<Spinner />
				Rebalancing
			</Badge>
		</div>
	);
}
