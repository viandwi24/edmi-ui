<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import { Check, Copy } from '@lucide/vue'
import { Button } from '@/registry/edmi/ui/button'
import { Card } from '@/registry/edmi/ui/card'
import { cn } from '@/registry/edmi/lib/utils'

const props = withDefaults(defineProps<{
  /** ✦ one-step 3D look, forwarded to the card */
  raised?: boolean
  class?: HTMLAttributes['class']
  /** Source text. */
  code: string
  /** Header label (file name or tool). */
  title?: string
  /** 1-based line numbers to highlight. */
  highlightLines?: number[]
  /** Show the copy button (default true). */
  copyable?: boolean
}>(), { copyable: true })

const emit = defineEmits<{ copy: [code: string] }>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(timer))

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    return
  }
  emit('copy', props.code)
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { copied.value = false }, 1500)
}

const lines = computed(() => props.code.split('\n'))
</script>

<template>
  <Card :elevation="raised ? 'raised' : undefined" data-slot="code-block" :class="cn('gap-0 overflow-hidden p-0', props.class)">
    <div
      v-if="title || copyable"
      class="flex items-center justify-between border-b border-border bg-muted py-2 pr-2 pl-3.5"
    >
      <span class="font-mono text-[11.5px] text-muted-foreground">{{ title }}</span>
      <Button
        v-if="copyable"
        variant="ghost"
        size="icon-xs"
        :aria-label="copied ? 'Copied' : 'Copy code'"
        @click="copy"
      >
        <Check v-if="copied" />
        <Copy v-else />
      </Button>
    </div>
    <pre class="m-0 overflow-x-auto bg-card py-3.5 font-mono text-[12.5px] leading-[1.65] whitespace-pre-wrap text-foreground-2"><code><span
      v-for="(line, i) in lines"
      :key="i"
      :data-highlighted="highlightLines?.includes(i + 1) ? '' : undefined"
      class="block border-l-2 border-transparent px-3.5 data-[highlighted]:border-brand data-[highlighted]:bg-accent"
    >{{ line || '​' }}</span></code></pre>
  </Card>
</template>
