#!/usr/bin/env bash
# Smoke test: examples/vue = scaffold + `examples/install.sh vue` + page code.
# Copies the example to a temp dir WITHOUT the Edmi-installed files, builds a fresh registry served locally,
# runs install.sh there, then typechecks (vue-tsc via scripts/vue-tsc.mjs) and runs `vite build`.
# Never touches apps/docs/public.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-example-vue.XXXXXX")"
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
(cd "$ROOT/examples/vue" && tar --exclude=node_modules --exclude=dist --exclude=src/components --exclude=tsconfig.app.tsbuildinfo --exclude=tsconfig.node.tsbuildinfo -cf - .) | tar -xf - -C "$APP"
# Keep the app's own component (theme toggle) but drop everything the installer writes.
mkdir -p "$APP/src/components"
cp "$ROOT/examples/vue/src/components/ThemeToggle.vue" "$APP/src/components/"
# Standalone project: no workspace, own install.
bun -e '
	const f = process.argv[1];
	const p = await Bun.file(f).json();
	p.name = "edmi-example-vue-smoke";
	await Bun.write(f, JSON.stringify(p, null, 2) + "\n");
' "$APP/package.json"
(cd "$APP" && bun install </dev/null >/dev/null)

echo "== examples/install.sh vue"
EXAMPLE_DIR="$APP" EDMI_URL="http://localhost:$PORT" bash "$ROOT/examples/install.sh" vue

test -f "$APP/src/components/ui/button/Button.vue" || test -f "$APP/src/components/ui/button/index.ts" || { echo "button was not installed"; exit 1; }
grep -q "shadow-btn-primary" "$APP/src/components/ui/button/index.ts" || { echo "button is not the Edmi version"; exit 1; }
for b in ticker-strip index-row watchlist-item app-header layout-picker; do test -d "$APP/src/components/$b" || { echo "missing block $b"; exit 1; }; done
grep -q "@phosphor-icons/vue" "$APP/src/components/ui/sidebar/SidebarTrigger.vue" || { echo "icons were not rewritten to phosphor"; exit 1; }
if grep -rq "@/registry/edmi" "$APP/src/components" "$APP/src/lib"; then echo "unrewritten @/registry/edmi import left in the project"; exit 1; fi

echo "== typecheck + build"
(cd "$APP" && bun scripts/vue-tsc.mjs --noEmit -p tsconfig.app.json && bunx vite build >/dev/null)
echo "smoke: example-vue OK"
