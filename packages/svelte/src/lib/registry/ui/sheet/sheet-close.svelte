<script lang="ts">
	import { Dialog as Primitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: Primitive.CloseProps = $props();
</script>

<Primitive.Close bind:ref data-slot="sheet-close" {...restProps} />
