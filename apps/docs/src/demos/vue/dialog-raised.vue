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
      <Button variant="outline" raised>Open raised dialog</Button>
    </DialogTrigger>
    <DialogContent raised>
      <DialogHeader>
        <DialogTitle>Raised dialog</DialogTitle>
        <DialogDescription>A strong lip under the surface.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button raised>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
