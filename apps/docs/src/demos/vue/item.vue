<script setup lang="ts">
import { ChevronRightIcon, UserIcon, WalletIcon } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@edmi-vue/ui/item";
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Item variant="outline">
      <ItemMedia variant="icon"><WalletIcon /></ItemMedia>
      <ItemContent>
        <ItemTitle>Phantom wallet</ItemTitle>
        <ItemDescription>7nXK...Qp2d, devnet</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">Disconnect</Button>
      </ItemActions>
    </Item>
    <Item variant="muted" size="sm">
      <ItemContent>
        <ItemTitle>Keeper is on</ItemTitle>
        <ItemDescription>Rebalances when drift exceeds 5%.</ItemDescription>
      </ItemContent>
    </Item>
    <ItemGroup>
      <Item as-child>
        <a href="#profile">
          <ItemMedia variant="icon"><UserIcon /></ItemMedia>
          <ItemContent>
            <ItemTitle>Profile</ItemTitle>
            <ItemDescription>Name, avatar and bio</ItemDescription>
          </ItemContent>
          <ChevronRightIcon class="size-4 text-muted-foreground" />
        </a>
      </Item>
      <ItemSeparator />
      <Item as-child>
        <a href="#wallets">
          <ItemMedia variant="icon"><WalletIcon /></ItemMedia>
          <ItemContent>
            <ItemTitle>Wallets</ItemTitle>
            <ItemDescription>2 connected</ItemDescription>
          </ItemContent>
          <ChevronRightIcon class="size-4 text-muted-foreground" />
        </a>
      </Item>
    </ItemGroup>
  </div>
</template>
