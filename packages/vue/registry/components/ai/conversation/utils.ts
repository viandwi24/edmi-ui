import type { UIMessage } from "ai";

export function getMessageText(message: UIMessage): string {
	return message.parts
		.filter((part) => part.type === "text")
		.map((part) => part.text)
		.join("");
}

export function defaultFormatMessage(message: UIMessage): string {
	const roleLabel =
		message.role.charAt(0).toUpperCase() + message.role.slice(1);
	return `**${roleLabel}:** ${getMessageText(message)}`;
}

export function messagesToMarkdown(
	messages: UIMessage[],
	formatMessage: (
		message: UIMessage,
		index: number,
	) => string = defaultFormatMessage,
): string {
	return messages.map((msg, i) => formatMessage(msg, i)).join("\n\n");
}
