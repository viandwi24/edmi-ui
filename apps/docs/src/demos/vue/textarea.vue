<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Textarea } from "@edmi-vue/ui/textarea";
</script>

<template>
  <div class="grid w-full max-w-sm gap-3">
    <Textarea placeholder="Why this basket? Write the thesis in a few lines." />
    <Textarea disabled placeholder="Mandate is locked after launch." />
    <Textarea aria-invalid="true" placeholder="Invalid" />
    <div class="grid gap-2">
      <Textarea placeholder="Message the agent..." />
      <Button class="justify-self-end" size="sm">Send</Button>
    </div>
  </div>
</template>
