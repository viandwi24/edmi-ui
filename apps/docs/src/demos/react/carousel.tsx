import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@edmi-react/ui/carousel";

const slides = [
	["Magnificent Four", "from-blue-500 to-emerald-500"],
	["Pre-IPO Basket", "from-amber-500 to-red-500"],
	["AI Index", "from-violet-500 to-indigo-500"],
	["Energy", "from-lime-500 to-teal-500"],
];

export default function Demo() {
	return (
		<div className="mx-12 max-w-md">
			<Carousel opts={{ align: "start" }}>
				<CarouselContent>
					{slides.map(([name, g]) => (
						<CarouselItem key={name} className="basis-1/2">
							<div
								className={`flex h-32 items-end rounded-xl bg-linear-to-br p-3 text-sm font-semibold text-white ${g}`}
							>
								{name}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
				<CarouselDots />
			</Carousel>
		</div>
	);
}
