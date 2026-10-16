import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@edmi-react/ui/item";
import { company, org } from "../data";
import { Icon, type IconName } from "./icons";

const icons: Record<string, IconName> = {
	domain: "globe",
	email: "mail",
	revenue: "card",
	hosting: "server",
};
const label = "mt-6 mb-2 text-[13px] text-muted-foreground";

export function CompanyTab() {
	return (
		<div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-medium">{org.name}</h2>
				<Button type="button" variant="ghost" size="icon-xs" aria-label="Edit">
					<Icon name="pencil" className="size-4" />
				</Button>
			</div>
			<div className={label}>Stack</div>
			<Card className="gap-0 py-0">
				<ItemGroup>
					{company.stack.map((row, i) => (
						<div key={row.title}>
							{i > 0 && <ItemSeparator className="my-0" />}
							<Item>
								<ItemMedia variant="icon">
									<Icon name={icons[row.icon] ?? "globe"} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{row.title}</ItemTitle>
									<ItemDescription>{row.note}</ItemDescription>
								</ItemContent>
								<Icon
									name="chevronRight"
									className="size-4 text-muted-foreground"
								/>
							</Item>
						</div>
					))}
				</ItemGroup>
			</Card>
			<div className={label}>Important links</div>
			<Card className="gap-0 py-0">
				<ItemGroup>
					{company.links.map((row, i) => (
						<div key={row.title}>
							{i > 0 && <ItemSeparator className="my-0" />}
							<Item size="sm">
								<ItemContent>
									<ItemTitle>{row.title}</ItemTitle>
									<ItemDescription>{row.note}</ItemDescription>
								</ItemContent>
								<Icon
									name="chevronRight"
									className="size-4 text-muted-foreground"
								/>
							</Item>
						</div>
					))}
				</ItemGroup>
			</Card>
			<div className={label}>Agents</div>
			<Card className="gap-0 py-0">
				<ItemGroup>
					{company.agents.map((row, i) => (
						<div key={row.id}>
							{i > 0 && <ItemSeparator className="my-0" />}
							<Item>
								<ItemMedia>
									<AgentAvatar seed={row.id} color={row.color} size={40} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{row.name}</ItemTitle>
									<ItemDescription>{row.note}</ItemDescription>
								</ItemContent>
							</Item>
						</div>
					))}
				</ItemGroup>
			</Card>
		</div>
	);
}
