<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@edmi-vue/ui/select";
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <Select default-value="nvdax">
      <SelectTrigger class="w-48"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectItem value="nvdax">NVDAx</SelectItem>
        <SelectItem value="msftx">MSFTx</SelectItem>
      </SelectContent>
    </Select>
    <Select default-value="nvdax">
      <SelectTrigger raised class="w-48"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectItem value="nvdax">NVDAx</SelectItem>
        <SelectItem value="msftx">MSFTx</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
