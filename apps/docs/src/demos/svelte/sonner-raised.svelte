<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { Toaster, toast } from "@edmi-svelte/ui/sonner";
</script>

<div class="flex flex-wrap gap-2">
	<Toaster elevation="floating" />
	<Button variant="outline" onclick={() => toast("Copied to clipboard")}>Default</Button>
	<Button
		variant="outline"
		onclick={() => toast.success("Joined MAG4", { description: "98,209 shares - tx 4f9a...c21" })}
	>
		Success
	</Button>
	<Button
		variant="outline"
		onclick={() => toast.info("Rebalance scheduled", { description: "Next keeper run at 09:00 UTC" })}
	>
		Info
	</Button>
	<Button
		variant="outline"
		onclick={() => toast.warning("Drift is 6.2%", { description: "Above your 5% limit." })}
	>
		Warning
	</Button>
	<Button
		variant="outline"
		onclick={() => toast.error("Signature rejected", { description: "The wallet closed the request." })}
	>
		Error
	</Button>
	<Button
		variant="outline"
		onclick={() =>
			toast.promise(new Promise((r) => setTimeout(r, 2000)), {
				loading: "Deploying vault...",
				success: "Vault deployed",
				error: "Deploy failed",
			})}
	>
		Promise
	</Button>
</div>
