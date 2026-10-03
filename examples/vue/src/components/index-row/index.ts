export type IndexRowData = {
    name: string;
    symbol: string;
    /** One avatar per constituent token: image URL or a short label. */
    tokens: { label: string; image?: string }[];
    tags?: string[];
    creator: string;
    price: string;
    /** Signed percentage, e.g. `+1.12%`. */
    change: string;
    aum: string;
    holders: string | number;
    /** Series for the 30d sparkline. */
    spark?: number[];
    href?: string;
};

export { default as IndexRow } from "./IndexRow.vue";
export { default as IndexRowHeader } from "./IndexRowHeader.vue";
export { default as Sparkline } from "./Sparkline.vue";
