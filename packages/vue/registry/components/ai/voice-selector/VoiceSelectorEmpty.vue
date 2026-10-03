<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { CommandEmpty } from "@/registry/edmi/ui/command"
</script>

<template>
  <CommandEmpty>
    <slot>No voices found.</slot>
  </CommandEmpty>
</template>
