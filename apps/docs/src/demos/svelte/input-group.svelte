<script lang="ts">
	import ArrowUpIcon from "phosphor-svelte/lib/ArrowUp";
	import CopyIcon from "phosphor-svelte/lib/Copy";
	import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlass";
	import { Button } from "@edmi-svelte/ui/button";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
		InputGroupTextarea,
	} from "@edmi-svelte/ui/input-group";

	let query = $state("");
</script>

<div class="grid w-full max-w-sm gap-3">
	<InputGroup>
		<InputGroupAddon>
			<MagnifyingGlassIcon />
		</InputGroupAddon>
		<InputGroupInput bind:value={query} placeholder="Search indexes" />
	</InputGroup>
	<InputGroup>
		<InputGroupInput placeholder="1,000.00" />
		<InputGroupAddon align="inline-end">
			<InputGroupText>USDC</InputGroupText>
		</InputGroupAddon>
	</InputGroup>
	<InputGroup>
		<InputGroupAddon>
			<InputGroupText>https://</InputGroupText>
		</InputGroupAddon>
		<InputGroupInput value="stockbreak.fun/mag4" />
	</InputGroup>
	<InputGroup>
		<InputGroupInput value="7xKXtg2CW87d97Qp3h" readonly />
		<InputGroupAddon align="inline-end">
			<InputGroupButton size="icon-xs" aria-label="Copy">
				<CopyIcon />
			</InputGroupButton>
		</InputGroupAddon>
	</InputGroup>
	<InputGroup>
		<InputGroupTextarea placeholder="Describe your thesis..." />
		<InputGroupAddon align="block-end">
			<InputGroupText>52%</InputGroupText>
			<Button size="icon-xs" class="ml-auto" aria-label="Send">
				<ArrowUpIcon />
			</Button>
		</InputGroupAddon>
	</InputGroup>
</div>
