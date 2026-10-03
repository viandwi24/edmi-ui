<script lang="ts">
	import { Button } from "@edmi-svelte/ui/button";
	import * as Empty from "@edmi-svelte/ui/empty";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<div class="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
	<Empty.Root>
		<Empty.Header>
			<Empty.Media variant="icon"><IconPlaceholder lucide="BriefcaseIcon" tabler="IconBriefcase" hugeicons="Briefcase01Icon" phosphor="BriefcaseIcon" remixicon="RiBriefcaseLine" /></Empty.Media>
			<Empty.Title>No positions yet</Empty.Title>
			<Empty.Description>Join an index and your holdings will show up here.</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<Button>Explore indexes</Button>
		</Empty.Content>
	</Empty.Root>
	<Empty.Root class="border-[1.5px] border-input">
		<Empty.Header>
			<Empty.Media variant="icon"><IconPlaceholder lucide="UploadIcon" tabler="IconUpload" hugeicons="Upload01Icon" phosphor="UploadIcon" remixicon="RiUploadLine" /></Empty.Media>
			<Empty.Title>Drop your weights file</Empty.Title>
			<Empty.Description>CSV with symbol and weight columns.</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<Button variant="outline">Choose file</Button>
		</Empty.Content>
	</Empty.Root>
</div>
