<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@edmi-vue/ui/card";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-start gap-5">
      <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
        <Card :elevation="level.value" size="sm" class="w-64">
          <CardHeader>
            <CardTitle>Join MAG4</CardTitle>
            <CardDescription>Magnificent Four, 4 tokens</CardDescription>
          </CardHeader>
          <CardContent class="font-mono text-sm">Amount 1,000 USDC</CardContent>
          <CardFooter>
            <Button size="sm">Join index</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">Nested: a card inside a raised card resolves flat</p>
      <Card elevation="raised" size="sm" class="w-80">
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Nested card</CardTitle>
              <CardDescription>Border only, no bevel on bevel.</CardDescription>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
