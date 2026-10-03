<script lang="ts">
	import Moon from "phosphor-svelte/lib/Moon";
	import Sun from "phosphor-svelte/lib/Sun";
	import { Button } from "#lib/components/ui/button/index.js";
	import { getTheme, setTheme, type Theme } from "./theme.js";

	let theme = $state<Theme>("light");
	$effect(() => {
		theme = getTheme();
	});
</script>

<Button
	variant="outline"
	raised
	size="icon"
	aria-label="Toggle theme"
	onclick={() => {
		theme = theme === "dark" ? "light" : "dark";
		setTheme(theme);
	}}
>
	{#if theme === "dark"}<Sun />{:else}<Moon />{/if}
</Button>
