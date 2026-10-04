<script setup lang="ts">
import { ClockIcon, GlobeIcon } from "@lucide/vue";
import {
  SessionFile,
  SessionOutputPreview,
  SessionOutputTitle,
  SessionPanel,
  SessionPanelDivider,
  SessionProgress,
  SessionSection,
  SessionSource,
} from "@edmi-vue/components/ai/session-panel";
import { Button } from "@edmi-vue/ui/button";
import { ref } from "vue";

const open = ref(true);

const favicons = [
  { label: "Jupiter", color: "#e5484d" },
  { label: "Coinglass", color: "#3b6fd6" },
  { label: "Orca", color: "#111111" },
];
</script>

<template>
  <Button v-if="!open" size="sm" variant="outline" @click="open = true">Show session</Button>
  <SessionPanel v-else>
    <SessionProgress :value="60" @close="open = false">
      Reading the keeper config, then drafting the report.
    </SessionProgress>
    <SessionPanelDivider />
    <SessionSection title="Outputs">
      <SessionOutputPreview class="bg-[#14213d] px-5 py-[18px]">
        <div class="font-mono text-[7px] tracking-[1px] text-[#e39a3c]">
          RESEARCH · OCT 2026
        </div>
        <div class="mt-9 font-serif text-[17px] leading-[1.2] font-bold text-white">
          MAG4 rebalance, three trades
        </div>
      </SessionOutputPreview>
      <SessionOutputTitle meta="Artifact">Rebalance report</SessionOutputTitle>
      <div class="mt-1">
        <SessionFile name="Rebalance report" format="PDF" />
        <SessionFile name="Rebalance report" format="MD" kind="code" />
      </div>
    </SessionSection>
    <SessionPanelDivider />
    <SessionSection title="Used in this session">
      <SessionSource label="Web search" :favicons="favicons" :more="4">
        <template #icon>
          <GlobeIcon />
        </template>
      </SessionSource>
      <SessionSource label="Memory">
        <template #icon>
          <ClockIcon />
        </template>
        Read · Keeper, MAG4, fees
      </SessionSource>
    </SessionSection>
  </SessionPanel>
</template>
