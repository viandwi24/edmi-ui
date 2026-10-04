<script lang="ts">
	import { NativeSelect, NativeSelectOption } from "@edmi-svelte/ui/native-select";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<NativeSelect elevation={level.value} class="w-48">
				<NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
				<NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
			</NativeSelect>
		</div>
	{/each}
</div>
