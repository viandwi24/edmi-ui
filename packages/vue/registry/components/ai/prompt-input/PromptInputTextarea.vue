<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed, ref } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroupTextarea } from "@/registry/edmi/ui/input-group"
import { usePromptInput } from "./context"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  placeholder?: string
}>(), {
  placeholder: "What would you like to know?",
})

const { textInput, setTextInput, addFiles, files, removeFile } = usePromptInput()
const isComposing = ref(false)

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter") {
    if (isComposing.value || e.isComposing || e.shiftKey)
      return

    e.preventDefault()

    const textarea = e.currentTarget as HTMLTextAreaElement | null
    const submitButton = textarea?.form?.querySelector("button[type=\"submit\"]") as HTMLButtonElement | null
    if (submitButton?.disabled)
      return

    textarea?.form?.requestSubmit()
  }

  // Remove the last attachment on Backspace when the textarea is empty.
  if (e.key === "Backspace" && textInput.value === "" && files.value.length > 0) {
    e.preventDefault()
    const last = files.value[files.value.length - 1]
    if (last)
      removeFile(last.id)
  }
}

function handlePaste(e: ClipboardEvent) {
  const items = e.clipboardData?.items
  if (!items)
    return

  const pasted: File[] = []
  for (const item of Array.from(items)) {
    if (item.kind === "file") {
      const file = item.getAsFile()
      if (file)
        pasted.push(file)
    }
  }

  if (pasted.length > 0) {
    e.preventDefault()
    addFiles(pasted)
  }
}

const modelValue = computed({
  get: () => textInput.value,
  set: val => setTextInput(val),
})
</script>

<template>
  <InputGroupTextarea
    v-model="modelValue"
    name="message"
    :placeholder="props.placeholder"
    :class="cn('field-sizing-content max-h-48 min-h-14 px-3.5 pt-3 pb-1.5 text-sm leading-normal', props.class)"
    @keydown="handleKeyDown"
    @paste="handlePaste"
    @compositionstart="isComposing = true"
    @compositionend="isComposing = false"
  />
</template>
