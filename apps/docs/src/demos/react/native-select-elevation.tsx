import { NativeSelect, NativeSelectOption } from "@edmi-react/ui/native-select";

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
					<NativeSelect
						elevation={value}
						defaultValue="devnet"
						className="w-48"
					>
						<NativeSelectOption value="devnet">
							Solana devnet
						</NativeSelectOption>
						<NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
					</NativeSelect>
				</div>
			))}
		</div>
	);
}
