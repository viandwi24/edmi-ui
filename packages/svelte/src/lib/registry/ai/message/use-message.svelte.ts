// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { UIMessage } from "ai";
import { getContext, setContext } from "svelte";

export type MessageRole = UIMessage["role"];

/** Getter object so consumers stay reactive when `from` changes. */
export interface MessageContextValue {
	readonly from: MessageRole;
}

const MESSAGE_KEY = Symbol("ai-message");
const BRANCH_KEY = Symbol("ai-message-branch");

export function setMessageContext(value: MessageContextValue) {
	return setContext(MESSAGE_KEY, value);
}

export function useMessageContext(): MessageContextValue | undefined {
	return getContext<MessageContextValue | undefined>(MESSAGE_KEY);
}

export class MessageBranchController {
	currentBranch = $state(0);
	totalBranches = $state(0);
	#onChange?: (index: number) => void;

	constructor(defaultBranch = 0, onChange?: (index: number) => void) {
		this.currentBranch = defaultBranch;
		this.#onChange = onChange;
	}

	setOnChange(onChange?: (index: number) => void) {
		this.#onChange = onChange;
	}

	setTotalBranches(count: number) {
		this.totalBranches = Math.max(0, count);
		if (this.totalBranches > 0 && this.currentBranch >= this.totalBranches) {
			this.currentBranch = this.totalBranches - 1;
		}
	}

	#go(index: number) {
		this.currentBranch = index;
		this.#onChange?.(index);
	}

	goToPrevious() {
		if (this.totalBranches <= 1) return;
		this.#go(
			this.currentBranch > 0 ? this.currentBranch - 1 : this.totalBranches - 1,
		);
	}

	goToNext() {
		if (this.totalBranches <= 1) return;
		this.#go(
			this.currentBranch < this.totalBranches - 1 ? this.currentBranch + 1 : 0,
		);
	}
}

export function setMessageBranchContext(controller: MessageBranchController) {
	return setContext(BRANCH_KEY, controller);
}

export function useMessageBranch(): MessageBranchController {
	const ctx = getContext<MessageBranchController | undefined>(BRANCH_KEY);
	if (!ctx) {
		throw new Error(
			"MessageBranch components must be used within MessageBranch",
		);
	}
	return ctx;
}
