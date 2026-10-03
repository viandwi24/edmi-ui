#!/usr/bin/env bash
# Install Edmi into examples/<framework> exactly like a user would (CLI only, never packages/*).
#   examples/install.sh react|vue|svelte        (from anywhere)
#   EDMI_URL=http://localhost:4321/edmi-ui ...   (default: the docs dev server; must serve /r/<fw>/*.json)
#   PM=npm|pnpm|yarn|bun ...                     (package manager that runs the shadcn CLI; default bun, the repo's own)
# The committed examples are the result of this script plus the page code.
set -euo pipefail

FW="${1:-}"
EXAMPLES="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="${EXAMPLE_DIR:-$EXAMPLES/$FW}"
EDMI_URL="${EDMI_URL:-http://localhost:4321/edmi-ui}"
EDMI_URL="${EDMI_URL%/}"

PM="${PM:-bun}"
# `dlx <pkg> args...`: run a package binary with the chosen package manager.
dlx() {
	local pkg="$1"
	shift
	case "$PM" in
	npm) npx --yes "$pkg" "$@" ;;
	pnpm) pnpm dlx "$pkg" "$@" ;;
	yarn) yarn dlx "$pkg" "$@" ;;
	bun) if [[ "$pkg" == shadcn-svelte* ]]; then bunx --bun "$pkg" "$@"; else bunx "$pkg" "$@"; fi ;;
	*)
		echo "PM must be npm, pnpm, yarn or bun (got: $PM)" >&2
		exit 2
		;;
	esac
}

# Pattern blocks the Markets page and shell use (not part of the `all` aggregate, which is every ui item).
BLOCKS="ticker-strip index-row watchlist-item app-header layout-picker"

case "$FW" in
react)
	cd "$DIR"
	# `registry add` skips a namespace that is already configured: drop ours so EDMI_URL always wins.
	bun -e '
		const f = "components.json";
		const c = await Bun.file(f).json();
		delete c.registries?.["@edmi-ui"];
		await Bun.write(f, JSON.stringify(c, null, 2) + "\n");
	'
	# Register the namespace (writes registries["@edmi-ui"] into components.json), then install.
	dlx shadcn@latest registry add "@edmi-ui=$EDMI_URL/r/react/{name}.json" </dev/null
	dlx shadcn@latest add @edmi-ui/theme @edmi-ui/all @edmi-ui/font-instrument-sans @edmi-ui/font-jetbrains-mono @edmi-ui/font-sora \
		$(for b in $BLOCKS; do printf '@edmi-ui/%s ' "$b"; done) --overwrite --yes </dev/null
	;;
vue)
	cd "$DIR"
	# shadcn-vue has no `registry add`: the namespace goes into components.json.
	EDMI_URL="$EDMI_URL" bun -e '
		const f = "components.json";
		const c = await Bun.file(f).json();
		c.registries = { ...c.registries, "@edmi-ui": `${process.env.EDMI_URL}/r/vue/{name}.json` };
		await Bun.write(f, JSON.stringify(c, null, 2) + "\n");
	'
	dlx shadcn-vue@latest add @edmi-ui/theme @edmi-ui/all \
		$(for b in $BLOCKS; do printf '@edmi-ui/%s ' "$b"; done) --overwrite --yes </dev/null
	;;
svelte)
	cd "$DIR"
	# shadcn-svelte installs from URLs only.
	dlx shadcn-svelte@latest add "$EDMI_URL/r/svelte/theme.json" "$EDMI_URL/r/svelte/all.json" \
		$(for b in $BLOCKS; do printf '%s ' "$EDMI_URL/r/svelte/$b.json"; done) --overwrite --yes </dev/null
	;;
*)
	echo "usage: examples/install.sh react|vue|svelte" >&2
	exit 2
	;;
esac
