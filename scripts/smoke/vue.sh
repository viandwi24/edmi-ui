#!/usr/bin/env bash
# Smoke test: install the built Vue registry into a fresh Vite + Vue project.
#   1. official scaffold (`bun create vite --template vue-ts`) + tailwind + `shadcn-vue init`
#   2. add `registries.@edmi` to components.json, `shadcn-vue add @edmi/theme @edmi/button ... --overwrite`
#   3. type-check with vue-tsc (via packages/vue/scripts/vue-tsc.mjs: stock vue-tsc cannot patch tsc under Bun)
# The registry is generated with EDMI_URL pointing at a local server and built into a temp dir, so
# apps/docs/public and packages/vue/registry.json stay untouched.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-smoke-vue.XXXXXX")"
SERVER_PID=""
cleanup() {
	[ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
	if [ "${KEEP:-0}" = "1" ]; then echo "kept $WORK"; else rm -rf "$WORK"; fi
}
trap cleanup EXIT

echo "== icon names resolve in the shadcn-vue icon map"
bun "$ROOT/scripts/smoke/vue-icons.ts"

mkdir -p "$WORK/public/r/vue"
bun "$ROOT/scripts/smoke/serve.ts" "$WORK/public" "$WORK/port" >"$WORK/server.log" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 50); do [ -s "$WORK/port" ] && break; sleep 0.1; done
PORT="$(cat "$WORK/port")"
URL="http://localhost:$PORT/r/vue"
echo "== building the registry for $URL (does not touch apps/docs/public)"
(cd "$ROOT" && EDMI_URL="http://localhost:$PORT" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)
(cd "$ROOT/packages/vue" && bunx shadcn-vue@latest build "$WORK/gen/vue/registry.json" --cwd "$ROOT/packages/vue" --output "$WORK/public/r/vue" </dev/null)
curl -fsS "$URL/button.json" >/dev/null
for f in button theme edmi all; do test -f "$WORK/public/r/vue/$f.json" || { echo "missing $f.json"; exit 1; }; done
echo "== registry served at $URL"

# Item names every install must contain: <dir>:<main file>
ITEMS="button:Button badge:Badge card:Card inset-panel:InsetPanel tabs:Tabs input:Input"

new_project() {
	local dir="$1"
	mkdir -p "$dir"
	(cd "$dir" && bun create vite@latest app --template vue-ts --no-interactive </dev/null >/dev/null)
	local app="$dir/app"
	(cd "$app" && bun add tailwindcss @tailwindcss/vite </dev/null >/dev/null && bun add -d @types/node </dev/null >/dev/null)
	# Edits from https://www.shadcn-vue.com/docs/installation/vite.html (no CLI generates them).
	(cd "$app" && bun -e '
		const w = (f, o) => Bun.write(f, JSON.stringify(o, null, 2) + "\n");
		const paths = { "@/*": ["./src/*"] };
		const t = await Bun.file("tsconfig.json").json();
		t.compilerOptions = { ...t.compilerOptions, paths };
		await w("tsconfig.json", t);
		// tsconfig.app.json has comments: patch the text.
		let a = await Bun.file("tsconfig.app.json").text();
		a = a.replace(/"types": \["vite\/client"\],/, "\"types\": [\"vite/client\"],\n    \"paths\": { \"@/*\": [\"./src/*\"] },");
		await Bun.write("tsconfig.app.json", a);
		await Bun.write("vite.config.ts", `import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
})
`);
		await Bun.write("src/style.css", "@import \"tailwindcss\";\n");
	')
	mkdir -p "$app/scripts"
	cp "$ROOT/packages/vue/scripts/vue-tsc.mjs" "$app/scripts/vue-tsc.mjs"
}

typecheck() {
	(cd "$1" && bun scripts/vue-tsc.mjs --noEmit -p tsconfig.app.json)
}

check_files() {
	local dir="$1" pair d f
	for pair in $ITEMS; do
		d="${pair%%:*}"; f="${pair##*:}"
		test -f "$dir/src/components/ui/$d/$f.vue" || { echo "missing components/ui/$d/$f.vue"; exit 1; }
		test -f "$dir/src/components/ui/$d/index.ts" || { echo "missing components/ui/$d/index.ts"; exit 1; }
	done
	grep -q "shadow-btn-primary" "$dir/src/components/ui/button/index.ts" || { echo "button is not the Edmi version"; exit 1; }
	grep -q -- "--brand-hi" "$dir/src/style.css" || { echo "theme cssVars missing from src/style.css"; exit 1; }
	test -f "$dir/src/lib/utils.ts" || { echo "missing src/lib/utils.ts"; exit 1; }
	test ! -e "$dir/src/lib/registry" || { echo "registry:lib file written to src/lib/registry"; exit 1; }
	if grep -rq "@/registry/edmi" "$dir/src/components" "$dir/src/lib"; then echo "unrewritten @/registry/edmi import left in the project"; exit 1; fi
}

echo "== 1. namespace add into an existing shadcn-vue project"
A="$WORK/ns"
new_project "$A"
APP="$A/app"
(cd "$APP" && bunx shadcn-vue@latest init --template vite --base reka --preset nova --css-variables --name app --yes --no-reinstall </dev/null)
(cd "$APP" && bun -e '
	const c = await Bun.file("components.json").json();
	c.registries = { ...c.registries, "@edmi": process.argv[1] + "/{name}.json" };
	await Bun.write("components.json", JSON.stringify(c, null, 2) + "\n");
' "$URL")
(cd "$APP" && bunx shadcn-vue@latest add @edmi/theme @edmi/button @edmi/badge @edmi/card @edmi/inset-panel @edmi/tabs @edmi/input --overwrite --yes </dev/null)
check_files "$APP"
typecheck "$APP"
echo "   ok"

# `shadcn-vue init <url>/edmi.json` is not usable with shadcn-vue 2.8.2 (see AGENTS.md section 11): it
# ignores registry-item `config` (so `@edmi/*` dependencies cannot resolve) and writes registry:lib
# files to src/lib/registry/... . Vue's supported flow is init + registries + add.
echo "== 2. add @edmi/edmi (base) + @edmi/all into another fresh project"
B="$WORK/base"
new_project "$B"
APP2="$B/app"
(cd "$APP2" && bunx shadcn-vue@latest init --template vite --base reka --style nova --icon-library phosphor --base-color neutral --font inter --css-variables --name app --yes --no-reinstall </dev/null)
(cd "$APP2" && bun -e '
	const c = await Bun.file("components.json").json();
	c.registries = { ...c.registries, "@edmi": process.argv[1] + "/{name}.json" };
	await Bun.write("components.json", JSON.stringify(c, null, 2) + "\n");
' "$URL")
(cd "$APP2" && bunx shadcn-vue@latest add @edmi/edmi @edmi/all --overwrite --yes </dev/null)
check_files "$APP2"
grep -q '"iconLibrary": "phosphor"' "$APP2/components.json" || { echo "iconLibrary phosphor not set"; exit 1; }
grep -q "shadcn-vue/tailwind.css" "$APP2/src/style.css" || { echo "edmi base css imports missing"; exit 1; }
typecheck "$APP2"
echo "   ok"

echo "smoke: vue OK"
