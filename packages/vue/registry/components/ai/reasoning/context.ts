// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { InjectionKey, Ref } from "vue"
import { inject } from "vue"

export interface ReasoningContextValue {
  isStreaming: Ref<boolean>
  isOpen: Ref<boolean>
  setIsOpen: (open: boolean) => void
  duration: Ref<number | undefined>
}

export const ReasoningKey: InjectionKey<ReasoningContextValue> = Symbol("ReasoningContext")

export function useReasoningContext() {
  const ctx = inject(ReasoningKey)
  if (!ctx)
    throw new Error("Reasoning components must be used within <Reasoning>")
  return ctx
}
