<script setup lang="ts">
import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentOutput,
  AgentTool,
  AgentTools,
} from "@edmi-vue/components/ai/agent";

const getPrices = {
  description: "Quotes for tokens",
  inputSchema: "{ symbols: string[] }",
};
const rebalance = {
  description: "Send one rebalance tx",
  inputSchema: `{ "index": string, "maxSlippage"?: number }`,
};
const postFeed = {
  description: "Write a feed post",
  inputSchema: "{ text: string }",
};

const outputSchema = `{ status: "ok" | "skipped"; tx?: string }`;
</script>

<template>
  <Agent class="max-w-lg">
    <AgentHeader name="Keeper agent" model="claude-opus" />
    <AgentContent>
      <AgentInstructions>
        Keep every index within its drift limit. Never trade without approval when the order is above <b>$500</b>.
      </AgentInstructions>
      <AgentTools default-value="rebalance">
        <AgentTool name="get_prices" :tool="getPrices" value="get_prices" />
        <AgentTool name="rebalance" :tool="rebalance" value="rebalance" />
        <AgentTool name="post_feed" :tool="postFeed" value="post_feed" />
      </AgentTools>
      <AgentOutput :schema="outputSchema" />
    </AgentContent>
  </Agent>
</template>
