<script lang="ts">
	import { Drawer as Primitive } from "vaul-svelte";

	let { ref = $bindable(null), ...restProps }: Primitive.CloseProps = $props();
</script>

<Primitive.Close bind:ref data-slot="drawer-close" {...restProps} />
