import { Card } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";

// One numbered configuration step: Kbd index + title, optional description, then the controls.
export function StepCard({
	index,
	title,
	description,
	children,
}: {
	index: string;
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	return (
		<Card className="gap-0 px-[26px] pt-[22px] pb-[26px]">
			<div className="flex items-center gap-3">
				<Kbd className="h-6 min-w-7 text-[11.5px]">{index}</Kbd>
				<h2 className="text-lg font-semibold tracking-[-0.2px]">{title}</h2>
			</div>
			{description ? (
				<p className="mt-3 text-sm text-muted-foreground">{description}</p>
			) : null}
			<div className="mt-[18px]">{children}</div>
		</Card>
	);
}
