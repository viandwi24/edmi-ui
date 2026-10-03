#!/usr/bin/env bash
# Smoke test: registry theme items (theme-<base>-<accent>) and the Themes page "Copy CSS" output.
#   React  : init + `registry add @edmi-ui=...` + add @edmi-ui/theme @edmi-ui/theme-slate-ocean, check the cssVars
#            in src/index.css (light + dark), paste Copy CSS (Stone x Ocean, radius 0.75rem), tsc + vite build.
#   Vue    : same flow with shadcn-vue (namespace in components.json).
#   Svelte : URL install of theme-slate-ocean.json.
# The theme items have no registryDependencies, so this does not depend on the namespace the generator
# writes into other items. Usage: bash scripts/smoke/theme.sh [react] [vue] [svelte]   (default: all three)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-smoke-theme.XXXXXX")"
SERVER_PID=""
cleanup() {
	[ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
	if [ "${KEEP:-0}" = "1" ]; then echo "kept $WORK"; else rm -rf "$WORK"; fi
}
trap cleanup EXIT

FWS=("$@")
[ ${#FWS[@]} -eq 0 ] && FWS=(react vue svelte)
has() { for f in "${FWS[@]}"; do [ "$f" = "$1" ] && return 0; done; return 1; }

mkdir -p "$WORK/public"
bun "$ROOT/scripts/smoke/serve.ts" "$WORK/public" "$WORK/port" >"$WORK/server.log" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 50); do [ -s "$WORK/port" ] && break; sleep 0.1; done
PORT="$(cat "$WORK/port")"
(cd "$ROOT" && EDMI_URL="http://localhost:$PORT" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)

build() {
	mkdir -p "$WORK/public/r/$1"
	case "$1" in
	react) (cd "$ROOT/packages/react" && bunx shadcn@latest build "$WORK/gen/react/registry.json" --cwd "$ROOT/packages/react" --output "$WORK/public/r/react" </dev/null >/dev/null) ;;
	vue) (cd "$ROOT/packages/vue" && bunx shadcn-vue@latest build "$WORK/gen/vue/registry.json" --cwd "$ROOT/packages/vue" --output "$WORK/public/r/vue" </dev/null >/dev/null) ;;
	svelte) (cd "$ROOT/packages/svelte" && bunx --bun shadcn-svelte@latest registry build "$WORK/gen/svelte/registry.json" --cwd "$ROOT/packages/svelte" --output "$WORK/public/r/svelte" </dev/null >/dev/null) ;;
	esac
	for n in theme theme-stone-green theme-stone-ocean theme-slate-green theme-slate-ocean; do
		test -f "$WORK/public/r/$1/$n.json" || { echo "missing $1/$n.json"; exit 1; }
	done
}

# Expected values (packages/tokens/src/{base/slate,themes/ocean}.css): slate x ocean.
#   light primary  oklch(0.569 0.237 260.4)   dark primary oklch(0.606 0.215 259.1)
#   light background oklch(0.976 0.006 264.5) dark background oklch(0.188 0.037 262.2)
#   success stays green: oklch(0.562 0.136 147.7) light / oklch(0.762 0.154 159.4) dark
# $1 = css file. Checks the :root block and the .dark block separately.
check_theme_css() {
	bun -e '
		const css = await Bun.file(process.argv[1]).text();
		const block = (sel) => {
			const i = css.search(new RegExp("(^|[}\\s])" + sel.replace(".", "\\.") + "\\s*\\{"));
			if (i < 0) throw new Error("no " + sel + " block");
			const o = css.indexOf("{", i);
			return css.slice(o + 1, css.indexOf("}", o));
		};
		const want = {
			":root": { primary: "oklch(0.569 0.237 260.4)", background: "oklch(0.976 0.006 264.5)", success: "oklch(0.562 0.136 147.7)", brand: "oklch(0.569 0.237 260.4)" },
			".dark": { primary: "oklch(0.606 0.215 259.1)", background: "oklch(0.188 0.037 262.2)", success: "oklch(0.762 0.154 159.4)", brand: "oklch(0.648 0.189 258.5)" },
		};
		for (const [sel, vars] of Object.entries(want)) {
			const b = block(sel);
			for (const [k, v] of Object.entries(vars)) {
				const m = b.match(new RegExp("--" + k + ":\\s*([^;]+);"));
				if (!m || m[1].trim() !== v) throw new Error(`${sel} --${k}: expected ${v}, got ${m ? m[1].trim() : "missing"}`);
			}
		}
		console.log("   cssVars ok (light + dark): primary/background/brand follow slate-ocean, success stays green");
	' "$1"
}

