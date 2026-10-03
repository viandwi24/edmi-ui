<script setup lang="ts">
import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableName,
  EnvironmentVariableRequired,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariableValue,
} from "@edmi-vue/components/ai/environment-variables";

const vars = [
  { name: "SOLANA_RPC_URL", value: "https://api.devnet.solana.com", required: true },
  { name: "JUPITER_API_KEY", value: "jup_live_7Hc2…", required: true },
  { name: "KEEPER_MAX_SLIPPAGE", value: "0.01", required: false },
];
</script>

<template>
  <EnvironmentVariables class="max-w-lg">
    <EnvironmentVariablesHeader>
      <EnvironmentVariablesTitle />
      <EnvironmentVariablesToggle />
    </EnvironmentVariablesHeader>
    <EnvironmentVariablesContent>
      <EnvironmentVariable v-for="v in vars" :key="v.name" :name="v.name" :value="v.value">
        <EnvironmentVariableName />
        <EnvironmentVariableRequired v-if="v.required" />
        <EnvironmentVariableValue />
        <EnvironmentVariableCopyButton copy-format="value" />
      </EnvironmentVariable>
    </EnvironmentVariablesContent>
  </EnvironmentVariables>
</template>
