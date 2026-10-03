<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { Badge } from "@edmi-vue/ui/badge";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import { Checkbox } from "@edmi-vue/ui/checkbox";
import { Input } from "@edmi-vue/ui/input";
import { Label } from "@edmi-vue/ui/label";
import { Switch } from "@edmi-vue/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@edmi-vue/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-vue/ui/toggle-group";
import { type ControlKey, controls, defaults, intro, preview, type State, snippet, snippetTitle } from "./data";

const s = reactive<State>({ ...defaults });
function set(key: ControlKey, value: unknown) {
	if (typeof value === "string" && value) s[key] = value;
}
const keeper = ref(true);
const mandate = ref(true);
const raised = computed(() => s.raised === "raised");
const code = computed(() => snippet(s));
</script>

<template>
	<div class="min-h-svh bg-background text-foreground">
		<div class="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 py-10 md:px-10 md:py-14">
			<div class="flex flex-col gap-3">
				<h1 class="text-[40px] leading-tight font-normal tracking-[-1.5px] md:text-[52px]">{{ intro.title }}</h1>
				<p class="max-w-2xl text-muted-foreground">{{ intro.body }}</p>
			</div>

			<Card raised class="gap-5 p-6">
				<div class="grid gap-5 sm:grid-cols-2">
					<div v-for="c in controls" :key="c.key" class="flex flex-col gap-2">
						<div class="flex items-baseline gap-2">
							<span class="text-[13px] font-medium">{{ c.label }}</span>
							<span class="font-mono text-[11px] text-muted-foreground">{{ c.hint }}</span>
						</div>
						<ToggleGroup
							type="single"
							raised
							variant="segmented"
							class="flex-wrap"
							:model-value="s[c.key]"
							@update:model-value="(v: unknown) => set(c.key, v)"
						>
							<ToggleGroupItem v-for="o in c.options" :key="o.value" :value="o.value">{{ o.label }}</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</div>
			</Card>

			<div
				:data-base="s.base"
				:data-theme="s.theme"
				:style="{ '--radius': `${s.radius}rem` }"
				:class="`${s.mode === 'dark' ? 'dark ' : ''}rounded-xl border border-border bg-background p-4 text-foreground sm:p-6`"
			>
				<div class="grid gap-4 md:grid-cols-2">
					<Card :raised="raised" class="gap-4 px-5">
						<div class="flex items-center justify-between">
							<span class="text-lg font-medium">{{ preview.name }} · {{ s.base }}·{{ s.theme }}</span>
							<Badge variant="success">Live</Badge>
						</div>
						<Tabs default-value="nav">
							<TabsList :raised="raised">
								<TabsTrigger v-for="t in preview.tabs" :key="t.value" :value="t.value">{{ t.label }}</TabsTrigger>
							</TabsList>
						</Tabs>
						<div class="rounded-xl border border-border-2 bg-muted p-4">
							<div class="text-[13px] text-muted-foreground">{{ preview.aumLabel }}</div>
							<div class="mt-1 flex items-center gap-3">
								<span class="font-mono text-3xl tracking-[-0.5px]">{{ preview.aum }}</span>
								<Badge variant="success" shape="number">{{ preview.delta }}</Badge>
							</div>
						</div>
						<div class="flex flex-wrap items-center gap-2">
							<Button :raised="raised" variant="brand">{{ preview.join }}</Button>
							<Button :raised="raised" variant="outline">{{ preview.details }}</Button>
							<Label class="ml-auto gap-2.5 text-[13px]">
								<Switch v-model="keeper" :raised="raised" />
								{{ preview.keeper }}
							</Label>
						</div>
					</Card>

					<Card :raised="raised" class="gap-4 px-5">
						<div class="flex flex-wrap gap-2">
							<Button v-for="v in preview.variants" :key="v" :raised="raised" :variant="v" size="sm">{{ v }}</Button>
						</div>
						<div class="flex flex-wrap gap-2">
							<Badge v-for="b in preview.badges" :key="b" :variant="b">{{ b }}</Badge>
						</div>
						<Input :placeholder="preview.placeholder" />
						<Label class="gap-2.5 text-[13px]">
							<Checkbox v-model="mandate" :raised="raised" />
							{{ preview.mandate }}
						</Label>
					</Card>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<span class="text-[13px] font-medium">{{ snippetTitle }}</span>
				<pre class="overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-xs leading-relaxed">{{ code }}</pre>
			</div>
		</div>
	</div>
</template>
