<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { useMessageBranch } from "./use-message.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();

	const branches = useMessageBranch();
	let el = $state<HTMLElement | null>(null);

	// Every direct child of the wrapper is one branch (`{#each}` children included): count them and
	// show only the current one.
	$effect(() => {
		if (!el) return;
		const root = el;
		const sync = () => {
			const items = Array.from(root.children) as HTMLElement[];
			branches.setTotalBranches(items.length);
			items.forEach((item, index) => {
				item.style.display = index === branches.currentBranch ? "" : "none";
			});
		};
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, { childList: true });
		return () => observer.disconnect();
	});

	// Re-apply visibility when the current branch changes.
	$effect(() => {
		const current = branches.currentBranch;
		if (!el) return;
		(Array.from(el.children) as HTMLElement[]).forEach((item, index) => {
			item.style.display = index === current ? "" : "none";
		});
	});
</script>

<div
	bind:this={el}
	data-slot="ai-message-branch-content"
	class={cn("grid gap-1.5 overflow-hidden [&>div]:pb-0", className)}
	{...restProps}
>
	{@render children?.()}
</div>
