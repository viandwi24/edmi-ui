import { Button } from "@edmi-react/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@edmi-react/ui/card";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-wrap items-start gap-5">
				{levels.map(({ value, label }) => (
					<div key={value} className="flex flex-col gap-2">
						<p className="text-xs font-medium text-muted-foreground">{label}</p>
						<Card elevation={value} size="sm" className="w-64">
							<CardHeader>
								<CardTitle>Join MAG4</CardTitle>
								<CardDescription>Magnificent Four, 4 tokens</CardDescription>
							</CardHeader>
							<CardContent className="font-mono text-sm">
								Amount 1,000 USDC
							</CardContent>
							<CardFooter>
								<Button size="sm">Join index</Button>
							</CardFooter>
						</Card>
					</div>
				))}
			</div>
			<div className="flex flex-col gap-2">
				<p className="text-xs font-medium text-muted-foreground">
					Nested: a card inside a raised card resolves flat
				</p>
				<Card elevation="raised" size="sm" className="w-80">
					<CardHeader>
						<CardTitle>Portfolio</CardTitle>
					</CardHeader>
					<CardContent>
						<Card size="sm">
							<CardHeader>
								<CardTitle>Nested card</CardTitle>
								<CardDescription>
									Border only, no bevel on bevel.
								</CardDescription>
							</CardHeader>
						</Card>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
