<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { PhCheck } from '@phosphor-icons/vue'
import { computed, onBeforeUnmount, ref, useId, watch } from "vue"
import { cn } from '@/lib/utils'
import { useElevation } from '@/components/ui/elevation'
import { getAnswerKeyShortcuts, injectQuestionnaireItemContext, injectQuestionnaireRootContext } from "./useQuestionnaire"

const props = withDefaults(defineProps<{
  /** Controlled checked state. Use with `v-model:checked`. */
  checked?: boolean
  class?: HTMLAttributes["class"]
  /** Checks the choice on mount and after a native form reset. */
  defaultChecked?: boolean
  disabled?: boolean
  /** Submitted as the answer of the parent item. */
  value: string
}>(), {
  // `undefined` keeps the choice uncontrolled. Without this default, Vue casts
  // the absent boolean prop to `false` and every choice looks controlled.
  checked: undefined,
  defaultChecked: false,
  disabled: false,
})

const emits = defineEmits<{
  "change": [event: Event]
  "update:checked": [checked: boolean]
}>()

// ✦ choice-card depth (v4); a checked option keeps its ring.
const choiceElevation = {
  sunken: "border-sk-bd bg-sk-bg shadow-sunken",
  flat: "",
  raised: "border-transparent shadow-raised",
  floating: "border-transparent shadow-floating",
}

const item = injectQuestionnaireItemContext()
const root = injectQuestionnaireRootContext()
const level = useElevation(() => root.elevation.value, "control")

const answerId = useId()
const inputElement = ref<HTMLInputElement | null>(null)
const initialDefaultChecked = props.defaultChecked

const controlled = computed(() => props.checked !== undefined)
const disabled = computed(() => item.disabled.value || props.disabled)
const selected = computed(() => item.selectedAnswerIds.value.includes(answerId))
const checked = computed(() => {
  if (!controlled.value) {
    return selected.value
  }

  // A skipped item clears every answer, including controlled ones.
  return item.status.value === "skipped" ? false : props.checked!
})
const type = computed(() => (item.multiple.value ? "checkbox" : "radio"))
const shortcut = computed(() =>
  item.shortcutByChoiceValue.value?.get(props.value)
  ?? item.shortcutByAnswerId.value.get(answerId)
  ?? null)

function syncCheckedElement() {
  if (inputElement.value && inputElement.value.checked !== checked.value) {
    inputElement.value.checked = checked.value
  }
}

function handleChange(event: Event) {
  emits("change", event)

  if (event.defaultPrevented) {
    syncCheckedElement()
    return
  }

  const nextChecked = (event.target as HTMLInputElement).checked

  emits("update:checked", nextChecked)

  if (!controlled.value) {
    item.setAnswerSelectionFromInteraction(answerId, nextChecked)
    return
  }

  // Re-selecting the same controlled choice has to clear the skipped state.
  if (item.status.value === "skipped" && props.checked === nextChecked) {
    item.setAnswerSelectionFromInteraction(answerId, props.checked)
  }

  // Checking a radio clears its siblings, so the whole group has to re-sync in
  // case the host keeps the previous answer.
  item.requestControlSync()
}

const unregisterSelection = item.registerAnswerSelection(answerId, initialDefaultChecked)

let unregisterControl: (() => void) | null = null

watch([inputElement, disabled, () => props.disabled, () => props.value], ([element]) => {
  unregisterControl?.()
  unregisterControl = null

  if (!element) {
    return
  }

  unregisterControl = item.registerAnswerControl({
    disabled: disabled.value,
    element,
    id: answerId,
    ownDisabled: props.disabled,
    type: "choice",
    value: props.value,
  })
}, { flush: "post" })

watch(() => props.defaultChecked, (defaultChecked) => {
  item.setAnswerDefault(answerId, defaultChecked)
})

