<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Accordion } from "$lib/registry/ui/accordion/index.js";
	import { cn } from "$lib/utils.js";
	import { type ComponentProps, untrack } from "svelte";
	import { setAgentToolsContext } from "./use-agent.svelte.js";

	// single + collapsible matches the React port (Base UI default).
	let {
		class: className,
		children,
		value = $bindable<string | undefined>(),
		...restProps
	}: Omit<ComponentProps<typeof Accordion>, "type" | "value"> & { value?: string } = $props();

	let count = $state(0);
	setAgentToolsContext({
		register() {
			// untrack: register runs inside the child's effect and must not subscribe to `count`.
			untrack(() => {
				count += 1;
			});
			return () => {
				untrack(() => {
					count -= 1;
				});
			};
		},
	});
</script>

<div class="flex flex-col gap-1">
	<span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase"
		>Tools · {count}</span
	>
	<Accordion
		type="single"
		collapsible
		bind:value
		class={cn("border-t border-border-2", className)}
		{...restProps as object}
	>
		{@render children?.()}
	</Accordion>
</div>
