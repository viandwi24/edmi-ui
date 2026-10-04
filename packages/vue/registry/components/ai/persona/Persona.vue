<script setup lang="ts">
import type { EventCallback, Rive } from "@rive-app/webgl2"
import type { HTMLAttributes } from "vue"
import type { PersonaState, PersonaVariant } from "./sources"
import { useResizeObserver } from "@vueuse/core"
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { personaSources } from "./sources"

// Rive/WebGL2 artwork; the same files as Vercel AI Elements. The look is the artwork, so there is no raised variant.
const props = withDefaults(defineProps<{
  state?: PersonaState
  variant?: PersonaVariant
  class?: HTMLAttributes["class"]
}>(), {
  state: "idle",
  variant: "obsidian",
})

const emit = defineEmits<{
  (e: "load"): void
  (e: "loadError", error: unknown): void
  (e: "ready"): void
  (e: "pause", event: Parameters<EventCallback>[0]): void
  (e: "play", event: Parameters<EventCallback>[0]): void
  (e: "stop", event: Parameters<EventCallback>[0]): void
}>()

const stateMachine = "default"

const canvasRef = ref<HTMLCanvasElement | null>(null)
const rive = shallowRef<Rive | null>(null)
const source = computed(() => personaSources[props.variant])

// Edmi themes with a `.dark` class on <html> or on any ancestor (scoped dark subtrees).
const theme = ref<"light" | "dark">("light")
function readTheme(): "light" | "dark" {
  if (canvasRef.value?.closest(".dark") || document.documentElement.classList.contains("dark"))
    return "dark"
  if (!canvasRef.value?.closest(".light") && window.matchMedia?.("(prefers-color-scheme: dark)").matches)
    return "dark"
  return "light"
}

let observer: MutationObserver | null = null
let mql: MediaQueryList | null = null
const syncTheme = () => { theme.value = readTheme() }

useResizeObserver(canvasRef, () => rive.value?.resizeDrawingSurfaceToCanvas())

function applyState() {
  const instance = rive.value
  if (!instance)
    return
  const inputs = instance.stateMachineInputs(stateMachine)
  if (!inputs)
    return
  for (const name of ["listening", "thinking", "speaking", "asleep"] as const) {
    const input = inputs.find((i) => i.name === name)
    if (input)
      input.value = props.state === name
  }
}

function applyColor() {
  const instance = rive.value
  if (!instance || !source.value.dynamicColor || !source.value.hasModel)
    return
  const color = instance.viewModelInstance?.color("color")
  if (color) {
    const [r, g, b] = theme.value === "dark" ? [255, 255, 255] : [0, 0, 0]
    color.rgb(r, g, b)
  }
}

// @rive-app/webgl2 is CommonJS: load it on the client only (Node SSR cannot see its named exports).
type RiveModule = typeof import("@rive-app/webgl2")
let riveModule: Promise<RiveModule> | null = null
function loadRive() {
  riveModule ??= import("@rive-app/webgl2").then(m =>
    "Rive" in m ? m : (m as unknown as { default: RiveModule }).default,
  )
  return riveModule
}
let generation = 0

async function start() {
  const run = ++generation
  const { Rive } = await loadRive()
  const canvas = canvasRef.value
  if (run !== generation || !canvas)
    return
  rive.value?.cleanup()
  const instance = new Rive({
    canvas,
    src: source.value.source,
    autoplay: true,
    autoBind: source.value.hasModel,
    stateMachine,
    onLoad: () => {
      emit("load")
      applyColor()
      applyState()
      emit("ready")
    },
    onLoadError: (err) => emit("loadError", err),
    onPlay: (event) => emit("play", event),
    onPause: (event) => emit("pause", event),
    onStop: (event) => emit("stop", event),
  })
  rive.value = instance
}

onMounted(() => {
  syncTheme()
  observer = new MutationObserver(syncTheme)
  observer.observe(document.documentElement, { attributeFilter: ["class"], attributes: true, subtree: true })
  if (window.matchMedia) {
    mql = window.matchMedia("(prefers-color-scheme: dark)")
    mql.addEventListener("change", syncTheme)
  }
  start()
})

onBeforeUnmount(() => {
  generation++
  observer?.disconnect()
  mql?.removeEventListener("change", syncTheme)
  rive.value?.cleanup()
  rive.value = null
})

watch(() => props.state, applyState)
watch(theme, applyColor)
watch(() => props.variant, start)
</script>

<template>
  <div
    data-slot="ai-persona"
    :data-state="props.state"
    :data-variant="props.variant"
    :class="cn('size-16 shrink-0', props.class)"
  >
    <canvas ref="canvasRef" class="size-full" />
  </div>
</template>
