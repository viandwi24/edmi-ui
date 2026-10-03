<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@edmi-vue/ui/button-group";
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <ButtonGroup>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <Button variant="outline">Snooze</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button>Join</Button>
      <ButtonGroupSeparator />
      <Button size="icon" aria-label="More">
        <ChevronDown />
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <ButtonGroupText>Amount</ButtonGroupText>
      <ButtonGroupText>1,000 USDC</ButtonGroupText>
    </ButtonGroup>
    <ButtonGroup orientation="vertical">
      <Button variant="outline" size="icon">+</Button>
      <Button variant="outline" size="icon">-</Button>
    </ButtonGroup>
  </div>
</template>
