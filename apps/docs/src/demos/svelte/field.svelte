<script lang="ts">
	import {
		Field,
		FieldContent,
		FieldDescription,
		FieldError,
		FieldGroup,
		FieldLabel,
		FieldLegend,
		FieldSet,
		FieldTitle,
	} from "@edmi-svelte/ui/field";
	import { Input } from "@edmi-svelte/ui/input";
	import { Switch } from "@edmi-svelte/ui/switch";

	let ticker = $state("MAG");
	let keeper = $state(true);
	const invalid = $derived(!/^[A-Z]{2,6}$/.test(ticker));
</script>

<FieldSet class="w-full max-w-sm">
	<FieldLegend>Mandate</FieldLegend>
	<FieldDescription>Rules the keeper follows after launch.</FieldDescription>
	<FieldGroup>
		<Field>
			<FieldLabel for="field-name">Index name</FieldLabel>
			<Input id="field-name" value="Magnificent Four" />
		</Field>
		<Field data-invalid={invalid}>
			<FieldLabel for="field-ticker">Ticker</FieldLabel>
			<Input id="field-ticker" aria-invalid={invalid} bind:value={ticker} />
			{#if invalid}
				<FieldError>Use 2-6 capital letters.</FieldError>
			{/if}
		</Field>
		<Field orientation="horizontal">
			<FieldContent>
				<FieldTitle>Allow keeper</FieldTitle>
				<FieldDescription>
					Rebalance automatically when drift passes the limit.
				</FieldDescription>
			</FieldContent>
			<Switch bind:checked={keeper} />
		</Field>
	</FieldGroup>
</FieldSet>
