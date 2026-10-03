<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["bubble", "message", "marker", "message-scroller", "questionnaire", "bubble-raised", "questionnaire-raised"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>
