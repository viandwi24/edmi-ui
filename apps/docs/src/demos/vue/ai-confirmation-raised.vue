<script setup lang="ts">
import {
  Confirmation,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationDescription,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@edmi-vue/components/ai/confirmation";

const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <Confirmation :elevation="level.value" :approval="{ id: '1' }" state="approval-requested" class="max-w-md">
      	<ConfirmationTitle>
      		<ConfirmationRequest>Run rebalance on MAG4?</ConfirmationRequest>
      	</ConfirmationTitle>
      	<ConfirmationDescription>
      		Sells 0.42 NVDAx and buys MSFTx + AAPLx. Max slippage 1%.
      	</ConfirmationDescription>
      	<ConfirmationActions>
      		<ConfirmationAction>Approve</ConfirmationAction>
      		<ConfirmationAction variant="outline">Reject</ConfirmationAction>
      	</ConfirmationActions>
      </Confirmation>
    </div>
  </div>
</template>
