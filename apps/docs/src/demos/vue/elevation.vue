<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@edmi-vue/ui/card";
import { ElevationProvider, useElevation } from "@edmi-vue/ui/elevation";
import { Input } from "@edmi-vue/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@edmi-vue/ui/popover";
import { defineComponent, h } from "vue";

// What each role resolves to inside the scope (the same call every component makes).
const Resolved = defineComponent(() => {
  const field = useElevation(() => undefined, "field");
  const button = useElevation(() => undefined, "button-filled");
  const surface = useElevation(() => undefined, "surface");
  const overlay = useElevation(() => undefined, "overlay");
  return () =>
    h(
      "p",
      { class: "font-mono text-[11.5px] text-muted-foreground" },
      `field ${field.value} · button ${button.value} · surface ${surface.value} · overlay ${overlay.value}`,
    );
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap gap-8">
      <div v-for="scope in [{ title: 'Flat (default)', mode: undefined }, { title: 'mode=&quot;layered&quot;', mode: 'layered' as const }]" :key="scope.title" class="flex flex-col gap-3">
        <div class="text-xs font-semibold text-muted-foreground">{{ scope.title }}</div>
        <ElevationProvider :mode="scope.mode">
          <Card class="w-72">
            <CardHeader>
              <CardTitle>Rebalance limits</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-3">
              <Input default-value="5%" />
              <div class="flex gap-2">
                <Button>Save</Button>
                <Popover>
                  <PopoverTrigger as-child>
                    <Button variant="outline">More</Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-48 text-[13px]">Applied to the next keeper run.</PopoverContent>
                </Popover>
              </div>
              <Resolved />
            </CardContent>
          </Card>
        </ElevationProvider>
      </div>
      <div class="flex flex-col gap-3">
        <div class="text-xs font-semibold text-muted-foreground">level="raised" (forced)</div>
        <ElevationProvider level="raised">
          <Resolved />
        </ElevationProvider>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex h-12 w-24 items-center justify-center rounded-lg border border-border bg-card text-xs">flat</div>
      <div class="flex h-12 w-24 items-center justify-center rounded-lg border border-transparent bg-card text-xs shadow-raised">shadow-raised</div>
      <div class="flex h-12 w-24 items-center justify-center rounded-lg border border-transparent bg-card text-xs shadow-floating">shadow-floating</div>
      <div class="flex h-12 w-24 items-center justify-center rounded-lg border border-sk-bd bg-sk-bg text-xs shadow-sunken">shadow-sunken</div>
    </div>
  </div>
</template>
