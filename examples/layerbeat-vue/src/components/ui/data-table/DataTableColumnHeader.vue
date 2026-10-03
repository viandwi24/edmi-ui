<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PhArrowDown, PhArrowUp, PhCaretUpDown, PhEye } from '@phosphor-icons/vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
					<PhArrowDown v-if="column.getIsSorted() === 'desc'" />
					<PhArrowUp v-else-if="column.getIsSorted() === 'asc'" />
					<PhCaretUpDown v-else />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent :align="numeric ? 'end' : 'start'">
				<DropdownMenuItem @click="column.toggleSorting(false)">
					<PhArrowUp />
					Asc
				</DropdownMenuItem>
				<DropdownMenuItem @click="column.toggleSorting(true)">
					<PhArrowDown />
					Desc
				</DropdownMenuItem>
				<template v-if="column.getCanHide()">
					<DropdownMenuSeparator />
					<DropdownMenuItem @click="column.toggleVisibility(false)">
						<PhEye />
						Hide
					</DropdownMenuItem>
				</template>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>
