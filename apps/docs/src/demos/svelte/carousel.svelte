<script lang="ts">
	import * as Carousel from "@edmi-svelte/ui/carousel";

	const slides = [
		["Magnificent Four", "from-blue-500 to-emerald-500"],
		["Pre-IPO Basket", "from-amber-500 to-red-500"],
		["AI Index", "from-violet-500 to-indigo-500"],
		["Energy", "from-lime-500 to-teal-500"],
	];
</script>

<div class="mx-12 max-w-md">
	<Carousel.Root opts={{ align: "start" }}>
		<Carousel.Content>
			{#each slides as [name, g] (name)}
				<Carousel.Item class="basis-1/2">
					<div
						class="flex h-32 items-end rounded-xl bg-linear-to-br p-3 text-sm font-semibold text-white {g}"
					>
						{name}
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
		<Carousel.Dots />
	</Carousel.Root>
</div>
