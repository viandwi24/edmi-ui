<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AvatarPrimitive.FallbackProps = $props();
</script>

<!-- Initials are mono (DESIGN §1 type): every short code, number and address uses JetBrains Mono. -->
<AvatarPrimitive.Fallback
	bind:ref
	data-slot="avatar-fallback"
	class={cn(
		"flex size-full items-center justify-center rounded-full bg-muted font-mono text-[13px] font-medium text-muted-foreground group-data-[size=sm]/avatar:text-[10px] group-data-[size=lg]/avatar:text-sm",
		className
	)}
	{...restProps}
/>
