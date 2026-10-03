<script setup lang="ts">
import { ChevronDown } from "@lucide/vue"
import { Button } from "@/registry/edmi/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu"
</script>

<template>
  <!-- Chevron after the title; the default slot holds the `DropdownMenuItem`s. -->
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button aria-label="Conversation menu" size="icon-xs" type="button" variant="ghost">
        <ChevronDown class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
