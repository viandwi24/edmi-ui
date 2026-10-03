<script setup lang="ts">
import DemoList from "./_demo-list.vue";

const names = ["site-header", "app-header", "stat-tile", "ticker-strip", "index-row", "watchlist-item", "allocation-bar", "join-panel", "leaderboard-podium", "feed-post", "agent-card", "feature-row", "step-card", "pricing-plan", "task-list", "kanban-column", "layout-picker", "code-block", "footer", "site-header-raised", "app-header-raised", "stat-tile-raised", "ticker-strip-raised", "join-panel-raised", "leaderboard-podium-raised", "feed-post-raised", "agent-card-raised", "feature-row-raised", "step-card-raised", "pricing-plan-raised", "task-list-raised", "kanban-column-raised", "layout-picker-raised", "code-block-raised", "footer-raised"].map(String);
</script>

<template>
	<DemoList :names="names" />
</template>
