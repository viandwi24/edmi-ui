<script setup lang="ts">
import type { MenubarRootEmits, MenubarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  MenubarRoot,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"
import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation"

const props = withDefaults(defineProps<MenubarRootProps & { class?: HTMLAttributes["class"], elevation?: Elevation }>(), { elevation: undefined })
const emits = defineEmits<MenubarRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "elevation")

// ✦ depth (v4): the bar itself rises.
const barElevation = {
  sunken: '',
  flat: '',
  raised: 'border-transparent shadow-raised',
  floating: 'border-transparent shadow-floating',
}
const level = useElevation(() => props.elevation, 'control')

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
        barElevation[level],
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </MenubarRoot>
</template>
