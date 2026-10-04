<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import { cn } from "$lib/utils.js";
	import { onDestroy, onMount } from "svelte";

	// Built on ui/button (DESIGN §5b): outline icon button; listening = brand fill with a solid soft ring and
	// two pulsing outlines, processing = spinner. `raised` is forwarded to the Button.
	let {
		class: className,
		variant = "outline",
		size = "icon",
		raised = false,
		disabled = false,
		lang = "en-US",
		onTranscriptionChange,
		onAudioRecorded,
		...restProps
	}: Omit<ButtonProps, "onclick" | "href"> & {
		onTranscriptionChange?: (text: string) => void;
		/** legacy prop, forwarded as `elevation="raised"` (the AI pack migration renames it) */
		raised?: boolean;
		/**
		 * MediaRecorder fallback for browsers without the Web Speech API (Firefox): receives the recorded audio
		 * and returns the transcript, which is passed to `onTranscriptionChange`.
		 */
		onAudioRecorded?: (audioBlob: Blob) => Promise<string>;
		lang?: string;
	} = $props();

	interface SpeechRecognitionInstance extends EventTarget {
		continuous: boolean;
		interimResults: boolean;
		lang: string;
		start: () => void;
		stop: () => void;
	}
	interface SpeechRecognitionResultCustom {
		readonly length: number;
		[index: number]: { transcript: string; confidence: number };
		isFinal: boolean;
	}
	interface SpeechRecognitionEventCustom extends Event {
		results: ArrayLike<SpeechRecognitionResultCustom>;
		resultIndex: number;
	}
	type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;
	type SpeechInputMode = "speech-recognition" | "media-recorder" | "none";

	let isListening = $state(false);
	let isProcessing = $state(false);
	let mode = $state<SpeechInputMode>("none");
	let recognition = $state<SpeechRecognitionInstance | null>(null);
	let mediaRecorder: MediaRecorder | null = null;
	let mediaStream: MediaStream | null = null;
	let audioChunks: Blob[] = [];

	function detectMode(): SpeechInputMode {
		if (typeof window === "undefined") return "none";
		if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
			return "speech-recognition";
		if ("MediaRecorder" in window && "mediaDevices" in navigator) return "media-recorder";
		return "none";
	}

	onMount(() => {
		mode = detectMode();
	});

	// Create the recognizer when the mode or the language changes.
	$effect(() => {
		if (mode !== "speech-recognition") return;
		const w = window as unknown as Record<string, SpeechRecognitionConstructor | undefined>;
		const Ctor = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as SpeechRecognitionConstructor;
		const speechRecognition = new Ctor();
		speechRecognition.continuous = true;
		speechRecognition.interimResults = true;
		speechRecognition.lang = lang;

		const onStart = () => (isListening = true);
		const onEnd = () => (isListening = false);
		const onResult = (event: Event) => {
			const speechEvent = event as SpeechRecognitionEventCustom;
			let finalTranscript = "";
			for (let i = speechEvent.resultIndex; i < speechEvent.results.length; i += 1) {
				const result = speechEvent.results[i];
				if (result?.isFinal) finalTranscript += result[0]?.transcript ?? "";
			}
			if (finalTranscript) onTranscriptionChange?.(finalTranscript);
		};
		speechRecognition.addEventListener("start", onStart);
		speechRecognition.addEventListener("end", onEnd);
		speechRecognition.addEventListener("error", onEnd);
		speechRecognition.addEventListener("result", onResult);
		recognition = speechRecognition;

		return () => {
			speechRecognition.removeEventListener("start", onStart);
			speechRecognition.removeEventListener("end", onEnd);
			speechRecognition.removeEventListener("error", onEnd);
			speechRecognition.removeEventListener("result", onResult);
			speechRecognition.stop();
			recognition = null;
		};
	});

	function releaseStream() {
		if (mediaStream) {
			for (const track of mediaStream.getTracks()) track.stop();
			mediaStream = null;
		}
	}

	onDestroy(() => {
		if (mediaRecorder?.state === "recording") mediaRecorder.stop();
		releaseStream();
	});

	async function startMediaRecorder() {
		if (!onAudioRecorded) return;
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaStream = stream;
			const recorder = new MediaRecorder(stream);
			audioChunks = [];
			recorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) audioChunks.push(event.data);
			});
			recorder.addEventListener("stop", async () => {
				releaseStream();
				const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
				if (audioBlob.size > 0 && onAudioRecorded) {
					isProcessing = true;
					try {
						const transcript = await onAudioRecorded(audioBlob);
						if (transcript) onTranscriptionChange?.(transcript);
					} catch {
						// Error handling is delegated to the onAudioRecorded caller
					} finally {
						isProcessing = false;
					}
				}
			});
			recorder.addEventListener("error", () => {
				isListening = false;
				releaseStream();
			});
			mediaRecorder = recorder;
			recorder.start();
			isListening = true;
		} catch {
			isListening = false;
		}
	}

	function stopMediaRecorder() {
		if (mediaRecorder?.state === "recording") mediaRecorder.stop();
		isListening = false;
	}

	function toggleListening() {
		if (mode === "speech-recognition" && recognition) {
			if (isListening) recognition.stop();
			else recognition.start();
		} else if (mode === "media-recorder") {
			if (isListening) stopMediaRecorder();
			else startMediaRecorder();
		}
	}

	const isDisabled = $derived(
		disabled ||
			mode === "none" ||
			(mode === "speech-recognition" && !recognition) ||
			(mode === "media-recorder" && !onAudioRecorded) ||
			isProcessing
	);
	const stateName = $derived(isProcessing ? "processing" : isListening ? "listening" : "idle");
</script>

<div
	data-slot="ai-speech-input"
	data-state={stateName}
	class="relative inline-flex items-center justify-center"
>
	<!-- Pulsing outlines while listening -->
	{#if isListening}
		{#each [0, 1] as index (index)}
			<span
				aria-hidden="true"
				class="pointer-events-none absolute inset-0 animate-ping rounded-md border-2 border-brand"
				style="animation-delay: {index * 0.5}s; animation-duration: 2s;"
			></span>
		{/each}
	{/if}

	<Button
		aria-label={isListening ? "Stop dictation" : "Start dictation"}
		aria-pressed={isListening}
		variant={isListening ? "brand" : variant}
		{size}
		elevation={raised ? "raised" : undefined}
		disabled={isDisabled}
		class={cn(
			"relative z-10",
			isListening &&
				!raised &&
				"shadow-[0_0_0_5px_color-mix(in_srgb,var(--brand)_22%,var(--background))]",
			className
		)}
		onclick={toggleListening}
		{...restProps}
	>
		{#if isProcessing}
			<Spinner />
		{:else if isListening}
			<IconPlaceholder
				lucide="SquareIcon"
				tabler="IconPlayerStopFilled"
				hugeicons="StopIcon"
				phosphor="StopIcon"
				remixicon="RiStopFill"
				class="size-3.5"
			/>
		{:else}
			<IconPlaceholder
				lucide="MicIcon"
				tabler="IconMicrophone"
				hugeicons="VoiceIcon"
				phosphor="MicrophoneIcon"
				remixicon="RiMicLine"
				class="size-4"
			/>
		{/if}
	</Button>
</div>
