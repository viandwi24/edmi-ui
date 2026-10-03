<script lang="ts">
	import { Transcription, TranscriptionSegment } from "@edmi-svelte/ai/transcription";
	import { onDestroy } from "svelte";

	// Segments as the AI SDK `transcribe()` returns them.
	const lines = [
		"So the keeper checks drift",
		"every hour,",
		"and when NVDAx is more than two percent",
		"over its weight",
		"it asks you to approve a rebalance.",
	];
	const segments = lines.map((text, i) => ({ text, startSecond: i * 2.4, endSecond: (i + 1) * 2.4 }));

	let time = $state(4);
	let playing = $state(false);
	let raf = 0;

	// Stand-in for an <audio> element's `timeupdate`: advance the clock while playing.
	$effect(() => {
		if (!playing) return;
		let last = performance.now();
		const tick = (now: number) => {
			time = (time + (now - last) / 1000) % 12;
			last = now;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
	onDestroy(() => cancelAnimationFrame(raf));
</script>

<div class="flex w-full max-w-xl flex-col gap-3">
	<button
		type="button"
		class="self-start rounded-md border border-border px-3 py-1 text-sm hover:bg-accent"
		onclick={() => (playing = !playing)}
	>
		{playing ? "Pause" : "Play"} · <span class="font-mono">{time.toFixed(1)}s</span>
	</button>
	<Transcription {segments} bind:currentTime={time} onSeek={() => {}}>
		{#snippet children(segment, index)}
			<TranscriptionSegment {segment} {index} />
		{/snippet}
	</Transcription>
</div>
