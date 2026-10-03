<script lang="ts">
	import { Toggle } from "@edmi-svelte/ui/toggle";
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-wrap items-center gap-3">
		<Toggle aria-label="Bold" pressed><b>B</b></Toggle>
		<Toggle variant="outline" aria-label="Italic"><i>I</i></Toggle>
		<Toggle variant="outline" aria-label="Underline" pressed><u>U</u></Toggle>
	</div>
	<div class="flex flex-wrap items-center gap-3">
		<Toggle raised aria-label="Bold" pressed><b>B</b></Toggle>
		<Toggle raised variant="outline" aria-label="Italic"><i>I</i></Toggle>
		<Toggle raised variant="outline" aria-label="Underline" pressed><u>U</u></Toggle>
	</div>
</div>
