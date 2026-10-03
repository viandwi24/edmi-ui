// Derived from Svelte AI Elements (MIT), modified for Edmi UI.
import type { DynamicToolUIPart, ToolUIPart } from "ai";

export type ToolPart = ToolUIPart | DynamicToolUIPart;
export type ToolState = ToolPart["state"];
