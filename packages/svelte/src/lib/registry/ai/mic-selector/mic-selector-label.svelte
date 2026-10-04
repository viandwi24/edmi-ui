<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		device,
		showId = true,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & {
		device: MediaDeviceInfo;
		/** Show the hardware id (`1a2b:3c4d`) in muted mono after the name. */
		showId?: boolean;
	} = $props();

	const deviceIdRegex = /\(([\da-f]{4}:[\da-f]{4})\)$/i;
	const parsed = $derived.by(() => {
		const matches = device.label.match(deviceIdRegex);
		if (!matches) return { name: device.label, deviceId: null };
		return { name: device.label.replace(deviceIdRegex, "").trim(), deviceId: matches[1] };
	});
</script>

<span class={cn("flex min-w-0 flex-1 items-center gap-2", className)} {...restProps}>
	<span class="truncate">{parsed.name}</span>
	{#if parsed.deviceId && showId}
		<span class="ml-auto shrink-0 font-mono text-[11.5px] text-muted-foreground">{parsed.deviceId}</span>
	{/if}
</span>
