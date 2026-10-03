<script lang="ts">
	import { Input } from "@edmi-svelte/ui/input";

	let name = $state("MAG4");
</script>

<div class="grid w-full max-w-sm gap-3">
	<Input placeholder="Magnificent Four" />
	<Input bind:value={name} />
	<Input placeholder="Invalid" aria-invalid="true" value="mag 4" />
	<Input placeholder="Disabled" disabled />
	<Input type="file" />
</div>
