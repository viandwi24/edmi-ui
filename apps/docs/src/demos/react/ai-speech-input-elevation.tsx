import { SpeechInput } from "@edmi-react/components/ai/speech-input";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex items-center gap-4">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex items-center gap-3">
						<SpeechInput elevation={value} onAudioRecorded={async () => ""} />
						<SpeechInput
							elevation={value}
							variant="default"
							onAudioRecorded={async () => ""}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
