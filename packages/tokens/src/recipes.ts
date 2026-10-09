/**
 * Edmi UI component recipes — framework agnostic.
 *
 * Plain cva() definitions that only output Tailwind v4 class strings, so the same file works in
 * React (shadcn/ui), Vue (shadcn-vue) and Svelte (shadcn-svelte). In each framework, keep the
 * component that `shadcn add` generates and replace its class strings / cva variants with these.
 *
 * Requires: tokens/tokens.css + tokens/tailwind-v4.css loaded, `class-variance-authority` installed.
 * ✦ = Edmi UI addition, not in shadcn.
 *
 * THEMING: recipes only use tokens, so data-base / data-theme / .dark / --radius restyle everything (DESIGN.md §3).
 * NO TRANSPARENT FILLS (v3): tints are pre-mixed solids — never `/NN` opacity on bg or border; use color-mix(…, var(--popover)).
 * POSITIVE VALUES use `success` (badge variant, text-success-text), never `brand` — brand follows the theme.
 *
 * ELEVATION (v4, replaces the old `raised` prop): every component is FLAT by default (plain shadcn look).
 * One prop on every component that can take depth:  elevation?: "auto" | "sunken" | "flat" | "raised" | "floating"
 *   −1 sunken   = soft inset well (fields, wells)            → shadow-sunken + bg-sk-bg
 *    0 flat     = fill + 1px border (default)
 *   +1 raised   = bevel: inner rim + top highlight + dark hairline, no hard lip, no drop
 *   +2 floating = raised + one soft drop (buttons: 2px gloss + bottom shade + drop)
 * "auto" resolves: component prop → nearest [data-elevation] scope → global mode → flat.
 * Mode "layered" (data-elevation="layered" on any element) gives each ROLE its default level (see ROLE_LEVEL below).
 * Pressed always sinks 1px. A surface inside a raised/floating surface drops to 0 + border (no bevel on bevel).
 */
import { cva, type VariantProps } from "class-variance-authority";

export type Elevation = "auto" | "sunken" | "flat" | "raised" | "floating";
export type ElevationMode = "flat" | "layered";

/* Role defaults in layered mode. In flat mode everything is "flat". An explicit prop always wins. */
export const ROLE_LEVEL = {
  "button-filled": "raised",  // default · secondary · destructive · brand
  "button-quiet": "flat",     // outline · ghost · link
  field: "sunken",            // input · textarea · select trigger · OTP · input group
  control: "flat",            // checkbox · radio · tabs · segmented · pagination · badge
  handle: "raised",           // switch thumb · slider thumb · calendar selected day · kbd
  surface: "raised",          // card · node · panel body
  container: "flat",          // panel shell · nested card · alert · toast · tooltip
  overlay: "floating",        // popover · dropdown · select menu · dialog · composer
} as const;
export function resolveElevation(prop: Elevation | undefined, scope: Elevation | ElevationMode | undefined, role: keyof typeof ROLE_LEVEL): Exclude<Elevation, "auto"> {
  if (prop && prop !== "auto") return prop;
  if (scope && scope !== "auto" && scope !== "flat" && scope !== "layered") return scope;
  return scope === "layered" ? ROLE_LEVEL[role] : "flat";
}

/* Shared face + edge pieces (all tokens; light/dark/base/theme switch automatically). */
const face = "[background-origin:border-box] border-transparent";
const FACE = {
  primaryRaised: `${face} [background-image:var(--r1-p-face)]`,   // white faces get a slightly darker face so the white top edge reads
  neutralRaised: `${face} [background-image:var(--r1-s-face)]`,
  primaryFloat: `${face} [background-image:var(--fl-p-face)]`,
  neutralFloat: `${face} [background-image:var(--fl-s-face)]`,
};
export const surfaceElevation = {
  sunken: "bg-sk-bg border-sk-bd shadow-sunken",
  flat: "",
  raised: "border-transparent shadow-raised",
  floating: "border-transparent shadow-floating",
};

