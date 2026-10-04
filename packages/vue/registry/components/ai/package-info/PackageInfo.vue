<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { PackageChangeType } from "./context"
import { computed, provide, useSlots } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { PackageInfoKey } from "./context"
import PackageInfoChangeType from "./PackageInfoChangeType.vue"
import PackageInfoHeader from "./PackageInfoHeader.vue"
import PackageInfoName from "./PackageInfoName.vue"
import PackageInfoVersion from "./PackageInfoVersion.vue"

const props = defineProps<{
  name: string
  currentVersion?: string
  newVersion?: string
  changeType?: PackageChangeType
  class?: HTMLAttributes["class"]
}>()

provide(PackageInfoKey, {
  name: computed(() => props.name),
  currentVersion: computed(() => props.currentVersion),
  newVersion: computed(() => props.newVersion),
  changeType: computed(() => props.changeType),
})

const slots = useSlots()
</script>

<template>
  <div
    data-slot="ai-package-info"
    :class="cn('rounded-xl border border-border bg-card px-4 py-3.5 text-card-foreground', props.class)"
  >
    <slot v-if="slots.default" />
    <PackageInfoHeader v-else>
      <PackageInfoName />
      <PackageInfoChangeType v-if="props.changeType" />
      <PackageInfoVersion />
    </PackageInfoHeader>
  </div>
</template>
