<script setup lang="ts">
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
