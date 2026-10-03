import Root from "./questionnaire.svelte";
import Actions from "./questionnaire-actions.svelte";
import Choice from "./questionnaire-choice.svelte";
import ChoiceDescription from "./questionnaire-choice-description.svelte";
import Choices from "./questionnaire-choices.svelte";
import Description from "./questionnaire-description.svelte";
import QErr from "./questionnaire-error.svelte";
import Input from "./questionnaire-input.svelte";
import Item from "./questionnaire-item.svelte";
import Next from "./questionnaire-next.svelte";
import Previous from "./questionnaire-previous.svelte";
import Progress from "./questionnaire-progress.svelte";
import Skip from "./questionnaire-skip.svelte";
import Submit from "./questionnaire-submit.svelte";
import Title from "./questionnaire-title.svelte";

export type {
	QuestionnaireChoiceDefinition,
	QuestionnaireInputType,
	QuestionnaireItemDefinition,
	QuestionnaireItemStatus,
	QuestionnaireShortcutMode,
} from "./use-questionnaire.svelte.js";
export {
	Actions,
	Actions as QuestionnaireActions,
	Choice,
	Choice as QuestionnaireChoice,
	ChoiceDescription,
	ChoiceDescription as QuestionnaireChoiceDescription,
	Choices,
	Choices as QuestionnaireChoices,
	Description,
	Description as QuestionnaireDescription,
	Input,
	Input as QuestionnaireInput,
	Item,
	Item as QuestionnaireItem,
	Next,
	Next as QuestionnaireNext,
	Previous,
	Previous as QuestionnairePrevious,
	Progress,
	Progress as QuestionnaireProgress,
	QErr as Error,
	QErr as QuestionnaireError,
	Root,
	//
	Root as Questionnaire,
	Skip,
	Skip as QuestionnaireSkip,
	Submit,
	Submit as QuestionnaireSubmit,
	Title,
	Title as QuestionnaireTitle,
};
