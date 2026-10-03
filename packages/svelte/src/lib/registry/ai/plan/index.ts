import Root from "./plan.svelte";
import Action from "./plan-action.svelte";
import Content from "./plan-content.svelte";
import Description from "./plan-description.svelte";
import Footer from "./plan-footer.svelte";
import Header from "./plan-header.svelte";
import Title from "./plan-title.svelte";
import Trigger from "./plan-trigger.svelte";

export * from "./use-plan.svelte.js";
export {
	Action,
	Action as PlanAction,
	Content,
	Content as PlanContent,
	Description,
	Description as PlanDescription,
	Footer,
	Footer as PlanFooter,
	Header,
	Header as PlanHeader,
	Root,
	//
	Root as Plan,
	Title,
	Title as PlanTitle,
	Trigger,
	Trigger as PlanTrigger,
};
