<script lang="ts">
	import CopyIcon from "phosphor-svelte/lib/Copy";
	import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlass";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
	} from "@edmi-svelte/ui/input-group";

	const levels = [
		{ value: "flat", label: "Flat (0)" },
		{ value: "raised", label: "Raised (+1)" },
		{ value: "floating", label: "Floating (+2)" },
		{ value: "sunken", label: "Sunken (-1)" },
	] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-6">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<div class="grid gap-3 sm:grid-cols-2">
				<InputGroup elevation={level.value}>
					<InputGroupAddon>
						<MagnifyingGlassIcon />
					</InputGroupAddon>
					<InputGroupInput placeholder="Search indexes" />
				</InputGroup>
				<InputGroup elevation={level.value}>
					<InputGroupInput value="1,000.00" class="font-mono tabular-nums" />
					<InputGroupAddon align="inline-end">
						<InputGroupText>USDC</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
				<InputGroup elevation={level.value}>
					<InputGroupInput value="7xKXtg2C…Qp3h" readonly class="font-mono text-[13px]" />
					<InputGroupAddon align="inline-end">
						<InputGroupButton size="icon-xs" aria-label="Copy">
							<CopyIcon />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</div>
		</div>
	{/each}
</div>
