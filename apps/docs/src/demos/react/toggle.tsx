import { Toggle } from "@edmi-react/ui/toggle";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Toggle aria-label="Bold">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
			</Toggle>
			<Toggle aria-label="Bold" defaultPressed>
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
			</Toggle>
			<Toggle variant="outline" aria-label="Italic">
				<IconPlaceholder
					lucide="ItalicIcon"
					tabler="IconItalic"
					hugeicons="TextItalicIcon"
					phosphor="TextItalicIcon"
					remixicon="RiItalic"
				/>
			</Toggle>
			<Toggle variant="outline">
				<IconPlaceholder
					lucide="StarIcon"
					tabler="IconStar"
					hugeicons="StarIcon"
					phosphor="StarIcon"
					remixicon="RiStarLine"
				/>
				Watch
			</Toggle>
			<Toggle size="sm" aria-label="Bold">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
			</Toggle>
			<Toggle size="lg" aria-label="Bold">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
			</Toggle>
			<Toggle disabled aria-label="Bold">
				<IconPlaceholder
					lucide="BoldIcon"
					tabler="IconBold"
					hugeicons="TextBoldIcon"
					phosphor="TextBIcon"
					remixicon="RiBold"
				/>
			</Toggle>
		</div>
	);
}
