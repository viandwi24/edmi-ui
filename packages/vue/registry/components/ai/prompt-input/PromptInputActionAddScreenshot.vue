<script setup lang="ts">
import { MonitorIcon } from "@lucide/vue"
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu"
import { usePromptInputAttachments } from "./context"
import { captureScreenshot } from "./screenshot"

type Props = InstanceType<typeof DropdownMenuItem>["$props"]
interface PromptInputActionAddScreenshotProps extends /* @vue-ignore */ Props {
  label?: string
}

const props = withDefaults(defineProps<PromptInputActionAddScreenshotProps>(), {
  label: "Take screenshot",
})

const attachments = usePromptInputAttachments()

async function handleSelect(event: Event) {
  if (event.defaultPrevented)
    return
  try {
    const screenshot = await captureScreenshot()
    if (screenshot)
      attachments.add([screenshot])
  }
  catch (error) {
    // The user dismissed the capture picker: not an error.
    if (error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "AbortError"))
      return
    throw error
  }
}
</script>

<template>
  <DropdownMenuItem @select="handleSelect">
    <MonitorIcon class="size-4" />
    {{ props.label }}
  </DropdownMenuItem>
</template>
