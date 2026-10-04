import {
	SessionFile,
	SessionOutputPreview,
	SessionOutputTitle,
	SessionPanel,
	SessionPanelDivider,
	SessionProgress,
	SessionSection,
	SessionSource,
} from "@edmi-react/components/ai/session-panel";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	const [open, setOpen] = useState(true);

	if (!open) {
		return (
			<Button onClick={() => setOpen(true)} size="sm" variant="outline">
				Show session
			</Button>
		);
	}

	return (
		<SessionPanel>
			<SessionProgress onClose={() => setOpen(false)} value={60}>
				Reading the keeper config, then drafting the report.
			</SessionProgress>
			<SessionPanelDivider />
			<SessionSection title="Outputs">
				<SessionOutputPreview className="bg-[#14213d] px-5 py-[18px]">
					<div className="font-mono text-[7px] tracking-[1px] text-[#e39a3c]">
						RESEARCH · OCT 2026
					</div>
					<div className="mt-9 font-serif text-[17px] leading-[1.2] font-bold text-white">
						MAG4 rebalance, three trades
					</div>
				</SessionOutputPreview>
				<SessionOutputTitle meta="Artifact">
					Rebalance report
				</SessionOutputTitle>
				<div className="mt-1">
					<SessionFile name="Rebalance report" format="PDF" />
					<SessionFile name="Rebalance report" format="MD" kind="code" />
				</div>
			</SessionSection>
			<SessionPanelDivider />
			<SessionSection title="Used in this session">
				<SessionSource
					icon={
						<IconPlaceholder
							lucide="GlobeIcon"
							tabler="IconWorld"
							hugeicons="Globe02Icon"
							phosphor="GlobeIcon"
							remixicon="RiGlobalLine"
						/>
					}
					label="Web search"
					favicons={[
						{ label: "Jupiter", color: "#e5484d" },
						{ label: "Coinglass", color: "#3b6fd6" },
						{ label: "Orca", color: "#111111" },
					]}
					more={4}
				/>
				<SessionSource
					icon={
						<IconPlaceholder
							lucide="ClockIcon"
							tabler="IconClock"
							hugeicons="Clock01Icon"
							phosphor="ClockIcon"
							remixicon="RiTimeLine"
						/>
					}
					label="Memory"
				>
					Read · Keeper, MAG4, fees
				</SessionSource>
			</SessionSection>
		</SessionPanel>
	);
}
