<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu"
</script>

<template>
  <DropdownMenuItem v-bind="$attrs">
    <slot />
  </DropdownMenuItem>
</template>
