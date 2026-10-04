import { Button } from "@edmi-react/ui/button";
import { Input } from "@edmi-react/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@edmi-react/ui/popover";

export default function Demo() {
	return (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Set limits
			</PopoverTrigger>
			<PopoverContent elevation="floating" align="start" className="w-80">
				<PopoverHeader>
					<PopoverTitle>Rebalance limits</PopoverTitle>
					<PopoverDescription>
						Applied to the next keeper run.
					</PopoverDescription>
				</PopoverHeader>
				<div className="grid grid-cols-[1fr_120px] items-center gap-2 text-[13px]">
					<span>Drift</span>
					<Input defaultValue="5%" />
					<span>Max slippage</span>
					<Input defaultValue="1%" />
				</div>
			</PopoverContent>
		</Popover>
	);
}
