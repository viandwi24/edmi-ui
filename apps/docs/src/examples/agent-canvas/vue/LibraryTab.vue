<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@edmi-vue/ui/input-group";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@edmi-vue/ui/item";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { library } from "../data";
import Icon from "./Icon.vue";
import Pixels from "./Pixels.vue";

const banner = ref(true);
const view = ref("grid");
const count = (n: number) => `${n} ${n === 1 ? "file" : "files"}`;
const pickView = (v: unknown) => {
  if (typeof v === "string" && v) view.value = v;
};
</script>

<template>
  <div class="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pb-4">
    <div class="flex items-center justify-between">
      <h2 class="flex items-center gap-2 text-lg font-medium">
        Library
        <Icon name="info" class="size-3.5 text-muted-foreground" />
      </h2>
      <div class="flex items-center gap-2">
        <Button type="button" variant="ghost" size="icon-xs" aria-label="Upload">
          <Icon name="upload" class="size-4" />
        </Button>
        <ToggleGroup type="single" variant="segmented" :model-value="view" aria-label="View" @update:model-value="pickView">
          <ToggleGroupItem value="grid" aria-label="Grid"><Icon name="grid" class="size-3.5" /></ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List"><Icon name="list" class="size-3.5" /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
    <InputGroup class="mt-3">
      <InputGroupAddon><Icon name="search" /></InputGroupAddon>
      <InputGroupInput placeholder="Search files" />
    </InputGroup>
    <Item v-if="banner" variant="muted" size="sm" class="mt-3 items-start">
      <ItemMedia variant="icon"><Icon name="message" /></ItemMedia>
      <ItemContent>
        <ItemTitle>{{ library.banner.title }}</ItemTitle>
        <ItemDescription class="line-clamp-none">{{ library.banner.body }}</ItemDescription>
        <div class="pt-2">
          <Button type="button" variant="outline" size="xs" elevation="raised">{{ library.banner.action }}</Button>
        </div>
      </ItemContent>
      <ItemActions>
        <Button type="button" variant="ghost" size="icon-xs" aria-label="Dismiss" @click="banner = false">
          <Icon name="close" class="size-3.5" />
        </Button>
      </ItemActions>
    </Item>
    <div v-if="view === 'grid'" class="mt-3 grid grid-cols-2 gap-3">
      <Card v-for="f in library.folders" :key="f.id" class="gap-0 overflow-hidden py-0">
        <div class="aspect-[4/3] overflow-hidden border-b border-border">
          <Pixels v-if="f.kind === 'scene' && f.rects" :w="80" :h="60" :rects="f.rects" class="size-full" />
          <div v-else class="grid size-full grid-cols-2 gap-2 bg-muted p-2">
            <div v-for="n in 4" :key="n" class="grid place-items-center rounded-md border border-border bg-card">
              <span v-if="n === 2" class="h-4 w-3 rounded-[2px] bg-muted-foreground" />
            </div>
          </div>
        </div>
        <div class="px-3 py-2.5">
          <div class="text-[13px] font-medium">{{ f.name }}</div>
          <div class="text-xs text-muted-foreground">{{ count(f.files) }}</div>
        </div>
      </Card>
    </div>
    <Card v-else class="mt-3 gap-0 py-0">
      <Item v-for="f in library.folders" :key="f.id" size="sm">
        <ItemMedia variant="image">
          <Pixels v-if="f.kind === 'scene' && f.rects" :w="80" :h="60" :rects="f.rects" class="size-full" />
          <div v-else class="grid size-full grid-cols-2 gap-2 bg-muted p-2">
            <div v-for="n in 4" :key="n" class="grid place-items-center rounded-md border border-border bg-card" />
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{{ f.name }}</ItemTitle>
          <ItemDescription>{{ count(f.files) }}</ItemDescription>
        </ItemContent>
      </Item>
    </Card>
  </div>
</template>
