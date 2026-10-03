<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { ToolUIPart } from "ai"
import type { BadgeVariants } from "@/registry/edmi/ui/badge"
import { CircleCheckIcon, ClockIcon } from "@lucide/vue"
import { Badge } from "@/registry/edmi/ui/badge"

type SandboxState = ToolUIPart["state"]

const props = defineProps<{
  state: SandboxState
}>()

const labels: Record<SandboxState, string> = {
  "approval-requested": "Awaiting Approval",
  "approval-responded": "Responded",
  "input-available": "Running",
  "input-streaming": "Pending",
  "output-available": "Completed",
  "output-denied": "Denied",
  "output-error": "Error",
}

const variants: Record<SandboxState, BadgeVariants["variant"]> = {
  "approval-requested": "warning",
  "approval-responded": "info",
  "input-available": "info",
  "input-streaming": "secondary",
  "output-available": "success",
  "output-denied": "warning",
  "output-error": "destructive",
}
</script>

<template>
  <Badge shape="pill" :variant="variants[props.state]">
    <svg
      v-if="props.state === 'input-streaming'"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.7"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
    <svg
      v-else-if="props.state === 'output-denied' || props.state === 'output-error'"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.7"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </svg>
    <ClockIcon v-else-if="props.state === 'input-available' || props.state === 'approval-requested'" />
    <CircleCheckIcon v-else />
    {{ labels[props.state] }}
  </Badge>
</template>
