<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { ChevronDownIcon } from "@lucide/vue"
import { Button } from "@/registry/edmi/ui/button"
import { DropdownMenuTrigger } from "@/registry/edmi/ui/dropdown-menu"
</script>

<template>
  <DropdownMenuTrigger as-child data-slot="ai-open-in-trigger">
    <slot>
      <Button type="button" variant="outline" size="sm">
        Open in
        <ChevronDownIcon class="size-3.5" />
      </Button>
    </slot>
  </DropdownMenuTrigger>
</template>
