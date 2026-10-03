import { Button } from "@edmi-react/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@edmi-react/ui/item";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-6">
			<Item variant="outline">
				<ItemMedia variant="icon">
					<IconPlaceholder
						lucide="WalletIcon"
						tabler="IconWallet"
						hugeicons="WalletIcon"
						phosphor="WalletIcon"
						remixicon="RiWalletLine"
					/>
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Phantom wallet</ItemTitle>
					<ItemDescription>7nXK...Qp2d, devnet</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						Disconnect
					</Button>
				</ItemActions>
			</Item>
			<Item variant="muted" size="sm">
				<ItemContent>
					<ItemTitle>Keeper is on</ItemTitle>
					<ItemDescription>Rebalances when drift exceeds 5%.</ItemDescription>
				</ItemContent>
			</Item>
			<ItemGroup>
				<Item render={<a href="#profile" />}>
					<ItemMedia variant="icon">
						<IconPlaceholder
							lucide="UserIcon"
							tabler="IconUser"
							hugeicons="UserIcon"
							phosphor="UserIcon"
							remixicon="RiUserLine"
						/>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Profile</ItemTitle>
						<ItemDescription>Name, avatar and bio</ItemDescription>
					</ItemContent>
					<IconPlaceholder
						lucide="ChevronRightIcon"
						tabler="IconChevronRight"
						hugeicons="ArrowRight01Icon"
						phosphor="CaretRightIcon"
						remixicon="RiArrowRightSLine"
						className="size-4 text-muted-foreground"
					/>
				</Item>
				<ItemSeparator />
				<Item render={<a href="#wallets" />}>
					<ItemMedia variant="icon">
						<IconPlaceholder
							lucide="WalletIcon"
							tabler="IconWallet"
							hugeicons="WalletIcon"
							phosphor="WalletIcon"
							remixicon="RiWalletLine"
						/>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Wallets</ItemTitle>
						<ItemDescription>2 connected</ItemDescription>
					</ItemContent>
					<IconPlaceholder
						lucide="ChevronRightIcon"
						tabler="IconChevronRight"
						hugeicons="ArrowRight01Icon"
						phosphor="CaretRightIcon"
						remixicon="RiArrowRightSLine"
						className="size-4 text-muted-foreground"
					/>
				</Item>
			</ItemGroup>
		</div>
	);
}
