<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import { Command } from "@/registry/edmi/ui/command"

type Props = InstanceType<typeof Command>["$props"]
interface PromptInputCommandProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputCommandProps>()
</script>

<template>
  <Command>
    <slot />
  </Command>
</template>
