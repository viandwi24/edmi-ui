import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@edmi-react/ui/input-group";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
	{ value: "sunken", label: "Sunken (-1)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="grid gap-3 sm:grid-cols-2">
						<InputGroup elevation={value}>
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
						<InputGroup elevation={value}>
							<InputGroupInput
								defaultValue="1,000.00"
								className="font-mono tabular-nums"
							/>
							<InputGroupAddon align="inline-end">
								<InputGroupText>USDC</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
						<InputGroup elevation={value}>
							<InputGroupInput
								defaultValue="7xKXtg2C…Qp3h"
								readOnly
								className="font-mono text-[13px]"
							/>
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
					</div>
				</div>
			))}
		</div>
	);
}
