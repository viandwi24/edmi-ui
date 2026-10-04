<script setup lang="ts">
import { REGEXP_ONLY_DIGITS } from "vue-input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@edmi-vue/ui/input-otp";

const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }];
</script>

<template>
  <div class="flex flex-col gap-5">
    <div v-for="level in levels" :key="level.value" class="flex flex-col gap-2">
      <p class="text-xs font-medium text-muted-foreground">{{ level.label }}</p>
      <InputOTP :maxlength="4" :pattern="REGEXP_ONLY_DIGITS" :elevation="level.value">
        <template #default="{ slots }">
          <InputOTPGroup>
            <InputOTPSlot v-for="(_, i) in slots" :key="i" :index="i" />
          </InputOTPGroup>
        </template>
      </InputOTP>
    </div>
  </div>
</template>
