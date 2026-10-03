<script lang="ts">
	import { LinkPreview as Primitive } from "bits-ui";

	let { ...restProps }: Primitive.PortalProps = $props();
</script>

<Primitive.Portal {...restProps} />
