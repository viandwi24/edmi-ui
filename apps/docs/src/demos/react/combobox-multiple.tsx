import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@edmi-react/ui/combobox";
import { Fragment } from "react";

const tokens = ["NVDAx", "MSFTx", "AAPLx", "TSLAx", "AMZNx", "METAx"];

export default function Demo() {
	const anchor = useComboboxAnchor();
	return (
		<Combobox multiple items={tokens} defaultValue={["NVDAx", "MSFTx"]}>
			<ComboboxChips ref={anchor} className="w-72">
				<ComboboxValue>
					{(values: string[]) => (
						<Fragment>
							{values.map((v) => (
								<ComboboxChip key={v}>{v}</ComboboxChip>
							))}
							<ComboboxChipsInput placeholder="Add token" />
						</Fragment>
					)}
				</ComboboxValue>
			</ComboboxChips>
			<ComboboxContent anchor={anchor}>
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
