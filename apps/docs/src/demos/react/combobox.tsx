import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@edmi-react/ui/combobox";

const tokens = ["NVDAx", "MSFTx", "AAPLx", "TSLAx", "AMZNx", "METAx"];

export default function Demo() {
	return (
		<Combobox items={tokens}>
			<ComboboxInput placeholder="Select a token" showClear className="w-64" />
			<ComboboxContent>
				<ComboboxEmpty>No tokens found.</ComboboxEmpty>
				<ComboboxList>
					{(item: string) => (
						<ComboboxItem key={item} value={item}>
							{item}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
