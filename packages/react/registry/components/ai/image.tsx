import type { Experimental_GeneratedImage } from "ai";
import { cn } from "cn";

export type ImageProps = Experimental_GeneratedImage & {
	className?: string;
	alt?: string;
};

/** AI SDK generated image as a responsive `img` (base64 + media type). Loading state belongs to the parent. */
export const Image = ({
	base64,
	uint8Array: _uint8Array,
	mediaType,
	...props
}: ImageProps) => (
	<img
		data-slot="ai-image"
		{...props}
		alt={props.alt}
		className={cn(
			"h-auto max-w-full overflow-hidden rounded-xl border border-border",
			props.className,
		)}
		src={`data:${mediaType};base64,${base64}`}
	/>
);
