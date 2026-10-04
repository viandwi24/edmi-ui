<script lang="ts">
	import { REGEXP_ONLY_DIGITS } from "bits-ui";
	import { InputOTP, InputOTPGroup, InputOTPSlot } from "@edmi-svelte/ui/input-otp";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<InputOTP maxlength={4} pattern={REGEXP_ONLY_DIGITS} elevation={level.value}>
				{#snippet children({ cells })}
					<InputOTPGroup>
						{#each cells as cell, i (i)}
							<InputOTPSlot {cell} />
						{/each}
					</InputOTPGroup>
				{/snippet}
			</InputOTP>
		</div>
	{/each}
</div>
