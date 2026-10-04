<script setup lang="ts">
import { CommandEmpty } from "@/registry/edmi/ui/command"
</script>

<template>
  <CommandEmpty>
    <slot>No microphone found.</slot>
  </CommandEmpty>
</template>
