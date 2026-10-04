<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import TestDuration from "./test-duration.svelte";
	import TestName from "./test-name.svelte";
	import TestStatus from "./test-status.svelte";
	import { setTestContext, type TestStatusType } from "./use-test-results.svelte.js";

	let {
		ref = $bindable(null),
		name,
		status,
		duration,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		name: string;
		status: TestStatusType;
		duration?: number;
	} = $props();

	setTestContext({
		get name() {
			return name;
		},
		get status() {
			return status;
		},
		get duration() {
			return duration;
		},
	});
</script>

<div
	bind:this={ref}
	data-slot="ai-test"
	data-status={status}
	class={cn("flex flex-wrap items-center gap-x-2 py-[5px] text-[12.5px]", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<TestStatus />
		<TestName />
		{#if duration !== undefined}
			<TestDuration />
		{/if}
	{/if}
</div>
