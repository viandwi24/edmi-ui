#!/usr/bin/env bash
# Smoke test: install the built React registry into fresh projects, both ways.
#   1. existing shadcn project: registry add @edmi-ui=... ; add @edmi-ui/theme @edmi-ui/button ... --overwrite
#   2. new project: init <url>/edmi.json
# Both end with `tsc --noEmit` in the temp project. The registry is generated with EDMI_URL pointing at a
# local server and built into a temp dir, so apps/docs/public and packages/react/registry.json stay untouched.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-smoke.XXXXXX")"
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
URL="http://localhost:$PORT/r/react"
echo "== building the registry for $URL (does not touch apps/docs/public)"
(cd "$ROOT" && EDMI_URL="http://localhost:$PORT" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)
(cd "$ROOT/packages/react" && bunx shadcn@latest build "$WORK/gen/react/registry.json" --cwd "$ROOT/packages/react" --output "$WORK/public/r/react" </dev/null)
curl -fsS "$URL/button.json" >/dev/null
for f in button theme edmi all patterns utils; do test -f "$WORK/public/r/react/$f.json" || { echo "missing $f.json"; exit 1; }; done
echo "== registry served at $URL"

# Item names every install must contain.
ITEMS="button badge card inset-panel tabs input dropdown-menu sidebar"

check_files() {
	local dir="$1"
	for n in $ITEMS; do
		test -f "$dir/src/components/ui/$n.tsx" || { echo "missing components/ui/$n.tsx"; exit 1; }
	done
	grep -q "shadow-btn-primary" "$dir/src/components/ui/button.tsx" || { echo "button.tsx is not the Edmi version"; exit 1; }
	for f in instrument-sans jetbrains-mono sora; do
		grep -q "@import \"@fontsource-variable/$f\"" "$dir/src/index.css" || { echo "index.css does not import @fontsource-variable/$f"; exit 1; }
		grep -q "\"@fontsource-variable/$f\"" "$dir/package.json" || { echo "package.json lacks @fontsource-variable/$f"; exit 1; }
	done
	grep -q -- "--brand-hi" "$dir/src/index.css" || { echo "theme cssVars missing from src/index.css"; exit 1; }
}

# $2 = lucide | phosphor: icons are written as IconPlaceholder and the CLI rewrites them to iconLibrary.
check_icons() {
	local dir="$1" lib="$2" want other
	if [ "$lib" = lucide ]; then want="lucide-react"; other="@phosphor-icons/react"; else want="@phosphor-icons/react"; other="lucide-react"; fi
	for n in dropdown-menu sidebar; do
		local f="$dir/src/components/ui/$n.tsx"
		grep -q "from ['\"]$want['\"]" "$f" || { echo "$n.tsx does not import $want"; exit 1; }
		! grep -q "from ['\"]$other['\"]" "$f" || { echo "$n.tsx imports $other"; exit 1; }
		! grep -q "IconPlaceholder\|icon-placeholder" "$f" || { echo "$n.tsx still has IconPlaceholder"; exit 1; }
	done
	grep -q "\"iconLibrary\": \"$lib\"" "$dir/components.json" || { echo "components.json iconLibrary is not $lib"; exit 1; }
}

typecheck() {
	(cd "$1" && bunx tsc --noEmit -p tsconfig.app.json)
}

echo "== 1. namespace add into an existing shadcn project (iconLibrary lucide, the stock default)"
A="$WORK/ns"
mkdir -p "$A"
(cd "$A" && bunx shadcn@latest init --template vite --base base --preset nova --name app --no-monorepo --yes </dev/null)
APP="$A/app"
(cd "$APP" && bunx shadcn@latest registry add "@edmi-ui=$URL/{name}.json" </dev/null)
(cd "$APP" && bunx shadcn@latest add @edmi-ui/theme @edmi-ui/button @edmi-ui/badge @edmi-ui/card @edmi-ui/inset-panel @edmi-ui/tabs @edmi-ui/input @edmi-ui/dropdown-menu @edmi-ui/sidebar @edmi-ui/font-instrument-sans @edmi-ui/font-jetbrains-mono @edmi-ui/font-sora --overwrite --yes </dev/null)
check_files "$APP"
check_icons "$APP" lucide
typecheck "$APP"
echo "   ok"

echo "== 1b. add @edmi-ui/all --overwrite into the same stock project (plan 09 step 4)"
(cd "$APP" && bunx shadcn@latest add @edmi-ui/all --overwrite --yes </dev/null)
echo "== 1c. add @edmi-ui/patterns (every pattern block)"
(cd "$APP" && bunx shadcn@latest add @edmi-ui/patterns --overwrite --yes </dev/null)
check_files "$APP"
typecheck "$APP"
echo "   ok"

echo "== 2. init from edmi.json (base)"
B="$WORK/base"
mkdir -p "$B"
(cd "$B" && bunx shadcn@latest init "$URL/edmi.json" --template vite --base base --name app --no-monorepo --yes </dev/null)
APP2="$B/app"
check_files "$APP2"
check_icons "$APP2" phosphor
typecheck "$APP2"
echo "   ok"

echo "smoke: react OK"
