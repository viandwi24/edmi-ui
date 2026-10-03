export type PromptInputAgentOption = {
	id: string;
	name: string;
	/** Short scope shown on the right of the mention list (`trading`). */
	scope?: string;
	/** `chart-1` to `chart-5` or any CSS color for the identicon. */
	color?: string;
};
