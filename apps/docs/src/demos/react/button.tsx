import { Button } from "@edmi-react/ui/button";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Button>Join index</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Delete</Button>
			<Button variant="link">Link</Button>
			<Button variant="brand">
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
			<Button size="sm">
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
			<Button size="icon" variant="outline" aria-label="Add">
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
