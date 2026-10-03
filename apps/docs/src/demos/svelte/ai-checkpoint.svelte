<script lang="ts">
	import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@edmi-svelte/ai/checkpoint";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Checkpoint class="w-full max-w-xl" time="14:02">
	<CheckpointIcon />
	<CheckpointTrigger tooltip="Restore the conversation and the agent's changes to this point">
		<IconPlaceholder
			lucide="RotateCcwIcon"
			tabler="IconRotate"
			hugeicons="Undo02Icon"
			phosphor="ArrowCounterClockwiseIcon"
			remixicon="RiResetLeftLine"
		/>
		Restore checkpoint
	</CheckpointTrigger>
</Checkpoint>
