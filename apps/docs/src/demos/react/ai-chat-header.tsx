import {
	ChatHeader,
	ChatHeaderActions,
	ChatHeaderMenu,
	ChatHeaderProject,
	ChatHeaderShare,
	ChatHeaderTitle,
} from "@edmi-react/components/ai/chat-header";
import { Button } from "@edmi-react/ui/button";
import { DropdownMenuItem } from "@edmi-react/ui/dropdown-menu";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<ChatHeader className="max-w-3xl">
			<ChatHeaderTitle>
				<span className="truncate">Keeper starter plan</span>
				<ChatHeaderProject status="connected" />
				<ChatHeaderMenu>
					<DropdownMenuItem>Rename</DropdownMenuItem>
					<DropdownMenuItem>Move to project</DropdownMenuItem>
					<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
				</ChatHeaderMenu>
			</ChatHeaderTitle>
			<ChatHeaderActions>
				<Button
					aria-label="Web access"
					size="icon-sm"
					type="button"
					variant="ghost"
				>
					<IconPlaceholder
						lucide="GlobeIcon"
						tabler="IconWorld"
						hugeicons="Globe02Icon"
						phosphor="GlobeIcon"
						remixicon="RiGlobalLine"
						className="size-4"
					/>
				</Button>
				<Button size="sm" type="button" variant="ghost">
					<IconPlaceholder
						lucide="FileTextIcon"
						tabler="IconFileDescription"
						hugeicons="File01Icon"
						phosphor="FileTextIcon"
						remixicon="RiFileTextLine"
						className="size-3.5"
					/>
					1
				</Button>
				<ChatHeaderShare />
			</ChatHeaderActions>
		</ChatHeader>
	);
}
