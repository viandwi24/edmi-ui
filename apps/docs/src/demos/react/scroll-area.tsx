import { ScrollArea, ScrollBar } from "@edmi-react/ui/scroll-area";

const tokens = [
	["NVDAx", "32.0%"],
	["MSFTx", "28.0%"],
	["AAPLx", "24.0%"],
	["ANTHRP-pre", "16.0%"],
	["TSLAx", "—"],
	["GOOGLx", "—"],
];

export default function Demo() {
	return (
		<div className="flex flex-wrap items-start gap-8">
			<ScrollArea className="h-40 w-56 rounded-xl border border-border bg-card">
				<div className="p-3">
					<div className="mb-1 text-xs text-muted-foreground">Tokens</div>
					{tokens.map(([t, w]) => (
						<div
							key={t}
							className="flex justify-between border-t border-border py-2 font-mono text-[13px]"
						>
							<span>{t}</span>
							<span className="text-muted-foreground">{w}</span>
						</div>
					))}
				</div>
			</ScrollArea>
			<ScrollArea className="w-72 whitespace-nowrap">
				<div className="flex gap-3 pb-4">
					{["MAG4", "PREIPO", "AIDX", "ENRG"].map((n) => (
						<div
							key={n}
							className="w-32 shrink-0 rounded-xl border border-border bg-card p-3"
						>
							<div className="font-mono text-[11px] text-muted-foreground">
								{n}
							</div>
							<div className="mt-2 font-mono text-xl">$1.0412</div>
						</div>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
