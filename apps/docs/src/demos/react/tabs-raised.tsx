import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{(["default", "pills"] as const).map((variant) => (
				<Tabs key={variant} defaultValue="overview" className="w-[420px]">
					<TabsList variant={variant} raised>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="holdings">Holdings</TabsTrigger>
						<TabsTrigger value="activity">Activity</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">
						Raised active tab ({variant}).
					</TabsContent>
					<TabsContent value="holdings">
						Four tokens, weighted by AUM.
					</TabsContent>
					<TabsContent value="activity">No recent trades.</TabsContent>
				</Tabs>
			))}
		</div>
	);
}
