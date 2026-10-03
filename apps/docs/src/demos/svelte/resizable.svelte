<script lang="ts">
	import * as Resizable from "@edmi-svelte/ui/resizable";

	const pane = "flex h-full items-center justify-center text-sm text-muted-foreground";
</script>

<div class="flex flex-col gap-6">
	<Resizable.PaneGroup
		direction="horizontal"
		class="h-[180px] max-w-md rounded-xl border border-border bg-card"
	>
		<Resizable.Pane defaultSize={60}>
			<div class={pane}>Chart</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={40}>
			<div class={pane}>Order book</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
	<Resizable.PaneGroup
		direction="horizontal"
		class="h-[220px] max-w-md rounded-xl border border-border bg-card"
	>
		<Resizable.Pane defaultSize={30}>
			<div class={pane}>Sidebar</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={70}>
			<Resizable.PaneGroup direction="vertical">
				<Resizable.Pane defaultSize={60}>
					<div class={pane}>Editor</div>
				</Resizable.Pane>
				<Resizable.Handle withHandle />
				<Resizable.Pane defaultSize={40}>
					<div class={pane}>Agent log</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
