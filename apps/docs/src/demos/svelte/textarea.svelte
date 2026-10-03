<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { Textarea } from "@edmi-svelte/ui/textarea";

	let message = $state("");
</script>

<div class="grid w-full max-w-sm gap-3">
	<Textarea placeholder="Why this basket? Write the thesis in a few lines." />
	<Textarea disabled placeholder="Mandate is locked after launch." />
	<Textarea aria-invalid="true" placeholder="Invalid" />
	<div class="grid gap-2">
		<Textarea bind:value={message} placeholder="Message the agent..." />
		<Button class="justify-self-end" size="sm" disabled={!message}>Send</Button>
	</div>
</div>
