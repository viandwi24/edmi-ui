import type { InjectionKey } from "vue";
import type { Elevation } from "@/registry/edmi/ui/elevation";

export type KanbanColumnContext = { readonly elevation?: Elevation };

/** Depth handed from a `KanbanColumn` to its `KanbanItem`s (an item's own `elevation` wins). */
export const KANBAN_COLUMN_KEY: InjectionKey<KanbanColumnContext> =
	Symbol("EDMI_KANBAN_COLUMN");
