<script lang="ts">
	import { AlertDialog as Primitive } from "bits-ui";

	let { ...restProps }: Primitive.PortalProps = $props();
</script>

<Primitive.Portal {...restProps} />
