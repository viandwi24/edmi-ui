import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1): only the active tab rises" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex flex-wrap items-start gap-6">
						{(["default", "pills"] as const).map((variant) => (
							<Tabs key={variant} defaultValue="overview" className="w-[360px]">
								<TabsList variant={variant} elevation={value}>
									<TabsTrigger value="overview">Overview</TabsTrigger>
									<TabsTrigger value="holdings">Holdings</TabsTrigger>
									<TabsTrigger value="activity">Activity</TabsTrigger>
								</TabsList>
								<TabsContent value="overview">{variant} tabs.</TabsContent>
								<TabsContent value="holdings">
									Four tokens, weighted by AUM.
								</TabsContent>
								<TabsContent value="activity">No recent trades.</TabsContent>
							</Tabs>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
