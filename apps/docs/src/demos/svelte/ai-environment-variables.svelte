<script lang="ts">
	import {
		EnvironmentVariable,
		EnvironmentVariableCopyButton,
		EnvironmentVariableName,
		EnvironmentVariableRequired,
		EnvironmentVariables,
		EnvironmentVariablesContent,
		EnvironmentVariablesHeader,
		EnvironmentVariablesTitle,
		EnvironmentVariablesToggle,
		EnvironmentVariableValue,
	} from "@edmi-svelte/ai/environment-variables";

	const vars = [
		{ name: "SOLANA_RPC_URL", value: "https://api.devnet.solana.com", required: true },
		{ name: "JUPITER_API_KEY", value: "jup_live_7Hc2…", required: true },
		{ name: "KEEPER_MAX_SLIPPAGE", value: "0.01", required: false },
	];
</script>

<EnvironmentVariables class="max-w-lg">
	<EnvironmentVariablesHeader>
		<EnvironmentVariablesTitle />
		<EnvironmentVariablesToggle />
	</EnvironmentVariablesHeader>
	<EnvironmentVariablesContent>
		{#each vars as v (v.name)}
			<EnvironmentVariable name={v.name} value={v.value}>
				<EnvironmentVariableName />
				{#if v.required}<EnvironmentVariableRequired />{/if}
				<EnvironmentVariableValue />
				<EnvironmentVariableCopyButton copyFormat="value" />
			</EnvironmentVariable>
		{/each}
	</EnvironmentVariablesContent>
</EnvironmentVariables>
