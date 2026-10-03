<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Input } from "@edmi-vue/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@edmi-vue/ui/popover";
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Set limits</Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="w-80">
      <PopoverHeader>
        <PopoverTitle>Rebalance limits</PopoverTitle>
        <PopoverDescription>Applied to the next keeper run.</PopoverDescription>
      </PopoverHeader>
      <div class="grid grid-cols-[1fr_120px] items-center gap-2 text-[13px]">
        <span>Drift</span>
        <Input default-value="5%" />
        <span>Max slippage</span>
        <Input default-value="1%" />
      </div>
    </PopoverContent>
  </Popover>
</template>
