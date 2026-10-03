<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";

	let count = $state(0);
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button onclick={() => count++}>Join index{count ? ` (${count})` : ""}</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="outline">Outline</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="destructive">Delete</Button>
	<Button variant="link">Link</Button>
	<Button variant="brand">Continue</Button>
	<Button size="sm">Create</Button>
	<Button size="icon" variant="outline" aria-label="Add">+</Button>
	<Button href="#" variant="outline">As a link</Button>
</div>