watch([() => props.checked, item.resetVersion], () => {
  if (controlled.value) {
    item.syncControlledAnswerSelection(answerId, props.checked!)
  }
}, { immediate: true })

watch(item.controlSyncVersion, syncCheckedElement, { flush: "post" })

watch([checked, inputElement, () => props.defaultChecked, item.resetVersion], () => {
  if (!inputElement.value) {
    return
  }

  // Keep the native reset target aligned with the questionnaire owned default,
  // including controlled choices whose `checked` prop stays authoritative.
  inputElement.value.defaultChecked = controlled.value ? props.checked! : props.defaultChecked

  syncCheckedElement()
}, { flush: "post" })

onBeforeUnmount(() => {
  unregisterControl?.()
  unregisterControl = null
  unregisterSelection()
})
</script>

<template>
  <label
    data-slot="questionnaire-choice"
    :data-checked="checked ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="item.invalid.value ? '' : undefined"
    :data-shortcut="shortcut ?? undefined"
    :data-type="type"
    :data-unchecked="checked ? undefined : ''"
    :class="cn(
      'group/questionnaire-choice relative flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-2 text-start text-sm transition-colors outline-none select-none hover:bg-accent has-[>input:focus-visible]:outline-2 has-[>input:focus-visible]:outline-offset-2 has-[>input:focus-visible]:outline-ring data-[invalid]:border-destructive data-[checked]:border-ring data-[checked]:bg-[color-mix(in_srgb,var(--brand)_5%,var(--card))] data-[checked]:shadow-[0_0_0_1px_var(--ring)]',
      'data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      choiceElevation[level],
      props.class,
    )"
  >
    <input
      :id="answerId"
      ref="inputElement"
      data-slot="questionnaire-choice-input"
      class="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
      :aria-invalid="item.invalid.value || undefined"
      :aria-keyshortcuts="getAnswerKeyShortcuts(shortcut, !disabled && checked)"
      :checked="checked"
      :data-checked="checked ? '' : undefined"
      :data-unchecked="checked ? undefined : ''"
      :disabled="disabled"
      :name="item.status.value === 'skipped' ? undefined : item.name.value"
      :required="item.required.value && !item.multiple.value && !item.hasInputAnswer.value"
      :type="type"
      :value="props.value"
      @change="handleChange"
    >
    <span
      v-if="shortcut"
      aria-hidden="true"
      data-slot="questionnaire-choice-shortcut"
      class="pointer-events-none hidden size-5 shrink-0 items-center justify-center rounded-md border border-input bg-card font-mono text-[10.5px] leading-none font-medium text-muted-foreground group-data-[shortcut]/questionnaire-choice:inline-flex group-data-[checked]/questionnaire-choice:border-brand-edge group-data-[checked]/questionnaire-choice:bg-brand group-data-[checked]/questionnaire-choice:text-brand-foreground"
    >
      {{ shortcut }}
    </span>
    <span
      data-slot="questionnaire-choice-label"
      class="flex min-w-0 flex-1 flex-col gap-0.5 text-sm leading-snug"
    >
      <slot :checked="checked" :disabled="disabled" :shortcut="shortcut" :type="type" />
    </span>
    <span
      aria-hidden="true"
      data-slot="questionnaire-choice-indicator"
      class="pointer-events-none relative flex size-4 shrink-0 items-center justify-center text-foreground group-data-[type=checkbox]/questionnaire-choice:size-[18px] group-data-[type=checkbox]/questionnaire-choice:rounded-[5px] group-data-[type=checkbox]/questionnaire-choice:border group-data-[type=checkbox]/questionnaire-choice:border-input group-data-[type=checkbox]/questionnaire-choice:bg-card group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:border-primary group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:bg-primary group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:text-primary-foreground"
    >
      <PhCheck data-slot="questionnaire-choice-indicator-check" class="hidden size-3.5 group-data-[checked]/questionnaire-choice:block" />
    </span>
  </label>
</template>
