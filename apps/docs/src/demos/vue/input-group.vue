<script setup lang="ts">
import { ArrowUpIcon, CopyIcon, SearchIcon } from "@lucide/vue";
import { Button } from "@edmi-vue/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@edmi-vue/ui/input-group";
</script>

<template>
  <div class="grid w-full max-w-sm gap-3">
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search indexes" />
    </InputGroup>
    <InputGroup>
      <InputGroupInput placeholder="1,000.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USDC</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput default-value="stockbreak.fun/mag4" />
    </InputGroup>
    <InputGroup>
      <InputGroupInput default-value="7xKXtg2CW87d97Qp3h" readonly />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copy">
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    <InputGroup>
      <InputGroupTextarea placeholder="Describe your thesis..." />
      <InputGroupAddon align="block-end">
        <InputGroupText>52%</InputGroupText>
        <Button size="icon-xs" class="ml-auto" aria-label="Send">
          <ArrowUpIcon />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
