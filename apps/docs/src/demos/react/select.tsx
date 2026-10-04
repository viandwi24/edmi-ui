import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";

const tokens = [
	{ value: "nvdax", label: "NVDAx" },
	{ value: "msftx", label: "MSFTx" },
	{ value: "aaplx", label: "AAPLx" },
	{ value: "anthrop", label: "ANTHRP-pre" },
	{ value: "openai", label: "OPENAI-pre" },
];

export default function Demo() {
	return (
		<Select defaultValue="nvdax" items={tokens}>
			<SelectTrigger className="w-52">
				<SelectValue placeholder="Select a token" />
			</SelectTrigger>
			<SelectContent alignItemWithTrigger={false}>
				<SelectGroup>
					<SelectLabel>US megacaps</SelectLabel>
					<SelectItem value="nvdax">NVDAx</SelectItem>
					<SelectItem value="msftx">MSFTx</SelectItem>
					<SelectItem value="aaplx">AAPLx</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>Pre-IPO</SelectLabel>
					<SelectItem value="anthrop">ANTHRP-pre</SelectItem>
					<SelectItem value="openai" disabled>
						OPENAI-pre
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
