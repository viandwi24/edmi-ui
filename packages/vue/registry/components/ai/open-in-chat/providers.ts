// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { Component } from "vue"
import { MessageSquareIcon } from "@lucide/vue"
import {
  ChatGPTIcon,
  ClaudeIcon,
  CursorIcon,
  GithubIcon,
  SciraIcon,
  V0Icon,
} from "./icons"

/** Brand tile colors follow the AI 08 board (brand marks are the one place literal colors are allowed). */
export const providers = {
  github: {
    title: "Open in GitHub",
    color: "#24292f",
    createUrl: (url: string) => url,
    icon: GithubIcon as Component,
  },
  scira: {
    title: "Open in Scira",
    color: "#111",
    createUrl: (q: string) => `https://scira.ai/?${new URLSearchParams({ q })}`,
    icon: SciraIcon as Component,
  },
  chatgpt: {
    title: "Open in ChatGPT",
    color: "#10a37f",
    createUrl: (prompt: string) =>
      `https://chatgpt.com/?${new URLSearchParams({ hints: "search", prompt })}`,
    icon: ChatGPTIcon as Component,
  },
  claude: {
    title: "Open in Claude",
    color: "#d97757",
    createUrl: (q: string) => `https://claude.ai/new?${new URLSearchParams({ q })}`,
    icon: ClaudeIcon as Component,
  },
  t3: {
    title: "Open in T3 Chat",
    color: "#8b1d6b",
    createUrl: (q: string) => `https://t3.chat/new?${new URLSearchParams({ q })}`,
    icon: MessageSquareIcon as Component,
  },
  v0: {
    title: "Open in v0",
    color: "#111",
    createUrl: (q: string) => `https://v0.app?${new URLSearchParams({ q })}`,
    icon: V0Icon as Component,
  },
  cursor: {
    title: "Open in Cursor",
    color: "#333",
    createUrl: (text: string) => {
      const url = new URL("https://cursor.com/link/prompt")
      url.searchParams.set("text", text)
      return url.toString()
    },
    icon: CursorIcon as Component,
  },
}

export type ProviderKey = keyof typeof providers
