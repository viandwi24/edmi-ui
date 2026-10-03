<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import { Toaster, toast } from "@edmi-svelte/ui/sonner";
</script>

<div class="flex flex-wrap gap-2">
	<Toaster raised />
	<Button variant="outline" onclick={() => toast("Copied to clipboard")}>Raised toast</Button>
	<Button
		variant="outline"
		onclick={() => toast.success("Joined MAG4", { description: "98,209 shares - tx 4f9a...c21" })}
	>
		Raised success
	</Button>
</div>
