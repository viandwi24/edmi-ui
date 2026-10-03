import Root from "./open-in.svelte";
import OpenInChatGPT from "./open-in-chatgpt.svelte";
import OpenInClaude from "./open-in-claude.svelte";
import Content from "./open-in-content.svelte";
import OpenInCursor from "./open-in-cursor.svelte";
import OpenInGitHub from "./open-in-github.svelte";
import Item from "./open-in-item.svelte";
import Label from "./open-in-label.svelte";
import OpenInScira from "./open-in-scira.svelte";
import Separator from "./open-in-separator.svelte";
import OpenInT3 from "./open-in-t3.svelte";
import Trigger from "./open-in-trigger.svelte";
import OpenInv0 from "./open-in-v0.svelte";

export {
	type ProviderConfig,
	type ProviderKey,
	providers,
} from "./providers.js";

export {
	Content,
	Content as OpenInContent,
	Item,
	Item as OpenInItem,
	Label,
	Label as OpenInLabel,
	OpenInChatGPT,
	OpenInClaude,
	OpenInCursor,
	OpenInGitHub,
	OpenInScira,
	OpenInT3,
	OpenInv0,
	Root,
	//
	Root as OpenIn,
	Separator,
	Separator as OpenInSeparator,
	Trigger,
	Trigger as OpenInTrigger,
};
