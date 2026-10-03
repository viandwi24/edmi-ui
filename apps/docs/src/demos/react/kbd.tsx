import { Kbd, KbdGroup } from "@edmi-react/ui/kbd";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-6">
			<Kbd>K</Kbd>
			<KbdGroup>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</KbdGroup>
			<Kbd>Enter</Kbd>
			<span className="text-sm">
				Press{" "}
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>J</Kbd>
				</KbdGroup>{" "}
				to ask the agent
			</span>
		</div>
	);
}
