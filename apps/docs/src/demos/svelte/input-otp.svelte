<script lang="ts">
	import { REGEXP_ONLY_DIGITS } from "bits-ui";
	import {
		InputOTP,
		InputOTPGroup,
		InputOTPSeparator,
		InputOTPSlot,
	} from "@edmi-svelte/ui/input-otp";

	let value = $state("");
</script>

<InputOTP maxlength={6} pattern={REGEXP_ONLY_DIGITS} bind:value>
	{#snippet children({ cells })}
		<InputOTPGroup>
			{#each cells.slice(0, 3) as cell, i (i)}
				<InputOTPSlot {cell} />
			{/each}
		</InputOTPGroup>
		<InputOTPSeparator />
		<InputOTPGroup>
			{#each cells.slice(3, 6) as cell, i (i)}
				<InputOTPSlot {cell} />
			{/each}
		</InputOTPGroup>
	{/snippet}
</InputOTP>
