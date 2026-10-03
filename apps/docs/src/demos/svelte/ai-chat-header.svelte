<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		ChatHeader,
		ChatHeaderActions,
		ChatHeaderMenu,
		ChatHeaderProject,
		ChatHeaderShare,
		ChatHeaderTitle,
	} from "@edmi-svelte/ai/chat-header";
	import { Button } from "@edmi-svelte/ui/button";
	import { DropdownMenuItem } from "@edmi-svelte/ui/dropdown-menu";
</script>

<ChatHeader class="max-w-3xl">
	<ChatHeaderTitle>
		<span class="truncate">Keeper starter plan</span>
		<ChatHeaderProject status="connected" />
		<ChatHeaderMenu>
			<DropdownMenuItem>Rename</DropdownMenuItem>
			<DropdownMenuItem>Move to project</DropdownMenuItem>
			<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
		</ChatHeaderMenu>
	</ChatHeaderTitle>
	<ChatHeaderActions>
		<Button aria-label="Web access" size="icon-sm" type="button" variant="ghost">
			<IconPlaceholder
				lucide="GlobeIcon"
				tabler="IconWorld"
				hugeicons="Globe02Icon"
				phosphor="GlobeIcon"
				remixicon="RiGlobalLine"
				class="size-4"
			/>
		</Button>
		<Button size="sm" type="button" variant="ghost">
			<IconPlaceholder
				lucide="FileTextIcon"
				tabler="IconFileDescription"
				hugeicons="File01Icon"
				phosphor="FileTextIcon"
				remixicon="RiFileTextLine"
				class="size-3.5"
			/>
			1
		</Button>
		<ChatHeaderShare />
	</ChatHeaderActions>
</ChatHeader>
