import { Button } from "@edmi-react/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@edmi-react/ui/empty";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="grid w-full max-w-3xl gap-5 sm:grid-cols-3">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Empty>
						<EmptyHeader>
							<EmptyMedia elevation={value} variant="icon">
								<IconPlaceholder
									lucide="BriefcaseIcon"
									tabler="IconBriefcase"
									hugeicons="Briefcase01Icon"
									phosphor="BriefcaseIcon"
									remixicon="RiBriefcaseLine"
								/>
							</EmptyMedia>
							<EmptyTitle>No positions yet</EmptyTitle>
							<EmptyDescription>
								Your holdings will show up here.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button size="sm">Explore indexes</Button>
						</EmptyContent>
					</Empty>
				</div>
			))}
		</div>
	);
}
