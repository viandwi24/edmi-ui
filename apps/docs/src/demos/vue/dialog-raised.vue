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
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Open floating dialog</Button>
    </DialogTrigger>
    <DialogContent elevation="floating">
      <DialogHeader>
        <DialogTitle>Floating dialog</DialogTitle>
        <DialogDescription>Bevel plus one soft drop (+2).</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
