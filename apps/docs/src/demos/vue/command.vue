<script setup lang="ts">
import { PlusIcon, SparklesIcon } from "@lucide/vue";
import { onMounted, onUnmounted, ref } from "vue";
import { Button } from "@edmi-vue/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@edmi-vue/ui/command";
import { Kbd } from "@edmi-vue/ui/kbd";

const open = ref(false);

function onKeydown(e: KeyboardEvent) {
  if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    open.value = !open.value;
  }
}
onMounted(() => document.addEventListener("keydown", onKeydown));
onUnmounted(() => document.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Command class="w-[420px] rounded-xl border border-border">
      <CommandInput placeholder="Search indexes and actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Indexes">
          <CommandItem value="mag4">MAG4 · Magnificent Four</CommandItem>
          <CommandItem value="mag7">MAG7 · equal weight</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="create-index">
            <PlusIcon />
            Create index <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="ask-agent">
            <SparklesIcon />
            Ask agent <CommandShortcut>⌘J</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
    <Button variant="outline" @click="open = true">
      Open palette <Kbd>⌘K</Kbd>
    </Button>
    <CommandDialog v-model:open="open">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem value="create-index" @select="open = false">Create index</CommandItem>
          <CommandItem value="toggle-theme" @select="open = false">Toggle theme</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
