import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@edmi-react/ui/input-group";

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
					<InputGroup elevation={value} className="max-w-sm">
						<InputGroupInput placeholder="1,000.00" />
						<InputGroupAddon align="inline-end">
							<InputGroupText>USDC</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				</div>
			))}
		</div>
	);
}
