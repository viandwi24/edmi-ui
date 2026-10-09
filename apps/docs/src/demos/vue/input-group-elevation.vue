<script setup lang="ts">
import { CopyIcon, SearchIcon } from "@lucide/vue";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@edmi-vue/ui/input-group";

const levels = [
  { value: "flat", label: "Flat (0)" },
  { value: "raised", label: "Raised (+1)" },
  { value: "floating", label: "Floating (+2)" },
  { value: "sunken", label: "Sunken (-1)" },
] as const;
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-6">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <InputGroup :elevation="level.value">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search indexes" />
        </InputGroup>
        <InputGroup :elevation="level.value">
          <InputGroupInput default-value="1,000.00" class="font-mono tabular-nums" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USDC</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup :elevation="level.value">
          <InputGroupInput default-value="7xKXtg2C…Qp3h" readonly class="font-mono text-[13px]" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Copy">
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  </div>
</template>
