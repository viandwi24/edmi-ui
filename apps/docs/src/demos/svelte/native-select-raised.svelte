<script lang="ts">
	import { NativeSelect, NativeSelectOption } from "@edmi-svelte/ui/native-select";
</script>

<div class="flex flex-wrap items-start gap-4">
	<NativeSelect class="w-48">
		<NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
		<NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
	</NativeSelect>
	<NativeSelect raised class="w-48">
		<NativeSelectOption value="devnet">Solana devnet</NativeSelectOption>
		<NativeSelectOption value="mainnet">Mainnet</NativeSelectOption>
	</NativeSelect>
</div>
