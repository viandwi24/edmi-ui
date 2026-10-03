<script lang="ts">
	import {
		Combobox,
		ComboboxContent,
		ComboboxEmpty,
		ComboboxInput,
		ComboboxItem,
		ComboboxList,
	} from "@edmi-svelte/ui/combobox";

	const tokens = ["NVDAx", "MSFTx", "AAPLx", "TSLAx", "AMZNx", "METAx"];

	let value = $state("");
	let search = $state("");
	const filtered = $derived(
		tokens.filter((t) => t.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<Combobox type="single" bind:value>
	<ComboboxInput
		placeholder="Select a token"
		showClear
		class="w-64"
		oninput={(e) => (search = e.currentTarget.value)}
	/>
	<ComboboxContent>
		<ComboboxList>
			{#each filtered as token (token)}
				<ComboboxItem value={token} label={token} />
			{:else}
				<ComboboxEmpty>No tokens found.</ComboboxEmpty>
			{/each}
		</ComboboxList>
	</ComboboxContent>
</Combobox>
