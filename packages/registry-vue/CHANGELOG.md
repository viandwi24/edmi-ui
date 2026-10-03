# @edmi-ui/registry-vue

## 0.2.0

### Minor Changes

- 8679462: Add the `patterns` aggregate item (every pattern block). Docs and READMEs now show npm, pnpm, yarn and bun commands.

## 0.1.0

### Minor Changes

- 6e0ab1e: Add patterns blocks (feed-post, agent-card, feature-row, step-card, pricing-plan, task-list, kanban-column, code-block, footer) for Vue and Svelte.
- 6e0ab1e: Vue port follows Edmi UI spec v2: every component is flat by default (h-9 controls, no gradients/lips/shadows) and gains an opt-in `raised` prop (Button, Toggle, ToggleGroup, Kbd, NativeSelect, SelectTrigger, Checkbox, Switch, Slider, Calendar/RangeCalendar, FieldLabel choice cards, Questionnaire, Card, InsetPanel, EmptyMedia, DialogContent, AlertDialogContent, PopoverContent, Toaster, Menubar, Pagination, TabsList/TabsTrigger, BubbleReactions and every pattern). `TabsList` gains `variant="pills"`.

### Patch Changes

- QA fixes: menu checkbox/radio indicators on the left, slider thumb background-origin, layout-picker radio dot, drawer attr warning, lint cleanups; preview now covers every group.
