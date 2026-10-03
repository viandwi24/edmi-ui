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
 * DEPTH RULE: every component is FLAT by default (plain shadcn look: solid fill + 1px border).
 * The one-step 3D look is opt-in with `raised: true` (✦), available on every component below.
 */
import { cva, type VariantProps } from "class-variance-authority";

/* Raised controls: gradient fill + 1px top highlight + ONE hard lip (bottom border and 2px shadow share the lip color).
   Never an inner bottom shade, never blur — that creates a 'stair' with two steps.
   `data-raised` sets background-origin: border-box so the gradient does not repeat under the border. */
const raised = "border bg-linear-to-b [background-origin:border-box]";

export const button = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[filter,transform,box-shadow] select-none " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:shrink-0 [&_svg]:size-4",
  {
    variants: {
      /* Flat by default (plain shadcn look). Add `raised` for the one-step 3D look ✦ */
      variant: {
        default: "border border-transparent bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--primary)_90%,var(--background))] active:brightness-95",
        secondary: "border border-transparent bg-secondary text-secondary-foreground hover:bg-accent",
        outline: "border border-input bg-background text-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
        destructive: "border border-transparent bg-destructive text-white hover:bg-[color-mix(in_srgb,var(--destructive)_90%,var(--background))]",
        link: "text-foreground underline underline-offset-4 px-1",
        brand: "border border-transparent bg-brand text-brand-foreground hover:bg-[color-mix(in_srgb,var(--brand)_90%,var(--background))]", // ✦
      },
      raised: { false: "", true: "active:translate-y-[2px]" }, // ✦ opt-in one-step 3D
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
      { raised: true, variant: "default", class: `${raised} from-primary-hi to-primary border-primary-edge border-b-primary-lip shadow-btn-primary hover:brightness-105 active:shadow-pressed active:border-b-primary-edge` },
      { raised: true, variant: "secondary", class: `${raised} from-secondary-hi to-secondary border-input border-b-secondary-lip shadow-btn-secondary hover:from-accent hover:to-accent active:shadow-pressed` },
      { raised: true, variant: "outline", class: "bg-linear-to-b from-outline-hi to-outline-face [background-origin:border-box] border-b-outline-lip shadow-btn-outline hover:from-accent hover:to-accent active:shadow-none active:bg-none active:bg-outline-face" }, // gray lip in dark (rev 1)
      { raised: true, variant: "destructive", class: `${raised} from-destructive-hi to-destructive border-destructive-edge border-b-destructive-lip shadow-btn-destructive hover:brightness-105 active:shadow-pressed` },
      { raised: true, variant: "brand", class: `${raised} from-brand-hi to-brand border-brand-edge border-b-brand-lip shadow-btn-brand hover:brightness-105 active:shadow-pressed` },
      // ghost & link never get raised
      { raised: true, variant: ["ghost", "link"], class: "active:translate-y-0" },
    ],
    defaultVariants: { variant: "default", size: "default", raised: false },
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
    },
    defaultVariants: { variant: "default", shape: "default" },
  },
);

/* Card. Flat by default (border only). raised ✦ = hard 2px lip + top highlight, no blur. Sizes per shadcn (default | sm). */
export const card = cva("bg-card text-card-foreground border border-border rounded-xl", {
  variants: {
    size: { default: "[--card-spacing:22px]", sm: "[--card-spacing:16px]" },
    raised: { false: "", true: "border-b-lip shadow-card" }, // ✦
  },
  defaultVariants: { size: "default", raised: false },
});

/* ✦ Inset panel (Card variant="inset"): header on the shell, body is an inner card running edge to edge
   with radius on the top corners only, footer back on the shell. Flat by default; add raisedPanel for 3D. */
export const insetPanel = {
  root: "flex flex-col overflow-hidden rounded-2xl border border-border bg-muted",
  header: "flex items-center gap-2 px-4 py-3 text-sm font-medium",
  body: "relative flex-1 -mx-px overflow-hidden rounded-t-xl border border-b-0 border-border bg-card",
  bodyFull: "-mb-px", // no footer: body runs to the bottom
  fade: "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-14 after:bg-linear-to-b after:from-transparent after:to-card",
  footer: "border-t border-border bg-muted px-4 py-3 text-center text-[13px] text-foreground-2",
};
export const raisedPanel = { root: "border-b-lip-strong shadow-dialog", body: "shadow-[inset_0_1px_0_var(--card-hi)]" }; // ✦

