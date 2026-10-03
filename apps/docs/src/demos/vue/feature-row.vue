<script setup lang="ts">
import { FeatureRow } from "@edmi-vue/ui/feature-row";
</script>

<template>
  <div class="flex w-[420px] max-w-full flex-col gap-2">
    <FeatureRow index="1.1" title="Thesis and weights">
      Describe the thesis, pick up to 10 assets and set their weights.
    </FeatureRow>
    <FeatureRow index="1.2" title="Index identity" />
    <FeatureRow index="1.3" title="Vault deployment" />
  </div>
</template>
