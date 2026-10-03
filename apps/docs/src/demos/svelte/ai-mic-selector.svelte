<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		MicSelector,
		MicSelectorContent,
		MicSelectorEmpty,
		MicSelectorInput,
		MicSelectorItem,
		MicSelectorLabel,
		MicSelectorList,
		MicSelectorTrigger,
		MicSelectorValue,
	} from "@edmi-svelte/ai/mic-selector";

	// Fake devices so the demo needs no microphone permission. Without `devices`, the component lists the real inputs.
	const device = (deviceId: string, label: string) =>
		({ deviceId, groupId: deviceId, kind: "audioinput", label, toJSON: () => ({}) }) as MediaDeviceInfo;

	const devices = [
		device("builtin", "MacBook Pro Microphone (05ac:8104)"),
		device("airpods", "AirPods Pro (1a2b:3c4d)"),
		device("shure", "Shure MV7 (14ed:1012)"),
	];

	let value = $state<string | undefined>("builtin");
</script>

{#snippet mic()}
	<IconPlaceholder
		lucide="MicIcon"
		tabler="IconMicrophone"
		hugeicons="VoiceIcon"
		phosphor="MicrophoneIcon"
		remixicon="RiMicLine"
		class="size-4 shrink-0"
	/>
{/snippet}

<MicSelector {devices} bind:value>
	<MicSelectorTrigger class="w-[260px]">
		{@render mic()}
		<MicSelectorValue />
	</MicSelectorTrigger>
	<MicSelectorContent>
		<MicSelectorInput />
		<MicSelectorList>
			{#snippet children(items)}
				<MicSelectorEmpty />
				{#each items as d (d.deviceId)}
					<MicSelectorItem value={d.deviceId} keywords={[d.label]}>
						{@render mic()}
						<MicSelectorLabel device={d} />
					</MicSelectorItem>
				{/each}
			{/snippet}
		</MicSelectorList>
	</MicSelectorContent>
</MicSelector>
