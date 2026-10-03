<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@edmi-vue/ui/accordion";
</script>

<template>
  <Accordion type="multiple" :default-value="['a', 'c']" variant="card" class="max-w-md">
    <AccordionItem value="a">
      <AccordionTrigger>3.1 Vault incorporation</AccordionTrigger>
      <AccordionContent>How the vault entity is formed.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="b">
      <AccordionTrigger>3.2 Index analytics</AccordionTrigger>
      <AccordionContent>Performance and weight history.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="c">
      <AccordionTrigger>3.3 Holder support</AccordionTrigger>
      <AccordionContent>
        Answer holder questions with the agent, using the same mandate context.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
