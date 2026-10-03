<script setup lang="ts">
import { Building2Icon, UploadIcon } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@edmi-vue/ui/empty";
</script>

<template>
  <div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon"><Building2Icon /></EmptyMedia>
        <EmptyTitle>No positions yet</EmptyTitle>
        <EmptyDescription>Join an index and your holdings will show up here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Explore indexes</Button>
      </EmptyContent>
    </Empty>
    <Empty class="border-[1.5px] border-input">
      <EmptyHeader>
        <EmptyMedia variant="icon"><UploadIcon /></EmptyMedia>
        <EmptyTitle>Drop your weights file</EmptyTitle>
        <EmptyDescription>CSV with symbol and weight columns.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Choose file</Button>
      </EmptyContent>
    </Empty>
  </div>
</template>
