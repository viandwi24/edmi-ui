<script lang="ts">
	import { AlertDialog as Primitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: Primitive.TriggerProps = $props();
</script>

<Primitive.Trigger bind:ref data-slot="alert-dialog-trigger" {...restProps} />
