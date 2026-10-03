<script lang="ts">
	import { Drawer as Primitive } from "vaul-svelte";

	let { ...restProps }: Primitive.PortalProps = $props();
</script>

<Primitive.Portal {...restProps} />
