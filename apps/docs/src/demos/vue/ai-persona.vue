<script setup lang="ts">
import { Persona, type PersonaState } from "@edmi-vue/components/ai/persona";
import { ref } from "vue";

const states: PersonaState[] = ["idle", "listening", "thinking", "speaking", "asleep"];
const state = ref<PersonaState>("idle");
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <Persona class="size-24" :state="state" variant="obsidian" />
    <div class="flex flex-wrap justify-center gap-1.5">
      <button
        v-for="s in states"
        :key="s"
        type="button"
        class="rounded-md border border-border px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
        :data-active="state === s"
        @click="state = s"
      >
        {{ s }}
      </button>
    </div>
    <p class="max-w-sm text-center text-xs text-muted-foreground">
      Rive artwork loads from the network. Variants: obsidian, mana, opal, halo, glint, command.
    </p>
  </div>
</template>
