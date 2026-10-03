import { Button } from "@edmi-react/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	const [showAum, setShowAum] = useState(true);
	const [sort, setSort] = useState("newest");
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Account
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>My account</DropdownMenuLabel>
					<DropdownMenuItem>
						<IconPlaceholder
							lucide="UserIcon"
							tabler="IconUser"
							hugeicons="UserIcon"
							phosphor="UserIcon"
							remixicon="RiUserLine"
						/>{" "}
						Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconPlaceholder
							lucide="WalletIcon"
							tabler="IconWallet"
							hugeicons="WalletIcon"
							phosphor="WalletIcon"
							remixicon="RiWalletLine"
						/>{" "}
						Wallets <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconPlaceholder
							lucide="SettingsIcon"
							tabler="IconSettings"
							hugeicons="SettingsIcon"
							phosphor="GearIcon"
							remixicon="RiSettingsLine"
						/>{" "}
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Invite</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Email</DropdownMenuItem>
						<DropdownMenuItem>Copy link</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Columns</DropdownMenuLabel>
					<DropdownMenuCheckboxItem
						checked={showAum}
						onCheckedChange={setShowAum}
					>
						AUM
					</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>Sort</DropdownMenuLabel>
					<DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
						<DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="aum">Top AUM</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<IconPlaceholder
						lucide="LogOutIcon"
						tabler="IconLogout"
						hugeicons="LogoutIcon"
						phosphor="SignOutIcon"
						remixicon="RiLogoutBoxLine"
					/>{" "}
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
