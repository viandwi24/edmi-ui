<script setup lang="ts">
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@edmi-vue/ui/native-select";
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <NativeSelect model-value="devnet" class="w-48">
      <NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
      <NativeSelectOption value="testnet">Solana testnet</NativeSelectOption>
      <NativeSelectOptGroup label="Production">
        <NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
    <NativeSelect disabled class="w-48">
      <NativeSelectOption>Mainnet</NativeSelectOption>
    </NativeSelect>
    <NativeSelect aria-invalid="true" size="sm" class="w-48">
      <NativeSelectOption value="">Required</NativeSelectOption>
    </NativeSelect>
  </div>
</template>
