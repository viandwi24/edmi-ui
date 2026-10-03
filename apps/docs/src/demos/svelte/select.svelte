<script lang="ts">
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectGroupHeading,
		SelectItem,
		SelectSeparator,
		SelectTrigger,
	} from "@edmi-svelte/ui/select";

	const tokens: Record<string, string> = {
		nvdax: "NVDAx",
		msftx: "MSFTx",
		aaplx: "AAPLx",
		anthrop: "ANTHRP-pre",
		openai: "OPENAI-pre",
	};

	let value = $state("nvdax");
</script>

<Select type="single" bind:value>
	<SelectTrigger class="w-52">
		{value ? tokens[value] : "Select a token"}
	</SelectTrigger>
	<SelectContent>
		<SelectGroup>
			<SelectGroupHeading>US megacaps</SelectGroupHeading>
			<SelectItem value="nvdax" label="NVDAx" />
			<SelectItem value="msftx" label="MSFTx" />
			<SelectItem value="aaplx" label="AAPLx" />
		</SelectGroup>
		<SelectSeparator />
		<SelectGroup>
			<SelectGroupHeading>Pre-IPO</SelectGroupHeading>
			<SelectItem value="anthrop" label="ANTHRP-pre" />
			<SelectItem value="openai" label="OPENAI-pre" disabled />
		</SelectGroup>
	</SelectContent>
</Select>