/* Elevation. Flat by default; append the raisedSurface string (✦) for the one-step lip. */
export const surface = {
  popover: "bg-popover text-popover-foreground border border-border rounded-xl p-1.5",
  dialog: "bg-popover text-popover-foreground border border-border rounded-2xl p-[22px]",
  sunk: "bg-muted border border-border-2 rounded-lg shadow-sunk",
  overlay: "bg-overlay",
};
export const raisedSurface = { popover: "border-b-lip shadow-pop", dialog: "border-b-lip-strong shadow-dialog" }; // ✦

export const menuItem = cva(
  "flex h-8 items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-45 [&_svg]:size-[15px] [&_svg]:text-muted-foreground",
  { variants: { variant: { default: "", destructive: "text-destructive-text [&_svg]:text-destructive-text" } }, defaultVariants: { variant: "default" } },
);
export const menuLabel = "px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground";
export const menuShortcut = "ml-auto font-mono text-[11.5px] tracking-wide text-muted-foreground";

/* Tabs. Flat by default: active = --tab-active + 1px border (with or without a track).
   raised ✦ on the list/trigger makes the active trigger a 3D secondary button. */
const raisedActive = "data-[state=active]:bg-linear-to-b data-[state=active]:[background-origin:border-box] data-[state=active]:from-secondary-hi data-[state=active]:to-secondary data-[state=active]:border-input data-[state=active]:border-b-secondary-lip data-[state=active]:shadow-btn-secondary";
export const tabs = {
  list: cva("", {
    variants: {
      variant: {
        default: "inline-flex gap-0.5 rounded-lg border border-border bg-muted p-[3px] shadow-sunk",
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
      raised: { false: "", true: "" }, // ✦ pass the TabsList raised prop down to each trigger
    },
    compoundVariants: [
      { variant: "default", raised: true, class: raisedActive },
      { variant: "pills", raised: true, class: raisedActive },
    ],
    defaultVariants: { variant: "default", raised: false },
  }),
};

/* Toggle / Toggle Group (spacing 2 default; spacing 0 joins items). Flat by default; raised ✦ opt-in. */
export const toggle = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md text-[13.5px] font-medium text-muted-foreground border border-transparent " +
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: { default: "", outline: "border-input text-foreground" },
      size: { sm: "h-8 min-w-8 px-2", default: "h-9 min-w-9 px-2.5", lg: "h-[42px] min-w-[42px] px-3" },
      raised: { false: "", true: "data-[state=on]:translate-y-px data-[state=on]:shadow-sunk" }, // ✦
    },
    compoundVariants: [{ variant: "outline", raised: true, class: "bg-linear-to-b from-outline-hi to-outline-face [background-origin:border-box] border-b-outline-lip shadow-btn-outline data-[state=on]:bg-none data-[state=on]:bg-accent data-[state=on]:shadow-sunk" }],
    defaultVariants: { variant: "default", size: "default", raised: false },
  },
);
export const segmented = { // ✦ ToggleGroup type="single" inside a track
  root: "inline-flex gap-0.5 rounded-lg border border-border bg-muted p-[3px] shadow-sunk",
  item: "h-[30px] min-w-[30px] px-3 rounded-[7px] border border-transparent text-[13.5px] font-medium text-muted-foreground data-[state=on]:bg-tab-active data-[state=on]:border-border data-[state=on]:text-foreground",
  itemRaised: raisedActive.replaceAll("state=active", "state=on"), // ✦ add to item when raised
};

/* Forms. Control height = button height (h-9 / 36px), like shadcn. */
export const input =
  "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-card px-3 text-sm shadow-sunk placeholder:text-muted-foreground " +
  "focus-visible:border-ring focus-visible:shadow-ring outline-none aria-invalid:border-destructive aria-invalid:shadow-ring-error disabled:opacity-50 disabled:bg-muted";
