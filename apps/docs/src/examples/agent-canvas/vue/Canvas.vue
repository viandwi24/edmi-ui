<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";
import { Avatar, AvatarFallback } from "@edmi-vue/ui/avatar";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@edmi-vue/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@edmi-vue/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@edmi-vue/ui/dropdown-menu";
import { Input } from "@edmi-vue/ui/input";
import { Kbd, KbdGroup } from "@edmi-vue/ui/kbd";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@edmi-vue/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@edmi-vue/ui/tooltip";
import {
  depts,
  org,
  orgMenu,
  paletteCommands,
  paletteDepartments,
  palettePlaceholder,
  paletteWorkspaces,
  plant,
  plantHead,
  RING,
  roadmapStages,
  shortcutList,
  TILE,
} from "../data";
import Icon from "./Icon.vue";
import Pixels from "./Pixels.vue";

const emit = defineEmits<{ (e: "new-task", name: string): void; (e: "open-panel"): void }>();

const grid =
  "[background-image:linear-gradient(to_right,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px)] [background-size:48px_48px]";

const zoom = ref(100);
const pan = ref({ x: 0, y: 0 });
const dragging = ref(false);
let drag: { id: number; x: number; y: number } | null = null;
const hub = ref(true);
const active = ref<string | null>(null);
const palette = ref(false);
const shortcuts = ref(false);
const taskDialog = ref(false);
const taskName = ref("");

const pick = (id: string) => {
  active.value = active.value === id ? null : id;
};
const step = (d: number) => {
  zoom.value = Math.min(160, Math.max(60, zoom.value + d));
};
const reset = () => {
  zoom.value = 100;
  pan.value = { x: 0, y: 0 };
};
const down = (e: PointerEvent) => {
  if ((e.target as HTMLElement).closest("button,[data-nopan]")) return;
  drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  dragging.value = true;
};
const move = (e: PointerEvent) => {
  if (!drag || drag.id !== e.pointerId) return;
  pan.value = { x: pan.value.x + e.clientX - drag.x, y: pan.value.y + e.clientY - drag.y };
  drag.x = e.clientX;
  drag.y = e.clientY;
};
const up = (e: PointerEvent) => {
  if (drag?.id !== e.pointerId) return;
  drag = null;
  dragging.value = false;
};
const onKey = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    palette.value = !palette.value;
  }
};
onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));

const runCommand = (id: string) => {
  palette.value = false;
  if (id === "create-task") taskDialog.value = true;
};
const runDept = (id: string) => {
  palette.value = false;
  active.value = id;
};
const createTask = () => {
  const v = taskName.value.trim();
  if (!v) return;
  emit("new-task", v);
  taskName.value = "";
  taskDialog.value = false;
};
const deptOf = (id: string) => depts.find((d) => d.id === id);
</script>