export const button = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[filter,transform,box-shadow] select-none " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:shrink-0 [&_svg]:size-4",
  {
    variants: {
      /* Flat by default (plain shadcn look). elevation ✦ adds depth. */
      variant: {
        default: "border border-transparent bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--primary)_90%,var(--background))] active:brightness-95",
        secondary: "border border-transparent bg-secondary text-secondary-foreground hover:bg-accent",
        outline: "border border-input bg-background text-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        destructive: "border border-transparent bg-destructive text-white hover:bg-[color-mix(in_srgb,var(--destructive)_90%,var(--background))]",
        link: "text-foreground underline underline-offset-4 px-1",
        brand: "border border-transparent bg-brand text-brand-foreground hover:bg-[color-mix(in_srgb,var(--brand)_90%,var(--background))]", // ✦
      },
      elevation: { flat: "", sunken: "", raised: "active:translate-y-px", floating: "active:translate-y-px" }, // ✦
      size: {
        xs: "h-6 px-2 text-xs rounded-md [&_svg]:size-3.5",
        sm: "h-8 px-3 text-[13px] rounded-[7px] gap-1.5 [&_svg]:size-3.5",
        default: "h-9 px-3.5 text-[13.5px] rounded-md",
        lg: "h-[42px] px-5 text-[15px] rounded-lg",
        "icon-xs": "size-6 rounded-md [&_svg]:size-3.5",
        "icon-sm": "size-8 rounded-[7px]",
        icon: "size-9 rounded-md",
        "icon-lg": "size-[42px] rounded-lg",
      },
    },
    compoundVariants: [
      /* +1 raised */
      { elevation: "raised", variant: "default", class: `${FACE.primaryRaised} shadow-btn-raised-primary hover:brightness-105 active:shadow-pressed` },
      { elevation: "raised", variant: ["secondary", "outline", "ghost"], class: `${FACE.neutralRaised} shadow-btn-raised-neutral active:shadow-pressed` },
      { elevation: "raised", variant: "destructive", class: `${face} bg-linear-to-b from-destructive-hi to-destructive shadow-btn-raised-color hover:brightness-105 active:shadow-pressed` },
      { elevation: "raised", variant: "brand", class: `${face} bg-linear-to-b from-brand-hi to-brand shadow-btn-raised-color hover:brightness-105 active:shadow-pressed` },
      /* +2 floating — one hero action per view */
      { elevation: "floating", variant: "default", class: `${FACE.primaryFloat} shadow-btn-float-primary active:shadow-pressed-float` },
      { elevation: "floating", variant: ["secondary", "outline", "ghost"], class: `${FACE.neutralFloat} shadow-btn-float-neutral active:shadow-pressed-float` },
      { elevation: "floating", variant: "destructive", class: `${face} bg-linear-to-b from-destructive-hi to-destructive shadow-btn-float-color active:shadow-pressed-float` },
      { elevation: "floating", variant: "brand", class: `${face} bg-linear-to-b from-brand-hi to-brand shadow-btn-float-color active:shadow-pressed-float` },
      /* −1 sunken: filled variants keep their color (8% darker) + inset; neutral ones become a well */
      { elevation: "sunken", variant: "default", class: "bg-[color-mix(in_srgb,var(--primary)_92%,#000)] border-transparent shadow-btn-sunken-filled" },
      { elevation: "sunken", variant: "destructive", class: "bg-[color-mix(in_srgb,var(--destructive)_92%,#000)] border-transparent shadow-btn-sunken-filled" },
      { elevation: "sunken", variant: "brand", class: "bg-[color-mix(in_srgb,var(--brand)_92%,#000)] border-transparent shadow-btn-sunken-filled" },
      { elevation: "sunken", variant: ["secondary", "outline", "ghost"], class: "bg-sk-bg border-sk-bd shadow-sunken" },
      // link never gets depth
      { elevation: ["raised", "floating", "sunken"], variant: "link", class: "bg-none shadow-none active:translate-y-0" },
    ],
    defaultVariants: { variant: "default", size: "default", elevation: "flat" },
  },
);

export const badge = cva(
  "inline-flex items-center gap-1.5 h-[22px] px-2 rounded-md border border-transparent text-xs font-medium whitespace-nowrap [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground border-border",
        destructive: "bg-destructive-soft text-destructive-text border-[color-mix(in_srgb,var(--destructive)_30%,var(--popover))]",
        outline: "border-input text-foreground",
        ghost: "text-foreground",
        link: "text-foreground underline underline-offset-[3px]",
        brand: "bg-brand-soft text-brand-text border-[color-mix(in_srgb,var(--brand)_30%,var(--popover))]", // ✦ custom color (follows the theme accent)
        success: "bg-success-soft text-success-text border-[color-mix(in_srgb,var(--success)_30%,var(--popover))]", // ✦ positive deltas / done states — always green, any theme
        warning: "bg-warning-soft text-warning-text border-[color-mix(in_srgb,var(--warning)_30%,var(--popover))]", // ✦
        info: "bg-info-soft text-info-text border-[color-mix(in_srgb,var(--info)_30%,var(--popover))]", // ✦
      },
      shape: { default: "", pill: "rounded-full", number: "min-w-[22px] justify-center px-1.5 font-mono text-[11px]" },
      /* ✦ badges keep their fill + tinted border at every level; only the edge changes */
      elevation: {
        flat: "",
        sunken: "shadow-[inset_0_1px_2px_rgb(0_0_0/0.22)]",
        raised: "shadow-raised",
        floating: "shadow-[inset_0_1px_0_var(--bv-top),0_0_1.5px_var(--bv-out),0_2px_5px_rgb(0_0_0/0.14)]",
      },
    },
    defaultVariants: { variant: "default", shape: "default", elevation: "flat" },
  },
);

