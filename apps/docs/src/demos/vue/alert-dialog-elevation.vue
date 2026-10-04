<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@edmi-vue/ui/alert-dialog";
import { Button } from "@edmi-vue/ui/button";
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline">Close index</Button>
    </AlertDialogTrigger>
    <AlertDialogContent elevation="floating">
      <AlertDialogHeader>
        <AlertDialogTitle>Close this index?</AlertDialogTitle>
        <AlertDialogDescription>
          Holders can still withdraw, but no one can join. This cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive">Close index</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
