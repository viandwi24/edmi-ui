import { Button } from "@edmi-react/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "@edmi-react/ui/input-group";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="grid w-full max-w-sm gap-3">
			<InputGroup>
				<InputGroupAddon>
					<IconPlaceholder
						lucide="SearchIcon"
						tabler="IconSearch"
						hugeicons="SearchIcon"
						phosphor="MagnifyingGlassIcon"
						remixicon="RiSearchLine"
					/>
				</InputGroupAddon>
				<InputGroupInput placeholder="Search indexes" />
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="1,000.00" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>USDC</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupAddon>
					<InputGroupText>https://</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput defaultValue="stockbreak.fun/mag4" />
			</InputGroup>
			<InputGroup>
				<InputGroupInput defaultValue="7xKXtg2CW87d97Qp3h" readOnly />
				<InputGroupAddon align="inline-end">
					<InputGroupButton size="icon-xs" aria-label="Copy">
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="CopyIcon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupTextarea placeholder="Describe your thesis..." />
				<InputGroupAddon align="block-end">
					<InputGroupText>52%</InputGroupText>
					<Button size="icon-xs" className="ml-auto" aria-label="Send">
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUpIcon"
							phosphor="ArrowUpIcon"
							remixicon="RiArrowUpLine"
						/>
					</Button>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
