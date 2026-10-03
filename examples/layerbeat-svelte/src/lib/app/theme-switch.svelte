<script lang="ts">
	import Moon from "phosphor-svelte/lib/Moon";
	import Sun from "phosphor-svelte/lib/Sun";
	import { Switch } from "#lib/components/ui/switch/index.js";
	import { getTheme, setTheme } from "./theme.js";

	let dark = $state(false);
	$effect(() => {
		dark = getTheme() === "dark";
	});
</script>

<span class="flex items-center gap-2 text-muted-foreground">
	<Sun class="size-4" aria-hidden="true" />
	<Switch
		aria-label="Dark mode"
		checked={dark}
		onCheckedChange={(v) => {
			dark = v;
			setTheme(v ? "dark" : "light");
		}}
	/>
	<Moon class="size-4" aria-hidden="true" />
</span>
