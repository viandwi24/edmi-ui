<script setup lang="ts">
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@edmi-vue/components/ai/checkpoint";
import { RotateCwIcon } from "@lucide/vue";
</script>

<template>
  <Checkpoint class="w-full max-w-xl" time="14:02">
    <CheckpointIcon />
    <CheckpointTrigger tooltip="Restore the conversation and the agent's changes to this point">
      <RotateCwIcon class="-scale-x-100" />
      Restore checkpoint
    </CheckpointTrigger>
  </Checkpoint>
</template>
