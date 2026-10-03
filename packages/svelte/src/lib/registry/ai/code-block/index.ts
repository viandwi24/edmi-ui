import {
	Root as Select,
	Content as SelectContent,
	Item as SelectItem,
	Value as SelectValue,
} from "$lib/registry/ui/select/index.js";
import Root from "./code-block.svelte";
import Actions from "./code-block-actions.svelte";
import Content from "./code-block-content.svelte";
import CopyButton from "./code-block-copy-button.svelte";
import Filename from "./code-block-filename.svelte";
import Header from "./code-block-header.svelte";
import LanguageSelectorTrigger from "./code-block-language-selector-trigger.svelte";
import Title from "./code-block-title.svelte";

export { useCodeBlockContext } from "./use-code-block.svelte.js";
export { highlightCode } from "./utils.js";

export {
	Actions as CodeBlockActions,
	Content as CodeBlockContent,
	CopyButton as CodeBlockCopyButton,
	Filename as CodeBlockFilename,
	Header as CodeBlockHeader,
	LanguageSelectorTrigger as CodeBlockLanguageSelectorTrigger,
	Root as CodeBlock,
	Select as CodeBlockLanguageSelector,
	SelectContent as CodeBlockLanguageSelectorContent,
	SelectItem as CodeBlockLanguageSelectorItem,
	SelectValue as CodeBlockLanguageSelectorValue,
	Title as CodeBlockTitle,
};
