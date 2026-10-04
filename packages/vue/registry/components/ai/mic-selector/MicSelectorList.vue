<script setup lang="ts">
import { CommandGroup, CommandList } from "@/registry/edmi/ui/command"
import { useMicSelector } from "./context"

const { devices } = useMicSelector("MicSelectorList")
</script>

<template>
  <CommandList>
    <!-- Command items must sit inside a group (see ui/command). -->
    <CommandGroup>
      <slot :devices="devices" />
    </CommandGroup>
  </CommandList>
</template>
