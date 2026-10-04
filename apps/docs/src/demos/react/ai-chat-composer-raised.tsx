import { ChatComposer } from "@edmi-react/components/ai/chat-composer";

const models = [
	{ id: "opus", label: "Opus" },
	{ id: "sonnet", label: "Sonnet" },
];
const efforts = [
	{ id: "low", label: "Low" },
	{ id: "medium", label: "Medium" },
	{ id: "high", label: "High" },
];
const modes = [
	{ id: "auto", label: "Auto" },
	{ id: "ask", label: "Ask first" },
];

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<ChatComposer
						elevation={value}
						className="max-w-2xl"
						onSubmit={() => {}}
						onAttach={() => {}}
						onSpeech={() => {}}
						disclaimer="Edmi is AI and can make mistakes."
						models={models}
						efforts={efforts}
						defaultEffort="medium"
						modes={modes}
					/>
				</div>
			))}
		</div>
	);
}
