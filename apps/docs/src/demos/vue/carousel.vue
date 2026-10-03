<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@edmi-vue/ui/carousel";

const slides = [
  ["Magnificent Four", "from-blue-500 to-emerald-500"],
  ["Pre-IPO Basket", "from-amber-500 to-red-500"],
  ["AI Index", "from-violet-500 to-indigo-500"],
  ["Energy", "from-lime-500 to-teal-500"],
];
</script>

<template>
  <div class="mx-12 max-w-md">
    <Carousel :opts="{ align: 'start' }">
      <CarouselContent>
        <CarouselItem v-for="[name, g] in slides" :key="name" class="basis-1/2">
          <div
            :class="`flex h-32 items-end rounded-xl bg-linear-to-br p-3 text-sm font-semibold text-white ${g}`"
          >
            {{ name }}
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  </div>
</template>
