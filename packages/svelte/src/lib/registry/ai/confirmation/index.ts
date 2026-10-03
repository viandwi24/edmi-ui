import Root from "./confirmation.svelte";
import Accepted from "./confirmation-accepted.svelte";
import Action from "./confirmation-action.svelte";
import Actions from "./confirmation-actions.svelte";
import Description from "./confirmation-description.svelte";
import Rejected from "./confirmation-rejected.svelte";
import Request from "./confirmation-request.svelte";
import Title from "./confirmation-title.svelte";

export * from "./use-confirmation.svelte.js";
export {
	Accepted,
	Accepted as ConfirmationAccepted,
	Action,
	Action as ConfirmationAction,
	Actions,
	Actions as ConfirmationActions,
	Description,
	Description as ConfirmationDescription,
	Rejected,
	Rejected as ConfirmationRejected,
	Request,
	Request as ConfirmationRequest,
	Root,
	//
	Root as Confirmation,
	Title,
	Title as ConfirmationTitle,
};
