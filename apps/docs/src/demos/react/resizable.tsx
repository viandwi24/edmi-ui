import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@edmi-react/ui/resizable";

const pane =
	"flex h-full items-center justify-center text-sm text-muted-foreground";

export default function Demo() {
	return (
		<div className="flex w-full shrink-0 flex-col gap-6">
			<ResizablePanelGroup
				orientation="horizontal"
				className="min-h-[180px] w-full max-w-md shrink-0 rounded-xl border border-border bg-card"
			>
				<ResizablePanel defaultSize="60%">
					<div className={pane}>Chart</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize="40%">
					<div className={pane}>Order book</div>
				</ResizablePanel>
			</ResizablePanelGroup>
			<ResizablePanelGroup
				orientation="horizontal"
				className="min-h-[220px] w-full max-w-md shrink-0 rounded-xl border border-border bg-card"
			>
				<ResizablePanel defaultSize="30%">
					<div className={pane}>Sidebar</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize="70%">
					<ResizablePanelGroup orientation="vertical" className="h-full">
						<ResizablePanel defaultSize="60%">
							<div className={pane}>Editor</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize="40%">
							<div className={pane}>Agent log</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
