<script setup lang="ts">
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from "@edmi-vue/ui/combobox";

const tokens = ["NVDAx", "MSFTx", "AAPLx", "TSLAx", "AMZNx", "METAx"];
</script>

<template>
  <Combobox>
    <ComboboxInput placeholder="Select a token" show-clear class="w-64" />
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
