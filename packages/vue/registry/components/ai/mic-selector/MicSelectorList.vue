<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
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
