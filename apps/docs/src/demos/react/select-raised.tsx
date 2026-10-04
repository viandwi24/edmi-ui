import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";

const tokens = [
	{ value: "nvdax", label: "NVDAx" },
	{ value: "msftx", label: "MSFTx" },
];

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Select defaultValue="nvdax" items={tokens}>
						<SelectTrigger elevation={value} className="w-48">
							<SelectValue placeholder="Select a token" />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectItem value="nvdax">NVDAx</SelectItem>
							<SelectItem value="msftx">MSFTx</SelectItem>
						</SelectContent>
					</Select>
				</div>
			))}
		</div>
	);
}
