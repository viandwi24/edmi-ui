<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
</script>

<template>
  <Tabs default-value="positions" class="w-[420px]">
    <TabsList variant="line">
      <TabsTrigger value="positions">Positions</TabsTrigger>
      <TabsTrigger value="created">Created</TabsTrigger>
      <TabsTrigger value="history">History</TabsTrigger>
    </TabsList>
    <TabsContent value="positions">Open positions.</TabsContent>
    <TabsContent value="created">Indexes you created.</TabsContent>
    <TabsContent value="history">Closed positions.</TabsContent>
  </Tabs>
</template>
