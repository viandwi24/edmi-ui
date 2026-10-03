import Root from "./open-in.svelte";
import Content from "./open-in-content.svelte";
import Item from "./open-in-item.svelte";
import Label from "./open-in-label.svelte";
import Separator from "./open-in-separator.svelte";
import Trigger from "./open-in-trigger.svelte";
import OpenInChatGPT from "./open-in-chatgpt.svelte";
import OpenInClaude from "./open-in-claude.svelte";
import OpenInCursor from "./open-in-cursor.svelte";
import OpenInScira from "./open-in-scira.svelte";
import OpenInT3 from "./open-in-t3.svelte";
import OpenInv0 from "./open-in-v0.svelte";
import OpenInGitHub from "./open-in-github.svelte";

export { providers, type ProviderConfig, type ProviderKey } from "./providers.js";

export {
	Content,
	Content as OpenInContent,
	Item,
	Item as OpenInItem,
	Label,
	Label as OpenInLabel,
	Root,
	//
	Root as OpenIn,
	Separator,
	Separator as OpenInSeparator,
	Trigger,
	Trigger as OpenInTrigger,
	OpenInChatGPT,
	OpenInClaude,
	OpenInCursor,
	OpenInScira,
	OpenInT3,
	OpenInv0,
	OpenInGitHub,
};
