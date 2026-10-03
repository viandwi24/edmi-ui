export type TickerItem = {
    symbol: string;
    price: string;
    /** Signed percentage string, e.g. `+0.42%` or `−0.31%`. Sign sets the color. */
    change: string;
    /** Avatar image; falls back to the symbol's first letter. */
    image?: string;
    href?: string;
};

export { default as TickerStrip } from "./TickerStrip.vue";
