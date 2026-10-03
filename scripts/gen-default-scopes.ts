// Writes packages/tokens/src/base/stone.css and themes/green.css: the default base/theme as explicit
// `[data-base="stone"]` / `[data-theme="green"]` rules (values from tokens.css), so nested scopes can
// switch back to the defaults. Run after changing tokens.css or adding a base/theme: `bun scripts/gen-default-scopes.ts`.
import { writeFileSync } from "node:fs";
import { defaultScopeCss } from "../packages/tokens/src/css-vars.ts";

const src = new URL("../packages/tokens/src/", import.meta.url);
writeFileSync(new URL("base/stone.css", src), defaultScopeCss("base"));
writeFileSync(new URL("themes/green.css", src), defaultScopeCss("theme"));
console.log("wrote base/stone.css, themes/green.css");
