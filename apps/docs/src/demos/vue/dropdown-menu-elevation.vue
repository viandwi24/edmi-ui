<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@edmi-vue/ui/dropdown-menu";

const levels = [{ value: "flat", label: "Flat" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <DropdownMenu v-for="level in levels" :key="level.value">
      <DropdownMenuTrigger as-child>
        <Button variant="outline">{{ level.label }}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :elevation="level.value" class="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Wallets</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
