<script lang="ts">
	import { Toggle } from "@edmi-svelte/ui/toggle";

	const levels = [{ value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="flex flex-wrap items-center gap-3">
				<Toggle elevation={level.value} aria-label="Bold" pressed><b>B</b></Toggle>
				<Toggle elevation={level.value} variant="outline" aria-label="Italic"><i>I</i></Toggle>
				<Toggle elevation={level.value} variant="outline" aria-label="Underline" pressed><u>U</u></Toggle>
			</div>
		</div>
	{/each}
</div>
