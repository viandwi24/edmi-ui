import { Button } from "@edmi-react/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@edmi-react/ui/collapsible";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const rows = ["NVDAx · 32%", "MSFTx · 28%", "AAPLx · 24%", "ANTHRP-pre · 16%"];

export default function Demo() {
	const [open, setOpen] = useState(false);
	return (
		<Collapsible
			open={open}
			onOpenChange={setOpen}
			className="w-[320px] rounded-xl border border-border bg-card p-3"
		>
			<div className="flex items-center justify-between">
				<span className="px-1 text-sm font-medium">3 tokens hidden</span>
				<CollapsibleTrigger
					render={<Button variant="ghost" size="icon-xs" aria-label="Toggle" />}
				>
					<IconPlaceholder
						lucide="ChevronsUpDownIcon"
						tabler="IconSelector"
						hugeicons="UnfoldMoreIcon"
						phosphor="CaretUpDownIcon"
						remixicon="RiArrowUpDownLine"
					/>
				</CollapsibleTrigger>
			</div>
			<div className="mt-2 rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]">
				{rows[0]}
			</div>
			<CollapsibleContent className="mt-2 flex flex-col gap-2">
				{rows.slice(1).map((r) => (
					<div
						key={r}
						className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]"
					>
						{r}
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
}
