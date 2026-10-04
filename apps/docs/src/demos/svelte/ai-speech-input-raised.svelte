<script lang="ts">
	import { SpeechInput } from "@edmi-svelte/ai/speech-input";

	const noop = async () => "";
	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex items-center gap-3">
				<SpeechInput elevation={level.value} onAudioRecorded={noop} />
				<SpeechInput elevation={level.value} variant="default" onAudioRecorded={noop} />
			</div>
		</div>
	{/each}
</div>
