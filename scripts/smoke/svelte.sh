#!/usr/bin/env bash
# Smoke test: install the built Svelte registry into a fresh SvelteKit project.
#   sv create + sv add tailwindcss + shadcn-svelte init, then `add <url>/theme.json`,
#   `add <url>/<item>.json --overwrite` for every pilot, then svelte-check.
# The registry is generated with EDMI_URL pointing at a local server and built into a temp dir,
# so apps/docs/public and packages/svelte/registry.json stay untouched.
# All CLIs run with `bunx --bun` (the node shim spins at 100% CPU on interactive prompts).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-smoke-svelte.XXXXXX")"
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
URL="http://localhost:$PORT/r/svelte"
echo "== building the registry for $URL (does not touch apps/docs/public)"
(cd "$ROOT" && EDMI_URL="http://localhost:$PORT" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)
(cd "$ROOT/packages/svelte" && bunx --bun shadcn-svelte@latest registry build "$WORK/gen/svelte/registry.json" --cwd "$ROOT/packages/svelte" --output "$WORK/public/r/svelte" </dev/null >/dev/null)
for f in button theme edmi all; do test -f "$WORK/public/r/svelte/$f.json" || { echo "missing $f.json"; exit 1; }; done
curl -fsS "$URL/button.json" >/dev/null
echo "== registry served at $URL"

ITEMS="button badge card inset-panel tabs input"

echo "== fresh SvelteKit project"
APP="$WORK/app"
(cd "$WORK" && bunx --bun sv create app --template minimal --types ts --no-add-ons --no-install </dev/null >/dev/null)
(cd "$APP" && bunx --bun sv add tailwindcss=plugins:none --no-install --no-git-check </dev/null >/dev/null)
(cd "$APP" && bun install >/dev/null)

echo "== shadcn-svelte init (preset b2fA = nova; aliases use #lib, the new SvelteKit convention)"
# `init` has no --yes: its confirm prompt (CSS update) is answered by an Enter (\r) sent every second;
# the writer dies of SIGPIPE once init exits.
(cd "$APP" && { { trap '' PIPE; for _ in $(seq 1 90); do sleep 1; printf '\r' || break; done; true; } | bunx --bun shadcn-svelte@latest init --preset b2fA --base-color neutral \
	--css src/routes/layout.css --components-alias '#lib/components' --lib-alias '#lib' \
	--utils-alias '#lib/utils' --hooks-alias '#lib/hooks' --ui-alias '#lib/components/ui'; } >"$WORK/init.log" 2>&1) || { cat "$WORK/init.log"; exit 1; }
test -f "$APP/components.json" || { cat "$WORK/init.log"; echo "init did not create components.json"; exit 1; }

echo "== add theme + items from $URL"
ARGS=""
for n in $ITEMS; do ARGS="$ARGS $URL/$n.json"; done
(cd "$APP" && bunx --bun shadcn-svelte@latest add "$URL/theme.json" --overwrite --yes </dev/null >"$WORK/add-theme.log" 2>&1) || { cat "$WORK/add-theme.log"; exit 1; }
# shellcheck disable=SC2086
(cd "$APP" && bunx --bun shadcn-svelte@latest add $ARGS --overwrite --yes </dev/null >"$WORK/add.log" 2>&1) || { cat "$WORK/add.log"; exit 1; }

for n in $ITEMS; do
	test -d "$APP/src/lib/components/ui/$n" || { echo "missing components/ui/$n"; exit 1; }
done
grep -q "raised" "$APP/src/lib/components/ui/button/button.svelte" || { echo "button.svelte is not the Edmi v2 version (raised)"; exit 1; }
grep -q -- "--brand-hi" "$APP/src/routes/layout.css" || { echo "theme cssVars missing from layout.css"; exit 1; }

echo "== svelte-check"
cat >"$APP/src/routes/+page.svelte" <<'SVELTE'
<script lang="ts">
	import { Button } from "#lib/components/ui/button/index.js";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import * as Card from "#lib/components/ui/card/index.js";
	import * as InsetPanel from "#lib/components/ui/inset-panel/index.js";
	import * as Tabs from "#lib/components/ui/tabs/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
</script>

<Card.Root raised><Card.Header><Card.Title>Edmi</Card.Title></Card.Header></Card.Root>
<InsetPanel.Root raised><InsetPanel.Header>h</InsetPanel.Header><InsetPanel.Body fade>b</InsetPanel.Body></InsetPanel.Root>
<Tabs.Root value="a"><Tabs.List variant="pills" raised><Tabs.Trigger value="a">A</Tabs.Trigger></Tabs.List><Tabs.Content value="a">a</Tabs.Content></Tabs.Root>
<Button variant="brand" raised>Brand</Button>
<Badge variant="info" shape="pill">Info</Badge>
<Input placeholder="x" />
SVELTE
(cd "$APP" && bunx --bun svelte-kit sync && bunx --bun svelte-check --tsconfig ./tsconfig.json)
(cd "$APP" && bunx --bun vite build >"$WORK/build.log" 2>&1) || { tail -30 "$WORK/build.log"; exit 1; }
echo "   ok"

echo "smoke: svelte OK"
