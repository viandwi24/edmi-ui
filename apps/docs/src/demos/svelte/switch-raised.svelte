<script lang="ts">
	import { Switch } from "@edmi-svelte/ui/switch";
</script>

<div class="flex flex-wrap items-center gap-6">
	<label class="flex items-center gap-2.5 text-sm"><Switch checked /> Flat</label>
	<label class="flex items-center gap-2.5 text-sm"><Switch raised checked /> Raised</label>
	<label class="flex items-center gap-2.5 text-sm"><Switch raised size="sm" /> Small</label>
</div>
