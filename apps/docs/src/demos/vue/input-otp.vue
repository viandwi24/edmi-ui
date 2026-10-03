<script setup lang="ts">
import { REGEXP_ONLY_DIGITS } from "vue-input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@edmi-vue/ui/input-otp";
</script>

<template>
  <InputOTP :maxlength="6" :pattern="REGEXP_ONLY_DIGITS">
    <template #default="{ slots }">
      <InputOTPGroup>
        <InputOTPSlot v-for="(_, i) in slots.slice(0, 3)" :key="i" :index="i" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot v-for="(_, i) in slots.slice(3)" :key="i + 3" :index="i + 3" />
      </InputOTPGroup>
    </template>
  </InputOTP>
</template>
