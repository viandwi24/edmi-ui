import { entries as actionsSvelte } from "./actions.svelte.ts";
import { items as actions } from "./actions.ts";
import { entries as actionsVue } from "./actions.vue.ts";
import { entries as aiAgentSvelte } from "./ai-agent.svelte.ts";
import { items as aiAgent } from "./ai-agent.ts";
import { entries as aiAgentVue } from "./ai-agent.vue.ts";
import { entries as aiChatSvelte } from "./ai-chat.svelte.ts";
import { items as aiChat } from "./ai-chat.ts";
import { entries as aiChatVue } from "./ai-chat.vue.ts";
import { entries as aiCodeSvelte } from "./ai-code.svelte.ts";
import { items as aiCode } from "./ai-code.ts";
import { entries as aiCodeVue } from "./ai-code.vue.ts";
import { entries as aiPatternsSvelte } from "./ai-patterns.svelte.ts";
import { items as aiPatterns } from "./ai-patterns.ts";
import { entries as aiPatternsVue } from "./ai-patterns.vue.ts";
import { entries as aiRuntimeSvelte } from "./ai-runtime.svelte.ts";
import { items as aiRuntime } from "./ai-runtime.ts";
import { entries as aiRuntimeVue } from "./ai-runtime.vue.ts";
import { entries as aiUtilitiesSvelte } from "./ai-utilities.svelte.ts";
import { items as aiUtilities } from "./ai-utilities.ts";
import { entries as aiUtilitiesVue } from "./ai-utilities.vue.ts";
import { entries as aiVoiceSvelte } from "./ai-voice.svelte.ts";
import { items as aiVoice } from "./ai-voice.ts";
import { entries as aiVoiceVue } from "./ai-voice.vue.ts";
import { entries as aiWorkflowSvelte } from "./ai-workflow.svelte.ts";
import { items as aiWorkflow } from "./ai-workflow.ts";
import { entries as aiWorkflowVue } from "./ai-workflow.vue.ts";
import { entries as conversationSvelte } from "./conversation.svelte.ts";
import { items as conversation } from "./conversation.ts";
import { entries as conversationVue } from "./conversation.vue.ts";
import { entries as dataSvelte } from "./data.svelte.ts";
import { items as data } from "./data.ts";
import { entries as dataVue } from "./data.vue.ts";
import { entries as displaySvelte } from "./display.svelte.ts";
import { items as display } from "./display.ts";
import { entries as displayVue } from "./display.vue.ts";
import { entries as formsChoiceSvelte } from "./forms-choice.svelte.ts";
import { items as formsChoice } from "./forms-choice.ts";
import { entries as formsChoiceVue } from "./forms-choice.vue.ts";
import { entries as formsTextSvelte } from "./forms-text.svelte.ts";
import { items as formsText } from "./forms-text.ts";
import { entries as formsTextVue } from "./forms-text.vue.ts";
import { entries as layoutSvelte } from "./layout.svelte.ts";
import { items as layout } from "./layout.ts";
import { entries as layoutVue } from "./layout.vue.ts";
import { entries as metaSvelte } from "./meta.svelte.ts";
import { items as meta } from "./meta.ts";
import { entries as metaVue } from "./meta.vue.ts";
import { entries as navigationSvelte } from "./navigation.svelte.ts";
import { items as navigation } from "./navigation.ts";
import { entries as navigationVue } from "./navigation.vue.ts";
import { entries as overlaysSvelte } from "./overlays.svelte.ts";
import { items as overlays } from "./overlays.ts";
import { entries as overlaysVue } from "./overlays.vue.ts";
import { entries as patternsSvelte } from "./patterns.svelte.ts";
import { items as patterns } from "./patterns.ts";
import { entries as patternsVue } from "./patterns.vue.ts";
import { entries as patterns2Svelte } from "./patterns-2.svelte.ts";
import { items as patterns2 } from "./patterns-2.ts";
import { entries as patterns2Vue } from "./patterns-2.vue.ts";
import { items as themes } from "./themes.ts";
import type { FrameworkEntry, Item } from "./types.ts";

export type { Framework, Item } from "./types.ts";

type Overlay = Record<string, FrameworkEntry>;

/**
 * Each group is `<group>.ts` (item + React entry) plus `<group>.vue.ts` / `<group>.svelte.ts`
 * (per-framework entries keyed by item name), so the three ports never edit the same file.
 */
function group(
	items: Item[],
	vue: Overlay,
	svelte: Overlay,
	file: string,
): Item[] {
	const names = new Set(items.map((i) => i.name));
	for (const [fw, overlay] of [
		["vue", vue],
		["svelte", svelte],
	] as const) {
		for (const name of Object.keys(overlay)) {
			if (!names.has(name))
				throw new Error(
					`${file}.${fw}.ts: "${name}" is not an item in ${file}.ts`,
				);
		}
	}
	return items.map((item) => {
		const frameworks = { ...item.frameworks };
		if (vue[item.name])
			frameworks.vue = { ...frameworks.vue, ...vue[item.name] };
		if (svelte[item.name])
			frameworks.svelte = { ...frameworks.svelte, ...svelte[item.name] };
		return { ...item, frameworks };
	});
}

/** Order does not matter: the generator sorts by name. */
export const manifest: Item[] = [
	...group(meta, metaVue, metaSvelte, "meta"),
	...group(actions, actionsVue, actionsSvelte, "actions"),
	...group(formsText, formsTextVue, formsTextSvelte, "forms-text"),
	...group(formsChoice, formsChoiceVue, formsChoiceSvelte, "forms-choice"),
	...group(display, displayVue, displaySvelte, "display"),
	...group(overlays, overlaysVue, overlaysSvelte, "overlays"),
	...group(navigation, navigationVue, navigationSvelte, "navigation"),
	...group(layout, layoutVue, layoutSvelte, "layout"),
	...group(data, dataVue, dataSvelte, "data"),
	...group(conversation, conversationVue, conversationSvelte, "conversation"),
	...group(patterns, patternsVue, patternsSvelte, "patterns"),
	...group(patterns2, patterns2Vue, patterns2Svelte, "patterns-2"),
	...group(aiChat, aiChatVue, aiChatSvelte, "ai-chat"),
	...group(aiAgent, aiAgentVue, aiAgentSvelte, "ai-agent"),
	...group(aiCode, aiCodeVue, aiCodeSvelte, "ai-code"),
	...group(aiRuntime, aiRuntimeVue, aiRuntimeSvelte, "ai-runtime"),
	...group(aiVoice, aiVoiceVue, aiVoiceSvelte, "ai-voice"),
	...group(aiWorkflow, aiWorkflowVue, aiWorkflowSvelte, "ai-workflow"),
	...group(aiPatterns, aiPatternsVue, aiPatternsSvelte, "ai-patterns"),
	...group(aiUtilities, aiUtilitiesVue, aiUtilitiesSvelte, "ai-utilities"),
	...themes,
];
