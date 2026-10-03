<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import { Rive } from "@rive-app/webgl2";
	import type { EventCallback } from "@rive-app/webgl2";
	import { onMount } from "svelte";
	import { personaSources, type PersonaState, type PersonaVariant } from "./sources.js";

	// Rive/WebGL2 artwork; the same files as Vercel AI Elements. The look is the artwork, so there is no raised variant.
	let {
		state: personaState = "idle",
		variant = "obsidian",
		class: className,
		onLoad,
		onLoadError,
		onReady,
		onPlay,
		onPause,
		onStop,
	}: {
		state?: PersonaState;
		variant?: PersonaVariant;
		class?: string;
		onLoad?: () => void;
		onLoadError?: (error: unknown) => void;
		onReady?: () => void;
		onPlay?: EventCallback;
		onPause?: EventCallback;
		onStop?: EventCallback;
	} = $props();

	const stateMachine = "default";
	const source = $derived(personaSources[variant]);

	let canvas = $state<HTMLCanvasElement | null>(null);
	let rive: Rive | null = null;
	let theme = $state<"light" | "dark">("light");

	// Edmi themes with a `.dark` class on <html> or on any ancestor (scoped dark subtrees).
	function readTheme(): "light" | "dark" {
		if (canvas?.closest(".dark") || document.documentElement.classList.contains("dark")) return "dark";
		if (!canvas?.closest(".light") && window.matchMedia?.("(prefers-color-scheme: dark)").matches)
			return "dark";
		return "light";
	}

	function applyState() {
		const inputs = rive?.stateMachineInputs(stateMachine);
		if (!inputs) return;
		for (const name of ["listening", "thinking", "speaking", "asleep"] as const) {
			const input = inputs.find((i) => i.name === name);
			if (input) input.value = personaState === name;
		}
	}

	function applyColor() {
		if (!rive || !source.dynamicColor || !source.hasModel) return;
		const color = rive.viewModelInstance?.color("color");
		if (color) {
			const [r, g, b] = theme === "dark" ? [255, 255, 255] : [0, 0, 0];
			color.rgb(r, g, b);
		}
	}

	function start() {
		if (!canvas) return;
		rive?.cleanup();
		rive = new Rive({
			canvas,
			src: source.source,
			autoplay: true,
			autoBind: source.hasModel,
			stateMachine,
			onLoad: () => {
				onLoad?.();
				applyColor();
				applyState();
				onReady?.();
			},
			onLoadError: (err) => onLoadError?.(err),
			onPlay: (event) => onPlay?.(event),
			onPause: (event) => onPause?.(event),
			onStop: (event) => onStop?.(event),
		});
	}

	onMount(() => {
		const syncTheme = () => {
			theme = readTheme();
		};
		syncTheme();
		const observer = new MutationObserver(syncTheme);
		observer.observe(document.documentElement, {
			attributeFilter: ["class"],
			attributes: true,
			subtree: true,
		});
		const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
		mql?.addEventListener("change", syncTheme);
		const resize = new ResizeObserver(() => rive?.resizeDrawingSurfaceToCanvas());
		if (canvas) resize.observe(canvas);
		start();
		return () => {
			observer.disconnect();
			mql?.removeEventListener("change", syncTheme);
			resize.disconnect();
			rive?.cleanup();
			rive = null;
		};
	});

	let currentVariant: PersonaVariant | undefined;
	$effect(() => {
		const next = variant;
		if (currentVariant !== undefined && next !== currentVariant) start();
		currentVariant = next;
	});
	$effect(() => {
		void personaState;
		applyState();
	});
	$effect(() => {
		void theme;
		applyColor();
	});
</script>

<div
	data-slot="ai-persona"
	data-state={personaState}
	data-variant={variant}
	class={cn("size-16 shrink-0", className)}
>
	<canvas bind:this={canvas} class="size-full"></canvas>
</div>
