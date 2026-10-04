<script setup lang="ts">
import type { BundledLanguage } from "shiki"
import type { TokenizedCode } from "./utils"
import { computed, ref, watch } from "vue"
import { cn } from "@/registry/edmi/lib/utils"
import { createRawTokens, highlightCode, isBold, isItalic, isUnderline } from "./utils"

const props = withDefaults(
  defineProps<{
    code: string
    language: BundledLanguage
    showLineNumbers?: boolean
  }>(),
  {
    showLineNumbers: false,
  },
)

const rawTokens = computed(() => createRawTokens(props.code))
// Cached result when there is one, raw tokens until highlighting finishes.
const tokenized = ref<TokenizedCode>(highlightCode(props.code, props.language) ?? rawTokens.value)

watch(
  () => [props.code, props.language],
  () => {
    tokenized.value = highlightCode(props.code, props.language) ?? rawTokens.value
    highlightCode(props.code, props.language, (result) => {
      tokenized.value = result
    })
  },
  { immediate: true },
)

const keyedLines = computed(() =>
  tokenized.value.tokens.map((line, lineIdx) => ({
    key: `line-${lineIdx}`,
    tokens: line.map((token, tokenIdx) => ({
      token,
      key: `line-${lineIdx}-${tokenIdx}`,
    })),
  })),
)

// Line numbers use CSS counters: 38px gutter, number right-aligned 14px from the code (board AI 05).
const lineNumberClasses = cn(
  "block",
  "before:inline-block before:w-[38px] before:pr-3.5 before:text-right",
  "before:content-[counter(line)] before:[counter-increment:line]",
  "before:font-mono before:text-muted-foreground-2 before:select-none",
)
</script>

<template>
  <div class="relative overflow-auto">
    <pre
      :class="cn('m-0 py-2.5 font-mono text-[12.5px] leading-[1.7]', showLineNumbers ? 'pr-4' : 'px-4')"
    ><code
        :class="cn(
          'font-mono',
          showLineNumbers && '[counter-increment:line_0] [counter-reset:line]',
        )"
      ><template v-for="line in keyedLines" :key="line.key"><span :class="showLineNumbers ? lineNumberClasses : 'block'"><template v-if="line.tokens.length === 0">{{ "\n" }}</template><template v-else><span
                v-for="tokenObj in line.tokens"
                :key="tokenObj.key"
                :style="{
                  color: tokenObj.token.color,
                  ...tokenObj.token.htmlStyle,
                  fontStyle: isItalic(tokenObj.token.fontStyle) ? 'italic' : undefined,
                  fontWeight: isBold(tokenObj.token.fontStyle) ? 'bold' : undefined,
                  textDecoration: isUnderline(tokenObj.token.fontStyle) ? 'underline' : undefined,
                }"
    >{{ tokenObj.token.content }}</span></template></span></template></code></pre>
  </div>
</template>
