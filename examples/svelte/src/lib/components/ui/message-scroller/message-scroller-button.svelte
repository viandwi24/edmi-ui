<script lang="ts">
	import { cn } from "#lib/utils.js";
	import ArrowDownIcon from 'phosphor-svelte/lib/ArrowDown';
	import { Button, type ButtonProps } from "#lib/components/ui/button/index.js";
	import {
		type MessageScrollerButtonDirection,
		useMessageScrollerContext,
	} from "./use-message-scroller.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		direction = "end",
		behavior = "smooth",
		variant = "outline",
		size = "sm",
		children,
		onclick,
		...restProps
	}: Omit<ButtonProps, "href" | "onclick"> & {
		onclick?: (event: MouseEvent) => void;
		direction?: MessageScrollerButtonDirection;
		behavior?: ScrollBehavior;
	} = $props();

	const scroller = useMessageScrollerContext();
	const active = $derived(direction === "start" ? scroller.scrollable.start : scroller.scrollable.end);

	function handleClick(event: MouseEvent) {
		if (!active) return;
		(event.currentTarget as HTMLElement | null)?.blur();
		onclick?.(event);
		if (event.defaultPrevented) return;
		if (direction === "start") scroller.scrollToStart({ behavior });
		else scroller.scrollToEnd({ behavior });
	}
</script>

<Button
	bind:ref
	data-slot="message-scroller-button"
	data-direction={direction}
	data-active={active ? "true" : "false"}
	{variant}
	{size}
	inert={!active}
	tabindex={active ? undefined : -1}
	class={cn(
		"absolute left-1/2 -translate-x-1/2 transition-[translate,scale,opacity] duration-200 data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full data-[direction=start]:[&_svg]:rotate-180",
		className
	)}
	onclick={handleClick}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ArrowDownIcon  />
		<!-- ✦ Edmi: labelled pill, "Jump to latest" -->
		{direction === "end" ? "Jump to latest" : "Jump to start"}
	{/if}
</Button>
