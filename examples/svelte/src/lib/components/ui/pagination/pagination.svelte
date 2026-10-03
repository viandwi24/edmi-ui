<script lang="ts" module>
	import { getContext, setContext } from "svelte";

	interface PaginationContext {
		raised: boolean;
	}

	export function setPaginationCtx(ctx: PaginationContext) {
		setContext("pagination", ctx);
	}

	export function getPaginationCtx() {
		return getContext<PaginationContext | undefined>("pagination");
	}
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		count = 0,
		perPage = 10,
		page = $bindable(1),
		siblingCount = 1,
		raised = false,
		...restProps
	}: PaginationPrimitive.RootProps & {
		/** ✦ opt-in one-step 3D look for the active link. */
		raised?: boolean;
	} = $props();

	setPaginationCtx({
		get raised() {
			return raised;
		},
	});
</script>

<PaginationPrimitive.Root
	bind:ref
	bind:page
	role="navigation"
	aria-label="pagination"
	data-slot="pagination"
	{count}
	{perPage}
	{siblingCount}
	class={cn("mx-auto flex w-full justify-center", className)}
	{...restProps}
/>
