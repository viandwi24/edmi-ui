<script setup lang="ts">
import { Image } from "@edmi-vue/components/ai/image";

// A gradient SVG stands in for a generated image (base64 + media type, like the AI SDK returns).
const base64 =
  "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2MDAnIGhlaWdodD0nNDAwJz48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9J2EnIGN4PScyNSUnIGN5PSczMCUnIHI9JzQ1JSc+PHN0b3Agb2Zmc2V0PScwJyBzdG9wLWNvbG9yPScjZThhMzNkJy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjZThhMzNkJyBzdG9wLW9wYWNpdHk9JzAnLz48L3JhZGlhbEdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0nYicgY3g9JzcyJScgY3k9JzY4JScgcj0nNDAlJz48c3RvcCBvZmZzZXQ9JzAnIHN0b3AtY29sb3I9JyMzODZmZDYnLz48c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMzODZmZDYnIHN0b3Atb3BhY2l0eT0nMCcvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSc2MDAnIGhlaWdodD0nNDAwJyBmaWxsPScjNjJhMDdhJy8+PHJlY3Qgd2lkdGg9JzYwMCcgaGVpZ2h0PSc0MDAnIGZpbGw9J3VybCgjYSknLz48cmVjdCB3aWR0aD0nNjAwJyBoZWlnaHQ9JzQwMCcgZmlsbD0ndXJsKCNiKScvPjwvc3ZnPg==";
const bytes = new Uint8Array();
</script>

<template>
  <div class="flex flex-wrap items-start gap-6">
    <div class="flex flex-col gap-2">
      <Image
        alt="Generated portfolio cover"
        :base64="base64"
        class="aspect-[3/2] w-72"
        media-type="image/svg+xml"
        :uint8-array="bytes"
      />
      <p class="text-xs text-muted-foreground">Generated · 1024×1024 · png</p>
    </div>
    <div class="flex aspect-[3/2] w-72 items-center justify-center gap-2 rounded-xl border border-border bg-muted text-sm text-muted-foreground">
      <span class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-60" />
      Generating image...
    </div>
  </div>
</template>
