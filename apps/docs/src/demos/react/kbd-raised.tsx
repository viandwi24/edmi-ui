import { Kbd, KbdGroup } from "@edmi-react/ui/kbd";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-6">
			<Kbd raised>K</Kbd>
			<KbdGroup>
				<Kbd raised>⌘</Kbd>
				<Kbd raised>K</Kbd>
			</KbdGroup>
			<Kbd raised>Enter</Kbd>
			<span className="text-sm">
				Press{" "}
				<KbdGroup>
					<Kbd raised>⌘</Kbd>
					<Kbd raised>J</Kbd>
				</KbdGroup>{" "}
				to ask the agent
			</span>
		</div>
	);
}
