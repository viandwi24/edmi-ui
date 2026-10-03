<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { Experimental_SpeechResult as SpeechResult } from "ai"
import { computed } from "vue"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  src?: string
  data?: SpeechResult["audio"]
}>()

const audioSrc = computed(() => {
  if (props.src)
    return props.src
  if (props.data)
    return `data:${props.data.mediaType};base64,${props.data.base64}`
  return undefined
})
</script>

<template>
  <!-- Captions are provided by the consumer. -->
  <audio
    v-bind="{ ...$attrs, slot: 'media' }"
    data-slot="ai-audio-player-element"
    :src="audioSrc"
  />
</template>
