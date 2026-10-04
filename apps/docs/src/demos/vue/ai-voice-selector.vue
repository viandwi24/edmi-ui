<script setup lang="ts">
import { AudioLinesIcon, ChevronsUpDown } from "@lucide/vue";
import {
  VoiceSelector,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorContent,
  VoiceSelectorDescription,
  VoiceSelectorDetails,
  VoiceSelectorEmpty,
  VoiceSelectorGender,
  VoiceSelectorGroup,
  VoiceSelectorHeader,
  VoiceSelectorInput,
  VoiceSelectorItem,
  VoiceSelectorList,
  VoiceSelectorName,
  VoiceSelectorPreview,
  VoiceSelectorSeparator,
  VoiceSelectorTrigger,
} from "@edmi-vue/components/ai/voice-selector";
import { Button } from "@edmi-vue/ui/button";
import { computed, ref } from "vue";

const voices = [
  { id: "aria", name: "Aria", gender: "female", accent: "american", age: "young", description: "Warm, clear. Good for explainers.", group: "Recommended" },
  { id: "theo", name: "Theo", gender: "male", accent: "british", age: "middle-aged", description: "Calm and precise.", group: "Recommended" },
  { id: "priya", name: "Priya", gender: "female", accent: "indian", age: "young", description: "Bright and friendly.", group: "All voices" },
];
const groups = ["Recommended", "All voices"];

const value = ref<string | undefined>("aria");
const playing = ref<string>();
const current = computed(() => voices.find((v) => v.id === value.value));
</script>

<template>
  <VoiceSelector v-model:value="value">
    <VoiceSelectorTrigger as-child>
      <Button variant="outline">
        <AudioLinesIcon class="size-3.5" />
        {{ current?.name ?? "Select voice" }}
        <ChevronsUpDown class="size-3.5 text-muted-foreground" />
      </Button>
    </VoiceSelectorTrigger>
    <VoiceSelectorContent title="Choose a voice">
      <VoiceSelectorInput />
      <VoiceSelectorList>
        <VoiceSelectorEmpty>No voices found.</VoiceSelectorEmpty>
        <div v-for="(group, i) in groups" :key="group">
          <VoiceSelectorSeparator v-if="i > 0" />
          <VoiceSelectorGroup :heading="group">
            <VoiceSelectorItem v-for="v in voices.filter((x) => x.group === group)" :key="v.id" :value="v.id" :keywords="[v.name, v.gender, v.accent]">
              <VoiceSelectorPreview
                :playing="playing === v.id"
                @play="playing = playing === v.id ? undefined : v.id"
              />
              <VoiceSelectorDetails>
                <VoiceSelectorHeader>
                  <VoiceSelectorName>{{ v.name }}</VoiceSelectorName>
                  <VoiceSelectorAttributes>
                    <VoiceSelectorGender :value="v.gender" />
                    <VoiceSelectorBullet />
                    <VoiceSelectorAccent :value="v.accent" />
                    <VoiceSelectorBullet />
                    <VoiceSelectorAge>{{ v.age }}</VoiceSelectorAge>
                  </VoiceSelectorAttributes>
                </VoiceSelectorHeader>
                <VoiceSelectorDescription>{{ v.description }}</VoiceSelectorDescription>
              </VoiceSelectorDetails>
            </VoiceSelectorItem>
          </VoiceSelectorGroup>
        </div>
      </VoiceSelectorList>
    </VoiceSelectorContent>
  </VoiceSelector>
</template>
