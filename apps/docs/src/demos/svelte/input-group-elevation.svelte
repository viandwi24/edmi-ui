<script lang="ts">
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupInput,
		InputGroupText,
	} from "@edmi-svelte/ui/input-group";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<InputGroup elevation={level.value} class="max-w-sm">
				<InputGroupInput placeholder="1,000.00" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>USDC</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		</div>
	{/each}
</div>
