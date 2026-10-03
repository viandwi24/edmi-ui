import { useEffect, useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	AudioPlayer,
	AudioPlayerControlBar,
	AudioPlayerDurationDisplay,
	AudioPlayerElement,
	AudioPlayerMuteButton,
	AudioPlayerPlayButton,
	AudioPlayerSeekBackwardButton,
	AudioPlayerSeekForwardButton,
	AudioPlayerTimeDisplay,
	AudioPlayerTimeRange,
	AudioPlayerVolumeRange,
} from "@/registry/edmi/components/ai/audio-player";
import {
	MicSelector,
	MicSelectorContent,
	MicSelectorEmpty,
	MicSelectorInput,
	MicSelectorItem,
	MicSelectorLabel,
	MicSelectorList,
	MicSelectorTrigger,
	MicSelectorValue,
} from "@/registry/edmi/components/ai/mic-selector";
import {
	Persona,
	type PersonaState,
} from "@/registry/edmi/components/ai/persona";
import { SpeechInput } from "@/registry/edmi/components/ai/speech-input";
import {
	Transcription,
	TranscriptionSegment,
} from "@/registry/edmi/components/ai/transcription";
import {
	VoiceSelector,
	VoiceSelectorAccent,
	VoiceSelectorAge,
	VoiceSelectorAttributes,
	VoiceSelectorBullet,
	VoiceSelectorContent,
	VoiceSelectorDescription,
	VoiceSelectorDetails,
	VoiceSelectorEmpty,
	VoiceSelectorGender,
	VoiceSelectorGroup,
	VoiceSelectorHeader,
	VoiceSelectorInput,
	VoiceSelectorItem,
	VoiceSelectorList,
	VoiceSelectorName,
	VoiceSelectorPreview,
	VoiceSelectorSeparator,
	VoiceSelectorTrigger,
} from "@/registry/edmi/components/ai/voice-selector";
import { Button } from "@/registry/edmi/ui/button";
import { RaisedSection } from "./_raised";

const Label = ({ children }: { children: string }) => (
	<p className="mb-3 font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
		{children}
	</p>
);

