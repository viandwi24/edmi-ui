import type { ComputedRef, InjectionKey } from "vue";
import { inject } from "vue";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface SchemaParameter {
	name: string;
	type: string;
	required?: boolean;
	description?: string;
	location?: "path" | "query" | "header";
}

export interface SchemaProperty {
	name: string;
	type: string;
	required?: boolean;
	description?: string;
	properties?: SchemaProperty[];
	items?: SchemaProperty;
}

export interface SchemaDisplayContextValue {
	method: ComputedRef<HttpMethod>;
	path: ComputedRef<string>;
	description: ComputedRef<string | undefined>;
	parameters: ComputedRef<SchemaParameter[] | undefined>;
	requestBody: ComputedRef<SchemaProperty[] | undefined>;
	responseBody: ComputedRef<SchemaProperty[] | undefined>;
}

export const SchemaDisplayKey: InjectionKey<SchemaDisplayContextValue> = Symbol(
	"SchemaDisplayContext",
);

export function useSchemaDisplayContext(
	componentName: string,
): SchemaDisplayContextValue {
	const context = inject(SchemaDisplayKey);
	if (!context) {
		throw new Error(`${componentName} must be used within SchemaDisplay`);
	}
	return context;
}
