<script setup lang="ts">
import { SettingsIcon, UserIcon, WalletIcon, LogOutIcon } from "@lucide/vue";
import { ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
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
} from "@edmi-vue/ui/dropdown-menu";

const showAum = ref(true);
const sort = ref("newest");
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">Account</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuGroup>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuItem>
          <UserIcon />
          Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <WalletIcon />
          Wallets <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
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
        <DropdownMenuCheckboxItem v-model="showAum">AUM</DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuRadioGroup v-model="sort">
          <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="aum">Top AUM</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <LogOutIcon />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
