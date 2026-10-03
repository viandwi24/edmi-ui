<script lang="ts">
	import { Slider } from "@edmi-svelte/ui/slider";
</script>

<div class="flex w-72 flex-col gap-6">
	<Slider type="multiple" value={[33]} max={100} step={1} />
	<Slider type="multiple" raised value={[33]} max={100} step={1} />
	<Slider type="multiple" raised value={[25, 75]} />
</div>
