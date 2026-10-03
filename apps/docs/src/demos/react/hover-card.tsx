import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@edmi-react/ui/hover-card";

export default function Demo() {
	return (
		<HoverCard>
			<HoverCardTrigger
				render={
					<a href="#dewi" className="text-sm underline underline-offset-4" />
				}
			>
				@dewi
			</HoverCardTrigger>
			<HoverCardContent className="w-72">
				<div className="flex flex-col gap-1">
					<p className="font-medium">Dewi Lestari</p>
					<p className="text-[13px] text-muted-foreground">
						Builds AI and megacap baskets. 3 indexes, 412 holders.
					</p>
					<p className="text-xs text-muted-foreground">Joined Sep 2026</p>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
