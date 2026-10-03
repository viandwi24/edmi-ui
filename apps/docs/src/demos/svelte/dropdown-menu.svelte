<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "@edmi-svelte/ui/button";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";

	let showAum = $state(true);
	let sort = $state("newest");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>Account</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>My account</DropdownMenu.GroupHeading>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="UserIcon"
					tabler="IconUser"
					hugeicons="UserIcon"
					phosphor="UserIcon"
					remixicon="RiUserLine"
				/>
				Profile <DropdownMenu.Shortcut>⇧P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="WalletIcon"
					tabler="IconWallet"
					hugeicons="WalletIcon"
					phosphor="WalletIcon"
					remixicon="RiWalletLine"
				/>
				Wallets <DropdownMenu.Shortcut>⌘W</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="SettingsIcon"
					tabler="IconSettings"
					hugeicons="SettingsIcon"
					phosphor="GearIcon"
					remixicon="RiSettingsLine"
				/>
				Settings
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>Invite</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.Item>Email</DropdownMenu.Item>
				<DropdownMenu.Item>Copy link</DropdownMenu.Item>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Columns</DropdownMenu.GroupHeading>
			<DropdownMenu.CheckboxItem bind:checked={showAum}>AUM</DropdownMenu.CheckboxItem>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Sort</DropdownMenu.GroupHeading>
			<DropdownMenu.RadioGroup bind:value={sort}>
				<DropdownMenu.RadioItem value="newest">Newest</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="aum">Top AUM</DropdownMenu.RadioItem>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive">
			<IconPlaceholder
				lucide="LogOutIcon"
				tabler="IconLogout"
				hugeicons="LogoutIcon"
				phosphor="SignOutIcon"
				remixicon="RiLogoutBoxLine"
			/>
			Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
