<script setup lang="ts">
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu"

type Props = InstanceType<typeof DropdownMenuItem>["$props"]
interface PromptInputActionMenuItemProps extends /* @vue-ignore */ Props {}
defineProps<PromptInputActionMenuItemProps>()
</script>

<template>
  <DropdownMenuItem>
    <slot />
  </DropdownMenuItem>
</template>
