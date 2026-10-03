<script setup lang="ts">
import { Checkbox } from "@edmi-vue/ui/checkbox";
import { Label } from "@edmi-vue/ui/label";
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <Label>Index name</Label>
    <Label>
      Ticker <span class="text-destructive-text">*</span>
    </Label>
    <Label class="items-baseline">
      Description
      <span class="font-normal text-muted-foreground">(optional)</span>
    </Label>
    <div class="flex items-center gap-2">
      <Checkbox id="keeper" default-value="true" />
      <Label for="keeper">Allow keeper</Label>
    </div>
  </div>
</template>
