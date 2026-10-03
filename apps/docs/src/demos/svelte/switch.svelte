<script lang="ts">
	import { Switch } from "@edmi-svelte/ui/switch";
</script>

<div class="flex flex-col gap-4">
	<label class="flex items-center gap-2.5 text-sm"><Switch checked /> Keeper on</label>
	<label class="flex items-center gap-2.5 text-sm"><Switch size="sm" /> Small</label>
	<label class="flex items-center gap-2.5 text-sm"><Switch disabled /> Disabled</label>
</div>
