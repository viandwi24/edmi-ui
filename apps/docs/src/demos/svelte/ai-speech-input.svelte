<script lang="ts">
	import { SpeechInput } from "@edmi-svelte/ai/speech-input";

	let text = $state("");
	// Browsers without the Web Speech API (Firefox) record and call this to transcribe.
	const transcribe = async () => "Rebalance MAG4 when drift is above 2%.";
</script>

<div class="flex flex-col items-start gap-3">
	<div class="flex items-center gap-3">
		<SpeechInput
			onTranscriptionChange={(t) => (text = `${text} ${t}`.trim())}
			onAudioRecorded={transcribe}
		/>
		<span class="text-xs text-muted-foreground">Click to dictate (Chrome, Edge, Safari) or record.</span>
	</div>
	<p class="min-h-5 text-sm">{text}</p>
</div>
