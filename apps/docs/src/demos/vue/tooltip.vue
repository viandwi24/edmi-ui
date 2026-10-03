<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@edmi-vue/ui/tooltip";

const sides = ["top", "right", "bottom", "left"] as const;
</script>

<template>
  <TooltipProvider>
    <div class="flex gap-2">
      <Tooltip v-for="side in sides" :key="side">
        <TooltipTrigger as-child>
          <Button variant="outline" size="sm">{{ side }}</Button>
        </TooltipTrigger>
        <TooltipContent :side="side">Copy address</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
