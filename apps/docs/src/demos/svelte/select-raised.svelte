<script lang="ts">
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from "@edmi-svelte/ui/select";

	let flat = $state("nvdax");
	let raised = $state("nvdax");
</script>

<div class="flex flex-wrap items-start gap-4">
	<Select type="single" bind:value={flat}>
		<SelectTrigger class="w-48">{flat}</SelectTrigger>
		<SelectContent>
			<SelectItem value="nvdax" label="nvdax" />
			<SelectItem value="msftx" label="msftx" />
		</SelectContent>
	</Select>
	<Select type="single" bind:value={raised}>
		<SelectTrigger raised class="w-48">{raised}</SelectTrigger>
		<SelectContent>
			<SelectItem value="nvdax" label="nvdax" />
			<SelectItem value="msftx" label="msftx" />
		</SelectContent>
	</Select>
</div>
