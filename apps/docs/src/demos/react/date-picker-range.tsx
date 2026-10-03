import { DateRangePicker } from "@edmi-react/blocks/date-picker/date-picker";

export default function Demo() {
	return (
		<DateRangePicker
			presets
			defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 18) }}
		/>
	);
}
