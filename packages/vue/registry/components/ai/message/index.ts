// Opt-in (multi-agent): same parts as ui/message, the avatar aligns to the name line.
// Imported then re-exported: the shadcn-vue CLI only rewrites `import` specifiers, not `export ... from`.
import { MessageAvatar, MessageHeader } from "@/registry/edmi/ui/message";
export { MessageAvatar, MessageHeader };
export * from "./context";
export { default as Message } from "./Message.vue";
export { default as MessageAction } from "./MessageAction.vue";
export { default as MessageActions } from "./MessageActions.vue";
export { default as MessageBranch } from "./MessageBranch.vue";
export { default as MessageBranchContent } from "./MessageBranchContent.vue";
export { default as MessageBranchNext } from "./MessageBranchNext.vue";
export { default as MessageBranchPage } from "./MessageBranchPage.vue";
export { default as MessageBranchPrevious } from "./MessageBranchPrevious.vue";
export { default as MessageBranchSelector } from "./MessageBranchSelector.vue";
export { default as MessageContent } from "./MessageContent.vue";
export { default as MessageResponse } from "./MessageResponse.vue";
export { default as MessageToolbar } from "./MessageToolbar.vue";
