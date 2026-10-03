<script setup lang="ts">
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Spinner } from "@edmi-vue/ui/spinner";
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Spinner />
    <Spinner class="size-6" />
    <Button disabled variant="secondary">
      <Spinner />
      Deploying vault
    </Button>
    <Badge variant="brand">
      <Spinner />
      Rebalancing
    </Badge>
  </div>
</template>
