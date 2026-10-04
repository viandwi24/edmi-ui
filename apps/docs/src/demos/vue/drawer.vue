<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@edmi-vue/ui/drawer";
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">Join MAG4</Button>
    </DrawerTrigger>
    <DrawerContent show-handle>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Join MAG4</DrawerTitle>
          <DrawerDescription>Amount in USDC</DrawerDescription>
        </DrawerHeader>
        <p class="text-center font-mono text-4xl">1,000</p>
        <DrawerFooter class="flex-row">
          <DrawerClose as-child>
            <Button variant="outline" class="flex-1">Cancel</Button>
          </DrawerClose>
          <DrawerClose as-child>
            <Button class="flex-1">Join</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
