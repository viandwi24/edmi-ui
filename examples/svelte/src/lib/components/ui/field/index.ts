import Field from "./field.svelte";
import Content from "./field-content.svelte";
import Description from "./field-description.svelte";
import FieldErr from "./field-error.svelte";
import Group from "./field-group.svelte";
import Label from "./field-label.svelte";
import Legend from "./field-legend.svelte";
import Separator from "./field-separator.svelte";
import FieldSetPart from "./field-set.svelte";
import Title from "./field-title.svelte";

export {
	Content,
	Content as FieldContent,
	Description,
	Description as FieldDescription,
	Field,
	FieldErr as Error,
	FieldErr as FieldError,
	FieldSetPart as Set,
	//
	FieldSetPart as FieldSet,
	Group,
	Group as FieldGroup,
	Label,
	Label as FieldLabel,
	Legend,
	Legend as FieldLegend,
	Separator,
	Separator as FieldSeparator,
	Title,
	Title as FieldTitle,
};
