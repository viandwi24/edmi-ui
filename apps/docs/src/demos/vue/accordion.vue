<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@edmi-vue/ui/accordion";
</script>

<template>
  <Accordion type="single" collapsible default-value="index" class="max-w-md">
    <AccordionItem value="index">
      <AccordionTrigger>What is a tokenized index?</AccordionTrigger>
      <AccordionContent>
        A token that tracks a basket of xStocks. One join buys every token in
        the basket at its weight.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="rebalance">
      <AccordionTrigger>How is it rebalanced?</AccordionTrigger>
      <AccordionContent>Weekly, by the index agent.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="cost">
      <AccordionTrigger>What does it cost?</AccordionTrigger>
      <AccordionContent>A 0.4% annual management fee.</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
