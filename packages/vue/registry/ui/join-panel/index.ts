export type JoinPanelRow = { label: string; value: string | number };
/** ✦ Quick-amount chip: sets the amount to `value`; without `value` it emits `max`. */
export type JoinPanelQuickAmount = { label: string; value?: string };
/** ✦ Mode tab, e.g. Join / Redeem. */
export type JoinPanelTab = { value: string; label: string };

export { default as JoinPanel } from "./JoinPanel.vue";
