<script setup lang="ts">
import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireTitle,
} from "@edmi-vue/ui/questionnaire";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" } as const,
	{ value: "flat", label: "Flat (0)" } as const,
	{ value: "raised", label: "Raised (+1)" } as const,
	{ value: "floating", label: "Floating (+2)" } as const,
];
</script>

<template>
	<div class="flex flex-col gap-6">
		<div v-for="l in levels" :key="l.value" class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{{ l.label }}</p>
  <Questionnaire :elevation="l.value" shortcuts="letters" class="w-full max-w-md rounded-2xl border border-border bg-card p-6">
    <QuestionnaireItem name="rebalance">
      <QuestionnaireTitle>How should the index rebalance?</QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="drift">When any weight drifts past a limit</QuestionnaireChoice>
        <QuestionnaireChoice value="schedule">On a fixed schedule</QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireInput placeholder="Other…" />
    </QuestionnaireItem>
  </Questionnaire>
		</div>
	</div>
</template>
