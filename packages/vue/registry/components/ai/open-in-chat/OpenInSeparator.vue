<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { DropdownMenuSeparator } from "@/registry/edmi/ui/dropdown-menu"
</script>

<template>
  <DropdownMenuSeparator v-bind="$attrs">
    <slot />
  </DropdownMenuSeparator>
</template>
