<script setup lang="ts">
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@edmi-vue/ui/questionnaire";
import { ref } from "vue";

const items = [
  { name: "rebalance", choices: [{ value: "drift" }, { value: "schedule" }, { value: "sign" }] },
  { name: "notes" },
];
const done = ref<string | null>(null);

function onSubmit(event: Event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget as HTMLFormElement);
  done.value = JSON.stringify(Object.fromEntries(data));
}
</script>

<template>
  <Questionnaire
    :items="items"
    shortcuts="letters"
    class="w-full max-w-md rounded-2xl border border-border bg-card p-6"
    @submit="onSubmit"
  >
    <QuestionnaireProgress />
    <QuestionnaireItem name="rebalance" required>
      <QuestionnaireTitle>How should the index rebalance?</QuestionnaireTitle>
      <QuestionnaireDescription>You can change this later in the mandate.</QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="drift">When any weight drifts past a limit</QuestionnaireChoice>
        <QuestionnaireChoice value="schedule">On a fixed schedule</QuestionnaireChoice>
        <QuestionnaireChoice value="sign">Only when I sign</QuestionnaireChoice>
      </QuestionnaireChoices>
    </QuestionnaireItem>
    <QuestionnaireItem name="notes">
      <QuestionnaireTitle>Anything else?</QuestionnaireTitle>
      <QuestionnaireInput placeholder="Something else…" />
    </QuestionnaireItem>
    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext />
      <QuestionnaireSubmit />
    </QuestionnaireActions>
    <p v-if="done" class="font-mono text-xs text-muted-foreground">{{ done }}</p>
  </Questionnaire>
</template>
