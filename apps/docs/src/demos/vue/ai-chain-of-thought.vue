<script setup lang="ts">
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from "@edmi-vue/components/ai/chain-of-thought";
import { Shimmer } from "@edmi-vue/components/ai/shimmer";
import { ChartLineIcon, GlobeIcon, SearchIcon, SparklesIcon } from "@lucide/vue";
</script>

<template>
  <ChainOfThought default-open class="max-w-lg">
    <ChainOfThoughtHeader />
    <ChainOfThoughtContent>
      <ChainOfThoughtStep :icon="SearchIcon" label="Searched for NVDAx news">
        <ChainOfThoughtSearchResults>
          <ChainOfThoughtSearchResult v-for="site in ['reuters.com', 'sec.gov', 'nasdaq.com']" :key="site">
            <GlobeIcon class="size-3" />
            {{ site }}
          </ChainOfThoughtSearchResult>
        </ChainOfThoughtSearchResults>
      </ChainOfThoughtStep>
      <ChainOfThoughtStep :icon="ChartLineIcon" label="Read the 30-day chart">
        <ChainOfThoughtImage caption="NVDAx 30-day price">
          <div class="h-28 w-64 bg-linear-to-br from-chart-2 to-chart-1" />
        </ChainOfThoughtImage>
      </ChainOfThoughtStep>
      <ChainOfThoughtStep status="active" :icon="SparklesIcon" description="MAG4 · drift limit 5%">
        <template #label>
          <Shimmer as="span">Comparing weights with the mandate</Shimmer>
        </template>
      </ChainOfThoughtStep>
      <ChainOfThoughtStep status="pending" label="Write the answer" />
    </ChainOfThoughtContent>
  </ChainOfThought>
</template>
