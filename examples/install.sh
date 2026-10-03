#!/usr/bin/env bash
# Install Edmi into examples/<framework> exactly like a user would (CLI only, never packages/*).
#   examples/install.sh react|vue|svelte        (from anywhere)
#   EDMI_URL=http://localhost:4321/edmi-ui ...   (default: the docs dev server; must serve /r/<fw>/*.json)
# The committed examples are the result of this script plus the page code.
set -euo pipefail

FW="${1:-}"
EXAMPLES="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="${EXAMPLE_DIR:-$EXAMPLES/$FW}"
EDMI_URL="${EDMI_URL:-http://localhost:4321/edmi-ui}"
EDMI_URL="${EDMI_URL%/}"

# Pattern blocks the Markets page and shell use (not part of the `all` aggregate, which is every ui item).
BLOCKS="ticker-strip index-row watchlist-item app-header layout-picker"

case "$FW" in
react)
	cd "$DIR"
	# `registry add` skips a namespace that is already configured: drop ours so EDMI_URL always wins.
	bun -e '
		const f = "components.json";
		const c = await Bun.file(f).json();
		delete c.registries?.["@edmi"];
		await Bun.write(f, JSON.stringify(c, null, 2) + "\n");
	'
	# Register the namespace (writes registries["@edmi"] into components.json), then install.
	bunx shadcn@latest registry add "@edmi=$EDMI_URL/r/react/{name}.json" </dev/null
	bunx shadcn@latest add @edmi/theme @edmi/all @edmi/font-instrument-sans @edmi/font-jetbrains-mono @edmi/font-sora \
		$(for b in $BLOCKS; do printf '@edmi/%s ' "$b"; done) --overwrite --yes </dev/null
	;;
vue)
	cd "$DIR"
	# shadcn-vue has no `registry add`: the namespace goes into components.json.
	EDMI_URL="$EDMI_URL" bun -e '
		const f = "components.json";
		const c = await Bun.file(f).json();
		c.registries = { ...c.registries, "@edmi": `${process.env.EDMI_URL}/r/vue/{name}.json` };
		await Bun.write(f, JSON.stringify(c, null, 2) + "\n");
	'
	bunx shadcn-vue@latest add @edmi/theme @edmi/all \
		$(for b in $BLOCKS; do printf '@edmi/%s ' "$b"; done) --overwrite --yes </dev/null
	;;
svelte)
	cd "$DIR"
	# shadcn-svelte installs from URLs only.
	bunx --bun shadcn-svelte@latest add "$EDMI_URL/r/svelte/theme.json" "$EDMI_URL/r/svelte/all.json" \
		$(for b in $BLOCKS; do printf '%s ' "$EDMI_URL/r/svelte/$b.json"; done) --overwrite --yes </dev/null
	;;
*)
	echo "usage: examples/install.sh react|vue|svelte" >&2
	exit 2
	;;
esac
