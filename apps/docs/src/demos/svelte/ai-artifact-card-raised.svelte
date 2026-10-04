<script lang="ts">
	import {
		ArtifactCard,
		ArtifactCardActions,
		ArtifactCardBody,
		ArtifactCardIcon,
		ArtifactCardMeta,
		ArtifactCardTitle,
	} from "@edmi-svelte/ai/artifact-card";
	import { DropdownMenuItem } from "@edmi-svelte/ui/dropdown-menu";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<ArtifactCard elevation={level.value} class="max-w-lg">
				<ArtifactCardIcon kind="archive" />
				<ArtifactCardBody>
					<ArtifactCardTitle>Keeper starter</ArtifactCardTitle>
					<ArtifactCardMeta>ZIP</ArtifactCardMeta>
				</ArtifactCardBody>
				<ArtifactCardActions>
					<DropdownMenuItem>Copy link</DropdownMenuItem>
					<DropdownMenuItem>Open</DropdownMenuItem>
				</ArtifactCardActions>
			</ArtifactCard>
		</div>
	{/each}
</div>
