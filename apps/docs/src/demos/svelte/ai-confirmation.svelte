<script lang="ts">
	import {
		Confirmation,
		ConfirmationAccepted,
		ConfirmationAction,
		ConfirmationActions,
		ConfirmationDescription,
		ConfirmationRejected,
		ConfirmationRequest,
		ConfirmationTitle,
	} from "@edmi-svelte/ai/confirmation";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const rows = [
		{ state: "approval-requested", approval: { id: "1" } },
		{ state: "approval-responded", approval: { id: "2", approved: true } },
		{ state: "output-denied", approval: { id: "3", approved: false } },
	] as const;
</script>

<div class="flex flex-col gap-4">
	{#each rows as row (row.approval.id)}
		<Confirmation approval={row.approval} state={row.state} class="w-full max-w-md">
			<ConfirmationTitle>
				<ConfirmationRequest>Run rebalance on MAG4?</ConfirmationRequest>
				<ConfirmationAccepted>
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
						remixicon="RiCheckLine"
						class="size-4"
					/>
					<span>Approved · rebalance sent</span>
				</ConfirmationAccepted>
				<ConfirmationRejected>
					<IconPlaceholder
						lucide="XIcon"
						tabler="IconX"
						hugeicons="Cancel01Icon"
						phosphor="XIcon"
						remixicon="RiCloseLine"
						class="size-4"
					/>
					<span>Rejected · nothing was changed</span>
				</ConfirmationRejected>
			</ConfirmationTitle>
			<ConfirmationDescription>
				Sells 0.42 NVDAx and buys MSFTx + AAPLx. Max slippage 1%.
			</ConfirmationDescription>
			<ConfirmationActions>
				<ConfirmationAction>Approve</ConfirmationAction>
				<ConfirmationAction variant="outline">Reject</ConfirmationAction>
			</ConfirmationActions>
		</Confirmation>
	{/each}
</div>
