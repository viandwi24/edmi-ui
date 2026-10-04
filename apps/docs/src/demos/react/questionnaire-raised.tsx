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

export default function Demo() {
	const [done, setDone] = useState<string | null>(null);
	return (
		<Questionnaire
			raised
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
