// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
export const captureScreenshot = async (): Promise<File | null> => {
	if (
		typeof navigator === "undefined" ||
		!navigator.mediaDevices?.getDisplayMedia
	) {
		return null;
	}

	let stream: MediaStream | null = null;
	const video = document.createElement("video");
	video.muted = true;
	video.playsInline = true;

	try {
		stream = await navigator.mediaDevices.getDisplayMedia({
			audio: false,
			video: true,
		});

		video.srcObject = stream;

		await new Promise<void>((resolve, reject) => {
			video.onloadedmetadata = () => resolve();
			video.onerror = () => reject(new Error("Failed to load screen stream"));
		});

		await video.play();

		const width = video.videoWidth;
		const height = video.videoHeight;
		if (!width || !height) {
			return null;
		}

		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const context = canvas.getContext("2d");
		if (!context) {
			return null;
		}

		context.drawImage(video, 0, 0, width, height);
		const blob = await new Promise<Blob | null>((resolve) => {
			canvas.toBlob(resolve, "image/png");
		});
		if (!blob) {
			return null;
		}

		const timestamp = new Date()
			.toISOString()
			.replaceAll(/[:.]/g, "-")
			.replace("T", "_")
			.replace("Z", "");

		return new File([blob], `screenshot-${timestamp}.png`, {
			lastModified: Date.now(),
			type: "image/png",
		});
	} finally {
		if (stream) {
			for (const track of stream.getTracks()) {
				track.stop();
			}
		}
		video.pause();
		video.srcObject = null;
	}
};
