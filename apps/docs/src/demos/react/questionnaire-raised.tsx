import type { Elevation } from "@edmi-react/ui/elevation";
import {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireInput,
	QuestionnaireItem,
	QuestionnaireNext,
	QuestionnairePrevious,
	QuestionnaireProgress,
	QuestionnaireSkip,
	QuestionnaireSubmit,
	QuestionnaireTitle,
} from "@edmi-react/ui/questionnaire";
import { useState } from "react";

const items = [
	{
		name: "rebalance",
		choices: [{ value: "drift" }, { value: "schedule" }, { value: "sign" }],
	},
	{ name: "notes" },
];

function Sample({ elevation }: { elevation: Elevation }) {
	const [done, setDone] = useState<string | null>(null);
	return (
		<Questionnaire
			elevation={elevation}
			items={items}
			shortcuts="letters"
			className="w-full max-w-md rounded-2xl border border-border bg-card p-6"
			onSubmit={(e) => {
				e.preventDefault();
				const data = new FormData(e.currentTarget);
				setDone(JSON.stringify(Object.fromEntries(data)));
			}}
		>
			<QuestionnaireProgress />
			<QuestionnaireItem name="rebalance" required>
				<QuestionnaireTitle>How should the index rebalance?</QuestionnaireTitle>
				<QuestionnaireDescription>
					You can change this later in the mandate.
				</QuestionnaireDescription>
				<QuestionnaireChoices>
					<QuestionnaireChoice value="drift">
						When any weight drifts past a limit
					</QuestionnaireChoice>
					<QuestionnaireChoice value="schedule">
						On a fixed schedule
					</QuestionnaireChoice>
					<QuestionnaireChoice value="sign">
						Only when I sign
					</QuestionnaireChoice>
				</QuestionnaireChoices>
				<QuestionnaireInput placeholder="Other…" />
			</QuestionnaireItem>
			<QuestionnaireItem name="notes">
				<QuestionnaireTitle>Any notes for the desk?</QuestionnaireTitle>
				<QuestionnaireInput placeholder="Add a note…" />
			</QuestionnaireItem>
			<QuestionnaireActions>
				<QuestionnairePrevious />
				<QuestionnaireSkip />
				<QuestionnaireNext />
				<QuestionnaireSubmit />
			</QuestionnaireActions>
			{done ? (
				<p className="font-mono text-xs text-muted-foreground">{done}</p>
			) : null}
		</Questionnaire>
	);
}

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
