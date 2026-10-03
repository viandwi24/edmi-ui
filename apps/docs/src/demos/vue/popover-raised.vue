<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@edmi-vue/ui/popover";
</script>

<template>
  <div class="flex gap-3">
    <Popover>
      <PopoverTrigger as-child><Button variant="outline">Flat</Button></PopoverTrigger>
      <PopoverContent class="text-[13px]">Default popover.</PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger as-child><Button variant="outline" raised>Raised</Button></PopoverTrigger>
      <PopoverContent raised class="text-[13px]">Popover with a hard lip.</PopoverContent>
    </Popover>
  </div>
</template>
