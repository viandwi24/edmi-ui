<script lang="ts">
	import { SidebarTrigger, useSidebar } from "@edmi-svelte/ui/sidebar";

	// The sidebar owns the toggle while it is open on desktop; the header takes over when it is closed or on mobile.
	const sidebar = useSidebar();
</script>

{#if sidebar.isMobile || sidebar.state === "collapsed"}
	<SidebarTrigger />
{/if}
