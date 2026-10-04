<script setup lang="ts">
import { NativeSelect, NativeSelectOption } from "@edmi-vue/ui/native-select";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <NativeSelect model-value="devnet" :elevation="level.value" class="w-48">
        <NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
        <NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
      </NativeSelect>
    </div>
  </div>
</template>
