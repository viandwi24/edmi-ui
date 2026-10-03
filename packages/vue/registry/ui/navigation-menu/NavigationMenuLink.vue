<script setup lang="ts">
import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  NavigationMenuLink,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"

const props = defineProps<NavigationMenuLinkProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<NavigationMenuLinkEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwarded"
    :class="cn(`flex items-center gap-2.5 rounded-lg p-2 text-[13.5px] transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring in-data-[slot=navigation-menu-content]:rounded-[7px] data-[active]:bg-accent data-[active]:text-accent-foreground [&_svg:not([class*=size-])]:size-4`, props.class)"
  >
    <slot />
  </NavigationMenuLink>
</template>
