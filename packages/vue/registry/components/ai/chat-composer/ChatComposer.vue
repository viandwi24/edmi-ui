<script setup lang="ts">
import type { ChatStatus } from "ai"
import type { HTMLAttributes } from "vue"
import type { PromptInputMessage } from "@/registry/edmi/components/ai/prompt-input"
import type { ChatComposerOption } from "./types"
import { AudioLinesIcon, ChevronDown, Plus } from "@lucide/vue"
import { useVModel } from "@vueuse/core"
import { computed, getCurrentInstance } from "vue"
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/registry/edmi/components/ai/prompt-input"
import { cn } from "@/registry/edmi/lib/utils"
import { Button } from "@/registry/edmi/ui/button"
import type { Elevation } from "@/registry/edmi/ui/elevation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  placeholder?: string
  status?: ChatStatus
  /** Small print centered in the footer. */
  disclaimer?: string
  /** Same as PromptInput. */
  accept?: string
  multiple?: boolean
  /** ✦ depth of the composer plate (overlay role: floating in layered mode). */
  elevation?: Elevation
  models?: ChatComposerOption[]
  /** `v-model:model`; use `defaultModel` for uncontrolled. */
  model?: string
  defaultModel?: string
  efforts?: ChatComposerOption[]
  effort?: string
  defaultEffort?: string
  modes?: ChatComposerOption[]
  mode?: string
  defaultMode?: string
}>(), {
  placeholder: "Reply",
  elevation: undefined,
})

const emit = defineEmits<{
  (e: "submit", message: PromptInputMessage): void
  (e: "stop"): void
  (e: "attach"): void
  (e: "speech"): void
  (e: "update:model", id: string): void
  (e: "update:effort", id: string): void
  (e: "update:mode", id: string): void
}>()

// The attach and speech buttons show when a listener is attached.
const vnodeProps = getCurrentInstance()?.vnode.props
const hasAttach = !!vnodeProps?.onAttach
const hasSpeech = !!vnodeProps?.onSpeech

const modelId = useVModel(props, "model", emit, { passive: true, defaultValue: props.defaultModel ?? props.models?.[0]?.id })
const effortId = useVModel(props, "effort", emit, { passive: true, defaultValue: props.defaultEffort ?? props.efforts?.[0]?.id })
const modeId = useVModel(props, "mode", emit, { passive: true, defaultValue: props.defaultMode ?? props.modes?.[0]?.id })

const labelOf = (options: ChatComposerOption[] | undefined, id?: string) =>
  options?.find(o => o.id === id)?.label
const ready = computed(() => props.status === undefined || props.status === "ready")
</script>

<template>
  <!-- Prompt input with the quiet footer outside the field: attach, speech, disclaimer, model + effort, mode. -->
  <div data-slot="ai-chat-composer" :class="cn('flex w-full flex-col', props.class)">
    <PromptInput
      :accept="accept"
      :multiple="multiple"
      :elevation="elevation"
      @submit="(m: PromptInputMessage) => emit('submit', m)"
    >
      <PromptInputBody>
        <div class="flex w-full items-center pr-2">
          <PromptInputTextarea
            :placeholder="placeholder"
            rows="1"
            class="min-h-12 px-4 py-3 text-[14.5px]"
          />
          <PromptInputSubmit
            :status="status"
            :variant="ready ? 'ghost' : undefined"
            :class="ready ? 'text-muted-foreground' : undefined"
            @stop="emit('stop')"
          >
            <span v-if="ready" aria-hidden="true">↵</span>
          </PromptInputSubmit>
        </div>
      </PromptInputBody>
    </PromptInput>
    <div data-slot="ai-chat-composer-footer" class="flex items-center gap-0.5 px-1.5 pt-2 text-xs">
      <Button v-if="hasAttach" aria-label="Attach" size="icon-xs" type="button" variant="ghost" @click="emit('attach')">
        <Plus class="size-4" />
      </Button>
      <Button v-if="hasSpeech" aria-label="Speech input" size="xs" type="button" variant="ghost" class="gap-0.5" @click="emit('speech')">
        <AudioLinesIcon class="size-4" />
        <ChevronDown class="size-3" />
      </Button>
      <span class="min-w-0 flex-1 truncate text-center text-muted-foreground">{{ disclaimer }}</span>
      <DropdownMenu v-if="models && models.length > 0">
        <DropdownMenuTrigger as-child>
          <Button size="xs" type="button" variant="ghost" class="gap-[5px] font-medium">
            {{ labelOf(models, modelId) }}
            <span v-if="efforts" class="font-normal text-muted-foreground">{{ labelOf(efforts, effortId) }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Model</DropdownMenuLabel>
            <DropdownMenuRadioGroup v-model="modelId">
              <DropdownMenuRadioItem v-for="m in models" :key="m.id" :value="m.id">
                {{ m.label }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <template v-if="efforts && efforts.length > 0">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Effort</DropdownMenuLabel>
              <DropdownMenuRadioGroup v-model="effortId">
                <DropdownMenuRadioItem v-for="e in efforts" :key="e.id" :value="e.id">
                  {{ e.label }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu v-if="modes && modes.length > 0">
        <DropdownMenuTrigger as-child>
          <Button size="xs" type="button" variant="ghost" class="text-muted-foreground">
            {{ labelOf(modes, modeId) }}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Mode</DropdownMenuLabel>
            <DropdownMenuRadioGroup v-model="modeId">
              <DropdownMenuRadioItem v-for="m in modes" :key="m.id" :value="m.id">
                {{ m.label }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
