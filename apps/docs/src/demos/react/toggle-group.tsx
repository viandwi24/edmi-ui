import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	const [range, setRange] = useState("1M");
	// A range always has one value: ignore the empty value a second click on the active item produces.
	const rangeProps = {
		value: [range],
		onValueChange: (v: string[]) => v[0] && setRange(v[0]),
	};
	return (
		<div className="flex flex-wrap items-start gap-6">
			<ToggleGroup multiple defaultValue={["b"]}>
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
			<ToggleGroup variant="outline" spacing={0} {...rangeProps}>
				{["1D", "1W", "1M", "1Y", "All"].map((v) => (
					<ToggleGroupItem key={v} value={v}>
						{v}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<ToggleGroup variant="segmented" {...rangeProps}>
				{["1D", "1W", "1M", "1Y", "All"].map((v) => (
					<ToggleGroupItem key={v} value={v}>
						{v}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
			<ToggleGroup orientation="vertical" variant="outline">
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
