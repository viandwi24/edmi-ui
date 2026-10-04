<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'
import { PhCheckCircle, PhInfo, PhCircleNotch, PhXCircle, PhWarning, PhX } from '@phosphor-icons/vue'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { Toaster as Sonner } from 'vue-sonner'
import 'vue-sonner/style.css'
import { cn } from '@/lib/utils'
import { type Elevation, useElevation } from '@/components/ui/elevation'

const props = withDefaults(defineProps<ToasterProps & { elevation?: Elevation }>(), { elevation: undefined })

// ✦ depth (v4): floating is the natural level of a toast (overlay role in layered mode).
const toastElevation = {
  sunken: 'shadow-none!',
  flat: 'shadow-none!',
  raised: 'border-transparent! shadow-raised!',
  floating: 'border-transparent! shadow-floating!',
}
const level = useElevation(() => props.elevation, 'overlay')
const delegatedProps = reactiveOmit(props, 'elevation')

// Soft fill + tinted 40% border per type (DESIGN 4.12); default stays a solid popover chip.
// vue-sonner's own selectors are more specific than utilities, hence the important modifier.
const toastClasses = computed(() => ({
  toast: cn('cn-toast text-[13.5px] font-sans', toastElevation[level.value]),
  title: 'font-medium',
  description: 'text-muted-foreground!',
  success: 'bg-success-soft! border-[color-mix(in_srgb,var(--success)_40%,var(--popover))]!',
  info: 'bg-info-soft! border-[color-mix(in_srgb,var(--info)_40%,var(--popover))]!',
  warning: 'bg-warning-soft! border-[color-mix(in_srgb,var(--warning)_40%,var(--popover))]!',
  error: 'bg-destructive-soft! border-[color-mix(in_srgb,var(--destructive)_40%,var(--popover))]!',
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
