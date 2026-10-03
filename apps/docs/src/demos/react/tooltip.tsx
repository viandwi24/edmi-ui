import { Button } from "@edmi-react/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@edmi-react/ui/tooltip";

export default function Demo() {
	return (
		<TooltipProvider>
			<div className="flex gap-2">
				{(["top", "right", "bottom", "left"] as const).map((side) => (
					<Tooltip key={side}>
						<TooltipTrigger render={<Button variant="outline" size="sm" />}>
							{side}
						</TooltipTrigger>
						<TooltipContent side={side}>Copy address</TooltipContent>
					</Tooltip>
				))}
			</div>
		</TooltipProvider>
	);
}
