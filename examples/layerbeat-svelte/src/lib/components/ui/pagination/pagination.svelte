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
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		count = 0,
		perPage = 10,
		page = $bindable(1),
		siblingCount = 1,
		elevation = "auto",
		...restProps
	}: PaginationPrimitive.RootProps & {
		/** ✦ depth: raised +1 / floating +2 make the active link rise. */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "control");
	const raised = $derived(level.current === "raised" || level.current === "floating");

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
