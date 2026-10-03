<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { ArtifactKind } from "./context"
import {
  AppWindowIcon,
  ArchiveIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
} from "@lucide/vue"

withDefaults(defineProps<{
  kind?: ArtifactKind
  class?: HTMLAttributes["class"]
}>(), {
  kind: "document",
  class: "size-5",
})
</script>

<template>
  <ArchiveIcon v-if="kind === 'archive'" :class="$props.class" />
  <FileCodeIcon v-else-if="kind === 'code'" :class="$props.class" />
  <ImageIcon v-else-if="kind === 'image'" :class="$props.class" />
  <AppWindowIcon v-else-if="kind === 'slides'" :class="$props.class" />
  <FileIcon v-else-if="kind === 'file'" :class="$props.class" />
  <FileTextIcon v-else :class="$props.class" />
</template>
