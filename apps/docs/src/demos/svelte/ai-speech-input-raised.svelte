<script lang="ts">
	import { SpeechInput } from "@edmi-svelte/ai/speech-input";

	const noop = async () => "";
</script>

<div class="flex items-center gap-3">
	<SpeechInput raised onAudioRecorded={noop} />
	<SpeechInput raised variant="default" onAudioRecorded={noop} />
</div>
