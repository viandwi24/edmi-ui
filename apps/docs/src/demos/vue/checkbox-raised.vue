<script setup lang="ts">
import { Checkbox } from "@edmi-vue/ui/checkbox";
import { ref } from "vue";

const some = ref<boolean | "indeterminate">("indeterminate");
</script>

<template>
  <div class="flex flex-col gap-3 text-sm">
    <label class="flex items-center gap-2.5"><Checkbox :default-value="true" /> Flat</label>
    <label class="flex items-center gap-2.5"><Checkbox raised :default-value="true" /> Raised</label>
    <label class="flex items-center gap-2.5"><Checkbox v-model="some" raised /> Raised, indeterminate</label>
  </div>
</template>
