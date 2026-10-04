#!/usr/bin/env bash
# Smoke test: examples/svelte = scaffold + `examples/install.sh svelte` + page code.
# Copies the example to a temp dir WITHOUT the Edmi-installed files (src/lib/components, src/lib/hooks), builds a
# fresh registry served locally, runs install.sh there, then svelte-check + `vite build`.
# Never touches apps/docs/public. CLIs run with `bunx --bun` (see scripts/smoke/svelte.sh).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-example-svelte.XXXXXX")"
SERVER_PID=""
cleanup() {
	[ -n "$SERVER_PID" ] && { kill "$SERVER_PID" 2>/dev/null; wait "$SERVER_PID" 2>/dev/null; } || true
	if [ "${KEEP:-0}" = "1" ]; then echo "kept $WORK"; else rm -rf "$WORK"; fi
}
trap cleanup EXIT

mkdir -p "$WORK/public/r/svelte"
bun "$ROOT/scripts/smoke/serve.ts" "$WORK/public" "$WORK/port" >"$WORK/server.log" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 50); do [ -s "$WORK/port" ] && break; sleep 0.1; done
PORT="$(cat "$WORK/port")"
echo "== building the registry for http://localhost:$PORT"
(cd "$ROOT" && EDMI_URL="http://localhost:$PORT" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)
(cd "$ROOT/packages/svelte" && bunx --bun shadcn-svelte@latest registry build "$WORK/gen/svelte/registry.json" --cwd "$ROOT/packages/svelte" --output "$WORK/public/r/svelte" </dev/null >/dev/null)
curl -fsS "http://localhost:$PORT/r/svelte/ticker-strip.json" >/dev/null

echo "== copying the scaffold (without Edmi files)"
APP="$WORK/app"
mkdir -p "$APP"
(cd "$ROOT/examples/svelte" && tar --exclude=node_modules --exclude=.svelte-kit --exclude=build --exclude=src/lib/components --exclude=src/lib/hooks -cf - .) | tar -xf - -C "$APP"
# Standalone project: no workspace, own install (the CLI adds the deps the registry items need).
bun -e '
	const f = process.argv[1];
	const p = await Bun.file(f).json();
	p.name = "edmi-example-svelte-smoke";
	await Bun.write(f, JSON.stringify(p, null, 2));
' "$APP/package.json"
(cd "$APP" && bun install >/dev/null)

echo "== examples/install.sh svelte"
EXAMPLE_DIR="$APP" EDMI_URL="http://localhost:$PORT" bash "$ROOT/examples/install.sh" svelte >"$WORK/install.log" 2>&1 || { cat "$WORK/install.log"; exit 1; }

U="$APP/src/lib/components/ui"
test -f "$U/button/button.svelte"
grep -q "shadow-btn-raised-primary" "$U/button/button.svelte" || { echo "button.svelte is not the Edmi version"; exit 1; }
for b in ticker-strip index-row watchlist-item app-header layout-picker; do test -f "$U/$b/index.ts" || { echo "missing block $b"; exit 1; }; done
grep -q "phosphor-svelte/lib/" "$U/sidebar/sidebar-trigger.svelte" || { echo "icons were not rewritten to phosphor"; exit 1; }

echo "== svelte-check + build"
(cd "$APP" && bunx --bun svelte-kit sync && bunx --bun svelte-check --tsconfig ./tsconfig.json)
(cd "$APP" && bunx --bun vite build >"$WORK/build.log" 2>&1) || { tail -30 "$WORK/build.log"; exit 1; }
echo "smoke: example-svelte OK"
