<script setup lang="ts">
import {
  AppWindowIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  FileTextIcon,
  LayoutGridIcon,
  LockIcon,
  MoreHorizontalIcon,
  PaletteIcon,
  SearchIcon,
  XIcon,
} from "@lucide/vue";
import { computed, ref } from "vue";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@edmi-vue/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@edmi-vue/ui/item";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import { type ArtifactType, banner, groups, menu, tabs, tiles } from "./data";

const tone: Record<ArtifactType, string> = {
  docs: "bg-[color-mix(in_srgb,var(--chart-2)_14%,var(--card))] text-chart-2",
  slides: "bg-[color-mix(in_srgb,var(--chart-3)_14%,var(--card))] text-chart-3",
  design: "bg-[color-mix(in_srgb,var(--chart-4)_14%,var(--card))] text-chart-4",
};
const typeIcon = { docs: FileTextIcon, slides: AppWindowIcon, design: PaletteIcon };

const tab = ref("all");
const bannerOpen = ref(true);
const visible = computed(() =>
  groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (i) => tab.value === "all" || (tab.value === "shared" ? i.shared : !i.shared),
      ),
    }))
    .filter((g) => g.items.length > 0),
);
</script>

<template>
  <div class="min-h-svh bg-background text-foreground">
    <div class="mx-auto w-full max-w-[920px] px-5 py-[30px] sm:px-[34px]">
      <h1 class="font-serif text-[30px] leading-tight font-normal tracking-[-0.3px]">Library</h1>

      <div class="mt-[18px] flex flex-wrap items-center justify-between gap-2">
        <Tabs v-model="tab">
          <TabsList variant="pills">
            <TabsTrigger v-for="t in tabs" :key="t.value" :value="t.value">{{ t.label }}</TabsTrigger>
          </TabsList>
        </Tabs>
        <div class="flex items-center gap-1">
          <Button aria-label="Search" size="icon-sm" type="button" variant="ghost">
            <SearchIcon class="size-4" />
          </Button>
          <Button aria-label="Grid view" size="icon-sm" type="button" variant="ghost">
            <LayoutGridIcon class="size-4" />
          </Button>
          <Button size="sm" type="button" variant="secondary">
            Edmi Design
            <ChevronDownIcon />
          </Button>
        </div>
      </div>

      <Card v-if="bannerOpen" class="mt-[18px] flex-row items-start justify-between gap-3 px-4 py-3.5">
        <div>
          <div class="text-sm font-semibold">{{ banner.title }}</div>
          <div class="mt-0.5 text-[13.5px] text-muted-foreground">{{ banner.text }}</div>
          <Button class="mt-2.5" size="sm" type="button" variant="secondary">
            {{ banner.action }}
            <ArrowUpRightIcon />
          </Button>
        </div>
        <Button
          aria-label="Dismiss"
          size="icon-sm"
          type="button"
          variant="ghost"
          @click="bannerOpen = false"
        >
          <XIcon class="size-4" />
        </Button>
      </Card>

      <div class="mt-[22px] mb-2.5 text-[13px] text-muted-foreground">Make something new</div>
      <div class="grid grid-cols-3 gap-3.5 sm:max-w-[538px]">
        <div v-for="t in tiles" :key="t.type" class="flex flex-col gap-2">
          <div
            :class="`flex h-[118px] w-full items-center justify-center rounded-[calc(var(--radius)*1.4)] border border-border ${tone[t.type]}`"
          >
            <component :is="typeIcon[t.type]" class="size-6" />
          </div>
          <div class="flex items-center gap-1.5 text-sm">
            {{ t.label }}
            <Badge variant="secondary" class="h-[18px] text-[10.5px]">Beta</Badge>
          </div>
        </div>
      </div>

      <section v-for="g in visible" :key="g.label">
        <div class="mt-[22px] mb-0.5 text-[13px] text-muted-foreground">{{ g.label }}</div>
        <ItemGroup>
          <Item v-for="i in g.items" :key="i.id" class="px-0 py-3">
            <span
              :class="`inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] ${tone[i.type]}`"
            >
              <component :is="typeIcon[i.type]" class="size-[18px]" />
            </span>
            <ItemContent>
              <ItemTitle class="text-[15px] font-normal">{{ i.title }}</ItemTitle>
              <ItemDescription v-if="i.note">{{ i.note }}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <span class="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <LockIcon class="size-3.5" />
                <span class="max-sm:hidden">{{ i.viewed }}</span>
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button aria-label="More" size="icon-sm" type="button" variant="ghost">
                    <MoreHorizontalIcon class="size-4 rotate-90" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    v-for="m in menu"
                    :key="m"
                    :variant="m === 'Delete' ? 'destructive' : 'default'"
                  >
                    {{ m }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
          </Item>
        </ItemGroup>
      </section>
    </div>
  </div>
</template>
