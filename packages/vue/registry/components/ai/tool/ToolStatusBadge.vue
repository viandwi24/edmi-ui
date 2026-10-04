<script setup lang="ts">
import type { DynamicToolUIPart, ToolUIPart } from "ai"
import type { Component } from "vue"
import {
  CheckIcon,
  CircleCheckIcon,
  CircleIcon,
  ClockIcon,
  OctagonXIcon,
  ShieldIcon,
  XIcon,
} from "@lucide/vue"
import { computed } from "vue"
import { Badge } from "@/registry/edmi/ui/badge"

type ToolPart = ToolUIPart | DynamicToolUIPart
type State = ToolPart["state"]

const props = defineProps<{
  state: State
}>()

const labels: Record<State, string> = {
  "approval-requested": "Awaiting approval",
  "approval-responded": "Responded",
  "input-available": "Running",
  "input-streaming": "Pending",
  "output-available": "Completed",
  "output-denied": "Denied",
  "output-error": "Error",
}

const variants: Record<State, "secondary" | "info" | "warning" | "success" | "outline" | "destructive"> = {
  "approval-requested": "warning",
  "approval-responded": "secondary",
  "input-available": "info",
  "input-streaming": "secondary",
  "output-available": "success",
  "output-denied": "outline",
  "output-error": "destructive",
}

const icons: Record<State, Component> = {
  "approval-requested": ShieldIcon,
  "approval-responded": CheckIcon,
  "input-available": ClockIcon,
  "input-streaming": CircleIcon,
  "output-available": CircleCheckIcon,
  "output-denied": XIcon,
  "output-error": OctagonXIcon,
}

const icon = computed(() => icons[props.state])
</script>

<template>
  <Badge data-slot="ai-tool-status" shape="pill" class="gap-1" :variant="variants[state]">
    <component :is="icon" :class="state === 'input-available' && 'animate-pulse'" />
    {{ labels[state] }}
  </Badge>
</template>
