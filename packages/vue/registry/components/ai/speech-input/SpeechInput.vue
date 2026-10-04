<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "@/registry/edmi/ui/button"
import { AudioLinesIcon } from "@lucide/vue"
import { computed, onMounted, onUnmounted, ref, useAttrs, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import { Spinner } from "@/registry/edmi/ui/spinner"

// Built on ui/button (DESIGN §5b): outline icon button; listening = brand fill with a solid soft ring and
// two pulsing outlines, processing = spinner. `raised` is forwarded to the Button.
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  /** ✦ one-step 3D look */
  raised?: boolean
  /**
   * MediaRecorder fallback for browsers without the Web Speech API (Firefox): receives the recorded audio and
   * returns the transcript, which is emitted as `transcriptionChange`.
   */
  onAudioRecorded?: (audioBlob: Blob) => Promise<string>
  lang?: string
}>(), {
  variant: "outline",
  size: "icon",
  raised: false,
  lang: "en-US",
  onAudioRecorded: undefined,
})

const emit = defineEmits<{
  (e: "transcriptionChange", text: string): void
}>()

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
}

interface SpeechRecognitionResultCustom {
  readonly length: number
  [index: number]: { transcript: string, confidence: number }
  isFinal: boolean
}

interface SpeechRecognitionEventCustom extends Event {
  results: ArrayLike<SpeechRecognitionResultCustom>
  resultIndex: number
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance
type SpeechInputMode = "speech-recognition" | "media-recorder" | "none"

const isListening = ref(false)
const isProcessing = ref(false)
const mode = ref<SpeechInputMode>("none")
const recognition = ref<SpeechRecognitionInstance | null>(null)
let mediaRecorder: MediaRecorder | null = null
let mediaStream: MediaStream | null = null
let audioChunks: Blob[] = []

function detectSpeechInputMode(): SpeechInputMode {
  if (typeof window === "undefined")
    return "none"
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    return "speech-recognition"
  if ("MediaRecorder" in window && "mediaDevices" in navigator)
    return "media-recorder"
  return "none"
}

onMounted(() => {
  mode.value = detectSpeechInputMode()
})

// Create the recognizer when the mode or the language changes.
watch([mode, () => props.lang], ([newMode, newLang]) => {
  recognition.value?.stop()
  recognition.value = null
  if (newMode !== "speech-recognition")
    return

  const w = window as unknown as Record<string, SpeechRecognitionConstructor | undefined>
  const Ctor = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as SpeechRecognitionConstructor
  const speechRecognition = new Ctor()
  speechRecognition.continuous = true
  speechRecognition.interimResults = true
  speechRecognition.lang = newLang

  speechRecognition.addEventListener("start", () => { isListening.value = true })
  speechRecognition.addEventListener("end", () => { isListening.value = false })
  speechRecognition.addEventListener("error", () => { isListening.value = false })
  speechRecognition.addEventListener("result", (event) => {
    const speechEvent = event as SpeechRecognitionEventCustom
    let finalTranscript = ""
    for (let i = speechEvent.resultIndex; i < speechEvent.results.length; i += 1) {
      const result = speechEvent.results[i]
      if (result?.isFinal)
        finalTranscript += result[0]?.transcript ?? ""
    }
    if (finalTranscript)
      emit("transcriptionChange", finalTranscript)
  })

  recognition.value = speechRecognition
}, { immediate: true })

function releaseStream() {
  if (mediaStream) {
    for (const track of mediaStream.getTracks()) track.stop()
    mediaStream = null
  }
}

onUnmounted(() => {
  recognition.value?.stop()
  if (mediaRecorder?.state === "recording")
    mediaRecorder.stop()
  releaseStream()
})

async function startMediaRecorder() {
  if (!props.onAudioRecorded)
    return
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStream = stream
    const recorder = new MediaRecorder(stream)
    audioChunks = []

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0)
        audioChunks.push(event.data)
    })

    recorder.addEventListener("stop", async () => {
      releaseStream()
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" })
      if (audioBlob.size > 0 && props.onAudioRecorded) {
        isProcessing.value = true
        try {
          const transcript = await props.onAudioRecorded(audioBlob)
          if (transcript)
            emit("transcriptionChange", transcript)
        }
        catch {
          // Error handling is delegated to the onAudioRecorded caller
        }
        finally {
          isProcessing.value = false
        }
      }
    })

    recorder.addEventListener("error", () => {
      isListening.value = false
      releaseStream()
    })

    mediaRecorder = recorder
    recorder.start()
    isListening.value = true
  }
  catch {
    isListening.value = false
  }
}

function stopMediaRecorder() {
  if (mediaRecorder?.state === "recording")
    mediaRecorder.stop()
  isListening.value = false
}

function toggleListening() {
  if (mode.value === "speech-recognition" && recognition.value) {
    if (isListening.value)
      recognition.value.stop()
    else
      recognition.value.start()
  }
  else if (mode.value === "media-recorder") {
    if (isListening.value)
      stopMediaRecorder()
    else
      startMediaRecorder()
  }
}

const attrs = useAttrs()
const isDisabled = computed(() =>
  (attrs.disabled !== undefined && attrs.disabled !== false)
  || mode.value === "none"
  || (mode.value === "speech-recognition" && !recognition.value)
  || (mode.value === "media-recorder" && !props.onAudioRecorded)
  || isProcessing.value,
)

const state = computed(() => (isProcessing.value ? "processing" : isListening.value ? "listening" : "idle"))
</script>

<template>
  <div
    data-slot="ai-speech-input"
    :data-state="state"
    class="relative inline-flex items-center justify-center"
  >
    <!-- Pulsing outlines while listening -->
    <template v-if="isListening">
      <span
        v-for="index in [0, 1]"
        :key="index"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 animate-ping rounded-md border-2 border-brand"
        :style="{ animationDelay: `${index * 0.5}s`, animationDuration: '2s' }"
      />
    </template>

    <Button
      v-bind="$attrs"
      :aria-label="isListening ? 'Stop dictation' : 'Start dictation'"
      :aria-pressed="isListening"
      :variant="isListening ? 'brand' : props.variant"
      :size="props.size"
      :raised="props.raised"
      :disabled="isDisabled"
      :class="cn(
        'relative z-10',
        isListening && !props.raised && 'shadow-[0_0_0_5px_color-mix(in_srgb,var(--brand)_22%,var(--background))]',
        props.class,
      )"
      @click="toggleListening"
    >
      <Spinner v-if="isProcessing" />
      <svg
        v-else-if="isListening"
        class="size-3.5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="5" y="5" width="14" height="14" rx="2" />
      </svg>
      <AudioLinesIcon v-else class="size-4" />
    </Button>
  </div>
</template>
