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
} from "@edmi-react/components/ai/voice-selector";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const voices = [
	{
		id: "aria",
		name: "Aria",
		gender: "female",
		accent: "american",
		age: "young",
		description: "Warm, clear. Good for explainers.",
		group: "Recommended",
	},
	{
		id: "theo",
		name: "Theo",
		gender: "male",
		accent: "british",
		age: "middle-aged",
		description: "Calm and precise.",
		group: "Recommended",
	},
	{
		id: "priya",
		name: "Priya",
		gender: "female",
		accent: "indian",
		age: "young",
		description: "Bright and friendly.",
		group: "All voices",
	},
];

export default function Demo() {
	const [value, setValue] = useState<string | undefined>("aria");
	const [playing, setPlaying] = useState<string>();
	const current = voices.find((v) => v.id === value);

	return (
		<VoiceSelector value={value} onValueChange={setValue}>
			<VoiceSelectorTrigger render={<Button variant="outline" />}>
				<IconPlaceholder
					lucide="AudioLinesIcon"
					tabler="IconPlayerRecordFilled"
					hugeicons="AudioWave01Icon"
					phosphor="RecordIcon"
					remixicon="RiRecordCircleLine"
					className="size-3.5"
				/>
				{current?.name ?? "Select voice"}
				<IconPlaceholder
					lucide="ChevronsUpDownIcon"
					tabler="IconSelector"
					hugeicons="UnfoldMoreIcon"
					phosphor="CaretUpDownIcon"
					remixicon="RiArrowUpDownLine"
					className="size-3.5 text-muted-foreground"
				/>
			</VoiceSelectorTrigger>
			<VoiceSelectorContent title="Choose a voice">
				<VoiceSelectorInput />
				<VoiceSelectorList>
					<VoiceSelectorEmpty>No voices found.</VoiceSelectorEmpty>
					{["Recommended", "All voices"].map((group, i) => (
						<div key={group}>
							{i > 0 && <VoiceSelectorSeparator />}
							<VoiceSelectorGroup heading={group}>
								{voices
									.filter((v) => v.group === group)
									.map((v) => (
										<VoiceSelectorItem key={v.id} value={v.id}>
											<VoiceSelectorPreview
												onPlay={() =>
													setPlaying((p) => (p === v.id ? undefined : v.id))
												}
												playing={playing === v.id}
											/>
											<VoiceSelectorDetails>
												<VoiceSelectorHeader>
													<VoiceSelectorName>{v.name}</VoiceSelectorName>
													<VoiceSelectorAttributes>
														<VoiceSelectorGender value={v.gender} />
														<VoiceSelectorBullet />
														<VoiceSelectorAccent value={v.accent} />
														<VoiceSelectorBullet />
														<VoiceSelectorAge>{v.age}</VoiceSelectorAge>
													</VoiceSelectorAttributes>
												</VoiceSelectorHeader>
												<VoiceSelectorDescription>
													{v.description}
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
	);
}
