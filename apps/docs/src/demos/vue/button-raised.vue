<script setup lang="ts">
import { ArrowRight } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";

const variants = ["default", "secondary", "outline", "destructive", "brand"] as const;
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <Button v-for="v in variants" :key="v" :variant="v">{{ v }}</Button>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <Button v-for="v in variants" :key="v" :variant="v" raised>{{ v }}</Button>
      <Button variant="ghost" raised>ghost (never raised)</Button>
      <Button raised size="lg">
        Continue
        <ArrowRight data-icon="inline-end" />
      </Button>
    </div>
  </div>
</template>