/* Card. Flat by default (border only). elevation ✦: sunken well · raised bevel · floating bevel + drop. Sizes per shadcn.
   Nesting: a card inside a raised/floating surface renders flat + border (pass elevation="flat" or let auto resolve). */
export const card = cva("bg-card text-card-foreground border border-border rounded-xl", {
  variants: {
    size: { default: "[--card-spacing:22px]", sm: "[--card-spacing:16px]" },
    elevation: surfaceElevation, // ✦
  },
  defaultVariants: { size: "default", elevation: "flat" },
});

/* ✦ Inset panel (Card variant="inset"): header on the shell, body is an inner card running edge to edge
   with its own radius, inset 2px from the shell (left/right/bottom) so the depth reads; footer back on the shell.
   Shell is level 0 (never rises); the body plate is the raised part. */
export const insetPanel = {
  root: "flex flex-col overflow-hidden rounded-2xl border border-border bg-muted",
  header: "flex items-center gap-2 px-4 py-3 text-sm font-medium",
  body: "relative flex-1 mx-0.5 mb-0.5 overflow-hidden rounded-xl border border-border bg-card",
  bodyWithFooter: "mb-0", // footer sits right under the body
  fade: "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-14 after:bg-linear-to-b after:from-transparent after:to-card",
  footer: "bg-muted px-4 py-3 text-center text-[13px] text-foreground-2",
};
/* ✦ elevation on the panel: raised = body plate bevels; floating = shell gets the soft drop too. */
export const insetPanelElevation = {
  raised: { root: "", body: "border-transparent shadow-raised" },
  floating: { root: "border-transparent shadow-[0_0_1.5px_var(--bv-out),var(--bv-float)]", body: "border-transparent shadow-raised" },
  sunken: { root: "bg-sk-bg border-sk-bd shadow-sunken", body: "" },
};

/* Overlays. Natural level = floating (+2) in layered mode; flat in flat mode. Append surfaceElevation[level]. */
export const surface = {
  popover: "bg-popover text-popover-foreground border border-border rounded-xl p-1.5",
  dialog: "bg-popover text-popover-foreground border border-border rounded-2xl p-[22px]",
  sunk: "bg-sk-bg border border-sk-bd rounded-lg shadow-sunken", // a well / sunken region (−1)
  overlay: "bg-overlay",
};

export const menuItem = cva(
  "flex h-8 items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-45 [&_svg]:size-[15px] [&_svg]:text-muted-foreground",
  { variants: { variant: { default: "", destructive: "text-destructive-text [&_svg]:text-destructive-text" } }, defaultVariants: { variant: "default" } },
);
export const menuLabel = "px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground";
export const menuShortcut = "ml-auto font-mono text-[11.5px] tracking-wide text-muted-foreground";

/* Tabs. Flat by default: active = --tab-active + 1px border (with or without a track).
   elevation="raised" ✦ on the list: ONLY the active trigger rises (bevel); the list/track itself never gets the bevel. */
