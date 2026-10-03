#!/usr/bin/env bash
# Re-install Edmi into examples/<fw> from a freshly built, locally served registry (CLI only, like a user),
# then restore the registry URLs in components.json to the GitHub Pages URL.
#   bash scripts/reinstall-examples.sh [react] [vue] [svelte]     (default: all three)
# Review `git diff examples/` afterwards; page code is hand-written and is not touched by the install.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PAGES="https://viandwi24.github.io/edmi-ui"
WORK="$(mktemp -d "${TMPDIR:-/tmp}/edmi-reinstall.XXXXXX")"
SERVER_PID=""
cleanup() {
	[ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true
	rm -rf "$WORK"
}
trap cleanup EXIT

FWS=("$@")
[ ${#FWS[@]} -eq 0 ] && FWS=(react vue svelte)

mkdir -p "$WORK/public"
bun "$ROOT/scripts/smoke/serve.ts" "$WORK/public" "$WORK/port" >"$WORK/server.log" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 50); do [ -s "$WORK/port" ] && break; sleep 0.1; done
PORT="$(cat "$WORK/port")"
URL="http://localhost:$PORT"
(cd "$ROOT" && EDMI_URL="$URL" bun run scripts/gen-registry.ts --strict --out "$WORK/gen" >/dev/null)

for fw in "${FWS[@]}"; do
	mkdir -p "$WORK/public/r/$fw"
	case "$fw" in
	react) (cd "$ROOT/packages/react" && bunx shadcn@latest build "$WORK/gen/react/registry.json" --cwd "$ROOT/packages/react" --output "$WORK/public/r/react" </dev/null >/dev/null) ;;
	vue) (cd "$ROOT/packages/vue" && bunx shadcn-vue@latest build "$WORK/gen/vue/registry.json" --cwd "$ROOT/packages/vue" --output "$WORK/public/r/vue" </dev/null >/dev/null) ;;
	svelte) (cd "$ROOT/packages/svelte" && bunx --bun shadcn-svelte@latest registry build "$WORK/gen/svelte/registry.json" --cwd "$ROOT/packages/svelte" --output "$WORK/public/r/svelte" </dev/null >/dev/null) ;;
	esac
	echo "== examples/install.sh $fw"
	EDMI_URL="$URL" bash "$ROOT/examples/install.sh" "$fw"
	# components.json must keep pointing at the published registry, not the temp server.
	(cd "$ROOT/examples/$fw" && PAGES="$PAGES" FW="$fw" bun -e '
		const f = "components.json";
		const c = await Bun.file(f).json();
		if (c.registries) for (const k of Object.keys(c.registries))
			c.registries[k] = `${process.env.PAGES}/r/${process.env.FW}/{name}.json`;
		await Bun.write(f, JSON.stringify(c, null, "\t") + "\n");
	')
done
echo "reinstall-examples: done. Review: git diff --stat examples/"
