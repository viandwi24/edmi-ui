<script lang="ts">
	import type { Experimental_SpeechResult as SpeechResult } from "ai";
	import type { HTMLAudioAttributes } from "svelte/elements";

	// Pass `src`, or `data` (an AI SDK speech result). Captions are provided by the consumer.
	let {
		src,
		data,
		...restProps
	}: Omit<HTMLAudioAttributes, "src"> & {
		src?: string;
		data?: SpeechResult["audio"];
	} = $props();

	const audioSrc = $derived(
		src ?? (data ? `data:${data.mediaType};base64,${data.base64}` : undefined)
	);
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<audio
	data-slot="ai-audio-player-element"
	src={audioSrc}
	{...restProps}
	{...{ slot: "media" }}
></audio>
