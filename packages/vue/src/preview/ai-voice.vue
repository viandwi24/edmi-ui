<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = [
	"ai-audio-player",
	"ai-mic-selector",
	"ai-persona",
	"ai-speech-input",
	"ai-speech-input-elevation",
	"ai-transcription",
	"ai-voice-selector",
];
</script>

<template>
	<DemoList :names="names" />
</template>
