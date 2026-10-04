<script lang="ts">
	import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@edmi-svelte/ui/field";
	import { RadioGroup, RadioGroupItem } from "@edmi-svelte/ui/radio-group";

	const options = [
		{ value: "weekly", title: "Weekly", description: "Rebalance every Monday." },
		{ value: "drift", title: "On drift", description: "Only when a weight drifts." },
	];

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<RadioGroup value="weekly" class="max-w-sm">
				{#each options as o (o.value)}
					<FieldLabel elevation={level.value} for={`${level.value}-${o.value}`}>
						<Field orientation="horizontal">
							<FieldContent>
								<FieldTitle>{o.title}</FieldTitle>
								<FieldDescription>{o.description}</FieldDescription>
							</FieldContent>
							<RadioGroupItem id={`${level.value}-${o.value}`} value={o.value} />
						</Field>
					</FieldLabel>
				{/each}
			</RadioGroup>
		</div>
	{/each}
</div>
