<script lang="ts">
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Spinner } from "@edmi-svelte/ui/spinner";
</script>

<div class="flex flex-wrap items-center gap-4">
	<Spinner />
	<Spinner class="size-6" />
	<Button disabled variant="secondary">
		<Spinner />
		Deploying vault
	</Button>
	<Badge variant="brand">
		<Spinner />
		Rebalancing
	</Badge>
</div>
