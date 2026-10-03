<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown, EyeIcon } from "@lucide/vue";
import { cn } from "@/registry/edmi/lib/utils";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";

const props = defineProps<{
	/** Any TanStack `Column`; typed structurally so `h(DataTableColumnHeader, { column })` needs no generics. */
	column: {
		getCanSort: () => boolean;
		getCanHide: () => boolean;
		getIsSorted: () => false | "asc" | "desc";
		toggleSorting: (desc?: boolean) => void;
		toggleVisibility: (value?: boolean) => void;
	};
	title: string;
	/** ✦ Right-align the title (numeric columns, DESIGN §4 rule 10). */
	numeric?: boolean;
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<div
		v-if="!column.getCanSort()"
		:class="cn(numeric && 'text-right', props.class)"
	>
		{{ title }}
	</div>
	<div
		v-else
		:class="cn('flex items-center gap-2', numeric && 'justify-end', props.class)"
	>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button
					variant="ghost"
					size="xs"
					:class="cn(
						'-ml-2 text-[12.5px] font-medium text-muted-foreground data-[state=open]:bg-accent',
						numeric && '-mr-2 ml-0',
						column.getIsSorted() && 'text-foreground',
					)"
				>
					<span>{{ title }}</span>
					<ArrowDownIcon v-if="column.getIsSorted() === 'desc'" />
					<ArrowUpIcon v-else-if="column.getIsSorted() === 'asc'" />
					<ChevronsUpDown v-else />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent :align="numeric ? 'end' : 'start'">
				<DropdownMenuItem @click="column.toggleSorting(false)">
					<ArrowUpIcon />
					Asc
				</DropdownMenuItem>
				<DropdownMenuItem @click="column.toggleSorting(true)">
					<ArrowDownIcon />
					Desc
				</DropdownMenuItem>
				<template v-if="column.getCanHide()">
					<DropdownMenuSeparator />
					<DropdownMenuItem @click="column.toggleVisibility(false)">
						<EyeIcon />
						Hide
					</DropdownMenuItem>
				</template>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>
