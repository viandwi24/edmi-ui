<script setup lang="ts">
import { ChevronLeftIcon } from "@lucide/vue"
import { Button } from "@/registry/edmi/ui/button"
import { useMessageBranchContext } from "./context"

const { goToPrevious, totalBranches } = useMessageBranchContext()
</script>

<template>
  <Button
    aria-label="Previous branch"
    :disabled="totalBranches <= 1"
    size="icon-xs"
    type="button"
    variant="ghost"
    @click="goToPrevious"
  >
    <slot>
      <ChevronLeftIcon />
    </slot>
  </Button>
</template>
