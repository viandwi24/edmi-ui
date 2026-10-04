#!/usr/bin/env bash
# Smoke test: examples/react = scaffold + `examples/install.sh react` + page code.
# Copies the example to a temp dir WITHOUT the Edmi-installed files (components/, hooks/, theme CSS vars
# stay but are overwritten), builds a fresh registry served locally, runs install.sh there, then typechecks
# and runs `vite build`. Never touches apps/docs/public.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-example-react.XXXXXX")"
SERVER_PID=""
cleanup() {
	[ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
	if [ "${KEEP:-0}" = "1" ]; then echo "kept $WORK"; else rm -rf "$WORK"; fi
}
trap cleanup EXIT

mkdir -p "$WORK/public/r/react"
bun "$ROOT/scripts/smoke/serve.ts" "$WORK/public" "$WORK/port" >"$WORK/server.log" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 50); do [ -s "$WORK/port" ] && break; sleep 0.1; done
PORT="$(cat "$WORK/port")"
echo "== building the registry for http://localhost:$PORT"
(cd "$ROOT" && EDMI_URL="http://localhost:$PORT" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)
(cd "$ROOT/packages/react" && bunx shadcn@latest build "$WORK/gen/react/registry.json" --cwd "$ROOT/packages/react" --output "$WORK/public/r/react" </dev/null >/dev/null)

echo "== copying the scaffold (without Edmi files)"
APP="$WORK/app"
mkdir -p "$APP"
(cd "$ROOT/examples/react" && tar --exclude=node_modules --exclude=dist --exclude=src/components --exclude=src/hooks --exclude=tsconfig.tsbuildinfo -cf - .) | tar -xf - -C "$APP"
# Keep the app's own components (theme toggle) but drop everything the installer writes.
mkdir -p "$APP/src/components"
cp "$ROOT/examples/react/src/components/theme-toggle.tsx" "$APP/src/components/"
# Standalone project: no workspace, own install.
python3 - "$APP/package.json" <<'PY'
import json, sys
p = json.load(open(sys.argv[1]))
p["name"] = "edmi-example-react-smoke"
json.dump(p, open(sys.argv[1], "w"), indent=2)
PY
(cd "$APP" && bun install >/dev/null)

echo "== examples/install.sh react"
EXAMPLE_DIR="$APP" EDMI_URL="http://localhost:$PORT" bash "$ROOT/examples/install.sh" react

test -f "$APP/src/components/ui/button.tsx"
grep -q "shadow-btn-raised-primary" "$APP/src/components/ui/button.tsx" || { echo "button.tsx is not the Edmi version"; exit 1; }
for b in ticker-strip index-row watchlist-item app-header layout-picker; do test -f "$APP/src/components/$b.tsx" || { echo "missing block $b"; exit 1; }; done
grep -q "from ['\"]@phosphor-icons/react['\"]" "$APP/src/components/ui/sidebar.tsx" || { echo "icons were not rewritten to phosphor"; exit 1; }

echo "== typecheck + build"
(cd "$APP" && bunx tsc --noEmit -p tsconfig.app.json && bunx vite build >/dev/null)
echo "smoke: example-react OK"
