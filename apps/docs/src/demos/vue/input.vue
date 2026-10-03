<script setup lang="ts">
import { Input } from "@edmi-vue/ui/input";
</script>

<template>
  <div class="grid w-full max-w-sm gap-3">
    <Input placeholder="Magnificent Four" />
    <Input default-value="MAG4" />
    <Input placeholder="Invalid" aria-invalid="true" default-value="mag 4" />
    <Input placeholder="Disabled" disabled />
    <Input type="file" />
  </div>
</template>
