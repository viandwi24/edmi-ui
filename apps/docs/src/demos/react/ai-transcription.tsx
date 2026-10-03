import {
	Transcription,
	TranscriptionSegment,
} from "@edmi-react/components/ai/transcription";
import { useEffect, useRef, useState } from "react";

// Segments as the AI SDK `transcribe()` returns them.
const words = [
	"So the keeper checks drift",
	"every hour,",
	"and when NVDAx is more than two percent",
	"over its weight",
	"it asks you to approve a rebalance.",
];
const segments = words.map((text, i) => ({
	text,
	startSecond: i * 2.4,
	endSecond: (i + 1) * 2.4,
}));

export default function Demo() {
	const [time, setTime] = useState(4);
	const [playing, setPlaying] = useState(false);
	const raf = useRef(0);

	// Stand-in for an <audio> element's `timeupdate`: advance the clock while playing.
	useEffect(() => {
		if (!playing) return;
		let last = performance.now();
		const tick = (now: number) => {
			setTime((t) => (t + (now - last) / 1000) % 12);
			last = now;
			raf.current = requestAnimationFrame(tick);
		};
		raf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf.current);
	}, [playing]);

	return (
		<div className="flex w-full max-w-xl flex-col gap-3">
			<button
				className="self-start rounded-md border border-border px-3 py-1 text-sm hover:bg-accent"
				onClick={() => setPlaying((p) => !p)}
				type="button"
			>
				{playing ? "Pause" : "Play"} ·{" "}
				<span className="font-mono">{time.toFixed(1)}s</span>
			</button>
			<Transcription currentTime={time} onSeek={setTime} segments={segments}>
				{(segment, index) => (
					<TranscriptionSegment index={index} key={index} segment={segment} />
				)}
			</Transcription>
		</div>
	);
}
