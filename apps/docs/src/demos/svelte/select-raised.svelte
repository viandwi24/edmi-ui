<script lang="ts">
	import { Select, SelectContent, SelectItem, SelectTrigger } from "@edmi-svelte/ui/select";

	let token = $state("nvdax");

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<Select type="single" bind:value={token}>
				<SelectTrigger elevation={level.value} class="w-48">{token}</SelectTrigger>
				<SelectContent>
					<SelectItem value="nvdax" label="nvdax" />
					<SelectItem value="msftx" label="msftx" />
				</SelectContent>
			</Select>
		</div>
	{/each}
</div>
