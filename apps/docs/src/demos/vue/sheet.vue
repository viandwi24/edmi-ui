<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@edmi-vue/ui/sheet";
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">Filters</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Filters</SheetTitle>
        <SheetDescription>Narrow the index list.</SheetDescription>
      </SheetHeader>
      <div class="grid gap-2 px-[22px] text-[13px]">
        <label class="flex items-center gap-2" for="sheet-xstocks">
          <input id="sheet-xstocks" type="checkbox" checked />
          xStocks
        </label>
        <label class="flex items-center gap-2" for="sheet-ipo">
          <input id="sheet-ipo" type="checkbox" checked />
          Pre-IPO
        </label>
      </div>
      <SheetFooter>
        <Button>Apply</Button>
        <SheetClose as-child>
          <Button variant="outline">Reset</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
