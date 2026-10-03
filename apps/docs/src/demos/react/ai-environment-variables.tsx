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
} from "@edmi-react/components/ai/environment-variables";

const vars = [
	{
		name: "SOLANA_RPC_URL",
		value: "https://api.devnet.solana.com",
		required: true,
	},
	{ name: "JUPITER_API_KEY", value: "jup_live_7Hc2…", required: true },
	{ name: "KEEPER_MAX_SLIPPAGE", value: "0.01", required: false },
];

export default function Demo() {
	return (
		<EnvironmentVariables className="max-w-lg">
			<EnvironmentVariablesHeader>
				<EnvironmentVariablesTitle />
				<EnvironmentVariablesToggle />
			</EnvironmentVariablesHeader>
			<EnvironmentVariablesContent>
				{vars.map((v) => (
					<EnvironmentVariable key={v.name} name={v.name} value={v.value}>
						<EnvironmentVariableName />
						{v.required && <EnvironmentVariableRequired />}
						<EnvironmentVariableValue />
						<EnvironmentVariableCopyButton copyFormat="value" />
					</EnvironmentVariable>
				))}
			</EnvironmentVariablesContent>
		</EnvironmentVariables>
	);
}
