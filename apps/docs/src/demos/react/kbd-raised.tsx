import { Kbd, KbdGroup } from "@edmi-react/ui/kbd";

const levels = [
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
					<div className="flex flex-wrap items-center gap-6">
						<Kbd elevation={value}>K</Kbd>
						<KbdGroup>
							<Kbd elevation={value}>⌘</Kbd>
							<Kbd elevation={value}>K</Kbd>
						</KbdGroup>
						<Kbd elevation={value}>Enter</Kbd>
					</div>
				</div>
			))}
		</div>
	);
}
