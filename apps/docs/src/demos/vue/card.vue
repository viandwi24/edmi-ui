<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@edmi-vue/ui/card";
</script>

<template>
  <div class="flex flex-wrap items-start gap-5">
    <Card class="w-80">
      <CardHeader>
        <CardTitle>Join MAG4</CardTitle>
        <CardDescription>Magnificent Four, 4 tokens</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent class="font-mono text-sm">Amount 1,000 USDC</CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">Cancel</Button>
        <Button size="sm">Join index</Button>
      </CardFooter>
    </Card>
    <Card size="sm" class="w-64">
      <CardHeader>
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>Weekly, Monday 09:00</CardDescription>
      </CardHeader>
    </Card>
  </div>
</template>
