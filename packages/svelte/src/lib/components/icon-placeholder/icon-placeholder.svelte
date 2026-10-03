<script lang="ts">
	// Dev-only shim (NOT part of the registry). Registry sources use shadcn-svelte's
	// <IconPlaceholder lucide=".." tabler=".." hugeicons=".." phosphor=".." remixicon=".." />;
	// `shadcn-svelte add` rewrites it to the consumer's `iconLibrary`. This keeps svelte-check happy here.
	import type { SVGAttributes } from "svelte/elements";

	let {
		lucide: _l,
		tabler: _t,
		hugeicons: _h,
		phosphor: _p,
		remixicon: _r,
		...restProps
	}: SVGAttributes<SVGSVGElement> & {
		lucide?: string;
		tabler?: string;
		hugeicons?: string;
		phosphor?: string;
		remixicon?: string;
	} = $props();
</script>

<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" aria-hidden="true" {...restProps}>
	<circle cx="12" cy="12" r="8" />
</svg>
