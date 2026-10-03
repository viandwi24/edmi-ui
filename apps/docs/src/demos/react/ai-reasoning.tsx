import {
	Reasoning,
	ReasoningContent,
	ReasoningTrigger,
} from "@edmi-react/components/ai/reasoning";
import { useEffect, useState } from "react";

const text =
	"NVDAx is 2.4% over target. The keeper limit is 2%, so a rebalance is allowed. Slippage on 0.42 NVDAx at current depth is about 0.08%.";

// Streams the text in, then flips `isStreaming` off: the block opens while streaming and closes itself afterwards.
export default function Demo() {
	const [shown, setShown] = useState(0);
	const [streaming, setStreaming] = useState(true);

	useEffect(() => {
		if (shown >= text.length) {
			setStreaming(false);
			return;
		}
		const id = setTimeout(() => setShown((n) => n + 3), 40);
		return () => clearTimeout(id);
	}, [shown]);

	return (
		<div className="flex w-full max-w-lg flex-col gap-6">
			<Reasoning isStreaming={streaming}>
				<ReasoningTrigger />
				<ReasoningContent>{text.slice(0, shown)}</ReasoningContent>
			</Reasoning>
			<Reasoning defaultOpen={false} duration={6}>
				<ReasoningTrigger />
				<ReasoningContent>{text}</ReasoningContent>
			</Reasoning>
		</div>
	);
}