function makeClip(seconds: number) {
	const rate = 8000;
	const n = rate * seconds;
	const buf = new ArrayBuffer(44 + n);
	const v = new DataView(buf);
	const text = (o: number, s: string) => {
		for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
	};
	text(0, "RIFF");
	v.setUint32(4, 36 + n, true);
	text(8, "WAVEfmt ");
	v.setUint32(16, 16, true);
	v.setUint16(20, 1, true);
	v.setUint16(22, 1, true);
	v.setUint32(24, rate, true);
	v.setUint32(28, rate, true);
	v.setUint16(32, 1, true);
	v.setUint16(34, 8, true);
	text(36, "data");
	v.setUint32(40, n, true);
	for (let i = 0; i < n; i++) {
		const t = i / rate;
		v.setUint8(44 + i, 128 + 14 * Math.sin(2 * Math.PI * 220 * t));
	}
	return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

const device = (deviceId: string, label: string) =>
	({
		deviceId,
		groupId: deviceId,
		kind: "audioinput",
		label,
		toJSON: () => ({}),
	}) as MediaDeviceInfo;
const devices = [
	device("builtin", "MacBook Pro Microphone (05ac:8104)"),
	device("airpods", "AirPods Pro (1a2b:3c4d)"),
	device("shure", "Shure MV7 (14ed:1012)"),
];
const Mic = () => (
	<IconPlaceholder
		lucide="MicIcon"
		tabler="IconMicrophone"
		hugeicons="VoiceIcon"
		phosphor="MicrophoneIcon"
		remixicon="RiMicLine"
		className="size-4 shrink-0"
	/>
);

const lines = [
	"So the keeper checks drift",
	"every hour,",
	"and when NVDAx is more than two percent",
	"over its weight",
	"it asks you to approve a rebalance.",
];
const segments = lines.map((text, i) => ({
	text,
	startSecond: i * 2.4,
	endSecond: (i + 1) * 2.4,
}));

const voices = [
	[
		"aria",
		"Aria",
		"female",
		"american",
		"young",
		"Warm, clear. Good for explainers.",
		"Recommended",
	],
	[
		"theo",
		"Theo",
		"male",
		"british",
		"middle-aged",
		"Calm and precise.",
		"Recommended",
	],
	[
		"priya",
		"Priya",
		"female",
		"indian",
		"young",
		"Bright and friendly.",
		"All voices",
	],
] as const;

const states: PersonaState[] = [
	"idle",
	"listening",
	"thinking",
	"speaking",
	"asleep",
];

export default function AiVoicePreview() {
	const [src, setSrc] = useState<string>();
	const [mic, setMic] = useState<string | undefined>("builtin");
	const [voice, setVoice] = useState<string | undefined>("aria");
	useEffect(() => {
		const url = makeClip(42);
		setSrc(url);
		return () => URL.revokeObjectURL(url);
	}, []);

	return (
		<div className="flex max-w-3xl flex-col gap-12">
			<section>
				<Label>Audio player</Label>
				<div className="flex flex-col gap-3">
					<AudioPlayer className="max-w-[620px]">
						{src && <AudioPlayerElement src={src} />}
						<AudioPlayerControlBar>
							<AudioPlayerSeekBackwardButton />
							<AudioPlayerPlayButton />
							<AudioPlayerSeekForwardButton />
							<AudioPlayerTimeDisplay />
							<AudioPlayerTimeRange />
							<AudioPlayerDurationDisplay />
							<AudioPlayerMuteButton />
							<AudioPlayerVolumeRange />
						</AudioPlayerControlBar>
					</AudioPlayer>
					<AudioPlayer className="max-w-[420px]">
						{src && <AudioPlayerElement src={src} />}
						<AudioPlayerControlBar>
							<AudioPlayerPlayButton />
							<AudioPlayerTimeDisplay />
							<AudioPlayerTimeRange />
							<AudioPlayerDurationDisplay />
						</AudioPlayerControlBar>
					</AudioPlayer>
				</div>
			</section>

			<section>
				<Label>Mic selector</Label>
				<div className="flex gap-6">
					<MicSelector devices={devices} value={mic} onValueChange={setMic}>
						<MicSelectorTrigger className="w-[260px]">
							<Mic />
							<MicSelectorValue />
						</MicSelectorTrigger>
						<MicSelectorContent>
							<MicSelectorInput />
							<MicSelectorList>
								{(items) => (
									<>
										<MicSelectorEmpty />
										{items.map((d) => (
											<MicSelectorItem key={d.deviceId} value={d.deviceId}>
												<Mic />
												<MicSelectorLabel device={d} />
											</MicSelectorItem>
										))}
									</>
								)}
							</MicSelectorList>
						</MicSelectorContent>
					</MicSelector>
				</div>
			</section>

			<section>
				<Label>Persona</Label>
				<div className="flex gap-9">
					{states.map((s) => (
						<div className="flex flex-col items-center gap-2.5" key={s}>
							<Persona className="size-24" state={s} />
							<span className="font-mono text-[11.5px] text-muted-foreground">
								{s}
							</span>
						</div>
					))}
				</div>
			</section>

			<section>
				<Label>Speech input</Label>
				<div className="flex gap-6">
					<SpeechInput onAudioRecorded={async () => ""} />
					<SpeechInput disabled />
				</div>
				<RaisedSection>
					<div>
						<SpeechInput raised onAudioRecorded={async () => ""} />
					</div>
				</RaisedSection>
			</section>

			<section>
				<Label>Transcription</Label>
				<div className="flex max-w-[560px] flex-col gap-4">
					<Transcription currentTime={5} segments={segments}>
						{(segment, index) => (
							<TranscriptionSegment
								index={index}
								key={index}
								segment={segment}
							/>
						)}
					</Transcription>
				</div>
			</section>

			<section>
				<Label>Voice selector</Label>
				<VoiceSelector value={voice} onValueChange={setVoice}>
					<VoiceSelectorTrigger render={<Button variant="outline" />}>
						{voices.find((v) => v[0] === voice)?.[1] ?? "Select voice"}
					</VoiceSelectorTrigger>
					<VoiceSelectorContent>
						<VoiceSelectorInput />
						<VoiceSelectorList>
							<VoiceSelectorEmpty />
							{["Recommended", "All voices"].map((group, i) => (
								<div key={group}>
									{i > 0 && <VoiceSelectorSeparator />}
									<VoiceSelectorGroup heading={group}>
										{voices
											.filter((v) => v[6] === group)
											.map(([id, name, gender, accent, age, description]) => (
												<VoiceSelectorItem key={id} value={id}>
													<VoiceSelectorPreview />
													<VoiceSelectorDetails>
														<VoiceSelectorHeader>
															<VoiceSelectorName>{name}</VoiceSelectorName>
															<VoiceSelectorAttributes>
																<VoiceSelectorGender value={gender} />
																<VoiceSelectorBullet />
																<VoiceSelectorAccent value={accent} />
																<VoiceSelectorBullet />
																<VoiceSelectorAge>{age}</VoiceSelectorAge>
															</VoiceSelectorAttributes>
														</VoiceSelectorHeader>
														<VoiceSelectorDescription>
															{description}
														</VoiceSelectorDescription>
													</VoiceSelectorDetails>
												</VoiceSelectorItem>
											))}
									</VoiceSelectorGroup>
								</div>
							))}
						</VoiceSelectorList>
					</VoiceSelectorContent>
				</VoiceSelector>
			</section>
		</div>
	);
}
