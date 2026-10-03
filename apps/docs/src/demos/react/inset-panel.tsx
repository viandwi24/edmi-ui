import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelFooter,
	InsetPanelHeader,
} from "@edmi-react/ui/inset-panel";

export default function Demo() {
	return (
		<div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
			<InsetPanel>
				<InsetPanelHeader>Live joiners</InsetPanelHeader>
				<InsetPanelBody fade className="h-40 p-4 text-sm">
					Body runs edge to edge with a faded bottom.
				</InsetPanelBody>
				<InsetPanelFooter>
					2,846 people joined an index this week
				</InsetPanelFooter>
			</InsetPanel>
			<InsetPanel>
				<InsetPanelHeader>Keeper activity</InsetPanelHeader>
				<InsetPanelBody className="h-40 p-4 text-sm">
					No footer: the body runs to the bottom edge.
				</InsetPanelBody>
			</InsetPanel>
		</div>
	);
}
