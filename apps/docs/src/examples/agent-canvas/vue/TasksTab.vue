<script setup lang="ts">
import { ref } from "vue";
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";
import { Checkbox } from "@edmi-vue/ui/checkbox";
import { suggested, type TaskRow } from "../data";
import Status from "./Status.vue";

const props = defineProps<{ tasks: TaskRow[] }>();
const label = "mt-5 mb-1 text-[13px] text-muted-foreground";
const picked = ref<string[]>([]);
const toggle = (id: string, on: boolean | "indeterminate") => {
  picked.value = on === true ? [...picked.value, id] : picked.value.filter((x) => x !== id);
};
const selectAll = (on: boolean | "indeterminate") => {
  picked.value = on === true ? props.tasks.map((t) => t.id) : [];
};
</script>

<template>
  <div class="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4">
    <h2 class="text-lg font-medium">Tasks</h2>
    <div class="mt-3 flex items-center gap-3 text-[13px] text-muted-foreground">
      <Checkbox
        aria-label="Select all"
        :model-value="picked.length === tasks.length ? true : picked.length > 0 ? 'indeterminate' : false"
        @update:model-value="selectAll"
      />
      Select all
    </div>
    <div :class="label">Tasks</div>
    <div class="flex flex-col">
      <div v-for="t in tasks" :key="t.id" class="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
        <Checkbox :aria-label="t.name" :model-value="picked.includes(t.id)" @update:model-value="toggle(t.id, $event)" />
        <Status :status="t.status" />
        <AgentAvatar :seed="t.agent" :color="t.color" :size="20" :tile="false" />
        <span class="text-[15px]">{{ t.name }}</span>
      </div>
    </div>
    <div :class="label">Suggested Next</div>
    <div class="flex flex-col">
      <div v-for="s in suggested" :key="s" class="flex items-center gap-3 py-2.5">
        <svg viewBox="0 0 16 16" class="size-3.5 text-muted-foreground" aria-hidden="true">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2.4" />
        </svg>
        <span class="text-[15px]">{{ s }}</span>
      </div>
    </div>
  </div>
</template>