const raisedActive = "data-[state=active]:[background-image:var(--r1-s-face)] data-[state=active]:[background-origin:border-box] data-[state=active]:border-transparent data-[state=active]:shadow-btn-raised-neutral";
export const tabs = {
  list: cva("", {
    variants: {
      variant: {
        default: "inline-flex gap-0.5 rounded-lg border border-border bg-muted p-[3px] shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)]",
        line: "flex gap-[22px] border-b border-border",
        pills: "inline-flex gap-1", // ✦ no track
      },
    },
    defaultVariants: { variant: "default" },
  }),
  trigger: cva("inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted-foreground", {
    variants: {
      variant: {
        default: "h-[30px] px-3.5 rounded-[7px] border border-transparent data-[state=active]:bg-tab-active data-[state=active]:border-border data-[state=active]:text-foreground",
        line: "px-0.5 pb-[11px] -mb-px border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground",
        pills: "h-8 px-3 rounded-[7px] border border-transparent data-[state=active]:bg-tab-active data-[state=active]:border-border data-[state=active]:text-foreground",
      },
      elevation: { flat: "", raised: "" }, // ✦ pass the TabsList elevation down to each trigger
    },
    compoundVariants: [
      { variant: "default", elevation: "raised", class: raisedActive },
      { variant: "pills", elevation: "raised", class: raisedActive },
    ],
    defaultVariants: { variant: "default", elevation: "flat" },
  }),
};

/* Toggle / Toggle Group (spacing 2 default; spacing 0 joins items). Flat by default; elevation ✦ opt-in.
   Default (non-outline) toggle: only the ON state shows depth (pressed in). Outline toggle: the whole button rises. */
export const toggle = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md text-[13.5px] font-medium text-muted-foreground border border-transparent " +
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: { default: "", outline: "border-input text-foreground" },
      size: { sm: "h-8 min-w-8 px-2", default: "h-9 min-w-9 px-2.5", lg: "h-[42px] min-w-[42px] px-3" },
      elevation: { flat: "", raised: "data-[state=on]:shadow-pressed", floating: "data-[state=on]:shadow-pressed" }, // ✦
    },
    compoundVariants: [
      { variant: "outline", elevation: "raised", class: `${FACE.neutralRaised} shadow-btn-raised-neutral data-[state=on]:bg-none data-[state=on]:bg-accent data-[state=on]:shadow-pressed` },
      { variant: "outline", elevation: "floating", class: `${FACE.neutralFloat} shadow-btn-float-neutral data-[state=on]:bg-none data-[state=on]:bg-accent data-[state=on]:shadow-pressed-float` },
    ],
    defaultVariants: { variant: "default", size: "default", elevation: "flat" },
  },
);
export const segmented = { // ✦ ToggleGroup type="single" inside a track
  root: "inline-flex gap-0.5 rounded-lg border border-border bg-muted p-[3px] shadow-[inset_0_1px_2px_rgb(0_0_0/0.04)]",
  item: "h-[30px] min-w-[30px] px-3 rounded-[7px] border border-transparent text-[13.5px] font-medium text-muted-foreground data-[state=on]:bg-tab-active data-[state=on]:border-border data-[state=on]:text-foreground",
  itemRaised: raisedActive.replaceAll("state=active", "state=on"), // ✦ add to item when elevation="raised" (only the ON item rises)
};

/* Forms. Control height = button height (h-9 / 36px), like shadcn. Fields are flat by default and sink (−1) in layered mode:
   add fieldSunken (or surfaceElevation.sunken) — focus swaps the edge for the ring. */
export const fieldSunken = "bg-sk-bg border-sk-bd shadow-sunken focus-visible:bg-card";
export const input =
  "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-card px-3 text-sm placeholder:text-muted-foreground " +
  "focus-visible:border-ring focus-visible:shadow-ring outline-none aria-invalid:border-destructive aria-invalid:shadow-ring-error disabled:opacity-50 disabled:bg-muted";
export const textarea = input.replace("h-9", "min-h-24 py-2.5 leading-relaxed");
/* ✦ Field elevation (v6): fields also take raised (+1) and floating (+2) when set explicitly — a bevel face (--bv-face-b), no border colour,
   focus swaps the bevel for the ring. Use on Input · Textarea · Input Group root · Input OTP group. OTP: one plate, slots become
   transparent with 1px left separators, the active slot gets the ring. Errors keep the destructive border + ring at every level. */
