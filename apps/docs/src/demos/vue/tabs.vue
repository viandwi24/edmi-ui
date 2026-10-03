<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
</script>

<template>
  <Tabs default-value="overview" class="w-[420px]">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="holdings">Holdings</TabsTrigger>
      <TabsTrigger value="activity">Activity</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      NAV 59.9998. 4 tokens, 412 holders, rebalanced 2 days ago.
    </TabsContent>
    <TabsContent value="holdings">Four tokens, weighted by AUM.</TabsContent>
    <TabsContent value="activity">No recent trades.</TabsContent>
  </Tabs>
</template>
