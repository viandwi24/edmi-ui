<script setup lang="ts">
import { DropdownMenuLabel } from "@/registry/edmi/ui/dropdown-menu"
</script>

<template>
  <DropdownMenuLabel v-bind="$attrs">
    <slot />
  </DropdownMenuLabel>
</template>