if has react; then
	echo "== react: theme-slate-ocean via the CLI"
	build react
	URL="http://localhost:$PORT/r/react"
	A="$WORK/react"
	mkdir -p "$A"
	(cd "$A" && bunx shadcn@latest init --template vite --base base --preset nova --name app --no-monorepo --yes </dev/null >/dev/null)
	APP="$A/app"
	(cd "$APP" && bunx shadcn@latest registry add "@edmi-ui=$URL/{name}.json" </dev/null >/dev/null)
	(cd "$APP" && bunx shadcn@latest add @edmi-ui/theme @edmi-ui/theme-slate-ocean --overwrite --yes </dev/null >/dev/null)
	check_theme_css "$APP/src/index.css"
	echo "== react: paste Copy CSS (stone x ocean, radius 0.75rem), typecheck + build"
	bun -e '
		import { themeItemCssVars, themeToCss } from "'"$ROOT"'/packages/tokens/src/css-vars.ts";
		await Bun.write(process.argv[1], "\n/* Copy CSS output */\n" + themeToCss(themeItemCssVars("stone", "ocean"), "0.75rem"));
	' "$WORK/copy.css"
	cat "$WORK/copy.css" >>"$APP/src/index.css"
	(cd "$APP" && bunx tsc --noEmit -p tsconfig.app.json && bunx vite build >"$WORK/vite.log" 2>&1) || { cat "$WORK/vite.log"; exit 1; }
	CSSOUT="$(cat "$APP"/dist/assets/*.css)"
	# Lightning CSS (vite build) rewrites oklch(0.569 ...) as oklch(56.9% ...) and drops leading zeros.
	echo "$CSSOUT" | grep -Fq -- '--radius:.75rem' || { echo "pasted --radius 0.75rem not in the built CSS"; exit 1; }
	echo "$CSSOUT" | grep -Fq -- '--primary:oklch(56.9% .237 260.4)' || { echo "pasted ocean primary (light) not in the built CSS"; exit 1; }
	echo "$CSSOUT" | grep -Fq -- '--primary:oklch(60.6% .215 259.1)' || { echo "pasted ocean primary (dark) not in the built CSS"; exit 1; }
	echo "   ok"
fi

if has vue; then
	echo "== vue: theme-slate-ocean via the CLI"
	build vue
	URL="http://localhost:$PORT/r/vue"
	mkdir -p "$WORK/vue"
	(cd "$WORK/vue" && bun create vite@latest app --template vue-ts --no-interactive </dev/null >/dev/null)
	APP="$WORK/vue/app"
	(cd "$APP" && bun add tailwindcss @tailwindcss/vite </dev/null >/dev/null && bun add -d @types/node </dev/null >/dev/null)
	(cd "$APP" && bun -e '
		const t = await Bun.file("tsconfig.json").json();
		t.compilerOptions = { ...t.compilerOptions, paths: { "@/*": ["./src/*"] } };
		await Bun.write("tsconfig.json", JSON.stringify(t, null, 2) + "\n");
		let a = await Bun.file("tsconfig.app.json").text();
		a = a.replace(/"types": \["vite\/client"\],/, "\"types\": [\"vite/client\"],\n    \"paths\": { \"@/*\": [\"./src/*\"] },");
		await Bun.write("tsconfig.app.json", a);
		await Bun.write("vite.config.ts", `import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
export default defineConfig({ plugins: [vue(), tailwindcss()], resolve: { alias: { "@": path.resolve(__dirname, "./src") } } })
`);
		await Bun.write("src/style.css", "@import \"tailwindcss\";\n");
	')
	(cd "$APP" && bunx shadcn-vue@latest init --template vite --base reka --preset nova --css-variables --name app --yes --no-reinstall </dev/null >/dev/null)
	(cd "$APP" && bun -e '
		const c = await Bun.file("components.json").json();
		c.registries = { ...c.registries, "@edmi-ui": process.argv[1] + "/{name}.json" };
		await Bun.write("components.json", JSON.stringify(c, null, 2) + "\n");
	' "$URL")
	(cd "$APP" && bunx shadcn-vue@latest add @edmi-ui/theme @edmi-ui/theme-slate-ocean --overwrite --yes </dev/null >/dev/null)
	check_theme_css "$APP/src/style.css"
	echo "   ok"
fi

if has svelte; then
	echo "== svelte: theme-slate-ocean via URL"
	build svelte
	URL="http://localhost:$PORT/r/svelte"
	APP="$WORK/svelte/app"
	mkdir -p "$WORK/svelte"
	(cd "$WORK/svelte" && bunx --bun sv create app --template minimal --types ts --no-add-ons --no-install </dev/null >/dev/null)
	(cd "$APP" && bunx --bun sv add tailwindcss=plugins:none --no-install --no-git-check </dev/null >/dev/null)
	(cd "$APP" && bun install >/dev/null)
	(cd "$APP" && { { trap '' PIPE; for _ in $(seq 1 90); do sleep 1; printf '\r' || break; done; true; } | bunx --bun shadcn-svelte@latest init --preset b2fA --base-color neutral \
		--css src/routes/layout.css --components-alias '#lib/components' --lib-alias '#lib' \
		--utils-alias '#lib/utils' --hooks-alias '#lib/hooks' --ui-alias '#lib/components/ui'; } >"$WORK/init.log" 2>&1) || { cat "$WORK/init.log"; exit 1; }
	(cd "$APP" && bunx --bun shadcn-svelte@latest add "$URL/theme.json" "$URL/theme-slate-ocean.json" --overwrite --yes </dev/null >"$WORK/add.log" 2>&1) || { cat "$WORK/add.log"; exit 1; }
	check_theme_css "$APP/src/routes/layout.css"
	echo "   ok"
fi

echo "smoke: theme OK"
