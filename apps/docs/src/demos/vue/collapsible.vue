<script setup lang="ts">
import { ChevronsUpDown } from "@lucide/vue";
import { ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@edmi-vue/ui/collapsible";

const open = ref(false);
const rows = ["NVDAx · 32%", "MSFTx · 28%", "AAPLx · 24%", "ANTHRP-pre · 16%"];
</script>

<template>
  <Collapsible
    v-model:open="open"
    class="w-[320px] rounded-xl border border-border bg-card p-3"
  >
    <div class="flex items-center justify-between">
      <span class="px-1 text-sm font-medium">3 tokens hidden</span>
      <CollapsibleTrigger as-child>
        <Button variant="ghost" size="icon-xs" aria-label="Toggle">
          <ChevronsUpDown />
        </Button>
      </CollapsibleTrigger>
    </div>
    <div class="mt-2 rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]">
      {{ rows[0] }}
    </div>
    <CollapsibleContent class="mt-2 flex flex-col gap-2">
      <div
        v-for="r in rows.slice(1)"
        :key="r"
        class="rounded-md border border-border bg-muted px-3 py-2 font-mono text-[13px]"
      >
        {{ r }}
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
