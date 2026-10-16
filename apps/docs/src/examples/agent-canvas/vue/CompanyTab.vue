<script setup lang="ts">
import { AgentAvatar } from "@edmi-vue/components/ai/agent-avatar";
import { Button } from "@edmi-vue/ui/button";
import { Card } from "@edmi-vue/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@edmi-vue/ui/item";
import { company, org } from "../data";
import Icon from "./Icon.vue";

const icons = { domain: "globe", email: "mail", revenue: "card", hosting: "server" } as const;
const label = "mt-6 mb-2 text-[13px] text-muted-foreground";
</script>

<template>
  <div class="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-medium">{{ org.name }}</h2>
      <Button type="button" variant="ghost" size="icon-xs" aria-label="Edit">
        <Icon name="pencil" class="size-4" />
      </Button>
    </div>
    <div :class="label">Stack</div>
    <Card class="gap-0 py-0">
      <ItemGroup>
        <div v-for="(row, i) in company.stack" :key="row.title">
          <ItemSeparator v-if="i > 0" class="my-0" />
          <Item>
            <ItemMedia variant="icon"><Icon :name="icons[row.icon]" /></ItemMedia>
            <ItemContent>
              <ItemTitle>{{ row.title }}</ItemTitle>
              <ItemDescription>{{ row.note }}</ItemDescription>
            </ItemContent>
            <Icon name="chevronRight" class="size-4 text-muted-foreground" />
          </Item>
        </div>
      </ItemGroup>
    </Card>
    <div :class="label">Important links</div>
    <Card class="gap-0 py-0">
      <ItemGroup>
        <div v-for="(row, i) in company.links" :key="row.title">
          <ItemSeparator v-if="i > 0" class="my-0" />
          <Item size="sm">
            <ItemContent>
              <ItemTitle>{{ row.title }}</ItemTitle>
              <ItemDescription>{{ row.note }}</ItemDescription>
            </ItemContent>
            <Icon name="chevronRight" class="size-4 text-muted-foreground" />
          </Item>
        </div>
      </ItemGroup>
    </Card>
    <div :class="label">Agents</div>
    <Card class="gap-0 py-0">
      <ItemGroup>
        <div v-for="(row, i) in company.agents" :key="row.id">
          <ItemSeparator v-if="i > 0" class="my-0" />
          <Item>
            <ItemMedia>
              <AgentAvatar :seed="row.id" :color="row.color" :size="40" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{{ row.name }}</ItemTitle>
              <ItemDescription>{{ row.note }}</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </ItemGroup>
    </Card>
  </div>
</template>
