<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["site-header", "app-header", "stat-tile", "ticker-strip", "index-row", "watchlist-item", "allocation-bar", "join-panel", "leaderboard-podium", "feed-post", "agent-card", "feature-row", "step-card", "pricing-plan", "task-list", "kanban-column", "layout-picker", "code-block", "footer", "site-header-elevation", "app-header-elevation", "stat-tile-elevation", "ticker-strip-elevation", "join-panel-elevation", "leaderboard-podium-elevation", "feed-post-elevation", "agent-card-elevation", "feature-row-elevation", "step-card-elevation", "pricing-plan-elevation", "task-list-elevation", "kanban-column-elevation", "layout-picker-elevation", "code-block-elevation", "footer-elevation"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>