export const fieldElevation = {
  sunken: fieldSunken,
  flat: "",
  raised: "border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-raised focus-visible:border-ring focus-visible:shadow-ring",
  floating: "border-transparent bg-[image:linear-gradient(var(--bv-face-b),var(--bv-face-b))] shadow-floating focus-visible:border-ring focus-visible:shadow-ring",
};
export const selectTrigger = cva("flex h-9 items-center justify-between gap-2 rounded-md border border-input bg-card pl-3 pr-2.5 text-sm data-[state=open]:border-ring data-[state=open]:shadow-ring", {
  variants: { elevation: { ...surfaceElevation, sunken: fieldSunken } }, // ✦ sunken (layered default) · raised · floating
  defaultVariants: { elevation: "flat" },
});
export const inputGroup = {
  root: "flex h-9 items-stretch overflow-hidden rounded-md border border-input bg-card focus-within:border-ring focus-within:shadow-ring",
  text: "flex items-center bg-muted px-2.5 text-[13px] text-muted-foreground", // add border-r / border-l border-input by side
};
/* Inside ButtonGroup: Input/InputGroup drops its right radius + inner shadow so it joins the button (same 36px height). */
export const buttonGroupInput = "rounded-r-none shadow-none";
export const checkbox = cva("size-[18px] rounded-[5px] border border-input bg-card data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground", {
  variants: { elevation: { flat: "", raised: "data-[state=checked]:[background-image:var(--r1-p-face)] data-[state=checked]:border-transparent data-[state=checked]:shadow-btn-raised-primary" } }, // ✦ only the checked box rises
  defaultVariants: { elevation: "flat" },
});
export const radio = "size-[18px] rounded-full border border-input bg-card data-[state=checked]:border-primary [&_[data-indicator]]:size-[9px] [&_[data-indicator]]:rounded-full [&_[data-indicator]]:bg-primary";
export const switchRoot = cva("relative inline-flex shrink-0 rounded-full bg-input shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] data-[state=checked]:bg-brand", {
  variants: { size: { default: "h-6 w-10", sm: "h-[18px] w-8" } }, defaultVariants: { size: "default" },
});
export const switchThumb = cva("block rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.1)] size-[18px] translate-x-[3px] data-[state=checked]:translate-x-[19px]", {
  variants: { elevation: { flat: "", raised: "bg-linear-to-b from-white to-[#eeede9] shadow-thumb" } }, // ✦ only the thumb rises, never the track
  defaultVariants: { elevation: "flat" },
});
export const slider = {
  track: "h-1.5 rounded-full border border-border bg-muted",
  range: "rounded-full bg-brand",
  thumb: cva("size-[18px] rounded-full border border-brand-edge bg-white focus-visible:shadow-[0_0_0_4px_var(--ring-soft)]", {
    variants: { elevation: { flat: "", raised: "border-transparent bg-linear-to-b from-white to-[#eeede9] shadow-thumb focus-visible:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)]" } }, // ✦
    defaultVariants: { elevation: "flat" },
  }),
};
export const kbd = cva("inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[5px] border border-input bg-muted px-1.5 font-mono text-[11.5px] text-muted-foreground", {
  variants: { elevation: { flat: "", raised: `${FACE.neutralRaised} shadow-btn-raised-neutral`, floating: `${FACE.neutralFloat} shadow-btn-float-neutral` } }, // ✦
  defaultVariants: { elevation: "flat" },
});
/* Calendar: elevation goes on the SHELL (the calendar popover/card), never on the day grid.
   The only part inside that rises is the selected day. */
export const calendarShell = cva("bg-popover border border-border rounded-xl p-3", {
  variants: { elevation: surfaceElevation }, defaultVariants: { elevation: "flat" },
});
export const calendarSelected = cva("bg-primary text-primary-foreground", {
  variants: { elevation: { flat: "", raised: "[background-image:var(--r1-p-face)] shadow-btn-raised-primary" } },
  defaultVariants: { elevation: "flat" },
});
/* Pagination: only the active link rises; the list never does. */
export const paginationActive = cva("border border-input bg-card font-semibold", {
  variants: { elevation: { flat: "", raised: "border-transparent shadow-btn-raised-neutral" } },
  defaultVariants: { elevation: "flat" },
});
/* Choice card (checkbox/radio card, questionnaire option). */
export const choiceCard = cva("flex gap-3 rounded-xl border border-border bg-card p-3.5 data-[state=checked]:border-ring data-[state=checked]:shadow-[0_0_0_1px_var(--ring)]", {
  variants: { elevation: { ...surfaceElevation, sunken: "bg-sk-bg border-sk-bd shadow-sunken" } }, // ✦ checked keeps the ring
  defaultVariants: { elevation: "flat" },
});

