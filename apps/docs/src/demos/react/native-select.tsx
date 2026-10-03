import {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
} from "@edmi-react/ui/native-select";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-start gap-4">
			<NativeSelect defaultValue="devnet" className="w-48">
				<NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
				<NativeSelectOption value="testnet">Solana testnet</NativeSelectOption>
				<NativeSelectOptGroup label="Production">
					<NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
				</NativeSelectOptGroup>
			</NativeSelect>
			<NativeSelect disabled className="w-48">
				<NativeSelectOption>Mainnet</NativeSelectOption>
			</NativeSelect>
			<NativeSelect aria-invalid size="sm" className="w-48">
				<NativeSelectOption value="">Required</NativeSelectOption>
			</NativeSelect>
		</div>
	);
}
