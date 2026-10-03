<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import SchemaDisplayContent from "./schema-display-content.svelte";
	import SchemaDisplayDescription from "./schema-display-description.svelte";
	import SchemaDisplayHeader from "./schema-display-header.svelte";
	import SchemaDisplayMethod from "./schema-display-method.svelte";
	import SchemaDisplayParameters from "./schema-display-parameters.svelte";
	import SchemaDisplayPath from "./schema-display-path.svelte";
	import SchemaDisplayRequest from "./schema-display-request.svelte";
	import SchemaDisplayResponse from "./schema-display-response.svelte";
	import {
		type HttpMethod,
		type SchemaParameter,
		type SchemaProperty,
		setSchemaDisplayContext,
	} from "./use-schema-display.svelte.js";

	let {
		ref = $bindable(null),
		method,
		path,
		description,
		parameters,
		requestBody,
		responseBody,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		method: HttpMethod;
		path: string;
		description?: string;
		parameters?: SchemaParameter[];
		requestBody?: SchemaProperty[];
		responseBody?: SchemaProperty[];
	} = $props();

	setSchemaDisplayContext({
		get method() {
			return method;
		},
		get path() {
			return path;
		},
		get description() {
			return description;
		},
		get parameters() {
			return parameters;
		},
		get requestBody() {
			return requestBody;
		},
		get responseBody() {
			return responseBody;
		},
	});
</script>

<div
	bind:this={ref}
	data-slot="ai-schema-display"
	class={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<SchemaDisplayHeader>
			<SchemaDisplayMethod />
			<SchemaDisplayPath />
		</SchemaDisplayHeader>
		{#if description}
			<SchemaDisplayDescription />
		{/if}
		<SchemaDisplayContent>
			{#if parameters?.length}
				<SchemaDisplayParameters />
			{/if}
			{#if requestBody?.length}
				<SchemaDisplayRequest />
			{/if}
			{#if responseBody?.length}
				<SchemaDisplayResponse />
			{/if}
		</SchemaDisplayContent>
	{/if}
</div>
