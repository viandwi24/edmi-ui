<script lang="ts">
	import { Tooltip as Primitive } from "bits-ui";

	let { ...restProps }: Primitive.PortalProps = $props();
</script>

<Primitive.Portal {...restProps} />
