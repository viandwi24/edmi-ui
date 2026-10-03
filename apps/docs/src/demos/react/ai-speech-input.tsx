import { SpeechInput } from "@edmi-react/components/ai/speech-input";
import { useState } from "react";

export default function Demo() {
	const [text, setText] = useState("");
	return (
		<div className="flex flex-col items-start gap-3">
			<div className="flex items-center gap-3">
				<SpeechInput
					onTranscriptionChange={(t) =>
						setText((prev) => `${prev} ${t}`.trim())
					}
					// Browsers without the Web Speech API (Firefox) record and call this to transcribe.
					onAudioRecorded={async () => "Rebalance MAG4 when drift is above 2%."}
				/>
				<span className="text-xs text-muted-foreground">
					Click to dictate (Chrome, Edge, Safari) or record.
				</span>
			</div>
			<p className="min-h-5 text-sm">{text}</p>
		</div>
	);
}
