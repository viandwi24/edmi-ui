import type { DynamicToolUIPart, ToolUIPart } from "ai";

export type ToolPart = ToolUIPart | DynamicToolUIPart;
export type ToolState = ToolPart["state"];
