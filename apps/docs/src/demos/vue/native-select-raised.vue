<script setup lang="ts">
import { NativeSelect, NativeSelectOption } from "@edmi-vue/ui/native-select";
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <NativeSelect model-value="devnet" class="w-48">
      <NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
      <NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
    </NativeSelect>
    <NativeSelect model-value="devnet" raised class="w-48">
      <NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
      <NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
    </NativeSelect>
  </div>
</template>
