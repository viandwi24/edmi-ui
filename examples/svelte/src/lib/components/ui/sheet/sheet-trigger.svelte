<script lang="ts">
	import { Dialog as Primitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: Primitive.TriggerProps = $props();
</script>

<Primitive.Trigger bind:ref data-slot="sheet-trigger" {...restProps} />
