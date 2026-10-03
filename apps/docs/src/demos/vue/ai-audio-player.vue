<script setup lang="ts">
import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerDurationDisplay,
  AudioPlayerElement,
  AudioPlayerMuteButton,
  AudioPlayerPlayButton,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerVolumeRange,
} from "@edmi-vue/components/ai/audio-player";
import { onBeforeUnmount, onMounted, ref } from "vue";

// Demo audio: a short synthesized clip so the page works offline. Use any URL, or `data` from the AI SDK.
function makeClip(seconds: number) {
  const rate = 8000;
  const n = rate * seconds;
  const buf = new ArrayBuffer(44 + n);
  const v = new DataView(buf);
  const text = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i));
  };
  text(0, "RIFF");
  v.setUint32(4, 36 + n, true);
  text(8, "WAVEfmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, rate, true);
  v.setUint32(28, rate, true);
  v.setUint16(32, 1, true);
  v.setUint16(34, 8, true);
  text(36, "data");
  v.setUint32(40, n, true);
  for (let i = 0; i < n; i++) {
    const t = i / rate;
    const gate = Math.sin(Math.PI * 2 * t * 1.5) > 0 ? 1 : 0.35;
    v.setUint8(44 + i, 128 + 14 * gate * Math.sin(2 * Math.PI * (200 + 30 * Math.floor(t)) * t));
  }
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

const src = ref<string>();
onMounted(() => {
  src.value = makeClip(42);
});
onBeforeUnmount(() => {
  if (src.value) URL.revokeObjectURL(src.value);
});
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-4">
    <AudioPlayer>
      <AudioPlayerElement v-if="src" :src="src" />
      <AudioPlayerControlBar>
        <AudioPlayerSeekBackwardButton :seek-offset="10" />
        <AudioPlayerPlayButton />
        <AudioPlayerSeekForwardButton :seek-offset="10" />
        <AudioPlayerTimeDisplay />
        <AudioPlayerTimeRange />
        <AudioPlayerDurationDisplay />
        <AudioPlayerMuteButton />
        <AudioPlayerVolumeRange />
      </AudioPlayerControlBar>
    </AudioPlayer>
    <AudioPlayer class="max-w-sm">
      <AudioPlayerElement v-if="src" :src="src" />
      <AudioPlayerControlBar>
        <AudioPlayerPlayButton />
        <AudioPlayerTimeDisplay />
        <AudioPlayerTimeRange />
        <AudioPlayerDurationDisplay />
      </AudioPlayerControlBar>
    </AudioPlayer>
  </div>
</template>
