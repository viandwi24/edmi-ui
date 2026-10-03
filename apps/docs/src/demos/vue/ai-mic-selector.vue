<script setup lang="ts">
import { AudioLinesIcon } from "@lucide/vue";
import {
  MicSelector,
  MicSelectorContent,
  MicSelectorEmpty,
  MicSelectorInput,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorList,
  MicSelectorTrigger,
  MicSelectorValue,
} from "@edmi-vue/components/ai/mic-selector";
import { ref } from "vue";

// Fake devices so the demo needs no microphone permission. Without `devices`, the component lists the real inputs.
const device = (deviceId: string, label: string) =>
  ({ deviceId, groupId: deviceId, kind: "audioinput", label, toJSON: () => ({}) }) as MediaDeviceInfo;

const devices = [
  device("builtin", "MacBook Pro Microphone (05ac:8104)"),
  device("airpods", "AirPods Pro (1a2b:3c4d)"),
  device("shure", "Shure MV7 (14ed:1012)"),
];

const value = ref<string | undefined>("builtin");
</script>

<template>
  <MicSelector v-model:value="value" :devices="devices">
    <MicSelectorTrigger class="w-[260px]">
      <AudioLinesIcon class="size-4 shrink-0" />
      <MicSelectorValue />
    </MicSelectorTrigger>
    <MicSelectorContent>
      <MicSelectorInput />
      <MicSelectorList v-slot="{ devices: items }">
        <MicSelectorEmpty />
        <MicSelectorItem v-for="d in items" :key="d.deviceId" :value="d.deviceId">
          <AudioLinesIcon />
          <MicSelectorLabel :device="d" />
        </MicSelectorItem>
      </MicSelectorList>
    </MicSelectorContent>
  </MicSelector>
</template>
