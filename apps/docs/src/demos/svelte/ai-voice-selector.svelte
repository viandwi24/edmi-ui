<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "@edmi-svelte/ui/button";
	import {
		VoiceSelector,
		VoiceSelectorAccent,
		VoiceSelectorAge,
		VoiceSelectorAttributes,
		VoiceSelectorBullet,
		VoiceSelectorContent,
		VoiceSelectorDescription,
		VoiceSelectorDetails,
		VoiceSelectorEmpty,
		VoiceSelectorGender,
		VoiceSelectorGroup,
		VoiceSelectorHeader,
		VoiceSelectorInput,
		VoiceSelectorItem,
		VoiceSelectorList,
		VoiceSelectorName,
		VoiceSelectorPreview,
		VoiceSelectorSeparator,
		VoiceSelectorTrigger,
	} from "@edmi-svelte/ai/voice-selector";

	const voices = [
		{ id: "aria", name: "Aria", gender: "female", accent: "american", age: "young", description: "Warm, clear. Good for explainers.", group: "Recommended" },
		{ id: "theo", name: "Theo", gender: "male", accent: "british", age: "middle-aged", description: "Calm and precise.", group: "Recommended" },
		{ id: "priya", name: "Priya", gender: "female", accent: "indian", age: "young", description: "Bright and friendly.", group: "All voices" },
	];
	const groups = ["Recommended", "All voices"];

	let value = $state<string | undefined>("aria");
	let playing = $state<string>();
	const current = $derived(voices.find((v) => v.id === value));
</script>

<VoiceSelector bind:value>
	<VoiceSelectorTrigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>
				<IconPlaceholder
					lucide="AudioLinesIcon"
					tabler="IconPlayerRecordFilled"
					hugeicons="AudioWave01Icon"
					phosphor="RecordIcon"
					remixicon="RiRecordCircleLine"
					class="size-3.5"
				/>
				{current?.name ?? "Select voice"}
				<IconPlaceholder
					lucide="ChevronsUpDownIcon"
					tabler="IconSelector"
					hugeicons="UnfoldMoreIcon"
					phosphor="CaretUpDownIcon"
					remixicon="RiArrowUpDownLine"
					class="size-3.5 text-muted-foreground"
				/>
			</Button>
		{/snippet}
	</VoiceSelectorTrigger>
	<VoiceSelectorContent title="Choose a voice">
		<VoiceSelectorInput />
		<VoiceSelectorList>
			<VoiceSelectorEmpty>No voices found.</VoiceSelectorEmpty>
			{#each groups as group, i (group)}
				{#if i > 0}<VoiceSelectorSeparator />{/if}
				<VoiceSelectorGroup heading={group}>
					{#each voices.filter((x) => x.group === group) as v (v.id)}
						<VoiceSelectorItem value={v.id} keywords={[v.name, v.gender, v.accent]}>
							<VoiceSelectorPreview
								playing={playing === v.id}
								onPlay={() => (playing = playing === v.id ? undefined : v.id)}
							/>
							<VoiceSelectorDetails>
								<VoiceSelectorHeader>
									<VoiceSelectorName>{v.name}</VoiceSelectorName>
									<VoiceSelectorAttributes>
										<VoiceSelectorGender value={v.gender} />
										<VoiceSelectorBullet />
										<VoiceSelectorAccent value={v.accent} />
										<VoiceSelectorBullet />
										<VoiceSelectorAge>{v.age}</VoiceSelectorAge>
									</VoiceSelectorAttributes>
								</VoiceSelectorHeader>
								<VoiceSelectorDescription>{v.description}</VoiceSelectorDescription>
							</VoiceSelectorDetails>
						</VoiceSelectorItem>
					{/each}
				</VoiceSelectorGroup>
			{/each}
		</VoiceSelectorList>
	</VoiceSelectorContent>
</VoiceSelector>
