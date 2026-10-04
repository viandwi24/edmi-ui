<script lang="ts">
	import { useElevation } from "@edmi-svelte/ui/elevation";

	// What each role resolves to inside the scope (the same call every component makes).
	const field = useElevation(() => undefined, "field");
	const button = useElevation(() => undefined, "button-filled");
	const surface = useElevation(() => undefined, "surface");
	const overlay = useElevation(() => undefined, "overlay");
</script>

<p class="font-mono text-[11.5px] text-muted-foreground">
	field {field.current} · button {button.current} · surface {surface.current} · overlay {overlay.current}
</p>
