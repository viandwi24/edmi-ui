<script lang="ts">
	import { Drawer as Primitive } from "vaul-svelte";

	let { ref = $bindable(null), ...restProps }: Primitive.TriggerProps = $props();
</script>

<Primitive.Trigger bind:ref data-slot="drawer-trigger" {...restProps} />
