export type IndexRowData = {
    name: string;
    symbol: string;
    /** One avatar per member (e.g. a constituent): image URL or a short label. */
    avatars: { label: string; image?: string }[];
    tags?: string[];
    /** Text of the owner column. */
    owner: string;
    price: string;
    /** Signed percentage, e.g. `+1.12%`. */
    change: string;
    /** Text of the value column (mono, right-aligned). */
    value: string;
    /** Text of the count column (mono, right-aligned). */
    count: string | number;
    /** Series for the trend sparkline. */
    spark?: number[];
    href?: string;
};

export type IndexRowHeaderLabels = {
    name?: string;
    owner?: string;
    price?: string;
    change?: string;
    value?: string;
    count?: string;
    trend?: string;
};

export { default as IndexRow } from "./IndexRow.vue";
export { default as IndexRowHeader } from "./IndexRowHeader.vue";
export { default as Sparkline } from "./Sparkline.vue";
