<script setup lang="ts">
import { Button } from "@edmi-vue/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@edmi-vue/ui/dialog";
import { Input } from "@edmi-vue/ui/input";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Edit profile</Button>
    </DialogTrigger>
    <DialogContent show-close-button>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Shown on your indexes and in the feed.</DialogDescription>
      </DialogHeader>
      <div class="grid gap-3 text-[13px]">
        <div class="grid gap-1.5">
          <label for="dialog-name">Display name</label>
          <Input id="dialog-name" default-value="Dewi Lestari" />
        </div>
        <div class="grid gap-1.5">
          <label for="dialog-handle">Handle</label>
          <Input id="dialog-handle" default-value="@dewi" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
