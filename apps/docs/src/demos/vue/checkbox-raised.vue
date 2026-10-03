<script setup lang="ts">
import { Checkbox } from "@edmi-vue/ui/checkbox";
</script>

<template>
  <div class="flex flex-col gap-3 text-sm">
    <label class="flex items-center gap-2.5"><Checkbox :default-value="true" /> Flat</label>
    <label class="flex items-center gap-2.5"><Checkbox raised :default-value="true" /> Raised</label>
    <label class="flex items-center gap-2.5"><Checkbox raised default-value="indeterminate" /> Raised, indeterminate</label>
  </div>
</template>
