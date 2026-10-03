<script lang="ts">
	import { AllocationBar } from "@edmi-svelte/ui/allocation-bar";

	const segments = [
		{ label: "AAPLx", value: 40 },
		{ label: "NVDAx", value: 30 },
		{ label: "TSLAx", value: 20 },
		{ label: "SPACEX-pre", value: 10 },
	];
</script>

<AllocationBar class="max-w-md" {segments} />
