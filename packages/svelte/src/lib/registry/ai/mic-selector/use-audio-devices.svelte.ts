// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { onMount } from "svelte";

/** Enumerates the audio inputs; `loadDevices` asks for microphone permission so the labels are filled in. */
export class AudioDevices {
	devices = $state<MediaDeviceInfo[]>([]);
	loading = $state(true);
	error = $state<string | null>(null);
	hasPermission = $state(false);

	async #list() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		return deviceList.filter((device) => device.kind === "audioinput");
	}

	loadWithoutPermission = async () => {
		try {
			this.loading = true;
			this.error = null;
			this.devices = await this.#list();
		} catch (err) {
			this.error = err instanceof Error ? err.message : "Failed to get audio devices";
			console.error("Error getting audio devices:", this.error);
		} finally {
			this.loading = false;
		}
	};

	loadDevices = async () => {
		if (this.loading) return;
		try {
			this.loading = true;
			this.error = null;
			const tempStream = await navigator.mediaDevices.getUserMedia({ audio: true });
			for (const track of tempStream.getTracks()) track.stop();
			this.devices = await this.#list();
			this.hasPermission = true;
		} catch (err) {
			this.error = err instanceof Error ? err.message : "Failed to get audio devices";
			console.error("Error getting audio devices:", this.error);
		} finally {
			this.loading = false;
		}
	};
}

export function useAudioDevices() {
	const audio = new AudioDevices();

	onMount(() => {
		audio.loadWithoutPermission();
		const onChange = () => {
			if (audio.hasPermission) {
				audio.loading = false;
				audio.loadDevices();
			} else audio.loadWithoutPermission();
		};
		navigator.mediaDevices.addEventListener("devicechange", onChange);
		return () => navigator.mediaDevices.removeEventListener("devicechange", onChange);
	});

	return audio;
}
