import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-start gap-6">
			<ToggleGroup raised multiple defaultValue={["b"]}>
				<ToggleGroupItem value="b" aria-label="Bold">
					<IconPlaceholder
						lucide="BoldIcon"
						tabler="IconBold"
						hugeicons="TextBoldIcon"
						phosphor="TextBIcon"
						remixicon="RiBold"
					/>
				</ToggleGroupItem>
				<ToggleGroupItem value="i" aria-label="Italic">
					<IconPlaceholder
						lucide="ItalicIcon"
						tabler="IconItalic"
						hugeicons="TextItalicIcon"
						phosphor="TextItalicIcon"
						remixicon="RiItalic"
					/>
				</ToggleGroupItem>
				<ToggleGroupItem value="u" aria-label="Underline">
					<IconPlaceholder
						lucide="UnderlineIcon"
						tabler="IconUnderline"
						hugeicons="TextUnderlineIcon"
						phosphor="TextUnderlineIcon"
						remixicon="RiUnderline"
					/>
				</ToggleGroupItem>
			</ToggleGroup>
			<ToggleGroup raised variant="outline" spacing={0} defaultValue={["1M"]}>
				{["1D", "1W", "1M", "1Y", "All"].map((v) => (
					<ToggleGroupItem key={v} value={v}>
						{v}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<ToggleGroup raised variant="segmented" defaultValue={["1M"]}>
				{["1D", "1W", "1M", "1Y", "All"].map((v) => (
					<ToggleGroupItem key={v} value={v}>
						{v}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<ToggleGroup raised orientation="vertical" variant="outline">
				<ToggleGroupItem value="b" aria-label="Bold">
					<IconPlaceholder
						lucide="BoldIcon"
						tabler="IconBold"
						hugeicons="TextBoldIcon"
						phosphor="TextBIcon"
						remixicon="RiBold"
					/>
				</ToggleGroupItem>
				<ToggleGroupItem value="i" aria-label="Italic">
					<IconPlaceholder
						lucide="ItalicIcon"
						tabler="IconItalic"
						hugeicons="TextItalicIcon"
						phosphor="TextItalicIcon"
						remixicon="RiItalic"
					/>
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	);
}
