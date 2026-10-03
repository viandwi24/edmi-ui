#!/usr/bin/env bash
# Runs every smoke script sequentially and prints a summary. Exit 1 if any failed.
cd "$(dirname "${BASH_SOURCE[0]}")" || exit 1
declare -a results
fail=0
for s in react vue svelte example-react; do
	[ -f "$s.sh" ] || continue
	echo "######## smoke: $s"
	if bash "$s.sh"; then results+=("PASS $s"); else results+=("FAIL $s"); fail=1; fi
done
# examples added later (example-vue.sh, example-svelte.sh) are picked up automatically
for f in example-*.sh; do
	s="${f%.sh}"; [ "$s" = "example-react" ] && continue
	echo "######## smoke: $s"
	if bash "$f"; then results+=("PASS $s"); else results+=("FAIL $s"); fail=1; fi
done
echo; echo "== smoke summary"; printf '%s\n' "${results[@]}"
exit $fail
