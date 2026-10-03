import {
	CpuIcon,
	HardDrivesIcon,
	MemoryIcon,
	WalletIcon,
} from "@phosphor-icons/react";
import { Flag } from "@/components/flag";
import { OsLogo } from "@/components/os-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	availableCredit,
	formatUsd,
	type Image,
	type Location,
	type Plan,
} from "@/data/layerbeat";

// Tailwind scans for whole class names, so each tint is spelled out.
const tints = {
	1: "border-[color-mix(in_srgb,var(--chart-1)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-1)_12%,var(--card))] text-chart-1",
	2: "border-[color-mix(in_srgb,var(--chart-2)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-2)_12%,var(--card))] text-chart-2",
	3: "border-[color-mix(in_srgb,var(--chart-3)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-3)_12%,var(--card))] text-chart-3",
} as const;

function Spec({
	icon: Icon,
	label,
	value,
	n,
}: {
	icon: typeof CpuIcon;
	label: string;
	value: string;
	n: 1 | 2 | 3;
}) {
	return (
		<div className={`flex-1 rounded-xl border px-3 py-2.5 ${tints[n]}`}>
			<div className="flex items-center gap-1.5 text-[12.5px]">
				<Icon className="size-3.5" />
				<span className="text-foreground-2">{label}</span>
			</div>
			<div className="mt-1.5 font-mono text-[17px] text-foreground">
				{value}
			</div>
		</div>
	);
}

function Row({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between text-[13.5px]">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium">{value}</span>
		</div>
	);
}

// Sticky raised summary: the only raised surface besides the CTA and the billing segmented control.
export function SummaryCard({
	category,
	location,
	plan,
	image,
	version,
	termLabel,
	total,
}: {
	category: string;
	location: Location;
	plan: Plan;
	image: Image;
	version: string;
	termLabel: string;
	total: number;
}) {
	return (
		<Card raised className="gap-0 p-0">
			<div className="relative overflow-hidden border-b border-border-2 bg-[linear-gradient(160deg,var(--brand-soft),var(--card)_75%)] px-5 pt-5 pb-[18px]">
				<span className="absolute -right-[26px] -bottom-[30px] size-[110px] rounded-full bg-[color-mix(in_srgb,var(--chart-2)_35%,transparent)]" />
				<span className="absolute right-[30px] -bottom-10 h-[90px] w-[70px] rounded-[40px] bg-[color-mix(in_srgb,var(--chart-1)_30%,transparent)]" />
				<div className="relative flex items-center justify-between">
					<span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-popover">
						<OsLogo color={image.color} ubuntu={image.id === "ubuntu"} />
					</span>
					<Badge variant="brand" shape="pill">
						{category}
					</Badge>
				</div>
				<div className="relative mt-4 text-[22px] font-semibold tracking-[-0.4px]">
					Your new server
				</div>
				<div className="relative mt-1 font-mono text-xs text-muted-foreground">
					{plan.id}
				</div>
				<div className="relative mt-3.5 flex items-center gap-2 text-sm font-medium">
					<Flag flag={location.flag} />
					{location.city}
				</div>
			</div>
			<div className="flex flex-col gap-3.5 px-5 pt-[18px] pb-5">
				<div className="flex gap-2">
					<Spec icon={CpuIcon} label="vCPU" value={String(plan.vcpu)} n={1} />
					<Spec icon={MemoryIcon} label="RAM" value={`${plan.ram} GB`} n={2} />
					<Spec
						icon={HardDrivesIcon}
						label="SSD"
						value={`${plan.ssd} GB`}
						n={3}
					/>
				</div>
				<Row label="Image" value={`${image.name} ${version}`} />
				<Row label="Billing term" value={termLabel} />
				<Row label="Location" value={`${location.city}, ${location.country}`} />
				<div className="rounded-xl border border-brand/25 bg-brand-soft px-4 py-3.5">
					<div className="text-[13px] text-foreground-2">Purchase total</div>
					<div className="mt-1 font-mono text-[30px] tracking-[-0.5px]">
						{formatUsd(total)}
					</div>
					<div className="mt-0.5 text-xs text-muted-foreground">
						Full term · USD
					</div>
				</div>
				<div className="flex items-center justify-between rounded-xl bg-success-soft px-3.5 py-2.5 text-[13.5px]">
					<span className="flex items-center gap-2">
						<WalletIcon className="size-[15px]" />
						Available credit
					</span>
					<span className="font-mono font-medium text-success-text">
						{formatUsd(availableCredit)}
					</span>
				</div>
				<p className="rounded-xl border border-border px-3.5 py-3 text-xs leading-normal text-muted-foreground">
					Review your configuration before purchasing. Credit is used only when
					you confirm.
				</p>
				<Button raised size="lg" className="w-full">
					Purchase server
				</Button>
				<Button variant="ghost" className="-mt-1.5 w-full">
					Save as draft
				</Button>
			</div>
		</Card>
	);
}
