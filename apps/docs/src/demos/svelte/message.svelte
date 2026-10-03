<script lang="ts">
	import * as Bubble from "@edmi-svelte/ui/bubble";
	import { Button } from "@edmi-svelte/ui/button";
	import * as Message from "@edmi-svelte/ui/message";
</script>

<Message.Group class="w-full max-w-lg gap-5">
	<Message.Root>
		<Message.Avatar class="size-6 border border-border bg-brand-soft text-brand-text">✦</Message.Avatar>
		<Message.Content>
			<Message.Header>
				<span class="font-semibold text-foreground">Research agent</span>
				<span class="font-mono">09:41</span>
			</Message.Header>
			<Bubble.Root variant="ghost">
				<Bubble.Content>
					I screened the megacaps against your mandate. A rebalance would cost about 0.08% in slippage.
				</Bubble.Content>
			</Bubble.Root>
			<Message.Footer>
				<Button variant="ghost" size="icon-xs" aria-label="Copy">⧉</Button>
				<Button variant="ghost" size="icon-xs" aria-label="Like">👍</Button>
			</Message.Footer>
		</Message.Content>
	</Message.Root>
	<Message.Root align="end">
		<Message.Avatar class="size-6 bg-secondary font-mono text-[10px]">DL</Message.Avatar>
		<Message.Content>
			<Bubble.Root align="end">
				<Bubble.Content>Run it and send me the transaction to sign.</Bubble.Content>
			</Bubble.Root>
			<Message.Footer>Read</Message.Footer>
		</Message.Content>
	</Message.Root>
</Message.Group>
