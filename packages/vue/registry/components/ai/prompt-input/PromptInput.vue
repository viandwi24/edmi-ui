<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { HTMLAttributes } from "vue"
import type { PromptInputError, PromptInputMessage } from "./types"
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, watchEffect } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { InputGroup } from "@/registry/edmi/ui/input-group"
import { createPromptInputState, providePromptInput } from "./context"
import { PROMPT_INPUT_KEY } from "./types"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  /** e.g. `image/*`, `.csv`; leave undefined for any. */
  accept?: string
  multiple?: boolean
  /** When true, accepts drops anywhere on the document. Default false (opt-in). */
  globalDrop?: boolean
  maxFiles?: number
  /** Bytes. */
  maxFileSize?: number
  initialInput?: string
  /** ✦ one-step 3D look on the submit button. */
  raised?: boolean
}>(), {
  raised: false,
})

const emit = defineEmits<{
  (e: "submit", message: PromptInputMessage): void
  (e: "error", err: PromptInputError): void
}>()

// `submit` listeners may be async: read the raw listener so the composer can await it (and keep the
// text on failure) instead of treating emit() as fire-and-forget.
const instance = getCurrentInstance()
function callListener<T>(name: "onSubmit" | "onError", payload: T) {
  const listener = instance?.vnode.props?.[name]
  if (Array.isArray(listener))
    return Promise.all(listener.map(fn => (typeof fn === "function" ? fn(payload) : undefined)))
  if (typeof listener === "function")
    return listener(payload)
}

// Inside a PromptInputProvider the state is lifted; otherwise it is local to this composer.
const state = inject(PROMPT_INPUT_KEY, null) ?? providePromptInput(createPromptInputState(props.initialInput))

watchEffect(() => {
  state.options.accept = props.accept
  state.options.maxFiles = props.maxFiles
  state.options.maxFileSize = props.maxFileSize
  state.raised.value = props.raised
})
state.options.onSubmit = async (message) => {
  if (instance?.vnode.props?.onSubmit)
    await callListener("onSubmit", message)
  else
    emit("submit", message)
}
state.options.onError = (err) => {
  if (instance?.vnode.props?.onError)
    void callListener("onError", err)
  else
    emit("error", err)
}

const { addFiles, submitForm } = state

function handleDragOver(e: DragEvent) {
  if (e.dataTransfer?.types?.includes("Files"))
    e.preventDefault()
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.types?.includes("Files"))
    e.preventDefault()
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0)
    addFiles(e.dataTransfer.files)
}

onMounted(() => {
  if (props.globalDrop) {
    document.addEventListener("dragover", handleDragOver)
    document.addEventListener("drop", handleDrop)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener("dragover", handleDragOver)
  document.removeEventListener("drop", handleDrop)
})

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files)
    addFiles(input.files)
  // Reset so a previously removed file can be picked again.
  input.value = ""
}
</script>

<template>
  <input
    :ref="(el) => { state.fileInputRef.value = el as HTMLInputElement | null }"
    type="file"
    class="hidden"
    aria-label="Upload files"
    title="Upload files"
    :accept="props.accept"
    :multiple="props.multiple"
    @change="onFileChange"
  >
  <form
    v-bind="$attrs"
    data-slot="ai-prompt-input"
    :class="cn('w-full', props.class)"
    @submit.prevent="submitForm()"
    @dragover="!props.globalDrop && handleDragOver($event)"
    @drop="!props.globalDrop && handleDrop($event)"
  >
    <InputGroup class="h-auto flex-col overflow-hidden rounded-[calc(var(--radius)*1.6)] border-input bg-card shadow-none">
      <!-- Slot props expose the composer state (files, remove, text, ...) so children can render attachments. -->
      <slot
        :files="state.files.value"
        :add="state.addFiles"
        :remove="state.removeFile"
        :clear="state.clearFiles"
        :open-file-dialog="state.openFileDialog"
        :text-input="state.textInput.value"
        :sources="state.referencedSources.value"
      />
    </InputGroup>
  </form>
</template>
