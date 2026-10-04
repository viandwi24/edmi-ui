#!/usr/bin/env bash
# Smoke test: examples/layerbeat-vue = scaffold + `examples/install.sh vue` + theme-slate-ocean + page code.
# Copies the example to a temp dir WITHOUT the Edmi-installed files, builds a fresh registry served locally,
# runs install.sh there, then typechecks (vue-tsc via scripts/vue-tsc.mjs) and runs `vite build`.
# Never touches apps/docs/public.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-example-layerbeat-vue.XXXXXX")"
SERVER_PID=""
cleanup() {
	[ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
	if [ "${KEEP:-0}" = "1" ]; then echo "kept $WORK"; else rm -rf "$WORK"; fi
}
trap cleanup EXIT

mkdir -p "$WORK/public/r/vue"
bun "$ROOT/scripts/smoke/serve.ts" "$WORK/public" "$WORK/port" >"$WORK/server.log" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 50); do [ -s "$WORK/port" ] && break; sleep 0.1; done
PORT="$(cat "$WORK/port")"
echo "== building the registry for http://localhost:$PORT"
(cd "$ROOT" && EDMI_URL="http://localhost:$PORT" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)
(cd "$ROOT/packages/vue" && bunx shadcn-vue@latest build "$WORK/gen/vue/registry.json" --cwd "$ROOT/packages/vue" --output "$WORK/public/r/vue" </dev/null >/dev/null)

echo "== copying the scaffold (without Edmi files)"
APP="$WORK/app"
mkdir -p "$APP"
(cd "$ROOT/examples/layerbeat-vue" && tar --exclude=node_modules --exclude=dist --exclude=src/components/ui --exclude=tsconfig.app.tsbuildinfo --exclude=tsconfig.node.tsbuildinfo -cf - .) | tar -xf - -C "$APP"
# Standalone project: no workspace, own install.
bun -e '
	const f = process.argv[1];
	const p = await Bun.file(f).json();
	p.name = "edmi-example-layerbeat-vue-smoke";
	await Bun.write(f, JSON.stringify(p, null, 2) + "\n");
' "$APP/package.json"
(cd "$APP" && bun install </dev/null >/dev/null)

echo "== examples/install.sh vue"
EXAMPLE_DIR="$APP" EDMI_URL="http://localhost:$PORT" bash "$ROOT/examples/install.sh" vue

# theme-slate-ocean goes AFTER @edmi-ui/theme (it replaces the colour variables).
(cd "$APP" && bunx shadcn-vue@latest add @edmi-ui/theme-slate-ocean --overwrite --yes </dev/null)
grep -q "oklch(0.569 0.237 260.4)" "$APP/src/style.css" || { echo "theme-slate-ocean was not applied"; exit 1; }

test -f "$APP/src/components/ui/button/Button.vue" || test -f "$APP/src/components/ui/button/index.ts" || { echo "button was not installed"; exit 1; }
grep -q "shadow-btn-raised-primary" "$APP/src/components/ui/button/index.ts" || { echo "button is not the Edmi version"; exit 1; }
grep -q "@phosphor-icons/vue" "$APP/src/components/ui/sidebar/SidebarTrigger.vue" || { echo "icons were not rewritten to phosphor"; exit 1; }
if grep -rq "@/registry/edmi" "$APP/src/components" "$APP/src/lib"; then echo "unrewritten @/registry/edmi import left in the project"; exit 1; fi

echo "== typecheck + build"
(cd "$APP" && bun scripts/vue-tsc.mjs --noEmit -p tsconfig.app.json && bunx vite build >/dev/null)
echo "smoke: example-layerbeat-vue OK"