<template>
  <TooltipProvider>
    <div
      :class="`absolute inset-0 touch-none overflow-hidden bg-card select-none ${grid} ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`"
      :style="{ backgroundPosition: `${pan.x}px ${pan.y}px` }"
      @pointerdown="down"
      @pointermove="move"
      @pointerup="up"
      @pointercancel="up"
    >
      <div
        class="absolute top-[46.5%] left-1/2 size-0 origin-top-left lg:left-[calc((100%-438px)*0.58)]"
        :style="{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})` }"
      >
        <svg class="pointer-events-none absolute overflow-visible" width="1" height="1" aria-hidden="true">
          <circle :r="RING" fill="none" stroke="var(--foreground)" stroke-opacity="0.12" stroke-width="1.5" />
          <line
            v-for="d in depts"
            :key="`s-${d.id}`"
            x1="0"
            y1="0"
            :x2="d.node[0]"
            :y2="d.node[1]"
            stroke="var(--foreground)"
            stroke-opacity="0.2"
            stroke-dasharray="4 4"
          />
          <g v-for="d in depts" :key="`c-${d.id}`">
            <path
              :d="d.path"
              fill="none"
              stroke="var(--foreground)"
              :stroke-opacity="active === d.id ? 0.9 : 0.35"
              :stroke-width="active === d.id ? 1.5 : 1"
              stroke-dasharray="4 4"
            />
            <circle :cx="d.end[0]" :cy="d.end[1]" r="3" fill="var(--border)" />
          </g>
        </svg>

        <div v-for="d in depts" :key="d.id">
          <span
            v-for="t in d.thumbs"
            :key="`${t.x}-${t.y}`"
            class="pointer-events-none absolute overflow-hidden rounded-[3px] border border-border bg-muted"
            :style="{ left: `${t.x}px`, top: `${t.y}px`, width: `${TILE.w}px`, height: `${TILE.h}px` }"
          >
            <i class="absolute top-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-border" />
            <i class="absolute top-3.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-border" />
          </span>
          <Button
            type="button"
            :variant="active === d.id ? 'secondary' : 'outline'"
            size="sm"
            :aria-pressed="active === d.id"
            class="absolute"
            :style="{
              left: `${d.plate.x}px`,
              top: `${d.plate.y}px`,
              width: `${d.plate.w}px`,
              height: `${d.grid ? 32 : d.plate.h}px`,
            }"
            @click="pick(d.id)"
          >
            {{ d.label }}
          </Button>
          <span
            v-if="d.grid"
            class="pointer-events-none absolute grid grid-cols-3 gap-px overflow-hidden p-0.5"
            :style="{
              left: `${d.plate.x}px`,
              top: `${d.plate.y + 32}px`,
              width: `${d.plate.w}px`,
              height: `${d.plate.h - 32}px`,
            }"
          >
            <span v-for="n in 6" :key="n" class="relative overflow-hidden rounded-[3px] border border-border bg-muted">
              <i class="absolute top-2 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-border" />
            </span>
          </span>
        </div>

        <Pixels
          :w="plant.w"
          :h="plant.h"
          :rects="plant.rects"
          class="pointer-events-none absolute top-[-78px] left-[-18px] w-9 opacity-80"
        />
        <button
          type="button"
          aria-label="Atlas"
          :aria-pressed="hub"
          :class="`absolute top-[-29px] left-[-49px] h-[58px] w-[98px] rounded-xl p-0.5 outline-none ${hub ? 'ring-2 ring-ring' : ''}`"
          @click="hub = !hub"
        >
          <Card :elevation="hub ? 'floating' : 'raised'" class="size-full items-center justify-center gap-0 py-0">
            <span class="font-serif text-[19px] leading-none tracking-tight">Atlas</span>
          </Card>
        </button>

        <Button
          v-for="d in depts"
          :key="`n-${d.id}`"
          type="button"
          :variant="active === d.id ? 'secondary' : 'outline'"
          size="icon-sm"
          elevation="raised"
          :aria-label="d.label"
          class="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          :style="{ left: `${d.node[0]}px`, top: `${d.node[1]}px` }"
          @click="pick(d.id)"
        >
          <AgentAvatar :seed="d.id" :color="d.color" :size="13" :tile="false" />
        </Button>
      </div>

      <div class="absolute top-4 left-4 flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              <Avatar size="sm">
                <AvatarFallback>{{ org.initials }}</AvatarFallback>
              </Avatar>
              {{ org.name }}
              <Icon name="chevronDown" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-64" elevation="floating">
            <template v-for="(group, i) in orgMenu" :key="group[0].id">
              <DropdownMenuSeparator v-if="i > 0" />
              <DropdownMenuGroup>
                <DropdownMenuItem v-for="item in group" :key="item.id" @select="item.id === 'shortcuts' && (shortcuts = true)">
                  <Icon :name="item.icon" />
                  {{ item.label }}
                  <DropdownMenuShortcut v-if="item.keys">
                    <KbdGroup><Kbd v-for="k in item.keys" :key="k">{{ k }}</Kbd></KbdGroup>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </template>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="secondary" size="sm" elevation="raised">
          <Pixels :w="plantHead.w" :h="plantHead.h" :rects="plantHead.rects" class="h-3 w-3.5" />
          Upgrade
        </Button>
      </div>

      <div class="absolute top-4 right-3 flex items-center gap-1.5 lg:right-[485px]">
        <Button variant="ghost" size="icon-xs" aria-label="Search" @click="palette = true"><Icon name="search" /></Button>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="ghost" size="icon-xs" aria-label="Map"><Icon name="map" /></Button>
          </PopoverTrigger>
          <PopoverContent align="end" class="w-72">
            <PopoverHeader><PopoverTitle>Roadmap</PopoverTitle></PopoverHeader>
            <ol class="flex flex-col gap-3">
              <li v-for="(s, i) in roadmapStages" :key="s.title" class="flex gap-3">
                <span class="font-mono text-xs text-muted-foreground">{{ i + 1 }}</span>
                <div>
                  <div class="text-sm font-medium">{{ s.title }}</div>
                  <div class="text-xs text-muted-foreground">{{ s.note }}</div>
                </div>
              </li>
            </ol>
          </PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon-xs" aria-label="Theme"><Icon name="sun" /></Button>
          </TooltipTrigger>
          <TooltipContent>Theme follows the viewer</TooltipContent>
        </Tooltip>
        <Button variant="outline" size="sm" @click="taskDialog = true">
          <Icon name="plus" />
          New task
        </Button>
        <Button variant="outline" size="icon-sm" class="lg:hidden" aria-label="Open panel" @click="emit('open-panel')">
          <Icon name="message" />
        </Button>
      </div>

      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="icon-lg" elevation="raised" aria-label="Notifications" class="absolute bottom-4 left-4">
            <Icon name="bell" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" class="w-80">
          <PopoverHeader class="flex-row items-center justify-between">
            <PopoverTitle>Notifications</PopoverTitle>
            <Button variant="outline" size="xs">Desktop alerts</Button>
          </PopoverHeader>
          <div class="py-6 text-center text-sm text-muted-foreground">All caught up!</div>
        </PopoverContent>
      </Popover>

      <Card data-nopan elevation="raised" class="absolute right-3 bottom-4 flex-row items-center gap-0.5 p-1 py-1 lg:right-[485px]">
        <Button variant="ghost" size="icon-xs" aria-label="Reset view" @click="reset"><Icon name="home" /></Button>
        <span class="w-12 text-center font-mono text-xs">{{ zoom }}%</span>
        <Button variant="ghost" size="icon-xs" aria-label="Zoom in" :disabled="zoom >= 160" @click="step(10)"><Icon name="plus" /></Button>
        <Button variant="ghost" size="icon-xs" aria-label="Zoom out" :disabled="zoom <= 60" @click="step(-10)"><Icon name="minus" /></Button>
        <Button variant="ghost" size="icon-xs" aria-label="Shortcuts" @click="shortcuts = true"><Icon name="keyboard" /></Button>
      </Card>

      <CommandDialog v-model:open="palette" title="Search" description="Search the workspace">
        <CommandInput :placeholder="palettePlaceholder" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Commands">
            <CommandItem v-for="c in paletteCommands" :key="c.id" :value="c.label" @select="runCommand(c.id)">
              <Icon :name="c.icon" />
              {{ c.label }}
              <CommandShortcut>
                <KbdGroup><Kbd v-for="k in c.keys" :key="k">{{ k }}</Kbd></KbdGroup>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Departments">
            <template v-for="id in paletteDepartments" :key="id">
              <CommandItem v-if="deptOf(id)" :value="deptOf(id)!.label" @select="runDept(id)">
                <AgentAvatar :seed="id" :color="deptOf(id)!.color" :size="16" :tile="false" />
                {{ deptOf(id)!.label }}
              </CommandItem>
            </template>
          </CommandGroup>
          <CommandGroup heading="Workspaces">
            <CommandItem v-for="w in paletteWorkspaces" :key="w" :value="w" @select="palette = false">
              <Icon name="globe" />
              {{ w }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div class="flex items-center justify-end gap-4 border-t border-border px-3 py-2 text-xs text-muted-foreground">
          <span class="flex items-center gap-1.5"><Kbd>↵</Kbd> Select</span>
          <span class="flex items-center gap-1.5"><Kbd>↑↓</Kbd> Navigate</span>
          <span class="flex items-center gap-1.5"><Kbd>Esc</Kbd> Close</span>
        </div>
      </CommandDialog>

      <Dialog v-model:open="shortcuts">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keyboard shortcuts</DialogTitle>
            <DialogDescription>Move around without the mouse.</DialogDescription>
          </DialogHeader>
          <ul class="flex flex-col gap-2">
            <li v-for="s in shortcutList" :key="s.label" class="flex items-center justify-between text-sm">
              {{ s.label }}
              <KbdGroup><Kbd v-for="k in s.keys" :key="k">{{ k }}</Kbd></KbdGroup>
            </li>
          </ul>
        </DialogContent>
      </Dialog>

      <Dialog v-model:open="taskDialog">
        <DialogContent>
          <form class="flex flex-col gap-4" @submit.prevent="createTask">
            <DialogHeader>
              <DialogTitle>New task</DialogTitle>
              <DialogDescription>Describe the work and the right agent picks it up.</DialogDescription>
            </DialogHeader>
            <Input v-model="taskName" placeholder="Task title" />
            <DialogFooter>
              <Button type="button" variant="outline" @click="taskDialog = false">Cancel</Button>
              <Button type="submit" :disabled="!taskName.trim()">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </TooltipProvider>
</template>
