<script setup lang="ts">
import type { ProviderKey } from "./providers"
import { ArrowUpRightIcon } from "@lucide/vue"
import { computed } from "vue"
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu"
import { useOpenInContext } from "./context"
import { providers } from "./providers"

const props = defineProps<{ provider: ProviderKey }>()

const context = useOpenInContext()
const provider = computed(() => providers[props.provider])
const href = computed(() => provider.value.createUrl(context.query))
const label = computed(() => provider.value.title.replace("Open in ", ""))
</script>

<template>
  <DropdownMenuItem v-bind="$attrs" as-child>
    <a :href="href" rel="noopener noreferrer" target="_blank">
      <span
        class="inline-flex size-[18px] shrink-0 items-center justify-center rounded-[5px] text-white [&_svg]:size-3"
        :style="{ background: provider.color }"
      >
        <component :is="provider.icon" />
      </span>
      <span class="flex-1">{{ label }}</span>
      <ArrowUpRightIcon class="size-[13px] shrink-0 text-muted-foreground" />
    </a>
  </DropdownMenuItem>
</template>
