<script lang="ts">
	import { AlertDialog as Primitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: Primitive.RootProps = $props();
</script>

<Primitive.Root bind:open {...restProps} />
