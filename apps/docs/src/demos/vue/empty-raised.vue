<script setup lang="ts">
import { Building2Icon } from "@lucide/vue";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@edmi-vue/ui/empty";
</script>

<template>
  <div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><Building2Icon /></EmptyMedia>
        <EmptyTitle>Flat</EmptyTitle>
        <EmptyDescription>Default icon tile.</EmptyDescription>
      </EmptyHeader>
    </Empty>
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" raised><Building2Icon /></EmptyMedia>
        <EmptyTitle>Raised</EmptyTitle>
        <EmptyDescription>Icon tile with a lip.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
</template>
