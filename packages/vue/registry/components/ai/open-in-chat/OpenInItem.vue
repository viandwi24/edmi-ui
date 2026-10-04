<script setup lang="ts">
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu"
</script>

<template>
  <DropdownMenuItem v-bind="$attrs">
    <slot />
  </DropdownMenuItem>
</template>
