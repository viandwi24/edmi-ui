<script lang="ts">
	import { Dialog as Primitive } from "bits-ui";

	let { ...restProps }: Primitive.PortalProps = $props();
</script>

<Primitive.Portal {...restProps} />
