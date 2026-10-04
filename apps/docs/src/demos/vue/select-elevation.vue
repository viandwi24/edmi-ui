<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@edmi-vue/ui/select";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <Select default-value="nvdax">
        <SelectTrigger :elevation="level.value" class="w-48"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="nvdax">NVDAx</SelectItem>
          <SelectItem value="msftx">MSFTx</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
