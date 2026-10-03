<script setup lang="ts">
import type { AvatarFallbackProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AvatarFallback } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <!-- Initials are mono (DESIGN §1 type): every short code, number and address uses JetBrains Mono. -->
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    :class="cn('flex size-full items-center justify-center rounded-full bg-muted font-mono text-[13px] font-medium text-muted-foreground group-data-[size=sm]/avatar:text-[10px] group-data-[size=lg]/avatar:text-sm', props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
