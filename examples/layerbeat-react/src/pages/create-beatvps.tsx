import { CheckCircleIcon } from "@phosphor-icons/react";
import { useMemo, useRef, useState } from "react";
import { Flag } from "@/components/flag";
import { OsLogo } from "@/components/os-logo";
import { StepCard } from "@/components/step-card";
import { SummaryCard } from "@/components/summary-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	billingTerms,
	configurationCount,
	formatUsd,
	images,
	locations,
	type PlanCategory,
	planCategories,
	plans,
	type Region,
	regions,
} from "@/data/layerbeat";

export function CreateBeatVpsPage() {
	const summaryRef = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState("configure");
	const [name, setName] = useState("");
	const [region, setRegion] = useState<Region>("Europe");
	const [locationId, setLocationId] = useState("fra");
	const [category, setCategory] = useState<PlanCategory>("general");
	const [planId, setPlanId] = useState("BEAT2C2G-S");
	const [view, setView] = useState("list");
	const [imageId, setImageId] = useState("ubuntu");
	const [versions, setVersions] = useState<Record<string, string>>(() =>
		Object.fromEntries(images.map((i) => [i.id, i.versions[0].value])),
	);
	const [months, setMonths] = useState("1");
	const [autoRenew, setAutoRenew] = useState(true);

	const location = locations.find((l) => l.id === locationId) ?? locations[0];
	const plan =
		Object.values(plans)
			.flat()
			.find((p) => p.id === planId) ?? plans.general[0];
	const image = images.find((i) => i.id === imageId) ?? images[0];
	const term =
		billingTerms.find((t) => String(t.months) === months) ?? billingTerms[0];
	const total = useMemo(
		() => plan.price * term.months * (1 - term.discount / 100),
		[plan, term],
	);
	const regionLocations = locations.filter((l) => l.region === region);
	const categoryLabel =
		planCategories.find((c) => c.id === category)?.label ?? "";

	const pickRegion = (next: Region) => {
		setRegion(next);
		const first = locations.find((l) => l.region === next);
		if (first) setLocationId(first.id);
	};
	const pickCategory = (next: PlanCategory) => {
		setCategory(next);
		setPlanId(plans[next][0].id);
	};

	return (
		<div className="mx-auto w-full max-w-[1328px] px-4 pt-8 pb-12 md:px-9">
			<h1 className="text-[32px] font-semibold tracking-[-0.8px]">
				Create a BeatVPS
			</h1>
			<p className="mt-2 text-[15px] text-muted-foreground">
				A place for your next project. Choose a location, configuration and
				image.
			</p>

			<Card className="mt-[26px] p-1.5">
				<Tabs
					value={step}
					onValueChange={(v) => {
						setStep(v);
						if (v === "review")
							summaryRef.current?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<TabsList variant="pills" className="flex-wrap">
						<TabsTrigger value="configure" className="gap-2">
							<span className="font-mono text-[11.5px]">01</span> Configure
						</TabsTrigger>
						<TabsTrigger value="review" className="gap-2">
							<span className="font-mono text-[11.5px]">02</span> Review &amp;
							purchase
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</Card>

			<div className="mt-6 flex flex-col items-start gap-6 lg:flex-row">
				<div className="flex w-full min-w-0 flex-1 flex-col gap-5">
					<StepCard index="01" title="Name your server">
						<Field>
							<Label htmlFor="server-name">Server name</Label>
							<Input
								id="server-name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="my-first-server"
							/>
							<FieldDescription>
								A name to identify this server in your workspace.
							</FieldDescription>
						</Field>
					</StepCard>

					<StepCard
						index="02"
						title="Choose a location"
						description="Place your server close to your users. Each location has its own configurations and images."
					>
						<Tabs value={region} onValueChange={(v) => pickRegion(v as Region)}>
							<TabsList variant="line" className="mb-[18px] flex-wrap">
								{regions.map((r) => (
									<TabsTrigger key={r} value={r}>
										{r}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<RadioGroup
							value={locationId}
							onValueChange={(v) => setLocationId(v as string)}
							className="grid-cols-[repeat(auto-fill,minmax(170px,180px))] gap-3"
						>
							{regionLocations.map((l) => (
								<FieldLabel key={l.id} htmlFor={`loc-${l.id}`}>
									<Field
										orientation="horizontal"
										className="items-center gap-2.5 px-3.5 py-3"
									>
										<Flag flag={l.flag} />
										<span className="flex-1 text-sm font-medium whitespace-nowrap">
											{l.city}
										</span>
										{l.id === locationId ? (
											<CheckCircleIcon className="size-4 text-brand" />
										) : (
											<span className="font-mono text-[11px] whitespace-nowrap text-muted-foreground">
												{l.latency} ms
											</span>
										)}
										<RadioGroupItem
											id={`loc-${l.id}`}
											value={l.id}
											className="sr-only"
										/>
									</Field>
								</FieldLabel>
							))}
						</RadioGroup>
					</StepCard>

					<StepCard index="03" title="Choose your configuration">
						<div className="-mt-1 flex items-center justify-between gap-3">
							<span className="text-[13.5px] text-muted-foreground">
								{configurationCount} configurations · monthly prices
							</span>
							<ToggleGroup
								variant="segmented"
								value={[view]}
								onValueChange={(v) => v[0] && setView(v[0] as string)}
							>
								<ToggleGroupItem value="cards">Cards</ToggleGroupItem>
								<ToggleGroupItem value="list">List</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<Tabs
							className="mt-3.5"
							value={category}
							onValueChange={(v) => pickCategory(v as PlanCategory)}
						>
							<TabsList variant="line" className="flex-wrap">
								{planCategories.map((c) => (
									<TabsTrigger key={c.id} value={c.id}>
										{c.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<RadioGroup
							value={planId}
							onValueChange={(v) => setPlanId(v as string)}
							className="mt-3.5 block"
						>
							{view === "list" ? (
								<Table>
									<TableHeader>
										<TableRow className="hover:bg-transparent">
											<TableHead className="w-9" />
											<TableHead>Plan</TableHead>
											<TableHead>vCPU</TableHead>
											<TableHead>RAM</TableHead>
											<TableHead>SSD</TableHead>
											<TableHead>Transfer</TableHead>
											<TableHead numeric>Price / mo</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{plans[category].map((p) => {
											const selected = p.id === planId;
											return (
												<TableRow
													key={p.id}
													data-state={selected ? "selected" : undefined}
													className="cursor-pointer [&>td]:py-3.5"
													onClick={() => setPlanId(p.id)}
												>
													<TableCell>
														<RadioGroupItem value={p.id} aria-label={p.id} />
													</TableCell>
													<TableCell className="font-mono text-[12.5px]">
														{p.id}
													</TableCell>
													<TableCell className="font-mono">{p.vcpu}</TableCell>
													<TableCell className="font-mono">
														{p.ram} GB
													</TableCell>
													<TableCell className="font-mono">
														{p.ssd} GB
													</TableCell>
													<TableCell className="font-mono text-muted-foreground">
														{p.transfer} TB
													</TableCell>
													<TableCell
														numeric
														className={selected ? "font-semibold" : ""}
													>
														{formatUsd(p.price)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							) : (
								<div className="grid gap-3 sm:grid-cols-2">
									{plans[category].map((p) => (
										<FieldLabel key={p.id} htmlFor={`plan-${p.id}`}>
											<Field orientation="horizontal">
												<FieldContent>
													<FieldTitle className="font-mono text-[12.5px]">
														{p.id}
													</FieldTitle>
													<FieldDescription>
														{p.vcpu} vCPU · {p.ram} GB RAM · {p.ssd} GB SSD
													</FieldDescription>
													<span className="font-mono text-sm">
														{formatUsd(p.price)} / mo
													</span>
												</FieldContent>
												<RadioGroupItem id={`plan-${p.id}`} value={p.id} />
											</Field>
										</FieldLabel>
									))}
								</div>
							)}
						</RadioGroup>
					</StepCard>

					<StepCard
						index="04"
						title="Choose an image"
						description="The operating system installed on first boot."
					>
						<RadioGroup
							value={imageId}
							onValueChange={(v) => setImageId(v as string)}
							className="grid-cols-2 gap-3 md:grid-cols-4"
						>
							{images.map((img) => (
								<FieldLabel key={img.id} htmlFor={`img-${img.id}`}>
									<Field className="gap-3">
										<div className="flex items-center gap-2.5">
											<OsLogo color={img.color} ubuntu={img.id === "ubuntu"} />
											<span className="flex-1 text-sm font-medium">
												{img.name}
											</span>
											<RadioGroupItem id={`img-${img.id}`} value={img.id} />
										</div>
										<Select
											value={versions[img.id]}
											items={img.versions}
											onValueChange={(v) => {
												setVersions((prev) => ({
													...prev,
													[img.id]: v as string,
												}));
												setImageId(img.id);
											}}
										>
											<SelectTrigger
												size="sm"
												className="w-full"
												aria-label={`${img.name} version`}
											>
												<SelectValue />
											</SelectTrigger>
											<SelectContent alignItemWithTrigger={false}>
												{img.versions.map((v) => (
													<SelectItem key={v.value} value={v.value}>
														{v.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</Field>
								</FieldLabel>
							))}
						</RadioGroup>
					</StepCard>

					<StepCard
						index="05"
						title="Billing term"
						description="Pay for the full term up front. Longer terms are cheaper."
					>
						<div className="flex flex-wrap items-center justify-between gap-4">
							<ToggleGroup
								raised
								variant="segmented"
								className="flex-wrap"
								value={[months]}
								onValueChange={(v) => v[0] && setMonths(v[0] as string)}
							>
								{billingTerms.map((t) => (
									<ToggleGroupItem
										key={t.months}
										value={String(t.months)}
										className="px-3.5"
									>
										{t.label}
										{t.discount ? (
											<Badge
												variant="success"
												shape="number"
												className="ml-1 h-[18px]"
											>
												−{t.discount}%
											</Badge>
										) : null}
									</ToggleGroupItem>
								))}
							</ToggleGroup>
							<Label className="gap-2.5 text-[13.5px]">
								<Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
								Auto-renew
							</Label>
						</div>
					</StepCard>
				</div>

				<div
					ref={summaryRef}
					className="w-full scroll-mt-6 lg:sticky lg:top-6 lg:w-[330px] lg:shrink-0"
				>
					<SummaryCard
						category={categoryLabel}
						location={location}
						plan={plan}
						image={image}
						version={versions[image.id]}
						termLabel={term.label}
						total={total}
					/>
				</div>
			</div>
		</div>
	);
}
