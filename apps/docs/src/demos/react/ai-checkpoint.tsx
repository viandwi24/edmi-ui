import {
	Checkpoint,
	CheckpointIcon,
	CheckpointTrigger,
} from "@edmi-react/components/ai/checkpoint";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<Checkpoint className="w-full max-w-xl" time="14:02">
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
	);
}
