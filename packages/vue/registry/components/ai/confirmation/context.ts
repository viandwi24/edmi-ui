import type { ToolUIPart } from "ai";
import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";
import type { Elevation } from "@/registry/edmi/ui/elevation";

export type ToolUIPartApproval =
	| {
			id: string;
			approved?: never;
			reason?: never;
	  }
	| {
			id: string;
			approved: boolean;
			reason?: string;
	  }
	| undefined;

export interface ConfirmationContextValue {
	approval: Ref<ToolUIPartApproval>;
	state: Ref<ToolUIPart["state"]>;
	elevation: Ref<Elevation | undefined>;
}

export const ConfirmationKey: InjectionKey<ConfirmationContextValue> = Symbol(
	"ConfirmationContext",
);

export function useConfirmationContext() {
	const context = inject(ConfirmationKey);
	if (!context)
		throw new Error(
			"Confirmation components must be used within <Confirmation>",
		);
	return context;
}
