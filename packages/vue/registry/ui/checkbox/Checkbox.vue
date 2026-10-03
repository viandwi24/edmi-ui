<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Check, Minus } from "@lucide/vue"
import { reactiveOmit } from "@vueuse/core"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/registry/edmi/lib/utils"

// Flat by default: checked = solid primary. `raised` ✦ adds the gradient + top highlight.
// Indeterminate uses the same fill.
const props = withDefaults(defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"], raised?: boolean }>(), { raised: false })
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "raised")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="
      cn(
        'peer relative flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-input bg-card text-primary-foreground shadow-sunk transition-[box-shadow] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error group-has-disabled/field:opacity-50',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
        props.raised && 'data-[state=checked]:border-primary-edge data-[state=checked]:bg-linear-to-b data-[state=checked]:from-primary-hi data-[state=checked]:to-primary data-[state=checked]:shadow-[inset_0_1px_0_var(--primary-inset)] data-[state=checked]:[background-origin:border-box] data-[state=indeterminate]:border-primary-edge data-[state=indeterminate]:bg-linear-to-b data-[state=indeterminate]:from-primary-hi data-[state=indeterminate]:to-primary data-[state=indeterminate]:shadow-[inset_0_1px_0_var(--primary-inset)] data-[state=indeterminate]:[background-origin:border-box] data-[state=checked]:focus-visible:shadow-[inset_0_1px_0_var(--primary-inset),0_0_0_3px_var(--ring-soft)] data-[state=indeterminate]:focus-visible:shadow-[inset_0_1px_0_var(--primary-inset),0_0_0_3px_var(--ring-soft)]',
        props.class,
      )
    "
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none"
    >
      <slot v-bind="slotProps">
        <Minus v-if="slotProps.state === 'indeterminate'" class="size-3.5" :stroke-width="3" />
        <Check v-else class="size-3.5" :stroke-width="3" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
