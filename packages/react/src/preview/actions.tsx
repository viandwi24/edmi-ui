import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
import { Button, buttonVariants } from "@/registry/edmi/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
} from "@/registry/edmi/ui/button-group";
import { Kbd, KbdGroup } from "@/registry/edmi/ui/kbd";
import { Toggle } from "@/registry/edmi/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/registry/edmi/ui/toggle-group";
import { RaisedSection } from "./_raised";

const variants = [
	"default",
	"secondary",
	"outline",
	"ghost",
	"destructive",
	"link",
	"brand",
] as const;
const sizes = ["xs", "sm", "default", "lg"] as const;
const badges = [
	"default",
	"secondary",
	"destructive",
	"outline",
	"ghost",
	"link",
	"brand",
	"success",
	"warning",
	"info",
] as const;

export default function ActionsPreview() {
	return (
		<div className="flex flex-col gap-6">
			{sizes.map((size) => (
				<div key={size} className="flex flex-wrap items-center gap-3">
					{variants.map((variant) => (
						<Button key={variant} variant={variant} size={size}>
							{variant}
						</Button>
					))}
				</div>
			))}
			<div className="flex flex-wrap items-center gap-3">
				<Button>
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
						remixicon="RiAddLine"
						data-icon="inline-start"
					/>
					With icon
				</Button>
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
				<Button size="icon" variant="outline" aria-label="Add">
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
						remixicon="RiAddLine"
					/>
				</Button>
				<Button size="icon-sm" variant="secondary" aria-label="Add">
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
						remixicon="RiAddLine"
					/>
				</Button>
				<Button disabled>disabled</Button>
				<a
					href="https://example.com"
					className={buttonVariants({ variant: "outline" })}
				>
					Link as button
				</a>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				{badges.map((variant) => (
					<Badge key={variant} variant={variant}>
						{variant}
					</Badge>
				))}
				<Badge shape="pill" variant="brand">
					pill
				</Badge>
				<Badge shape="number" variant="secondary">
					12
				</Badge>
			</div>
			<div className="flex flex-wrap items-start gap-6">
				<ButtonGroup>
					<Button variant="outline">Archive</Button>
					<Button variant="outline">Report</Button>
					<Button variant="outline">Snooze</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button>Join</Button>
					<ButtonGroupSeparator />
					<Button size="icon" aria-label="More">
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
						/>
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<ButtonGroupText>Amount</ButtonGroupText>
					<ButtonGroupText>1,000 USDC</ButtonGroupText>
				</ButtonGroup>
				<ButtonGroup orientation="vertical">
					<Button variant="outline" size="icon">
						+
					</Button>
					<Button variant="outline" size="icon">
						-
					</Button>
				</ButtonGroup>
			</div>
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
				<Toggle variant="outline" defaultPressed aria-label="Italic">
					<IconPlaceholder
						lucide="ItalicIcon"
						tabler="IconItalic"
						hugeicons="TextItalicIcon"
						phosphor="TextItalicIcon"
						remixicon="RiItalic"
					/>
				</Toggle>
				<Toggle size="sm" disabled aria-label="Underline">
					<IconPlaceholder
						lucide="UnderlineIcon"
						tabler="IconUnderline"
						hugeicons="TextUnderlineIcon"
						phosphor="TextUnderlineIcon"
						remixicon="RiUnderline"
					/>
				</Toggle>
			</div>
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
				</ToggleGroup>
				<ToggleGroup variant="outline" spacing={0} defaultValue={["1M"]}>
					{["1D", "1W", "1M", "1Y"].map((v) => (
						<ToggleGroupItem key={v} value={v}>
							{v}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
				<ToggleGroup variant="segmented" defaultValue={["1M"]}>
					{["1D", "1W", "1M", "1Y"].map((v) => (
						<ToggleGroupItem key={v} value={v}>
							{v}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>
			<div className="flex flex-wrap items-center gap-4">
				<Kbd>K</Kbd>
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>K</Kbd>
				</KbdGroup>
				<Kbd>Enter</Kbd>
			</div>
			<RaisedSection>
				<div className="flex flex-wrap items-center gap-3">
					{variants.map((variant) => (
						<Button key={variant} variant={variant} raised>
							{variant}
						</Button>
					))}
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<Toggle raised aria-label="Bold" defaultPressed>
						B
					</Toggle>
					<Toggle raised variant="outline" aria-label="Italic" defaultPressed>
						I
					</Toggle>
					<ToggleGroup raised multiple defaultValue={["b"]}>
						<ToggleGroupItem value="b">B</ToggleGroupItem>
						<ToggleGroupItem value="i">I</ToggleGroupItem>
					</ToggleGroup>
					<ToggleGroup
						raised
						variant="outline"
						spacing={0}
						defaultValue={["1M"]}
					>
						{["1D", "1W", "1M", "1Y"].map((v) => (
							<ToggleGroupItem key={v} value={v}>
								{v}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<ToggleGroup raised variant="segmented" defaultValue={["1M"]}>
						{["1D", "1W", "1M", "1Y"].map((v) => (
							<ToggleGroupItem key={v} value={v}>
								{v}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
				<div className="flex flex-wrap items-center gap-4">
					<Kbd raised>K</Kbd>
					<KbdGroup>
						<Kbd raised>⌘</Kbd>
						<Kbd raised>K</Kbd>
					</KbdGroup>
				</div>
			</RaisedSection>
		</div>
	);
}
