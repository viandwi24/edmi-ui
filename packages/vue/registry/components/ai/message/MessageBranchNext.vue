<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { ChevronRightIcon } from "@lucide/vue"
import { Button } from "@/registry/edmi/ui/button"
import { useMessageBranchContext } from "./context"

const { goToNext, totalBranches } = useMessageBranchContext()
</script>

<template>
  <Button
    aria-label="Next branch"
    :disabled="totalBranches <= 1"
    size="icon-xs"
    type="button"
    variant="ghost"
    @click="goToNext"
  >
    <slot>
      <ChevronRightIcon />
    </slot>
  </Button>
</template>
