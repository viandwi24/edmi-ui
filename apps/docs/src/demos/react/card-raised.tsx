import { Button } from "@edmi-react/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@edmi-react/ui/card";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-start gap-5">
			<Card raised className="w-80">
				<CardHeader>
					<CardTitle>Join MAG4</CardTitle>
					<CardDescription>Magnificent Four, 4 tokens</CardDescription>
					<CardAction>
						<Button raised size="sm" variant="outline">
							Edit
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent className="font-mono text-sm">
					Amount 1,000 USDC
				</CardContent>
				<CardFooter>
					<Button raised size="sm" variant="outline">
						Cancel
					</Button>
					<Button raised size="sm">
						Join index
					</Button>
				</CardFooter>
			</Card>
			<Card raised size="sm" className="w-64">
				<CardHeader>
					<CardTitle>Scheduled reports</CardTitle>
					<CardDescription>Weekly, Monday 09:00</CardDescription>
				</CardHeader>
			</Card>
		</div>
	);
}