/* Feedback */
export const alert = cva("grid grid-cols-[20px_1fr_auto] gap-x-3 gap-y-0.5 rounded-xl border px-4 py-3.5", {
  variants: {
    variant: {
      default: "bg-card border-border",
      destructive: "bg-destructive-soft border-[color-mix(in_srgb,var(--destructive)_40%,var(--popover))] text-destructive-text",
      brand: "bg-brand-soft border-[color-mix(in_srgb,var(--brand)_40%,var(--popover))] text-brand-text", // ✦
      success: "bg-success-soft border-[color-mix(in_srgb,var(--success)_40%,var(--popover))] text-success-text", // ✦
      info: "bg-info-soft border-[color-mix(in_srgb,var(--info)_40%,var(--popover))] text-info-text", // ✦
      warning: "bg-warning-soft border-[color-mix(in_srgb,var(--warning)_40%,var(--popover))] text-warning-text", // ✦
    },
  },
  defaultVariants: { variant: "default" },
});
export const toast = cva("flex w-[360px] items-start gap-3 rounded-xl border border-border bg-popover px-4 py-3.5", {
  variants: { elevation: { flat: "", raised: surfaceElevation.raised, floating: surfaceElevation.floating } }, // ✦ floating is the natural level
  defaultVariants: { elevation: "flat" },
});
export const tooltip = "rounded-[7px] bg-primary px-2.5 py-1.5 text-[12.5px] text-primary-foreground";

/* Conversation */
export const bubble = cva("inline-block max-w-[360px] rounded-2xl border border-transparent px-[13px] py-[9px] text-sm leading-normal", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground border-border",
      muted: "bg-muted text-muted-foreground",
      tinted: "bg-brand-soft text-foreground border-[color-mix(in_srgb,var(--brand)_25%,var(--popover))]",
      outline: "border-input bg-transparent",
      ghost: "bg-transparent px-0", // keep the vertical padding so avatars line up with the first line
      destructive: "bg-destructive-soft text-destructive-text border-[color-mix(in_srgb,var(--destructive)_30%,var(--popover))]",
    },
  },
  defaultVariants: { variant: "default" },
});
/* Floating chips on top of another surface: SOLID, no ring, 1px border. */
export const reaction = cva("inline-flex h-[22px] items-center gap-1 rounded-full border px-[7px] text-[11.5px] bg-popover border-border", {
  variants: {
    active: { true: "bg-[color-mix(in_srgb,var(--brand)_14%,var(--popover))] border-[color-mix(in_srgb,var(--brand)_45%,var(--popover))] text-brand-text", false: "" },
    elevation: { flat: "", raised: "border-transparent shadow-btn-raised-neutral" }, // ✦
  },
  defaultVariants: { active: false, elevation: "flat" },
});
/* Message row: avatar is top-aligned with the header line (or the first bubble line when there is no header);
   footer sits below the bubble on the message side, indented by avatar width + gap (40px). */
/* ✦ Button group: +1 = each item raised; +2 = the GROUP floats as one plate (items stay +1), never a drop per item. */
export const buttonGroupFloating = "rounded-lg shadow-group-float";

export const message = {
  row: "flex items-start gap-2.5 data-[align=end]:flex-row-reverse",
  header: "flex h-[30px] items-center gap-2 text-xs",
  avatarNoHeader: "mt-[5px]",
  footer: "mt-1.5 ml-10 data-[align=end]:ml-0 data-[align=end]:mr-10",
};

export type ButtonProps = VariantProps<typeof button>;
export type BadgeProps = VariantProps<typeof badge>;
export type CardProps = VariantProps<typeof card>;
export type ToggleProps = VariantProps<typeof toggle>;


/* Chart (v6) — see CHART_KIT.md. Series colour is always var(--chart-N) via ChartConfig → --color-<key>. */
export const chartCard = {
  root: "flex min-w-0 flex-col",                        // Card + elevation (flat default; raised for a featured chart)
  header: "flex flex-col gap-1 px-6 pt-5.5",            // title 16/600 · description 13.5 muted
  content: "flex flex-col items-center px-5 pt-2.5",    // ChartContainer, aspect-video or fixed height
  footer: "flex flex-col gap-1 px-6 pb-5.5 pt-3.5 text-[13.5px]", // trend line (font-medium) + period (muted)
};
export const chartLegend = "flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-2.5 text-[12.5px] text-foreground-2 [&_i]:mr-1.5 [&_i]:inline-block [&_i]:size-2 [&_i]:rounded-[2px]";
export const chartTooltip = "grid min-w-36 gap-1.5 rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-floating"; // always floating +2
export const chartStatWell = cva("flex flex-col gap-1 border-l border-border px-6 py-4 text-left", {
  variants: { active: { true: "bg-sk-bg shadow-sunken", false: "" } }, // active well sinks (−1)
  defaultVariants: { active: false },
});
