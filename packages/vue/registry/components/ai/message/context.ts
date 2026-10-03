// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { UIMessage } from "ai";
import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";

export interface MessageContextType {
	from: Ref<UIMessage["role"]>;
}

export const MessageKey: InjectionKey<MessageContextType> = Symbol("Message");

export function useMessageContext(): MessageContextType | null {
	return inject(MessageKey, null);
}

export interface MessageBranchContextType {
	currentBranch: Readonly<Ref<number>>;
	totalBranches: Readonly<Ref<number>>;
	goToPrevious: () => void;
	goToNext: () => void;
	setBranches: (count: number) => void;
}

export const MessageBranchKey: InjectionKey<MessageBranchContextType> =
	Symbol("MessageBranch");

export function useMessageBranchContext(): MessageBranchContextType {
	const ctx = inject(MessageBranchKey);
	if (!ctx) {
		throw new Error(
			"MessageBranch components must be used within MessageBranch",
		);
	}
	return ctx;
}
