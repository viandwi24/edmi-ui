import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelFooter,
	InsetPanelHeader,
} from "@edmi-react/ui/inset-panel";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<InsetPanel elevation={value}>
						<InsetPanelHeader>Live joiners</InsetPanelHeader>
						<InsetPanelBody fade className="h-32 p-4 text-sm">
							The body plate is inset 2px from the shell.
						</InsetPanelBody>
						<InsetPanelFooter>2,846 people joined this week</InsetPanelFooter>
					</InsetPanel>
				</div>
			))}
		</div>
	);
}
