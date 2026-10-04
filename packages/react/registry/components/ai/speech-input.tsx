"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import { Spinner } from "@/registry/edmi/ui/spinner";

// Built on ui/button (DESIGN §5b): outline icon button; listening = brand fill with a solid soft ring and
// two pulsing outlines, processing = spinner. `raised` is forwarded to the Button.

interface SpeechRecognition extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start(): void;
	stop(): void;
	onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
	onend: ((this: SpeechRecognition, ev: Event) => void) | null;
	onresult:
		| ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
		| null;
	onerror:
		| ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
		| null;
}

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
	resultIndex: number;
}

interface SpeechRecognitionResultList {
	readonly length: number;
	item(index: number): SpeechRecognitionResult;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	readonly length: number;
	item(index: number): SpeechRecognitionAlternative;
	[index: number]: SpeechRecognitionAlternative;
	isFinal: boolean;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
	error: string;
}

declare global {
	interface Window {
		SpeechRecognition: new () => SpeechRecognition;
		webkitSpeechRecognition: new () => SpeechRecognition;
	}
}

type SpeechInputMode = "speech-recognition" | "media-recorder" | "none";

export type SpeechInputProps = ComponentProps<typeof Button> & {
	onTranscriptionChange?: (text: string) => void;
	/**
	 * Callback for when audio is recorded using MediaRecorder fallback.
	 * This is called in browsers that don't support the Web Speech API (Firefox, Safari).
	 * The callback receives an audio Blob that should be sent to a transcription service.
	 * Return the transcribed text, which will be passed to onTranscriptionChange.
	 */
	onAudioRecorded?: (audioBlob: Blob) => Promise<string>;
	lang?: string;
};

const detectSpeechInputMode = (): SpeechInputMode => {
	if (typeof window === "undefined") {
		return "none";
	}

	if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
		return "speech-recognition";
	}

	if ("MediaRecorder" in window && "mediaDevices" in navigator) {
		return "media-recorder";
	}

	return "none";
};

