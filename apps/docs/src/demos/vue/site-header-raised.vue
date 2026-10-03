<script setup lang="ts">
import { SiteHeader } from "@edmi-vue/ui/site-header";
import { Button } from "@edmi-vue/ui/button";

const steps = [
	{ label: "Start", href: "#start" },
	{ label: "Build", href: "#build" },
	{ label: "Sell", href: "#sell" },
	{ label: "Scale", href: "#scale" },
];
const links = [
	{ label: "Resources", href: "#resources" },
	{ label: "Pricing", href: "#pricing" },
];
</script>

<template>
	<SiteHeader raised lead="How to" :steps="steps" :links="links">
		<template #action>
			<Button raised>Create an index</Button>
		</template>
	</SiteHeader>
</template>
