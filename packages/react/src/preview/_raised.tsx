import type { ReactNode } from "react";

// Preview helper: a labelled "Raised ✦" block shown under the flat default rows.
export function RaisedSection({ children }: { children: ReactNode }) {
	return (
		<div className="mt-6 flex flex-col gap-4 border-t border-border pt-4">
			<p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
				Raised ✦
			</p>
			{children}
		</div>
	);
}
