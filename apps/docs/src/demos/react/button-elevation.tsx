import { Button } from "@edmi-react/ui/button";

const variants = [
	"default",
	"secondary",
	"outline",
	"destructive",
	"brand",
	"ghost",
] as const;

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
	{ value: "sunken", label: "Sunken (-1)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex flex-wrap items-center gap-3">
						{variants.map((variant) => (
							<Button key={variant} variant={variant} elevation={value}>
								{variant}
							</Button>
						))}
						<Button variant="link" elevation={value}>
							link
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
