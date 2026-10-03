<script lang="ts">
	import { Checkbox } from "@edmi-svelte/ui/checkbox";
</script>

<div class="flex flex-wrap items-center gap-6">
	<label class="flex items-center gap-2.5 text-sm"><Checkbox checked /> Flat</label>
	<label class="flex items-center gap-2.5 text-sm"><Checkbox raised checked /> Raised</label>
	<label class="flex items-center gap-2.5 text-sm"><Checkbox raised indeterminate /> Indeterminate</label>
</div>