export const textarea = input.replace("h-9", "min-h-24 py-2.5 leading-relaxed");
export const selectTrigger = cva("flex h-9 items-center justify-between gap-2 rounded-md border border-input bg-card pl-3 pr-2.5 text-sm data-[state=open]:border-ring data-[state=open]:shadow-ring", {
  variants: { raised: { false: "", true: "border-b-lip shadow-btn-outline data-[state=open]:border-b-ring" } }, // ✦
  defaultVariants: { raised: false },
});
export const inputGroup = {
  root: "flex h-9 items-stretch overflow-hidden rounded-md border border-input bg-card shadow-sunk focus-within:border-ring focus-within:shadow-ring",
  text: "flex items-center bg-muted px-2.5 text-[13px] text-muted-foreground", // add border-r / border-l border-input by side
};
/* Inside ButtonGroup: Input/InputGroup drops its right radius + inner shadow so it joins the button (same 36px height). */
export const buttonGroupInput = "rounded-r-none shadow-none";
export const checkbox = cva("size-[18px] rounded-[5px] border border-input bg-card shadow-sunk data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground", {
  variants: { raised: { false: "", true: "data-[state=checked]:bg-linear-to-b data-[state=checked]:[background-origin:border-box] data-[state=checked]:from-primary-hi data-[state=checked]:to-primary data-[state=checked]:border-primary-edge data-[state=checked]:shadow-[inset_0_1px_0_var(--primary-inset)]" } }, // ✦
  defaultVariants: { raised: false },
});
export const radio = "size-[18px] rounded-full border border-input bg-card data-[state=checked]:border-primary [&_[data-indicator]]:size-[9px] [&_[data-indicator]]:rounded-full [&_[data-indicator]]:bg-primary";
export const switchRoot = cva("relative inline-flex shrink-0 rounded-full bg-input shadow-[inset_0_1px_2px_rgb(0_0_0/0.12)] data-[state=checked]:bg-brand", {
  variants: { size: { default: "h-6 w-10", sm: "h-[18px] w-8" } }, defaultVariants: { size: "default" },
});
export const switchThumb = cva("block rounded-full bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.1)] size-[18px] translate-x-[3px] data-[state=checked]:translate-x-[19px]", {
  variants: { raised: { false: "", true: "bg-linear-to-b from-white to-[#f1f0ec] shadow-[0_1px_0_rgb(0_0_0/0.25)]" } }, // ✦
  defaultVariants: { raised: false },
});
export const slider = {
  track: "h-1.5 rounded-full border border-border bg-muted",
  range: "rounded-full bg-brand",
  thumb: cva("size-[18px] rounded-full border border-brand-edge bg-white focus-visible:shadow-[0_0_0_4px_var(--ring-soft)]", {
    variants: { raised: { false: "", true: "border-b-brand-lip bg-linear-to-b from-white to-[#f1f0ec] shadow-[0_2px_0_var(--brand-lip)] focus-visible:shadow-[0_0_0_4px_var(--ring-soft),0_2px_0_var(--brand-lip)]" } }, // ✦
    defaultVariants: { raised: false },
  }),
};
export const kbd = cva("inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[5px] border border-input bg-muted px-1.5 font-mono text-[11.5px] text-muted-foreground", {
  variants: { raised: { false: "", true: `${raised} from-secondary-hi to-muted border-b-secondary-lip shadow-[0_1px_0_var(--secondary-lip)]` } }, // ✦
  defaultVariants: { raised: false },
});
/* Calendar selected day: flat primary; raised ✦ adds gradient + primary lip. */
export const calendarSelected = cva("bg-primary text-primary-foreground", {
  variants: { raised: { false: "", true: "bg-linear-to-b from-primary-hi to-primary border-b-primary-lip shadow-[0_2px_0_var(--primary-lip)]" } },
  defaultVariants: { raised: false },
});
/* Pagination active link: outline, flat; raised ✦ adds the lip. */
export const paginationActive = cva("border border-input bg-card font-semibold", {
  variants: { raised: { false: "", true: "border-b-lip shadow-btn-outline" } },
  defaultVariants: { raised: false },
});
/* Choice card (checkbox/radio card, questionnaire option). */
export const choiceCard = cva("flex gap-3 rounded-xl border border-border bg-card p-3.5 data-[state=checked]:border-ring data-[state=checked]:shadow-[0_0_0_1px_var(--ring)]", {
  variants: { raised: { false: "", true: "border-b-lip shadow-card data-[state=checked]:border-b-ring" } }, // ✦
  defaultVariants: { raised: false },
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
  variants: { raised: { false: "", true: "border-b-lip shadow-[0_3px_0_var(--lip)]" } }, // ✦
  defaultVariants: { raised: false },
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
    raised: { false: "", true: "border-b-lip shadow-[0_1px_0_var(--lip)]" }, // ✦
  },
  defaultVariants: { active: false, raised: false },
});
/* Message row: avatar is top-aligned with the header line (or the first bubble line when there is no header);
   footer sits below the bubble on the message side, indented by avatar width + gap (40px). */
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
