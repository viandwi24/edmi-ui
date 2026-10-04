import { getContext, setContext } from "svelte";

/** AgentTools counts its AgentTool children through this context ("Tools · 3"). */
export interface AgentToolsContextValue {
	register: () => () => void;
}

const KEY = Symbol("ai-agent-tools");

export function setAgentToolsContext(value: AgentToolsContextValue) {
	return setContext(KEY, value);
}

export function useAgentToolsContext(): AgentToolsContextValue | undefined {
	return getContext<AgentToolsContextValue | undefined>(KEY);
}
