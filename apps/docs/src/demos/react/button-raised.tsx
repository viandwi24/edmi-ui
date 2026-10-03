import { Button } from "@edmi-react/ui/button";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button raised>Join index</Button>
			<Button raised variant="secondary">
				Secondary
			</Button>
			<Button raised variant="outline">
				Outline
			</Button>
			<Button variant="ghost">Ghost</Button>
			<Button raised variant="destructive">
				Delete
			</Button>
			<Button raised variant="link">
				Link
			</Button>
			<Button raised variant="brand">
				Continue
				<IconPlaceholder
					lucide="ArrowRightIcon"
					tabler="IconArrowRight"
					hugeicons="ArrowRight02Icon"
					phosphor="ArrowRightIcon"
					remixicon="RiArrowRightLine"
					data-icon="inline-end"
				/>
			</Button>
			<Button raised size="sm">
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
					data-icon="inline-start"
				/>
				Create
			</Button>
			<Button raised size="icon" variant="outline" aria-label="Add">
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
				/>
			</Button>
		</div>
	);
}
