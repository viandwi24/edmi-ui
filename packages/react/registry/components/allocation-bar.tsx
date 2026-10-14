// Dev-only alias: pattern blocks install flat into `components/`, so sibling blocks import each other as
// `@/registry/edmi/components/<name>` (the CLI rewrites that to the consumer's components alias). Never shipped.
export * from "../blocks/allocation-bar/allocation-bar";
