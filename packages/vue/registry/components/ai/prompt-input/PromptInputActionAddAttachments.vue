<script setup lang="ts">
import { ImageIcon } from "@lucide/vue"
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu"
import { usePromptInputAttachments } from "./context"

type Props = InstanceType<typeof DropdownMenuItem>["$props"]
interface PromptInputActionAddAttachmentsProps extends /* @vue-ignore */ Props {
  label?: string
}

const props = withDefaults(defineProps<PromptInputActionAddAttachmentsProps>(), {
  label: "Add photos or files",
})

const { openFileDialog } = usePromptInputAttachments()
</script>

<template>
  <DropdownMenuItem @select="openFileDialog">
    <ImageIcon class="size-4" />
    {{ props.label }}
  </DropdownMenuItem>
</template>
