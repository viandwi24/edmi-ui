<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Card from "@edmi-svelte/ui/card";
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { Input } from "@edmi-svelte/ui/input";
	import * as Popover from "@edmi-svelte/ui/popover";
	import Resolved from "./_shared/elevation-resolved.svelte";
</script>

{#snippet sample()}
	<Card.Root class="w-72">
		<Card.Header>
			<Card.Title>Rebalance limits</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-3">
			<Input value="5%" />
			<div class="flex gap-2">
				<Button>Save</Button>
				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>More</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-48 text-[13px]">Applied to the next keeper run.</Popover.Content>
				</Popover.Root>
			</div>
			<Resolved />
		</Card.Content>
	</Card.Root>
{/snippet}

<div class="flex flex-col gap-6">
	<div class="flex flex-wrap gap-8">
		<div class="flex flex-col gap-3">
			<div class="text-xs font-semibold text-muted-foreground">Flat (default)</div>
			<ElevationProvider>{@render sample()}</ElevationProvider>
		</div>
		<div class="flex flex-col gap-3">
			<div class="text-xs font-semibold text-muted-foreground">mode="layered"</div>
			<ElevationProvider mode="layered">{@render sample()}</ElevationProvider>
		</div>
		<div class="flex flex-col gap-3">
			<div class="text-xs font-semibold text-muted-foreground">level="raised" (forced)</div>
			<ElevationProvider level="raised"><Resolved /></ElevationProvider>
		</div>
	</div>
	<div class="flex flex-wrap items-center gap-4">
		<div class="flex h-12 w-24 items-center justify-center rounded-lg border border-border bg-card text-xs">flat</div>
		<div class="flex h-12 w-24 items-center justify-center rounded-lg border border-transparent bg-card text-xs shadow-raised">shadow-raised</div>
		<div class="flex h-12 w-24 items-center justify-center rounded-lg border border-transparent bg-card text-xs shadow-floating">shadow-floating</div>
		<div class="flex h-12 w-24 items-center justify-center rounded-lg border border-sk-bd bg-sk-bg text-xs shadow-sunken">shadow-sunken</div>
	</div>
</div>
