import { getContext, setContext } from "svelte";

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

export interface SchemaDisplayContext {
	readonly method: HttpMethod;
	readonly path: string;
	readonly description: string | undefined;
	readonly parameters: SchemaParameter[] | undefined;
	readonly requestBody: SchemaProperty[] | undefined;
	readonly responseBody: SchemaProperty[] | undefined;
}

const KEY = Symbol("ai-schema-display");

export function setSchemaDisplayContext(ctx: SchemaDisplayContext) {
	setContext(KEY, ctx);
}

export function useSchemaDisplayContext(): SchemaDisplayContext {
	const ctx = getContext<SchemaDisplayContext | undefined>(KEY);
	if (!ctx)
		throw new Error(
			"SchemaDisplay components must be used within SchemaDisplay",
		);
	return ctx;
}
