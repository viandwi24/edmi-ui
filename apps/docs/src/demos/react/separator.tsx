import { Separator } from "@edmi-react/ui/separator";

export default function Demo() {
	return (
		<div className="w-72">
			<div className="space-y-1">
				<h4 className="text-sm font-medium">Magnificent Four</h4>
				<p className="text-[13px] text-muted-foreground">
					4 tokens, rebalanced weekly.
				</p>
			</div>
			<Separator className="my-4" />
			<div className="flex h-5 items-center gap-4 text-sm">
				<span>Overview</span>
				<Separator orientation="vertical" />
				<span>Holdings</span>
				<Separator orientation="vertical" />
				<span>Holders</span>
			</div>
		</div>
	);
}
