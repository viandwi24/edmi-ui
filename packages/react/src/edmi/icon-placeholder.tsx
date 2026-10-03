/**
 * Dev/docs-only runtime for shadcn's `IconPlaceholder` convention.
 *
 * Registry sources write `<IconPlaceholder lucide="…" tabler="…" hugeicons="…" phosphor="…" remixicon="…" />`.
 * On `shadcn add` the CLI rewrites each one into the consumer's `iconLibrary` and drops this import (any
 * import path containing "icon-placeholder" is removed). This module is NEVER shipped; it only lets the
 * Edmi preview and docs render the sources as-is, using Phosphor (the Edmi default).
 */
import * as Phosphor from "@phosphor-icons/react";
import type { SVGProps } from "react";

type Libs = Record<
	"lucide" | "tabler" | "hugeicons" | "phosphor" | "remixicon",
	string
>;

export function IconPlaceholder({
	phosphor,
	lucide: _l,
	tabler: _t,
	hugeicons: _h,
	remixicon: _r,
	...props
}: Libs & Omit<SVGProps<SVGSVGElement>, "ref">) {
	const Icon = (Phosphor as unknown as Record<string, React.ElementType>)[
		phosphor
	];
	if (!Icon) return null;
	return <Icon {...props} />;
}
