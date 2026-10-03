<script setup lang="ts">
import { ref } from "vue";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from "@edmi-vue/ui/combobox";

const tokens = ["NVDAx", "MSFTx", "AAPLx", "TSLAx", "AMZNx", "METAx"];
const selected = ref<string[]>(["NVDAx", "MSFTx"]);

function remove(token: string) {
  selected.value = selected.value.filter((v) => v !== token);
}
</script>

<template>
  <Combobox v-model="selected" multiple>
    <ComboboxChips class="w-72">
      <ComboboxChip v-for="token in selected" :key="token" @remove="remove(token)">
        {{ token }}
      </ComboboxChip>
      <ComboboxChipsInput placeholder="Add token" />
    </ComboboxChips>
    <ComboboxList>
      <ComboboxEmpty>No tokens found.</ComboboxEmpty>
      <ComboboxViewport>
        <ComboboxItem v-for="token in tokens" :key="token" :value="token">
          {{ token }}
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
