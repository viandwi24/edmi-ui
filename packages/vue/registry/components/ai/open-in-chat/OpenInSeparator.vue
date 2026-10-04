<script setup lang="ts">
import { DropdownMenuSeparator } from "@/registry/edmi/ui/dropdown-menu"
</script>

<template>
  <DropdownMenuSeparator v-bind="$attrs">
    <slot />
  </DropdownMenuSeparator>
</template>
