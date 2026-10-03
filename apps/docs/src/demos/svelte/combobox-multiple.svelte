<script lang="ts">
	import {
		Combobox,
		ComboboxChip,
		ComboboxChips,
		ComboboxChipsInput,
		ComboboxContent,
		ComboboxEmpty,
		ComboboxItem,
		ComboboxList,
	} from "@edmi-svelte/ui/combobox";

	const tokens = ["NVDAx", "MSFTx", "AAPLx", "TSLAx", "AMZNx", "METAx"];

	let value = $state<string[]>(["NVDAx", "MSFTx"]);
	let search = $state("");
	let anchor = $state<HTMLElement | null>(null);
	const filtered = $derived(
		tokens.filter((t) => t.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<Combobox type="multiple" bind:value>
	<ComboboxChips bind:ref={anchor} class="w-72">
		{#each value as token (token)}
			<ComboboxChip onremove={() => (value = value.filter((v) => v !== token))}>
				{token}
			</ComboboxChip>
		{/each}
		<ComboboxChipsInput
			placeholder="Add token"
			oninput={(e) => (search = e.currentTarget.value)}
		/>
	</ComboboxChips>
	<ComboboxContent customAnchor={anchor}>
		<ComboboxList>
			{#each filtered as token (token)}
				<ComboboxItem value={token} label={token} />
			{:else}
				<ComboboxEmpty>No tokens found.</ComboboxEmpty>
			{/each}
		</ComboboxList>
	</ComboboxContent>
</Combobox>
