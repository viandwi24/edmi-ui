<script setup lang="ts">
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewConsole,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
} from "@edmi-vue/components/ai/web-preview";
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon, Loader2Icon, RotateCwIcon } from "@lucide/vue";

const cards = [
  ["NAV", "$0.9998"],
  ["Holders", "412"],
  ["AUM", "$49K"],
]
  .map(
    ([k, v]) =>
      `<div style="width:130px;padding:10px 12px;background:#fff;border:1px solid #e4e2da;border-radius:10px"><div style="font-size:12px;color:#777">${k}</div><div style="font:16px ui-monospace,monospace">${v}</div></div>`,
  )
  .join("");

const page = `<!doctype html><html><body style="margin:0;padding:22px;font-family:system-ui,sans-serif;background:#f4f3ef;color:#1f1f1d"><div style="font-size:20px;font-weight:600">MAG4</div><div style="font-size:12px;color:#777">Magnificent Four</div><div style="display:flex;gap:10px;margin-top:16px">${cards}</div></body></html>`;

const logs = [
  { level: "log" as const, message: "Mounted IndexPage", timestamp: new Date("2026-01-01T14:02:11") },
  { level: "warn" as const, message: "Missing key prop in list", timestamp: new Date("2026-01-01T14:02:12") },
];
</script>

<template>
  <div class="flex w-full max-w-2xl flex-col gap-5">
    <WebPreview default-console-open default-url="localhost:3000/indexes/mag4">
      <WebPreviewNavigation>
        <WebPreviewNavigationButton tooltip="Back"><ChevronLeftIcon class="size-4" /></WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Forward"><ChevronRightIcon class="size-4" /></WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Reload"><RotateCwIcon class="size-4" /></WebPreviewNavigationButton>
        <WebPreviewUrl />
        <WebPreviewNavigationButton tooltip="Open in new tab"><ArrowUpRightIcon class="size-4" /></WebPreviewNavigationButton>
      </WebPreviewNavigation>
      <WebPreviewBody class="h-[220px]" :srcdoc="page" />
      <WebPreviewConsole :logs="logs" />
    </WebPreview>
    <WebPreview default-url="localhost:3000/indexes/mag4">
      <WebPreviewNavigation>
        <WebPreviewNavigationButton tooltip="Back"><ChevronLeftIcon class="size-4" /></WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Forward"><ChevronRightIcon class="size-4" /></WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Reload"><RotateCwIcon class="size-4" /></WebPreviewNavigationButton>
        <WebPreviewUrl />
        <WebPreviewNavigationButton tooltip="Open in new tab"><ArrowUpRightIcon class="size-4" /></WebPreviewNavigationButton>
      </WebPreviewNavigation>
      <WebPreviewBody class="h-[220px]" src="about:blank">
        <template #loading>
          <div class="absolute inset-0 flex items-center justify-center gap-2.5 bg-background text-[13.5px] text-muted-foreground">
            <Loader2Icon class="size-4 animate-spin" />
            Generating preview…
          </div>
        </template>
      </WebPreviewBody>
    </WebPreview>
  </div>
</template>
