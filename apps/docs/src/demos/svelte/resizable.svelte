<script lang="ts">
	import * as Resizable from "@edmi-svelte/ui/resizable";

	const pane = "flex h-full items-center justify-center text-sm text-muted-foreground";
</script>

<div class="flex w-full shrink-0 flex-col gap-6">
	<div class="h-[180px] w-full max-w-md">
	<Resizable.PaneGroup
		direction="horizontal"
		class="rounded-xl border border-border bg-card"
	>
		<Resizable.Pane defaultSize={60}>
			<div class={pane}>Chart</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={40}>
			<div class={pane}>Order book</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
	</div>
	<div class="h-[220px] w-full max-w-md">
	<Resizable.PaneGroup
		direction="horizontal"
		class="rounded-xl border border-border bg-card"
	>
		<Resizable.Pane defaultSize={30}>
			<div class={pane}>Sidebar</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={70}>
			<Resizable.PaneGroup direction="vertical" class="h-full">
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
</div>
