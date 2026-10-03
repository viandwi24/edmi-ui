<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'
import { PhCheckCircle, PhInfo, PhCircleNotch, PhXCircle, PhWarning, PhX } from '@phosphor-icons/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { Toaster as Sonner } from 'vue-sonner'
import 'vue-sonner/style.css'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<ToasterProps & { raised?: boolean }>(), { raised: false })

// `raised` ✦ adds the one-step lip to every toast (flat by default).
const delegatedProps = reactiveOmit(props, 'raised')

// Soft fill + tinted 40% border per type (DESIGN 4.12); default stays a solid popover chip.
// vue-sonner's own selectors are more specific than utilities, hence the important modifier.
const toastClasses = computed(() => ({
  toast: cn('cn-toast shadow-none! text-[13.5px] font-sans', props.raised && 'border-b-lip! shadow-[0_3px_0_var(--lip)]!'),
  title: 'font-medium',
  description: 'text-muted-foreground!',
  success: 'bg-success-soft! border-success/40!',
  info: 'bg-info-soft! border-info/40!',
  warning: 'bg-warning-soft! border-warning/40!',
  error: 'bg-destructive-soft! border-destructive/40!',
}))
</script>

<template>
  <Sonner
    v-bind="delegatedProps"
    :class="cn('toaster group', props.class)"
    :toast-options="{ ...props.toastOptions, classes: { ...toastClasses, ...props.toastOptions?.classes } }"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius-xl)',
      '--width': '360px',
    }"
  >
    <template #success-icon>
      <PhCheckCircle class="size-4 text-success-text" />
    </template>
    <template #info-icon>
      <PhInfo class="size-4 text-info-text" />
    </template>
    <template #warning-icon>
      <PhWarning class="size-4 text-warning-text" />
    </template>
    <template #error-icon>
      <PhXCircle class="size-4 text-destructive-text" />
    </template>
    <template #loading-icon>
      <div>
        <PhCircleNotch class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <PhX class="size-4" />
    </template>
  </Sonner>
</template>
