import { onMounted, onUnmounted, ref } from "vue";

/** Enumerates the audio inputs; `loadDevices` asks for microphone permission so the labels are filled in. */
export function useAudioDevices() {
	const devices = ref<MediaDeviceInfo[]>([]);
	const loading = ref(true);
	const error = ref<string | null>(null);
	const hasPermission = ref(false);

	async function listAudioInputs() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		return deviceList.filter((device) => device.kind === "audioinput");
	}

	async function loadDevicesWithoutPermission() {
		try {
			loading.value = true;
			error.value = null;
			devices.value = await listAudioInputs();
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Failed to get audio devices";
			error.value = message;
			console.error("Error getting audio devices:", message);
		} finally {
			loading.value = false;
		}
	}

	async function loadDevicesWithPermission() {
		if (loading.value) return;
		try {
			loading.value = true;
			error.value = null;
			const tempStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			for (const track of tempStream.getTracks()) track.stop();
			devices.value = await listAudioInputs();
			hasPermission.value = true;
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Failed to get audio devices";
			error.value = message;
			console.error("Error getting audio devices:", message);
		} finally {
			loading.value = false;
		}
	}

	function handleDeviceChange() {
		if (hasPermission.value) loadDevicesWithPermission();
		else loadDevicesWithoutPermission();
	}

	onMounted(() => {
		loadDevicesWithoutPermission();
		navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
	});

	onUnmounted(() => {
		navigator.mediaDevices.removeEventListener(
			"devicechange",
			handleDeviceChange,
		);
	});

	return {
		devices,
		error,
		hasPermission,
		loadDevices: loadDevicesWithPermission,
		loading,
	};
}
