import { Button } from "@edmi-react/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
} from "@edmi-react/ui/button-group";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-start gap-6">
			<ButtonGroup>
				<Button variant="outline">Archive</Button>
				<Button variant="outline">Report</Button>
				<Button variant="outline">Snooze</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button>Join</Button>
				<ButtonGroupSeparator />
				<Button size="icon" aria-label="More">
					<IconPlaceholder
						lucide="ChevronDownIcon"
						tabler="IconChevronDown"
						hugeicons="ArrowDown01Icon"
						phosphor="CaretDownIcon"
						remixicon="RiArrowDownSLine"
					/>
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<ButtonGroupText>Amount</ButtonGroupText>
				<ButtonGroupText>1,000 USDC</ButtonGroupText>
			</ButtonGroup>
			<ButtonGroup orientation="vertical">
				<Button variant="outline" size="icon">
					+
				</Button>
				<Button variant="outline" size="icon">
					-
				</Button>
			</ButtonGroup>
		</div>
	);
}
