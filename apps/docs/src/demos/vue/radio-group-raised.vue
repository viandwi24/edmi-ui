<script setup lang="ts">
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@edmi-vue/ui/field";
import { RadioGroup, RadioGroupItem } from "@edmi-vue/ui/radio-group";

const options = [
  { value: "weekly", title: "Weekly", description: "Rebalance every Monday." },
  { value: "drift", title: "On drift", description: "Only when a weight drifts." },
];
</script>

<template>
  <div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
    <RadioGroup default-value="weekly">
      <FieldLabel v-for="o in options" :key="o.value" :for="`flat-${o.value}`">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{{ o.title }}</FieldTitle>
            <FieldDescription>{{ o.description }}</FieldDescription>
          </FieldContent>
          <RadioGroupItem :id="`flat-${o.value}`" :value="o.value" />
        </Field>
      </FieldLabel>
    </RadioGroup>
    <RadioGroup default-value="weekly">
      <FieldLabel v-for="o in options" :key="o.value" raised :for="`raised-${o.value}`">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{{ o.title }}</FieldTitle>
            <FieldDescription>{{ o.description }}</FieldDescription>
          </FieldContent>
          <RadioGroupItem :id="`raised-${o.value}`" :value="o.value" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  </div>
</template>
