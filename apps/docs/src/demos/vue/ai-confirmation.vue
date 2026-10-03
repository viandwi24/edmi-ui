<script setup lang="ts">
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationDescription,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from "@edmi-vue/components/ai/confirmation";
import { CheckIcon, XIcon } from "@lucide/vue";

const rows = [
  { state: "approval-requested", approval: { id: "1" } },
  { state: "approval-responded", approval: { id: "2", approved: true } },
  { state: "output-denied", approval: { id: "3", approved: false } },
] as const;
</script>

<template>
  <div class="flex flex-col gap-4">
    <Confirmation
      v-for="row in rows"
      :key="row.approval.id"
      :approval="row.approval"
      :state="row.state"
      class="w-full max-w-md"
    >
      <ConfirmationTitle>
        <ConfirmationRequest>Run rebalance on MAG4?</ConfirmationRequest>
        <ConfirmationAccepted>
          <CheckIcon class="size-4" />
          <span>Approved · rebalance sent</span>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <XIcon class="size-4" />
          <span>Rejected · nothing was changed</span>
        </ConfirmationRejected>
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
</template>
