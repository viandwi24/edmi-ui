<script lang="ts">
	import { LinkPreview as Primitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: Primitive.TriggerProps = $props();
</script>

<Primitive.Trigger bind:ref data-slot="hover-card-trigger" {...restProps} />
