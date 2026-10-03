import { Button } from "@/registry/edmi/ui/button";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/registry/edmi/ui/combobox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/registry/edmi/ui/field";
import { Input } from "@/registry/edmi/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "@/registry/edmi/ui/input-group";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/registry/edmi/ui/input-otp";
import { Label } from "@/registry/edmi/ui/label";
import {
	NativeSelect,
	NativeSelectOption,
} from "@/registry/edmi/ui/native-select";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/edmi/ui/select";
import { Textarea } from "@/registry/edmi/ui/textarea";
import { RaisedSection } from "./_raised";

const tokens = ["NVDAx", "MSFTx", "AAPLx"];

export default function FormsTextPreview() {
	return (
		<div className="flex w-[340px] flex-col gap-4">
			<Label>Index name</Label>
			<Input placeholder="Default" />
			<Input defaultValue="With value" />
			<Input placeholder="Invalid" aria-invalid defaultValue="bad value" />
			<Input placeholder="Disabled" disabled />
			<Input type="file" />
			<InputGroup>
				<InputGroupInput placeholder="1,000.00" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>USDC</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupTextarea placeholder="Describe your thesis..." />
				<InputGroupAddon align="block-end">
					<InputGroupButton>Research</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<InputOTP maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
			<Textarea placeholder="Textarea" />
			<NativeSelect>
				<NativeSelectOption>Solana devnet</NativeSelectOption>
			</NativeSelect>
			<Select defaultValue="NVDAx">
				<SelectTrigger className="w-52">
					<SelectValue />
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false}>
					<SelectGroup>
						<SelectLabel>US megacaps</SelectLabel>
						{tokens.map((t) => (
							<SelectItem key={t} value={t}>
								{t}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Combobox items={tokens}>
				<ComboboxInput placeholder="Combobox" showClear />
				<ComboboxContent>
					<ComboboxEmpty>No results.</ComboboxEmpty>
					<ComboboxList>
						{(item: string) => (
							<ComboboxItem key={item} value={item}>
								{item}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<FieldGroup>
				<Field data-invalid="true">
					<FieldLabel htmlFor="p-amount">Amount</FieldLabel>
					<Input id="p-amount" aria-invalid defaultValue="25,000" />
					<FieldDescription>You get about 982.09 shares.</FieldDescription>
					<FieldError>Balance is 4,210.55 USDC.</FieldError>
				</Field>
			</FieldGroup>
			<Button>Submit</Button>
			<RaisedSection>
				<NativeSelect raised>
					<NativeSelectOption>Solana devnet</NativeSelectOption>
				</NativeSelect>
				<Select defaultValue="NVDAx">
					<SelectTrigger raised className="w-52">
						<SelectValue />
					</SelectTrigger>
					<SelectContent alignItemWithTrigger={false}>
						<SelectGroup>
							{tokens.map((t) => (
								<SelectItem key={t} value={t}>
									{t}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button raised>Submit</Button>
			</RaisedSection>
		</div>
	);
}
