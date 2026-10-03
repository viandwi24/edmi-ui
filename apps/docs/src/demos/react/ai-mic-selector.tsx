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
} from "@edmi-react/components/ai/mic-selector";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

// Fake devices so the demo needs no microphone permission. Without `devices`, the component lists the real inputs.
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

export default function Demo() {
	const [value, setValue] = useState<string | undefined>("builtin");
	return (
		<MicSelector devices={devices} value={value} onValueChange={setValue}>
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
	);
}
