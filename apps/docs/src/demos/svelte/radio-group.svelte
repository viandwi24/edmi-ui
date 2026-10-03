<script lang="ts">
	import { RadioGroup, RadioGroupItem } from "@edmi-svelte/ui/radio-group";

	const options = [
		{ value: "daily", label: "Daily" },
		{ value: "weekly", label: "Weekly" },
		{ value: "drift", label: "On drift only" },
	];
</script>

<RadioGroup value="weekly" class="w-fit">
	{#each options as o (o.value)}
		<label class="flex items-center gap-2.5 text-sm">
			<RadioGroupItem value={o.value} />
			{o.label}
		</label>
	{/each}
</RadioGroup>
