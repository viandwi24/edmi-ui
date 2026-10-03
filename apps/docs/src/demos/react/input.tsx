import { Input } from "@edmi-react/ui/input";

export default function Demo() {
	return (
		<div className="grid w-full max-w-sm gap-3">
			<Input placeholder="Magnificent Four" />
			<Input defaultValue="MAG4" />
			<Input placeholder="Invalid" aria-invalid defaultValue="mag 4" />
			<Input placeholder="Disabled" disabled />
			<Input type="file" />
		</div>
	);
}
