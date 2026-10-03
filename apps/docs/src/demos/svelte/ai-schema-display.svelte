<script lang="ts">
	import { SchemaDisplay, SchemaDisplayMethod } from "@edmi-svelte/ai/schema-display";

	const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

	const parameters = [
		{ description: "Index id", location: "path" as const, name: "id", required: true, type: "string" },
	];

	const requestBody = [
		{ description: "0–0.05", name: "maxSlippage", type: "number" },
		{ description: "Quote only", name: "dryRun", type: "boolean" },
	];

	const responseBody = [
		{
			name: "trades",
			properties: [
				{ name: "symbol", type: "string" },
				{ name: "amount", type: "number" },
			],
			type: "object[]",
		},
		{ name: "drift", type: "number" },
	];
</script>

<div class="flex w-full max-w-xl flex-col gap-5">
	<SchemaDisplay
		description="Rebalance an index back to its target weights."
		method="POST"
		path="/v1/indexes/{'{id}'}/rebalance"
		{parameters}
		{requestBody}
		{responseBody}
	/>
	<div class="flex flex-wrap items-center gap-1.5">
		{#each methods as method (method)}
			<SchemaDisplay class="inline-flex border-0 bg-transparent" {method} path="">
				<SchemaDisplayMethod />
			</SchemaDisplay>
		{/each}
	</div>
</div>
