import Root from "./message.svelte";
import Action from "./message-action.svelte";
import Actions from "./message-actions.svelte";
import Branch from "./message-branch.svelte";
import BranchContent from "./message-branch-content.svelte";
import BranchNext from "./message-branch-next.svelte";
import BranchPage from "./message-branch-page.svelte";
import BranchPrevious from "./message-branch-previous.svelte";
import BranchSelector from "./message-branch-selector.svelte";
import Content from "./message-content.svelte";
import Response from "./message-response.svelte";
import Toolbar from "./message-toolbar.svelte";

// Opt-in (multi-agent): same parts as ui/message, the avatar aligns to the name line.
export {
	MessageAvatar,
	MessageHeader,
} from "$lib/registry/ui/message/index.js";
export * from "./use-message.svelte.js";
export {
	Action,
	Action as MessageAction,
	Actions,
	Actions as MessageActions,
	Branch,
	Branch as MessageBranch,
	BranchContent,
	BranchContent as MessageBranchContent,
	BranchNext,
	BranchNext as MessageBranchNext,
	BranchPage,
	BranchPage as MessageBranchPage,
	BranchPrevious,
	BranchPrevious as MessageBranchPrevious,
	BranchSelector,
	BranchSelector as MessageBranchSelector,
	Content,
	Content as MessageContent,
	Response,
	Response as MessageResponse,
	Root,
	//
	Root as Message,
	Toolbar,
	Toolbar as MessageToolbar,
};
