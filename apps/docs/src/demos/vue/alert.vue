<script setup lang="ts">
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@edmi-vue/ui/alert";
import { Button } from "@edmi-vue/ui/button";

const info = "M12 8h.01M11 12h1v4h1M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0";
const check = "m8 12 3 3 5-6M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0";
const warn =
  "M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0";
</script>

<template>
  <div class="grid w-full max-w-xl gap-3">
    <Alert>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="info" /></svg>
      <AlertTitle>Devnet only</AlertTitle>
      <AlertDescription>Prices come from a mock oracle. Nothing here is real money.</AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="warn" /></svg>
      <AlertTitle>Transaction failed</AlertTitle>
      <AlertDescription>Slippage was above 1%. Try a smaller order.</AlertDescription>
    </Alert>
    <Alert variant="success">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="check" /></svg>
      <AlertTitle>Index launched</AlertTitle>
      <AlertDescription>MAG4 is live and accepting joins.</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">View</Button>
      </AlertAction>
    </Alert>
    <Alert variant="brand">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="info" /></svg>
      <AlertTitle>Autopilot is on</AlertTitle>
      <AlertDescription>Rebalances run automatically with the theme accent.</AlertDescription>
    </Alert>
    <Alert variant="info">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="info" /></svg>
      <AlertTitle>Oracle updated</AlertTitle>
      <AlertDescription>Prices refresh every 15 seconds.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="warn" /></svg>
      <AlertTitle>Drift is 6.2%</AlertTitle>
      <AlertDescription>Above the 5% limit. The keeper will rebalance at the next run.</AlertDescription>
    </Alert>
  </div>
</template>
