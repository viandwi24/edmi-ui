<script setup lang="ts">
import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from "@edmi-vue/components/ai/stack-trace";

const trace = `TypeError: Cannot read properties of undefined (reading 'price')
    at getDrift (lib/drift.ts:14:22)
    at run (lib/keeper.ts:8:17)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;
</script>

<template>
  <StackTrace class="max-w-xl" default-open :trace="trace" @file-path-click="() => {}">
    <StackTraceHeader>
      <StackTraceError>
        <StackTraceErrorType />
        <StackTraceErrorMessage />
      </StackTraceError>
      <StackTraceActions>
        <StackTraceCopyButton />
        <StackTraceExpandButton />
      </StackTraceActions>
    </StackTraceHeader>
    <StackTraceContent>
      <StackTraceFrames />
    </StackTraceContent>
  </StackTrace>
</template>
