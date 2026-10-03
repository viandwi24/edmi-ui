<script setup lang="ts">
// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { CSSProperties, HTMLAttributes } from "vue"
import { cn } from "@/registry/edmi/lib/utils"

// The canonical code block of the kit (DESIGN 5b): body on --card, header on --muted.
// Highlight colours come from chart tokens through Shiki's css-variables theme.
const SHIKI_TOKEN_VARS = cn(
  "[--shiki-foreground:var(--foreground)] [--shiki-background:transparent]",
  "[--shiki-token-keyword:var(--chart-2)] [--shiki-token-string:var(--success-text)]",
  "[--shiki-token-string-expression:var(--success-text)] [--shiki-token-constant:var(--chart-3)]",
  "[--shiki-token-function:var(--chart-4)] [--shiki-token-comment:var(--muted-foreground)]",
  "[--shiki-token-parameter:var(--foreground)] [--shiki-token-punctuation:var(--foreground)]",
  "[--shiki-token-link:var(--info-text)]",
)

const props = defineProps<{
  class?: HTMLAttributes["class"]
  language: string
}>()

const style: CSSProperties = {
  contentVisibility: "auto",
  containIntrinsicSize: "auto 200px",
}
</script>

<template>
  <div
    data-slot="ai-code-block"
    :class="cn(
      'group relative w-full overflow-hidden rounded-xl border border-border bg-card text-foreground',
      SHIKI_TOKEN_VARS,
      props.class,
    )"
    :data-language="props.language"
    :style="style"
  >
    <slot />
  </div>
</template>
