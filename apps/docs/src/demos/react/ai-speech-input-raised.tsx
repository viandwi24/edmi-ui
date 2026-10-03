import { SpeechInput } from "@edmi-react/components/ai/speech-input";

export default function Demo() {
	return (
		<div className="flex items-center gap-3">
			<SpeechInput raised onAudioRecorded={async () => ""} />
			<SpeechInput raised variant="default" onAudioRecorded={async () => ""} />
		</div>
	);
}
