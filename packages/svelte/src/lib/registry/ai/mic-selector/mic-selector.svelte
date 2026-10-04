<script lang="ts">
	import { Popover } from "$lib/registry/ui/popover/index.js";
	import type { ComponentProps } from "svelte";
	import { setMicSelectorContext } from "./use-mic-selector.svelte.js";
	import { useAudioDevices } from "./use-audio-devices.svelte.js";

	// Built on ui/popover + ui/command (DESIGN §5b). `bind:value` is the selected device id.
	let {
		value = $bindable(),
		open = $bindable(false),
		devices: devicesProp,
		children,
		...restProps
	}: ComponentProps<typeof Popover> & {
		value?: string;
		/**
		 * ✦ Devices to list. Omit to enumerate the audio inputs (asks for microphone permission when the
		 * list opens).
		 */
		devices?: MediaDeviceInfo[];
	} = $props();

	let width = $state(200);
	const audio = useAudioDevices();
	const devices = $derived(devicesProp ?? audio.devices);

	$effect(() => {
		if (!devicesProp && open && !audio.hasPermission && !audio.loading) audio.loadDevices();
	});

	setMicSelectorContext({
		get devices() {
			return devices;
		},
		get value() {
			return value;
		},
		setValue: (next) => {
			value = next;
		},
		setOpen: (next) => {
			open = next;
		},
		get width() {
			return width;
		},
		setWidth: (next) => {
			width = next;
		},
	});
</script>

<Popover bind:open {...restProps}>
	{@render children?.()}
</Popover>
