<script setup lang="ts">
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@edmi-vue/ui/field";
import { Input } from "@edmi-vue/ui/input";
import { Switch } from "@edmi-vue/ui/switch";
</script>

<template>
  <FieldSet class="w-full max-w-sm">
    <FieldLegend>Mandate</FieldLegend>
    <FieldDescription>Rules the keeper follows after launch.</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel for="field-name">Index name</FieldLabel>
        <Input id="field-name" default-value="Magnificent Four" />
      </Field>
      <Field data-invalid="true">
        <FieldLabel for="field-ticker">Ticker</FieldLabel>
        <Input id="field-ticker" aria-invalid="true" default-value="MAG" />
        <FieldError>Use 2-6 capital letters.</FieldError>
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Allow keeper</FieldTitle>
          <FieldDescription>
            Rebalance automatically when drift passes the limit.
          </FieldDescription>
        </FieldContent>
        <Switch default-value="true" />
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