export const SpeechInput = ({
	className,
	variant = "outline",
	size = "icon",
	raised = false,
	onTranscriptionChange,
	onAudioRecorded,
	lang = "en-US",
	...props
}: SpeechInputProps) => {
	const [isListening, setIsListening] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [mode] = useState<SpeechInputMode>(detectSpeechInputMode);
	const [isRecognitionReady, setIsRecognitionReady] = useState(false);
	const recognitionRef = useRef<SpeechRecognition | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const onTranscriptionChangeRef = useRef<
		SpeechInputProps["onTranscriptionChange"]
	>(onTranscriptionChange);
	const onAudioRecordedRef =
		useRef<SpeechInputProps["onAudioRecorded"]>(onAudioRecorded);

	// Keep refs in sync
	onTranscriptionChangeRef.current = onTranscriptionChange;
	onAudioRecordedRef.current = onAudioRecorded;

	// Initialize Speech Recognition when mode is speech-recognition
	useEffect(() => {
		if (mode !== "speech-recognition") {
			return;
		}

		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		const speechRecognition = new SpeechRecognition();

		speechRecognition.continuous = true;
		speechRecognition.interimResults = true;
		speechRecognition.lang = lang;

		const handleStart = () => {
			setIsListening(true);
		};

		const handleEnd = () => {
			setIsListening(false);
		};

		const handleResult = (event: Event) => {
			const speechEvent = event as SpeechRecognitionEvent;
			let finalTranscript = "";

			for (
				let i = speechEvent.resultIndex;
				i < speechEvent.results.length;
				i += 1
			) {
				const result = speechEvent.results[i];
				if (result.isFinal) {
					finalTranscript += result[0]?.transcript ?? "";
				}
			}

			if (finalTranscript) {
				onTranscriptionChangeRef.current?.(finalTranscript);
			}
		};

		const handleError = () => {
			setIsListening(false);
		};

		speechRecognition.addEventListener("start", handleStart);
		speechRecognition.addEventListener("end", handleEnd);
		speechRecognition.addEventListener("result", handleResult);
		speechRecognition.addEventListener("error", handleError);

		recognitionRef.current = speechRecognition;
		setIsRecognitionReady(true);

		return () => {
			speechRecognition.removeEventListener("start", handleStart);
			speechRecognition.removeEventListener("end", handleEnd);
			speechRecognition.removeEventListener("result", handleResult);
			speechRecognition.removeEventListener("error", handleError);
			speechRecognition.stop();
			recognitionRef.current = null;
			setIsRecognitionReady(false);
		};
	}, [mode, lang]);

	// Cleanup MediaRecorder and stream on unmount
	useEffect(
		() => () => {
			if (mediaRecorderRef.current?.state === "recording") {
				mediaRecorderRef.current.stop();
			}
			if (streamRef.current) {
				for (const track of streamRef.current.getTracks()) {
					track.stop();
				}
			}
		},
		[],
	);

	// Start MediaRecorder recording
	const startMediaRecorder = useCallback(async () => {
		if (!onAudioRecordedRef.current) {
			return;
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = stream;
			const mediaRecorder = new MediaRecorder(stream);
			audioChunksRef.current = [];

			const handleDataAvailable = (event: BlobEvent) => {
				if (event.data.size > 0) {
					audioChunksRef.current.push(event.data);
				}
			};

			const handleStop = async () => {
				for (const track of stream.getTracks()) {
					track.stop();
				}
				streamRef.current = null;

				const audioBlob = new Blob(audioChunksRef.current, {
					type: "audio/webm",
				});

				if (audioBlob.size > 0 && onAudioRecordedRef.current) {
					setIsProcessing(true);
					try {
						const transcript = await onAudioRecordedRef.current(audioBlob);
						if (transcript) {
							onTranscriptionChangeRef.current?.(transcript);
						}
					} catch {
						// Error handling delegated to the onAudioRecorded caller
					} finally {
						setIsProcessing(false);
					}
				}
			};

			const handleError = () => {
				setIsListening(false);
				for (const track of stream.getTracks()) {
					track.stop();
				}
				streamRef.current = null;
			};

			mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
			mediaRecorder.addEventListener("stop", handleStop);
			mediaRecorder.addEventListener("error", handleError);

			mediaRecorderRef.current = mediaRecorder;
			mediaRecorder.start();
			setIsListening(true);
		} catch {
			setIsListening(false);
		}
	}, []);

	// Stop MediaRecorder recording
	const stopMediaRecorder = useCallback(() => {
		if (mediaRecorderRef.current?.state === "recording") {
			mediaRecorderRef.current.stop();
		}
		setIsListening(false);
	}, []);

	const toggleListening = useCallback(() => {
		if (mode === "speech-recognition" && recognitionRef.current) {
			if (isListening) {
				recognitionRef.current.stop();
			} else {
				recognitionRef.current.start();
			}
		} else if (mode === "media-recorder") {
			if (isListening) {
				stopMediaRecorder();
			} else {
				startMediaRecorder();
			}
		}
	}, [mode, isListening, startMediaRecorder, stopMediaRecorder]);

	// Determine if button should be disabled
	const isDisabled =
		mode === "none" ||
		(mode === "speech-recognition" && !isRecognitionReady) ||
		(mode === "media-recorder" && !onAudioRecorded) ||
		isProcessing;

	return (
		<div
			data-slot="ai-speech-input"
			data-state={
				isProcessing ? "processing" : isListening ? "listening" : "idle"
			}
			className="relative inline-flex items-center justify-center"
		>
			{/* Pulsing outlines while listening */}
			{isListening &&
				[0, 1].map((index) => (
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 animate-ping rounded-md border-2 border-brand"
						key={index}
						style={{
							animationDelay: `${index * 0.5}s`,
							animationDuration: "2s",
						}}
					/>
				))}

			<Button
				aria-label={isListening ? "Stop dictation" : "Start dictation"}
				aria-pressed={isListening}
				className={cn(
					"relative z-10",
					isListening &&
						!raised &&
						"shadow-[0_0_0_5px_color-mix(in_srgb,var(--brand)_22%,var(--background))]",
					className,
				)}
				disabled={isDisabled}
				onClick={toggleListening}
				raised={raised}
				size={size}
				variant={isListening ? "brand" : variant}
				{...props}
			>
				{isProcessing && <Spinner />}
				{!isProcessing && isListening && (
					<IconPlaceholder
						lucide="SquareIcon"
						tabler="IconPlayerStopFilled"
						hugeicons="StopIcon"
						phosphor="StopIcon"
						remixicon="RiStopFill"
						className="size-3.5"
					/>
				)}
				{!(isProcessing || isListening) && (
					<IconPlaceholder
						lucide="MicIcon"
						tabler="IconMicrophone"
						hugeicons="VoiceIcon"
						phosphor="MicrophoneIcon"
						remixicon="RiMicLine"
						className="size-4"
					/>
				)}
			</Button>
		</div>
	);
};
