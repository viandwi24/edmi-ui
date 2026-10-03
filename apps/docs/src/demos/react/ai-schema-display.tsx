import {
	SchemaDisplay,
	SchemaDisplayMethod,
} from "@edmi-react/components/ai/schema-display";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-xl flex-col gap-5">
			<SchemaDisplay
				description="Rebalance an index back to its target weights."
				method="POST"
				parameters={[
					{
						description: "Index id",
						location: "path",
						name: "id",
						required: true,
						type: "string",
					},
				]}
				path="/v1/indexes/{id}/rebalance"
				requestBody={[
					{ description: "0–0.05", name: "maxSlippage", type: "number" },
					{ description: "Quote only", name: "dryRun", type: "boolean" },
				]}
				responseBody={[
					{
						name: "trades",
						properties: [
							{ name: "symbol", type: "string" },
							{ name: "amount", type: "number" },
						],
						type: "object[]",
					},
					{ name: "drift", type: "number" },
				]}
			/>
			<div className="flex flex-wrap items-center gap-1.5">
				{methods.map((method) => (
					<SchemaDisplay
						className="inline-flex border-0 bg-transparent"
						key={method}
						method={method}
						path=""
					>
						<SchemaDisplayMethod />
					</SchemaDisplay>
				))}
			</div>
		</div>
	);
}
