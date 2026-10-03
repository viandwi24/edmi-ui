import { Slider } from "@edmi-react/ui/slider";

export default function Demo() {
	return (
		<div className="flex w-72 flex-col gap-6">
			<Slider raised defaultValue={[33]} max={100} step={1} />
			<Slider raised defaultValue={[25, 75]} />
			<Slider raised defaultValue={[20, 50, 80]} />
		</div>
	);
}
