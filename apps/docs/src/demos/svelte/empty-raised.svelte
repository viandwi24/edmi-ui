<script lang="ts">
	import * as Empty from "@edmi-svelte/ui/empty";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
	<Empty.Root>
		<Empty.Header>
			<Empty.Media variant="icon"><IconPlaceholder lucide="BriefcaseIcon" tabler="IconBriefcase" hugeicons="Briefcase01Icon" phosphor="BriefcaseIcon" remixicon="RiBriefcaseLine" /></Empty.Media>
			<Empty.Title>Flat media</Empty.Title>
			<Empty.Description>Join an index and your holdings will show up here.</Empty.Description>
		</Empty.Header>
	</Empty.Root>
	<Empty.Root>
		<Empty.Header>
			<Empty.Media variant="icon" raised><IconPlaceholder lucide="BriefcaseIcon" tabler="IconBriefcase" hugeicons="Briefcase01Icon" phosphor="BriefcaseIcon" remixicon="RiBriefcaseLine" /></Empty.Media>
			<Empty.Title>Raised media</Empty.Title>
			<Empty.Description>Join an index and your holdings will show up here.</Empty.Description>
		</Empty.Header>
	</Empty.Root>
</div>
