import {
	DatePicker,
	DateRangePicker,
} from "@/registry/edmi/blocks/date-picker/date-picker";
import { Calendar } from "@/registry/edmi/ui/calendar";
import { Checkbox } from "@/registry/edmi/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/registry/edmi/ui/radio-group";
import { Slider } from "@/registry/edmi/ui/slider";
import { Switch } from "@/registry/edmi/ui/switch";
import { RaisedSection } from "./_raised";

export default function FormsChoicePreview() {
	return (
		<div className="flex w-[320px] flex-col gap-6">
			<div className="flex items-center gap-3">
				<Checkbox />
				<Checkbox defaultChecked />
				<Checkbox indeterminate />
				<Checkbox disabled />
				<Checkbox disabled defaultChecked />
				<Checkbox aria-invalid />
			</div>
			<RadioGroup defaultValue="b" className="w-fit grid-flow-col">
				<RadioGroupItem value="a" />
				<RadioGroupItem value="b" />
				<RadioGroupItem value="c" disabled />
			</RadioGroup>
			<div className="flex items-center gap-3">
				<Switch />
				<Switch defaultChecked />
				<Switch size="sm" />
				<Switch size="sm" defaultChecked />
				<Switch disabled />
				<Switch aria-invalid />
			</div>
			<Slider defaultValue={[33]} />
			<Slider defaultValue={[25, 75]} />
			<Slider defaultValue={[20, 50, 80]} />
			<Slider defaultValue={[30]} disabled />
			<div className="flex flex-col gap-3">
				<DatePicker />
				<DatePicker defaultValue={new Date(2026, 9, 16)} />
				<DateRangePicker
					presets
					defaultValue={{
						from: new Date(2026, 9, 12),
						to: new Date(2026, 9, 18),
					}}
				/>
			</div>
			<Calendar
				mode="single"
				selected={new Date(2026, 9, 16)}
				defaultMonth={new Date(2026, 9)}
				className="w-fit rounded-xl border border-border"
			/>
			<Calendar
				mode="range"
				selected={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 18) }}
				defaultMonth={new Date(2026, 9)}
				className="w-fit rounded-xl border border-border"
			/>
			<Calendar
				mode="single"
				captionLayout="dropdown"
				selected={new Date(2026, 9, 16)}
				defaultMonth={new Date(2026, 9)}
				startMonth={new Date(2020, 0)}
				endMonth={new Date(2030, 11)}
				className="w-fit rounded-xl border border-border"
			/>
			<RaisedSection>
				<div className="flex items-center gap-3">
					<Checkbox raised defaultChecked />
					<Checkbox raised indeterminate />
					<Switch raised />
					<Switch raised defaultChecked />
				</div>
				<Slider raised defaultValue={[33]} />
				<Slider raised defaultValue={[25, 75]} />
				<Calendar
					raised
					mode="range"
					selected={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 18) }}
					defaultMonth={new Date(2026, 9)}
					className="w-fit rounded-xl border border-border"
				/>
			</RaisedSection>
		</div>
	);
}
