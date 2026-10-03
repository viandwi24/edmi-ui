<script setup lang="ts">
import type { MenubarRootEmits, MenubarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  MenubarRoot,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<MenubarRootProps & { class?: HTMLAttributes["class"], raised?: boolean }>(), { raised: false })
const emits = defineEmits<MenubarRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "raised")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarRoot
    v-slot="slotProps"
    data-slot="menubar"
    v-bind="forwarded"
    :class="
      cn(
      `flex items-center gap-0.5 rounded-[10px] border border-border bg-card p-[3px]`,
        props.raised && 'border-b-lip shadow-[0_2px_0_var(--lip)]',
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </MenubarRoot>
</template>
