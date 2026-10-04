import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "@edmi-react/ui/field";
import { Input } from "@edmi-react/ui/input";
import { Switch } from "@edmi-react/ui/switch";

export default function Demo() {
	return (
		<FieldSet className="w-full max-w-sm">
			<FieldLegend>Mandate</FieldLegend>
			<FieldDescription>
				Rules the keeper follows after launch.
			</FieldDescription>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="field-name">Index name</FieldLabel>
					<Input id="field-name" defaultValue="Magnificent Four" />
				</Field>
				<Field data-invalid="true">
					<FieldLabel htmlFor="field-ticker">Ticker</FieldLabel>
					<Input id="field-ticker" aria-invalid defaultValue="mag 4" />
					<FieldError>Use 2-6 capital letters.</FieldError>
				</Field>
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>Allow keeper</FieldTitle>
						<FieldDescription>
							Rebalance automatically when drift passes the limit.
						</FieldDescription>
					</FieldContent>
					<Switch defaultChecked />
				</Field>
			</FieldGroup>
		</FieldSet>
	);
}
