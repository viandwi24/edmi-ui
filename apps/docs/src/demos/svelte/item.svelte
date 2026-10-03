<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Item from "@edmi-svelte/ui/item";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<div class="flex w-full max-w-md flex-col gap-6">
	<Item.Root variant="outline">
		<Item.Media variant="icon"><IconPlaceholder lucide="WalletIcon" tabler="IconWallet" hugeicons="WalletIcon" phosphor="WalletIcon" remixicon="RiWalletLine" /></Item.Media>
		<Item.Content>
			<Item.Title>Phantom wallet</Item.Title>
			<Item.Description>7nXK...Qp2d, devnet</Item.Description>
		</Item.Content>
		<Item.Actions>
			<Button size="sm" variant="outline">Disconnect</Button>
		</Item.Actions>
	</Item.Root>
	<Item.Root variant="muted" size="sm">
		<Item.Content>
			<Item.Title>Keeper is on</Item.Title>
			<Item.Description>Rebalances when drift exceeds 5%.</Item.Description>
		</Item.Content>
	</Item.Root>
	<Item.Group>
		<Item.Root>
			{#snippet child({ props })}
				<a href="#profile" {...props}>
					<Item.Media variant="icon"><IconPlaceholder lucide="UserIcon" tabler="IconUser" hugeicons="UserIcon" phosphor="UserIcon" remixicon="RiUserLine" /></Item.Media>
					<Item.Content>
						<Item.Title>Profile</Item.Title>
						<Item.Description>Name, avatar and bio</Item.Description>
					</Item.Content>
					<IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" class="size-4 text-muted-foreground" />
				</a>
			{/snippet}
		</Item.Root>
		<Item.Separator />
		<Item.Root>
			{#snippet child({ props })}
				<a href="#wallets" {...props}>
					<Item.Media variant="icon"><IconPlaceholder lucide="WalletIcon" tabler="IconWallet" hugeicons="WalletIcon" phosphor="WalletIcon" remixicon="RiWalletLine" /></Item.Media>
					<Item.Content>
						<Item.Title>Wallets</Item.Title>
						<Item.Description>2 connected</Item.Description>
					</Item.Content>
					<IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" class="size-4 text-muted-foreground" />
				</a>
			{/snippet}
		</Item.Root>
	</Item.Group>
</div>
