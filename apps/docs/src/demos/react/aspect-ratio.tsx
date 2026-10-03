import { AspectRatio } from "@edmi-react/ui/aspect-ratio";

export default function Demo() {
	return (
		<div className="flex items-start gap-4">
			{[
				["16 / 9", 16 / 9, "w-52"],
				["1 / 1", 1, "w-28"],
				["9 / 16", 9 / 16, "w-20"],
			].map(([label, ratio, width]) => (
				<AspectRatio
					key={label as string}
					ratio={ratio as number}
					className={`${width} flex items-center justify-center rounded-lg border border-border bg-muted font-mono text-xs text-muted-foreground`}
				>
					{label}
				</AspectRatio>
			))}
		</div>
	);
}
