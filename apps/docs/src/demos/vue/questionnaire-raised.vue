<script setup lang="ts">
import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireTitle,
} from "@edmi-vue/ui/questionnaire";
</script>

<template>
  <Questionnaire raised shortcuts="letters" class="w-full max-w-md rounded-2xl border border-border bg-card p-6">
    <QuestionnaireItem name="rebalance">
      <QuestionnaireTitle>How should the index rebalance?</QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="drift">When any weight drifts past a limit</QuestionnaireChoice>
        <QuestionnaireChoice value="schedule">On a fixed schedule</QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireInput placeholder="Other…" />
    </QuestionnaireItem>
  </Questionnaire>
</template>
