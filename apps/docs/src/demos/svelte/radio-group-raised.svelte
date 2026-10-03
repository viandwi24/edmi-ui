<script lang="ts">
	import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@edmi-svelte/ui/field";
	import { RadioGroup, RadioGroupItem } from "@edmi-svelte/ui/radio-group";

	const options = [
		{ value: "weekly", title: "Weekly", description: "Rebalance every Monday." },
		{ value: "drift", title: "On drift", description: "Only when a weight drifts." },
	];
</script>

<div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
	<RadioGroup value="weekly">
		{#each options as o (o.value)}
			<FieldLabel for={`flat-${o.value}`}>
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>{o.title}</FieldTitle>
						<FieldDescription>{o.description}</FieldDescription>
					</FieldContent>
					<RadioGroupItem id={`flat-${o.value}`} value={o.value} />
				</Field>
			</FieldLabel>
		{/each}
	</RadioGroup>
	<RadioGroup value="weekly">
		{#each options as o (o.value)}
			<FieldLabel raised for={`raised-${o.value}`}>
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>{o.title}</FieldTitle>
						<FieldDescription>{o.description}</FieldDescription>
					</FieldContent>
					<RadioGroupItem id={`raised-${o.value}`} value={o.value} />
				</Field>
			</FieldLabel>
		{/each}
	</RadioGroup>
</div>
