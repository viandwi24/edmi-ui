<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Toaster, toast } from "@edmi-vue/ui/sonner";
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Toaster raised />
    <Button variant="outline" raised @click="toast('Copied to clipboard')">Default</Button>
    <Button
      variant="outline"
      raised
      @click="toast.success('Joined MAG4', { description: '98,209 shares - tx 4f9a...c21' })"
    >
      Success
    </Button>
  </div>
</template>
