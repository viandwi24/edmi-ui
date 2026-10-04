<script lang="ts">
	import {
		Artifact,
		ArtifactActions,
		ArtifactClose,
		ArtifactContent,
		ArtifactDescription,
		ArtifactHeader,
		ArtifactTitle,
	} from "@edmi-svelte/ai/artifact";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<Artifact elevation={level.value} class="max-w-xl">
				<ArtifactHeader>
					<div>
						<ArtifactTitle>rebalance.ts</ArtifactTitle>
						<ArtifactDescription>Generated · 8 lines</ArtifactDescription>
					</div>
					<ArtifactActions>
						<ArtifactClose />
					</ArtifactActions>
				</ArtifactHeader>
				<ArtifactContent>
					<p class="font-mono text-xs text-muted-foreground">
						export async function run(index: string) &#123; … &#125;
					</p>
				</ArtifactContent>
			</Artifact>
		</div>
	{/each}
</div>
