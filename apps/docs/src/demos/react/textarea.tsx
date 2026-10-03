import { Button } from "@edmi-react/ui/button";
import { Textarea } from "@edmi-react/ui/textarea";

export default function Demo() {
	return (
		<div className="grid w-full max-w-sm gap-3">
			<Textarea placeholder="Why this basket? Write the thesis in a few lines." />
			<Textarea disabled placeholder="Mandate is locked after launch." />
			<Textarea aria-invalid placeholder="Invalid" />
			<div className="grid gap-2">
				<Textarea placeholder="Message the agent..." />
				<Button className="justify-self-end" size="sm">
					Send
				</Button>
			</div>
		</div>
	);
}
