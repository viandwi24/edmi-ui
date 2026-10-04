import { Badge } from "@edmi-react/ui/badge";

const variants = [
	"default",
	"secondary",
	"brand",
	"success",
	"destructive",
	"outline",
] as const;

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex flex-wrap items-center gap-2">
						{variants.map((variant) => (
							<Badge key={variant} variant={variant} elevation={value}>
								{variant}
							</Badge>
						))}
						<Badge variant="brand" shape="pill" elevation={value}>
							pill
						</Badge>
					</div>
				</div>
			))}
		</div>
	);
}
